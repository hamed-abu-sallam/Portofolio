/**
 * Calendar & Task Scheduling System
 * Displays calendar with task indicators and upcoming events
 */

class CalendarManager {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = new Date();
    }

    /**
     * Get calendar data for current month
     */
    getCalendarData(year = null, month = null) {
        if (year === null) year = this.currentDate.getFullYear();
        if (month === null) month = this.currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const weeks = [];
        let week = new Array(startingDayOfWeek).fill(null);

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayTasks = window.taskManager?.getTasksByDate(dateStr) || [];
            const hasCompletedTasks = dayTasks.some(t => t.completed);
            const hasPendingTasks = dayTasks.some(t => !t.completed);

            week.push({
                day,
                date: dateStr,
                dayOfWeek: date.getDay(),
                tasksCount: dayTasks.length,
                pendingCount: dayTasks.filter(t => !t.completed).length,
                completedCount: dayTasks.filter(t => t.completed).length,
                hasTasks: dayTasks.length > 0,
                hasCompleted: hasCompletedTasks,
                hasPending: hasPendingTasks,
                tasks: dayTasks,
                isToday: this.isToday(date)
            });

            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        }

        // Fill remaining days with null if needed
        if (week.length > 0) {
            while (week.length < 7) {
                week.push(null);
            }
            weeks.push(week);
        }

        return {
            year,
            month,
            monthName: this.getMonthName(month),
            yearMonthStr: `${year}-${String(month + 1).padStart(2, '0')}`,
            weeks,
            daysInMonth
        };
    }

    /**
     * Check if date is today
     */
    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    /**
     * Get month name
     */
    getMonthName(monthIndex) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    }

    /**
     * Get week day name
     */
    getWeekDayName(dayIndex) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayIndex];
    }

    /**
     * Navigate to next month
     */
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }

    /**
     * Navigate to previous month
     */
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }

    /**
     * Navigate to today
     */
    goToToday() {
        this.currentDate = new Date();
    }

    /**
     * Get upcoming events for next N days
     */
    getUpcomingEvents(days = 7) {
        const upcoming = [];
        const today = new Date();

        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            const dayTasks = window.taskManager?.getTasksByDate(dateStr) || [];
            if (dayTasks.length > 0) {
                upcoming.push({
                    date: dateStr,
                    dayName: this.getWeekDayName(date.getDay()),
                    dayOfMonth: date.getDate(),
                    month: this.getMonthName(date.getMonth()),
                    tasks: dayTasks,
                    pendingCount: dayTasks.filter(t => !t.completed).length,
                    isToday: this.isToday(date)
                });
            }
        }

        return upcoming;
    }

    /**
     * Get month statistics
     */
    getMonthStatistics(year = null, month = null) {
        if (year === null) year = this.currentDate.getFullYear();
        if (month === null) month = this.currentDate.getMonth();

        const calendarData = this.getCalendarData(year, month);
        let totalTasks = 0;
        let completedTasks = 0;
        let daysWithTasks = 0;

        calendarData.weeks.forEach(week => {
            week.forEach(day => {
                if (day && day.hasTasks) {
                    daysWithTasks++;
                    totalTasks += day.tasksCount;
                    completedTasks += day.completedCount;
                }
            });
        });

        return {
            month: calendarData.monthName,
            year,
            daysWithTasks,
            totalTasks,
            completedTasks,
            pendingTasks: totalTasks - completedTasks,
            completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        };
    }

    /**
     * Get tasks for specific date
     */
    getDateTasks(date) {
        return window.taskManager?.getTasksByDate(date) || [];
    }

    /**
     * Check if specific date is selected
     */
    isSelectedDate(date) {
        const selected = this.selectedDate.toISOString().split('T')[0];
        return date === selected;
    }

    /**
     * Select a specific date
     */
    selectDate(dateStr) {
        this.selectedDate = new Date(dateStr);
        this.dispatchEvent('dateSelected', { date: dateStr });
    }

    /**
     * Dispatch custom events
     */
    dispatchEvent(eventType, detail) {
        const event = new CustomEvent(`calendar:${eventType}`, { detail });
        document.dispatchEvent(event);
    }
}

// Global calendar manager instance
window.calendarManager = new CalendarManager();

// Expose functions globally
window.getCalendarData = (year, month) => window.calendarManager.getCalendarData(year, month);
window.getUpcomingEvents = (days) => window.calendarManager.getUpcomingEvents(days);
window.getCalendarStatistics = (year, month) => window.calendarManager.getMonthStatistics(year, month);
window.getDateTasks = (date) => window.calendarManager.getDateTasks(date);
window.nextMonth = () => {
    window.calendarManager.nextMonth();
    window.calendarManager.dispatchEvent('monthChanged', { 
        data: window.calendarManager.getCalendarData() 
    });
};
window.previousMonth = () => {
    window.calendarManager.previousMonth();
    window.calendarManager.dispatchEvent('monthChanged', { 
        data: window.calendarManager.getCalendarData() 
    });
};
window.goToToday = () => {
    window.calendarManager.goToToday();
    window.calendarManager.dispatchEvent('monthChanged', { 
        data: window.calendarManager.getCalendarData() 
    });
};
