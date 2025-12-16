/**
 * Sound event handlers for Calliope mini V1
 * Simple implementation without background tasks
 */

namespace sound {
    
    let threshold = 128;
    let loudHandler: () => void = null;
    let quietHandler: () => void = null;
    let wasLoud = false;
    
    /**
     * Set the threshold for loud sounds
     * @param value the sound level threshold (0-255), eg: 128
     */
    //% blockId=sound_set_threshold
    //% block="setze Schwellenwert für laut auf %value"
    //% blockNamespace="input"
    //% value.min=0 value.max=255
    //% weight=100
    export function setSoundThreshold(value: number): void {
        threshold = value;
    }
    
    /**
     * Run code when a loud sound is detected
     * @param handler code to run when sound is loud
     */
    //% blockId=sound_on_loud
    //% block="wenn laut"
    //% blockNamespace="input"
    //% weight=90
    //% draggableParameters="reporter"
    export function onLoud(handler: () => void): void {
        loudHandler = handler;
    }
    
    /**
     * Run code when it becomes quiet again
     * @param handler code to run when sound is quiet
     */
    //% blockId=sound_on_quiet
    //% block="wenn ruhig"
    //% blockNamespace="input"
    //% weight=89
    //% draggableParameters="reporter"
    export function onQuiet(handler: () => void): void {
        quietHandler = handler;
    }
    
    /**
     * Check sound level and trigger events (place in forever loop)
     */
    //% blockId=sound_check
    //% block="prüfe Lautstärke"
    //% blockNamespace="input"
    //% weight=80
    export function checkSound(): void {
        let level = input.soundLevel();
        
        if (level > threshold && !wasLoud) {
            // Became loud
            wasLoud = true;
            if (loudHandler) {
                loudHandler();
            }
        } else if (level <= threshold && wasLoud) {
            // Became quiet
            wasLoud = false;
            if (quietHandler) {
                quietHandler();
            }
        }
    }
}
