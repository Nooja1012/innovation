# Know Before You Go

En React Native-app udviklet som en del af godkendelsesopgave 1 i faget **Innovation og Ny Teknologi**.  
Appen hjælper danske studerende med at finde og dele erfaringer om udvekslingsdestinationer.

## Funktioner
- Vælg **kontinent → land →** læs eller opret **reviews**
- Tilføj **nye lande**, hvis de ikke findes på listen
- Opret reviews med **titel, tekst og rating (1–5)**
- Navigation mellem tre skærme (views) via **React Navigation**
- **Global stylefil** 


## Installation
```bash
git clone https://github.com/Nooja1012/innovation.git
cd innovation
npm install
npx expo start

## Afhængigheder
Projektet benytter følgende libraries:
- [@react-navigation/native](https://reactnavigation.org/)
- [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator)

Installeres med:
```bash
npm install @react-navigation/native @react-navigation/native-stack
expo install react-native-screens react-native-safe-area-context
