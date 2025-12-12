# IjsJournal - Project Analyse

*Opgesteld met input van het agent team: Johanna (Product Owner), Brenda (UX Designer), Ingrid (Data Analyst)*

---

## 1. Concurrentieanalyse

### Directe Concurrenten

#### [IceCreamRatings.com](https://icecreamratings.com/)
De grootste ijs-community met 10.000+ ijsjes in hun database.

| Aspect | Beoordeling |
|--------|-------------|
| ✅ Sterke punten | Grote database, community, reviews |
| ❌ Zwakke punten | Geen echte app, geen check-in flow, geen badges |
| 💡 Onze kans | **Mobile-first PWA met gamification** |

#### Geen directe "Untappd voor ijs" app gevonden
Dit is een **blauwe oceaan** - er is geen dominante speler in deze niche!

### Verwante Apps (Inspiratie)

#### [Untappd](https://untappd.com/) (Bier)
| Feature | Untappd | IjsJournal |
|---------|---------|------------|
| Check-ins | ✅ | ✅ |
| Ratings | ✅ 5-sterren | ✅ 5 bolletjes |
| Badges | ✅ Honderden | ⚠️ 8 (basis) |
| Social | ✅ Volgen, feed | ❌ Niet (localStorage) |
| Locaties | ✅ Brouwerijen | ✅ IJszaken |
| Foto's | ✅ | ❌ |
| Wishlist | ❌ | ✅ |

#### [Vivino](https://www.vivino.com/en/app) (Wijn)
| Feature | Vivino | IjsJournal |
|---------|--------|------------|
| Label scannen | ✅ AI | ❌ |
| Community ratings | ✅ 70M users | ❌ |
| Taste profile | ✅ | ❌ |
| Wine cellar | ✅ | ~ (IJszaken) |
| Social feed | ✅ | ❌ |
| Badges | ✅ | ✅ |

#### [HappyCow](https://www.happycow.net/) (Vegan restaurants)
| Feature | HappyCow | IjsJournal |
|---------|----------|------------|
| Locaties | ✅ GPS | ❌ |
| Reviews | ✅ | ✅ (notes) |
| Badges | ✅ | ✅ |
| Punten systeem | ✅ | ❌ |
| Vegan filter | ✅ | ✅ |

---

## 2. Feature Prioritering (Johanna - Product Owner)

### Framework: Impact/Effort Score
```
PRIORITY = (Impact × 2) / Effort
```

### 🔴 Kritiek (Score > 5.0) - Nu doen

#### 1. Export Data Knop
| Metric | Score |
|--------|-------|
| Impact | 7/10 - Users willen hun data kunnen meenemen |
| Effort | 1/5 - Simpele JSON export |
| **Priority** | **14.0** |

**MVP**: JSON download knop in settings
**Later**: CSV export, import functie

#### 2. PWA Install Prompt
| Metric | Score |
|--------|-------|
| Impact | 8/10 - Kritiek voor adoptie |
| Effort | 2/5 - Standaard PWA pattern |
| **Priority** | **8.0** |

**MVP**: Banner bij eerste bezoek met "Zet op beginscherm" instructies

#### 3. Force Update Knop
| Metric | Score |
|--------|-------|
| Impact | 6/10 - Nodig voor bug fixes |
| Effort | 1/5 - Service worker reload |
| **Priority** | **12.0** |

**MVP**: Knop in settings die SW cache cleared en herlaadt

### 🟠 Hoog (3.0-5.0) - Daarna

#### 4. Foto's bij Check-ins
| Metric | Score |
|--------|-------|
| Impact | 8/10 - Visuele herinnering, social sharing |
| Effort | 3/5 - File handling, storage |
| **Priority** | **5.3** |

**MVP**: 1 foto per check-in, localStorage (base64)
**Later**: Meerdere foto's, compressie

#### 5. Meer Badges
| Metric | Score |
|--------|-------|
| Impact | 6/10 - Gamification, retention |
| Effort | 2/5 - Logica toevoegen |
| **Priority** | **6.0** |

**Nieuwe badges ideeën**:
- 🌍 Wereldreiziger: IJsjes in 3 landen
- 🎨 Avonturier: 5 ongewone smaken
- 📅 Trouw: 7 dagen streak
- 🏆 Connoisseur: 50 check-ins
- ❄️ Winterijs: Check-in in december

#### 6. Statistieken Dashboard
| Metric | Score |
|--------|-------|
| Impact | 7/10 - Inzicht, motivatie |
| Effort | 3/5 - Berekeningen, UI |
| **Priority** | **4.7** |

**MVP**: Favoriete smaak, favoriete zaak, gemiddelde rating

### 🟡 Gemiddeld (1.5-3.0) - Later

#### 7. Supabase Backend
| Metric | Score |
|--------|-------|
| Impact | 8/10 - Sync, social, backup |
| Effort | 4/5 - Auth, database, RLS |
| **Priority** | **4.0** |

**Vraag eerst**: Hoeveel gebruikers verwacht je? Is sync echt nodig?
**Alternatief**: Export/import JSON voor backup

#### 8. Kaartweergave
| Metric | Score |
|--------|-------|
| Impact | 6/10 - Leuk, niet essentieel |
| Effort | 3/5 - Map API, geocoding |
| **Priority** | **4.0** |

**MVP**: Simpele lijst met steden
**Later**: Leaflet kaart met markers

#### 9. Seizoenssmaken
| Metric | Score |
|--------|-------|
| Impact | 5/10 - Niche feature |
| Effort | 2/5 - Extra veld |
| **Priority** | **5.0** |

### 🟢 Laag (< 1.5) - Backlog

#### 10. Social Sharing
| Metric | Score |
|--------|-------|
| Impact | 4/10 - Leuk voor groei |
| Effort | 3/5 - Share API, image gen |
| **Priority** | **2.7** |

#### 11. Prijs per Bol
| Metric | Score |
|--------|-------|
| Impact | 3/10 - Nice to have |
| Effort | 1/5 - Extra veld |
| **Priority** | **6.0** |

---

## 3. UX Analyse (Brenda - UX Designer)

### Huidige User Flow

```
[Home] → Stats + Recent check-ins
    ↓
[➕ Check-in] → Formulier
    ↓
[📖 History] → Alle check-ins
    ↓
[🏪 Shops] → IJszaken beheer
    ↓
[⭐ Wishlist] → Te proberen smaken
    ↓
[🏆 Badges] → Verdiende badges
```

### Verbeterpunten

#### 1. Onboarding Flow (Eerste Bezoek)
**Probleem**: User komt op lege app, weet niet waar te beginnen

**Oplossing**: Install prompt + quick start
```
┌─────────────────────────────┐
│  🍦 Welkom bij IjsJournal!  │
│                             │
│  Voeg deze app toe aan je   │
│  startscherm voor de        │
│  beste ervaring.            │
│                             │
│  [📲 Installeer]  [Later]   │
│                             │
│  ─────────────────────────  │
│                             │
│  Klaar om te beginnen?      │
│                             │
│  [🍨 Eerste check-in!]      │
│                             │
└─────────────────────────────┘
```

**Belangrijk**: Geen modal met overlay! Gebruik inline scherm.

#### 2. Empty States
**Probleem**: Lege statistieken zijn demotiverend

**Oplossing**: Motiverende empty states
```
"Nog geen check-ins!
 🍦 Tijd voor een ijsje?"
```

#### 3. Navigation Optimalisatie
**Huidige**: 6 tabs (Home, +, History, Shops, Wishlist, Badges)

**Voorstel**: Behouden, werkt goed voor deze app
- ✅ Primaire actie (+) is prominent
- ✅ Max 6 tabs is acceptabel
- ✅ Duidelijke iconen

---

## 4. Beslissingen per Feature

### A. Supabase Database: GO of NO-GO?

**Voordelen**:
- ✅ Data backup in cloud
- ✅ Sync tussen devices
- ✅ Social features mogelijk
- ✅ Gratis tier beschikbaar

**Nadelen**:
- ❌ Complexiteit (auth, RLS)
- ❌ Privacy concerns (data in cloud)
- ❌ Meer onderhoud
- ❌ Offline-first wordt lastiger

**Aanbeveling**: ⏸️ DEFER

Start met **export/import JSON**. Dat geeft:
- Backup mogelijkheid
- Device transfer (via email/cloud)
- Simpeler te bouwen
- Privacy-friendly

**Wanneer Supabase overwegen?**
- Als >10 actieve gebruikers sync willen
- Als social features prioriteit worden
- Als je leaderboard wilt

### B. Export Data: ✅ GO

**MVP Scope**:
1. Knop "Exporteer Data" in settings
2. Download `ijsjournal-backup-YYYY-MM-DD.json`
3. Bevat: shops, checkins, wishlist, custom flavors

**Code voorbeeld**:
```javascript
const exportData = () => {
  const data = localStorage.getItem('ijsjournal');
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ijsjournal-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
};
```

### C. Install Prompt: ✅ GO

**Niet als modal!** Gebruik inline banner:

```
┌─────────────────────────────────────────┐
│ 📲 Zet IjsJournal op je startscherm    │
│    voor snelle toegang                  │
│                                         │
│ Android: Menu → Toevoegen aan start     │
│ iPhone: Deel → Zet op beginscherm       │
│                                         │
│ [Begrepen, niet meer tonen]             │
└─────────────────────────────────────────┘
```

**Tonen wanneer**: Eerste 3 bezoeken, daarna niet meer.

### D. Force Update: ✅ GO

**Simpele implementatie**:
```javascript
const forceUpdate = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => reg.unregister());
    });
  }
  caches.keys().then(names => {
    names.forEach(name => caches.delete(name));
  });
  window.location.reload(true);
};
```

---

## 5. Roadmap Voorstel

### Sprint 1: Quick Wins (1-2 uur)
- [ ] Export data knop
- [ ] Force update knop
- [ ] Install instructies banner

### Sprint 2: Polish (2-4 uur)
- [ ] Betere empty states
- [ ] 5 extra badges
- [ ] Statistieken uitbreiden

### Sprint 3: Features (4-8 uur)
- [ ] Foto's bij check-ins
- [ ] Import data functie
- [ ] Seizoenssmaken tag

### Later (optioneel)
- [ ] Supabase integratie
- [ ] Kaartweergave
- [ ] Social sharing

---

## 6. Metrics om te Tracken (Ingrid - Data Analyst)

Zonder Supabase kun je beperkt meten. Suggesties:

### In-app (localStorage)
```javascript
{
  stats: {
    firstVisit: "2024-12-12",
    totalVisits: 15,
    totalCheckins: 8,
    lastActive: "2024-12-15"
  }
}
```

### Handmatige feedback
- Vraag je vriendin om feedback na 1 week
- Wat mist ze? Wat is verwarrend?

### Als je later Supabase toevoegt
- Track: signups, daily active, retention
- Feature usage: welke tabs worden gebruikt?

---

## 7. Samenvatting Aanbevelingen

| Feature | Prioriteit | Actie |
|---------|------------|-------|
| Export data | 🔴 Kritiek | Nu bouwen |
| Install prompt | 🔴 Kritiek | Nu bouwen |
| Force update | 🔴 Kritiek | Nu bouwen |
| Meer badges | 🟠 Hoog | Sprint 2 |
| Foto's | 🟠 Hoog | Sprint 3 |
| Supabase | 🟡 Gemiddeld | Uitstellen |
| Kaart | 🟡 Gemiddeld | Uitstellen |

**Focus voor nu**: Maak de huidige app **solide en deelbaar**. Features toevoegen kan altijd nog.

---

## Bronnen

- [IceCreamRatings.com](https://icecreamratings.com/) - Grootste ijs community
- [Untappd](https://untappd.com/) - Inspiratie voor check-in flow
- [Vivino](https://www.vivino.com/en/app) - Inspiratie voor social features
- [Trophy - Gamification Examples](https://trophy.so/blog/food-drink-gamification-examples) - Gamification patterns

---

*Analyse uitgevoerd: December 2024*
