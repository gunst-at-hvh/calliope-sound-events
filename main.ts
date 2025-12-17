/**
 * Sound-Events Extension für Lärm-Alarm Tutorial
 * Calliope mini V1 - automatischer Hintergrund-Loop
 */
namespace sound {
    let threshold = 128
    let wasLoud = false
    let _started = false
    
    let _onLoud: (() => void) | null = null
    let _onQuiet: (() => void) | null = null
    
    /**
     * Setzt den Schwellenwert für laut
     * @param value the sound level threshold (0-255), eg: 128
     */
    //% blockId=sound_set_threshold
    //% block="setze Schwellenwert für laut auf %value"
    //% blockNamespace="input"
    //% value.min=0 value.max=255
    //% weight=100
    export function setSoundThreshold(value: number): void {
        threshold = value
    }
    
    /**
     * Event: wenn Lautstärke über Schwelle steigt
     * @param handler code to run when sound is loud
     */
    //% blockId=sound_on_loud
    //% block="wenn laut"
    //% blockNamespace="input"
    //% weight=90
    export function onLoud(handler: () => void): void {
        _onLoud = handler
        startMonitoring()
    }
    
    /**
     * Event: wenn Lautstärke unter Schwelle fällt
     * @param handler code to run when sound is quiet
     */
    //% blockId=sound_on_quiet
    //% block="wenn ruhig"
    //% blockNamespace="input"
    //% weight=89
    export function onQuiet(handler: () => void): void {
        _onQuiet = handler
        startMonitoring()
    }
    
    /**
     * Prüft die Lautstärke (intern - wird automatisch gestartet)
     */
    function checkSound(): void {
        let current = input.soundLevel() > threshold
        
        if (current && !wasLoud) {
            wasLoud = true
            if (_onLoud) _onLoud()
        } else if (!current && wasLoud) {
            wasLoud = false
            if (_onQuiet) _onQuiet()
        }
    }
    
    /**
     * Startet automatischen Hintergrund-Loop (nur einmal)
     */
    function startMonitoring(): void {
        if (_started) return
        _started = true
        
        basic.forever(function() {
            checkSound()
        })
    }
}
