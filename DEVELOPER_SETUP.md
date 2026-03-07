# Developer Setup Guide

## 🚀 Quick Start for Developers

### Prerequisites
- Basic knowledge of HTML, CSS, JavaScript
- A code editor (VS Code recommended)
- A web browser (Chrome/Firefox for DevTools)
- Git (optional, for version control)

## 📥 Installation

### Option 1: Local Development
```bash
# Clone repository (if using Git)
git clone <repository-url>
cd portfolio

# Simply open in browser
# No npm install needed!
open index.html
# or
firefox index.html
# or
start index.html  # Windows
```

### Option 2: Using a Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📁 Project Structure

```
portfolio/
├── index.html              # Main entry point
├── README.md              # Project overview
├── QUICKSTART.md          # Quick start guide
├── FEATURES.md            # Complete features list
├── TESTING.md             # Testing checklist
├── ADVANCED_USAGE.md      # Advanced API docs
├── DEVELOPER_SETUP.md     # This file
│
├── css/
│   ├── styles.css         # Main styles
│   ├── tasks.css          # Task system styles
│   ├── responsive.css     # Responsive design
│   ├── language-styles.css # RTL/LTR styles
│   ├── style-switcher.css # Theme switcher
│   └── skins/
│       ├── color-1.css    # Theme 1
│       ├── color-2.css    # Theme 2
│       ├── color-3.css    # Theme 3
│       ├── color-4.css    # Theme 4
│       └── color-5.css    # Theme 5
│
├── js/
│   ├── script.js          # Main script
│   ├── languages.js       # Language system
│   ├── email-handler.js   # Contact form
│   ├── tasks.js           # Task management
│   ├── links.js           # Links manager
│   ├── calendar.js        # Calendar system
│   ├── ui-manager.js      # UI rendering
│   ├── performance.js     # Performance tools
│   ├── integration.js     # System integration
│   ├── statistics.js      # Analytics
│   └── style-switcher.js  # Theme switching
│
├── images/
│   ├── me.png             # Profile image
│   └── Certificate/       # Certificate images
│
└── files/
    └── Hamed_Abu_Sallam_CV.pdf  # CV file
```

## 🔧 Development Workflow

### 1. Setting Up Your Environment

#### VS Code Extensions (Recommended)
```
- Live Server (5 Star)
- Prettier - Code Formatter
- ESLint
- CSS Peek
- HTML CSS Support
- Thunder Client (for API testing)
```

#### Chrome DevTools
```
- Open with F12 or Ctrl+Shift+I (Windows)
- Open with Cmd+Option+I (Mac)
- Use Console tab for JavaScript debugging
- Use Network tab for performance analysis
```

### 2. Working with JavaScript Modules

Each system is a separate module:

```javascript
// To use the task manager
const taskManager = window.taskManager;
taskManager.addTask({
    title: "My Task",
    category: "projects"
});

// To use the calendar
const calendar = window.calendarManager;
calendar.getUpcomingEvents();

// To use statistics
const stats = window.statisticsManager;
stats.getOverallStats();

// To use integration
const integration = window.systemIntegration;
integration.getSystemStatus();
```

### 3. Console Testing

Test features directly in browser console (F12):

```javascript
// Test task creation
window.taskManager.addTask({
    title: "Test Task",
    category: "projects",
    date: "2024-01-20",
    priority: "high"
});

// Check all tasks
console.table(window.taskManager.getAllTasks());

// Get statistics
console.log(window.statisticsManager.getOverallStats());

// Check system health
console.log(window.systemIntegration.getSystemStatus());

// Monitor performance
window.performanceMonitor.logMetrics();

// Check storage
console.log(window.storageOptimizer.getStorageInfo());
```

## 🎯 Common Development Tasks

### Task 1: Add a New Task Category

**File**: `js/tasks.js`

```javascript
// Find: const categories = ['academy', 'freelance', 'support', 'projects', 'personal'];

// Update to:
const categories = ['academy', 'freelance', 'support', 'projects', 'personal', 'newcategory'];

// Also update in statistics.js if needed
const categories = {
    academy: {...},
    freelance: {...},
    support: {...},
    projects: {...},
    personal: {...},
    newcategory: { total: 0, completed: 0, pending: 0 }  // Add this
};
```

### Task 2: Add a New Social Link

**File**: `js/links.js`

```javascript
// Find the default links array:
const defaultLinks = [
    // ... existing links ...
];

// Add your new link:
{
    id: generateUUID(),
    name: "Your Platform",
    url: "https://your-platform.com/yourprofile",
    icon: "fab fa-your-icon",  // Font Awesome icon
    order: 9  // After existing links
}
```

### Task 3: Add New Language Translation

**File**: `js/languages.js`

```javascript
// Find the translations object:
const translations = {
    en: {
        // English translations
    },
    ar: {
        // Arabic translations
    }
};

// Add your translations:
translations.en.your_key = "Your English text";
translations.ar.your_key = "نصك العربي";

// Use in HTML:
<p data-lang-key="your_key"></p>
```

### Task 4: Create a New Color Theme

**File**: `css/skins/color-6.css`

```css
/* Copy from color-1.css and modify */
:root {
    --skin-color: #your-color;
    --skin-light: #lighter-shade;
    --skin-dark: #darker-shade;
    --text-black-900: #your-text-color;
    --text-black-700: #lighter-text;
}

/* Add theme to html */
```

**File**: `index.html`

```html
<!-- Add to color themes list -->
<link rel="stylesheet" href="css/skins/color-6.css" class="alternate-style" title="color-6" disabled>
```

## 🐛 Debugging Tips

### 1. Using Console Logs

```javascript
// Add debug logs in your code
console.log("[v0] User data received:", userData);
console.warn("[v0] Performance warning:", metric);
console.error("[v0] Error occurred:", error);

// Check debug logs in browser console
```

### 2. Using DevTools

```
- Elements tab: Inspect DOM structure
- Console tab: Execute JavaScript
- Network tab: Monitor HTTP requests
- Performance tab: Profile performance
- Storage tab: Check localStorage
- Application tab: View stored data
```

### 3. Checking Storage

```javascript
// View all localStorage data
console.table(localStorage);

// Check specific items
console.log(JSON.parse(localStorage.getItem('portfolio_tasks')));
console.log(JSON.parse(localStorage.getItem('portfolio_links')));

// Clear storage (careful!)
localStorage.clear();
```

## 📊 Performance Profiling

### Check Page Load Time

```javascript
// In console
console.log(window.performanceMonitor.metrics.pageLoadTime);
```

### Monitor Memory Usage

```javascript
// In console
console.log(window.performanceMonitor.metrics.memoryUsage);

// Watch memory growth
setInterval(() => {
    console.log(performance.memory.usedJSHeapSize);
}, 1000);
```

### Identify Bottlenecks

```javascript
// Use Performance API
performance.mark('start');
// ... code to measure ...
performance.mark('end');
performance.measure('My Measure', 'start', 'end');

// Check results
console.table(performance.getEntriesByType('measure'));
```

## 🔄 Git Workflow (If Using Git)

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make changes
git add .

# Commit changes
git commit -m "Add your feature"

# Push to remote
git push origin feature/your-feature

# Create pull request on GitHub
```

## 📝 Code Style Guide

### JavaScript
```javascript
// Use camelCase for variables
const myVariable = true;

// Use PascalCase for classes
class MyClass {
    constructor() {}
}

// Use kebab-case for CSS classes
<div class="my-class"></div>

// Use UPPER_SNAKE_CASE for constants
const MAX_TASKS = 1000;

// Add JSDoc comments
/**
 * Description of function
 * @param {type} paramName - Description
 * @returns {type} Description
 */
function myFunction(paramName) {
    return result;
}
```

### HTML
```html
<!-- Use semantic HTML -->
<section id="tasks">
    <h2>Tasks</h2>
    <article class="task-item">
        <!-- content -->
    </article>
</section>

<!-- Use data attributes for JavaScript hooks -->
<div data-lang-key="translation_key"></div>
<div data-task-id="123"></div>
```

### CSS
```css
/* Use consistent naming -->
.section-title {}
.task-item {}
.task-item--completed {}
.task-item__title {}

/* Mobile first, then larger screens */
.responsive-grid {
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

## 🧪 Testing Your Changes

### Manual Testing Checklist

```javascript
// After making changes, test:
[ ] Tasks still save/delete
[ ] Calendar still updates
[ ] Language switching works
[ ] Theme changes apply
[ ] Statistics calculate correctly
[ ] No console errors
[ ] Layout looks good on mobile
[ ] Forms still work
```

### Automated Testing

```javascript
// Test in console
function runTests() {
    // Test 1: Task creation
    try {
        window.taskManager.addTask({title: "Test"});
        console.log("✓ Task creation works");
    } catch(e) {
        console.error("✗ Task creation failed:", e);
    }
    
    // Test 2: Language switch
    try {
        window.setLanguage('ar');
        console.log("✓ Language switch works");
    } catch(e) {
        console.error("✗ Language switch failed:", e);
    }
    
    // Test 3: Storage
    try {
        const data = window.storageOptimizer.getStorageInfo();
        console.log("✓ Storage check works:", data);
    } catch(e) {
        console.error("✗ Storage check failed:", e);
    }
}

runTests();
```

## 🚀 Deployment

### Before Deployment

1. **Test everything**: Use TESTING.md checklist
2. **Check performance**: Load time < 3 seconds
3. **Verify all links**: Social links, CV download
4. **Test on mobile**: Use Chrome DevTools device mode
5. **Check console**: No errors or warnings
6. **Clear cache**: localStorage and browser cache
7. **Performance audit**: Run Lighthouse in DevTools

### Deployment Steps

```bash
# 1. Create production build folder
mkdir production
cp -r * production/

# 2. Minimize/optimize (optional)
# Use tools like:
# - HTML minifier
# - CSS minifier
# - JavaScript minifier

# 3. Upload to server
# Use FTP, SFTP, or Git push
# Keep the same folder structure

# 4. Test on live server
# Check all features work
# Verify URLs are correct
# Test contact form
```

### Server Requirements

- Web server supporting static files (Apache, Nginx, etc.)
- Support for .html, .css, .js files
- HTTPS enabled (for security)
- Gzip compression (for performance)

## 📚 Additional Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org) - JavaScript/CSS reference
- [Can I Use](https://caniuse.com) - Browser compatibility
- [Font Awesome Icons](https://fontawesome.com) - Icon reference

### Tools
- [VS Code](https://code.visualstudio.com) - Code editor
- [Chrome DevTools](https://developer.chrome.com/docs/devtools) - Debugging
- [WebAIM](https://webaim.org) - Accessibility
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit

### Learning
- [JavaScript.info](https://javascript.info) - Learn JavaScript
- [CSS-Tricks](https://css-tricks.com) - CSS tutorials
- [Web Dev](https://web.dev) - Web development

## 💡 Pro Tips for Developers

1. **Use VS Code Live Server**: Right-click HTML → "Open with Live Server"
2. **Use Browser Sync**: `npm install -g browser-sync` then `browser-sync start --server --files "**/*"`
3. **Test on Real Device**: Use phone to test responsive design
4. **Use Git**: Version control all changes
5. **Document Changes**: Keep notes of what you modify
6. **Create Backups**: Backup original files before major changes
7. **Use Console API**: Test features in console before implementing
8. **Monitor Performance**: Check metrics regularly
9. **Follow DRY Principle**: Don't Repeat Yourself
10. **Comment Complex Code**: Explain why, not what

## 🆘 Troubleshooting

### Tasks not appearing?
```javascript
// Check if tasks are saved
console.table(window.taskManager.getAllTasks());

// Check localStorage
console.log(localStorage.getItem('portfolio_tasks'));
```

### Calendar not updating?
```javascript
// Force refresh
window.calendarManager.refreshCalendar();

// Check system sync
window.systemIntegration.syncSystems();
```

### Performance issues?
```javascript
// Monitor memory
console.log(window.performanceMonitor.metrics.memoryUsage);

// Clear cache
window.cacheManager.clear();

// Clean old data
window.storageOptimizer.cleanOldData();
```

### Console errors?
```javascript
// Check system integrity
console.log(window.systemIntegration.validateIntegrity());

// Check health
console.log(window.systemIntegration.getSystemStatus());
```

## 🎓 Learning Path

### Beginner Developer
1. Understand HTML structure
2. Learn CSS styling
3. Learn JavaScript basics
4. Modify HTML content
5. Change CSS colors
6. Add JavaScript console commands

### Intermediate Developer
1. Add new features
2. Modify existing modules
3. Create custom themes
4. Add translations
5. Extend functionality
6. Debug with DevTools

### Advanced Developer
1. Refactor code
2. Create custom modules
3. Optimize performance
4. Add backend integration
5. Deploy to production
6. Monitor and maintain

---

**Happy Coding! 🚀**

Questions? Check the documentation files or use browser console to explore!
