# RideShare — Java 8

## Çfarë ndërtova

Këtë javë shtova mundësinë që përdoruesi të zgjedhë pikën e nisjes. Ai mund ta përdorë vendndodhjen e telefonit ose ta shkruajë vendtakimin manualisht.

## Provat që bëra

### Prova 1: Leja nuk kërkohet menjëherë pasi hapet faqja

- Hapat: Hapa faqen e detajeve të udhëtimit `/udhetimi/4` pa klikuar butonin e vendndodhjes.
- Rezultati i pritur: Shfletuesi nuk duhet të kërkojë leje pa veprimin e përdoruesit.
- Çfarë ndodhi: Faqja u hap pa kërkuar leje. Kërkesa u shfaq vetëm pasi klikova butonin.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin

- Hapat: Klikova butonin e vendndodhjes dhe refuzova lejen në shfletues.
- Rezultati i pritur: Përdoruesi duhet të ketë mundësi të shkruajë vendtakimin manualisht.
- Çfarë ndodhi: U shfaq mesazhi se leja u refuzua dhe se mund ta shkruante vendtakimin manualisht.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale

- Hapat: Kontrollova testimin e vendndodhjes dhe të dhënat që do të përfshihen në raport.
- Rezultati i pritur: Në GitHub nuk duhet të publikohen adresa ose koordinata reale.
- Çfarë ndodhi: Në këtë raport nuk përfshiva adresa ose koordinata reale. Para publikimit do të kontrolloj edhe dëshmitë.

## Ku gjendet puna

- `aplikacioni/src/components/Vendndodhja.tsx`
- `aplikacioni/src/app/udhetimi/[id]/page.tsx`
- `java-08.md`

Demonstrimi: Testuar lokalisht në `http://localhost:3000/udhetimi/4`.

## Çfarë mbetet për përmirësim

Vendtakimi manual shfaqet në faqe, por ende nuk ruhet në databazë dhe nuk i dërgohet shoferit. Në një version të ardhshëm mund të shtohet ruajtja dhe dërgimi i këtij informacioni.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

U përdorën mjete AI për sqarimin e funksioneve të vendndodhjes dhe organizimin e kodit. Rezultati u kontrollua duke testuar aplikacionin dhe duke ekzekutuar komandat e kontrollit.

## Prova me një hyrje të re

- Hyrja që proova: Tekst me vetëm hapësira.
- Parashikimi im para klikimit: Pretendoja që sistemi të mos e pranonte tekstin si vendtakim.
- Çfarë ndodhi realisht: Pas testimit, sistemi nuk e pranonte tekstin e zbrazët dhe kërkonte një vlerë të saktë. Vendtakimi u konfirmua vetëm kur fusha përmbante tekst të vlefshëm.
- Skedari dhe funksioni që e shpjegojnë: `Vendndodhja.tsx` — funksioni `perdorVendndodhjen` dhe fusha `vendtakimi`.
- Çfarë kuptova ose korrigjova: Kuptova se duhet të kontrollohet edhe teksti që përdoruesi shkruan, jo vetëm nëse fusha është e mbushur.