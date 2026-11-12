# RideShare - Java 9

## Cfare ndertova
Kete jave shtova mundesine me i ruajt udhetimet te te preferuarat. Ruajtja lidhet me databazen, keshtu qe preferimi mbetet edhe pasi rifreskohet faqja. Shtova edhe disa kontrolle per me provu gabimet dhe vonesat.

## Provat qe bera
### Prova 1: Ruajtja e suksesshme mbetet pas rifreskimit
E ruajta nje udhetim te te preferuarat dhe e rifreskova faqen. Udhetimi vazhdoi me u shfaq si i ruajtur.

### Prova 2: Gabimi i serverit nuk le nje sukses te rreme ne ekran
E aktivizova kontrollin per refuzim prove dhe provova me ruajt udhetimin. U shfaq mesazhi i gabimit dhe udhetimi nuk u shfaq si i ruajtur.

### Prova 3: Klikimet e perseritura nuk krijojne kopje
E aktivizova vonesen e serverit dhe klikova disa here te butoni. U regjistrua vetem nje preferim per udhetimin.

## Ku gjendet puna
Faqja e proves gjendet te `/java-09-test?id=2`. Pjeset kryesore jane te `aplikacioni/src/components/PreferimiServer.tsx`, `aplikacioni/src/components/RuajTePreferuarat.tsx`, `aplikacioni/src/lib/preferuarat.ts` dhe `aplikacioni/src/app/api/te-preferuarat/[id]/route.ts`. Nuk kam link publik per demonstrim.

## Cfare mbetet per permiresim
Per momentin funksionet kryesore punojne. Me vone mund ta permiresoj pamjen dhe mesazhet qe shfaqen gjate pritjes ose kur ka gabim.

## Ndihma nga AI (Artificial Intelligence - inteligjence artificiale)
Mora ndihme per rregullimin e importeve dhe te konfigurimit te TypeScript-it. Pastaj e provova vete ruajtjen, gabimin e serverit dhe klikimet e perseritura.