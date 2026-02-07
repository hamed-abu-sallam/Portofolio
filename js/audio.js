// audio.js - Handles musical scale sounds for navigation and other interactions

// Audio Toggle Control - Check if audio was previously enabled/disabled
let audioEnabled = localStorage.getItem('audioEnabled') !== 'false'; // Default: enabled
console.log('%c🔊 Audio:', audioEnabled ? 'Enabled' : 'Disabled', 'color: ' + (audioEnabled ? 'green' : 'red') + '; font-weight: bold;');

/**
 * Toggle audio on/off and save preference
 */
function toggleAudio() {
    audioEnabled = !audioEnabled;
    localStorage.setItem('audioEnabled', audioEnabled);
    console.log('%c🔊 Audio toggled:', audioEnabled ? 'ON' : 'OFF', 'color: ' + (audioEnabled ? 'green' : 'red') + '; font-weight: bold;');
    updateAudioToggleUI();
    return audioEnabled;
}

/**
 * Update UI elements to reflect audio state
 */
function updateAudioToggleUI() {
    const audioToggle = document.getElementById('audioToggle');
    if (audioToggle) {
        audioToggle.classList.toggle('audio-off', !audioEnabled);
        audioToggle.title = audioEnabled ? 'Click to disable audio' : 'Click to enable audio';
    }
}

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', updateAudioToggleUI);

// Initialize core melodic synth (PolySynth for chords/single notes)
const melodicSynth = new Tone.PolySynth(Tone.Synth).toDestination();
melodicSynth.set({
    envelope: {
        attack: 0.02,   // Quick attack for notes
        decay: 0.2,     // Medium decay
        sustain: 0.1,   // Slight sustain
        release: 0.5    // Longer release for a gentle fade out
    },
    oscillator: {
        type: "sine"    // Use a sine wave for a softer, purer tone
    }
});

// Initialize synth for subtle hover sounds (PluckSynth is good for short, string-like sounds)
const hoverSynth = new Tone.PluckSynth().toDestination();
hoverSynth.volume.value = -20; // Set volume very low (-20 dB) for subtlety

// Initialize synth for percussive/click sounds (MembraneSynth for drum-like hits, good for "wooden" feel)
const percussiveSynth = new Tone.MembraneSynth().toDestination();
percussiveSynth.envelope.decay = 0.08; // Crisper decay for a click
percussiveSynth.volume.value = -8; // Slightly louder than hover, but not intrusive

// Initialize a synth that can mimic a keyboard key press sound (NoiseSynth for a quick burst of noise)
const keyboardKeySynth = new Tone.NoiseSynth({
    noise: {
        type: "white" // White noise for a generic key press sound
    },
    envelope: {
        attack: 0.001, // Very fast attack
        decay: 0.05,  // Quick decay
        sustain: 0,   // No sustain
        release: 0.1  // Fast release
    },
    volume: -15 // Subtle volume for keyboard key
}).toDestination();


// Define audio configurations for different sections and actions.
// Each entry specifies the 'instrument' (which synth to use), 'note'(s) (can be an array for chords or null for NoiseSynth), and 'duration'.
const audioConfigs = {
    // Navigation Section Sounds (using melodicSynth with single notes from a scale for progression)
    // These notes provide a consistent musical scale feeling, designed for smooth transitions.
    'home': { instrument: melodicSynth, note: "C4", duration: "8n" },     // Neutral, inviting
    'about': { instrument: melodicSynth, note: "D4", duration: "8n" },    // Slightly ascending, moving forward
    'services': { instrument: melodicSynth, note: "E4", duration: "8n" }, // Positive, expanding
    'portfolio': { instrument: melodicSynth, note: "G4", duration: "8n" },// Brighter, showcasing, energetic
    'contact': { instrument: melodicSynth, note: "A3", duration: "8n" },  // Calmer, settling, inviting contact

    // Special Action Button Sound for "Hire Me" (using melodicSynth for a bright, impactful chord)
    'hire-me-button': { instrument: melodicSynth, note: ["C5", "E5", "G5"], duration: "8n" },

    // Form Submission Button Sound for "Send Message" (using percussiveSynth for a distinct, lower click/thud, like a wooden block)
    'send-message-button': { instrument: percussiveSynth, note: "C3", duration: "16n" }, // Mimics a "wooden" click or a soft thud

    // Generic Click Sound for other buttons (using keyboardKeySynth for a subtle key press effect)
    'generic-click': { instrument: keyboardKeySynth, note: null, duration: "64n" } // NoiseSynth doesn't need a specific note
};

/**
 * Ensures the Tone.js audio context is running.
 * Most modern browsers require a user interaction (like a click) to start the audio context.
 * This function handles that by calling Tone.start().
 * It should be called before any audio playback.
 */
async function startAudioContext() {
    if (Tone.context.state !== 'running') {
        try {
            await Tone.start();
            console.log("Tone.js audio context started.");
        } catch (e) {
            console.error("Failed to start Tone.js audio context:", e);
        }
    }
}

/**
 * Plays a distinct sound for navigation sections based on their ID.
 * This function is designed to be called when a navigation link is clicked.
 * @param {string} sectionId - The ID of the section being navigated to (e.g., 'home', 'about').
 */
function playNavigationSound(sectionId) {
    if (!audioEnabled) return; // Check if audio is enabled
    
    startAudioContext().then(() => {
        const config = audioConfigs[sectionId];
        if (config && config.instrument) {
            // Determine how to trigger the sound based on whether it has a specific note or is a NoiseSynth.
            if (config.note !== null && Array.isArray(config.note)) {
                config.instrument.triggerAttackRelease(config.note, config.duration);
            } else if (config.note !== null) {
                config.instrument.triggerAttackRelease(config.note, config.duration);
            } else {
                // For NoiseSynth or instruments that don't take a 'note' argument, just trigger with duration.
                config.instrument.triggerAttackRelease(config.duration);
            }
        } else {
            console.warn(`No specific audio configuration found for navigation section: ${sectionId}. Playing generic click.`);
            // Fallback to a generic click sound if a specific configuration is not found.
            audioConfigs['generic-click'].instrument.triggerAttackRelease(
                audioConfigs['generic-click'].duration // NoiseSynth uses only duration for trigger
            );
        }
    });
}

/**
 * Plays a subtle sound when the mouse hovers over an interactive element.
 * This is meant to be a very light, non-intrusive feedback sound, mimicking a soft touch.
 */
function playHoverSound() {
    if (!audioEnabled) return; // Check if audio is enabled
    
    // Only play hover sound if the audio context is already running to avoid auto-play issues
    // and to prevent excessive sound generation on rapid hovers.
    if (Tone.context.state === 'running') {
        hoverSynth.triggerAttackRelease("C5", "64n"); // "64n" is a sixty-fourth note, very short duration
    } else {
        // If context not running, try to start it and then play. This allows hover sound on first interaction.
        startAudioContext().then(() => {
            hoverSynth.triggerAttackRelease("C5", "64n");
        });
    }
}

/**
 * Plays a distinct sound for specific action buttons (like "Hire Me" or "Send Message").
 * The sound played depends on the 'buttonId' passed, which maps to a configuration in 'audioConfigs'.
 * @param {string} buttonId - A specific ID or identifier for the button (e.g., 'hire-me-button', 'send-message-button').
 */
function playActionButtonSound(buttonId) {
    if (!audioEnabled) return; // Check if audio is enabled
    
    startAudioContext().then(() => {
        const config = audioConfigs[buttonId];
        if (config && config.instrument) {
            // Similar logic as playNavigationSound for triggering based on note type.
            if (config.note !== null && Array.isArray(config.note)) {
                config.instrument.triggerAttackRelease(config.note, config.duration);
            } else if (config.note !== null) {
                config.instrument.triggerAttackRelease(config.note, config.duration);
            } else {
                // For NoiseSynth or instruments that don't take a 'note' argument, just trigger with duration.
                config.instrument.triggerAttackRelease(config.duration);
            }
        } else {
            console.warn(`No specific audio configuration found for action button: ${buttonId}. Playing generic click.`);
            // Fallback to a generic click sound if a specific configuration is not found.
            audioConfigs['generic-click'].instrument.triggerAttackRelease(
                audioConfigs['generic-click'].duration
            );
        }
    });
}

// Expose these functions globally so they can be called from `script.js` and `style-switcher.js`.
window.playNavigationSound = playNavigationSound;
window.playHoverSound = playHoverSound;
window.playActionButtonSound = playActionButtonSound;
window.toggleAudio = toggleAudio;
window.updateAudioToggleUI = updateAudioToggleUI;

// Add event listeners for various interactive elements to trigger appropriate sounds.
document.addEventListener('DOMContentLoaded', () => {
    // Select the "Send Message" button specifically from the contact form.
    const sendMessageButton = document.querySelector('.contact-form button[type="submit"]');

    // Add a click listener for the "Send Message" button to play its unique sound.
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', () => {
            playActionButtonSound('send-message-button');
        });
    }

    // Add generic click listener for other '.btn' elements and '.lang-button' not covered by specific handlers.
    // This targets buttons that are not navigation links and not the 'hire-me' button,
    // ensuring all general clickable buttons have some audio feedback.
    document.querySelectorAll('.btn:not(.nav a):not(.hire-me), .lang-button').forEach(button => {
        // Prevent this generic listener from applying to the sendMessageButton if it was specifically handled above.
        if (button !== sendMessageButton) {
            button.addEventListener('click', () => {
                playActionButtonSound('generic-click');
            });
        }
    });
});
