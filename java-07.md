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

1. Ne skedarin `schema.sql`, emrat e kolonave `destinacioni` dhe `vende` nuk perputheshin me emrat `mberritja` dhe `vende_lira` ne databazen Neon.

2. Skedari `schema.sql` nuk e kishte te deklaruar kolonen `shofer_id`, ndersa kjo kolone ekziston ne tabelen aktuale te databazes.

3. Ne skedarin `aplikacioni/src/lib/lejet.ts`, funksioni `ndryshoOren()` pranonte vetem ID-te 1, 2 dhe 3. Kjo ishte nje kufizim, sepse nuk lejonte ID numerike me me shume se nje shifer.

## Korrigjimi i bere

Se pari, korrigjova skedarin `aplikacioni/schema.sql` duke i pershtatur emrat e kolonave me strukturen aktuale te databazes Neon. Gjithashtu shtova kolonen `shofer_id`.

Me pas, korrigjova skedarin `aplikacioni/src/lib/lejet.ts`.

Ne funksionin `ndryshoOren()` ndryshova kontrollin e ID-se. Me pare pranoheshin vetem ID-te 1, 2 dhe 3, ndersa tani pranohen ID numerike me nje ose me shume shifra.

Ky ndryshim e ben validimin me fleksibel dhe nuk e kufizon perdorimin vetem ne tri ID.

## Testimi

### Testi 1 – Udhetimi pa vende te lira

- Hapat: Hapa udhetimin Lipjan – AAB me ID 3.
- Pritshmeria: Aplikacioni nuk duhet te lejoje kerkesen per vend kur nuk ka vende te lira.
- Verejtja: Shfaqen 0 vende te lira dhe mesazhi "Nuk ka vende te lira". Mundesia per te kerkuar vend eshte e caktivizuar.

### Testi 2 – Udhetimi me vende te lira

- Hapat: Hapa udhetimin Prishtine – AAB me ID 1.
- Pritshmeria: Aplikacioni duhet te shfaqe numrin e vendeve te lira dhe mundesine per te kerkuar vend.
- Verejtja: Shfaqen 2 vende te lira dhe lidhja "Kerko vend".

### Testi 3 – Klikimi te Kerko vend

- Hapat: Klikova lidhjen "Kerko vend" te udhetimi Prishtine – AAB.
- Pritshmeria: Faqja duhet te tregoje statusin e kerkeses.
- Verejtja: Shfaqet "Simulim: Ne pritje" dhe mesazhi se kerkesa nuk eshte derguar te shoferi. Ruajtja dhe konfirmimi real nuk jane implementuar ende.

## Kontrollimi i kodit

Pas korrigjimit te skedarit `lejet.ts`, ekzekutova komanden:

`npx tsc --noEmit`

Rezultati: Komanda perfundoi pa shfaqur gabime TypeScript.

Gjithashtu ekzekutova:

`npm run build`

Rezultati: Build perfundoi me sukses. Aplikacioni u kompajlua pa gabime.

## Ndryshimi i inputit

Ne rastin personal P7-985, te dhenat e testimit jane Ferizaj – AAB, ora 10:05 dhe 2 vende. Ora e re per testim eshte 10:10.

Ne kodin e validimit ndryshova menyren e kontrollimit te ID-se, ne menyre qe te pranohen edhe ID numerike me me shume se nje shifer.

## Perdorimi i AI

Perdora AI per te analizuar problemet ne skedarin `schema.sql`, per te kontrolluar kodin e aplikacionit dhe per te identifikuar kufizimin ne validimin e ID-se. AI me ndihmoi ne propozimin e korrigjimit dhe ne kontrollimin e kodit me TypeScript dhe build.

## Commit-et

**Para korrigjimit:**

https://github.com/bleonabytyci/rideshare-mobile/commit/986b98a05aa004c21c96d4911dc461662eca12e7

**Korrigjimi i skemes se databazes:**

https://github.com/bleonabytyci/rideshare-mobile/commit/3a7a5f7a0693c8c2f6ccf0700e671d4e91fd5e3c

**Pas korrigjimit te kodit:**

https://github.com/bleonabytyci/rideshare-mobile/commit/ec6a5b774e3e55feca786374aa899d1b13b89c3f