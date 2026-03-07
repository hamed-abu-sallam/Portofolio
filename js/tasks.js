/**
 * Task Management System
 * Handles task creation, deletion, scheduling, and smart automation
 */

class TaskManager {
    constructor() {
        this.storageKey = 'portfolio_tasks';
        this.tasks = this.loadTasks();
        this.initializeAutomation();
    }

    /**
     * Load tasks from localStorage
     */
    loadTasks() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Save tasks to localStorage
     */
    saveTasks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    /**
     * Generate unique task ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Add a new task
     */
    addTask(taskData) {
        const task = {
            id: this.generateId(),
            title: taskData.title,
            category: taskData.category || 'project', // academy, freelance, support, project
            date: taskData.date || new Date().toISOString().split('T')[0],
            time: taskData.time || '09:00',
            duration: taskData.duration || 1, // hours
            priority: taskData.priority || 'medium', // low, medium, high
            description: taskData.description || '',
            completed: false,
            createdAt: Date.now()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.dispatchEvent('taskAdded', task);
        return task;
    }

    /**
     * Delete a task by ID
     */
    deleteTask(taskId) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index > -1) {
            const deletedTask = this.tasks.splice(index, 1)[0];
            this.saveTasks();
            this.dispatchEvent('taskDeleted', deletedTask);
            return true;
        }
        return false;
    }

    /**
     * Toggle task completion status
     */
    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.dispatchEvent('taskToggled', task);
            return task;
        }
        return null;
    }

    /**
     * Get all tasks
     */
    getAllTasks(filter = 'all') {
        if (filter === 'completed') {
            return this.tasks.filter(t => t.completed);
        } else if (filter === 'pending') {
            return this.tasks.filter(t => !t.completed);
        }
        return this.tasks;
    }

    /**
     * Get tasks by category
     */
    getTasksByCategory(category) {
        return this.tasks.filter(t => t.category === category);
    }

    /**
     * Get tasks for a specific date
     */
    getTasksByDate(date) {
        return this.tasks.filter(t => t.date === date);
    }

    /**
     * Get today's tasks
     */
    getTodayTasks() {
        const today = new Date().toISOString().split('T')[0];
        return this.getTasksByDate(today);
    }

    /**
     * Get upcoming tasks (next 7 days)
     */
    getUpcomingTasks(days = 7) {
        const today = new Date();
        const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
        
        return this.tasks.filter(t => {
            const taskDate = new Date(t.date);
            return taskDate >= today && taskDate <= futureDate && !t.completed;
        });
    }

    /**
     * Delete completed tasks (called at end of day)
     */
    deleteCompletedTasks() {
        const initialCount = this.tasks.length;
        this.tasks = this.tasks.filter(t => !t.completed);
        const deletedCount = initialCount - this.tasks.length;
        
        this.saveTasks();
        if (deletedCount > 0) {
            this.dispatchEvent('tasksCleared', { count: deletedCount });
        }
        return deletedCount;
    }

    /**
     * Clear old tasks from previous months
     */
    clearOldTasks() {
        const today = new Date();
        const currentMonth = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0');
        
        const initialCount = this.tasks.length;
        this.tasks = this.tasks.filter(t => t.date.startsWith(currentMonth) || new Date(t.date) > new Date(currentMonth + '-01'));
        const deletedCount = initialCount - this.tasks.length;
        
        this.saveTasks();
        if (deletedCount > 0) {
            this.dispatchEvent('oldTasksCleared', { count: deletedCount });
        }
        return deletedCount;
    }

    /**
     * Initialize smart automation
     */
    initializeAutomation() {
        // Check for daily cleanup at end of day (23:59)
        this.scheduleDailyCleanup();
        
        // Check for monthly cleanup at start of month
        this.scheduleMonthlyCleanup();
    }

    /**
     * Schedule daily cleanup of completed tasks
     */
    scheduleDailyCleanup() {
        const checkCleanup = () => {
            const now = new Date();
            const lastCleanup = localStorage.getItem('lastTaskCleanup');
            const today = now.toISOString().split('T')[0];
            
            // Only cleanup once per day
            if (lastCleanup !== today) {
                const hour = now.getHours();
                const minute = now.getMinutes();
                
                // If it's evening (after 6 PM), schedule cleanup for 23:59
                if (hour >= 18) {
                    this.scheduleCleanupAt(23, 59);
                }
            }
        };
        
        // Check every hour
        setInterval(checkCleanup, 60 * 60 * 1000);
    }

    /**
     * Schedule cleanup at specific time
     */
    scheduleCleanupAt(hour, minute) {
        const now = new Date();
        let cleanupTime = new Date();
        cleanupTime.setHours(hour, minute, 0, 0);
        
        // If the time has already passed today, schedule for tomorrow
        if (cleanupTime <= now) {
            cleanupTime.setDate(cleanupTime.getDate() + 1);
        }
        
        const timeUntilCleanup = cleanupTime - now;
        
        setTimeout(() => {
            this.deleteCompletedTasks();
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem('lastTaskCleanup', today);
        }, timeUntilCleanup);
    }

    /**
     * Schedule monthly cleanup
     */
    scheduleMonthlyCleanup() {
        const checkMonthly = () => {
            const now = new Date();
            const lastMonthlyCleanup = localStorage.getItem('lastMonthlyTaskCleanup');
            const currentMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
            
            // Only cleanup once per month
            if (lastMonthlyCleanup !== currentMonth) {
                this.clearOldTasks();
                localStorage.setItem('lastMonthlyTaskCleanup', currentMonth);
            }
        };
        
        // Check daily
        checkMonthly();
        setInterval(checkMonthly, 24 * 60 * 60 * 1000);
    }

    /**
     * Dispatch custom events
     */
    dispatchEvent(eventType, detail) {
        const event = new CustomEvent(`task:${eventType}`, { detail });
        document.dispatchEvent(event);
    }
}

// Global task manager instance
window.taskManager = new TaskManager();

// Expose functions globally for use in HTML
window.addTask = (taskData) => window.taskManager.addTask(taskData);
window.deleteTask = (taskId) => window.taskManager.deleteTask(taskId);
window.toggleTask = (taskId) => window.taskManager.toggleTaskCompletion(taskId);
window.getTasks = (filter) => window.taskManager.getAllTasks(filter);
window.getTodayTasks = () => window.taskManager.getTodayTasks();
window.getUpcomingTasks = (days) => window.taskManager.getUpcomingTasks(days);
