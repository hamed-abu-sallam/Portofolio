/**
 * System Integration Manager
 * Coordinates between Tasks, Links, Calendar, and Language systems
 */

class SystemIntegration {
    constructor() {
        this.systems = {
            tasks: null,
            calendar: null,
            links: null,
            language: null,
            ui: null
        };
        this.eventBus = new EventBus();
        this.initialized = false;
    }

    /**
     * Initialize all systems with dependencies
     */
    init(taskManager, calendarManager, linksManager, languageManager, uiManager) {
        console.log('[Integration] Initializing system integration...');
        
        this.systems = {
            tasks: taskManager,
            calendar: calendarManager,
            links: linksManager,
            language: languageManager,
            ui: uiManager
        };

        // Setup event listeners
        this.setupEventListeners();
        
        // Sync systems
        this.syncSystems();
        
        this.initialized = true;
        console.log('[Integration] System integration initialized');
    }

    /**
     * Setup event listeners for cross-system communication
     */
    setupEventListeners() {
        // When task is added, update calendar
        this.eventBus.on('task:added', (task) => {
            if (this.systems.calendar) {
                this.systems.calendar.refreshCalendar();
            }
        });

        // When task is deleted, update calendar
        this.eventBus.on('task:deleted', (taskId) => {
            if (this.systems.calendar) {
                this.systems.calendar.refreshCalendar();
            }
        });

        // When task is completed, update calendar
        this.eventBus.on('task:completed', (task) => {
            if (this.systems.calendar) {
                this.systems.calendar.refreshCalendar();
            }
        });

        // When language changes, update all systems
        this.eventBus.on('language:changed', (language) => {
            this.updateAllSystemsLanguage(language);
        });

        // When month changes in calendar, refresh view
        this.eventBus.on('calendar:monthChanged', (month) => {
            if (this.systems.calendar) {
                this.systems.calendar.renderCalendar();
            }
        });

        // When new link is added
        this.eventBus.on('link:added', (link) => {
            console.log('[Integration] New link added:', link);
        });

        // When UI theme changes
        this.eventBus.on('ui:themeChanged', (theme) => {
            this.updateAllSystemsTheme(theme);
        });
    }

    /**
     * Sync all systems on initialization
     */
    syncSystems() {
        // Sync language across all systems
        const currentLanguage = this.systems.language?.getCurrentLanguage() || 'en';
        this.updateAllSystemsLanguage(currentLanguage);

        // Sync theme
        const currentTheme = this.systems.ui?.getCurrentTheme() || 'light';
        this.updateAllSystemsTheme(currentTheme);

        // Sync calendar with tasks
        if (this.systems.calendar && this.systems.tasks) {
            const tasks = this.systems.tasks.getAllTasks();
            this.systems.calendar.setTasks(tasks);
        }
    }

    /**
     * Update language across all systems
     */
    updateAllSystemsLanguage(language) {
        console.log(`[Integration] Updating language to: ${language}`);

        // Update document direction
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

        // Update each system
        if (this.systems.tasks?.setLanguage) {
            this.systems.tasks.setLanguage(language);
        }
        if (this.systems.calendar?.setLanguage) {
            this.systems.calendar.setLanguage(language);
        }
        if (this.systems.links?.setLanguage) {
            this.systems.links.setLanguage(language);
        }
        if (this.systems.ui?.setLanguage) {
            this.systems.ui.setLanguage(language);
        }

        // Emit event for other components
        this.eventBus.emit('integration:languageUpdated', { language });
    }

    /**
     * Update theme across all systems
     */
    updateAllSystemsTheme(theme) {
        console.log(`[Integration] Updating theme to: ${theme}`);

        // Update each system
        if (this.systems.tasks?.setTheme) {
            this.systems.tasks.setTheme(theme);
        }
        if (this.systems.calendar?.setTheme) {
            this.systems.calendar.setTheme(theme);
        }
        if (this.systems.links?.setTheme) {
            this.systems.links.setTheme(theme);
        }
        if (this.systems.ui?.setTheme) {
            this.systems.ui.setTheme(theme);
        }

        this.eventBus.emit('integration:themeUpdated', { theme });
    }

    /**
     * Get task statistics for dashboard
     */
    getTaskStatistics() {
        if (!this.systems.tasks) return null;

        const allTasks = this.systems.tasks.getAllTasks();
        const todayTasks = this.systems.tasks.getTodayTasks();
        const completedTasks = allTasks.filter(t => t.completed).length;

        return {
            total: allTasks.length,
            today: todayTasks.length,
            completed: completedTasks,
            pending: allTasks.length - completedTasks,
            categories: this.categorizeTaskStats(allTasks)
        };
    }

    /**
     * Categorize task statistics
     */
    categorizeTaskStats(tasks) {
        const stats = {
            academy: 0,
            freelance: 0,
            support: 0,
            projects: 0,
            personal: 0
        };

        tasks.forEach(task => {
            if (stats.hasOwnProperty(task.category)) {
                stats[task.category]++;
            }
        });

        return stats;
    }

    /**
     * Get upcoming events summary
     */
    getUpcomingEventsSummary() {
        if (!this.systems.calendar) return null;

        return this.systems.calendar.getUpcomingEvents();
    }

    /**
     * Validate system integrity
     */
    validateIntegrity() {
        const report = {
            tasksValid: false,
            calendarValid: false,
            linksValid: false,
            languageValid: false,
            uiValid: false,
            errors: []
        };

        // Check tasks
        try {
            const tasks = this.systems.tasks?.getAllTasks();
            report.tasksValid = Array.isArray(tasks);
        } catch (error) {
            report.errors.push(`Tasks error: ${error.message}`);
        }

        // Check calendar
        try {
            const calendarData = this.systems.calendar?.getCalendarData();
            report.calendarValid = calendarData !== null;
        } catch (error) {
            report.errors.push(`Calendar error: ${error.message}`);
        }

        // Check links
        try {
            const links = this.systems.links?.getLinks();
            report.linksValid = Array.isArray(links);
        } catch (error) {
            report.errors.push(`Links error: ${error.message}`);
        }

        // Check language
        try {
            const lang = this.systems.language?.getCurrentLanguage();
            report.languageValid = lang === 'ar' || lang === 'en';
        } catch (error) {
            report.errors.push(`Language error: ${error.message}`);
        }

        // Check UI
        try {
            report.uiValid = this.systems.ui !== null;
        } catch (error) {
            report.errors.push(`UI error: ${error.message}`);
        }

        return report;
    }

    /**
     * Emergency reset all systems
     */
    emergencyReset() {
        console.warn('[Integration] Emergency reset initiated');

        try {
            // Clear localStorage
            localStorage.clear();

            // Reset systems
            if (this.systems.tasks?.reset) {
                this.systems.tasks.reset();
            }
            if (this.systems.calendar?.reset) {
                this.systems.calendar.reset();
            }
            if (this.systems.links?.reset) {
                this.systems.links.reset();
            }

            console.log('[Integration] Emergency reset completed');
            return true;
        } catch (error) {
            console.error('[Integration] Emergency reset failed:', error);
            return false;
        }
    }

    /**
     * Get system status report
     */
    getSystemStatus() {
        return {
            initialized: this.initialized,
            timestamp: new Date().toISOString(),
            integrity: this.validateIntegrity(),
            statistics: this.getTaskStatistics(),
            upcomingEvents: this.getUpcomingEventsSummary(),
            storageInfo: window.storageOptimizer?.getStorageInfo(),
            performance: window.performanceMonitor?.getMetrics()
        };
    }
}

/**
 * Event Bus for inter-system communication
 */
class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to event
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    /**
     * Unsubscribe from event
     */
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }

    /**
     * Emit event
     */
    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`[EventBus] Error in event ${eventName}:`, error);
                }
            });
        }
    }

    /**
     * Get events list
     */
    getEvents() {
        return Object.keys(this.events);
    }

    /**
     * Clear all events
     */
    clear() {
        this.events = {};
    }
}

/**
 * Health Check System
 */
class HealthCheck {
    constructor(integration) {
        this.integration = integration;
        this.checkInterval = 60000; // Every minute
    }

    /**
     * Start health checks
     */
    start() {
        console.log('[HealthCheck] Starting system health checks');
        
        setInterval(() => {
            this.performHealthCheck();
        }, this.checkInterval);

        // Initial check
        this.performHealthCheck();
    }

    /**
     * Perform health check
     */
    performHealthCheck() {
        const status = this.integration.getSystemStatus();
        
        if (status.integrity.errors.length > 0) {
            console.warn('[HealthCheck] System issues detected:', status.integrity.errors);
        }

        if (status.storageInfo?.isFull) {
            console.warn('[HealthCheck] Storage is getting full');
            window.storageOptimizer?.cleanOldData();
        }

        console.log('[HealthCheck] Health check completed', {
            taskCount: status.statistics.total,
            storageUsage: status.storageInfo.percentage,
            upcomingCount: status.upcomingEvents?.length
        });
    }

    /**
     * Get health status
     */
    getHealth() {
        return this.integration.validateIntegrity();
    }
}

// Initialize integration globally
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.systemIntegration = new SystemIntegration();
    });
} else {
    window.systemIntegration = new SystemIntegration();
}

// Expose classes globally
window.SystemIntegration = SystemIntegration;
window.EventBus = EventBus;
window.HealthCheck = HealthCheck;

console.log('[Integration] Integration module loaded');
