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

## Prova me nje hyrje te re

- Hyrja qe provova: Shkrova "Biblioteka", e konfirmova dhe pastaj shkrova "Parkingu" pa e konfirmuar.
- Parashikimi im para klikimit: Vendtakimi i konfirmuar duhet te mbetet "Biblioteka" derisa te konfirmohet nje vendtakim i ri.
- Cfare pashe realisht: Vendtakimi i konfirmuar mbeti "Biblioteka". Pasi klikova butonin "Konfirmo vendtakimin" per "Parkingu", vendtakimi i konfirmuar ndryshoi ne "Parkingu".
- Skedari dhe funksioni qe e shpjegojne: `Vendndodhja.tsx` — funksioni i konfirmimit te vendtakimit.
- Cfare kuptova ose korrigjova: Kuptova dallimin mes tekstit qe shkruhet ne fushe dhe vendtakimit qe konfirmohet.