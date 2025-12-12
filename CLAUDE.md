# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**IjsJournal** is een "Untappd voor ijs" app - een PWA waarmee je ijssmaken kunt vastleggen die je bij welke ijszaak hebt gegeten en hoe je ze vond.

**Huidige status:** Prototype/concept (enkele React component)

**Tech Stack (gepland):**
- React (Vite)
- localStorage voor data persistence
- PWA capabilities (planned)

**Target Platform:** Mobile-first, responsive design

---

## ⛔ STOP - VOORDAT JE CODE SCHRIJFT

**Deze checklist is VERPLICHT bij elke feature/wijziging:**

1. **Feature branch** - NOOIT direct op main werken
   ```bash
   git checkout -b feat/feature-naam
   ```

2. **Design principles lezen** - Bij UI/UX wijzigingen
   ```
   ~/Projecten/_agents/_knowledge/design/design-principles.md
   ```

3. **Lokaal testen** - `npm run dev` en IN DE BROWSER testen

4. **PR maken** - Niet direct naar main pushen

---

## Features (uit prototype)

- **Check-ins**: Log je ijsbezoek met datum, ijszaak, smaken, rating en notities
- **IJszaken beheer**: Voeg ijszaken toe met naam en stad
- **Smaken**: 16 voorgedefinieerde smaken + eigen smaken toevoegen
- **Ratings**: 1-5 ijsbolletjes rating systeem
- **Vegan tag**: Markeer vegan ijsjes
- **Wishlist**: Smaken die je nog wilt proberen
- **Badges**: 8 badges om te verdienen
- **Statistieken**: Aantal check-ins, bezochte zaken, geprobeerde smaken

---

## Badges Systeem

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

---

## Development Commands

### Setup & Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run linting
npm run lint

# Run tests
npm run test
```

---

## Data Structuur

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

---

## Mogelijke Uitbreidingen

- [ ] Foto's bij check-ins
- [ ] Kaartweergave van bezochte ijszaken
- [ ] Export naar JSON/CSV
- [ ] Delen op social media
- [ ] Seizoens-smaken tracking
- [ ] Prijs per bol bijhouden
- [ ] Meerdere gebruikers/sync
- [ ] PWA voor offline gebruik

---

## Project Bestanden

```
iscream/
├── IjsJournal.jsx     # Prototype React component (Claude artifact)
├── README.md          # Project beschrijving
├── CLAUDE.md          # Dit bestand
├── LEARNINGS.md       # Project learnings
└── (toekomstig)
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   └── utils/
    ├── public/
    └── package.json
```

---

## Design Richtlijnen

De app gebruikt een **warm, speels kleurenpalet**:

```css
/* Gradient achtergrond */
background: linear-gradient(180deg, #fef6f9, #fdf4eb, #f0fafa);

/* Primary gradient (roze/oranje) */
--gradient-primary: linear-gradient(135deg, #FFB5C5, #FFC09F);

/* Accent kleuren */
--accent-pink: #FFB5C5;
--accent-orange: #FFC09F;
--accent-teal: #A0E7E5;
--accent-rose: #FF8BA7;

/* Soft tag styling */
--tag-bg: #FFE5EC;
--tag-text: #E8A4B8;
```

### UI Principes
- Ronde hoeken (16px cards, 20px buttons)
- Zachte schaduwen
- IJsbolletjes (🍨) als rating indicator
- Speelse emoji's voor badges

---

## Browser Compatibility

**Target:** Moderne browsers met localStorage + PWA support

**Minimum:**
- Safari 14+ (iOS)
- Chrome 90+
- Firefox 88+
- Edge 90+

---

**Last Updated:** December 2025
**Project Phase:** Prototype/Concept
**Primary Developer:** @mdubbelm
