/* === Typing animation === */
let typedInstance; // Make typedInstance globally accessible within this script

/**
 * Initializes or re-initializes the Typed.js animation.
 * Destroys any existing instance and creates a new one with language-specific strings.
 * @param {string} lang - The current language code ('en' or 'ar').
 */
function initializeTyped(lang) {
    // Destroy existing instance if it exists to prevent multiple animations
    if (typedInstance) {
        typedInstance.destroy();
    }

    // Get the strings for the current language from the global translations object.
    // Use a fallback to default English strings if translations are not yet defined,
    // which can happen due to async script loading or if languages.js fails to load.
    const strings = (window.translations && window.translations[lang] && window.translations[lang]['home_typing_strings']) ?
                    window.translations[lang]['home_typing_strings'] : 
                    ["Web Designer", "Graphic Designer", "UI/UX Designer", "Youtuber", "Blogger", "Freelancer"]; // Default to English strings

    // Create a new Typed.js instance
    typedInstance = new Typed(".typing", {
        strings: strings,
        typeSpeed: 100, // Typing speed
        backSpeed: 60,  // Backspacing speed
        loop: true      // Loop the animation indefinitely
    });
}

/* === Aside and Section Management === */
const nav = document.querySelector(".nav"),
    navlist = nav.querySelectorAll("li"), // All list items in the navigation.
    totalNavList = navlist.length,       // Total number of navigation items.
    allSection = document.querySelectorAll(".section"), // All content sections.
    totalSection = allSection.length;    // Total number of content sections.

const navTogglerBtn = document.querySelector(".nav-toggler"), // The mobile navigation toggle button.
    aside = document.querySelector(".aside");              // The sidebar element.

/**
 * Toggles the visibility of the sidebar (aside) and shifts the main content.
 * Also toggles an 'open' class on the navigation toggler button for visual changes.
 */
function asideSectionTogglerBtn() {
    aside.classList.toggle("open"); // Toggles the 'open' class on the sidebar.
    navTogglerBtn.classList.toggle("open"); // Toggles 'open' class on the toggler button (e.g., changes icon).
    // Loop through all sections and toggle their 'open' class.
    // This class is used in CSS to manage their position when the sidebar is open.
    allSection.forEach(section => {
        section.classList.toggle("open");
    });
}

// Add event listener to the navigation toggler button to call the toggle function.
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});


// Loop through each navigation list item to attach click event listeners.
for (let i = 0; i < totalNavList; i++) {
    const a = navlist[i].querySelector("a"); // Get the anchor tag within each list item.

    // Add a click event listener to each navigation link.
    a.addEventListener("click", function(e) {
        // IMPORTANT: Do NOT prevent default if this is already prevented by form handler
        const targetSectionId = this.getAttribute("href").split("#")[1];
        
        // Only handle navigation, not form submissions
        if (!targetSectionId || targetSectionId === null) {
            return;
        }
        
        if (window.playNavigationSound) {
            window.playNavigationSound(targetSectionId);
        }

        // --- Step 1: Prepare the currently active section for transition out. ---
        // Find the section that is currently visible (has 'active' class).
        const currentActiveSection = document.querySelector(".section.active");
        if (currentActiveSection) {
            // Add 'back-section' to the currently active section to trigger its exit animation.
            currentActiveSection.classList.add("back-section");
            // Also, remove the 'active' class immediately so the new section can take over.
            currentActiveSection.classList.remove("active");
        }

        // --- Step 2: Deactivate all navigation links visually. ---
        // Remove the 'active' class from all navigation links.
        navlist.forEach(item => item.querySelector("a").classList.remove("active"));
        
        // --- Step 3: Activate the clicked navigation link. ---
        // Add the 'active' class to the navigation link that was just clicked.
        this.classList.add("active");

        // --- Step 4: Determine the target content section to display and activate it. ---
        // Extract the target section's ID from the href attribute (e.g., "#home" becomes "home").
        const targetSectionElement = document.querySelector("#" + targetSectionId);

        // Add 'active' class to the new target section, making it visible and animating it in.
        targetSectionElement.classList.add("active");

        // --- Step 5: Clean up 'back-section' from previous sections after their animation completes. ---
        // The 'back-section' animation duration is 1s (1000ms) in CSS.
        // This timeout ensures the old section fully slides out before its 'back-section' class is removed.
        setTimeout(() => {
            allSection.forEach(section => {
                section.classList.remove("back-section");
            });
        }, 1000); // Wait for CSS animation to complete (1 second).

        // --- Step 6: Close the sidebar on smaller screens if it's open. ---
        // This ensures the sidebar automatically closes when a navigation link is clicked
        // on mobile devices, improving user experience.
        if (window.innerWidth < 1200 && aside.classList.contains("open")) {
            asideSectionTogglerBtn(); // Calls the function to close the aside.
        }
    });
}

// Event listener for the "Hire Me" button in the About section.
document.querySelector(".hire-me").addEventListener("click", function() {
    // Play a musical sound (e.g., the sound for the contact section).
    if (window.playNavigationSound) {
        window.playNavigationSound('contact'); // Assuming 'hire-me' leads to 'contact' section
    }

    // Find the navigation link corresponding to the 'Contact' section.
    const contactNavLink = document.querySelector(`.nav li a[href="#contact"]`);
    if (contactNavLink) {
        // Deactivate all navigation links first.
        navlist.forEach(item => item.querySelector("a").classList.remove("active"));
        // Visually activate the 'Contact' navigation link.
        contactNavLink.classList.add("active");
    }
    
    // Prepare the currently active section for transition to the background.
    const currentActiveSection = document.querySelector(".section.active");
    if (currentActiveSection) {
        currentActiveSection.classList.add("back-section");
        currentActiveSection.classList.remove("active"); // Immediate removal for responsiveness
    }

    // Target the 'Contact' section to be displayed.
    const targetSection = document.querySelector("#contact");

    // Activate the 'Contact' section immediately.
    targetSection.classList.add("active"); // Display the contact section.

    // Clean up 'back-section' from all sections after their animation completes.
    setTimeout(() => {
        allSection.forEach(section => {
            section.classList.remove("back-section");
        });
    }, 1000); // Delay for cleanup.

    // Close the aside on smaller screens if it's open.
    if (window.innerWidth < 1200 && aside.classList.contains("open")) {
        asideSectionTogglerBtn();
    }
});

// === Language Switcher Integration ===
// Listen for the DOMContentLoaded event to ensure all HTML elements are loaded before
// attaching event listeners or initializing scripts.
document.addEventListener('DOMContentLoaded', () => {
    const langArButton = document.getElementById('lang-ar');
    const langEnButton = document.getElementById('lang-en');

    // Attach click event listeners to the language buttons.
    if (langArButton && langEnButton) {
        langArButton.addEventListener('click', () => {
            // Call setLanguage function from languages.js (exposed globally as window.setLanguage).
            if (window.setLanguage) {
                window.setLanguage('ar'); 
            }
        });

        langEnButton.addEventListener('click', () => {
            // Call setLanguage function for English.
            if (window.setLanguage) {
                window.setLanguage('en');
            }
        });
    }

    // Initial setup for Typed.js based on the language saved in localStorage or default to English.
    const initialLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Use a small delay to ensure languages.js has fully initialized window.translations.
    // This helps prevent race conditions, especially with 'defer' attributes on script tags.
    setTimeout(() => {
        initializeTyped(initialLang);
    }, 100); // 100ms delay to allow dependent scripts to fully load/initialize.

    // Listen for the custom 'languageChanged' event dispatched by languages.js.
    // When this event occurs, re-initialize Typed.js with the new language.
    window.addEventListener('languageChanged', (event) => {
        initializeTyped(event.detail.lang);
    });
});

// Event listener for service certificate links
document.addEventListener('DOMContentLoaded', () => {
    const serviceCertLinks = document.querySelectorAll(".service-cert-link");
    serviceCertLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Play a musical sound for certificates section
            const certificatesSectionId = 'certificates';
            if (window.playNavigationSound) {
                window.playNavigationSound(certificatesSectionId);
            }

            // Find the navigation link corresponding to the 'Certificates' section.
            const certificatesNavLink = document.querySelector(`.nav li a[href="#certificates"]`);
            if (certificatesNavLink) {
                // Deactivate all navigation links first.
                navlist.forEach(item => item.querySelector("a").classList.remove("active"));
                // Visually activate the 'Certificates' navigation link.
                certificatesNavLink.classList.add("active");
            }
            
            // Prepare the currently active section for transition to the background.
            const currentActiveSection = document.querySelector(".section.active");
            if (currentActiveSection) {
                currentActiveSection.classList.add("back-section");
                currentActiveSection.classList.remove("active");
            }

            // Target the 'Certificates' section to be displayed.
            const targetSection = document.querySelector("#certificates");

            // Activate the 'Certificates' section immediately.
            targetSection.classList.add("active");

            // Clean up 'back-section' from all sections after their animation completes.
            setTimeout(() => {
                allSection.forEach(section => {
                    section.classList.remove("back-section");
                });
            }, 1000);
        });
    });
});
