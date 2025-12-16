# Sound Events für Calliope mini V1

Diese Extension bietet Sound-Event-Handler für den Calliope mini V1 mit Mikrofon-Extension.

## Beschreibung

Der Calliope mini V2 und V3 haben eingebaute Sound-Event-Handler (`input.onSound()`). Diese Extension emuliert diese Funktionalität für den V1 in Software.

## Features

- ✅ Event-Handler für "laut" und "ruhig"
- ✅ Einstellbarer Schwellenwert
- ✅ Hysterese gegen Flackern
- ✅ Läuft im Hintergrund (kein `dauerhaft` Block nötig)

## Verwendung

### Schwellenwert setzen

```blocks
sound.setSoundThreshold(128)
```

Setze den Schwellenwert, ab dem ein Geräusch als "laut" erkannt wird.
- Werte: 0-255
- Standard: 128

### Event: Wenn laut

```blocks
sound.onLoud(function () {
    basic.showIcon(IconNames.Sad)
    basic.setLedColor(0xff0000)
})
```

Wird ausgelöst, wenn die Lautstärke über den Schwellenwert steigt.

### Event: Wenn ruhig

```blocks
sound.onQuiet(function () {
    basic.clearScreen()
    basic.turnRgbLedOff()
})
```

Wird ausgelöst, wenn die Lautstärke unter den Schwellenwert fällt.

## Vollständiges Beispiel

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

## Technische Details

### Hysterese

Die Extension verwendet eine Hysterese von ±10, um Flackern zu vermeiden:
- **Laut-Event:** Wird ausgelöst bei `soundLevel > threshold`
- **Ruhig-Event:** Wird ausgelöst bei `soundLevel < threshold - 10`

### Polling-Intervall

Die Extension prüft die Lautstärke alle 50ms (20 Mal pro Sekunde).

### CPU-Last

Die Extension läuft in einem Hintergrund-Thread und hat minimale CPU-Last.

## Hardware-Anforderungen

- Calliope mini V1 (1.0 oder 1.3)
- Mikrofon-Extension (HAT oder Grove)
- MakeCode Extension "microphone" muss geladen sein

## Installation

### In MakeCode verwenden:

1. Öffne dein Projekt in https://makecode.calliope.cc
2. Klicke auf **Erweiterungen**
3. Suche nach der GitHub-URL dieser Extension
4. Klicke auf **Importieren**

### Als GitHub Extension:

Verwende diese URL in MakeCode:
```
https://github.com/DEIN-USERNAME/calliope-sound-events
```

## Lizenz

MIT

## Unterstützte Ziele

- Calliope mini

## Metadata

- **Version:** 1.0.0
- **Autor:** Mo (Hermann-von-Helmholtz-Schule Berlin-Neukölln)
- **Namespace:** sound
