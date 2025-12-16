/**
 * Sound event handlers for Calliope mini V1
 * Emulates the V2/V3 sound event API using software polling
 */

namespace sound {
    
    // Event IDs (unique numbers for our custom events)
    const SOUND_EVENT_SOURCE = 9000;
    const SOUND_EVENT_LOUD = 1;
    const SOUND_EVENT_QUIET = 2;
    
    // State variables
    let threshold = 128;
    let wasLoud = false;
    let isInitialized = false;
    
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
        threshold = Math.clamp(0, 255, value);
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
        initSoundMonitoring();
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
        initSoundMonitoring();
    }
    
    /**
     * Initialize the background sound monitoring
     * Only runs once and only when handlers are registered
     */
    function initSoundMonitoring(): void {
        if (isInitialized) return;
        isInitialized = true;
        
        control.runInParallel(function() {
            while (true) {
                let currentLevel = input.soundLevel();
                
                // Simple state machine - no hysteresis
                if (currentLevel > threshold && !wasLoud) {
                    // Just became loud
                    wasLoud = true;
                    control.raiseEvent(SOUND_EVENT_SOURCE, SOUND_EVENT_LOUD);
                } 
                else if (currentLevel <= threshold && wasLoud) {
                    // Just became quiet
                    wasLoud = false;
                    control.raiseEvent(SOUND_EVENT_SOURCE, SOUND_EVENT_QUIET);
                }
                
                // Poll every 100ms (10 times per second)
                basic.pause(100);
            }
        });
    }
}
