/**
 * UI Manager - Handles rendering and updates of Tasks, Links, and Calendar
 */

class UIManager {
    constructor() {
        this.initializeEventListeners();
        this.renderAllContent();
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // Task events
        document.addEventListener('task:taskAdded', () => this.renderTasks());
        document.addEventListener('task:taskDeleted', () => this.renderTasks());
        document.addEventListener('task:taskToggled', () => this.renderTasks());

        // Links events
        document.addEventListener('links:linkUpdated', () => this.renderLinks());
        document.addEventListener('links:linkDeleted', () => this.renderLinks());

        // Calendar events
        document.addEventListener('calendar:monthChanged', (e) => this.renderCalendar(e.detail.data));

        // Navigation for calendar
        if (document.getElementById('prevMonth')) {
            document.getElementById('prevMonth').addEventListener('click', () => {
                window.previousMonth();
            });
        }
        if (document.getElementById('nextMonth')) {
            document.getElementById('nextMonth').addEventListener('click', () => {
                window.nextMonth();
            });
        }
    }

    /**
     * Render all content on page load
     */
    renderAllContent() {
        setTimeout(() => {
            this.renderTasks();
            this.renderLinks();
            this.renderCalendar();
            this.renderUpcomingEvents();
        }, 500);
    }

    /**
     * Render tasks list
     */
    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        if (!tasksList) return;

        const tasks = window.taskManager?.getTodayTasks() || [];
        
        if (tasks.length === 0) {
            tasksList.innerHTML = '<p style="text-align: center; color: var(--text-black-700); padding: 20px;">No tasks for today</p>';
            return;
        }

        tasksList.innerHTML = tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-content">
                    <div class="task-header">
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                               onchange="window.toggleTask('${task.id}'); window.renderTasks && window.renderTasks();">
                        <span class="task-title">${this.escapeHtml(task.title)}</span>
                        <span class="task-category">${task.category}</span>
                    </div>
                    ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                    <div class="task-meta">
                        <span><i class="fas fa-calendar"></i> ${task.date}</span>
                        <span><i class="fas fa-clock"></i> ${task.time}</span>
                        <span><i class="fas fa-hourglass"></i> ${task.duration}h</span>
                        <span><i class="fas fa-signal"></i> ${task.priority}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn delete" onclick="window.deleteTask('${task.id}'); window.renderTasks && window.renderTasks();">Delete</button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render links grid
     */
    renderLinks() {
        const linksGrid = document.getElementById('linksGrid');
        if (!linksGrid) return;

        const links = window.linksManager?.getLinks() || {};
        
        if (Object.keys(links).length === 0) {
            linksGrid.innerHTML = '<p style="text-align: center; color: var(--text-black-700);">No links available</p>';
            return;
        }

        linksGrid.innerHTML = Object.entries(links).map(([key, link]) => `
            <div class="link-card">
                <div class="link-icon">
                    <i class="${link.icon}"></i>
                </div>
                <div class="link-title">${this.escapeHtml(link.title)}</div>
                <div class="link-actions">
                    <button class="link-btn" onclick="window.copyLinkToClipboard('${this.escapeHtml(link.url)}'); alert('Copied!');">Copy</button>
                    <button class="link-btn secondary" onclick="window.generateQRCode('${this.escapeHtml(link.url)}', 'qr-${key}'); showQRModal('${key}');">QR</button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render calendar
     */
    renderCalendar(calendarData = null) {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        const data = calendarData || window.calendarManager?.getCalendarData();
        if (!data) return;

        const monthTitle = document.getElementById('monthTitle');
        if (monthTitle) {
            monthTitle.textContent = `${data.monthName} ${data.year}`;
        }

        // Day names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let html = '<div class="calendar-days-header">';
        dayNames.forEach(day => {
            html += `<div class="calendar-day-name">${day}</div>`;
        });
        html += '</div><div class="calendar-dates">';

        // Calendar dates
        data.weeks.forEach(week => {
            week.forEach(day => {
                if (!day) {
                    html += '<div class="calendar-date empty"></div>';
                } else {
                    const classes = ['calendar-date'];
                    if (day.isToday) classes.push('today');
                    if (day.hasTasks) classes.push('has-tasks');
                    
                    html += `<div class="${classes.join(' ')}" title="${day.tasksCount} tasks">${day.day}</div>`;
                }
            });
        });

        html += '</div>';
        calendarGrid.innerHTML = html;
    }

    /**
     * Render upcoming events
     */
    renderUpcomingEvents() {
        const upcomingEvents = document.getElementById('upcomingEvents');
        if (!upcomingEvents) return;

        const events = window.calendarManager?.getUpcomingEvents(7) || [];
        
        if (events.length === 0) {
            upcomingEvents.innerHTML = '<h4>Upcoming Events</h4><p style="color: var(--text-black-700);">No upcoming tasks</p>';
            return;
        }

        let html = '<h4>Upcoming Events (7 Days)</h4>';
        events.forEach(event => {
            html += `
                <div class="event-item">
                    <div class="event-date">${event.dayName} - ${event.month} ${event.dayOfMonth}${event.isToday ? ' (Today)' : ''}</div>
                    <div class="event-tasks">${event.pendingCount} pending task${event.pendingCount !== 1 ? 's' : ''}</div>
                </div>
            `;
        });

        upcomingEvents.innerHTML = html;
    }

    /**
     * Escape HTML special characters
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

/**
 * Handle adding a new task from form
 */
window.handleAddTask = function(event) {
    event.preventDefault();
    
    const title = document.getElementById('taskTitle')?.value;
    const category = document.getElementById('taskCategory')?.value || 'project';
    const description = document.getElementById('taskDescription')?.value;

    if (!title) return;

    window.taskManager?.addTask({
        title,
        category,
        description,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    });

    // Reset form
    document.getElementById('addTaskForm')?.reset();
};

/**
 * Show QR code modal (placeholder)
 */
window.showQRModal = function(linkKey) {
    const title = window.linksManager?.getLinks()[linkKey]?.title;
    alert(`QR Code for ${title} generated! (In a real app, this would show in a modal)`);
};

/**
 * Render tasks function for global access
 */
window.renderTasks = function() {
    if (window.uiManager) {
        window.uiManager.renderTasks();
    }
};

/**
 * Initialize UI Manager when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    window.uiManager = new UIManager();
});
