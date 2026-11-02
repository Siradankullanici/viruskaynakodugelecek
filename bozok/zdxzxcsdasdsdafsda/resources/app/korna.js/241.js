let n = null;
module.exports = () => {
  if (!n) {
    n = document.createElement("iframe");
    n.className = "scratch-svg-renderer-sandbox";
    n.sandbox = "allow-same-origin";
    n.style.position = "absolute";
    n.style.top = "-10000px";
    n.style.left = "-10000px";
    n.style.width = "0";
    n.style.height = "0";
    n.style.opacity = "0";
    n.style.visibility = "hidden";
    n.style.pointerEvents = "none";
    n.tabIndex = -1;
    n.ariaHidden = true;
    document.body.appendChild(n);
    n.contentDocument.open();
    n.contentDocument.write("\n        <!DOCTYPE html>\n        <html>\n            <head>\n                <meta charset=\"utf-8\">\n                <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src 'unsafe-inline' data:; font-src data:; img-src data:\">\n            </head>\n            <body></body>\n        </html>\n        ");
    n.contentDocument.close();
  }
  return n.contentDocument.body;
};