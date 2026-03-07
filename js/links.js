/**
 * Links & QR Code Management System
 * Handles social links, QR code generation, and link sharing
 */

class LinksManager {
    constructor() {
        this.storageKey = 'portfolio_links';
        this.defaultLinks = {
            email: {
                title: 'Email',
                url: 'mailto:hamedabusallam@gmail.com',
                icon: 'fas fa-envelope',
                category: 'contact'
            },
            whatsapp: {
                title: 'WhatsApp',
                url: 'https://wa.me/201067528457',
                icon: 'fab fa-whatsapp',
                category: 'messaging'
            },
            linkedin: {
                title: 'LinkedIn',
                url: 'https://linkedin.com/in/hamed-abu-sallam',
                icon: 'fab fa-linkedin',
                category: 'social'
            },
            github: {
                title: 'GitHub',
                url: 'https://github.com/hamed-abu-sallam',
                icon: 'fab fa-github',
                category: 'portfolio'
            },
            behance: {
                title: 'Behance',
                url: 'https://behance.net/hamed-abu-sallam',
                icon: 'fab fa-behance',
                category: 'portfolio'
            },
            youtube: {
                title: 'YouTube',
                url: 'https://www.youtube.com/@DigitonLifeMix',
                icon: 'fab fa-youtube',
                category: 'social'
            },
            instagram: {
                title: 'Instagram',
                url: 'https://www.instagram.com/digitonlifemix',
                icon: 'fab fa-instagram',
                category: 'social'
            },
            portfolio: {
                title: 'Portfolio',
                url: 'https://hamed-abu-sallam.netlify.app',
                icon: 'fas fa-briefcase',
                category: 'portfolio'
            }
        };
        
        this.links = this.loadLinks();
    }

    /**
     * Load links from localStorage or use defaults
     */
    loadLinks() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : this.defaultLinks;
    }

    /**
     * Save links to localStorage
     */
    saveLinks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.links));
    }

    /**
     * Get all links
     */
    getLinks() {
        return this.links;
    }

    /**
     * Get links by category
     */
    getLinksByCategory(category) {
        return Object.entries(this.links)
            .filter(([_, link]) => link.category === category)
            .reduce((acc, [key, link]) => ({ ...acc, [key]: link }), {});
    }

    /**
     * Add or update a link
     */
    setLink(key, linkData) {
        this.links[key] = {
            title: linkData.title,
            url: linkData.url,
            icon: linkData.icon || 'fas fa-link',
            category: linkData.category || 'other'
        };
        this.saveLinks();
        this.dispatchEvent('linkUpdated', { key, link: this.links[key] });
        return this.links[key];
    }

    /**
     * Delete a link
     */
    deleteLink(key) {
        if (key in this.links) {
            delete this.links[key];
            this.saveLinks();
            this.dispatchEvent('linkDeleted', { key });
            return true;
        }
        return false;
    }

    /**
     * Copy link to clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.dispatchEvent('linkCopied', { text });
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }

    /**
     * Generate QR code for a link
     */
    generateQRCode(text, elementId, size = 200) {
        // Clear existing QR code
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '';
            
            // Create QR code using QRCode.js library
            if (typeof QRCode !== 'undefined') {
                new QRCode(element, {
                    text: text,
                    width: size,
                    height: size,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
                return true;
            }
        }
        return false;
    }

    /**
     * Get link statistics
     */
    getStatistics() {
        const categories = {};
        Object.entries(this.links).forEach(([key, link]) => {
            categories[link.category] = (categories[link.category] || 0) + 1;
        });
        
        return {
            totalLinks: Object.keys(this.links).length,
            byCategory: categories
        };
    }

    /**
     * Export links as JSON
     */
    exportLinks() {
        return JSON.stringify(this.links, null, 2);
    }

    /**
     * Import links from JSON
     */
    importLinks(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            this.links = { ...this.links, ...imported };
            this.saveLinks();
            this.dispatchEvent('linksImported', { count: Object.keys(imported).length });
            return true;
        } catch (err) {
            console.error('Failed to import links:', err);
            return false;
        }
    }

    /**
     * Reset to default links
     */
    resetToDefaults() {
        this.links = { ...this.defaultLinks };
        this.saveLinks();
        this.dispatchEvent('linksReset', {});
        return this.links;
    }

    /**
     * Dispatch custom events
     */
    dispatchEvent(eventType, detail) {
        const event = new CustomEvent(`links:${eventType}`, { detail });
        document.dispatchEvent(event);
    }
}

// Global links manager instance
window.linksManager = new LinksManager();

// Expose functions globally
window.getLinks = () => window.linksManager.getLinks();
window.getLinksByCategory = (category) => window.linksManager.getLinksByCategory(category);
window.setLink = (key, linkData) => window.linksManager.setLink(key, linkData);
window.deleteLink = (key) => window.linksManager.deleteLink(key);
window.copyLinkToClipboard = (text) => window.linksManager.copyToClipboard(text);
window.generateQRCode = (text, elementId, size) => window.linksManager.generateQRCode(text, elementId, size);
window.getLinksStatistics = () => window.linksManager.getStatistics();
window.exportLinks = () => window.linksManager.exportLinks();
window.importLinks = (jsonData) => window.linksManager.importLinks(jsonData);
window.resetLinksToDefaults = () => window.linksManager.resetToDefaults();
