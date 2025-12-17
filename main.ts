/**
 * Pseudo-Events für Lautstärke
 * Calliope mini V1 kompatibel
 */

namespace input {

    let wasLoud = false

    /**
     * Wird ausgelöst, wenn die Lautstärke über die Schwelle steigt
     */
    //% block="wenn Lautstärke über %threshold steigt"
    //% threshold.min=0 threshold.max=255 threshold.defl=128
    //% group="Lautstärke"
    export function onLoud(threshold: number, handler: () => void) {

        basic.forever(function () {
            let isLoud = input.soundLevel() > threshold

            // Flanke: leise → laut
            if (isLoud && !wasLoud) {
                handler()
            }

            wasLoud = isLoud
            basic.pause(50)
        })
    }

    /**
     * Wird ausgelöst, wenn die Lautstärke unter die Schwelle fällt
     */
    //% block="wenn Lautstärke unter %threshold fällt"
    //% threshold.min=0 threshold.max=255 threshold.defl=128
    //% group="Lautstärke"
    export function onQuiet(threshold: number, handler: () => void) {

        basic.forever(function () {
            let isLoud = input.soundLevel() > threshold

            // Flanke: laut → leise
            if (!isLoud && wasLoud) {
                handler()
            }

            wasLoud = isLoud
            basic.pause(50)
        })
    }
}
