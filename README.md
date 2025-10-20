Know Before You Go
Know Before You Go er en mobilapplikation udviklet til studerende, der overvejer at tage på udveksling. Appen gør det muligt at læse og dele erfaringer fra tidligere udvekslingsophold, finde rejsevejledninger fra Udenrigsministeriet og få praktiske informationer om forskellige lande.
Brugerne kan oprette en profil, skrive anmeldelser, give stjerner, gemme favoritter og navigere via en enkel og intuitiv grænseflade.

Elisabeth:
Tog udgangspunkt i GK1-projektet
Reviderede reviewsiden
Implementerede gem, rediger og slet funktion for anmeldelser (Async Storage)
Tilføjede krav om min. 10 tegn og stjernemarkering for land/universitet
Lavede landeliste via API fra restcountries.com
Udviklede forside og kontinentvælger med søgefunktion

Zainab:
Udviklede rejsevejledningssiden
Oprettede API-endpoints til restcountries.com og um.dk
Implementerede søgefunktion koblet til Udenrigsministeriets data
Inkluderede understøttelse af IOS-landekoder (fx DK/DNK)

Seynab:
Opsatte Async Storage til login og signup
Udviklede favoritsiden til gemte destinationer
Lavede bottom navigation bar for nem navigation

Maliha:
Udviklede login- og signup-funktioner
Lavede “Mine reviews”-side til redigering og sletning
Oprettede profilsiden med adgang til reviews og favoritter

guide: 
git clone https://github.com/Nooja1012/innovation.git
Branch Final 
cd innovation
npm install
npm install @react-navigation/native @react-navigation/native-stack
expo install react-native-screens react-native-safe-area-context
npx expo start

Demo video: 
https://youtu.be/cYpcW_jHSbU?si=NGxLvPwdKa2GL4W5

