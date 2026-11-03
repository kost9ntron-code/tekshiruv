/* ===== Til: o'zbekcha / ruscha ===== */
(function(){
"use strict";
const N=s=>String(s).replace(/[’ʻʼ‘`´]/g,"'").replace(/\s+/g," ").trim();
const D={
// --- kirish va umumiy ---
"Shahzodbek O'roqov — tekshiruv konsoli":"Shahzodbek O'roqov — консоль проверки",
"Ekspert ma'lumotlari":"Данные эксперта",
"Avval bo'limingizni, keyin ro'yxatdan o'zingizni tanlang va shaxsiy parolingizni kiriting.":"Сначала выберите свой отдел, затем себя в списке и введите личный пароль.",
"Bo'lim / qo'mita":"Отдел / комитет","Yuklanmoqda…":"Загрузка…","Familiya, ism, otasining ismi":"Фамилия, имя, отчество",
"Ro'yxat yuklanmoqda…":"Загрузка списка…","Shaxsiy parol":"Личный пароль","Lavozim":"Должность","Ishni boshlash":"Начать работу",
"Yordam:":"Помощь:","Yaratuvchi:":"Автор:","Yordam (support): Telegram @bek_shoh07":"Поддержка: Telegram @bek_shoh07","Chiqish":"Выход",
"Xorijiy hujjatni tekshirish":"Проверка иностранного документа",
"PF-6221 bo'yicha tan olinadigan olti vakolatli organ — FDA, EMA, CE sertifikatini beruvchi organlar, PMDA, MFDS, MHRA — hamda ma'lumot uchun boshqa davlatlar reestrlari va ISO 13485 sertifikatlari. Har bir manba uchun aniq maydon nomi va ma'lum tuzoqlar ko'rsatilgan.":"Шесть уполномоченных органов, признаваемых по ПФ-6221, — FDA, EMA, органы, выдающие сертификат CE, PMDA, MFDS, MHRA, — а также реестры других стран и сертификаты ISO 13485 для справки. Для каждого источника указаны точное название поля и известные ловушки.",
"Hujjatni tekshirish":"Проверка документа","Vakolatli organlar va reestrlar":"Уполномоченные органы и реестры",
"Tibbiy jihoz haqida ma'lumotnoma":"Справочник по медицинскому изделию","Tibbiy jihozlar bazasi":"База медицинских изделий",
"Bo'limlar":"Разделы","Vakolatli organlar va ma'lumotnoma":"Уполномоченные органы и справочник",
"Tibbiy jihozlar qo'mitasi":"Комитет по медицинским изделиям","Tibbiy jihozlarni ro'yxatdan o'tkazish bo'limi":"Отдел регистрации медицинских изделий",
"Ekspert:":"Эксперт:","Parol":"Пароль",
// --- 1-bo'lim ---
"Hujjatni kiriting":"Введите документ","Boshlash":"Начать","Hujjatning amal qilish muddati (ixtiyoriy)":"Срок действия документа (необязательно)",
"Raqam kiritilganda uning tarkibi shu yerda ochib beriladi.":"После ввода номера здесь будет показан его состав.",
"Raqam yoki ishlab chiqaruvchi nomi":"Номер или название производителя",
"Avtomatik tekshiruv":"Автоматическая проверка","AQSH · FDA":"США · FDA","Davlatlar reestrlari":"Государственные реестры",
"Nusxala":"Копировать","Manbani ochish":"Открыть источник",
"→ sahifada ko'rsatilgan maydonga qo'ying → natijani shu yerda belgilang.":"→ вставьте в указанное поле на странице → отметьте результат здесь.",
"ISO 13485 sertifikati":"Сертификат ISO 13485","Xulosa":"Заключение","Har safar so'rang":"Запрашивайте каждый раз","Hujjat":"Документ",
"(erkin savdo sertifikati) bo'lsa — bu ro'yxatdan o'tkazish hujjati emas va hech qanday reestrda saqlanmaydi. Asosiy hujjatni talab qiling: Yevropa uchun":"(сертификат свободной продажи) — это не регистрационный документ, и он не хранится ни в одном реестре. Запросите основной документ: для Европы —",
"CE sertifikati va muvofiqlik deklaratsiyasi":"сертификат CE и декларацию соответствия",", boshqa davlatlar uchun":", для других стран —",
"ruxsat guvohnomasi":"регистрационное удостоверение",". Sertifikatda \"Page 1 of N\" yozilgan bo'lsa —":". Если в сертификате указано «Page 1 of N», —",
"barcha betlarni":"запросите все страницы","so'rang, mahsulotlar ro'yxati odatda ilovada.":": перечень продукции обычно в приложении.",
"Tasdiqlandi":"Подтверждено","Qo'shimcha hujjat talab qilinadi":"Требуется дополнительный документ","Rad etiladi":"Отклоняется",
"Arxivga saqlash":"Сохранить в архив","Bayonnomani chop etish":"Печать протокола","Yangi tekshiruv":"Новая проверка","Arxiv":"Архив",
"JSON yuklab olish":"Скачать JSON","Hali yozuv yo'q.":"Записей пока нет.","Mos yozuv yo'q.":"Подходящих записей нет.","Statistika":"Статистика",
"Tekshiruv saqlangandan keyin statistika shu yerda chiqadi.":"Статистика появится здесь после сохранения проверки.",
"Manbada yozuv topilmasligi hujjat haqiqiy emasligini bildirmaydi. Yakuniy tasdiq — vakolatli organ javobi.":"Отсутствие записи в источнике не означает, что документ недействителен. Окончательное подтверждение — ответ уполномоченного органа.",
"Arxivdan qidirish: raqam yoki ekspert":"Поиск в архиве: номер или эксперт","Ekspert xulosasi":"Заключение эксперта","Xulosa turi":"Тип заключения",
"ISO 13485 sertifikati — ochiq bazasi yo'q":"Сертификат ISO 13485 — открытой базы нет","Hujjat raqami — onlayn tasdiqlanadi":"Номер документа — подтверждается онлайн",
"hujjat raqami":"номер документа","raqamdan keyin qo'shing":"добавьте после номера",
"topildi":"найдено","topilmadi":"не найдено","ochilmadi":"не открылось","belgilanmagan":"не отмечено",
"Izoh: nima topildi, qaysi sana, qanday holat":"Примечание: что найдено, какая дата, какой статус",
"PF-6221 bo'yicha tan olinadi":"Признаётся по ПФ-6221","— natijasi ekspertizada asos bo'ladi":"— результат является основанием в экспертизе",
"Ma'lumot uchun":"Для справки","ma'lumot uchun":"для справки",
"Ma'lumot uchun — natijasi xulosaga mustaqil asos bo'la olmaydi":"Для справки — результат не может быть самостоятельным основанием заключения",
"Sertifikat raqamini yuqoriga kiritib «Boshlash»ni bossangiz, organ avtomatik aniqlanadi va uning bazasi birinchi qatorga chiqadi. Doim":"Введите номер сертификата выше и нажмите «Начать» — орган определится автоматически, и его база окажется в первой строке. Всегда начинайте с",
"dan boshlang.":".","DEKRA sertifikati aniqlandi.":"Определён сертификат DEKRA.",
"Raqamdan sertifikat organi aniqlandi — uning bazasi birinchi turibdi.":"По номеру определён орган сертификации — его база стоит первой.",
"bilan birga ikkalasi majburiy.":"— проверка в обеих базах обязательна.",
"Avval «Manbani ochish» tugmasini bosing — belgi faqat ochilgan manbaga qo'yiladi.":"Сначала нажмите «Открыть источник» — отметку можно поставить только для открытого источника.",
"Xulosa turini tanlang: Tasdiqlandi, Qo'shimcha hujjat talab qilinadi yoki Rad etiladi.":"Выберите тип заключения: Подтверждено, Требуется дополнительный документ или Отклоняется.",
"Sana":"Дата","Ekspert":"Эксперт","So'rov":"Запрос","Turi":"Тип","Koef.":"Коэф.","Natijalar":"Результаты","Arxiv bo'sh.":"Архив пуст.",
// --- kirish xabarlari ---
"Sayt yangilanmoqda. Iltimos, keyinroq urinib ko'ring.":"Сайт обновляется. Пожалуйста, попробуйте позже.",
"Tizimga ulanib bo'lmadi. Internet aloqasini tekshirib, sahifani yangilang.":"Не удалось подключиться к системе. Проверьте интернет и обновите страницу.",
"Ro'yxat bo'sh":"Список пуст","Tizim hali sozlanmagan: administrator xodimlar ro'yxatini yuklashi kerak.":"Система ещё не настроена: администратор должен загрузить список сотрудников.",
"— bo'limni tanlang —":"— выберите отдел —","— avval bo'limni tanlang —":"— сначала выберите отдел —","— ro'yxatdan tanlang —":"— выберите из списка —",
"Bu bo'limda hali xodim yo'q":"В этом отделе пока нет сотрудников","Ro'yxatdan familiya va ismingizni tanlang.":"Выберите свою фамилию и имя из списка.",
"Parolni kiriting.":"Введите пароль.","Parol noto'g'ri yoki sizga kirish yopilgan.":"Неверный пароль или доступ для вас закрыт.",
", bu qurilma hali tasdiqlanmagan.":", это устройство ещё не подтверждено.",
"Administratorga so'rov yuborildi. U tasdiqlashi bilan sahifa o'zi ochiladi — oynani yopmang.":"Запрос отправлен администратору. Как только он подтвердит, страница откроется сама — не закрывайте окно.",
"Bekor qilish":"Отмена","Qurilma tasdiqlanmagan":"Устройство не подтверждено","Sizga kirish yopilgan.":"Доступ для вас закрыт.","Kirish rad etildi.":"Вход отклонён.",
"Sessiya yaroqsiz: parol o'zgartirilgan yoki kirish yopilgan.":"Сессия недействительна: пароль изменён или доступ закрыт.","Kirish yopildi":"Доступ закрыт",
"Yangilash tugashi bilan sahifa o'zi ochiladi — oynani yopmang.":"После окончания обновления страница откроется сама — не закрывайте окно.",
"Savol bo'lsa, administratorga murojaat qiling.":"При вопросах обратитесь к администратору.","Qayta kirish":"Войти снова",
"Joriy tekshiruv saqlanmagan. Baribir chiqasizmi?":"Текущая проверка не сохранена. Всё равно выйти?",
"Markaziy baza.":"Центральная база.","Ma'lumotlar yuklanmoqda…":"Данные загружаются…","Arxivni yuklab bo'lmadi.":"Не удалось загрузить архив.",
"Sayt yangilanmoqda":"Сайт обновляется","Administrator sizga kirishni yopdi.":"Администратор закрыл вам доступ.",
"Bu qurilmaning ruxsati bekor qilindi.":"Разрешение для этого устройства отменено.",
// --- Rejim paneli ---
"Rejim":"Режим","Rejim sozlamalari":"Настройки режима","Til":"Язык","Menyu rangi":"Цвет меню","Tema":"Тема","Andoza":"Макет",
"Avto":"Авто","Qora":"Тёмная","Yorqin":"Светлая","Klassik":"Классика","Standart":"Стандарт","Ixcham":"Компакт","Zich":"Плотный",
"Ingichka":"Узкий","Markazlashgan":"По центру","Korxona":"Деловой","Zamonaviy":"Модерн","Asl holatga qaytarish":"Сбросить настройки","Yopish":"Закрыть",
"Tanlov shu brauzerda saqlanadi. «Zich» va «Zamonaviy» yon menyusi keng ekranda ko'rinadi, telefonda oddiy yuqori menyu bo'ladi.":"Выбор сохраняется в этом браузере. Боковое меню макетов «Плотный» и «Модерн» видно на широком экране, на телефоне меню обычное, сверху.",
// --- 2-3-bo'lim (organlar.html) ---
"Qidiruv: organ nomi, NB raqami yoki davlat":"Поиск: название органа, номер NB или страна",
"Havolalar bosh sahifaga emas, imkon qadar to'g'ridan-to'g'ri qidiruv sahifasiga olib boradi. Sertifikat raqami kiritilgan bo'lsa, «Tekshirish» bosilganda raqam avtomatik nusxalanadi — ochilgan sahifadagi qidiruv maydoniga Ctrl+V bilan qo'ying. Vakolatli organlar ro'yxati: Yevropa Komissiyasi so'rovnomasi (2026-yil fevral), MHRA (2026-yil iyul), FDA MDSAP ro'yxati va Yaponiya MHLW ma'lumotlari asosida.":"Ссылки ведут не на главную страницу, а по возможности прямо на страницу поиска. Если введён номер сертификата, при нажатии «Проверить» он копируется автоматически — вставьте его в поле поиска на открывшейся странице сочетанием Ctrl+V. Список уполномоченных органов составлен по справочнику Европейской комиссии (февраль 2026), MHRA (июль 2026), списку FDA MDSAP и данным MHLW Японии.",
"Davlatlar":"Страны","Tozalash":"Очистить","Tekshirish":"Проверить","masalan: 35983 yoki insulin nasosi":"например: 35983 или инсулиновая помпа","masalan: K231234":"например: K231234",
"masalan: TÜV, 0123, Italiya":"например: TÜV, 0123, Италия","Asosan dasturiy ta'minot va sun'iy intellekt":"В основном программное обеспечение и искусственный интеллект",
"Manzil va vakolat doirasi — MHLW ro'yxatida":"Адрес и сфера полномочий — в списке MHLW","Xitoy ishlab chiqaruvchilari uchun eng muhim manba":"Самый важный источник для китайских производителей",
"Aniq organi noma'lum bo'lgan har qanday ISO 13485 sertifikati uchun":"Для любого сертификата ISO 13485, если орган неизвестен",
"Q5 bilan boshlanadigan raqamlar":"Номера, начинающиеся с Q5","MD / FM bilan boshlanadigan raqamlar":"Номера, начинающиеся с MD / FM","D bilan boshlanadigan raqamlar":"Номера, начинающиеся с D",
"CE belgisini beradi. Har bir sertifikat NANDO raqami bilan chiqadi — raqam sertifikatdagi bilan mos kelishi kerak.":"Выдаёт знак CE. Каждый сертификат выпускается с номером NANDO — он должен совпадать с номером в сертификате.",
"Buyuk Britaniya bozori uchun UKCA sertifikatini beradi.":"Выдаёт сертификат UKCA для рынка Великобритании.",
"Bitta audit beshta davlat (AQSh, Kanada, Braziliya, Avstraliya, Yaponiya) uchun tan olinadi.":"Один аудит признаётся пятью странами (США, Канада, Бразилия, Австралия, Япония).",
"Sertifikat bergan organning o'zi akkreditatsiyalanganini tekshirish uchun.":"Для проверки аккредитации самого органа, выдавшего сертификат.",
". Bayroqni tanlang — shu davlatning regulyatori, vakolatli organlari va ularning sertifikat bazalari chiqadi.":". Выберите флаг — появятся регулятор страны, уполномоченные органы и их базы сертификатов.",
"Tugma bosilganda raqam nusxalanadi — ochilgan qidiruv maydoniga Ctrl+V bilan qo'ying.":"При нажатии кнопки номер копируется — вставьте его в открывшееся поле поиска сочетанием Ctrl+V.",
"Raqam havolaga qo'yildi va nusxalandi":"Номер подставлен в ссылку и скопирован","Raqam nusxalandi — ochilgan sahifada Ctrl+V bosing":"Номер скопирован — нажмите Ctrl+V на открывшейся странице",
"Tartibi: umumiy tartibda yoki tan olish yo'li bilan (FDA, CE sertifikati / EMA, PMDA, MFDS, MHRA).":"Порядок: общий или путём признания (FDA, сертификат CE / EMA, PMDA, MFDS, MHRA).",
"GMDN'da atama eskirgan (Obsolete) — yangi ro'yxatga olishda ishlatilmaydi, GMDN uni boshqa atama bilan almashtirgan. Bu huquqiy istisno emas, nomenklatura holati.":"В GMDN термин устарел (Obsolete) — при новой регистрации не используется, GMDN заменил его другим. Это не правовое исключение, а статус номенклатуры.",
". Administratorga murojaat qiling.":". Обратитесь к администратору.",
// davlatlar
"AQSH":"США","AQSh":"США","Yevropa Ittifoqi":"Европейский союз","Yaponiya":"Япония","Janubiy Koreya":"Южная Корея","Koreya":"Корея","Buyuk Britaniya":"Великобритания",
"Xitoy":"Китай","Hindiston":"Индия","Turkiya":"Турция","Rossiya":"Россия","Kanada":"Канада","Avstraliya":"Австралия","Braziliya":"Бразилия","Germaniya":"Германия",
"Italiya":"Италия","Fransiya":"Франция","Shveytsariya":"Швейцария","Isroil":"Израиль","Tayvan":"Тайвань","Singapur":"Сингапур","Belarus":"Беларусь","Qozog'iston":"Казахстан",
"O'zbekiston":"Узбекистан","Ispaniya":"Испания","Niderlandiya":"Нидерланды","Polsha":"Польша","Malayziya":"Малайзия","Eron":"Иран","Misr":"Египет","Avstriya":"Австрия",
"Belgiya":"Бельгия","Daniya":"Дания","Shvetsiya":"Швеция","Finlyandiya":"Финляндия","Irlandiya":"Ирландия","Chexiya":"Чехия","Vengriya":"Венгрия","Gonkong":"Гонконг",
// --- 5-bo'lim (agent.html) ---
"Normativ hujjatlar bo'yicha qidiruv va javob":"Поиск и ответы по нормативным документам","Hujjatlar qidiruvi":"Поиск по документам","AI javob":"Ответ ИИ",
"Savolni yozing: tizim 24 ta normativ hujjat ichidan mos bandlarni topib, hujjat nomi va band raqami bilan ko'rsatadi.":"Напишите вопрос: система найдёт подходящие пункты в 24 нормативных документах и покажет их с названием документа и номером пункта. Документы на узбекском — в режиме поиска пишите ключевые слова на узбекском.",
"Savol":"Вопрос","Bilimlar bazasi":"База знаний","Hujjatni bosing — qidiruv faqat shu hujjat ichida bo'ladi. Qayta bossangiz — hammasida.":"Нажмите на документ — поиск будет только в нём. Нажмите повторно — во всех.",
"AI sozlamalari":"Настройки ИИ","Model":"Модель","Sonnet 5.5 — aniqroq":"Sonnet 5.5 — точнее","Haiku 5.5 — arzonroq":"Haiku 5.5 — дешевле","Anthropic API kaliti":"Ключ Anthropic API","Saqlash":"Сохранить",
"Kalit faqat shu brauzerda saqlanadi va faqat Anthropic'ga yuboriladi. Xarajat kalit egasining hisobidan. Umumiy kompyuterda kiritmang.":"Ключ хранится только в этом браузере и отправляется только в Anthropic. Расходы — за счёт владельца ключа. Не вводите его на общем компьютере.",
"Hujjatni tanlang":"Выберите документ","Yuborish":"Отправить","To'liq matn":"Полный текст","Nusxalash":"Копировать","Nusxalandi":"Скопировано",
"Manbalar (bosing — to'liq matn):":"Источники (нажмите — полный текст):","Qidiruv hamma hujjatlar ichida.":"Поиск по всем документам.","Qidiruv faqat tanlangan hujjat ichida.":"Поиск только в выбранном документе.",
"hujjatlar o'qilmoqda…":"читаю документы…","Kalit o'chirildi.":"Ключ удалён.","Kalit «sk-ant-» bilan boshlanishi kerak.":"Ключ должен начинаться с «sk-ant-».",
"Avval o'ng tomondagi «AI sozlamalari»ga API kalitni kiriting va «Saqlash»ni bosing.":"Сначала введите API-ключ в «Настройках ИИ» справа и нажмите «Сохранить».",
"Kalit noto'g'ri yoki o'chirilgan.":"Ключ неверный или отключён.","So'rovlar limiti yoki hisobda mablag' tugagan. Birozdan keyin urinib ko'ring.":"Исчерпан лимит запросов или средства на счёте. Попробуйте позже.",
"Javob tayyor bo'lmadi (juda ko'p qidiruv). Savolni aniqroq yozing.":"Ответ не получен (слишком много поисков). Уточните вопрос.",
"Sizga bu bo'limga ruxsat berilmagan. Ruxsat uchun administratorga murojaat qiling.":"У вас нет доступа к этому разделу. Обратитесь к администратору.",
"Avval asosiy sahifadan tizimga kiring.":"Сначала войдите в систему на главной странице.",
"Normativ hujjatlar bo'yicha qidiruv va javob":"Поиск и ответы по нормативным документам","AI hujjatlar ichidan o'qib, o'z so'zi bilan javob beradi":"ИИ читает документы и отвечает своими словами",
"Savolingizni yozing — AI hujjatlarni o'qib javob beradi…":"Напишите вопрос — ИИ прочитает документы и ответит…",
"Masalan: ISO 13485 qachondan talab qilinadi? (Enter — yuborish)":"Ключевые слова на узбекском, например: ISO 13485 talab (Enter — отправить)",
"Masalan: ISO 13485 qachondan talab qilinadi? (Enter — yuborish, Shift+Enter — yangi qator)":"Ключевые слова на узбекском, например: ISO 13485 talab (Enter — отправить)",
// --- 4-bo'lim (baza.html) ---
"Qidiruv uchun shartni kiriting va «Поиск» ni bosing.":"Введите условия и нажмите «Поиск».","Natijani Excel'ga chiqarish":"Выгрузить результат в Excel",
"ru / uz / en — qism yozilsa ham topadi":"ru / uz / en — ищет и по части слова","Qisqa ko'rinish":"Краткий вид","Chop etish":"Печать",
"Faqat ko'rish. Ma'lumot Access/KNMT bazasidan o'zgarishsiz.":"Только просмотр. Данные из базы Access/KNMT без изменений.","Tayyor":"Готово","Qayta urinilmoqda…":"Повторная попытка…",
"Sizga bu bo'limga ruxsat berilmagan.":"У вас нет доступа к этому разделу.","Ruxsat uchun administratorga murojaat qiling.":"Обратитесь к администратору за доступом.",
"Administrator bazani hali yuklamagan bo'lishi mumkin.":"Возможно, администратор ещё не загрузил базу.","Bu ishda ilova yo'q.":"В этом деле нет приложений.",
"Shartnoma summalari, to'lovlar va korrespondensiya bu yerda ko'rsatilmaydi.":"Суммы договора, платежи и корреспонденция здесь не показываются.",
"‹ Kartochkaga qaytish":"‹ Вернуться к карточке","Tibbiy jihozlar bazasi · Ish kartochkasi":"База медицинских изделий · Карточка дела","Asosiy ma'lumotlar":"Основные сведения",
"Ro'yxatga olish va shartnoma":"Регистрация и договор","Ekspertiza jarayoni":"Ход экспертизы","Ilova yo'q.":"Приложений нет.",
"Summalar, rekvizitlar, xatlar bu yerda ko'rsatilmaydi. Tahrirlash yo'q.":"Суммы, реквизиты и письма здесь не показываются. Редактирование недоступно."
};
const RX=[
[/^Tibbiy jihozlar qo'mitasi · (.+) · (\d+)-nashr$/,"Комитет по медицинским изделиям · $1 · версия $2"],
[/^(\d+) ta yozuv$/,"Записей: $1"],
[/^Masalan: (.*)$/,"Например: $1"],
[/^(.+) — kartochkaga o'tish$/,"$1 — перейти к карточке"],
[/^Saqlab bo'lmadi\. Internet aloqasini tekshirib, qayta urinib ko'ring\.(.*)$/,"Не удалось сохранить. Проверьте интернет и попробуйте снова.$1"],
[/^Ro'yxatni yuklab bo'lmadi: (.*)$/,"Не удалось загрузить список: $1"],
[/^Ulanishda xato: (.*)$/,"Ошибка подключения: $1"],
[/^Qurilma: (.*)$/,"Устройство: $1"],
[/^· (.*) · Tibbiy jihozlar qo'mitasi$/,"· $1 · Комитет по медицинским изделиям"],
[/^· (.*) · Tibbiy jihozlarni ro'yxatdan o'tkazish bo'limi$/,"· $1 · Отдел регистрации медицинских изделий"],
[/^(\d+) ta manba$/,"источников: $1"],[/^(\d+) ta davlat$/,"стран: $1"],
[/^«(.*)» bo'yicha hech narsa topilmadi\. Boshqa yozilishini sinab ko'ring yoki bayroq orqali davlatni tanlang\.$/,"По запросу «$1» ничего не найдено. Попробуйте другое написание или выберите страну по флагу."],
[/^«(.*)» bo'yicha hech narsa topilmadi\. .*$/,"По запросу «$1» ничего не найдено. Попробуйте другие ключевые слова на узбекском (например: «klinik tadqiqot», «ISO 13485», «xavf sinfi»)."],
[/^(\d+) ta mos band(.*?)\. Bu rejim o'z so'zi bilan emas, hujjatdagi matnni topib beradi\.$/,"Найдено пунктов: $1$2. Этот режим не отвечает своими словами, а находит текст в документах."],
[/^(.+)-band$/,"пункт $1"],
[/^qidirilmoqda: «(.*)»$/,"ищу: «$1»"],
[/^Kalit saqlandi \((.+)\)\.$/,"Ключ сохранён ($1)."],[/^Kalit saqlangan \((.+)\)\.$/,"Ключ сохранён ($1)."],
[/^Oxirgi so'rov: (\d+) kirish \+ (\d+) chiqish token\.$/,"Последний запрос: $1 вход + $2 выход токенов."],
[/^Bazani yuklab bo'lmadi: (.*)$/,"Не удалось загрузить базу: $1"],
[/^Bazada ([\d\s ]+) ta ish · yangilangan (.+)$/,"В базе дел: $1 · обновлено $2"],
[/^Topildi: ([\d\s ]+) ta ish$/,"Найдено дел: $1"],
[/^Yuklanmoqda: (.+)$/,"Загрузка: $1"],
[/^Ish topilmadi: (.+)$/,"Дело не найдено: $1"],[/^Yuklab bo'lmadi: (.+)$/,"Не удалось загрузить: $1"],
[/^Ilova nomlari yuklanmoqda… (.+)$/,"Загрузка названий приложений… $1"],
[/^(\d+) ta pozitsiya$/,"позиций: $1"]
];
let LANG="uz";
const DONE=new Set();
function tr(s){ const k=N(s); if(!k) return null; if(Object.prototype.hasOwnProperty.call(D,k)) return D[k]; for(const [r,t] of RX){ if(r.test(k)) return k.replace(r,t); } return null; }
const ORIG=new WeakMap();
function doText(n){
  const v=n.nodeValue; if(!v||!/[A-Za-z]/.test(v)) return;
  const p=n.parentNode; if(!p||/^(SCRIPT|STYLE|TEXTAREA|CODE)$/.test(p.nodeName)) return;
  const t=tr(v); if(t==null) return;
  const nv=v.match(/^\s*/)[0]+t+v.match(/\s*$/)[0]; if(nv===v) return;   // o'zgarmasa yozmaymiz (aks holda cheksiz aylanadi)
  if(!ORIG.has(n)) ORIG.set(n,v);
  n.nodeValue=nv; DONE.add(n);
}
const ATTR=["placeholder","title","aria-label"];
function doAttrs(el){ for(const a of ATTR){ const v=el.getAttribute&&el.getAttribute(a); if(!v) continue; const t=tr(v); if(t==null||t===v) continue; if(!el.hasAttribute("data-uz-"+a)) el.setAttribute("data-uz-"+a,v); el.setAttribute(a,t); } }
function walk(root){
  if(!root) return;
  if(root.nodeType===3){ doText(root); return; }
  if(root.nodeType!==1) return;
  doAttrs(root);
  root.querySelectorAll("[placeholder],[title],[aria-label]").forEach(doAttrs);
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); let n; while((n=w.nextNode())) doText(n);
}
function restore(){
  DONE.forEach(n=>{ if(ORIG.has(n)) n.nodeValue=ORIG.get(n); }); DONE.clear();
  ATTR.forEach(a=>document.querySelectorAll("[data-uz-"+a+"]").forEach(el=>{ el.setAttribute(a,el.getAttribute("data-uz-"+a)); el.removeAttribute("data-uz-"+a); }));
  if(document.__uzTitle) document.title=document.__uzTitle;
}
const mo=new MutationObserver(ms=>{ if(LANG!=="ru") return; for(const m of ms){ if(m.type==="characterData") doText(m.target); else if(m.type==="attributes") doAttrs(m.target); else m.addedNodes.forEach(walk); } });
function start(){ if(!document.body) return; walk(document.body); const t=tr(document.title); if(t){ document.__uzTitle=document.__uzTitle||document.title; document.title=t; }
  mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTR}); }
function set(l){
  l=l==="ru"?"ru":"uz"; if(l===LANG&&l==="uz") return; LANG=l;
  document.documentElement.lang=l;
  if(l==="ru"){ if(document.body) start(); else document.addEventListener("DOMContentLoaded",start,{once:true}); }
  else{ mo.disconnect(); restore(); }
}
const oa=window.alert.bind(window), oc=window.confirm.bind(window);
window.alert=m=>oa(LANG==="ru"?(tr(m)??m):m);
window.confirm=m=>oc(LANG==="ru"?(tr(m)??m):m);
function fromStore(){ try{ const j=JSON.parse(localStorage.getItem("tk_ko")||"null"); return j&&j.lang; }catch(e){ return null; } }
window.TIL={ set, tr:s=>LANG==="ru"?(tr(s)??s):s, get lang(){ return LANG; } };
set(fromStore()||"uz");
addEventListener("storage",e=>{ if(e.key==="tk_ko") set(fromStore()||"uz"); });
})();
