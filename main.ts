/**
 * Sound event handlers for Calliope mini V1
 * Minimal implementation
 */

namespace sound {
    
    const SOUND_EVENT_SOURCE = 9000;
    const SOUND_EVENT_LOUD = 1;
    const SOUND_EVENT_QUIET = 2;
    
    let threshold = 128;
    let wasLoud = false;
    let started = false;
    
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
    export function onLoud(handler: () => void): void {
        control.onEvent(SOUND_EVENT_SOURCE, SOUND_EVENT_LOUD, handler);
        startMonitoring();
    }
    
    /**
     * Run code when it becomes quiet again
     * @param handler code to run when sound is quiet
     */
    //% blockId=sound_on_quiet
    //% block="wenn ruhig"
    //% blockNamespace="input"
    //% weight=89
    export function onQuiet(handler: () => void): void {
        control.onEvent(SOUND_EVENT_SOURCE, SOUND_EVENT_QUIET, handler);
        startMonitoring();
    }
    
    function startMonitoring(): void {
        if (started) return;
        started = true;
        
        control.inBackground(function() {
            while (true) {
                let level = input.soundLevel();
                
                if (level > threshold && !wasLoud) {
                    wasLoud = true;
                    control.raiseEvent(SOUND_EVENT_SOURCE, SOUND_EVENT_LOUD);
                } 
                else if (level <= threshold && wasLoud) {
                    wasLoud = false;
                    control.raiseEvent(SOUND_EVENT_SOURCE, SOUND_EVENT_QUIET);
                }
                
                basic.pause(200);
            }
        });
    }
}
