# Know Before You Go

En React Native-app udviklet som en del af godkendelsesopgave 1 og 2 i faget Innovation og Ny Teknologi på CBS.
Appen hjælper studerende med at finde, dele og gemme erfaringer om udvekslingsdestinationer verden over.

## Funktioner
Dynamisk landeliste
Landene hentes automatisk via restcountries.com og sorteres efter kontinent.

Review-system
Brugeren kan skrive, redigere og slette egne anmeldelser af et land eller universitet.
Anmeldelser gemmes lokalt via AsyncStorage og bevares, selvom appen lukkes.
Der kræves minimum 10 tegn pr. review.
To separate ratings: et for landet og et for universitetet.

Mine anmeldelser (My Reviews)
Viser de anmeldelser, som brugeren selv har oprettet.

Favorites
Brugeren kan gemme sine favoritlande og se dem senere (planlagt integration med login-profil).

Login og Signup
Brugere kan oprette sig og logge ind. Brugerdata gemmes lokalt via AsyncStorage.

Bottom navigation bar
Giver hurtig adgang til Forside, Kontinenter, Reviews og Rejsevejledninger.

Rejsevejledninger (Udenrigsministeriet)
Søg og se officielle rejsevejledninger hentet direkte fra um.dk.
Automatisk søgning på land eller ISO-kode (fx DK / DNK).
Fallback til Google-søgning, hvis et land ikke findes.

Global stylefil
Ensartet design med farver, knapper og tekststile defineret i styles.js.

## Demo
Link til demovideo: https://files.fm/u/3zpqwb7xkw

## Udviklet af
Elisabeth – Review-system, API-integration (restcountries), Async Storage for Reviews

Zainab – Rejsevejledninger (UM API’er), søgefunktion

Maliha – Login, Signup, My Reviews

Seynab – AsyncStorage for login, Favorites-side,  bottom navigation

## Installation
```bash
git clone https://github.com/Nooja1012/innovation.git
cd innovation
cd øvelse 1/my-app
npm install
npm install @react-navigation/native @react-navigation/native-stack
expo install react-native-screens react-native-safe-area-context
npx expo start


