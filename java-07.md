# Java 7 – Provo, korrigjo dhe shpjego RideShare-in

## Rasti i zgjedhur
Rasti 2 – Udhetimi pa vende te lira.

## Parashikimi im
Mendoj se kur udhetimi ka 0 vende te lira, perdoruesi nuk duhet te mund te kerkoje nje vend. Aplikacioni duhet ta shfaqe mesazhin "Nuk ka vende te lira" dhe te mos lejoje kerkesen per udhetim.

## Problemet dhe paqartesite e verejtura

1. Ne skedarin `schema.sql`, emrat e kolonave `destinacioni` dhe `vende` nuk perputheshin me emrat `mberritja` dhe `vende_lira` ne databazen Neon.
2. Skedari `schema.sql` nuk e kishte te deklaruar kolonen `shofer_id`, ndersa kjo kolone ekziston ne tabelen aktuale te databazes.

## Korrigjimi i bere

E korrigjova skedarin `schema.sql` duke i pershtatur emrat e kolonave me strukturen aktuale te databazes Neon. Gjithashtu shtova kolonen `shofer_id`.

Ky ndryshim e ben skedarin e struktures me te perputhshem me databazen aktuale.

## Testimi

### Testi 1 – Udhetimi pa vende te lira
- Hapat: Hapa udhetimin Lipjan – AAB.
- Pritshmeria: Aplikacioni nuk duhet te lejoje kerkesen per vend.
- Verejtja: Shfaqen 0 vende te lira dhe mesazhi "Nuk ka vende te lira".

### Testi 2 – Udhetimi me vende te lira
- Hapat: Hapa udhetimin Prishtine – AAB.
- Pritshmeria: Duhet te shfaqet mundesia per te kerkuar vend.
- Verejtja: Shfaqen 2 vende te lira dhe lidhja "Kerko vend".

### Testi 3 – Klikimi te Kerko vend
- Hapat: Klikova lidhjen "Kerko vend".
- Pritshmeria: Faqja duhet te tregoje statusin e kerkeses.
- Verejtja: Shfaqet "Simulim: Ne pritje" dhe mesazhi se kerkesa nuk eshte derguar te shoferi.

## Ndryshimi i inputit
Nuk ndryshova te dhenat e udhetimeve ne databaze. Korrigjova vetem skedarin `schema.sql`.

## Perdormi i AI
Perdora AI per te analizuar mospërputhjen mes skedarit `schema.sql` dhe struktures se tabeles ne Neon, si dhe per te me ndihmuar ne korrigjimin e saj.

## Commit-et

- Para korrigjimit: https://github.com/bleonabytyci/rideshare-mobile/commit/986b98a05aa004c21c96d4911dc461662eca12e7
- Pas korrigjimit: https://github.com/bleonabytyci/rideshare-mobile/commit/3a7a5f7a0693c8c2f6ccf0700e671d4e91fd5e3c