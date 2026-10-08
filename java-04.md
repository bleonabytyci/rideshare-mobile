# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfare ndertova

Lidha aplikacionin RideShare me databazen Neon PostgreSQL. Lista e udhetimeve lexohet nga databaza dhe shfaqet ne faqen kryesore. Detajet e secilit udhetim lexohen gjithashtu nga Neon sipas ID-se.

## Provat qe bera

### Prova 1: Ndryshimi ne databaze shfaqet ne aplikacion

Ndryshova oren e udhetimit me ID 2 nga 08:15 ne 08:25 ne SQL Editor.

Pas rifreskimit, lista tregoi oren 08:25. Edhe te detajet e udhetimit me ID 2 u shfaq ora 08:25.

Pastaj e ktheva oren ne 08:15 dhe pas rifreskimit u shfaq perseri 08:15.

### Prova 2: Lista bosh dhe rikthimi

Shtova perkohesisht `WHERE false` vetem te pyetja e `lexoUdhetimet`.

Lista nuk shfaqi udhetime dhe u shfaq mesazhi se nuk ka udhetime per momentin.

Pasi hoqa `WHERE false` dhe rifreskova faqen, u kthyen tri kartat e udhetimeve.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Ndryshova perkohesisht emrin `DATABASE_URL` ne `.env.local` dhe rinisa serverin. Aplikacioni shfaqi mesazh se nuk u lidh me databazen.

Pastaj e riktheva emrin `DATABASE_URL`, rinisa serverin dhe aplikacioni punoi perseri.

Skedari `.env.local` nuk perfshihet ne repository dhe nuk duhet te dergohet ne GitHub, sepse permban kredencialet e databazes.

## Ku gjendet puna

Skedari `schema.sql` gjendet prane README, jashte dosjes `aplikacioni/`.

Skedaret kryesore qe ndryshova jane:

* `src/lib/db.ts`
* `src/lib/udhetimet.ts`
* `src/app/page.tsx`
* faqet e detajeve te udhetimit

Repository:

https://github.com/bleonabytyci/rideshare-mobile

## Çfare mbetet per permiresim

Nje kufizim eshte se kerkesa "Ne pritje" mbetet simulim dhe nuk ka rezervim real ne databaze.

Hapi im i ardhshem eshte te permiresoj ruajtjen dhe menaxhimin e kerkesave te pasagjereve.

## Ndihma nga AI (Artificial Intelligence – inteligjence artificiale)

Perdora AI per te kuptuar lidhjen e aplikacionit me Neon PostgreSQL, per te kontrolluar kodin dhe per te gjetur gabimet gjate lidhjes me databazen.

Kontrollova vete query-t ne Neon, rezultatet e databazes, funksionimin e aplikacionit dhe faktin qe `.env.local` nuk duhet te publikohet ne GitHub.
