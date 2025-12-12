# IjsJournal 🍦

Een "Untappd voor ijs" app - houd bij welke smaken je bij welke ijszaak hebt gegeten en hoe je ze vond.

## Features

- ✅ **Check-ins**: Log je ijsbezoek met datum, ijszaak, smaken, rating en notities
- ✅ **IJszaken beheer**: Voeg ijszaken toe met naam en stad
- ✅ **Smaken**: 16 voorgedefinieerde smaken + eigen smaken toevoegen
- ✅ **Ratings**: 1-5 ijsbolletjes rating systeem
- ✅ **Vegan tag**: Markeer vegan ijsjes
- ✅ **Wishlist**: Smaken die je nog wilt proberen
- ✅ **Badges**: 8 badges om te verdienen
- ✅ **Statistieken**: Aantal check-ins, bezochte zaken, geprobeerde smaken
- ✅ **Verwijder beveiliging**: Bevestigingsdialoog bij verwijderen

## Badges

| Badge | Naam | Voorwaarde |
|-------|------|------------|
| 🍦 | Eerste Lik | 1 check-in |
| 🎯 | Hattrick | 3 check-ins |
| 💕 | Liefhebber | 10 check-ins |
| ☀️ | Zomerliefde | 20 check-ins |
| 🗺️ | Ontdekker | 5 ijszaken bezocht |
| 👅 | Proever | 10 smaken geprobeerd |
| 🌱 | Plantaardig | 5 vegan ijsjes |
| ⭐ | Superfan | Geef een 5-ster rating |

## Technische details

- **Framework**: React (single component)
- **Styling**: Inline styles (geen externe CSS dependencies)
- **Storage**: localStorage (of window.storage voor Claude artifacts)
- **State management**: React useState/useEffect

## Gebruik in een nieuw project

### Optie 1: Create React App

```bash
npx create-react-app ijsjournal
cd ijsjournal
# Vervang src/App.js met IjsJournal.jsx content
npm start
```

### Optie 2: Vite

```bash
npm create vite@latest ijsjournal -- --template react
cd ijsjournal
# Vervang src/App.jsx met IjsJournal.jsx content
npm install
npm run dev
```

### Optie 3: Next.js

```bash
npx create-next-app@latest ijsjournal
cd ijsjournal
# Maak pages/index.js of app/page.js met IjsJournal component
npm run dev
```

## Data structuur

```javascript
{
  shops: [
    { id: "123", nm: "Luciano", ct: "Amsterdam" }
  ],
  checkins: [
    { 
      id: "456", 
      sid: "123",        // shop id
      snm: "Luciano",    // shop name (denormalized)
      fl: ["Pistache", "Stracciatella"],  // flavors
      rt: 5,             // rating 1-5
      nt: "Heerlijk!",   // notes
      vg: false,         // vegan
      dt: "2024-07-15"   // date
    }
  ],
  wish: ["Mango", "Kokos"],  // wishlist flavors
  xfl: ["Bacio", "Fior di latte"]  // custom flavors
}
```

## Mogelijke uitbreidingen

- [ ] Foto's bij check-ins
- [ ] Kaartweergave van bezochte ijszaken
- [ ] Export naar JSON/CSV
- [ ] Delen op social media
- [ ] Seizoens-smaken tracking
- [ ] Prijs per bol bijhouden
- [ ] Meerdere gebruikers/sync
- [ ] PWA voor offline gebruik

## Licentie

MIT - Vrij te gebruiken en aan te passen
