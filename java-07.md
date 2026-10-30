# Java 7 – Provo, korrigjo dhe shpjego RideShare-in

## Rasti i zgjedhur

Rasti 2 – Udhetimi pa vende te lira.

**Kodi personal:** P7-985

**Te dhenat personale te rastit:**
- Nisja: Ferizaj
- Destinacioni: AAB
- Ora fillestare: 10:05
- Numri i vendeve: 2
- Ora e re per testim: 10:10

## Parashikimi im

Mendoj se kur udhetimi ka 0 vende te lira, perdoruesi nuk duhet te mund te kerkoje nje vend. Aplikacioni duhet ta shfaqe mesazhin "Nuk ka vende te lira" dhe te mos lejoje kerkesen per udhetim.

## Problemet dhe paqartesite e verejtura

1. Ne `aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx`, titulli "Simulim: Ne pritje" mund te kuptohej sikur kerkesa ishte derguar dhe priste pergjigje. Teksti poshte thoshte se nuk dergohej, por titulli krijonte paqartesi.

2. Ne listen e udhetimeve, nje udhetim pa vende shfaqet si "Vende te lira: 0". Vetem pas hapjes se detajeve perdoruesi sheh butonin e caktivizuar "Nuk ka vende te lira".

## Korrigjimi i bere

Ndryshova titullin ne `aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx` ne "Kerkese vetem per demonstrim" dhe sqarova se kerkesa nuk u dergua dhe nuk u ruajt. Kjo e dallon simulimin nga nje rezervim real. Paqartesia e dyte u shenua, por nuk u ndryshua.

## Testimi

Provat u kryen ne aplikacionin lokal me shfletues, me ndihmen e AI. Përsëriti vetë para dorëzimit që të mund t'i shpjegosh rezultatet.

### Prova 1 – Rrjedha e udhetimit personal

- Hapat: Nga lista hapa Ferizaj – AAB (ID 4), pastaj zgjodha "Kerko vend".
- Pritshmeria: Te shfaqen te dhenat e udhetimit dhe te sqarohet se veprimi eshte simulim, jo kerkese reale.
- Verejtja: U shfaqen ora 10:05 dhe 2 vende. Faqja shfaqi "Kerkese vetem per demonstrim" dhe "Kerkesa per Ferizaj nuk u dergua dhe nuk u ruajt".

### Prova 2 – Udhetimi pa vende te lira

- Hapat: Hapa udhetimin Lipjan – AAB (ID 3), pastaj provova edhe faqen e kerkeses.
- Pritshmeria: Kur ka 0 vende, perdoruesi nuk duhet te mund te kerkoje vend.
- Verejtja: Detajet shfaqen me 0 vende dhe butoni "Nuk ka vende te lira" eshte i caktivizuar. Faqja e kerkeses shfaq "Nuk ka vende te lira".

### Prova 3 – ID qe nuk ekziston

- Hapat: Hapa `/udhetimi/999999`.
- Pritshmeria: Te shfaqet mesazh i qarte dhe lidhje per t'u kthyer te lista.
- Verejtja: U shfaq "Udhëtimi nuk u gjet" dhe lidhja "Kthehu te lista".

## Kontrollimi i kodit

`npm run build` perfundoi me sukses. ESLint kaloi per faqet e ndryshuara (`kerkesa/page.tsx` dhe `panel/page.tsx`). `npm run lint` per te gjithe aplikacionin ende raporton nje problem ekzistues ne `src/app/page.tsx:18`: perdoret nje element `<a>` per navigim brenda aplikacionit.

## Ndryshimi i inputit

Rasti personal P7-985 perdor Ferizaj – AAB, oren 10:05, 2 vende dhe oren 10:10 per testim. Per proves se kufirit perdora udhetimin ekzistues ID 3 me 0 vende; per prove tjeter perdora ID 999999 qe nuk ekziston. Nuk ndryshova te dhena ne databaze.

## Perdorimi i AI

Perdora AI per te shqyrtuar paqartesine ne tekst, per te bere korrigjimin ne faqe dhe per te verifikuar rrjedhen ne shfletuesin lokal, lint-in dhe build-in. Provat dhe rezultatet jane shenuar me siper; do t'i perseris vete para dorezimit.

## Commit-et

**Para korrigjimit:**

https://github.com/bleonabytyci/rideshare-mobile/commit/986b98a05aa004c21c96d4911dc461662eca12e7

**Pas korrigjimit te kodit:**

https://github.com/bleonabytyci/rideshare-mobile/commit/3094476c2c04551c4d246f35b00e7d5d16d58677