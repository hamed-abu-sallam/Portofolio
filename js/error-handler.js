/**
 * Global Error Handler & Recovery System
 * Catches and handles errors gracefully
 */

class ErrorHandler {
    constructor() {
        this.errors = [];
        this.setupGlobalHandlers();
    }

    /**
     * Setup global error handlers
     */
    setupGlobalHandlers() {
        // Catch uncaught errors
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'Global Error', event);
        });

        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection', event);
        });

        // Catch resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleResourceError(event);
            }
        }, true);
    }

    /**
     * Handle general errors
     */
    handleError(error, type, event) {
        const errorInfo = {
            type,
            message: error?.message || String(error),
            stack: error?.stack,
            timestamp: new Date().toISOString()
        };

        this.errors.push(errorInfo);
        console.error(`[${type}]`, errorInfo);

        // Log to server in production (if needed)
        this.logError(errorInfo);
    }

    /**
     * Handle resource loading errors
     */
    handleResourceError(event) {
        const resource = event.target;
        const errorInfo = {
            type: 'Resource Error',
            resource: resource.tagName,
            src: resource.src || resource.href,
            message: 'Failed to load resource',
            timestamp: new Date().toISOString()
        };

        console.warn('[Resource Error]', errorInfo);
    }

    /**
     * Handle LocalStorage errors
     */
    handleStorageError(operation, key, error) {
        const errorInfo = {
            type: 'Storage Error',
            operation,
            key,
            message: error.message,
            timestamp: new Date().toISOString()
        };

        console.error('[Storage Error]', errorInfo);
        return false;
    }

    /**
     * Handle API/fetch errors
     */
    handleAPIError(endpoint, error) {
        const errorInfo = {
            type: 'API Error',
            endpoint,
            message: error.message,
            timestamp: new Date().toISOString()
        };

        console.error('[API Error]', errorInfo);
        return false;
    }

    /**
     * Safe localStorage operations
     */
    safeGetStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            this.handleStorageError('GET', key, error);
            return defaultValue;
        }
    }

    /**
     * Safe localStorage set
     */
    safeSetStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            this.handleStorageError('SET', key, error);
            return false;
        }
    }

    /**
     * Safe DOM manipulation
     */
    safeDOM(callback, fallback = null) {
        try {
            return callback();
        } catch (error) {
            console.error('[DOM Error]', error);
            return fallback;
        }
    }

    /**
     * Log error to server (for production)
     */
    logError(errorInfo) {
        // This can be extended to send to a logging service
        // Example: sendToLoggingService(errorInfo);
    }

    /**
     * Get all recorded errors
     */
    getErrors() {
        return [...this.errors];
    }

    /**
     * Clear error logs
     */
    clearErrors() {
        this.errors = [];
    }
}

// Initialize global error handler
window.errorHandler = new ErrorHandler();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorHandler;
}
