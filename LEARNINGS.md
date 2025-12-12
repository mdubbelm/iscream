# LEARNINGS.md

Dit bestand documenteert learnings, opgeloste problemen en belangrijke beslissingen voor IjsJournal.

## Hoe te gebruiken

Voeg een learning toe wanneer:
- Je een lastig probleem oplost (>30 min debugging)
- Je een browser-specifiek issue ontdekt
- Je een architectuurbeslissing maakt
- Je een herbruikbaar pattern ontdekt
- Iets onverwacht gedrag vertoont

## Format

```markdown
### [YYYY-MM-DD] Korte titel

**Context**: Wat was de situatie?
**Probleem**: Wat ging er mis / wat was onduidelijk?
**Oplossing**: Hoe is het opgelost?
**Waarom**: Waarom werkt deze oplossing?
**Tags**: #tag1 #tag2 #tag3
```

---

## Learnings

<!-- Voeg nieuwe learnings toe onder deze lijn, nieuwste bovenaan -->

### [2024-12-12] Project setup als prototype

**Context**: Project gestart met een Claude artifact (single React component).

**Probleem**: Component is ontworpen voor Claude artifacts met `window.storage` API, niet voor standalone app.

**Oplossing**: Component heeft fallback naar localStorage:
```javascript
if (window.storage) {
  // Claude artifact storage
  const r = await window.storage.get('ijsjournal');
} else {
  // Standalone app
  const stored = localStorage.getItem('ijsjournal');
}
```

**Waarom**: Dit maakt het prototype zowel in Claude artifacts als standalone bruikbaar.

**Tags**: #architecture #storage #prototype

---

## Index per Tag

<!-- Update deze index periodiek -->

### Architecture
- [2024-12-12] Project setup als prototype

### Storage
- [2024-12-12] Project setup als prototype

### Browser Issues
- (nog geen learnings)

### Performance
- (nog geen learnings)

### PWA
- (nog geen learnings)

### Deployment
- (nog geen learnings)
