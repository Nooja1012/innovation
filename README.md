# Know Before You Go

En React Native-app udviklet på baggrund af godkendelsesopgave 1, i faget **Innovation og Ny Teknologi**, som der er blevet bygget videre på til godkendelsesopgave 2 i faget.   

Appens funktion er at hjælpe og understøtte studerende med at finde information og dele erfaring i relation til udvekslingsrejser. 

## Funktioner til GK-2
Appen indeholder en række avancerede funktioner, der understøtter brugerens rejseplanlægning. Landelisten hentes dynamisk via restcountries.com API og organiseres automatisk efter kontinent, hvilket sikrer ajourført data uden manuel opdatering. Et omfattende review-system giver brugeren mulighed for at skrive, redigere og slette anmeldelser af både lande og universiteter, med separate ratings for hver kategori. Alle anmeldelser gemmes lokalt via AsyncStorage og bevares ved app-lukning.

Brugeren har adgang til en personlig side "Mine Reviews", hvor egne reviews kan ses, samt en favorites-funktion til at gemme foretrukne destinationer. Et loginsystem sikrer personliggøring, mens en bottom navigation bar giver intuitiv adgang til appens hovedområder: Forside, Kontinenter, Reviews og Rejsevejledninger.

Rejsevejledningsmodulet integrerer direkte med Udenrigsministeriets database, hvor brugeren kan søge på lande eller ISO-koder med automatisk fallback til Google-søgning ved ugenkendte destinationer. Hele appens design er standardiseret gennem en global stylefil, der sikrer ensartethed i farver, knapper og typografi på tværs af alle komponenter.


## Udviklerere af funktionaliteter: 
Elisabeth – Review-system, API-integration(restcountries), Async Storage for Reviews

Zainab – Rejsevejledninger (UM API’er), søgefunktion

Maliha – Login, Signup, My Reviews, Profil-button forside 

Seynab – AsyncStorage for login, Favorites-side, bottom navigation


## Installation
```bash
git clone https://github.com/Nooja1012/innovation.git
cd innovation
npm install
npm install @react-navigation/native @react-navigation/native-stack
expo install react-native-screens react-native-safe-area-context
npx expo start

