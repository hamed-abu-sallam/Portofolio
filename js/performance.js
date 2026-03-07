/**
 * Performance & Optimization Utilities
 * Monitors and optimizes application performance
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.initialized = false;
    }

    /**
     * Initialize performance monitoring
     */
    init() {
        if (this.initialized) return;
        
        this.measurePageLoad();
        this.monitorMemory();
        this.optimizeImages();
        this.cleanupDOM();
        this.initialized = true;
    }

    /**
     * Measure page load time
     */
    measurePageLoad() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                this.metrics.pageLoadTime = pageLoadTime;
                console.log(`[Performance] Page Load Time: ${pageLoadTime}ms`);
                
                if (pageLoadTime > 3000) {
                    console.warn('[Performance] Page load time exceeds 3 seconds');
                }
            });
        }
    }

    /**
     * Monitor memory usage
     */
    monitorMemory() {
        if (performance.memory) {
            setInterval(() => {
                const usedJSHeapSize = Math.round(performance.memory.usedJSHeapSize / 1048576);
                const totalJSHeapSize = Math.round(performance.memory.totalJSHeapSize / 1048576);
                
                this.metrics.memoryUsage = {
                    used: usedJSHeapSize,
                    total: totalJSHeapSize
                };
                
                // Warn if memory usage is high
                if (usedJSHeapSize > 50) {
                    console.warn(`[Performance] High memory usage: ${usedJSHeapSize}MB / ${totalJSHeapSize}MB`);
                }
            }, 30000); // Check every 30 seconds
        }
    }

    /**
     * Optimize images lazy loading
     */
    optimizeImages() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Clean up unused DOM elements
     */
    cleanupDOM() {
        // Remove duplicate event listeners
        const scripts = document.querySelectorAll('script[src*="audio.js"]');
        scripts.forEach(script => script.remove());
        
        // Remove unused CSS
        const styles = document.querySelectorAll('link[href*="tone"]');
        styles.forEach(style => style.remove());
    }

    /**
     * Debounce function for event handlers
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function for event handlers
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Get performance metrics
     */
    getMetrics() {
        return {
            ...this.metrics,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Log metrics for debugging
     */
    logMetrics() {
        console.table(this.getMetrics());
    }
}

/**
 * LocalStorage Management & Optimization
 */
class StorageOptimizer {
    constructor() {
        this.maxSize = 5 * 1024 * 1024; // 5MB limit
    }

    /**
     * Check localStorage size
     */
    getStorageSize() {
        let size = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                size += localStorage[key].length + key.length;
            }
        }
        return size;
    }

    /**
     * Check if storage is full
     */
    isStorageFull() {
        return this.getStorageSize() > this.maxSize;
    }

    /**
     * Clean old data
     */
    cleanOldData() {
        // Keep only tasks from current month
        const tasks = JSON.parse(localStorage.getItem('portfolio_tasks') || '[]');
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        
        const filtered = tasks.filter(task => task.date.startsWith(currentMonth));
        localStorage.setItem('portfolio_tasks', JSON.stringify(filtered));
        
        console.log(`[Storage] Cleaned old data. Kept ${filtered.length} tasks.`);
    }

    /**
     * Export data for backup
     */
    exportData() {
        const backup = {
            tasks: localStorage.getItem('portfolio_tasks'),
            links: localStorage.getItem('portfolio_links'),
            language: localStorage.getItem('selectedLanguage'),
            timestamp: new Date().toISOString()
        };
        return JSON.stringify(backup, null, 2);
    }

    /**
     * Import data from backup
     */
    importData(backupJson) {
        try {
            const backup = JSON.parse(backupJson);
            if (backup.tasks) localStorage.setItem('portfolio_tasks', backup.tasks);
            if (backup.links) localStorage.setItem('portfolio_links', backup.links);
            if (backup.language) localStorage.setItem('selectedLanguage', backup.language);
            console.log('[Storage] Data imported successfully');
            return true;
        } catch (error) {
            console.error('[Storage] Failed to import data:', error);
            return false;
        }
    }

    /**
     * Get storage usage info
     */
    getStorageInfo() {
        const size = this.getStorageSize();
        const usage = (size / this.maxSize) * 100;
        
        return {
            used: `${(size / 1024).toFixed(2)}KB`,
            limit: `${(this.maxSize / 1024 / 1024).toFixed(0)}MB`,
            percentage: `${usage.toFixed(1)}%`,
            isFull: usage > 90
        };
    }
}

/**
 * Event Delegation for Performance
 */
class EventManager {
    constructor() {
        this.listeners = new Map();
    }

    /**
     * Add delegated event listener
     */
    on(selector, eventType, callback) {
        document.addEventListener(eventType, (e) => {
            if (e.target.matches(selector)) {
                callback.call(e.target, e);
            }
        });
        
        if (!this.listeners.has(selector)) {
            this.listeners.set(selector, []);
        }
        this.listeners.get(selector).push({ eventType, callback });
    }

    /**
     * Remove event listener
     */
    off(selector, eventType, callback) {
        if (this.listeners.has(selector)) {
            const listeners = this.listeners.get(selector);
            const index = listeners.findIndex(l => l.eventType === eventType && l.callback === callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    /**
     * Get listener count
     */
    getListenerCount() {
        let count = 0;
        this.listeners.forEach(listeners => count += listeners.length);
        return count;
    }
}

/**
 * Cache Manager
 */
class CacheManager {
    constructor() {
        this.cache = new Map();
        this.ttl = new Map();
    }

    /**
     * Set cache with optional TTL
     */
    set(key, value, ttlSeconds = 0) {
        this.cache.set(key, value);
        
        if (ttlSeconds > 0) {
            if (this.ttl.has(key)) {
                clearTimeout(this.ttl.get(key));
            }
            
            const timeoutId = setTimeout(() => {
                this.cache.delete(key);
                this.ttl.delete(key);
            }, ttlSeconds * 1000);
            
            this.ttl.set(key, timeoutId);
        }
    }

    /**
     * Get from cache
     */
    get(key) {
        return this.cache.get(key);
    }

    /**
     * Check if key exists
     */
    has(key) {
        return this.cache.has(key);
    }

    /**
     * Clear cache
     */
    clear() {
        this.cache.clear();
        this.ttl.forEach(timeoutId => clearTimeout(timeoutId));
        this.ttl.clear();
    }

    /**
     * Get cache size
     */
    size() {
        return this.cache.size;
    }
}

/**
 * Initialize all performance utilities
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceMonitor = new PerformanceMonitor();
        window.performanceMonitor.init();
    });
} else {
    window.performanceMonitor = new PerformanceMonitor();
    window.performanceMonitor.init();
}

// Initialize other utilities
window.storageOptimizer = new StorageOptimizer();
window.eventManager = new EventManager();
window.cacheManager = new CacheManager();

// Expose utilities globally
window.PerformanceMonitor = PerformanceMonitor;
window.StorageOptimizer = StorageOptimizer;
window.EventManager = EventManager;
window.CacheManager = CacheManager;

// Helper functions
window.debounce = PerformanceMonitor.debounce;
window.throttle = PerformanceMonitor.throttle;

console.log('[Performance] Utilities initialized');
