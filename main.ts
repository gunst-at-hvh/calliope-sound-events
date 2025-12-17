/**
 * Lärm-Alarm Extension für Calliope mini V1
 */

//% color=#E63022 weight=100 icon="\uf0a1"
namespace laermAlarm {
    let threshold = 128
    let wasLoud = false
    let _started = false
    let _onLoud: (() => void) | null = null
    let _onQuiet: (() => void) | null = null
    
    /**
     * Setzt den Schwellenwert für laut
     */
    //% block="setze Schwellenwert für laut auf %value"
    //% value.min=0 value.max=255
    //% weight=100
    export function setSchwellenwert(value: number): void {
        threshold = value
    }
    
    /**
     * Wenn es laut wird
     */
    //% block="wenn laut"
    //% weight=90
    export function wennLaut(handler: () => void): void {
        _onLoud = handler
        if (!_started) {
            _started = true
            basic.forever(function() {
                let current = input.soundLevel() > threshold
                if (current && !wasLoud) {
                    wasLoud = true
                    if (_onLoud) _onLoud()
                }
                if (!current && wasLoud) {
                    wasLoud = false
                    if (_onQuiet) _onQuiet()
                }
            })
        }
    }
    
    /**
     * Wenn es ruhig wird
     */
    //% block="wenn ruhig"
    //% weight=80
    export function wennRuhig(handler: () => void): void {
        _onQuiet = handler
        if (!_started) {
            _started = true
            basic.forever(function() {
                let current = input.soundLevel() > threshold
                if (current && !wasLoud) {
                    wasLoud = true
                    if (_onLoud) _onLoud()
                }
                if (!current && wasLoud) {
                    wasLoud = false
                    if (_onQuiet) _onQuiet()
                }
            })
        }
    }
}
