# RideShare — Java 6 · PWA dhe puna offline

Ruaje si java-06.md pranë README të repository-t, jashtë aplikacioni/.
Mos vendos sekrete, email ose fotografi kredencialesh.

## Çfarë ndërtova
Ne kete detyre e pergatita RideShare qe lista e udhetimeve te mund te lexohet edhe pa internet. Shtova manifestin me emrin dhe ikonat e aplikacionit, service worker-in qe ruan disa skedare ne pajisje dhe nje faqe te vecante per listen publike. Lista merret nga API-ja /api/udhetimet dhe ruhet per t'u lexuar kur nuk ka lidhje interneti.
## Provat që bëra
### Prova 1: Manifesti dhe vizita online
Hapat: Hapa http://localhost:3000/ dhe http://localhost:3000/api/udhetimet, pastaj kontrollova manifestin, ikonat, Service Worker-in dhe Cache Storage.

Rezultati: API-ja shfaqi tri udhetime me destinacion AAB (Prishtine, Fushe Kosove dhe Lipjan). Ikonat ishin 192 × 192 dhe 512 × 512; raportova se sw.js ishte aktiv dhe lista publike ishte ruajtur ne Cache Storage.

### Prova 2: Pa internet dhe pas rifreskimit
Hapat: Ne Chrome Developer Tools zgjodha Network → Offline, hapa http://localhost:3000/offline.html dhe e rifreskova faqen.

Rezultati: Tri udhetimet vazhduan te shfaqeshin dhe faqja tregoi kohen e ruajtjes. Kontrollova ne Cache Storage listen /api/udhetimet, faqen /offline.html dhe dy ikonat. Lista offline mund te jete e vjeter; butoni i rezervimit nuk konfirmon kerkese.

### Prova 3: Lidhja rikthehet
Hapat: Ne Neon kontrollova udhetimin me ID 2 (08:15), e ndryshova ne 08:25, pastaj riktheva lidhjen dhe rifreskova listen. Ne fund e ktheva oren ne 08:15 dhe rifreskova faqen.

Rezultati: Raportova se lista e shfaqte 08:25 dhe se pas rikthimit ne 08:15 udhetimi Fushe Kosove → AAB u shfaq me oren 08:15. Nuk e dokumentova nese ndryshimin 08:25 e bera ndersa RideShare ishte offline dhe nese kopja mbeti 08:15 deri ne rifreskimin online; prandaj kjo prove nuk verteton ende perditesimin pas rikthimit te lidhjes dhe duhet perseritur sipas ketyre hapave.

## Ku gjendet puna
Repository: https://github.com/bleonabytyci/rideshare-mobile

Skedaret e shtuar per kete detyre perfshijne src/app/manifest.ts, src/app/api/udhetimet/route.ts, public/sw.js, public/offline.html, public/icons/icon-192.png, public/icons/icon-512.png dhe src/components/Pwa.tsx. Gjithashtu u lidh komponenti Pwa ne src/app/layout.tsx.

Demo: https://rideshare-mobile-psi.vercel.app

## Çfarë mbetet për përmirësim
Ne viziten e pare pa internet, kur lista nuk eshte ruajtur ende, aplikacioni nuk mund ta shfaqe listen e udhetimeve. Kufizimi kryesor eshte se lista offline mund te mos jete me e perditesuar. Per rezervime dhe per kontrollin e vendeve te lira duhet lidhje me serverin.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Per kete detyre perdora AI per disa sqarime gjate punes. Pastaj e provova aplikacionin dhe kontrollova nese funksionon si duhet.