# RideShare — Java 5: Hyrja dhe lejet

## Cfare ndertova

Ne kete pjese te RideShare implementova hyrjen me GitHub dhe kontrollin e lejeve te perdoruesve. Identiteti tregon se kush eshte perdoruesi i kycur, roli percakton nese eshte shofer apo udhetar, ndersa pronesia percakton se cilin udhetim mund ta ndryshoje shoferi.

Qellimi ishte qe vetem perdoruesit e autorizuar te mund te ndryshojne oren e udhetimit qe u takon.

## Provat qe bera

### Prova 1: Hyrja me GitHub

U kyca ne aplikacion me GitHub dhe kontrollova panelin tim. Paneli shfaqi emrin e perdoruesit, rolin dhe ID-ne GitHub. Gjithashtu kontrollova nese paneli hapej pas rifreskimit te faqes.

### Prova 2: Ndryshimi i ores se udhetimit

Provova ta ndryshoja oren e udhetimit me ID 2 nga 08:15 ne 08:25. Pas proves, e riktheva oren ne 08:15 ne SQL Editor te Neon.

### Prova 3: Kontrolli i lejeve

Kodi kontrollon rolin e perdoruesit dhe pronesine e udhetimit ne server para se te ruaje ndryshimin. Vetem nje shofer i autorizuar mund ta ndryshoje udhetimin qe i eshte caktuar. Nese kontrolli deshton, ndryshimi refuzohet.

### Prova 4: Gjendja e databazes

Kontrollova oren ne SQL Editor dhe e riktheva ne 08:15 pas proves, qe te dhenat te mbeteshin ne gjendjen fillestare.

## Ku gjendet puna

Repository: https://github.com/bleonabytyci/rideshare-mobile

Raporti: `java-05.md`, ne dosjen kryesore te projektit, jashte `aplikacioni/`.

Aplikacioni online: https://rideshare-mobile-psi.vercel.app

## Cfare mbetet per permiresim

Kerkesa per vend mbetet simulim dhe nuk ruhet ende ne databaze. Ne nje version te ardhshem do te shtoja ruajtjen e kerkesave dhe mundesine qe shoferi t'i shikoje, pranoje ose refuzoje ato.

## Ndihma nga AI (Artificial Intelligence – inteligjence artificiale)

Perdora AI per te kuptuar hyrjen me GitHub, rolet dhe kontrollin e lejeve. AI me ndihmoi me organizimin e kodit dhe gjetjen e gabimeve. Me pas, i provova ndryshimet ne aplikacion dhe kontrollova oren ne databaze.
