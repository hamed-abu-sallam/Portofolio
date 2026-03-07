# Advanced Usage Guide

## System Integration API

The portfolio now includes a comprehensive system integration layer that coordinates all features and systems.

### Accessing the Integration Manager

```javascript
// Global access to integration manager
const integration = window.systemIntegration;

// Get full system status
const status = integration.getSystemStatus();
console.log(status);
// Returns:
// {
//   initialized: true,
//   timestamp: "2024-01-15T10:30:00Z",
//   integrity: {...},
//   statistics: {...},
//   upcomingEvents: [...],
//   storageInfo: {...},
//   performance: {...}
// }
```

### Task Management API

```javascript
// Get task manager
const taskManager = window.taskManager;

// Create a new task
taskManager.addTask({
    title: "Complete project",
    category: "projects",  // academy, freelance, support, projects, personal
    description: "Finish the design phase",
    date: "2024-01-20",
    time: "14:30",
    duration: 120,
    priority: "high"
});

// Get all tasks
const allTasks = taskManager.getAllTasks();

// Get today's tasks
const todayTasks = taskManager.getTodayTasks();

// Toggle task completion
taskManager.toggleTask(taskId);

// Delete a task
taskManager.deleteTask(taskId);

// Filter tasks by category
const projectTasks = taskManager.getTasksByCategory("projects");

// Search tasks
const results = taskManager.searchTasks("keyword");

// Get task statistics
const stats = taskManager.getStatistics();
```

### Calendar API

```javascript
// Get calendar manager
const calendarManager = window.calendarManager;

// Get calendar data
const calendarData = calendarManager.getCalendarData();

// Get upcoming events (next 7 days)
const upcomingEvents = calendarManager.getUpcomingEvents();

// Navigate to specific month
calendarManager.goToMonth(2024, 3); // March 2024

// Get month data
const monthData = calendarManager.getMonthData(2024, 3);

// Check if date has tasks
const hasTasks = calendarManager.hasTasks("2024-01-20");

// Get tasks for specific date
const dateTasks = calendarManager.getTasksForDate("2024-01-20");
```

### Links Management API

```javascript
// Get links manager
const linksManager = window.linksManager;

// Get all links
const links = linksManager.getLinks();

// Add a new link
linksManager.addLink({
    name: "Portfolio",
    url: "https://portfolio.com",
    icon: "fas fa-globe"
});

// Delete a link
linksManager.deleteLink(linkId);

// Update a link
linksManager.updateLink(linkId, {
    name: "Updated Name",
    url: "https://new-url.com"
});

// Copy link to clipboard
linksManager.copyToClipboard("https://portfolio.com");

// Get link by ID
const link = linksManager.getLinkById(linkId);
```

### Language Management

```javascript
// Get language manager
const languageManager = window.languageManager;

// Get current language
const currentLang = languageManager.getCurrentLanguage();

// Set language
languageManager.setLanguage('ar'); // or 'en'

// Get all translation keys
const keys = languageManager.getAvailableKeys();

// Get translation
const text = languageManager.translate('nav_home');

// Add custom translation
languageManager.addTranslation('custom_key', 'en', 'Custom Text');
languageManager.addTranslation('custom_key', 'ar', 'نص مخصص');

// Get all translations for a language
const enTranslations = languageManager.getLanguageTranslations('en');
```

### Performance Monitoring

```javascript
// Get performance monitor
const perfMonitor = window.performanceMonitor;

// Get all metrics
const metrics = perfMonitor.getMetrics();
console.log(metrics);

// Check memory usage
if (perfMonitor.metrics.memoryUsage) {
    console.log(perfMonitor.metrics.memoryUsage);
}

// Debounce function
const debouncedSearch = window.debounce(function(query) {
    console.log("Searching for:", query);
}, 300);

// Throttle function
const throttledScroll = window.throttle(function() {
    console.log("Scrolling...");
}, 100);

// Log all metrics
perfMonitor.logMetrics();
```

### Storage Management

```javascript
// Get storage optimizer
const storage = window.storageOptimizer;

// Check storage size
const sizeInfo = storage.getStorageSize(); // bytes

// Check if full
const isFull = storage.isStorageFull();

// Get storage info
const info = storage.getStorageInfo();
// Returns: { used: "245KB", limit: "5MB", percentage: "4.9%", isFull: false }

// Clean old data
storage.cleanOldData();

// Export data for backup
const backup = storage.exportData();
console.log(backup); // JSON string

// Import data from backup
const success = storage.importData(backupJson);
```

### Event Management

```javascript
// Get event manager
const eventMgr = window.eventManager;

// Add delegated event listener
eventMgr.on('.task-item', 'click', function(e) {
    console.log("Clicked task:", this);
});

// Get listener count
const count = eventMgr.getListenerCount();
console.log(`${count} event listeners active`);
```

### Cache Management

```javascript
// Get cache manager
const cache = window.cacheManager;

// Set cache value (no TTL)
cache.set('user_data', { name: 'John' });

// Set cache with 5-minute TTL
cache.set('temp_data', { value: 123 }, 300);

// Get from cache
const data = cache.get('user_data');

// Check if exists
if (cache.has('user_data')) {
    console.log("Data is cached");
}

// Get cache size
console.log(`${cache.size()} items cached`);

// Clear all cache
cache.clear();
```

## Event Bus Usage

The system uses an event bus for inter-component communication:

```javascript
// Subscribe to event
window.systemIntegration.eventBus.on('task:added', (task) => {
    console.log('New task:', task);
});

// Emit custom event
window.systemIntegration.eventBus.emit('custom:event', { data: 'value' });

// Get all events
const events = window.systemIntegration.eventBus.getEvents();
console.log(events);

// Unsubscribe
window.systemIntegration.eventBus.off('task:added', callback);
```

## System Health Check

```javascript
// Initialize health check
const healthCheck = new HealthCheck(window.systemIntegration);

// Start periodic checks (every minute)
healthCheck.start();

// Get current health status
const health = healthCheck.getHealth();
console.log(health);

// Manual health check
healthCheck.performHealthCheck();
```

## Data Backup & Restore

```javascript
// Export all data
const backup = window.storageOptimizer.exportData();

// Save to file (in browser)
const blob = new Blob([backup], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `portfolio-backup-${Date.now()}.json`;
a.click();

// Restore from file
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const success = window.storageOptimizer.importData(event.target.result);
        if (success) {
            alert('Data restored successfully!');
            window.location.reload();
        }
    };
    reader.readAsText(file);
});
fileInput.click();
```

## Task Automation Examples

```javascript
// Auto-create daily standup task
function createDailyStandup() {
    const today = new Date().toISOString().split('T')[0];
    window.taskManager.addTask({
        title: "Daily Standup",
        category: "support",
        date: today,
        time: "09:00",
        duration: 15,
        priority: "high"
    });
}

// Recurring task creation
function createWeeklyTask(title, day) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Implementation to create recurring task
}

// Task completion tracking
function getCompletionRate() {
    const tasks = window.taskManager.getAllTasks();
    const completed = tasks.filter(t => t.completed).length;
    return (completed / tasks.length) * 100;
}

// Get productivity statistics
function getProductivityStats() {
    const taskStats = window.systemIntegration.getTaskStatistics();
    console.log(`Total tasks: ${taskStats.total}`);
    console.log(`Completed: ${taskStats.completed}`);
    console.log(`Pending: ${taskStats.pending}`);
    console.log(`Categories:`, taskStats.categories);
}
```

## Performance Optimization Tips

### 1. Lazy Load Tasks
```javascript
// Only load tasks when section is visible
const taskSection = document.getElementById('tasks');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        window.taskManager.getTodayTasks();
        observer.unobserve(taskSection);
    }
});
observer.observe(taskSection);
```

### 2. Debounce Search
```javascript
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', window.debounce((e) => {
    const results = window.taskManager.searchTasks(e.target.value);
    console.log(results);
}, 300));
```

### 3. Batch Updates
```javascript
// Don't update individually
// BAD: for each task update separately
for (const task of tasks) {
    taskManager.toggleTask(task.id); // Triggers UI updates each time
}

// GOOD: batch the updates
const updates = tasks.map(t => ({...t, completed: true}));
// Then update UI once
```

## Debugging Commands

```javascript
// Check system status
console.table(window.systemIntegration.getSystemStatus());

// Validate all systems
const integrity = window.systemIntegration.validateIntegrity();
console.log(integrity);

// Check storage
console.table(window.storageOptimizer.getStorageInfo());

// Monitor memory
console.log(window.performanceMonitor.metrics.memoryUsage);

// Get all tasks
console.table(window.taskManager.getAllTasks());

// Get upcoming events
console.table(window.calendarManager.getUpcomingEvents());

// Check event listeners
console.log(`Active listeners: ${window.eventManager.getListenerCount()}`);

// Emergency reset
window.systemIntegration.emergencyReset();
```

## Custom Integrations

You can extend the system with custom integrations:

```javascript
// Create custom integration
class CustomIntegration {
    init(systemIntegration) {
        this.integration = systemIntegration;
        
        // Subscribe to events
        this.integration.eventBus.on('task:added', this.onTaskAdded.bind(this));
    }
    
    onTaskAdded(task) {
        console.log('Custom handler:', task);
    }
}

// Initialize
const customIntegration = new CustomIntegration();
customIntegration.init(window.systemIntegration);
```

## Performance Benchmarks

Monitor these key metrics:

- **Page Load**: < 3 seconds
- **Task Creation**: < 500ms
- **Calendar Render**: < 300ms
- **Language Switch**: < 200ms
- **Search**: < 100ms

## Troubleshooting

### Tasks not saving?
```javascript
// Check localStorage
console.log(localStorage.getItem('portfolio_tasks'));

// Check integrity
console.log(window.systemIntegration.validateIntegrity());

// Manual save
localStorage.setItem('portfolio_tasks', JSON.stringify(tasks));
```

### Calendar not updating?
```javascript
// Refresh calendar
window.calendarManager.refreshCalendar();

// Sync with tasks
window.systemIntegration.syncSystems();

// Clear calendar cache
window.cacheManager.clear();
```

### Memory leaks?
```javascript
// Monitor memory
window.performanceMonitor.logMetrics();

// Clear old data
window.storageOptimizer.cleanOldData();

// Clear cache
window.cacheManager.clear();
```

## Best Practices

1. **Always use the integration manager** for system-wide operations
2. **Subscribe to events** instead of polling
3. **Use debounce/throttle** for frequent operations
4. **Monitor performance** metrics regularly
5. **Keep localStorage clean** with monthly cleanup
6. **Backup data** regularly
7. **Use cache** for repeated operations
8. **Handle errors** gracefully
9. **Test across browsers** for compatibility
10. **Document custom integrations** for maintainability
