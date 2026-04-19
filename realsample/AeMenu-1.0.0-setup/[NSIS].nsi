; NSIS script (UTF-8) NSIS-3 Unicode
; Install

Unicode true
SetCompressor zlib

; --------------------
; HEADER SIZE: 117246
; START HEADER SIZE: 300
; MAX STRING LENGTH: 8192
; STRING CHARS: 34547

OutFile [NSIS].exe
!include WinMessages.nsh

ShowInstDetails nevershow


; --------------------
; LANG TABLES: 26
; LANG STRINGS: 61

Name AeMenu
BrandingText "AeMenu 1.0.0"

; LANG: 1066
LangString LSTR_0 1066 "AeMenu 1.0.0"
LangString LSTR_1 1066 "Cài đặt $(LSTR_2)"
LangString LSTR_2 1066 AeMenu
LangString LSTR_5 1066 "Không thể ghi: "
LangString LSTR_6 1066 "Sao chép bị thất bại"
LangString LSTR_7 1066 "Sao chép vào "
LangString LSTR_8 1066 "Không thể tìm thấy biểu tượng: "
LangString LSTR_9 1066 "Không thể nạp: "
LangString LSTR_10 1066 "Tạo thư mục: "
LangString LSTR_11 1066 "Tạo lối tắt: "
LangString LSTR_13 1066 "Xóa tập tin: "
LangString LSTR_14 1066 "Xóa khi khởi động lại: "
LangString LSTR_15 1066 "Lỗi khi tạo lối tắt: "
LangString LSTR_17 1066 "Lỗi khi giải nén dữ liệu! Có thể trình cài đặt đã bị hỏng?"
LangString LSTR_20 1066 "Thực thi: "
LangString LSTR_21 1066 "Trích xuất: "
LangString LSTR_22 1066 "Trích xuất: lôi khi ghi vào tập tin "
LangString LSTR_23 1066 "Trình cài đặt bị hỏng: mã tác vụ bất hợp lệ"
LangString LSTR_24 1066 "Không có OLE cho: "
LangString LSTR_25 1066 "Thư mục đầu ra: "
LangString LSTR_26 1066 "Xóa thư mục: "
LangString LSTR_27 1066 "Đổi tên khi khởi động lại: "
LangString LSTR_28 1066 "Đổi tên: "
LangString LSTR_29 1066 "Đã bỏ qua: "
LangString LSTR_30 1066 "Sao chép Chi tiết vào Clipboard"
LangString LSTR_36 1066 "Lỗi khi mở tập tin để ghi: $\r$\n$\r$\n$0$\r$\n$\r$\nNhấn “Hủy bỏ” để ngừng việc cài đặt,$\r$\n“Thử lại” để thử lần nữa, hoặc$\r$\n“Bỏ qua” để bỏ qua tập tin này."
LangString LSTR_37 1066 "Cài đặt"
LangString LSTR_38 1066 "Vui lòng đợi trong khi $(LSTR_60) đang được cài đặt."
LangString LSTR_39 1066 "Cài đặt hoàn tất"
LangString LSTR_40 1066 "Việc cài đặt đã hoàn tất thành công."
LangString LSTR_41 1066 "Cài đặt bị hủy"
LangString LSTR_42 1066 "Việc cài đặt không hoàn tất thành công."
LangString LSTR_43 1066 "MS Shell Dlg"
LangString LSTR_44 1066 8
LangString LSTR_45 1066 "Windows 7 and above is required"
LangString LSTR_46 1066 "64-bit Windows is required"
LangString LSTR_47 1066 "Failed to uninstall old application files. Please try running the installer again."
LangString LSTR_48 1066 "AeMenu không thể đóng $\r$\nVui lòng đóng nó theo cách thủ công và nhấp vào Thử lại để tiếp tục."
LangString LSTR_49 1066 "Installing, please wait..."
LangString LSTR_50 1066 "AeMenu is running.$\r$\nClick OK to close it.$\r$\nIf it doesn't close, try closing it manually."
LangString LSTR_51 1066 "Tùy biến"
LangString LSTR_52 1066 "Hủy bỏ"
LangString LSTR_53 1066 "&Hiện chi tiết"
LangString LSTR_54 1066 "Hoàn thành"
LangString LSTR_55 1066 "< &Lùi"
LangString LSTR_56 1066 "&Tiến >"
LangString LSTR_57 1066 "Nhấn Tiến để tiếp tục."
LangString LSTR_58 1066 " "
LangString LSTR_59 1066 Đón&g
LangString LSTR_60 1066 AeMenu


; LANG: 1054
LangString LSTR_0 1054 "AeMenu 1.0.0"
LangString LSTR_1 1054 "$(LSTR_2) ติดตั้ง"
LangString LSTR_2 1054 AeMenu
LangString LSTR_5 1054 "ไม่สามารถเขียน: "
LangString LSTR_6 1054 คัดลอกผิดพลาด
LangString LSTR_7 1054 "คัดลอกไปยัง "
LangString LSTR_8 1054 "ไม่สามารถหาสัญลักษณ์ได้: "
LangString LSTR_9 1054 "ไม่สามารถโหลดได้: "
LangString LSTR_10 1054 "สร้างแฟ้ม: "
LangString LSTR_11 1054 "สร้างชอร์ตคัท: "
LangString LSTR_13 1054 "ลบไฟล์: "
LangString LSTR_14 1054 "ลบตอนรีบูท: "
LangString LSTR_15 1054 "มีปัญหาสร้างไฟล์ชอร์ตคัท: "
LangString LSTR_17 1054 "มีปัญหาในการคลายข้อมูล! เกิดข้อผิดพลาดจากตัวติดตั้ง?"
LangString LSTR_20 1054 "รันไฟล์: "
LangString LSTR_21 1054 "แตกไฟล์: "
LangString LSTR_22 1054 "แตกไฟล์: เกิดปัญหาในการเขียนไฟล์"
LangString LSTR_23 1054 "ตัวติดตั้งมีปัญหา: รหัส opcode ผิดพลาด"
LangString LSTR_24 1054 "ไม่มี OLE สำหรับ: "
LangString LSTR_25 1054 "แฟ้มทีติดตั้ง: "
LangString LSTR_26 1054 "ลบแฟ้ม: "
LangString LSTR_27 1054 "เปลี่ยนชื่อตอนรีบูท: "
LangString LSTR_28 1054 "เปลี่ยนชื่อ: "
LangString LSTR_29 1054 "ข้าม: "
LangString LSTR_30 1054 คัดลอกรายละเอียดลงคลิปบอร์ด
LangString LSTR_36 1054 "ไม่สามารถเปิดไฟล์สำหรับเขียนได้: $\r$\n$\r$\n$0$\r$\n$\r$\nกด ยกเลิก เพื่อหยุดการติดตั้ง,$\r$\nลองอีกครั้ง เพื่อลองอีกครั้ง, หรือ$\r$\nเพิกเฉย เพื่อข้ามไฟล์นี้."
LangString LSTR_37 1054 กำลังติดตั้ง
LangString LSTR_38 1054 "โปรดรอในขณะที่ $(LSTR_60) กำลังถูกติดตั้ง"
LangString LSTR_39 1054 การติดตั้งเสร็จสิ้น
LangString LSTR_40 1054 การติดตั้งเสร็จสมบูรณ์
LangString LSTR_41 1054 การติดตั้งถูกยกเลิก
LangString LSTR_42 1054 การติดตั้งไม่เสร็จสมบูรณ์
LangString LSTR_43 1054 "MS Shell Dlg"
LangString LSTR_44 1054 8
LangString LSTR_45 1054 "Windows 7 and above is required"
LangString LSTR_46 1054 "64-bit Windows is required"
LangString LSTR_47 1054 "Failed to uninstall old application files. Please try running the installer again."
LangString LSTR_48 1054 "AeMenu cannot be closed. $\r$\nPlease close it manually and click Retry to continue."
LangString LSTR_49 1054 "Installing, please wait..."
LangString LSTR_50 1054 "AeMenu is running.$\r$\nClick OK to close it.$\r$\nIf it doesn't close, try closing it manually."
LangString LSTR_51 1054 กำหนดเอง
LangString LSTR_52 1054 ยกเลิก
LangString LSTR_53 1054 &รายละเอียด
LangString LSTR_54 1054 เสร็จสิ้นแล้ว
LangString LSTR_55 1054 "< &กลับไป"
LangString LSTR_56 1054 "&ต่อไป >"
LangString LSTR_57 1054 "กด ต่อไป เพื่อเริ่มระบบอัติโนมัติ"
LangString LSTR_58 1054 " "
LangString LSTR_59 1054 &ปิด
LangString LSTR_60 1054 AeMenu


; LANG: 1025
LangString LSTR_0 1025 "AeMenu 1.0.0"
LangString LSTR_1 1025 "تنصيب $(LSTR_2)"
LangString LSTR_2 1025 AeMenu
LangString LSTR_5 1025 "لا يستطيع الكتابة: "
LangString LSTR_6 1025 "فشل النسخ"
LangString LSTR_7 1025 "نسخ إلى"
LangString LSTR_8 1025 "لم يتمكن من إيجاد الرمز :"
LangString LSTR_9 1025 "لم يتمكن من تحميل :"
LangString LSTR_10 1025 "إنشاء مجلد"
LangString LSTR_11 1025 "إنشاء إختصار: "
LangString LSTR_13 1025 "حذف ملف: "
LangString LSTR_14 1025 "حذف بعد إعادة التشغيل: "
LangString LSTR_15 1025 "خلل أثناء إنشاء إختصار: "
LangString LSTR_17 1025 "خلل أثناء فتح البيانات المضغوطة! منصب تالف؟"
LangString LSTR_20 1025 "تنفيذ: "
LangString LSTR_21 1025 "إستخراج: "
LangString LSTR_22 1025 "إستخراج: خلل أثناء الكتابة إلى ملف "
LangString LSTR_23 1025 "المنصّب تالف: شفرة غير صالحة"
LangString LSTR_24 1025 "لا توجد OLE لـِ: "
LangString LSTR_25 1025 "مجلد الإخراج: "
LangString LSTR_26 1025 "إزالة مجلد: "
LangString LSTR_27 1025 "إعادة تسمية بعد إعادة التشغيل: "
LangString LSTR_28 1025 "إعادة تسمية: "
LangString LSTR_29 1025 "تخطى: "
LangString LSTR_30 1025 "نسخ التفاصيل إلى الذاكرة"
LangString LSTR_36 1025 "حدث خلل أثناء فتح ملف للكتابة: $\r$\n$\t\$\"$0\$\"$\r$\nإضغط إلغاء لإلغاء التنصيب،$\r$\nمحاولة لإعادة محاولة كتابة الملف،$\r$\n تجاهل لتخطي الملف"
LangString LSTR_37 1025 تنصيب
LangString LSTR_38 1025 "الرجاء الإنتظار أثناء تنصيب $(LSTR_60)."
LangString LSTR_39 1025 "إنتهى التنصيب"
LangString LSTR_40 1025 "إنتهت عملية التنصيب بنجاح."
LangString LSTR_41 1025 "إلغاء التنصيب"
LangString LSTR_42 1025 "لم ينتهي التنصيب بنجاح."
LangString LSTR_43 1025 "MS Shell Dlg"
LangString LSTR_44 1025 8
LangString LSTR_45 1025 "Windows 7 and above is required"
LangString LSTR_46 1025 "64-bit Windows is required"
LangString LSTR_47 1025 "‫لقد فشل إلغاء التثبيت ملفات التطبيق. يُرجى محاولة تشغيل أداة التثبيت مرة أخرى."
LangString LSTR_48 1025 "‫لم يتمكن من إغلاق AeMenu $\r$\nيُرجى إغلاقه يدويا ثم الضغط مرة أخرى على إعادة المحاولة للاستمرار.‏"
LangString LSTR_49 1025 "Installing, please wait..."
LangString LSTR_50 1025 "‫إن AeMenu يعمل حاليا.$\r$\n‫يُرجى الضغط على « موافق » لغلقه.$\r$\n‫إذا لم يُغلَق، يُرجى محاولة إغلاقه يدويا."
LangString LSTR_51 1025 إختياري
LangString LSTR_52 1025 إلغاء
LangString LSTR_53 1025 "إ&ظهار التفاصيل"
LangString LSTR_54 1025 إنتهى
LangString LSTR_55 1025 "< ال&سابق"
LangString LSTR_56 1025 "ال&تالي >"
LangString LSTR_57 1025 "إضغط على التالي للمتابعة."
LangString LSTR_58 1025 " "
LangString LSTR_59 1025 إ&غلاق
LangString LSTR_60 1025 AeMenu


; LANG: 1058
LangString LSTR_0 1058 "AeMenu 1.0.0"
LangString LSTR_1 1058 "$(LSTR_2) Встановлення"
LangString LSTR_2 1058 AeMenu
LangString LSTR_5 1058 "Неможливо записати: "
LangString LSTR_6 1058 "Не вдалося копіювати"
LangString LSTR_7 1058 "Копіювання в "
LangString LSTR_8 1058 "Неможливо знайти символ: "
LangString LSTR_9 1058 "Неможливо завантажити: "
LangString LSTR_10 1058 "Створення теки: "
LangString LSTR_11 1058 "Створення ярлика: "
LangString LSTR_13 1058 "Видалення файлу: "
LangString LSTR_14 1058 "Видалення після перезавантаження: "
LangString LSTR_15 1058 "Помилка створення ярлика: "
LangString LSTR_17 1058 "Неможливо витягнути дані. Можливо пошкоджений дистрибутив."
LangString LSTR_20 1058 "Виконання: "
LangString LSTR_21 1058 "Витягнення: "
LangString LSTR_22 1058 "Витягнення: помилка запису файла"
LangString LSTR_23 1058 "Дистрибутив пошкоджений: помилковий код відповіді"
LangString LSTR_24 1058 "Немає OLE для: "
LangString LSTR_25 1058 "Тека призначення: "
LangString LSTR_26 1058 "Видалення теки: "
LangString LSTR_27 1058 "Переіменування після перезаванаження: "
LangString LSTR_28 1058 "Перейменування: "
LangString LSTR_29 1058 "Пропущено: "
LangString LSTR_30 1058 "Копіювати деталі у буфер обміну"
LangString LSTR_36 1058 "Неможливо відкрити файл для запису: $\r$\n$\t$\"$0$\"$\r$\nНатисніть Перервати для того, щоб перервати встановлення,$\r$\nПовторити для того, щоб повторити спробу запису у файл, чи$\r$\nІгнорувати для того, щоб пропустити цю дію"
LangString LSTR_37 1058 "Копіювання файлів"
LangString LSTR_38 1058 "Зачекайте, доки програма встановлення скопіює всі необхідні файли $(LSTR_60)."
LangString LSTR_39 1058 "Встановлення завершено"
LangString LSTR_40 1058 "Встановлення успішно завершено."
LangString LSTR_41 1058 "Встановлення перервана"
LangString LSTR_42 1058 "Встановлення не було успішно завершено."
LangString LSTR_43 1058 "MS Shell Dlg"
LangString LSTR_44 1058 8
LangString LSTR_45 1058 "Windows 7 and above is required"
LangString LSTR_46 1058 "64-bit Windows is required"
LangString LSTR_47 1058 "Не вдалось видалити старі файли застосунку. Будь ласка, спробуйте запустити встановлювач знов."
LangString LSTR_48 1058 "Неможливо закрити AeMenu. $\r$\nЗакрийте його вручну та натисніть Повторити, щоб продовжити."
LangString LSTR_49 1058 "Installing, please wait..."
LangString LSTR_50 1058 "AeMenu запущено.$\r$\nКлацніть ОК для завершення.$\r$\nЯкщо завершення не вдалось — спробуйте вручну."
LangString LSTR_51 1058 "По вибору"
LangString LSTR_52 1058 Скасувати
LangString LSTR_53 1058 Подробиці
LangString LSTR_54 1058 Завершено
LangString LSTR_55 1058 "< &Назад"
LangString LSTR_56 1058 "&Далі >"
LangString LSTR_57 1058 "Натисніть Далі щоб продовжити"
LangString LSTR_58 1058 " "
LangString LSTR_59 1058 &Закрити
LangString LSTR_60 1058 AeMenu


; LANG: 2070
LangString LSTR_0 2070 "AeMenu 1.0.0"
LangString LSTR_1 2070 "Instalação de $(LSTR_2)"
LangString LSTR_2 2070 AeMenu
LangString LSTR_5 2070 "Não foi possível escrever: "
LangString LSTR_6 2070 "Falha ao copiar"
LangString LSTR_7 2070 "Copiar para "
LangString LSTR_8 2070 "Símbolo não encontrado: "
LangString LSTR_9 2070 "Não foi possível carregar: "
LangString LSTR_10 2070 "Criando diretório: "
LangString LSTR_11 2070 "Criando atalho: "
LangString LSTR_13 2070 "Apagando ficheiro: "
LangString LSTR_14 2070 "Apagar ao reiniciar: "
LangString LSTR_15 2070 "Erro ao criar atalho: "
LangString LSTR_17 2070 "Erro ao descomprimir dados! Instalador corrompido?"
LangString LSTR_20 2070 "Executando: "
LangString LSTR_21 2070 "Extraindo: "
LangString LSTR_22 2070 "Extraindo: erro ao escrever ficheiro "
LangString LSTR_23 2070 "Instalador corrompido: código de operação inválido"
LangString LSTR_24 2070 "Sem OLE para: "
LangString LSTR_25 2070 "Pasta de destino: "
LangString LSTR_26 2070 "Removendo pasta: "
LangString LSTR_27 2070 "Renomear ao reiniciar: "
LangString LSTR_28 2070 "Renomeando: "
LangString LSTR_29 2070 "Ignorado: "
LangString LSTR_30 2070 "Copiar detalhes para a Área de Transfêrencia"
LangString LSTR_36 2070 "Erro ao abrir ficheiro para escrita: $\r$\n$\t$\"$0$\"$\r$\nClique em Abortar para abortar a instalação,$\r$\nRepetir para tentar novamente a escrita do ficheiro, ou$\r$\nIgnorar para ignorar este ficheiro."
LangString LSTR_37 2070 Instalando
LangString LSTR_38 2070 "Por favor, aguarde enquanto o $(LSTR_60) está sendo instalado."
LangString LSTR_39 2070 "Instalação Completa"
LangString LSTR_40 2070 "A instalação foi concluída com sucesso."
LangString LSTR_41 2070 "Instalação Abortada"
LangString LSTR_42 2070 "A instalação não foi concluída com sucesso."
LangString LSTR_43 2070 "MS Shell Dlg"
LangString LSTR_44 2070 8
LangString LSTR_45 2070 "Windows 7 and above is required"
LangString LSTR_46 2070 "64-bit Windows is required"
LangString LSTR_47 2070 "Falha ao desinstalar os ficheiros da aplicação antiga. Por favor, experimente correr novamente o instalador."
LangString LSTR_48 2070 "Não é possível fechar o AeMenu. $\r$\nPor favor, feche-o manualmente e clique em ´Tentar novamente' para continuar."
LangString LSTR_49 2070 "Installing, please wait..."
LangString LSTR_50 2070 "AeMenu está a correr.$\r$\nClique em OK para o encerrar.$\r$\nSe não encerrar, tente encerrá-lo manualmente."
LangString LSTR_51 2070 Personalizado
LangString LSTR_52 2070 Cancelar
LangString LSTR_53 2070 "Ver &Detalhes"
LangString LSTR_54 2070 Concluído
LangString LSTR_55 2070 "< &Anterior"
LangString LSTR_56 2070 "&Seguinte >"
LangString LSTR_57 2070 "Clique em 'Seguinte' para continuar."
LangString LSTR_58 2070 " "
LangString LSTR_59 2070 &Fechar
LangString LSTR_60 2070 AeMenu


; LANG: 1044
LangString LSTR_0 1044 "AeMenu 1.0.0"
LangString LSTR_1 1044 "$(LSTR_2) installasjon"
LangString LSTR_2 1044 AeMenu
LangString LSTR_5 1044 "Kan ikke skrive: "
LangString LSTR_6 1044 "Kopiering mislyktes"
LangString LSTR_7 1044 "Kopier til "
LangString LSTR_8 1044 "Kunne ikke finne symbol: "
LangString LSTR_9 1044 "Kunne ikke laste: "
LangString LSTR_10 1044 "Lag mappe: "
LangString LSTR_11 1044 "Lag snarvei: "
LangString LSTR_13 1044 "Slett fil: "
LangString LSTR_14 1044 "Slett ved omstart: "
LangString LSTR_15 1044 "Feil under opprettelse av snarvei: "
LangString LSTR_17 1044 "Feil under utpakking av data! Installasjonsprogrammet kan være skadet."
LangString LSTR_20 1044 "Kjøre: "
LangString LSTR_21 1044 "Pakk ut: "
LangString LSTR_22 1044 "Pakk ut: Feil under skriving til fil "
LangString LSTR_23 1044 "Installasjonsprogrammet er skadet: ukjent kode"
LangString LSTR_24 1044 "Ingen OLE for: "
LangString LSTR_25 1044 "Ut-mappe: "
LangString LSTR_26 1044 "Fjern mappe: "
LangString LSTR_27 1044 "Gi nytt navn ved omstart: "
LangString LSTR_28 1044 "Gi nytt navn: "
LangString LSTR_29 1044 "Hoppet over: "
LangString LSTR_30 1044 "Kopier detaljer til utklippstavlen"
LangString LSTR_36 1044 "Feil under åpning av fil for skriving: $\r$\n$\t\$\"$0\$\"$\r$\nTrykk Avbryt for å avbryte installasjonen,$\r$\nPrøv igjen for å prøve igjen, eller$\r$\nIgnorer for å hoppe over denne filen"
LangString LSTR_37 1044 "Installasjonen pågår"
LangString LSTR_38 1044 "Vennligst vent mens $(LSTR_60) blir installert."
LangString LSTR_39 1044 "Installasjonen er ferdig"
LangString LSTR_40 1044 "Installasjonen ble fullført uten feil."
LangString LSTR_41 1044 "Installasjonen er avbrutt"
LangString LSTR_42 1044 "Installasjonen ble ikke fullført riktig."
LangString LSTR_43 1044 "MS Shell Dlg"
LangString LSTR_44 1044 8
LangString LSTR_45 1044 "Windows 7 and above is required"
LangString LSTR_46 1044 "64-bit Windows is required"
LangString LSTR_47 1044 "Failed to uninstall old application files. Please try running the installer again."
LangString LSTR_48 1044 "AeMenu cannot be closed. $\r$\nPlease close it manually and click Retry to continue."
LangString LSTR_49 1044 "Installing, please wait..."
LangString LSTR_50 1044 "AeMenu is running.$\r$\nClick OK to close it.$\r$\nIf it doesn't close, try closing it manually."
LangString LSTR_51 1044 Egendefinert
LangString LSTR_52 1044 Avbryt
LangString LSTR_53 1044 "Vis &detaljer"
LangString LSTR_54 1044 Ferdig
LangString LSTR_55 1044 "< &Tilbake"
LangString LSTR_56 1044 "&Neste >"
LangString LSTR_57 1044 "Trykk Neste for å fortsette."
LangString LSTR_58 1044 " "
LangString LSTR_59 1044 &Lukk
LangString LSTR_60 1044 AeMenu


; LANG: 1030
LangString LSTR_0 1030 "AeMenu 1.0.0"
LangString LSTR_1 1030 "$(LSTR_2) Installation"
LangString LSTR_2 1030 AeMenu
LangString LSTR_5 1030 "Kan ikke skrive: "
LangString LSTR_6 1030 "Kopiering mislykkedes"
LangString LSTR_7 1030 "Kopier til "
LangString LSTR_8 1030 "Kunne ikke finde symbol: "
LangString LSTR_9 1030 "Kunne ikke indlæse: "
LangString LSTR_10 1030 "Opret mappe: "
LangString LSTR_11 1030 "Opret genvej: "
LangString LSTR_13 1030 "Slet fil: "
LangString LSTR_14 1030 "Slet ved genstart: "
LangString LSTR_15 1030 "Fejl ved oprettelse af genvej: "
LangString LSTR_17 1030 "Fejl ved udpakning af data! Beskadiget installationsguide?"
LangString LSTR_20 1030 "Kør: "
LangString LSTR_21 1030 "Udpak: "
LangString LSTR_22 1030 "Udpak: fejl ved skrivning til fil "
LangString LSTR_23 1030 "Beskadiget installationsguide: ugyldig opcode"
LangString LSTR_24 1030 "Ingen OLE for: "
LangString LSTR_25 1030 "Outputmappe: "
LangString LSTR_26 1030 "Slet mappe: "
LangString LSTR_27 1030 "Omdøb ved genstart: "
LangString LSTR_28 1030 "Omdøb: "
LangString LSTR_29 1030 "Sprunget over: "
LangString LSTR_30 1030 "Kopier detaljer til udklipsholderen"
LangString LSTR_36 1030 "Fejl ved skrivning af fil til skrivning: $\r$\n$\r$\n$0$\r$\n$\r$\nTryk på Annuller for at stoppe installationen,$\r$\nPrøv igen for at prøve igen, eller$\r$\nIgnorer for at springe over denne fil."
LangString LSTR_37 1030 Installerer
LangString LSTR_38 1030 "Vent venligst mens $(LSTR_60) bliver installeret."
LangString LSTR_39 1030 "Installation gennemført"
LangString LSTR_40 1030 "Installationsguiden blev gennemført."
LangString LSTR_41 1030 "Installation afbrudt"
LangString LSTR_42 1030 "Installationsguiden blev ikke gennemført."
LangString LSTR_43 1030 "MS Shell Dlg"
LangString LSTR_44 1030 8
LangString LSTR_45 1030 "Windows 7 og højere er nødvendig"
LangString LSTR_46 1030 "64-bit Windows er påkrævet"
LangString LSTR_47 1030 "Det lykkedes ikke at afinstallere gamle applikationsfiler. Prøv venligst at køre installationsprogrammet igen."
LangString LSTR_48 1030 "AeMenu kan ikke afsluttes $\r$\nLuk den manuelt og klik Prøv igen for at fortsætte"
LangString LSTR_49 1030 "Installerer, vent venligst..."
LangString LSTR_50 1030 "AeMenu kører.$\r$\nKlik OK for at lukke den.$\r$\nHvis den ikke lukker, kan du prøve at lukke den manuelt."
LangString LSTR_51 1030 Brugerdefineret
LangString LSTR_52 1030 Annuller
LangString LSTR_53 1030 "Vis &detaljer"
LangString LSTR_54 1030 Gennemført
LangString LSTR_55 1030 "< &Tilbage"
LangString LSTR_56 1030 "&Næste >"
LangString LSTR_57 1030 "Tryk på Næste for at fortsætte."
LangString LSTR_58 1030 " "
LangString LSTR_59 1030 &Luk
LangString LSTR_60 1030 AeMenu


; LANG: 3082
LangString LSTR_0 3082 "AeMenu 1.0.0"
LangString LSTR_1 3082 "Instalación de $(LSTR_2)"
LangString LSTR_2 3082 AeMenu
LangString LSTR_5 3082 "No pudo escribirse: "
LangString LSTR_6 3082 "Copia fallida"
LangString LSTR_7 3082 "Copiar a "
LangString LSTR_8 3082 "No se encontró simbolo: "
LangString LSTR_9 3082 "No pudo cargarse: "
LangString LSTR_10 3082 "Creando carpeta: "
LangString LSTR_11 3082 "Creando acceso directo: "
LangString LSTR_13 3082 "Borrar archivo: "
LangString LSTR_14 3082 "Borrar al reinicio: "
LangString LSTR_15 3082 "Error creando acceso directo: "
LangString LSTR_17 3082 "¡Error descomprimiendo datos! ¿Instalador corrupto?"
LangString LSTR_20 3082 "Ejecutando: "
LangString LSTR_21 3082 "Extrayendo: "
LangString LSTR_22 3082 "Extrayendo: error escribiendo al archivo "
LangString LSTR_23 3082 "Instalador corrupto: código de operación no válido"
LangString LSTR_24 3082 "Sin OLE para: "
LangString LSTR_25 3082 "Carpeta de salida: "
LangString LSTR_26 3082 "Eliminar carpeta: "
LangString LSTR_27 3082 "Renombrar al reinicio: "
LangString LSTR_28 3082 "Renombrar: "
LangString LSTR_29 3082 "Omitido: "
LangString LSTR_30 3082 "Copiar Detalles al Portapapeles"
LangString LSTR_36 3082 "Error abriendo archivo para escribir: $\r$\n$\r$\n$0$\r$\n$\r$\nPresione Abortar para detener la instalación,$\r$\nReintentar para probar otra vez, o$\r$\nOmitir para ignorar este archivo."
LangString LSTR_37 3082 Instalando
LangString LSTR_38 3082 "Por favor espere mientras $(LSTR_60) se instala."
LangString LSTR_39 3082 "Instalación Finalizada"
LangString LSTR_40 3082 "La instalación se ha finalizado correctamente."
LangString LSTR_41 3082 "Instalación Abortada"
LangString LSTR_42 3082 "La instalación no se terminó correctamente."
LangString LSTR_43 3082 "MS Shell Dlg"
LangString LSTR_44 3082 8
LangString LSTR_45 3082 "Se necesita Windows 7 o una versión superior."
LangString LSTR_46 3082 "Windows de 64 bits es requerido"
LangString LSTR_47 3082 "Fallo al desinstalar archivos antiguos de la aplicación. Inténtalo de nuevo más tarde."
LangString LSTR_48 3082 "No se puede cerrar AeMenu. $\r$\nPor favor cierra la aplicación manualmente y haz clic en reintentar para continuar."
LangString LSTR_49 3082 "Instalando, espera un momento..."
LangString LSTR_50 3082 "AeMenu está activa.$\r$\nHaz clic en Aceptar para cerrarla.$\r$\nSi no se cierra, inténtalo manualmente."
LangString LSTR_51 3082 Personalizada
LangString LSTR_52 3082 Cancelar
LangString LSTR_53 3082 "Mostrar &detalles"
LangString LSTR_54 3082 Finalizado
LangString LSTR_55 3082 "< &Atrás"
LangString LSTR_56 3082 "&Siguiente >"
LangString LSTR_57 3082 "Presione Siguiente para continuar."
LangString LSTR_58 3082 " "
LangString LSTR_59 3082 &Cerrar
LangString LSTR_60 3082 AeMenu


; LANG: 1035
LangString LSTR_0 1035 "AeMenu 1.0.0"
LangString LSTR_1 1035 "$(LSTR_2) -ohjelman asennus"
LangString LSTR_2 1035 AeMenu
LangString LSTR_5 1035 "Ei voi kirjoittaa: "
LangString LSTR_6 1035 "Kopiointi epäonnistui"
LangString LSTR_7 1035 "Kopioidaan kohteeseen "
LangString LSTR_8 1035 "Symbolia ei löytynyt: "
LangString LSTR_9 1035 "Ei voitu ladata: "
LangString LSTR_10 1035 "Luo kansio: "
LangString LSTR_11 1035 "Luo pikakuvake: "
LangString LSTR_13 1035 "Poista: "
LangString LSTR_14 1035 "Poista käynnistyksen yhteydessä: "
LangString LSTR_15 1035 "Virhe luotaessa pikakuvaketta: "
LangString LSTR_17 1035 "Pakettia ei voitu purkaa. Korruptoitunut asennusohjelma?"
LangString LSTR_20 1035 "Suorita: "
LangString LSTR_21 1035 "Pura: "
LangString LSTR_22 1035 "Pura: tiedostoon ei voitu kirjoittaa "
LangString LSTR_23 1035 "Asennuspaketti on vioittunut: virheellinen opcode"
LangString LSTR_24 1035 "Ei OLEa: "
LangString LSTR_25 1035 "Kansio: "
LangString LSTR_26 1035 "Poista kansio: "
LangString LSTR_27 1035 "Muuta nimi uudelleenkäynnistyksen yhteydessä: "
LangString LSTR_28 1035 "Muuta nimi: "
LangString LSTR_29 1035 "Ohitettiin: "
LangString LSTR_30 1035 "Kopioi tiedot leikepöydälle"
LangString LSTR_36 1035 "Tiedostoon ei voitu kirjoittaa: $\r$\n$\t$\"$0$\"$\r$\nLopeta asennus valitsemalla Hylkää,$\r$\nyritä uudelleen valitsemalla Uudelleen, tai$\r$\nohita tiedosto valitsemalla Ohita"
LangString LSTR_37 1035 Asennetaan
LangString LSTR_38 1035 "Odota... $(LSTR_60) asennetaan..."
LangString LSTR_39 1035 "Asennus valmis."
LangString LSTR_40 1035 "Asennus onnistui."
LangString LSTR_41 1035 "Asennus keskeytyi."
LangString LSTR_42 1035 "Asennus ei onnistunut."
LangString LSTR_43 1035 "MS Shell Dlg"
LangString LSTR_44 1035 8
LangString LSTR_45 1035 "Windows 7 tai uudempi vaaditaan"
LangString LSTR_46 1035 "64-bittinen Windows on pakollinen"
LangString LSTR_47 1035 "Vanhojen sovellustiedostojen poisto epäonnistui. Yritä ajaa asennusohjelma uudelleen."
LangString LSTR_48 1035 "AeMenu ei voi sulkea. $\r$\nSulje se itse ja napsauta Yritä uudelleen jatkaaksesi."
LangString LSTR_49 1035 "Asennetaan, odota..."
LangString LSTR_50 1035 "AeMenu on käynnissä.$\r$\nValitse OK sulkeaksesi sen.$\r$\nJos se ei sulkeudu, yritä sulkea se manuaalisesti."
LangString LSTR_51 1035 Oma
LangString LSTR_52 1035 Peruuta
LangString LSTR_53 1035 "&Näytä tiedot"
LangString LSTR_54 1035 Valmis
LangString LSTR_55 1035 "< &Takaisin"
LangString LSTR_56 1035 "&Seuraava >"
LangString LSTR_57 1035 "Valitse Seuraava jatkaaksesi."
LangString LSTR_58 1035 " "
LangString LSTR_59 1035 &Sulje
LangString LSTR_60 1035 AeMenu


; LANG: 1043
LangString LSTR_0 1043 "AeMenu 1.0.0"
LangString LSTR_1 1043 $(LSTR_2)-installatie
LangString LSTR_2 1043 AeMenu
LangString LSTR_5 1043 "Kon niet schrijven: "
LangString LSTR_6 1043 "Kopiëren mislukt"
LangString LSTR_7 1043 "Kopiëren naar "
LangString LSTR_8 1043 "Kon symbool niet vinden: "
LangString LSTR_9 1043 "Kon niet laden: "
LangString LSTR_10 1043 "Map maken: "
LangString LSTR_11 1043 "Snelkoppeling maken: "
LangString LSTR_13 1043 "Bestand verwijderen: "
LangString LSTR_14 1043 "Verwijderen na opnieuw opstarten: "
LangString LSTR_15 1043 "Fout bij maken snelkoppeling: "
LangString LSTR_17 1043 "Fout bij uitpakken van gegevens! Gegevens beschadigd?"
LangString LSTR_20 1043 "Uitvoeren: "
LangString LSTR_21 1043 "Uitpakken: "
LangString LSTR_22 1043 "Uitpakken: fout bij schrijven naar bestand "
LangString LSTR_23 1043 "Installatieprogramma beschadigd: ongeldige opcode"
LangString LSTR_24 1043 "Geen OLE voor: "
LangString LSTR_25 1043 "Uitvoermap: "
LangString LSTR_26 1043 "Map verwijderen: "
LangString LSTR_27 1043 "Hernoemen na opnieuw opstarten: "
LangString LSTR_28 1043 "Hernoemen: "
LangString LSTR_29 1043 "Overgeslagen: "
LangString LSTR_30 1043 "Details kopiëren naar klembord"
LangString LSTR_36 1043 "Fout bij het schrijven naar bestand: $\r$\n$\r$\n$0$\r$\n$\r$\nKlik op Afbreken om de installatie te stoppen,$\r$\nOpnieuw om het opnieuw te proberen of$\r$\nNegeren om dit bestand over te slaan."
LangString LSTR_37 1043 "Bezig met installeren"
LangString LSTR_38 1043 "Een ogenblik geduld terwijl $(LSTR_60) wordt geïnstalleerd."
LangString LSTR_39 1043 "Installatie voltooid"
LangString LSTR_40 1043 "De installatie is succesvol voltooid."
LangString LSTR_41 1043 "Installatie afgebroken"
LangString LSTR_42 1043 "De installatie is niet voltooid."
LangString LSTR_43 1043 "MS Shell Dlg"
LangString LSTR_44 1043 8
LangString LSTR_45 1043 "Windows 7 en hoger is vereist"
LangString LSTR_46 1043 "64-bit Windows is vereist"
LangString LSTR_47 1043 "Het deïnstalleren van oude applicatiebestanden is mislukt. Voer het installatiebestand opnieuw uit om te proberen dit probleem te verhelpen."
LangString LSTR_48 1043 "AeMenu kan niet automatisch worden afgesloten. $\r$\nSluit zelf de AeMenu app en klik vervolgens op ‘Opnieuw proberen’."
LangString LSTR_49 1043 "Installeren, even geduld..."
LangString LSTR_50 1043 "AeMenu is nog actief.$\r$\nKlik op OK om de applicatie te sluiten.$\r$\nAls de applicatie vervolgens nog niet sluit, probeer dan om de applicatie zelf te sluiten."
LangString LSTR_51 1043 Aangepast
LangString LSTR_52 1043 Annuleren
LangString LSTR_53 1043 "&Details tonen"
LangString LSTR_54 1043 Voltooid
LangString LSTR_55 1043 "< V&orige"
LangString LSTR_56 1043 "&Volgende >"
LangString LSTR_57 1043 "Klik op Volgende om verder te gaan."
LangString LSTR_58 1043 " "
LangString LSTR_59 1043 &Afsluiten
LangString LSTR_60 1043 AeMenu


; LANG: 1053
LangString LSTR_0 1053 "AeMenu 1.0.0"
LangString LSTR_1 1053 "$(LSTR_2) Installation"
LangString LSTR_2 1053 AeMenu
LangString LSTR_5 1053 "Kan inte skriva: "
LangString LSTR_6 1053 "Kopiering misslyckades"
LangString LSTR_7 1053 "Kopiera till "
LangString LSTR_8 1053 "Kunde inte hitta symbol: "
LangString LSTR_9 1053 "Kunde inte ladda: "
LangString LSTR_10 1053 "Skapa katalog: "
LangString LSTR_11 1053 "Skapa genväg: "
LangString LSTR_13 1053 "Radera fil: "
LangString LSTR_14 1053 "Radera vid omstart: "
LangString LSTR_15 1053 "Fel vid skapande av genväg: "
LangString LSTR_17 1053 "Fel vid uppackning av data! Skadat installationspaket?"
LangString LSTR_20 1053 "Kör: "
LangString LSTR_21 1053 "Extrahera: "
LangString LSTR_22 1053 "Extrahera: fel vid skrivning till fil "
LangString LSTR_23 1053 "Installationspaket skadat: ogiltig opcode"
LangString LSTR_24 1053 "Ingen OLE för: "
LangString LSTR_25 1053 "Målkatalog: "
LangString LSTR_26 1053 "Ta bort katalog: "
LangString LSTR_27 1053 "Döp om vid omstart: "
LangString LSTR_28 1053 "Döp om: "
LangString LSTR_29 1053 "Ignorerad: "
LangString LSTR_30 1053 "Kopiera detaljinformation till klippbordet"
LangString LSTR_36 1053 "Fel vid Öppning av fil för skrivning: $\r$\n$\t$\"$0$\"$\r$\nKlicka på avbryt för att avbryta installationen,$\r$\nförsök igen för att försöka skriva till filen igen, eller$\r$\nIgnorera för att skippa denna fil"
LangString LSTR_37 1053 Installerar
LangString LSTR_38 1053 "Var vänlig vänta medan $(LSTR_60) installeras."
LangString LSTR_39 1053 "Installationen är klar"
LangString LSTR_40 1053 "Guiden avslutades korrekt."
LangString LSTR_41 1053 "Installationen avbröts"
LangString LSTR_42 1053 "Guiden genomfördes inte korrekt."
LangString LSTR_43 1053 "MS Shell Dlg"
LangString LSTR_44 1053 8
LangString LSTR_45 1053 "Windows 7 eller högre krävs"
LangString LSTR_46 1053 "64-bitars Windows krävs"
LangString LSTR_47 1053 "Det gick inte att avinstallera gamla programfiler. Försök att köra installationsprogrammet igen."
LangString LSTR_48 1053 "AeMenu går inte att stängas. $\r$\nVänligen stäng det manuellt och klicka på Försök igen för att fortsätta."
LangString LSTR_49 1053 "Installerar, vänligen vänta..."
LangString LSTR_50 1053 "AeMenu är igång.$\r$\nKlicka på OK för att stänga det.$\r$\nOm det inte stängs, försök att stänga det manuellt."
LangString LSTR_51 1053 Valfri
LangString LSTR_52 1053 Avbryt
LangString LSTR_53 1053 "Visa &detaljer"
LangString LSTR_54 1053 Slutförd
LangString LSTR_55 1053 "< &Tillbaka"
LangString LSTR_56 1053 "&Nästa >"
LangString LSTR_57 1053 "Klicka på Nästa för att fortsätta."
LangString LSTR_58 1053 " "
LangString LSTR_59 1053 &Stäng
LangString LSTR_60 1053 AeMenu


; LANG: 1055
LangString LSTR_0 1055 "AeMenu 1.0.0"
LangString LSTR_1 1055 "$(LSTR_2) Kurulumu"
LangString LSTR_2 1055 AeMenu
LangString LSTR_5 1055 "Yazılamadı: "
LangString LSTR_6 1055 "Kopyalama başarısız oldu"
LangString LSTR_7 1055 "Kayıt: "
LangString LSTR_8 1055 "Simge bulunamadı: "
LangString LSTR_9 1055 "Yüklenemedi: "
LangString LSTR_10 1055 "Dizin oluştur: "
LangString LSTR_11 1055 "Kısayol oluştur: "
LangString LSTR_13 1055 "Dosya sil: "
LangString LSTR_14 1055 "Açılışta sil: "
LangString LSTR_15 1055 "Kısayol oluşturulurken hata meydana geldi: "
LangString LSTR_17 1055 "Veriyi açarken hata meydana geldi! Acaba kurulum uygulaması mı bozuk?"
LangString LSTR_20 1055 "Çalıştır: "
LangString LSTR_21 1055 "Aç: "
LangString LSTR_22 1055 "Açma: Dosyaya yazarken hata meydana geldi "
LangString LSTR_23 1055 "Kurulum bozuk: Geçersiz kod"
LangString LSTR_24 1055 "OLE yok: "
LangString LSTR_25 1055 "Çıktı dizini: "
LangString LSTR_26 1055 "Dizini sil: "
LangString LSTR_27 1055 "Açılışta adını değiştir: "
LangString LSTR_28 1055 "Ad değiştir: "
LangString LSTR_29 1055 "Atlandı: "
LangString LSTR_30 1055 "Ayrıntıları panoya kopyala"
LangString LSTR_36 1055 "Dosya yazmak için açılırken hata meydana geldi: $\r$\n$\r$\n$0$\r$\n$\r$\nKurulumu durdurmak için Dur düğmesine,$\r$\nyeniden denemek için Yeniden Dene düğmesine,$\r$\nbu dosyayı atlamak için Yoksay düğmesine basın."
LangString LSTR_37 1055 Kuruluyor
LangString LSTR_38 1055 "Lütfen $(LSTR_60) kurulurken bekleyiniz."
LangString LSTR_39 1055 "Kurulum Tamamlandı"
LangString LSTR_40 1055 "Kurulum başarıyla tamamlandı."
LangString LSTR_41 1055 "Kurulum İptal Edildi"
LangString LSTR_42 1055 "Kurulum tam olarak tamamlanmadı."
LangString LSTR_43 1055 "MS Shell Dlg"
LangString LSTR_44 1055 8
LangString LSTR_45 1055 "Windows 7 ve üstü gereklidir"
LangString LSTR_46 1055 "64 bit Windows gerekli"
LangString LSTR_47 1055 "Failed to uninstall old application files. Please try running the installer again."
LangString LSTR_48 1055 "AeMenu kapatılamaz. $\r$\nLütfen elle kapatın ve devam etmek için Tekrar'a tıklayın"
LangString LSTR_49 1055 "Yükleniyor, lütfen bekleyin..."
LangString LSTR_50 1055 "AeMenu çalışıyor.$\r$\nKapatmak için Tamam'ı tıklayın."
LangString LSTR_51 1055 Özel
LangString LSTR_52 1055 Vazgeç
LangString LSTR_53 1055 "&Ayrıntıları göster"
LangString LSTR_54 1055 Tamamlandı
LangString LSTR_55 1055 "< &Geri"
LangString LSTR_56 1055 "İ&leri >"
LangString LSTR_57 1055 "Devam etmek için İleri düğmesine basın."
LangString LSTR_58 1055 " "
LangString LSTR_59 1055 &Kapat
LangString LSTR_60 1055 AeMenu


; LANG: 1028
LangString LSTR_0 1028 "AeMenu 1.0.0"
LangString LSTR_1 1028 "$(LSTR_2) 安裝"
LangString LSTR_2 1028 AeMenu
LangString LSTR_5 1028 "無法寫入: "
LangString LSTR_6 1028 "複製失敗 "
LangString LSTR_7 1028 "複製到: "
LangString LSTR_8 1028 "無法找到符號: "
LangString LSTR_9 1028 "無法載入: "
LangString LSTR_10 1028 "$\"建立資料夾: $\" "
LangString LSTR_11 1028 "建立捷徑: "
LangString LSTR_13 1028 "刪除檔案: "
LangString LSTR_14 1028 "重新開機後刪除: "
LangString LSTR_15 1028 "建立捷徑時發生錯誤: "
LangString LSTR_17 1028 解壓縮資料發生錯誤！安裝程式是否已損壞？
LangString LSTR_20 1028 "執行: "
LangString LSTR_21 1028 "抽取: "
LangString LSTR_22 1028 "抽取: 無法寫入檔案 "
LangString LSTR_23 1028 "安裝程式損毀: 無效的作業代碼 "
LangString LSTR_24 1028 "沒有 OLE 用於: "
LangString LSTR_25 1028 "輸出資料夾: "
LangString LSTR_26 1028 "移除資料夾: "
LangString LSTR_27 1028 "重新開機後重新命名: "
LangString LSTR_28 1028 "重新命名: "
LangString LSTR_29 1028 "已略過: "
LangString LSTR_30 1028 "複製細節到剪貼簿 "
LangString LSTR_36 1028 "無法開啟要寫入的檔案: $\r$\n$\t$\"$0$\"$\r$\n按「中止」停止安裝，$\r$\n「重試」重新嘗試寫入檔案，或$\r$\n「忽略」略過此檔案。"
LangString LSTR_37 1028 安裝
LangString LSTR_38 1028 "$(LSTR_60) 正在安裝，請稍候。"
LangString LSTR_39 1028 完成安裝
LangString LSTR_40 1028 安裝已完成。
LangString LSTR_41 1028 已中止安裝
LangString LSTR_42 1028 安裝並未完成。
LangString LSTR_43 1028 新細明體
LangString LSTR_44 1028 9
LangString LSTR_45 1028 "需要 Windows 7 或更新的系統"
LangString LSTR_46 1028 "需要 64 位元 Windows 系統"
LangString LSTR_47 1028 "無法俺安裝舊的應用程式檔案。 請嘗試再次執行安裝程式。"
LangString LSTR_48 1028 "AeMenu 無法關閉。$\r$\n請手動關閉它，然後按一下重試以繼續。"
LangString LSTR_49 1028 "正在安裝, 請稍候..."
LangString LSTR_50 1028 "AeMenu 正在執行。$\r$\n點擊 OK 關閉。$\r$\n如果無法關閉，試著手動關閉。"
LangString LSTR_51 1028 自訂
LangString LSTR_52 1028 取消
LangString LSTR_53 1028 顯示細節(&D)
LangString LSTR_54 1028 已完成
LangString LSTR_55 1028 "< 上一步(&B)"
LangString LSTR_56 1028 "下一步(&N) >"
LangString LSTR_57 1028 按「下一步(N)」繼續。
LangString LSTR_58 1028 " "
LangString LSTR_59 1028 關閉(&C)
LangString LSTR_60 1028 AeMenu


; LANG: 2052
LangString LSTR_0 2052 "AeMenu 1.0.0"
LangString LSTR_1 2052 "$(LSTR_2) 安装"
LangString LSTR_2 2052 AeMenu
LangString LSTR_5 2052 "无法写入: "
LangString LSTR_6 2052 "复制失败 "
LangString LSTR_7 2052 "复制到: "
LangString LSTR_8 2052 "无法找到符号: "
LangString LSTR_9 2052 "无法加载: "
LangString LSTR_10 2052 "$\"创建文件夹: $\" "
LangString LSTR_11 2052 "创建快捷方式: "
LangString LSTR_13 2052 "删除文件: "
LangString LSTR_14 2052 "重新启动后删除: "
LangString LSTR_15 2052 "正在创建快捷方式时发生错误: "
LangString LSTR_17 2052 正在解压缩数据发生错误！已损坏的安装程序？
LangString LSTR_20 2052 "运行: "
LangString LSTR_21 2052 "抽取: "
LangString LSTR_22 2052 "抽取: 无法写入文件 "
LangString LSTR_23 2052 "安装损毁: 无效的操作代码 "
LangString LSTR_24 2052 "没有 OLE 用于: "
LangString LSTR_25 2052 "输出目录: "
LangString LSTR_26 2052 "移除目录: "
LangString LSTR_27 2052 "重新启动后重命名: "
LangString LSTR_28 2052 "重命名: "
LangString LSTR_29 2052 "已跳过: "
LangString LSTR_30 2052 "复制细节到剪贴板 "
LangString LSTR_36 2052 "不能打开要写入的文件: $\r$\n$\t$\"$0$\"$\r$\n单击 [Abort] 停止安装，$\r$\n [Retry] 重新尝试写入文件，或$\r$\n [Ignore] 忽略这个文件。"
LangString LSTR_37 2052 正在安装
LangString LSTR_38 2052 "$(LSTR_60) 正在安装，请等候。"
LangString LSTR_39 2052 安装完成
LangString LSTR_40 2052 安装程序已成功地运行完成。
LangString LSTR_41 2052 安装己中止
LangString LSTR_42 2052 安装程序并未成功地运行完成。
LangString LSTR_43 2052 宋体
LangString LSTR_44 2052 9
LangString LSTR_45 2052 "需要 Windows 7 或以上系统"
LangString LSTR_46 2052 "需要 64 位 Windows 系统"
LangString LSTR_47 2052 "Failed to uninstall old application files. Please try running the installer again."
LangString LSTR_48 2052 "AeMenu 无法关闭。$\r$\n请手动关闭它，然后单击重试以继续。"
LangString LSTR_49 2052 "正在安装, 请稍候..."
LangString LSTR_50 2052 "AeMenu 正在运行.$\r$\n点击“确定”关闭."
LangString LSTR_51 2052 自定义
LangString LSTR_52 2052 取消(&C)
LangString LSTR_53 2052 显示细节(&D)
LangString LSTR_54 2052 已完成
LangString LSTR_55 2052 "< 上一步(&P)"
LangString LSTR_56 2052 "下一步(&N) >"
LangString LSTR_57 2052 "单击 [下一步(N)] 继续。"
LangString LSTR_58 2052 " "
LangString LSTR_59 2052 关闭(&L)
LangString LSTR_60 2052 AeMenu


; LANG: 1046
LangString LSTR_0 1046 "AeMenu 1.0.0"
LangString LSTR_1 1046 "Instalação do $(LSTR_2)"
LangString LSTR_2 1046 AeMenu
LangString LSTR_5 1046 "Não foi possível gravar: "
LangString LSTR_6 1046 "Falha ao copiar"
LangString LSTR_7 1046 "Copiar para "
LangString LSTR_8 1046 "Não foi possível localizar o símbolo: "
LangString LSTR_9 1046 "Não foi possível carregar: "
LangString LSTR_10 1046 "Criar pasta: "
LangString LSTR_11 1046 "Criar atalho: "
LangString LSTR_13 1046 "Excluir o arquivo: "
LangString LSTR_14 1046 "Excluir ao reiniciar: "
LangString LSTR_15 1046 "Erro ao criar atalho: "
LangString LSTR_17 1046 "Erro ao descomprimir os dados! Instalador corrompido?"
LangString LSTR_20 1046 "Executar: "
LangString LSTR_21 1046 "Extrair: "
LangString LSTR_22 1046 "Extrair: erro ao gravar o arquivo "
LangString LSTR_23 1046 "Instalador corrompido: opcode inválido"
LangString LSTR_24 1046 "Sem OLE para: "
LangString LSTR_25 1046 "Pasta de saída: "
LangString LSTR_26 1046 "Excluir a pasta: "
LangString LSTR_27 1046 "Renomear ao reiniciar: "
LangString LSTR_28 1046 "Renomear: "
LangString LSTR_29 1046 "Ignorado: "
LangString LSTR_30 1046 "Copiar os Detalhes para a Área de Transferência"
LangString LSTR_36 1046 "Erro ao abrir o arquivo para gravação: $\r$\n$\r$\n$0$\r$\n$\r$\nClique em Abortar para parar a instalação,$\r$\nRepetir para tentar de novo, ou$\r$\nIgnorar para pular este arquivo."
LangString LSTR_37 1046 Instalando
LangString LSTR_38 1046 "Por favor espere enquanto o $(LSTR_60) está sendo instalado."
LangString LSTR_39 1046 "Instalação Completa"
LangString LSTR_40 1046 "A instalação foi completada com sucesso."
LangString LSTR_41 1046 "Instalação Abortada"
LangString LSTR_42 1046 "A instalação não foi completada com sucesso."
LangString LSTR_43 1046 "MS Shell Dlg"
LangString LSTR_44 1046 8
LangString LSTR_45 1046 "Requer Windows 7 ou superior"
LangString LSTR_46 1046 "Requer Windows 64 bits"
LangString LSTR_47 1046 "Falha ao desinstalar os arquivos do aplicativo antigo. Por favor, tente iniciar o instalador novamente."
LangString LSTR_48 1046 "Não é possível fechar o AeMenu. $\r$\nFeche a janela do AeMenu e clique em Repetir para continuar."
LangString LSTR_49 1046 "Instalando, por favor aguarde..."
LangString LSTR_50 1046 "AeMenu está funcionando.$\r$\nClique no OK para fechar.$\r$\nSe não fechar, tente fechá-lo manualmente."
LangString LSTR_51 1046 Personalizado
LangString LSTR_52 1046 Cancelar
LangString LSTR_53 1046 "Mostrar &detalhes"
LangString LSTR_54 1046 Completado
LangString LSTR_55 1046 "< &Voltar"
LangString LSTR_56 1046 "&Próximo >"
LangString LSTR_57 1046 "Clique em Próximo para continuar."
LangString LSTR_58 1046 " "
LangString LSTR_59 1046 &Fechar
LangString LSTR_60 1046 AeMenu


; LANG: 1045
LangString LSTR_0 1045 "AeMenu 1.0.0"
LangString LSTR_1 1045 "Instalator $(LSTR_2)"
LangString LSTR_2 1045 AeMenu
LangString LSTR_5 1045 "Nie można zapisać: "
LangString LSTR_6 1045 "Błąd kopiowania"
LangString LSTR_7 1045 "Kopiuj do "
LangString LSTR_8 1045 "Nie można odnaleźć symbolu: "
LangString LSTR_9 1045 "Nie można wczytać: "
LangString LSTR_10 1045 "Utwórz folder: "
LangString LSTR_11 1045 "Utwórz skrót: "
LangString LSTR_13 1045 "Usuń plik: "
LangString LSTR_14 1045 "Usuń przy ponownym uruchomieniu: "
LangString LSTR_15 1045 "Błąd tworzenia skrótu: "
LangString LSTR_17 1045 "Błąd wyodrębniania danych! Uszkodzony instalator?"
LangString LSTR_20 1045 "Uruchom: "
LangString LSTR_21 1045 "Wyodrębnij: "
LangString LSTR_22 1045 "Wyodrębnij: błąd zapisu do pliku "
LangString LSTR_23 1045 "Instalator uszkodzony: nieprawidłowy kod operacji"
LangString LSTR_24 1045 "Brak OLE dla: "
LangString LSTR_25 1045 "Folder wyjściowy: "
LangString LSTR_26 1045 "Usuń folder: "
LangString LSTR_27 1045 "Zmień nazwę przy ponownym uruchomieniu: "
LangString LSTR_28 1045 "Zmień nazwę: "
LangString LSTR_29 1045 "Pominięte: "
LangString LSTR_30 1045 "Kopiuj szczegóły do schowka"
LangString LSTR_36 1045 "Błąd otwarcia pliku do zapisu: $\r$\n$\r$\n$0$\r$\n$\r$\nWybierz 'Anuluj', aby przerwać instalację,$\r$\n'Ponów', aby ponowić zapis do pliku lub$\r$\n'Ignoruj', aby pominąć ten plik."
LangString LSTR_37 1045 Instalacja
LangString LSTR_38 1045 "Proszę czekać, trwa instalacja $(LSTR_60)."
LangString LSTR_39 1045 "Zakończono instalację"
LangString LSTR_40 1045 "Instalacja zakończona pomyślnie."
LangString LSTR_41 1045 "Instalacja przerwana"
LangString LSTR_42 1045 "Instalacja nie została zakończona pomyślnie."
LangString LSTR_43 1045 "MS Shell Dlg"
LangString LSTR_44 1045 8
LangString LSTR_45 1045 "Windows 7 lub nowszy jest wymagany"
LangString LSTR_46 1045 "Windows 64-bitowy jest wymagany"
LangString LSTR_47 1045 "Nie udało się usunąć plików starej wersji aplikacji. Spróbuj ponownie uruchomić instalator."
LangString LSTR_48 1045 "Nie można zamknąć AeMenu. $\r$\nZamknij aplikację i kliknij Ponów, aby kontynuować."
LangString LSTR_49 1045 "Zaczekaj na ukończenie instalacji..."
LangString LSTR_50 1045 "Aplikacja AeMenu jest uruchomiona.$\r$\nKliknij OK, aby ją zamknąć.$\r$\nJeśli nie zostanie zamknięta, spróbuj zamknąć ją ręcznie."
LangString LSTR_51 1045 Użytkownika
LangString LSTR_52 1045 Anuluj
LangString LSTR_53 1045 "Pokaż &szczegóły"
LangString LSTR_54 1045 Zakończono
LangString LSTR_55 1045 "< &Wstecz"
LangString LSTR_56 1045 "&Dalej >"
LangString LSTR_57 1045 "Kliknij przycisk 'Dalej', aby kontynuować."
LangString LSTR_58 1045 " "
LangString LSTR_59 1045 &Zamknij
LangString LSTR_60 1045 AeMenu


; LANG: 1038
LangString LSTR_0 1038 "AeMenu 1.0.0"
LangString LSTR_1 1038 "$(LSTR_2) Telepítő"
LangString LSTR_2 1038 AeMenu
LangString LSTR_5 1038 "Nem írható: "
LangString LSTR_6 1038 "A másolás megszakadt"
LangString LSTR_7 1038 "Másolás ide: "
LangString LSTR_8 1038 "A következő szimbólum nem található: "
LangString LSTR_9 1038 "Nem tölthető be: "
LangString LSTR_10 1038 "Mappa létrehozás: "
LangString LSTR_11 1038 "Parancsikon létrehozása: "
LangString LSTR_13 1038 "Törölt fájl: "
LangString LSTR_14 1038 "Rendszerindításkor törlendő: "
LangString LSTR_15 1038 "Hiba a parancsikon létrehozásakor: "
LangString LSTR_17 1038 "Hiba az adatok kibontásakor! Megsérült a Telepítő?"
LangString LSTR_20 1038 "Végrehajtás: "
LangString LSTR_21 1038 "Kibontás: "
LangString LSTR_22 1038 "Kibontás: Hiba a fájl írásakor "
LangString LSTR_23 1038 "Sérült a telepítő: hibás utasítás"
LangString LSTR_24 1038 "Nincs OLE: "
LangString LSTR_25 1038 "Kimeneti mappa: "
LangString LSTR_26 1038 "Mappa eltávolítása: "
LangString LSTR_27 1038 "Átnevezés rendszerindításkor: "
LangString LSTR_28 1038 "Átnevezés: "
LangString LSTR_29 1038 "Kihagyott: "
LangString LSTR_30 1038 "Adatok vágólapra másolása"
LangString LSTR_36 1038 "Hiba történt a fájl írásra történő megnyitásakor: $\r$\n$\t$\"$0$\"$\r$\nA Mégse gomb megnyomásával megszakíthatja a telepítést,$\r$\naz Ismét gombbal megismételheti a fájl írását,$\r$\na Kihagyás gombbal kihagyhatja ezt a fájlt."
LangString LSTR_37 1038 "Telepítési folyamat"
LangString LSTR_38 1038 "Kis türelmet a(z) $(LSTR_60) telepítéséig."
LangString LSTR_39 1038 "Telepítés befejeződött"
LangString LSTR_40 1038 "A telepítés sikeresen befejeződött."
LangString LSTR_41 1038 "A telepítés megszakadt"
LangString LSTR_42 1038 "A telepítés sikertelen volt."
LangString LSTR_43 1038 "MS Shell Dlg"
LangString LSTR_44 1038 8
LangString LSTR_45 1038 "Windows 7 vagy újabb szükséges"
LangString LSTR_46 1038 "64-bit Windows szükséges"
LangString LSTR_47 1038 "A régi alkalmazás állományait nem sikerült törölni. Kérlek futtasd a telepítőt újra!"
LangString LSTR_48 1038 "Nem sikerült bezárni a AeMenut. $\r$\nZárd be kézzel, majd kattints az Újra gombra a folytatáshoz!"
LangString LSTR_49 1038 "Telepítés, kérem várjon..."
LangString LSTR_50 1038 "A AeMenu alkalmazás fut.$\r$\nKattints az OK gombra a bezárásához.$\r$\nHa így sem áll le, zárd be manuálisan."
LangString LSTR_51 1038 Egyéni
LangString LSTR_52 1038 &Mégse
LangString LSTR_53 1038 &Részletek
LangString LSTR_54 1038 Kész
LangString LSTR_55 1038 "< &Vissza"
LangString LSTR_56 1038 "&Tovább >"
LangString LSTR_57 1038 "Kattintson a Tovább-ra a folytatáshoz."
LangString LSTR_58 1038 " "
LangString LSTR_59 1038 &Bezárás
LangString LSTR_60 1038 AeMenu


; LANG: 1029
LangString LSTR_0 1029 "AeMenu 1.0.0"
LangString LSTR_1 1029 "Instalace $(LSTR_2)"
LangString LSTR_2 1029 AeMenu
LangString LSTR_5 1029 "Nelze zapsat: "
LangString LSTR_6 1029 "Kopírování se nezdařilo."
LangString LSTR_7 1029 "Kopírování do "
LangString LSTR_8 1029 "Nelze najít symbol: "
LangString LSTR_9 1029 "Nelze načíst: "
LangString LSTR_10 1029 "Vytváření složky: "
LangString LSTR_11 1029 "Vytváření zástupce: "
LangString LSTR_13 1029 "Odstraňování souboru: "
LangString LSTR_14 1029 "Odstranit při restartování: "
LangString LSTR_15 1029 "Při vytváření zástupce došlo k chybě: "
LangString LSTR_17 1029 "Při dekompresi dat došlo k chybě. Byl poškozen instalační program?"
LangString LSTR_20 1029 "Spouštění: "
LangString LSTR_21 1029 "Extrahování: "
LangString LSTR_22 1029 "Extrakce: Při zápisu souboru došlo k chybě "
LangString LSTR_23 1029 "Instalační program byl poškozen: neplatný operační kód."
LangString LSTR_24 1029 "Nedostupné OLE pro: "
LangString LSTR_25 1029 "Výstupní složka: "
LangString LSTR_26 1029 "Odstraňování složky: "
LangString LSTR_27 1029 "Přejmenovat při restartování: "
LangString LSTR_28 1029 "Přejmenováno: "
LangString LSTR_29 1029 "Přeskočeno: "
LangString LSTR_30 1029 "Zkopírovat podrobnosti do schránky"
LangString LSTR_36 1029 "Soubor nelze otevřít pro zápis: $\r$\n$\t$\"$0$\"$\r$\nKlikněte na tlačítko Přerušit k ukončení instalace,$\r$\nnebo na tlačítko Opakovat k zopakování akce, nebo$\r$\n na tlačítko Ignorovat k přeskočení souboru."
LangString LSTR_37 1029 Instalace
LangString LSTR_38 1029 "Počkejte prosím na dokončení instalace programu $(LSTR_60)."
LangString LSTR_39 1029 "Instalace dokončena"
LangString LSTR_40 1029 "Instalace byla úspěšně dokončena."
LangString LSTR_41 1029 "Instalace přerušena"
LangString LSTR_42 1029 "Instalace nebyla úspěšně dokončena."
LangString LSTR_43 1029 "MS Shell Dlg"
LangString LSTR_44 1029 8
LangString LSTR_45 1029 "Jsou podporovány pouze Windows 7 a vyšší"
LangString LSTR_46 1029 "Potřebujete 64-bit Windows"
LangString LSTR_47 1029 "Nepodařilo se odinstalovat staré soubory aplikace. Zkuste prosím instalátor spustit znovu."
LangString LSTR_48 1029 "Aplikaci AeMenu se nepodařilo zavřít. $\r$\nZavřete ji ručně a poté klikněte na Opakovat pro pokračování."
LangString LSTR_49 1029 "Instaluje se, prosím vyčkejte..."
LangString LSTR_50 1029 "AeMenu běží.$\r$\nPotvrďte zavření stisknutím OK.$\r$\nPokud se aplikace nezavře sama, zavřete ji ručně."
LangString LSTR_51 1029 Vlastní
LangString LSTR_52 1029 Storno
LangString LSTR_53 1029 &Podrobnosti
LangString LSTR_54 1029 Dokončeno
LangString LSTR_55 1029 "< &Zpět"
LangString LSTR_56 1029 "&Další >"
LangString LSTR_57 1029 "Pokračujte kliknutím na tlačítko Další."
LangString LSTR_58 1029 " "
LangString LSTR_59 1029 &Zavřít
LangString LSTR_60 1029 AeMenu


; LANG: 1051
LangString LSTR_0 1051 "AeMenu 1.0.0"
LangString LSTR_1 1051 "Inštalácia programu $(LSTR_2)"
LangString LSTR_2 1051 AeMenu
LangString LSTR_5 1051 "Nemožno zapísať súbor: "
LangString LSTR_6 1051 "Kopírovanie zlyhalo."
LangString LSTR_7 1051 "Kopírovať do "
LangString LSTR_8 1051 "Nemožno nájsť symbol: "
LangString LSTR_9 1051 "Nemožno načítať: "
LangString LSTR_10 1051 "Vytvorený priečinok: "
LangString LSTR_11 1051 "Vytvorený odkaz: "
LangString LSTR_13 1051 "Vymazaný súbor: "
LangString LSTR_14 1051 "Vymazať po reštartovaní systému: "
LangString LSTR_15 1051 "Chyba pri vytváraní odkazu: "
LangString LSTR_17 1051 "Chyba pri dekomprimovaní dát! Inštalátor je pravdepodobne poškodený..."
LangString LSTR_20 1051 "Spustiť: "
LangString LSTR_21 1051 "Extrahuje sa: "
LangString LSTR_22 1051 "Chyba pri zápise do súboru "
LangString LSTR_23 1051 "Inštalátor je pravdepodobne poškodený, pretože obsahuje neplatný operačný kód."
LangString LSTR_24 1051 "Žiadny zápis OLE pre: "
LangString LSTR_25 1051 "Výstupný priečinok: "
LangString LSTR_26 1051 "Odstrániť priečinok: "
LangString LSTR_27 1051 "Premenovať po reštartovaní systému: "
LangString LSTR_28 1051 "Premenovať: "
LangString LSTR_29 1051 "Vynechané: "
LangString LSTR_30 1051 "Skopírovať podrobnosti do schránky"
LangString LSTR_36 1051 "Chyba pri otváraní súboru na zápis: $\r$\n$\r$\n$0$\r$\n$\r$\n. Ak chcete inštaláciu ukončiť, kliknite na tlačidlo Ukončiť,$\r\ ak chcete zápis súboru zopakovať, kliknite na tlačidlo Opakovať alebo kliknite na tlačidlo $\r$\nIgnorovať, ak chcete inštaláciu tohto súboru vynechať."
LangString LSTR_37 1051 Inštalácia
LangString LSTR_38 1051 "Počkajte prosím, kým prebehne inštalácia programu $(LSTR_60)."
LangString LSTR_39 1051 "Ukončenie inštalácie"
LangString LSTR_40 1051 "Inštalácia bola dokončená úspešne."
LangString LSTR_41 1051 "Prerušenie inštalácie"
LangString LSTR_42 1051 "Inštaláciu sa nepodarilo dokončiť."
LangString LSTR_43 1051 "MS Shell Dlg"
LangString LSTR_44 1051 8
LangString LSTR_45 1051 "Iba Windows 7 a vyššie je podporovaný"
LangString LSTR_46 1051 "Potrebujete 64-bit Windows"
LangString LSTR_47 1051 "Nepodarilo sa odinštalovať staré súbory aplikácie. Skúste znova spustiť inštalačný program."
LangString LSTR_48 1051 "AeMenu nie je možné zatvoriť. $\r$\nZatvorte ho ručne a pokračujte kliknutím na položku Opakovať."
LangString LSTR_49 1051 "Inštalujem, prosím počkajte..."
LangString LSTR_50 1051 "AeMenu beží.$\r$\nKliknutím na tlačidlo OK ho zatvoríte.$\r$\nAk sa nezavrie, skúste ho zatvoriť ručne."
LangString LSTR_51 1051 Voliteľná
LangString LSTR_52 1051 Zrušiť
LangString LSTR_53 1051 &Podrobnosti
LangString LSTR_54 1051 Hotovo
LangString LSTR_55 1051 "< &Späť"
LangString LSTR_56 1051 "Ď&alej >"
LangString LSTR_57 1051 "V inštalácii pokračujte kliknutím na tlačidlo Ďalej."
LangString LSTR_58 1051 " "
LangString LSTR_59 1051 &Zatvoriť
LangString LSTR_60 1051 AeMenu


; LANG: 1049
LangString LSTR_0 1049 "AeMenu 1.0.0"
LangString LSTR_1 1049 "Установка $(LSTR_2)"
LangString LSTR_2 1049 AeMenu
LangString LSTR_5 1049 "Невозможно записать: "
LangString LSTR_6 1049 "Ошибка при копировании"
LangString LSTR_7 1049 "Копирование в "
LangString LSTR_8 1049 "Невозможно найти символ: "
LangString LSTR_9 1049 "Невозможно загрузить: "
LangString LSTR_10 1049 "Создание папки: "
LangString LSTR_11 1049 "Создание ярлыка: "
LangString LSTR_13 1049 "Удаление файла: "
LangString LSTR_14 1049 "Удаление при перезагрузке ПК: "
LangString LSTR_15 1049 "Ошибка создания ярлыка: "
LangString LSTR_17 1049 "Ошибка распаковки данных! Возможно, повреждён дистрибутив."
LangString LSTR_20 1049 "Выполнение: "
LangString LSTR_21 1049 "Извлечение: "
LangString LSTR_22 1049 "Извлечение: ошибка записи файла "
LangString LSTR_23 1049 "Дистрибутив поврежден: недопустимый код"
LangString LSTR_24 1049 "Нет OLE для: "
LangString LSTR_25 1049 "Папка установки: "
LangString LSTR_26 1049 "Удаление папки: "
LangString LSTR_27 1049 "Переименование при перезагрузке ПК: "
LangString LSTR_28 1049 "Переименование: "
LangString LSTR_29 1049 "Пропуск: "
LangString LSTR_30 1049 "Копировать сведения в буфер обмена"
LangString LSTR_36 1049 "Невозможно открыть файл для записи: $\r$\n$\t$\"$0$\"$\r$\n$\"Прервать$\": остановить установку;$\r$\n$\"Повтор$\": повторить попытку;$\r$\n$\"Пропуск$\": пропустить это действие."
LangString LSTR_37 1049 "Копирование файлов"
LangString LSTR_38 1049 "Подождите, идет копирование файлов $(LSTR_60)..."
LangString LSTR_39 1049 "Установка завершена"
LangString LSTR_40 1049 "Установка успешно завершена."
LangString LSTR_41 1049 "Установка прервана"
LangString LSTR_42 1049 "Установка не завершена."
LangString LSTR_43 1049 "MS Shell Dlg"
LangString LSTR_44 1049 8
LangString LSTR_45 1049 "Требуется Windows 7 и выше"
LangString LSTR_46 1049 "Требуется Windows 64-bit"
LangString LSTR_47 1049 "Не удалось удалить старые файлы приложения. Пожалуйста, попробуйте запустить установщик заново."
LangString LSTR_48 1049 "Не удалось закрыть AeMenu. $\r$\nПожалуйста, закройте AeMenu вручную и нажмите «Повторить», чтобы продолжить."
LangString LSTR_49 1049 "Установка, пожалуйста, подождите..."
LangString LSTR_50 1049 "Приложение AeMenu запущено.$\r$\nНажмите «OK», чтобы закрыть его.$\r$\nЕсли оно не закрывается, попробуйте закрыть его вручную."
LangString LSTR_51 1049 "По выбору"
LangString LSTR_52 1049 Отмена
LangString LSTR_53 1049 &Детали...
LangString LSTR_54 1049 Готово
LangString LSTR_55 1049 "< &Назад"
LangString LSTR_56 1049 "&Далее >"
LangString LSTR_57 1049 "Нажмите кнопку $\"Далее$\" для продолжения."
LangString LSTR_58 1049 " "
LangString LSTR_59 1049 &Закрыть
LangString LSTR_60 1049 AeMenu


; LANG: 1042
LangString LSTR_0 1042 "AeMenu 1.0.0"
LangString LSTR_1 1042 "$(LSTR_2) 설치"
LangString LSTR_2 1042 AeMenu
LangString LSTR_5 1042 "기록할 수 없음: "
LangString LSTR_6 1042 "복사 실패"
LangString LSTR_7 1042 "파일 복사 "
LangString LSTR_8 1042 "심볼을 찾을 수 없음: "
LangString LSTR_9 1042 "불러올 수 없음: "
LangString LSTR_10 1042 "폴더 생성: "
LangString LSTR_11 1042 "바로 가기 생성: "
LangString LSTR_13 1042 "파일 삭제: "
LangString LSTR_14 1042 "재부팅시 삭제: "
LangString LSTR_15 1042 "바로 가기 생성 오류: "
LangString LSTR_17 1042 "압축 해제중 오류 발생! 설치 파일이 손상되었습니다."
LangString LSTR_20 1042 "실행: "
LangString LSTR_21 1042 "압축 해제: "
LangString LSTR_22 1042 "압축 해제: 파일을 기록하는 도중 오류 발생 "
LangString LSTR_23 1042 "인스톨러 손상됨: 잘못된 실행코드"
LangString LSTR_24 1042 "OLE 정보 없음: "
LangString LSTR_25 1042 "대상 폴더: "
LangString LSTR_26 1042 "폴더 삭제: "
LangString LSTR_27 1042 "재부팅시 이름 변경: "
LangString LSTR_28 1042 "이름 변경: "
LangString LSTR_29 1042 "건너뜀: "
LangString LSTR_30 1042 "자세한 내용을 클립보드로 복사"
LangString LSTR_36 1042 "다음 파일을 열 수 없습니다.: $\r$\n$\t$\"$0$\"$\r$\n'중단'을 눌러 설치를 종료하거나,$\r'다시 시도'를 눌러 다시 시도해 보거나,$\r'무시'를 눌러 이 파일을 건너 뛰세요."
LangString LSTR_37 1042 설치중
LangString LSTR_38 1042 "$(LSTR_60)(을)를 설치하는 동안 잠시 기다려 주세요."
LangString LSTR_39 1042 "설치 완료"
LangString LSTR_40 1042 "설치가 성공적으로 완료되었습니다."
LangString LSTR_41 1042 "설치 취소"
LangString LSTR_42 1042 "프로그램 설치가 취소되었습니다."
LangString LSTR_43 1042 굴림
LangString LSTR_44 1042 9
LangString LSTR_45 1042 "Windows 7 이상이 필요합니다"
LangString LSTR_46 1042 "64 비트 버전의 Windows가 필요합니다"
LangString LSTR_47 1042 "Failed to uninstall old application files. Please try running the installer again."
LangString LSTR_48 1042 "AeMenu cannot be closed. $\r$\nPlease close it manually and click Retry to continue."
LangString LSTR_49 1042 "설치하고 있습니다. 잠시 기다려주십시오..."
LangString LSTR_50 1042 "AeMenu이(가) 실행 중입니다. $\r$\nOK을 클릭하면 종료됩니다."
LangString LSTR_51 1042 "사용자 정의"
LangString LSTR_52 1042 취소
LangString LSTR_53 1042 "자세히 보기"
LangString LSTR_54 1042 완료
LangString LSTR_55 1042 "< 뒤로"
LangString LSTR_56 1042 "다음 >"
LangString LSTR_57 1042 "계속하시려면 '다음' 버튼을 눌러 주세요."
LangString LSTR_58 1042 " "
LangString LSTR_59 1042 닫음
LangString LSTR_60 1042 AeMenu


; LANG: 1041
LangString LSTR_0 1041 "AeMenu 1.0.0"
LangString LSTR_1 1041 "$(LSTR_2) セットアップ"
LangString LSTR_2 1041 AeMenu
LangString LSTR_5 1041 作成できません：
LangString LSTR_6 1041 コピーは失敗しました
LangString LSTR_7 1041 コピーします
LangString LSTR_8 1041 シンボルを見つけることができません：
LangString LSTR_9 1041 ロードすることができません：
LangString LSTR_10 1041 フォルダの作成：
LangString LSTR_11 1041 ショートカットの作成：
LangString LSTR_13 1041 ファイルの削除：
LangString LSTR_14 1041 リブート時に削除：
LangString LSTR_15 1041 ショートカットの作成エラー：
LangString LSTR_17 1041 データの抽出エラー$\r$\n$\r$\nインストーラが破損しています。
LangString LSTR_20 1041 実行：
LangString LSTR_21 1041 抽出：
LangString LSTR_22 1041 抽出：ファイル作成エラー
LangString LSTR_23 1041 インストールの不正：無効なopcode
LangString LSTR_24 1041 OLEがありません：
LangString LSTR_25 1041 出力先フォルダ：
LangString LSTR_26 1041 フォルダの削除：
LangString LSTR_27 1041 リブート時に名前の変更：
LangString LSTR_28 1041 名前の変更：
LangString LSTR_29 1041 スキップ：
LangString LSTR_30 1041 クリップボードへ詳細をコピー
LangString LSTR_36 1041 "初期ファイルの作成エラー：$\r$\n$\t$\"$0$\"$\r$\nインストールを中止するには中止を,$\r$\n再びこのファイルの作成を試みるには再試行を, また$\r$\nこのファイルをスキップして続けるには無視を押してください"
LangString LSTR_37 1041 インストール
LangString LSTR_38 1041 $(LSTR_60)をインストールしています。しばらくお待ちください。
LangString LSTR_39 1041 インストールの完了
LangString LSTR_40 1041 インストールに成功しました。
LangString LSTR_41 1041 インストールの中止
LangString LSTR_42 1041 セットアップは正常に完了されませんでした。
LangString LSTR_43 1041 "ＭＳ Ｐゴシック"
LangString LSTR_44 1041 9
LangString LSTR_45 1041 "Windows 7 以降が必要です"
LangString LSTR_46 1041 "64 ビット バージョンの Windows が必要です"
LangString LSTR_47 1041 古いアプリケーションファイルのアンインストールに失敗しました。もう一度インストーラーを実行してみてください。
LangString LSTR_48 1041 AeMenuが終了できません。$\r$\n手動で閉じて、『再試行』をクリックしてください。
LangString LSTR_49 1041 インストールしています。しばらくお待ちください...
LangString LSTR_50 1041 "AeMenu が起動しています。$\r$\nOKをクリックして、閉じてください。$\r$\n閉じない場合は、手動で閉じてください。"
LangString LSTR_51 1041 カスタム
LangString LSTR_52 1041 キャンセル
LangString LSTR_53 1041 詳細を表示(&D)
LangString LSTR_54 1041 完了
LangString LSTR_55 1041 "< 戻る(&B)"
LangString LSTR_56 1041 "次へ(&N) >"
LangString LSTR_57 1041 "続けるには [次へ] をクリックして下さい。"
LangString LSTR_58 1041 " "
LangString LSTR_59 1041 閉じる(&C)
LangString LSTR_60 1041 AeMenu


; LANG: 1036
LangString LSTR_0 1036 "AeMenu 1.0.0"
LangString LSTR_1 1036 "Installation de $(LSTR_2)"
LangString LSTR_2 1036 AeMenu
LangString LSTR_5 1036 "Impossible d'écrire : "
LangString LSTR_6 1036 "Échec de la copie"
LangString LSTR_7 1036 "Copier vers "
LangString LSTR_8 1036 "Impossible de trouver un symbole : "
LangString LSTR_9 1036 "Impossible de charger : "
LangString LSTR_10 1036 "Création du dossier : "
LangString LSTR_11 1036 "Création du raccourci : "
LangString LSTR_13 1036 "Suppression : "
LangString LSTR_14 1036 "Suppression au redémarrage : "
LangString LSTR_15 1036 "Erreur lors de la création du raccourci : "
LangString LSTR_17 1036 "Erreur lors de la décompression des données ! Installation corrompue ?"
LangString LSTR_20 1036 "Exécution : "
LangString LSTR_21 1036 "Extraction : "
LangString LSTR_22 1036 "Extraction : erreur d'écriture du fichier "
LangString LSTR_23 1036 "Installation corrompue : opcode incorrect"
LangString LSTR_24 1036 "Pas de OLE pour : "
LangString LSTR_25 1036 "Destination : "
LangString LSTR_26 1036 "Suppression du dossier : "
LangString LSTR_27 1036 "Renommer au redémarrage : "
LangString LSTR_28 1036 "Renommer : "
LangString LSTR_29 1036 "Passé : "
LangString LSTR_30 1036 "Copier les Détails dans le Presse-papier"
LangString LSTR_36 1036 "Erreur lors de l'ouverture du fichier en écriture : $\r$\n$\t$\"$0$\"$\r$\nAppuyez sur Abandonner pour annuler l'installation,$\r$\nRéessayer pour réessayer l'écriture du fichier, ou$\r$\nIgnorer pour passer ce fichier"
LangString LSTR_37 1036 "Installation en cours"
LangString LSTR_38 1036 "Veuillez patienter pendant l'installation de $(LSTR_60)."
LangString LSTR_39 1036 "Installation terminée"
LangString LSTR_40 1036 "L'installation s'est terminée avec succès."
LangString LSTR_41 1036 "Installation interrompue"
LangString LSTR_42 1036 "L'installation n'a pas été terminée."
LangString LSTR_43 1036 "MS Shell Dlg"
LangString LSTR_44 1036 8
LangString LSTR_45 1036 "Windows 7 (ou une version ultérieure) est requis"
LangString LSTR_46 1036 "Windows 64 bits est requis"
LangString LSTR_47 1036 "Échec de désinstallation des anciens fichiers d'application . Veuillez réessayer d’exécuter l'installeur."
LangString LSTR_48 1036 "AeMenu ne peut pas être fermé. $\r$\nVeuillez la fermer manuellement et cliquez sur Réessayer pour continuer."
LangString LSTR_49 1036 "En cours d’installation... Veuillez patienter s'il vous plaît."
LangString LSTR_50 1036 "AeMenu est en cours d’utilisation. $\r$\nCliquez sur «OK» pour fermer ce programme."
LangString LSTR_51 1036 Personnalisée
LangString LSTR_52 1036 Annuler
LangString LSTR_53 1036 "P&lus d'infos"
LangString LSTR_54 1036 Terminé
LangString LSTR_55 1036 "< &Précédent"
LangString LSTR_56 1036 "&Suivant >"
LangString LSTR_57 1036 "Cliquez sur Suivant pour continuer."
LangString LSTR_58 1036 " "
LangString LSTR_59 1036 &Fermer
LangString LSTR_60 1036 AeMenu


; LANG: 1040
LangString LSTR_0 1040 "AeMenu 1.0.0"
LangString LSTR_1 1040 "Installazione di $(LSTR_2)"
LangString LSTR_2 1040 AeMenu
LangString LSTR_5 1040 "Impossibile scrivere: "
LangString LSTR_6 1040 "Copia fallita"
LangString LSTR_7 1040 "Copia in "
LangString LSTR_8 1040 "Impossibile trovare il simbolo: "
LangString LSTR_9 1040 "Impossibile caricare: "
LangString LSTR_10 1040 "Creazione cartella: "
LangString LSTR_11 1040 "Creazione collegamento: "
LangString LSTR_13 1040 "Eliminazione file: "
LangString LSTR_14 1040 "Elimina al riavvio: "
LangString LSTR_15 1040 "Errore nella creazione del collegamento: "
LangString LSTR_17 1040 "Errore nella decompressione dei dati! Probabile programma di installazione corrotto."
LangString LSTR_20 1040 "Esecuzione di: "
LangString LSTR_21 1040 "Estrazione di: "
LangString LSTR_22 1040 "Estrazione: errore nella scrittura nel file "
LangString LSTR_23 1040 "Programma di installazione corrotto: opcode non valido"
LangString LSTR_24 1040 "Nessuna OLE per: "
LangString LSTR_25 1040 "Cartella destinazione: "
LangString LSTR_26 1040 "Rimozione cartella: "
LangString LSTR_27 1040 "Al riavvio rinomina: "
LangString LSTR_28 1040 "Rinomina "
LangString LSTR_29 1040 "Saltato: "
LangString LSTR_30 1040 "Copia i dettagli negli Appunti"
LangString LSTR_36 1040 "Errore nell'apertura del file per la scrittura: $\r$\n$\t$\"$0$\"$\r$\nSeleziona 'Termina' per interrompere l'installazione,$\r$\n'Riprova' per ritentare, oppure$\r$\n'Ignora' per saltare questo file."
LangString LSTR_37 1040 Installazione
LangString LSTR_38 1040 "Attendi il completamento dell'installazione di $(LSTR_60)."
LangString LSTR_39 1040 "Installazione completata"
LangString LSTR_40 1040 "L'installazione è stata completata correttamente."
LangString LSTR_41 1040 "Installazione interrotta"
LangString LSTR_42 1040 "L'installazione non è stata completata correttamente."
LangString LSTR_43 1040 "MS Shell Dlg"
LangString LSTR_44 1040 8
LangString LSTR_45 1040 "È necessario disporre del sistema operativo Windows 7 e successivi"
LangString LSTR_46 1040 "È necessario disporre di un sistema operativo Windows a 64 bit"
LangString LSTR_47 1040 "Impossibile disinstallare i vecchi file dell'applicazione. Per favore, prova ad eseguire di nuovo il programma di installazione."
LangString LSTR_48 1040 "AeMenu non può essere chiuso. $\r$\nPer favore, chiudilo manualmente e clicca su Riprova per continuare."
LangString LSTR_49 1040 "Attendere prego. Installazione in corso..."
LangString LSTR_50 1040 "AeMenu è in esecuzione.$\r$\nClicca su OK per chiuderla.$\r$\nSe non si chiude, prova a chiuderla manualmente."
LangString LSTR_51 1040 Personalizzata
LangString LSTR_52 1040 Annulla
LangString LSTR_53 1040 "Visualizza &dettagli"
LangString LSTR_54 1040 "Installazione completata"
LangString LSTR_55 1040 "< &Indietro"
LangString LSTR_56 1040 "&Avanti >"
LangString LSTR_57 1040 "Per proseguire, seleziona 'Avanti'."
LangString LSTR_58 1040 " "
LangString LSTR_59 1040 &Fine
LangString LSTR_60 1040 AeMenu


; LANG: 1031
LangString LSTR_0 1031 "AeMenu 1.0.0"
LangString LSTR_1 1031 "Installation von $(LSTR_2)"
LangString LSTR_2 1031 AeMenu
LangString LSTR_5 1031 "Fehler beim Schreiben: "
LangString LSTR_6 1031 "Kopieren fehlgeschlagen"
LangString LSTR_7 1031 "Wird kopiert nach "
LangString LSTR_8 1031 "Symbol ist nicht vorhanden: "
LangString LSTR_9 1031 "Fehler beim Laden von "
LangString LSTR_10 1031 "Verzeichnis wird erstellt: "
LangString LSTR_11 1031 "Verknüpfung wird erstellt: "
LangString LSTR_13 1031 "Datei wird gelöscht: "
LangString LSTR_14 1031 "Datei wird nach Neustart gelöscht: "
LangString LSTR_15 1031 "Fehler beim Erstellen der Verknüpfung: "
LangString LSTR_17 1031 "Fehler beim Entpacken. Ist das Installations-Programm beschädigt?"
LangString LSTR_20 1031 "Wird gestartet: "
LangString LSTR_21 1031 "Wird entpackt: "
LangString LSTR_22 1031 "Entpacken: Fehler beim Schreiben der Datei "
LangString LSTR_23 1031 "Beschädigtes Installations-Programm: ungültiger Befehlscode"
LangString LSTR_24 1031 "Kein OLE für: "
LangString LSTR_25 1031 "Zielverzeichnis: "
LangString LSTR_26 1031 "Verzeichnis wird entfernt: "
LangString LSTR_27 1031 "Umbenennen nach Neustart: "
LangString LSTR_28 1031 "Umbenennen: "
LangString LSTR_29 1031 "Übersprungen: "
LangString LSTR_30 1031 "Details in die Zwischenablage kopieren"
LangString LSTR_36 1031 "Fehler beim Überschreiben der Datei: $\r$\n$\t$\"$0$\"$\r$\nKlicken Sie auf Abbrechen, um abzubrechen,$\r$\nauf Wiederholen, um den Schreibvorgang erneut zu versuchen,$\r$\noder auf Ignorieren, um diese Datei zu überspringen."
LangString LSTR_37 1031 "Wird installiert ..."
LangString LSTR_38 1031 "Bitte warten Sie, während $(LSTR_60) installiert wird."
LangString LSTR_39 1031 "Die Installation ist vollständig"
LangString LSTR_40 1031 "Die Installation wurde erfolgreich abgeschlossen."
LangString LSTR_41 1031 "Abbruch der Installation"
LangString LSTR_42 1031 "Die Installation wurde nicht vollständig abgeschlossen."
LangString LSTR_43 1031 "MS Shell Dlg"
LangString LSTR_44 1031 8
LangString LSTR_45 1031 "Windows 7 oder höher wird vorausgesetzt"
LangString LSTR_46 1031 "64-Bit-Windows wird vorausgesetzt"
LangString LSTR_47 1031 "Die alten Anwendungsdateien konnten nicht deinstalliert werden. Bitte versuche, das Installationsprogramm erneut auszuführen."
LangString LSTR_48 1031 "AeMenu kann nicht geschlossen werden. $\r$\nSchließ es bitte manuell und klicke auf »Wiederholen«, um fortzufahren."
LangString LSTR_49 1031 "Installation läuft, bitte warten..."
LangString LSTR_50 1031 "AeMenu wird gerade ausgeführt.$\r$\nKlicke auf »OK«, um es zu schließen.$\r$\nFalls es sich nicht schließen lässt, versuche es manuell zu schließen."
LangString LSTR_51 1031 Benutzerdefiniert
LangString LSTR_52 1031 Abbrechen
LangString LSTR_53 1031 "&Details anzeigen"
LangString LSTR_54 1031 Fertig
LangString LSTR_55 1031 "< &Zurück"
LangString LSTR_56 1031 "&Weiter >"
LangString LSTR_57 1031 "Klicken Sie auf Weiter, um fortzufahren."
LangString LSTR_58 1031 " "
LangString LSTR_59 1031 &Beenden
LangString LSTR_60 1031 AeMenu


; LANG: 1033
LangString LSTR_0 1033 "AeMenu 1.0.0"
LangString LSTR_1 1033 "$(LSTR_2) Setup"
LangString LSTR_2 1033 AeMenu
LangString LSTR_5 1033 "Can't write: "
LangString LSTR_6 1033 "Copy failed"
LangString LSTR_7 1033 "Copy to "
LangString LSTR_8 1033 "Could not find symbol: "
LangString LSTR_9 1033 "Could not load: "
LangString LSTR_10 1033 "Create folder: "
LangString LSTR_11 1033 "Create shortcut: "
LangString LSTR_13 1033 "Delete file: "
LangString LSTR_14 1033 "Delete on reboot: "
LangString LSTR_15 1033 "Error creating shortcut: "
LangString LSTR_17 1033 "Error decompressing data! Corrupted installer?"
LangString LSTR_20 1033 "Execute: "
LangString LSTR_21 1033 "Extract: "
LangString LSTR_22 1033 "Extract: error writing to file "
LangString LSTR_23 1033 "Installer corrupted: invalid opcode"
LangString LSTR_24 1033 "No OLE for: "
LangString LSTR_25 1033 "Output folder: "
LangString LSTR_26 1033 "Remove folder: "
LangString LSTR_27 1033 "Rename on reboot: "
LangString LSTR_28 1033 "Rename: "
LangString LSTR_29 1033 "Skipped: "
LangString LSTR_30 1033 "Copy Details To Clipboard"
LangString LSTR_36 1033 "Error opening file for writing: $\r$\n$\r$\n$0$\r$\n$\r$\nClick Abort to stop the installation,$\r$\nRetry to try again, or$\r$\nIgnore to skip this file."
LangString LSTR_37 1033 Installing
LangString LSTR_38 1033 "Please wait while $(LSTR_60) is being installed."
LangString LSTR_39 1033 "Installation Complete"
LangString LSTR_40 1033 "Setup was completed successfully."
LangString LSTR_41 1033 "Installation Aborted"
LangString LSTR_42 1033 "Setup was not completed successfully."
LangString LSTR_43 1033 "MS Shell Dlg"
LangString LSTR_44 1033 8
LangString LSTR_45 1033 "Windows 7 and above is required"
LangString LSTR_46 1033 "64-bit Windows is required"
LangString LSTR_47 1033 "Failed to uninstall old application files. Please try running the installer again."
LangString LSTR_48 1033 "AeMenu cannot be closed. $\r$\nPlease close it manually and click Retry to continue."
LangString LSTR_49 1033 "Installing, please wait..."
LangString LSTR_50 1033 "AeMenu is running.$\r$\nClick OK to close it.$\r$\nIf it doesn't close, try closing it manually."
LangString LSTR_51 1033 Custom
LangString LSTR_52 1033 Cancel
LangString LSTR_53 1033 "Show &details"
LangString LSTR_54 1033 Completed
LangString LSTR_55 1033 "< &Back"
LangString LSTR_56 1033 "&Next >"
LangString LSTR_57 1033 "Click Next to continue."
LangString LSTR_58 1033 " "
LangString LSTR_59 1033 &Close
LangString LSTR_60 1033 AeMenu


; --------------------
; VARIABLES: 41

Var _0_
Var _1_
Var _2_
Var _3_
Var _4_
Var _5_
Var _6_
Var _7_
Var _8_
Var _9_
Var _10_
Var _11_
Var _12_
Var _13_
Var _14_
Var _15_
Var _16_
Var _17_
Var _18_
Var _19_
Var _20_
Var _21_
Var _22_
Var _23_
Var _24_
Var _25_
Var _26_
Var _27_
Var _28_
Var _29_
Var _30_
Var _31_
Var _32_
Var _33_
Var _34_
Var _35_
Var _36_
Var _37_
Var _38_
Var _39_
Var _40_


InstType $(LSTR_51)    ;  Custom
; wininit = $WINDIR\wininit.ini


; --------------------
; PAGES: 2

; Page 0
Page instfiles func_120 func_123 func_129
  CompletedText $(LSTR_54)    ;  Completed
  DetailsButtonText $(LSTR_53)    ;  "Show &details"

/*
; Page 1
Page COMPLETED
*/


; --------------------
; SECTIONS: 1
; COMMANDS: 880

Function func_0
  Exch $R3
    ; Push $R3
    ; Exch
    ; Pop $R3
  Push $0
  Push $1
  Push $2
  Push $3
  Push $4
  Push $5
  Push $R0
  Push $R1
  Push $R9
  Push $R8
  StrCpy $0 ""
  StrCpy $1 ""
  StrCpy $2 ""
  StrCpy $3 ""
  StrCpy $4 ""
  StrCpy $5 ""
  IntCmp $R3 0 0 label_30 label_30
  System::Call "kernel32::GetCurrentProcess() i.R0"
    ; Call Initialize_____Plugins
    ; SetOverwrite off
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "kernel32::GetCurrentProcess() i.R0"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call "Kernel32::GetProcessId(i R0) i.R3"
    ; Call Initialize_____Plugins
    ; AllowSkipFiles off
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "Kernel32::GetProcessId(i R0) i.R3"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
label_30:
  System::Call "Kernel32::CreateToolhelp32Snapshot(i 2,i R3) i.R0"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "Kernel32::CreateToolhelp32Snapshot(i 2,i R3) i.R0"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  IntCmp $R0 -1 label_92
  System::Alloc 1024
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push 1024
    ; CallInstDLL $PLUGINSDIR\System.dll Alloc
  Pop $R9
  System::Call "*$R9(i 556)"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "*$R9(i 556)"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call "Kernel32::Process32FirstW(i R0, i $R9) i.R1"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "Kernel32::Process32FirstW(i R0, i $R9) i.R1"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  StrCmp $R1 0 label_92
label_53:
  System::Call *$R9(i,i,i.R1)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push *$R9(i,i,i.R1)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  IntCmp $R1 $R3 label_65
  System::Call "Kernel32::Process32NextW(i R0, i $R9) i.R1"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "Kernel32::Process32NextW(i R0, i $R9) i.R1"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  IntCmp $R1 0 0 label_53 label_53
label_65:
  System::Call *$R9(i,i,i.r0,i,i,i.r1,i.r2,i.r3,i,&w256.r4)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push *$R9(i,i,i.r0,i,i,i.r1,i.r2,i.r3,i,&w256.r4)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Free $R9
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push $R9
    ; CallInstDLL $PLUGINSDIR\System.dll Free
  System::Call "Kernel32::CloseToolhelp32Snapshot(i R0)"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "Kernel32::CloseToolhelp32Snapshot(i R0)"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call "Kernel32::OpenProcess(i 1040, i 0, i r0)i .R0"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "Kernel32::OpenProcess(i 1040, i 0, i r0)i .R0"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  StrCmp $R0 0 label_92
  IntOp $R8 0 + 256
  System::Call "psapi::GetModuleFileNameExW(i R0,i 0,t .r5, *i $R8)i .R1"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "psapi::GetModuleFileNameExW(i R0,i 0,t .r5, *i $R8)i .R1"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
label_92:
  Pop $R8
  Pop $R9
  Pop $R1
  Pop $R0
  Exch $5
    ; Push $5
    ; Exch
    ; Pop $5
  Exch
  Exch $4
    ; Push $4
    ; Exch
    ; Pop $4
  Exch 2
  Exch $3
    ; Push $3
    ; Exch
    ; Pop $3
  Exch 3
  Exch $2
    ; Push $2
    ; Exch
    ; Pop $2
  Exch 4
  Pop $1
  Exch 4
  Exch $0
    ; Push $0
    ; Exch
    ; Pop $0
  Exch 5
  Pop $R3
FunctionEnd


Function func_120    ; Page 0, Pre
  SendMessage $_6_ ${WM_SETTEXT} 0 STR:$(LSTR_37)    ;  Installing
  SendMessage $_8_ ${WM_SETTEXT} 0 STR:$(LSTR_38)    ;  "Please wait while $(LSTR_60) is being installed." AeMenu
FunctionEnd


Function func_123    ; Page 0, Show
  FindWindow $_23_ "#32770" "" $HWNDPARENT
  GetDlgItem $_24_ $_23_ 1006
  GetDlgItem $_25_ $_23_ 1004
  GetDlgItem $_26_ $_23_ 1027
  GetDlgItem $_27_ $_23_ 1016
FunctionEnd


Function func_129    ; Page 0, Leave
  IfAbort label_133
  SendMessage $_6_ ${WM_SETTEXT} 0 STR:$(LSTR_39)    ;  "Installation Complete"
  SendMessage $_8_ ${WM_SETTEXT} 0 STR:$(LSTR_40)    ;  "Setup was completed successfully."
  Goto label_135
label_133:
  SendMessage $_6_ ${WM_SETTEXT} 0 STR:$(LSTR_41)    ;  "Installation Aborted"
  SendMessage $_8_ ${WM_SETTEXT} 0 STR:$(LSTR_42)    ;  "Setup was not completed successfully."
label_135:
  IfAbort label_136
label_136:
FunctionEnd


Function .onGUIInit
  GetDlgItem $_6_ $HWNDPARENT 1037
  CreateFont $_7_ $(LSTR_43) $(LSTR_44) 700    ;  "MS Shell Dlg" 8
  SendMessage $_6_ ${WM_SETFONT} $_7_ 0
  GetDlgItem $_8_ $HWNDPARENT 1038
  SetCtlColors $_6_ 0x000000 0xFFFFFF
  SetCtlColors $_8_ 0x000000 0xFFFFFF
  GetDlgItem $_9_ $HWNDPARENT 1034
  SetCtlColors $_9_ "" 0xFFFFFF
  GetDlgItem $_10_ $HWNDPARENT 1039
  SetCtlColors $_10_ "" 0xFFFFFF
  GetDlgItem $_12_ $HWNDPARENT 1028
  SetCtlColors $_12_ /BRANDING ""
  GetDlgItem $_11_ $HWNDPARENT 1256
  SetCtlColors $_11_ /BRANDING ""
  SendMessage $_11_ ${WM_SETTEXT} 0 "STR:$(LSTR_0) "    ;  "AeMenu 1.0.0"
  GetDlgItem $_13_ $HWNDPARENT 1035
  GetDlgItem $_14_ $HWNDPARENT 1045
  GetDlgItem $_15_ $HWNDPARENT 1
  GetDlgItem $_16_ $HWNDPARENT 2
  GetDlgItem $_17_ $HWNDPARENT 3
FunctionEnd


Function .onUserAbort
FunctionEnd


Function .onInit
  Call func_864
  SetOutPath $INSTDIR
  Call :label_163
  Goto label_251
label_163:
  StrCmp $_28_ "" label_165
  Return

label_165:
  Push $0
  Push $1
  Push $2
  Push $3
  Push $R0
  System::Call *(&i284)p.r0
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push *(&i284)p.r0
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call "*$0(i 284)"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "*$0(i 284)"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call kernel32::GetVersionEx(pr0)i.r3
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::GetVersionEx(pr0)i.r3
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  IntCmp $3 0 0 label_196 label_196
  System::Call "*$0(i 276)"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "*$0(i 276)"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call kernel32::GetVersionEx(pr0)i.r3
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::GetVersionEx(pr0)i.r3
    ; CallInstDLL $PLUGINSDIR\System.dll Call
label_196:
  System::Call *$0(i.s,i.r1,i.r2,i.r3,i.s,&t128.s,&i2.s,&i2,&i2,&i1.s,&i1)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push *$0(i.s,i.r1,i.r2,i.r3,i.s,&t128.s,&i2.s,&i2,&i2,&i1.s,&i1)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Free $0
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push $0
    ; CallInstDLL $PLUGINSDIR\System.dll Free
  IntOp $3 $3 & 0xFFFF
  Pop $R0
  Pop $0
  IntCmp $0 2 0 label_212 label_212
  IntOp $_29_ $_29_ | 0x80000000
  IntOp $_28_ $_28_ | 0x80000000
label_212:
  IntCmp $R0 284 0 label_222 label_222
  Pop $0
  Exch
  Pop $0
  IntCmp $0 1 label_220
  IntOp $_29_ $_29_ | 0x40000000
  IntCmp $0 2 0 label_220 label_220
  IntOp $_29_ $_29_ | 0x20000000
label_220:
  Pop $0
  Goto label_230
label_222:
  Pop $0
  Pop $R0
  Pop $R0
  StrCpy $R0 $0 13
  StrCmp $R0 "Service Pack " 0 label_229
  StrCpy $0 $0 "" 13
  Goto label_230
label_229:
  StrCpy $0 0
label_230:
  IntOp $0 $0 << 16
  IntOp $_29_ $_29_ | $0
  IntOp $0 $_29_ & 0x40000000
  IntCmp $0 0 0 label_237 label_237
  IntCmp $1 5 0 label_237 label_237
  IntCmp $2 2 0 label_237 label_237
  StrCpy $2 1
label_237:
  IntCmp $0 0 label_240
  IntCmp 6 $1 0 0 label_240
  IntOp $_28_ $_28_ | 0x00000001
label_240:
  IntOp $1 $1 << 24
  IntOp $_28_ $_28_ | $1
  IntOp $0 $2 << 16
  IntOp $_28_ $_28_ | $0
  IntOp $_29_ $_29_ | $3
  Pop $R0
  Pop $3
  Pop $2
  Pop $1
  Pop $0
  Return

label_251:
  IntCmp $_28_ 0x85000000 0 label_253 label_253
  Goto label_255
label_253:
  Call :label_163
  IntCmp $_28_ 0x045a0000 0 label_256 label_256
label_255:
  Goto label_258
label_256:
  Call :label_163
  IntCmp $_28_ 0x85010000 0 label_259 label_259
label_258:
  Goto label_261
label_259:
  Call :label_163
  IntCmp $_28_ 0x86000000 0 label_263 label_263
label_261:
  MessageBox MB_OK $(LSTR_45)    ;  "Windows 7 and above is required"
  Quit
label_263:
  System::Call kernel32::GetCurrentProcess()p.s
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::GetCurrentProcess()p.s
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call kernel32::IsWow64Process2(ps,*i0s,*i)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::IsWow64Process2(ps,*i0s,*i)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  Push |
  System::Call kernel32::IsWow64Process(p-1,*i0s)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::IsWow64Process(p-1,*i0s)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Int64Op
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\System.dll Int64Op
  Pop $_30_
  StrCmp $_30_ 0 label_287
  SetRegView 64
  Goto label_289
label_287:
  MessageBox MB_OK|MB_ICONEXCLAMATION $(LSTR_46)    ;  "64-bit Windows is required"
  Quit
label_289:
    ; ShowWindow $HWNDPARENT ${SW_SHOW}
  BringToFront
  System::Call "kernel32::CreateMutex(p0, i1, t$\"5572adbc-fffa-5088-87dc-ff2110409590$\")?e"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "kernel32::CreateMutex(p0, i1, t$\"5572adbc-fffa-5088-87dc-ff2110409590$\")?e"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  Pop $0
  IntCmpU $0 183 0 label_316 label_316
  StrLen $0 $(LSTR_1)    ;  "$(LSTR_2) Setup" AeMenu
  IntOp $0 $0 + 1
  StrCpy $1 ""
label_301:
  FindWindow $1 "#32770" "" "" $1
  StrCmp 0 $1 label_315
  System::Call "user32::GetWindowText(pr1, t.r2, ir0)"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "user32::GetWindowText(pr1, t.r2, ir0)"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  StrCmp $2 $(LSTR_1) 0 label_301    ;  "$(LSTR_2) Setup" AeMenu
  SendMessage $1 0x112 0xF120 0 /TIMEOUT=2000
  System::Call user32::SetForegroundWindow(pr1)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push user32::SetForegroundWindow(pr1)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
label_315:
  Abort
label_316:
  StrCpy $_18_ CurrentUser
  SetShellVarContext current
  ReadRegStr $_19_ HKCU Software\5572adbc-fffa-5088-87dc-ff2110409590 InstallLocation
  StrCmp $_19_ "" label_322
  StrCpy $INSTDIR $_19_
  Goto label_351
label_322:
  StrCpy $0 $LOCALAPPDATA\Programs
  System::Store S
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push S
    ; CallInstDLL $PLUGINSDIR\System.dll Store
  System::Call "SHELL32::SHGetKnownFolderPath(g $\"{5CD7AEE2-2219-4A67-B85D-6C9CE15660CB}$\", i 0x00008000, p 0, *p .r2)i.r1"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "SHELL32::SHGetKnownFolderPath(g $\"{5CD7AEE2-2219-4A67-B85D-6C9CE15660CB}$\", i 0x00008000, p 0, *p .r2)i.r1"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  StrCmp $1 0 0 label_345
  System::Call "*$2(&w8192 .s)"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "*$2(&w8192 .s)"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  StrCpy $0 $1
  System::Call "OLE32::CoTaskMemFree(p r2)"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "OLE32::CoTaskMemFree(p r2)"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
label_345:
  System::Store L
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push L
    ; CallInstDLL $PLUGINSDIR\System.dll Store
  StrCpy $INSTDIR $0\AeMenu
label_351:
  Push D
  Push ""
  StdUtils::GetParameter /NOUNLOAD
    ; Call Initialize_____Plugins
    ; AllowSkipFiles on
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD GetParameter
  Pop $R0
  StrCmp $R0 "" label_360
  StrCpy $INSTDIR $R0
label_360:
FunctionEnd


Function func_361
  Exch $R0
    ; Push $R0
    ; Exch
    ; Pop $R0
  Push $R1
  Push $R2
  Push $R3
  StrCpy $R2 -1
label_368:
  IntOp $R2 $R2 + 1
  StrCpy $R3 $R0 1 $R2
  StrCmp $R3 "" 0 label_373
  StrCpy $R0 ""
  Goto label_384
label_373:
  StrCmp $R3 $\" 0 label_368
  IntOp $R2 $R2 + 1
  StrCpy $R0 $R0 "" $R2
  StrCpy $R2 0
label_377:
  IntOp $R2 $R2 + 1
  StrCpy $R3 $R0 1 $R2
  StrCmp $R3 "" 0 label_382
  StrCpy $R0 ""
  Goto label_384
label_382:
  StrCmp $R3 $\" 0 label_377
  StrCpy $R0 $R0 $R2
label_384:
  Pop $R3
  Pop $R2
  Pop $R1
  Exch $R0
    ; Push $R0
    ; Exch
    ; Pop $R0
FunctionEnd


Function func_391
  Exch $R0
    ; Push $R0
    ; Exch
    ; Pop $R0
  Push $R1
  Push $R2
  Push $R3
  StrCpy $R1 0
  StrLen $R2 $R0
label_399:
  IntOp $R1 $R1 + 1
  IntCmp $R1 $R2 label_404 0 label_404
  StrCpy $R3 $R0 1 -$R1
  StrCmp $R3 \ label_404
  Goto label_399
label_404:
  StrCpy $R0 $R0 -$R1
  Pop $R3
  Pop $R2
  Pop $R1
  Exch $R0
    ; Push $R0
    ; Exch
    ; Pop $R0
FunctionEnd


Function func_412
  Exch $_32_
    ; Push $_32_
    ; Exch
    ; Pop $_32_
  StrCmp $_32_ SHELL_CONTEXT 0 label_417
  Goto label_418
label_417:
  StrCmp $_32_ HKEY_CURRENT_USER 0 label_418
label_418:
  IfErrors 0 label_421
  DetailPrint "Uninstall was not successful. Not able to launch uninstaller!"
  Return

label_421:
  StrCmp $R0 0 label_426
  MessageBox MB_OK|MB_ICONEXCLAMATION "$(LSTR_47): $R0"    ;  "Failed to uninstall old application files. Please try running the installer again."
  DetailPrint "Uninstall was not successful. Uninstaller error code: $R0."
  SetErrorLevel 2
  Quit
label_426:
FunctionEnd


Function func_427
  ClearErrors
  Exch $_37_
    ; Push $_37_
    ; Exch
    ; Pop $_37_
  Push 0
  Pop $R0
  StrCmp $_37_ SHELL_CONTEXT 0 label_436
  ReadRegStr $_36_ SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 UninstallString
  Goto label_443
label_436:
  StrCmp $_37_ HKEY_CURRENT_USER 0 label_439
  ReadRegStr $_36_ HKCU Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 UninstallString
  Goto label_443
label_439:
  StrCmp $_37_ HKEY_LOCAL_MACHINE 0 label_442
  ReadRegStr $_36_ HKLM Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 UninstallString
  Goto label_443
label_442:
  MessageBox MB_OK "Unsupported $_37_"
label_443:
  StrCmp $_36_ "" 0 label_447
  StrCmp $_36_ "" 0 label_447
  ClearErrors
  Return

label_447:
  Push $_36_
  Call func_361
  Pop $_33_
  StrCmp $_37_ SHELL_CONTEXT 0 label_453
  ReadRegStr $_35_ SHCTX Software\5572adbc-fffa-5088-87dc-ff2110409590 InstallLocation
  Goto label_460
label_453:
  StrCmp $_37_ HKEY_CURRENT_USER 0 label_456
  ReadRegStr $_35_ HKCU Software\5572adbc-fffa-5088-87dc-ff2110409590 InstallLocation
  Goto label_460
label_456:
  StrCmp $_37_ HKEY_LOCAL_MACHINE 0 label_459
  ReadRegStr $_35_ HKLM Software\5572adbc-fffa-5088-87dc-ff2110409590 InstallLocation
  Goto label_460
label_459:
  MessageBox MB_OK "Unsupported $_37_"
label_460:
  StrCmp $_35_ "" 0 label_465
  StrCmp $_33_ "" label_465
  Push $_33_
  Call func_391
  Pop $_35_
label_465:
  StrCmp $_35_ "" 0 label_469
  StrCmp $_33_ "" 0 label_469
  ClearErrors
  Return

label_469:
  StrCmp $_18_ CurrentUser 0 label_471
  Goto label_472
label_471:
  StrCmp $_37_ HKEY_CURRENT_USER 0 label_474
label_472:
  StrCpy $0 /currentuser
  Goto label_475
label_474:
  StrCpy $0 /allusers
label_475:
  StrCpy $_31_ true
  StrCmp $_31_ true 0 label_490
  StrCmp $_37_ SHELL_CONTEXT 0 label_480
  ReadRegStr $R5 SHCTX Software\5572adbc-fffa-5088-87dc-ff2110409590 KeepShortcuts
  Goto label_487
label_480:
  StrCmp $_37_ HKEY_CURRENT_USER 0 label_483
  ReadRegStr $R5 HKCU Software\5572adbc-fffa-5088-87dc-ff2110409590 KeepShortcuts
  Goto label_487
label_483:
  StrCmp $_37_ HKEY_LOCAL_MACHINE 0 label_486
  ReadRegStr $R5 HKLM Software\5572adbc-fffa-5088-87dc-ff2110409590 KeepShortcuts
  Goto label_487
label_486:
  MessageBox MB_OK "Unsupported $_37_"
label_487:
  StrCmp $R5 true 0 label_490
  IfFileExists $_21_ 0 label_490
  StrCpy $0 "$0 --keep-shortcuts"
label_490:
  Push delete-app-data
  StdUtils::TestParameter /NOUNLOAD
    ; Call Initialize_____Plugins
    ; AllowSkipFiles off
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD TestParameter
  Pop $R9
  StrCmp $R9 true 0 label_499
  StrCpy $0 "$0 --delete-app-data"
  Goto label_500
label_499:
  StrCpy $0 "$0 --updated"
label_500:
  StrCpy $_34_ $PLUGINSDIR\old-uninstaller.exe
  Push $_34_
  StdUtils::GetParentPath /NOUNLOAD
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD GetParentPath
  Pop $R5
  CreateDirectory $R5
  ClearErrors
  CopyFiles /SILENT $_33_ $_34_    ; $(LSTR_7)$_34_    ;  "Copy to "
  StrCpy $R5 0
label_511:
  IntOp $R5 $R5 + 1
  IntCmp $R5 5 label_515 label_515
  MessageBox MB_RETRYCANCEL|MB_ICONEXCLAMATION $(LSTR_48) /SD IDCANCEL IDRETRY label_515    ;  "AeMenu cannot be closed. $\r$\nPlease close it manually and click Retry to continue."
  Return

label_515:
  ExecWait "$\"$_34_$\" /S /KEEP_APP_DATA $0 _?=$_35_" $R0
  IfErrors label_517 label_519
label_517:
  ExecWait "$\"$_33_$\" /S /KEEP_APP_DATA $0 _?=$_35_" $R0
  IfErrors label_523
label_519:
  StrCmp $R0 0 0 label_521
  Return

label_521:
  Sleep 1000
  Goto label_511
label_523:
  SetErrors
FunctionEnd


Section install ; Section_0
  ; AddSize 61427
  InitPluginsDir
    ; Call Initialize_____Plugins
    ; SetDetailsPrint lastused
  IfSilent label_529
  SetDetailsPrint none
label_529:
  StrCpy $_21_ $INSTDIR\AeMenu.exe
  ReadRegStr $_4_ SHCTX Software\5572adbc-fffa-5088-87dc-ff2110409590 ShortcutName
  StrCmp $_4_ "" 0 label_533
  StrCpy $_4_ AeMenu
label_533:
  StrCpy $_3_ $DESKTOP\$_4_.lnk
  StrCpy $_2_ $DESKTOP\AeMenu.lnk
  ReadRegStr $_5_ SHCTX Software\5572adbc-fffa-5088-87dc-ff2110409590 MenuDirectory
  StrCmp $_5_ "" 0 label_539
  StrCpy $_1_ $SMPROGRAMS\$_4_.lnk
  Goto label_540
label_539:
  StrCpy $_1_ $SMPROGRAMS\$_5_\$_4_.lnk
label_540:
  StrCpy $_0_ $SMPROGRAMS\AeMenu.lnk
  IfSilent label_557
  SpiderBanner::Show /MODERN
    ; Call Initialize_____Plugins
    ; AllowSkipFiles on
    ; File $PLUGINSDIR\SpiderBanner.dll
    ; SetDetailsPrint lastused
    ; Push /MODERN
    ; CallInstDLL $PLUGINSDIR\SpiderBanner.dll Show
  FindWindow $0 "#32770" "" $HWNDPARENT
  FindWindow $0 "#32770" "" $HWNDPARENT $0
  GetDlgItem $0 $0 1000
  SendMessage $0 ${WM_SETTEXT} 0 STR:$(LSTR_49)    ;  "Installing, please wait..."
  StrCpy $1 $HWNDPARENT
  System::Call "user32::ShutdownBlockReasonCreate(pr1, w $\"$(LSTR_49)$\")"    ;  "Installing, please wait..."
    ; Call Initialize_____Plugins
    ; AllowSkipFiles off
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "user32::ShutdownBlockReasonCreate(pr1, w $\"$(LSTR_49)$\")"    ;  "Installing, please wait..."
    ; CallInstDLL $PLUGINSDIR\System.dll Call
label_557:
  Push 0
  Call func_0
  Pop $3
  Pop $2
  Pop $1
  Pop $4
  Pop $_20_
  StrCmp $3 AeMenu.exe label_631
  Push updated
  StdUtils::TestParameter /NOUNLOAD
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD TestParameter
  Pop $R9
  StrCmp $R9 true 0 label_573
  Sleep 300
label_573:
  nsExec::Exec "%SYSTEMROOT%\System32\cmd.exe /c tasklist /FI $\"USERNAME eq %USERNAME%$\" /FI $\"IMAGENAME eq AeMenu.exe$\" /FO csv | %SYSTEMROOT%\System32\find.exe $\"AeMenu.exe$\""
    ; Call Initialize_____Plugins
    ; AllowSkipFiles on
    ; File $PLUGINSDIR\nsExec.dll
    ; SetDetailsPrint lastused
    ; Push "%SYSTEMROOT%\System32\cmd.exe /c tasklist /FI $\"USERNAME eq %USERNAME%$\" /FI $\"IMAGENAME eq AeMenu.exe$\" /FO csv | %SYSTEMROOT%\System32\find.exe $\"AeMenu.exe$\""
    ; CallInstDLL $PLUGINSDIR\nsExec.dll Exec
  Pop $R0
  StrCmp $R0 0 0 label_631
  Push updated
  StdUtils::TestParameter /NOUNLOAD
    ; Call Initialize_____Plugins
    ; AllowSkipFiles off
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD TestParameter
  Pop $R9
  StrCmp $R9 true 0 label_589
  Sleep 1000
  Goto label_591
label_589:
  MessageBox MB_OKCANCEL|MB_ICONEXCLAMATION $(LSTR_50) /SD IDOK IDOK label_591    ;  "AeMenu is running.$\r$\nClick OK to close it.$\r$\nIf it doesn't close, try closing it manually."
  Quit
label_591:
  DetailPrint "Closing running $\"AeMenu$\"..."
  nsExec::Exec "%SYSTEMROOT%\System32\cmd.exe /c taskkill /im $\"AeMenu.exe$\" /fi $\"PID ne $_20_$\" /fi $\"USERNAME eq %USERNAME%$\""
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\nsExec.dll
    ; SetDetailsPrint lastused
    ; Push "%SYSTEMROOT%\System32\cmd.exe /c taskkill /im $\"AeMenu.exe$\" /fi $\"PID ne $_20_$\" /fi $\"USERNAME eq %USERNAME%$\""
    ; CallInstDLL $PLUGINSDIR\nsExec.dll Exec
  Sleep 300
  StrCpy $R1 0
label_599:
  IntOp $R1 $R1 + 1
  nsExec::Exec "%SYSTEMROOT%\System32\cmd.exe /c tasklist /FI $\"USERNAME eq %USERNAME%$\" /FI $\"IMAGENAME eq AeMenu.exe$\" /FO csv | %SYSTEMROOT%\System32\find.exe $\"AeMenu.exe$\""
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\nsExec.dll
    ; SetDetailsPrint lastused
    ; Push "%SYSTEMROOT%\System32\cmd.exe /c tasklist /FI $\"USERNAME eq %USERNAME%$\" /FI $\"IMAGENAME eq AeMenu.exe$\" /FO csv | %SYSTEMROOT%\System32\find.exe $\"AeMenu.exe$\""
    ; CallInstDLL $PLUGINSDIR\nsExec.dll Exec
  Pop $R0
  StrCmp $R0 0 0 label_625
  Sleep 1000
  nsExec::Exec "%SYSTEMROOT%\System32\cmd.exe /c taskkill /f /im $\"AeMenu.exe$\" /fi $\"PID ne $_20_$\" /fi $\"USERNAME eq %USERNAME%$\""
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\nsExec.dll
    ; SetDetailsPrint lastused
    ; Push "%SYSTEMROOT%\System32\cmd.exe /c taskkill /f /im $\"AeMenu.exe$\" /fi $\"PID ne $_20_$\" /fi $\"USERNAME eq %USERNAME%$\""
    ; CallInstDLL $PLUGINSDIR\nsExec.dll Exec
  nsExec::Exec "%SYSTEMROOT%\System32\cmd.exe /c tasklist /FI $\"USERNAME eq %USERNAME%$\" /FI $\"IMAGENAME eq AeMenu.exe$\" /FO csv | %SYSTEMROOT%\System32\find.exe $\"AeMenu.exe$\""
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\nsExec.dll
    ; SetDetailsPrint lastused
    ; Push "%SYSTEMROOT%\System32\cmd.exe /c tasklist /FI $\"USERNAME eq %USERNAME%$\" /FI $\"IMAGENAME eq AeMenu.exe$\" /FO csv | %SYSTEMROOT%\System32\find.exe $\"AeMenu.exe$\""
    ; CallInstDLL $PLUGINSDIR\nsExec.dll Exec
  Pop $R0
  StrCmp $R0 0 0 label_623
  DetailPrint "Waiting for $\"AeMenu$\" to close."
  Sleep 2000
  Goto label_624
label_623:
  Goto label_631
label_624:
  Goto label_626
label_625:
  Goto label_631
label_626:
  IntCmp $R1 1 label_630 label_630
  MessageBox MB_RETRYCANCEL|MB_ICONEXCLAMATION $(LSTR_48) /SD IDCANCEL IDRETRY label_599    ;  "AeMenu cannot be closed. $\r$\nPlease close it manually and click Retry to continue."
  Quit
  Goto label_631
label_630:
  Goto label_599
label_631:
  StrCpy $_38_ false
  StrCpy $_31_ true
  StrCmp $_31_ true 0 label_638
  ReadRegStr $R1 SHCTX Software\5572adbc-fffa-5088-87dc-ff2110409590 KeepShortcuts
  StrCmp $R1 true 0 label_638
  IfFileExists $_21_ 0 label_638
  StrCpy $_38_ true
label_638:
  Push SHELL_CONTEXT
  Call func_427
  Push SHELL_CONTEXT
  Call func_412
  StrCmp $_18_ all 0 label_647
  Push HKEY_CURRENT_USER
  Call func_427
  Push HKEY_CURRENT_USER
  Call func_412
label_647:
  SetOutPath $INSTDIR
  SetOverwrite on
  AllowSkipFiles on
  File uninstallerIcon.ico
  System::Call kernel32::GetCurrentProcess()p.s
    ; Call Initialize_____Plugins
    ; SetOverwrite off
    ; AllowSkipFiles off
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::GetCurrentProcess()p.s
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call kernel32::IsWow64Process2(ps,*i0s,*i)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::IsWow64Process2(ps,*i0s,*i)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  Push |
  System::Call kernel32::IsWow64Process(p-1,*i0s)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::IsWow64Process(p-1,*i0s)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Int64Op
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\System.dll Int64Op
  Pop $_30_
  StrCmp $_30_ 0 label_672
  Goto label_691
label_672:
  System::Call kernel32::GetCurrentProcess()p.s
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::GetCurrentProcess()p.s
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  System::Call kernel32::IsWow64Process2(ps,*i,*i0s)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push kernel32::IsWow64Process2(ps,*i,*i0s)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  Pop $_30_
  IntCmp $_30_ 0 0 label_690 label_690
  System::Call *0x7FFE002E(&i2.s)
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push *0x7FFE002E(&i2.s)
    ; CallInstDLL $PLUGINSDIR\System.dll Call
  Pop $_30_
label_690:
  IntCmp $_30_ 43620 0 label_692 label_692
label_691:
  StrCpy $_39_ 64
label_692:
  StrCmp $_39_ ARM64 0 label_694
  Goto label_697
label_694:
  StrCmp $_39_ 64 0 label_697
  SetOverwrite on
  AllowSkipFiles on
  File $PLUGINSDIR\app-64.7z
  Goto label_697
label_697:
  Push $OUTDIR
  CreateDirectory $PLUGINSDIR\7z-out
  ClearErrors
  SetOutPath $PLUGINSDIR\7z-out
  nsis7z::Extract $PLUGINSDIR\app-$_39_.7z
    ; Call Initialize_____Plugins
    ; SetOverwrite off
    ; File $PLUGINSDIR\nsis7z.dll
    ; SetDetailsPrint lastused
    ; Push $PLUGINSDIR\app-$_39_.7z
    ; CallInstDLL $PLUGINSDIR\nsis7z.dll Extract
  Pop $R0
  SetOutPath $R0
  StrCpy $R1 0
label_709:
  IntOp $R1 $R1 + 1
  CopyFiles /SILENT $PLUGINSDIR\7z-out\* $OUTDIR    ; $(LSTR_7)$OUTDIR    ;  "Copy to "
  IfErrors 0 label_727
  DetailPrint "Can't modify $\"AeMenu$\"'s files."
  IntCmp $R1 5 label_716 0 label_716
  Goto label_725
  Goto label_717
label_716:
  MessageBox MB_RETRYCANCEL|MB_ICONEXCLAMATION $(LSTR_48) /SD IDRETRY IDCANCEL label_724    ;  "AeMenu cannot be closed. $\r$\nPlease close it manually and click Retry to continue."
label_717:
  RMDir /r $PLUGINSDIR\7z-out
  nsis7z::Extract $PLUGINSDIR\app-$_39_.7z
    ; Call Initialize_____Plugins
    ; AllowSkipFiles off
    ; File $PLUGINSDIR\nsis7z.dll
    ; SetDetailsPrint lastused
    ; Push $PLUGINSDIR\app-$_39_.7z
    ; CallInstDLL $PLUGINSDIR\nsis7z.dll Extract
  Goto label_727
label_724:
  Quit
label_725:
  Sleep 1000
  Goto label_709
label_727:
  StrCmp $_39_ ARM64 0 label_729
  Goto label_731
label_729:
  StrCmp $_39_ 64 0 label_731
  Goto label_731
label_731:
  StrCmp $_18_ all 0 label_733
  SetShellVarContext current
label_733:
  Push $LOCALAPPDATA\aemenu-updater\installer.exe
  StdUtils::GetParentPath /NOUNLOAD
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD GetParentPath
  Pop $R5
  CreateDirectory $R5
  ClearErrors
  CopyFiles /SILENT $EXEPATH $LOCALAPPDATA\aemenu-updater\installer.exe    ; $(LSTR_7)$LOCALAPPDATA\aemenu-updater\installer.exe    ;  "Copy to "
  StrCmp $_18_ all 0 label_744
  SetShellVarContext all
label_744:
  SetOverwrite on
  AllowSkipFiles on
  File "Uninstall AeMenu.exe"
  WriteRegStr SHCTX Software\5572adbc-fffa-5088-87dc-ff2110409590 InstallLocation $INSTDIR
  WriteRegStr SHCTX Software\5572adbc-fffa-5088-87dc-ff2110409590 KeepShortcuts true
  WriteRegStr SHCTX Software\5572adbc-fffa-5088-87dc-ff2110409590 ShortcutName AeMenu
  StrCmp $_18_ all 0 label_752
  StrCpy $0 /allusers
  StrCpy $1 ""
  Goto label_754
label_752:
  StrCpy $0 /currentuser
  StrCpy $1 ""
label_754:
  WriteRegStr SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 DisplayName "AeMenu 1.0.0$1"
  StrCpy $2 "$INSTDIR\Uninstall AeMenu.exe"
  WriteRegStr SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 UninstallString "$\"$2$\" $0"
  WriteRegStr SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 QuietUninstallString "$\"$2$\" $0 /S"
  WriteRegStr SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 DisplayVersion 1.0.0
  WriteRegStr SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 DisplayIcon $INSTDIR\uninstallerIcon.ico
  WriteRegStr SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 Publisher AeTeam
  WriteRegDWORD SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 NoModify 1
  WriteRegDWORD SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 NoRepair 1
  IntFmt $0 0x%08X 229960
  WriteRegDWORD SHCTX Software\Microsoft\Windows\CurrentVersion\Uninstall\5572adbc-fffa-5088-87dc-ff2110409590 EstimatedSize $0
  StrCmp $_38_ false 0 label_777
  StrCmp $_5_ "" label_768
  RMDir $SMPROGRAMS\$_5_
label_768:
  CreateShortCut $_0_ $_21_ "" $_21_ "" "" "" AeTeam
  ClearErrors
  WinShell::SetLnkAUMI $_0_ com.aemenu.id
    ; Call Initialize_____Plugins
    ; SetOverwrite off
    ; File $PLUGINSDIR\WinShell.dll
    ; SetDetailsPrint lastused
    ; Push com.aemenu.id
    ; Push $_0_
    ; CallInstDLL $PLUGINSDIR\WinShell.dll SetLnkAUMI
  Goto label_793
label_777:
  StrCmp $_1_ $_0_ label_793
  IfFileExists $_1_ 0 label_793
  Rename $_1_ $_0_ ;  $_1_->$_0_
  WinShell::UninstShortcut $_1_
    ; Call Initialize_____Plugins
    ; AllowSkipFiles off
    ; File $PLUGINSDIR\WinShell.dll
    ; SetDetailsPrint lastused
    ; Push $_1_
    ; CallInstDLL $PLUGINSDIR\WinShell.dll UninstShortcut
  WinShell::SetLnkAUMI $_0_ com.aemenu.id
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\WinShell.dll
    ; SetDetailsPrint lastused
    ; Push com.aemenu.id
    ; Push $_0_
    ; CallInstDLL $PLUGINSDIR\WinShell.dll SetLnkAUMI
  StrCmp $_5_ "" label_793
  RMDir $SMPROGRAMS\$_5_
label_793:
  Push no-desktop-shortcut
  StdUtils::TestParameter /NOUNLOAD
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD TestParameter
  Pop $R9
  StrCmp $R9 true label_829
  StrCmp $_38_ false 0 label_810
  CreateShortCut $_2_ $_21_ "" $_21_ "" "" "" AeTeam
  ClearErrors
  WinShell::SetLnkAUMI $_2_ com.aemenu.id
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\WinShell.dll
    ; SetDetailsPrint lastused
    ; Push com.aemenu.id
    ; Push $_2_
    ; CallInstDLL $PLUGINSDIR\WinShell.dll SetLnkAUMI
  Goto label_824
label_810:
  StrCmp $_3_ $_2_ label_824
  IfFileExists $_3_ 0 label_824
  Rename $_3_ $_2_ ;  $_3_->$_2_
  WinShell::UninstShortcut $_3_
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\WinShell.dll
    ; SetDetailsPrint lastused
    ; Push $_3_
    ; CallInstDLL $PLUGINSDIR\WinShell.dll UninstShortcut
  WinShell::SetLnkAUMI $_2_ com.aemenu.id
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\WinShell.dll
    ; SetDetailsPrint lastused
    ; Push com.aemenu.id
    ; Push $_2_
    ; CallInstDLL $PLUGINSDIR\WinShell.dll SetLnkAUMI
label_824:
  System::Call "Shell32::SHChangeNotify(i 0x8000000, i 0, i 0, i 0)"
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\System.dll
    ; SetDetailsPrint lastused
    ; Push "Shell32::SHChangeNotify(i 0x8000000, i 0, i 0, i 0)"
    ; CallInstDLL $PLUGINSDIR\System.dll Call
label_829:
  IfFileExists $_0_ 0 label_832
  StrCpy $_22_ $_0_
  Goto label_833
label_832:
  StrCpy $_22_ $INSTDIR\AeMenu.exe
label_833:
  IfSilent label_835
  Goto label_842
label_835:
  Push force-run
  StdUtils::TestParameter /NOUNLOAD
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD TestParameter
  Pop $R9
  StrCmp $R9 true 0 label_861
label_842:
  HideWindow
  Push updated
  StdUtils::TestParameter /NOUNLOAD
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD TestParameter
  Pop $R9
  StrCmp $R9 true 0 label_852
  StrCpy $_40_ --updated
  Goto label_853
label_852:
  StrCpy $_40_ ""
label_853:
  Push $_22_
  Push open
  Push $_40_
  StdUtils::ExecShellAsUser /NOUNLOAD
    ; Call Initialize_____Plugins
    ; File $PLUGINSDIR\StdUtils.dll
    ; SetDetailsPrint lastused
    ; CallInstDLL $PLUGINSDIR\StdUtils.dll /NOUNLOAD ExecShellAsUser
  Pop $0
label_861:
  SetErrorLevel 0
  Quit
SectionEnd


Function func_864
  SectionSetSize 0 229961
FunctionEnd


/*
Function Initialize_____Plugins
  SetDetailsPrint none
  StrCmp $PLUGINSDIR "" 0 label_876
  Push $0
  SetErrors
  GetTempFileName $0
  Delete $0
  CreateDirectory $0 ; CreateRestrictedDirectory
  IfErrors label_877
  StrCpy $PLUGINSDIR $0
  Pop $0
label_876:
  Return

label_877:
  MessageBox MB_OK|MB_ICONSTOP "Error! Can't initialize plug-ins directory. Please try again later." /SD IDOK
  Quit
FunctionEnd
*/



; --------------------
; UNREFERENCED STRINGS:

/*
1 ProgramFilesDir
17 CommonFilesDir
32 "C:\Program Files"
49 $PROGRAMFILES
52 "$PROGRAMFILES\Common Files"
68 $COMMONFILES
*/
