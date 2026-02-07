/* === Toggle Style Switcher === */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

// hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

/* === Theme Colors === */
const alternateStyles = document.querySelectorAll(".alternate-style");

// Function to set active color theme
function setActiveStyle(color) {
    // Play a generic click sound when changing theme colors
    if (window.playActionButtonSound) { // Check if audio.js functions are available
        window.playActionButtonSound('generic-click');
    }

    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled"); // Enable the selected color style
        } else {
            style.setAttribute("disabled", "true"); // Disable other color styles
        }
    });
}

/* === Theme Light and Dark Mode === */
const dayNight = document.querySelector(".day-night");

// Event listener for day/night mode toggle
dayNight.addEventListener("click", () => {
    // Play a generic click sound when toggling day/night mode
    if (window.playActionButtonSound) { // Check if audio.js functions are available
        window.playActionButtonSound('generic-click');
    }

    dayNight.querySelector("i").classList.toggle("fa-sun"); // Toggle sun icon
    dayNight.querySelector("i").classList.toggle("fa-moon"); // Toggle moon icon
    document.body.classList.toggle("dark"); // Toggle 'dark' class on body
});

// Set initial icon based on default theme (dark mode is default in index.html)
window.addEventListener("load", () => {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun"); // Show sun icon if dark mode is active
        dayNight.querySelector("i").classList.remove("fa-moon");
    } else {
        dayNight.querySelector("i").classList.add("fa-moon"); // Show moon icon if light mode is active
        dayNight.querySelector("i").classList.remove("fa-sun");
    }
});

/* === Language Switcher === */
// These buttons should be present in index.html, likely within the aside or style-switcher.
document.addEventListener('DOMContentLoaded', () => {
    const langArButton = document.getElementById('lang-ar');
    const langEnButton = document.getElementById('lang-en');

    // Attach click event listeners to the language buttons.
    if (langArButton && langEnButton) {
        langArButton.addEventListener('click', () => {
            // Play a generic click sound for language switch
            if (window.playActionButtonSound) { // Check if audio.js functions are available
                window.playActionButtonSound('generic-click');
            }
            if (window.updateContent) { // Check if updateContent is globally available from script.js
                window.updateContent('ar');
                langArButton.classList.add('active');
                langEnButton.classList.remove('active');
                document.documentElement.lang = 'ar'; // Update HTML lang attribute
                document.body.dir = 'rtl'; // Set HTML direction for Arabic
            }
        });

        langEnButton.addEventListener('click', () => {
            // Play a generic click sound for language switch
            if (window.playActionButtonSound) { // Check if audio.js functions are available
                window.playActionButtonSound('generic-click');
            }
            if (window.updateContent) { // Check if updateContent is globally available from script.js
                window.updateContent('en');
                langEnButton.classList.add('active');
                langArButton.classList.remove('active');
                document.documentElement.lang = 'en'; // Update HTML lang attribute
                document.body.dir = 'ltr'; // Set HTML direction for English
            }
        });
    }

    // Set initial active state for language buttons based on current direction
    // This should ideally match the default language set in script.js (currently 'en').
    const currentLangFromHTML = document.documentElement.lang || 'en'; // Read from HTML lang attribute
    if (currentLangFromHTML === 'ar') {
        if (langArButton) langArButton.classList.add('active');
        if (langEnButton) langEnButton.classList.remove('active');
        document.body.dir = 'rtl';
    } else {
        if (langEnButton) langEnButton.classList.add('active');
        if (langArButton) langArButton.classList.remove('active');
        document.body.dir = 'ltr';
    }
});
