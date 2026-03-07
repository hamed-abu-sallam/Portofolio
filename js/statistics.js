/**
 * Statistics & Analytics Module
 * Provides detailed insights into task management and productivity
 */

class StatisticsManager {
    constructor() {
        this.taskManager = null;
        this.initialized = false;
    }

    /**
     * Initialize with task manager
     */
    init(taskManager) {
        this.taskManager = taskManager;
        this.initialized = true;
        console.log('[Statistics] Module initialized');
    }

    /**
     * Get overall statistics
     */
    getOverallStats() {
        if (!this.initialized) return null;

        const allTasks = this.taskManager.getAllTasks();
        const completedTasks = allTasks.filter(t => t.completed);
        const pendingTasks = allTasks.filter(t => !t.completed);

        return {
            totalTasks: allTasks.length,
            completedTasks: completedTasks.length,
            pendingTasks: pendingTasks.length,
            completionRate: allTasks.length > 0 ? (completedTasks.length / allTasks.length * 100).toFixed(1) : 0,
            averageTasksPerDay: this.getAverageTasksPerDay(),
            mostBusyDay: this.getMostBusyDay(),
            leastBusyDay: this.getLeastBusyDay()
        };
    }

    /**
     * Get completion statistics
     */
    getCompletionStats() {
        const allTasks = this.taskManager.getAllTasks();
        const today = new Date().toISOString().split('T')[0];

        const stats = {
            today: {
                total: 0,
                completed: 0,
                pending: 0,
                completionRate: 0
            },
            thisWeek: {
                total: 0,
                completed: 0,
                pending: 0,
                completionRate: 0
            },
            thisMonth: {
                total: 0,
                completed: 0,
                pending: 0,
                completionRate: 0
            },
            overdue: {
                total: 0,
                completionRate: 0
            }
        };

        const todayDate = new Date(today);
        const weekStart = new Date(todayDate);
        weekStart.setDate(todayDate.getDate() - todayDate.getDay());
        const monthStart = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);

        allTasks.forEach(task => {
            const taskDate = new Date(task.date);

            // Today
            if (task.date === today) {
                stats.today.total++;
                if (task.completed) stats.today.completed++;
                else stats.today.pending++;
            }

            // This week
            if (taskDate >= weekStart && taskDate <= todayDate) {
                stats.thisWeek.total++;
                if (task.completed) stats.thisWeek.completed++;
                else stats.thisWeek.pending++;
            }

            // This month
            if (taskDate >= monthStart && taskDate <= todayDate) {
                stats.thisMonth.total++;
                if (task.completed) stats.thisMonth.completed++;
                else stats.thisMonth.pending++;
            }

            // Overdue (before today and not completed)
            if (taskDate < todayDate && !task.completed) {
                stats.overdue.total++;
            }
        });

        // Calculate completion rates
        Object.keys(stats).forEach(period => {
            if (stats[period].total > 0) {
                stats[period].completionRate = 
                    ((stats[period].completed || 0) / stats[period].total * 100).toFixed(1);
            }
        });

        return stats;
    }

    /**
     * Get category-based statistics
     */
    getCategoryStats() {
        const allTasks = this.taskManager.getAllTasks();
        const categories = {
            academy: { total: 0, completed: 0, pending: 0 },
            freelance: { total: 0, completed: 0, pending: 0 },
            support: { total: 0, completed: 0, pending: 0 },
            projects: { total: 0, completed: 0, pending: 0 },
            personal: { total: 0, completed: 0, pending: 0 }
        };

        allTasks.forEach(task => {
            const cat = task.category;
            if (categories[cat]) {
                categories[cat].total++;
                if (task.completed) categories[cat].completed++;
                else categories[cat].pending++;
            }
        });

        // Calculate completion rates
        Object.keys(categories).forEach(cat => {
            if (categories[cat].total > 0) {
                categories[cat].completionRate = 
                    (categories[cat].completed / categories[cat].total * 100).toFixed(1);
            } else {
                categories[cat].completionRate = 0;
            }
        });

        return categories;
    }

    /**
     * Get priority-based statistics
     */
    getPriorityStats() {
        const allTasks = this.taskManager.getAllTasks();
        const priorities = {
            low: { total: 0, completed: 0 },
            medium: { total: 0, completed: 0 },
            high: { total: 0, completed: 0 }
        };

        allTasks.forEach(task => {
            const priority = task.priority || 'medium';
            if (priorities[priority]) {
                priorities[priority].total++;
                if (task.completed) priorities[priority].completed++;
            }
        });

        return priorities;
    }

    /**
     * Get time-based statistics
     */
    getTimeStats() {
        const allTasks = this.taskManager.getAllTasks();
        let totalDuration = 0;
        let completedDuration = 0;
        let taskCount = 0;

        allTasks.forEach(task => {
            const duration = task.duration || 0;
            totalDuration += duration;
            taskCount++;
            if (task.completed) {
                completedDuration += duration;
            }
        });

        return {
            totalMinutes: totalDuration,
            totalHours: (totalDuration / 60).toFixed(1),
            completedMinutes: completedDuration,
            completedHours: (completedDuration / 60).toFixed(1),
            remainingMinutes: totalDuration - completedDuration,
            remainingHours: ((totalDuration - completedDuration) / 60).toFixed(1),
            averageDuration: taskCount > 0 ? (totalDuration / taskCount).toFixed(1) : 0
        };
    }

    /**
     * Get daily breakdown
     */
    getDailyBreakdown(days = 30) {
        const allTasks = this.taskManager.getAllTasks();
        const breakdown = {};

        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            breakdown[dateStr] = {
                total: 0,
                completed: 0,
                pending: 0
            };
        }

        allTasks.forEach(task => {
            if (breakdown[task.date]) {
                breakdown[task.date].total++;
                if (task.completed) breakdown[task.date].completed++;
                else breakdown[task.date].pending++;
            }
        });

        return breakdown;
    }

    /**
     * Get weekly pattern
     */
    getWeeklyPattern() {
        const allTasks = this.taskManager.getAllTasks();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const pattern = {};

        daysOfWeek.forEach(day => {
            pattern[day] = { total: 0, completed: 0 };
        });

        allTasks.forEach(task => {
            const date = new Date(task.date);
            const day = daysOfWeek[date.getDay()];
            if (pattern[day]) {
                pattern[day].total++;
                if (task.completed) pattern[day].completed++;
            }
        });

        return pattern;
    }

    /**
     * Get average tasks per day
     */
    getAverageTasksPerDay() {
        const breakdown = this.getDailyBreakdown();
        const totalDays = Object.keys(breakdown).length;
        const totalTasks = Object.values(breakdown).reduce((sum, day) => sum + day.total, 0);
        return totalDays > 0 ? (totalTasks / totalDays).toFixed(1) : 0;
    }

    /**
     * Get most busy day
     */
    getMostBusyDay() {
        const breakdown = this.getDailyBreakdown();
        let maxTasks = 0;
        let busyDay = null;

        Object.entries(breakdown).forEach(([date, data]) => {
            if (data.total > maxTasks) {
                maxTasks = data.total;
                busyDay = date;
            }
        });

        return { date: busyDay, taskCount: maxTasks };
    }

    /**
     * Get least busy day
     */
    getLeastBusyDay() {
        const breakdown = this.getDailyBreakdown();
        let minTasks = Infinity;
        let quietDay = null;

        Object.entries(breakdown).forEach(([date, data]) => {
            if (data.total > 0 && data.total < minTasks) {
                minTasks = data.total;
                quietDay = date;
            }
        });

        return { date: quietDay, taskCount: minTasks === Infinity ? 0 : minTasks };
    }

    /**
     * Get productivity trend
     */
    getProductivityTrend(days = 30) {
        const breakdown = this.getDailyBreakdown(days);
        const trend = [];

        Object.entries(breakdown).forEach(([date, data]) => {
            const completionRate = data.total > 0 ? (data.completed / data.total * 100).toFixed(1) : 0;
            trend.push({
                date,
                total: data.total,
                completed: data.completed,
                completionRate
            });
        });

        return trend;
    }

    /**
     * Get top active categories
     */
    getTopCategories() {
        const categoryStats = this.getCategoryStats();
        const sorted = Object.entries(categoryStats)
            .sort((a, b) => b[1].total - a[1].total)
            .slice(0, 3)
            .map(([cat, stats]) => ({ category: cat, ...stats }));

        return sorted;
    }

    /**
     * Get performance insights
     */
    getInsights() {
        const overall = this.getOverallStats();
        const completion = this.getCompletionStats();
        const timeStats = this.getTimeStats();
        const categoryStats = this.getCategoryStats();

        const insights = [];

        // Insight 1: Overall productivity
        if (overall.completionRate >= 80) {
            insights.push({
                type: 'success',
                message: `🎉 Excellent! You have ${overall.completionRate}% completion rate`,
                priority: 'high'
            });
        } else if (overall.completionRate >= 50) {
            insights.push({
                type: 'info',
                message: `📊 Good progress with ${overall.completionRate}% completion rate`,
                priority: 'medium'
            });
        } else if (overall.totalTasks > 0) {
            insights.push({
                type: 'warning',
                message: `⚠️ Only ${overall.completionRate}% tasks completed, let's boost it!`,
                priority: 'high'
            });
        }

        // Insight 2: Overdue tasks
        if (completion.overdue.total > 0) {
            insights.push({
                type: 'danger',
                message: `🚨 ${completion.overdue.total} overdue tasks need attention`,
                priority: 'high'
            });
        }

        // Insight 3: Most productive category
        const topCategory = Object.entries(categoryStats)
            .sort((a, b) => b[1].total - a[1].total)[0];
        if (topCategory) {
            insights.push({
                type: 'info',
                message: `📌 ${topCategory[0]} is your most active category (${topCategory[1].total} tasks)`,
                priority: 'low'
            });
        }

        // Insight 4: Time estimation
        if (timeStats.totalHours > 0) {
            insights.push({
                type: 'info',
                message: `⏱️ Total estimated time: ${timeStats.totalHours} hours across ${overall.totalTasks} tasks`,
                priority: 'medium'
            });
        }

        // Insight 5: Weekly trend
        if (overall.averageTasksPerDay > 0) {
            insights.push({
                type: 'info',
                message: `📈 Average ${overall.averageTasksPerDay} tasks per day`,
                priority: 'low'
            });
        }

        return insights;
    }

    /**
     * Export statistics as JSON
     */
    exportStats() {
        return {
            exported: new Date().toISOString(),
            overall: this.getOverallStats(),
            completion: this.getCompletionStats(),
            categories: this.getCategoryStats(),
            priorities: this.getPriorityStats(),
            time: this.getTimeStats(),
            dailyBreakdown: this.getDailyBreakdown(),
            weeklyPattern: this.getWeeklyPattern(),
            trends: this.getProductivityTrend(),
            insights: this.getInsights()
        };
    }

    /**
     * Generate CSV report
     */
    generateCSVReport() {
        const allTasks = this.taskManager.getAllTasks();
        let csv = 'ID,Title,Category,Status,Date,Time,Duration,Priority\n';

        allTasks.forEach(task => {
            const status = task.completed ? 'Completed' : 'Pending';
            csv += `${task.id},"${task.title}",${task.category},${status},${task.date},${task.time},${task.duration},${task.priority}\n`;
        });

        return csv;
    }

    /**
     * Download CSV report
     */
    downloadCSVReport() {
        const csv = this.generateCSVReport();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasks-report-${Date.now()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Get health score (0-100)
     */
    getHealthScore() {
        const overall = this.getOverallStats();
        const completion = this.getCompletionStats();
        
        let score = 50; // Base score

        // Completion rate (0-30 points)
        score += (overall.completionRate / 100) * 30;

        // No overdue tasks (0-20 points)
        if (completion.overdue.total === 0) {
            score += 20;
        } else {
            score -= Math.min(completion.overdue.total * 5, 20);
        }

        // Daily consistency (0-20 points)
        const dailyStats = this.getDailyBreakdown();
        const daysWithTasks = Object.values(dailyStats).filter(d => d.total > 0).length;
        score += (daysWithTasks / 30) * 20;

        return Math.min(100, Math.max(0, score)).toFixed(1);
    }
}

// Initialize statistics manager globally
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.statisticsManager = new StatisticsManager();
    });
} else {
    window.statisticsManager = new StatisticsManager();
}

// Expose class globally
window.StatisticsManager = StatisticsManager;

console.log('[Statistics] Module loaded');
