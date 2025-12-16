# Anleitung: Extension auf GitHub hochladen

## Schritt 1: GitHub Repository erstellen

1. Gehe zu https://github.com
2. Melde dich an (oder erstelle einen Account)
3. Klicke oben rechts auf **+** → **New repository**
4. Repository-Name: `calliope-sound-events`
5. Description: "Sound event handlers for Calliope mini V1"
6. **Public** auswählen (wichtig für MakeCode!)
7. **NICHT** "Initialize with README" anklicken (haben wir schon!)
8. Klicke **Create repository**

---

## Schritt 2: Dateien hochladen

### Option A: Im Browser (einfach)

1. Auf der Repository-Seite: Klicke **uploading an existing file**
2. Ziehe ALLE Dateien aus dem Ordner in das Fenster:
   - `pxt.json`
   - `main.ts`
   - `README.md`
   - `test.ts`
   - `LICENSE`
   - `.gitignore`
   - Den Ordner `_locales` (mit Unterordner!)
3. Commit message: "Initial commit"
4. Klicke **Commit changes**

### Option B: Mit Git (fortgeschritten)

```bash
cd /pfad/zum/ordner
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/calliope-sound-events.git
git push -u origin main
```

---

## Schritt 3: Extension in MakeCode testen

1. Öffne https://makecode.calliope.cc
2. Erstelle ein **neues Projekt**
3. Klicke auf **Erweiterungen**
4. Füge die GitHub-URL ein:
   ```
   https://github.com/DEIN-USERNAME/calliope-sound-events
   ```
5. Klicke **Importieren**

### Du solltest jetzt sehen:

- Neue Kategorie **"Sound"** in der Toolbox (lila)
- Block: "setze Schwellenwert für laut auf"
- Block: "wenn laut"
- Block: "wenn ruhig"

---

## Schritt 4: Beispielprogramm erstellen

```blocks
sound.setSoundThreshold(128)

sound.onLoud(function () {
    basic.showIcon(IconNames.Sad)
    basic.setLedColor(0xff0000)
})

sound.onQuiet(function () {
    basic.clearScreen()
    basic.turnRgbLedOff()
})
```

### Testen:

1. **Download** auf Calliope V1
2. Klatsche laut → Alarm geht an
3. Warte → Alarm geht aus

---

## Troubleshooting

### "Extension not found"
→ Prüfe ob Repository **Public** ist
→ Prüfe die URL (kein Tippfehler?)

### "Failed to compile"
→ Prüfe `pxt.json` (JSON-Syntax korrekt?)
→ Prüfe `main.ts` (keine Tippfehler?)

### Blöcke sind Englisch statt Deutsch
→ Prüfe ob `_locales/de/sound-events-strings.json` existiert
→ Prüfe Dateinamen (exakt so!)

### Extension erscheint nicht in Toolbox
→ Warte 1-2 Minuten (GitHub braucht Zeit)
→ Aktualisiere die Seite (F5)
→ Lösche Browser-Cache

---

## GitHub-URL für Tutorial verwenden

Sobald die Extension auf GitHub ist, kannst du sie im Tutorial verwenden:

```markdown
```package
microphone
https://github.com/DEIN-USERNAME/calliope-sound-events
```
```

---

## Wichtige Hinweise

⚠️ **Repository MUSS Public sein!** Sonst kann MakeCode nicht darauf zugreifen.

⚠️ **Alle Dateien müssen hochgeladen werden!** Besonders wichtig:
- `pxt.json` (Konfiguration)
- `main.ts` (Code)
- `_locales/de/...` (Übersetzungen)

✅ **Nach dem Upload:** Extension ist sofort verfügbar!

✅ **Updates:** Einfach Dateien auf GitHub ändern → MakeCode aktualisiert automatisch

---

## Support

Bei Problemen:
1. Prüfe die GitHub Actions (falls vorhanden)
2. Schau in die MakeCode Konsole (F12 → Console)
3. Frage im Calliope Forum: https://forum.calliope.cc

---

**Viel Erfolg!** 🚀
