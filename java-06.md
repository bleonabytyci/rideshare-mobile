# RideShare — Java 6 · PWA dhe puna offline

Ruaje si java-06.md pranë README të repository-t, jashtë aplikacioni/.
Hiqi [PLOTËSO]. Mos vendos sekrete, email ose fotografi kredencialesh.

## Çfarë ndërtova
Ne kete detyre e pergatita RideShare qe lista e udhetimeve te mund te lexohet edhe pa internet. Shtova manifestin me emrin dhe ikonat e aplikacionit, service worker-in qe ruan disa skedare ne pajisje dhe nje faqe te vecante per listen publike. Lista merret nga API-ja /api/udhetimet dhe ruhet per t'u lexuar kur nuk ka lidhje interneti.
## Provat që bëra
### Prova 1: Manifesti dhe vizita online
Hapa http://localhost:3000/ dhe kontrollova edhe http://localhost:3000/api/udhetimet. API-ja shfaqi tri udhetime: Prishtine, Fushe Kosove dhe Lipjan, me destinacion AAB.

Ikonat qe pergatita jane icon-192.png me permasa 192 × 192 dhe icon-512.png me permasa 512 × 512. Kontrollova gjithashtu qe sw.js ishte aktiv dhe po funksiononte. Lista publike u ruajt ne Cache Storage.

### Prova 2: Pa internet dhe pas rifreskimit
Per ta provuar funksionimin pa internet, perdora Developer Tools ne Chrome, te Network, dhe zgjodha Offline. Pastaj hapa http://localhost:3000/offline.html dhe e rifreskova faqen.

Tri udhetimet vazhduan te shfaqeshin edhe pa internet. Ne Cache Storage kontrollova qe ishin ruajtur lista /api/udhetimet, faqja /offline.html dhe te dy ikonat.

Faqja shfaqte kohen kur ishte ruajtur lista. Kjo kopje mund te jete e vjeter, prandaj sherben vetem per lexim. Nuk eshte konfirmim rezervimi, sepse pa lidhje me serverin nuk mund te kontrollohen vendet e lira ose te regjistrohet nje kerkese e re.
### Prova 3: Lidhja rikthehet
Ne Neon kontrollova udhetimin me ID 2. Fillimisht ora ishte 08:15. Per testin e ndryshova ne 08:25 dhe kontrollova qe lista e ruajtur offline e shfaqte oren 08:25.

Pas rikthimit te lidhjes, kontrollova perseri listen dhe API-ne. Ne fund, oren e riktheva ne 08:15 dhe e rifreskova faqen kryesore. Udhetimi Fushe Kosove → AAB u shfaq me oren 08:15.

## Ku gjendet puna
Repository: https://github.com/bleonabytyci/rideshare-mobile

Skedaret e shtuar per kete detyre perfshijne src/app/manifest.ts, src/app/api/udhetimet/route.ts, public/sw.js, public/offline.html, public/icons/icon-192.png, public/icons/icon-512.png dhe src/components/Pwa.tsx. Gjithashtu u lidh komponenti Pwa ne src/app/layout.tsx.

Demo: https://rideshare-mobile-psi.vercel.app

## Çfarë mbetet për përmirësim
Ne viziten e pare pa internet, kur lista nuk eshte ruajtur ende, aplikacioni nuk mund ta shfaqe listen e udhetimeve. Kufizimi kryesor eshte se lista offline mund te mos jete me e perditesuar. Per rezervime dhe per kontrollin e vendeve te lira duhet lidhje me serverin.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Per kete detyre perdora AI per disa sqarime gjate punes. Pastaj e provova aplikacionin dhe kontrollova nese funksionon si duhet.