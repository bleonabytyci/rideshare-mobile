# RideShare - Java 10

## Cfare ndertova
Kete jave e shtova mundesine qe udhetari te dergoje kerkese per nje vend dhe shoferi ta pranoje. Kerkesa ruhet ne databaze, keshtu qe shoferi dhe udhetari e shohin te njejten gjendje. Pas pranimit, vendet e lira perditesohen vetem nje here. E ndryshova nga Java 9, ku punova me te preferuarat.

Gjendja lexohet automatikisht cdo 5 sekonda. Kur nuk ka internet, ruhet pamja e fundit dhe shfaqet njoftimi per rilidhje. Pasi kthehet interneti, faqja e lexon gjendjen e re pa Refresh manual.

## Pergatitja e proves
Perdora dy llogari testuese ne dy dritare me sesione te ndara: njeren si udhetar dhe tjetren si shofer. Testova udhetime fiktive me 2 vende dhe me 1 vend. Te udhetimi Fushe Kosove - AAB (ID 2), ne fund kerkesa ishte e pranuar dhe mbeti 0 vende.

## Provat qe bera
### Prova 1: Kerkesa mberrin te shoferi
- Hapat: U nisa me nje udhetim me 2 vende dhe dergova kerkesen nga llogaria e udhetarit.
- Cfare prisja: Kerkesa te shfaqej te shoferi pa bere Refresh dhe vendet te mbeteshin 2.
- Cfare ndodhi: Shoferi e pa kerkesen ne pritje pas perditesimit automatik. Te dyja dritaret treguan 2 vende.
- Ruajtjen e kontrollova duke e rilexuar gjendjen nga serveri.

### Prova 2: Pranimi perditeson te dy ekranet
- Hapat dhe vendet para/pas: Shoferi e pranoi kerkesen. Ne proven me 2 vende, numri ndryshoi nga 2 ne 1.
- Perseritja dhe prova me 0 vende: E perserita pranimin dhe numri nuk u ul perseri. Ne nje prove tjeter qe filloi me 1 vend, pas pranimit mbeti 0 dhe nuk u be numer negativ.
- Cfare pashe: Udhetari dhe shoferi pane statusin e pranuar dhe te njejtin numer vendesh. Te udhetimi Fushe Kosove - AAB (ID 2), ekrani tregoi kerkesen e pranuar dhe 0 vende.

### Prova 3: Nderprerja dhe rilidhja
- Hapat: Perdora nje udhetim tjeter fiktiv. E vendosa vetem dritaren e udhetarit Offline te Network, ndersa shoferin e lash online.
- Gjate nderprerjes: Udhetari e mbajti pamjen e fundit, shfaqi njoftimin "Po rilidhemi" dhe bllokoi veprimet.
- Pas rilidhjes: Kur e ktheva ne No throttling, gjendja u lexua prape nga serveri pa Refresh manual dhe u shfaq pranimi bashke me numrin e ri te vendeve.
- Ne proven e pare pas rilidhjes doli gabim sepse mungonte tabela ne databaze. Pasi e krijova skemen Java 10 ne databazen qe perdor aplikacioni, leximi i kerkesave kaloi me pergjigje 200.

## Ku gjendet puna
Pjeset kryesore jane te `aplikacioni/src/lib/kerkesat.ts` dhe `aplikacioni/src/app/api/udhetimet/[id]/kerkesat/route.ts`. Nderfaqja dhe perditesimi automatik jane te `aplikacioni/src/components/KerkesaUdhetimiLive.tsx`. Skema eshte te `aplikacioni/schema-java10.sql`, ndersa faqet e udhetimit e perdorin kete komponent. Nuk kam link publik per demonstrim.

## Prova me kolegun
Nuk bera nje prove te vecante me koleg. I provova dy rolet me dy llogari testuese ne sesione te ndara. Para pranimit prisja qe udhetari ta shihte kerkesen ne pritje dhe qe shoferi te mund ta pranonte vetem nje here. Rezultati ishte si pritej.

## Cfare mbetet per permiresim
Kur refuzohet leja e vendndodhjes, duhet shkruar vendtakimi manualisht. Kjo nuk e pengon kerkesen per udhetim, por mund ta bej me te qarte kete udhezim ne faqe. Build-i dhe TypeScript kaluan; ESLint per skedaret e ndryshuar kaloi. ESLint i plote ende tregon nje gabim te vjeter te `aplikacioni/src/app/page.tsx` per nje link te faqja kryesore.

## Ndihma nga AI (Artificial Intelligence - inteligjence artificiale)
Mora ndihme nga AI per skemen, API-ne dhe perditesimin automatik te faqeve. Pastaj i provova me dy llogari, kontrollova kerkesen, pranimin, numrin e vendeve dhe rilidhjen pas nderprerjes se internetit.

## Pas dorezimit te pare - perditeso me vone
Pas dorezimit, shto linkun e Issue-t, commit-in e kontrolluar dhe cfare kaloi ose duhet korrigjuar. Kontrolli teknik 2/2 nuk provon vete funksionimin e aplikacionit.
