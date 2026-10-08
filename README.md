# Korxona360°

**Ishlab chiqarishingiz — 360° nazoratda.**

Karton va oziq-ovqat ishlab chiqarish hisobi uchun qora-oltin dizayndagi boshlang‘ich dastur. Bu ombor, ishlab chiqarish, sifat va sotuv hisobi uchun ishlaydigan birinchi versiya; to‘liq buxgalteriya yoki soliq tizimi emas.

## Ishlaydigan bo‘limlar

- Xomashyo ombori, kirim, minimal zaxira va o‘rtacha xarid narxi.
- Mahsulotlar, 1 birlik uchun sarf me’yori va sozlanadigan ish bosqichlari.
- Partiyalar: reja → ishlab chiqarish → sifat tekshiruvi → tayyor mahsulot.
- Partiya boshlanganda xomashyo sarfi, yakunlashda haqiqiy sarfga tuzatish.
- Yaroqli mahsulot, brak, partiya xarajatlari va tannarx.
- Mijoz buyurtmalari, sotuv, qarz va to‘lovlar.
- Yaroqlilik muddati: muddati o‘tgan partiyani sotish bloklanadi.
- Hisobot, amallar tarixi va Excel ochadigan CSV eksporti.
- Namuna rejimi: undagi raqamlar haqiqiy hisobga yozilmaydi.
- Oq/qora rejim, telefon ekraniga mos ko‘rinish.
- Bitta rahbar paroli bilan kirish.

Kamera integratsiyasi va xodimlar uchun alohida rollar ushbu versiyaga kiritilmagan.

## GitHub’ga yuklash

ZIPni oching. `Korxona360-GitHub` ichidagi fayllarni yangi GitHub repository’ga yuklang. `node_modules`, `data`, `.env` va maxfiy parolingizni yuklamang. GitHub’ning o‘zi serverni ishga tushirmaydi; ishlatish uchun Node.js server kerak. **GitHub Pages mos emas**, chunki dastur ma’lumotni serverda saqlaydi.

## Kompyuterda ishga tushirish

1. **Node.js 24 yoki yangi versiya** o‘rnating.
2. Dastur papkasida terminal oching.
3. `npm install` bajaring.
4. `.env.example` faylidan `.env` nusxa yarating. `APP_PASSWORD=` yoniga o‘zingizning kamida 10 belgili parolingizni yozing. Tayyor umumiy parol yo‘q.
5. `npm run build` bajaring.
6. `npm start` bajaring.
7. Brauzerda **http://localhost:3000** ni oching. `.env`da yozgan parolingiz bilan kiring.

Windowsda fayl nomi `.env.txt` bo‘lib qolmasin. `.env`dagi parolni o‘zgartirgandan keyin serverni qayta ishga tushiring. Terminalni yopish serverni to‘xtatadi.

## Serverga joylashtirish

Node.js 24 muhitidan foydalaning:

- Build: `npm install && npm run build`
- Start: `npm start`
- Muhit o‘zgaruvchisi: `APP_PASSWORD` — maxfiy parol.
- `PORT`ni hosting belgilashi mumkin; standart qiymat 3000.
- `DATA_DIR`ni doimiy diskdagi katalogga sozlang, masalan `/var/data/korxona360`.
- HTTPS orqali xizmat qilganda `COOKIE_SECURE=true` qo‘ying.

**Doimiy disk zarur.** Vaqtinchalik server diskida ma’lumot server yangilanganda yo‘qolishi mumkin. Ushbu SQLite versiyasini bitta server nusxasida ishlating; ko‘p serverli ish rejimi uchun alohida ma’lumotlar bazasi kerak.

## Zaxira nusxa

Ma’lumotlar `DATA_DIR` ichidagi `korxona360.sqlite` faylida saqlanadi. Serverni to‘xtatib, butun data papkasini nusxalang (WAL/SHM fayllari bo‘lsa, ularni ham). Tiklash uchun serverni to‘xtating, data papkasini zaxira nusxaga almashtiring va qayta ishga tushiring. Ma’lumotlar GitHub’ga yuklanmaydi.

## Hisobni boshlash

1. Soha tanlang: karton yoki oziq-ovqat. Har bir sohaning yozuvlari alohida.
2. Xomashyo va boshlang‘ich qoldiqni kiriting.
3. Mahsulot, birligi, sarf me’yori va bosqichlarini yarating.
4. Partiyani rejalashtiring, so‘ng “Boshlash”ni bosing.
5. Har bosqich tugaganda belgilang.
6. Sifat tekshiruvida haqiqiy sarf, tayyor mahsulot, brak va qo‘shimcha xarajatni kiriting.
7. Tayyor partiyadan sotuv qiling va to‘lovni yozing.

Natija = sotuv − sotilgan mahsulot tannarxi − umumiy xarajat. Soliq va amortizatsiya avtomatik hisoblanmaydi. Xomashyo xaridini umumiy xarajatga qayta kiritmang: u tannarxga kiradi.

## Texnologiyalar va chegaralar

React + Vite interfeysi; Node.js 24 HTTP server; SQLite orqali doimiy saqlash. Ombordagi qoldiq uchun tranzaksiya va manfiy qoldiq cheklovlari, qayta bosilgan partiya amallari uchun takrorlash himoyasi mavjud. Parol o‘zingizning server muhitingizda saqlanadi; sessiya cookie’lari HttpOnly.

Bir korxona va bitta rahbar hisobi uchun boshlang‘ich versiya. Barcha ishlab chiqarish turlari uchun maxsus retsept, sifat yoki hujjat talablarini alohida moslashtirish kerak. Real korxonaga joriy qilishdan oldin o‘zingizning mahsulot va sarf me’yorlaringiz bilan sinov o‘tkazing.
