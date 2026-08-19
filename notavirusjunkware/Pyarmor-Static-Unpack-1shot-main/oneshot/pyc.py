import io

from xdis.magics import magic2int, magic_int2tuple
from xdis.unmarshal import VersionIndependentUnmarshaller

CO_PYARMOR_OBFUSCATED = 0x20000000


class PyarmorUnmarshaller(VersionIndependentUnmarshaller):
    """Unmarshaller that, while parsing a Pyarmor-obfuscated marshal stream,
    records where each CO_OBFUSCATED (0x20000000) code object's trailing
    Pyarmor extra blob lives, then clears that flag on the parsed object.

    Layout of the extra data (see pycdc/pyc_code.cpp)::

        extra_length: unsigned char
        extra_data:   extra_length bytes
    """

    def __init__(self, fp, magic_int, bytes_for_s, code_objects={}):
        super().__init__(fp, magic_int, bytes_for_s, code_objects)
        self.pyarmor_regions = []  # (code_start, blob_start, extra_length)

    def t_code(self, save_ref, bytes_for_s: bool = False):
        code_start = self.fp.tell() - 1
        code = super().t_code(save_ref, bytes_for_s)
        if code.co_flags & CO_PYARMOR_OBFUSCATED:
            blob_start = self.fp.tell()
            extra_length = ord(self.fp.read(1))
            self.fp.read(extra_length)
            self.pyarmor_regions.append((code_start, blob_start, extra_length))
            code.co_flags &= ~CO_PYARMOR_OBFUSCATED
        return code


def _flags_offset(version) -> int:
    # Byte offset of co_flags inside a marshalled code object (relative to the
    # TYPE_CODE byte): type(1) + 4 bytes for each of the preceding fields.
    n = 1  # argcount
    if version >= (3, 8):
        n += 1  # posonlyargcount
    if version >= (3, 0):
        n += 1  # kwonlyargcount
    if version < (3, 11):
        n += 1  # nlocals
    n += 1  # stacksize
    return 1 + 4 * n


def strip_pyarmor_marshal(marshal_data: bytes, magic_int: int) -> bytes:
    """Remove Pyarmor's per-code-object extra blobs and clear the
    CO_OBFUSCATED flag bits in-place, restoring a standard marshal stream that
    the target interpreter (and pycdc) can load."""
    um = PyarmorUnmarshaller(io.BytesIO(marshal_data), magic_int, False, {})
    um.load()

    version = magic_int2tuple(magic_int)
    flags_offset = _flags_offset(version)
    cleaned = bytearray(marshal_data)

    # Flag bits are cleared before blobs are removed so that the offsets into
    # the original buffer stay valid while iterating.
    for code_start, _, _ in um.pyarmor_regions:
        pos = code_start + flags_offset
        val = int.from_bytes(cleaned[pos : pos + 4], "little")
        cleaned[pos : pos + 4] = (val & ~CO_PYARMOR_OBFUSCATED).to_bytes(4, "little")

    for _, blob_start, extra_length in sorted(
        um.pyarmor_regions, key=lambda r: r[1], reverse=True
    ):
        del cleaned[blob_start : blob_start + 1 + extra_length]

    return bytes(cleaned)


def build_pyc_bytes(marshal_data: bytes, magic_bytes: bytes) -> bytes:
    magic_int = magic2int(magic_bytes)
    version = magic_int2tuple(magic_int)
    cleaned = strip_pyarmor_marshal(marshal_data, magic_int)
    if version >= (3, 7):
        header = magic_bytes + b"\x00\x00\x00\x00" * 3  # flags, mtime, size
    else:
        header = magic_bytes + b"\x00\x00\x00\x00" * 2  # mtime, size
    return header + cleaned


def build_pyc(
    remaining_data: bytes,
    remaining_data_decrypted: bytes,
    code_object_offset: int,
    xor_key_procedure_length: int,
) -> bytes:
    magic_bytes = remaining_data[12:16]
    marshal_data = remaining_data_decrypted[
        code_object_offset + xor_key_procedure_length :
    ]
    return build_pyc_bytes(marshal_data, magic_bytes)