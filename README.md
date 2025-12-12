# IJsJournal

Een "Untappd voor IJs" app - houd bij welke smaken je bij welke IJszaak hebt gegeten en hoe je ze vond.

**Live app:** https://mdubbelm.github.io/iscream

## Features

- **Check-ins**: Log je IJsbezoek met datum, IJszaak, smaken, rating en notities
- **IJszaken beheer**: Voeg IJszaken toe met naam en stad
- **Smaken**: 16 voorgedefinieerde smaken + eigen smaken toevoegen
- **Ratings**: 1-5 IJsbolletjes rating systeem
- **Vegan tag**: Markeer vegan IJsjes
- **Wishlist**: Smaken die je nog wilt proberen
- **Badges**: 8 badges om te verdienen
- **Statistieken**: Aantal check-ins, bezochte zaken, geprobeerde smaken

## Badges

| Badge | Naam | Voorwaarde |
|-------|------|------------|
| 🍦 | Eerste Lik | 1 check-in |
| 🎯 | Hattrick | 3 check-ins |
| 💕 | Liefhebber | 10 check-ins |
| ☀️ | Zomerliefde | 20 check-ins |
| 🗺️ | Ontdekker | 5 IJszaken bezocht |
| 👅 | Proever | 10 smaken geprobeerd |
| 🌱 | Plantaardig | 5 vegan IJsjes |
| ⭐ | Superfan | Geef een 5-ster rating |

## Installeren als app

### Android
1. Open https://mdubbelm.github.io/iscream in Chrome
2. Tik op het menu (drie puntjes)
3. Kies "Toevoegen aan startscherm"

### iOS
1. Open https://mdubbelm.github.io/iscream in Safari
2. Tik op het deel-icoon
3. Kies "Zet op beginscherm"

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 19
- Vite 7
- PWA (vite-plugin-pwa)
- localStorage voor data opslag

## Licentie

MIT
