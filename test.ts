/**
 * Tests for sound events extension
 */

// Test: Set threshold
sound.setSoundThreshold(150);

// Test: Loud event handler
sound.onLoud(function () {
    basic.showString("L");
});

// Test: Quiet event handler
sound.onQuiet(function () {
    basic.showString("Q");
});

// Visual feedback that tests loaded
basic.showIcon(IconNames.Yes);
