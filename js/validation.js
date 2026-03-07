/**
 * System Validation & Health Check
 * Verifies all systems are working correctly
 */

class SystemValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.info = [];
    }

    /**
     * Run all validation checks
     */
    validateAll() {
        console.log('[v0] Starting system validation...');
        
        this.validateDOM();
        this.validateScripts();
        this.validateCSS();
        this.validateLocalStorage();
        this.validateLanguageSystem();
        this.validateTasks();
        this.validateLinks();
        this.validateCalendar();
        
        this.printResults();
        return this.errors.length === 0;
    }

    /**
     * Check DOM elements exist
     */
    validateDOM() {
        const requiredElements = [
            { selector: '.main-container', name: 'Main container' },
            { selector: '.aside', name: 'Sidebar' },
            { selector: '.nav', name: 'Navigation' },
            { selector: '.section', name: 'Sections' },
            { selector: '.home', name: 'Home section' },
            { selector: '.about', name: 'About section' },
            { selector: '.portfolio', name: 'Portfolio section' },
            { selector: '.contact', name: 'Contact section' },
            { selector: '.tasks', name: 'Tasks section' },
            { selector: '.links', name: 'Links section' },
            { selector: '.calendar', name: 'Calendar section' }
        ];

        requiredElements.forEach(({ selector, name }) => {
            if (!document.querySelector(selector)) {
                this.errors.push(`Missing DOM element: ${name} (${selector})`);
            } else {
                this.info.push(`✓ Found ${name}`);
            }
        });
    }

    /**
     * Check all required scripts are loaded
     */
    validateScripts() {
        const requiredScripts = [
            { name: 'Typed.js', check: () => window.Typed },
            { name: 'Tasks system', check: () => window.TaskManager },
            { name: 'Links system', check: () => window.LinksManager },
            { name: 'Calendar system', check: () => window.CalendarManager },
            { name: 'Language system', check: () => window.translations },
            { name: 'EmailJS', check: () => window.emailjs },
            { name: 'QRCode.js', check: () => window.QRCode }
        ];

        requiredScripts.forEach(({ name, check }) => {
            try {
                if (check()) {
                    this.info.push(`✓ ${name} loaded`);
                } else {
                    this.warnings.push(`${name} not initialized yet`);
                }
            } catch (e) {
                this.warnings.push(`${name} load check failed: ${e.message}`);
            }
        });
    }

    /**
     * Check CSS files are loaded
     */
    validateCSS() {
        const requiredCSS = [
            'styles.css',
            'tasks.css',
            'responsive.css',
            'language-styles.css'
        ];

        const links = document.querySelectorAll('link[rel="stylesheet"]');
        const loadedCSS = Array.from(links).map(l => l.href);

        requiredCSS.forEach(css => {
            const found = loadedCSS.some(href => href.includes(css));
            if (found) {
                this.info.push(`✓ CSS loaded: ${css}`);
            } else {
                this.warnings.push(`CSS file not found: ${css}`);
            }
        });
    }

    /**
     * Check LocalStorage functionality
     */
    validateLocalStorage() {
        try {
            const testKey = 'test_' + Date.now();
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            this.info.push('✓ LocalStorage working');
        } catch (e) {
            this.errors.push(`LocalStorage error: ${e.message}`);
        }
    }

    /**
     * Check language system
     */
    validateLanguageSystem() {
        if (!window.translations) {
            this.warnings.push('Language system not initialized yet');
            return;
        }

        const languages = Object.keys(window.translations);
        if (languages.length > 0) {
            this.info.push(`✓ Languages found: ${languages.join(', ')}`);
        } else {
            this.errors.push('No languages found in translations');
        }

        const currentLang = document.documentElement.lang;
        this.info.push(`✓ Current language: ${currentLang}`);
    }

    /**
     * Check Tasks system
     */
    validateTasks() {
        try {
            const tasks = localStorage.getItem('portfolio_tasks');
            if (tasks) {
                const parsed = JSON.parse(tasks);
                this.info.push(`✓ Tasks system working (${parsed.length} tasks stored)`);
            } else {
                this.info.push('✓ Tasks system ready (no tasks yet)');
            }
        } catch (e) {
            this.warnings.push(`Tasks data error: ${e.message}`);
        }
    }

    /**
     * Check Links system
     */
    validateLinks() {
        try {
            const links = localStorage.getItem('portfolio_links');
            if (links) {
                const parsed = JSON.parse(links);
                this.info.push(`✓ Links system working (${parsed.length} links stored)`);
            } else {
                this.info.push('✓ Links system ready (no links yet)');
            }
        } catch (e) {
            this.warnings.push(`Links data error: ${e.message}`);
        }
    }

    /**
     * Check Calendar system
     */
    validateCalendar() {
        try {
            const events = localStorage.getItem('portfolio_events');
            if (events) {
                const parsed = JSON.parse(events);
                this.info.push(`✓ Calendar system working (${parsed.length} events stored)`);
            } else {
                this.info.push('✓ Calendar system ready (no events yet)');
            }
        } catch (e) {
            this.warnings.push(`Calendar data error: ${e.message}`);
        }
    }

    /**
     * Print validation results
     */
    printResults() {
        console.log('\n========== SYSTEM VALIDATION REPORT ==========\n');

        if (this.errors.length > 0) {
            console.error('❌ ERRORS:');
            this.errors.forEach(err => console.error(`  - ${err}`));
        }

        if (this.warnings.length > 0) {
            console.warn('\n⚠️  WARNINGS:');
            this.warnings.forEach(warn => console.warn(`  - ${warn}`));
        }

        if (this.info.length > 0) {
            console.log('\n✓ INFO:');
            this.info.forEach(inf => console.log(`  ${inf}`));
        }

        console.log('\n============================================\n');
        
        if (this.errors.length === 0) {
            console.log('✓ All systems operational!');
        } else {
            console.error(`✗ ${this.errors.length} error(s) found`);
        }
    }
}

// Auto-run validation when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Delay validation to allow all scripts to load
    setTimeout(() => {
        const validator = new SystemValidator();
        validator.validateAll();
        window.systemValidator = validator; // Make available globally for debugging
    }, 2000);
});
