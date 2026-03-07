# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Open the Portfolio
Simply open `index.html` in your web browser. No server or build process needed!

```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
firefox index.html
```

### 2. Switch Language
- Click **AR** button for Arabic (RTL)
- Click **EN** button for English (LTR)

The entire interface switches instantly!

## Core Features

### 📋 Task Management

**Create a Task:**
1. Click **Tasks** in navigation
2. Fill in the task details:
   - **Title**: What needs to be done
   - **Category**: Pick one (academy, freelance, support, projects)
   - **Date & Time**: When it's due
   - **Duration**: How long it takes (minutes)
   - **Priority**: How urgent (low, medium, high)
3. Click **Add Task**

**Complete Tasks:**
- Check the checkbox to mark complete
- Completed tasks appear faded
- They auto-delete at end of day (23:59)

**View Tasks:**
- See today's tasks in the Tasks section
- See upcoming tasks in Calendar section

### 📅 Calendar

**View Calendar:**
1. Click **Calendar** in navigation
2. See the current month with task indicators
3. Days with tasks show a dot (•)

**Navigate:**
- Click **← →** arrows to go to previous/next month
- Click on a date to see tasks for that day

**Upcoming Events:**
- See next 7 days in the sidebar
- Shows count of pending tasks per day

### 🔗 Social Links

**View Links:**
1. Click **Links** in navigation
2. See all 8 social media links with icons

**Copy Link:**
- Click the **Copy** button on any link
- Link is copied to your clipboard
- Paste anywhere you need it

**Generate QR Code:**
- Click the **QR** button to generate QR code
- Scan with your phone camera
- Link opens on your device

### 💬 Contact

**Send Message:**
1. Click **Contact** in navigation
2. Fill in your details
3. Write your message
4. Click **Send Message**

Your email will be sent to the portfolio owner!

## Console API (Advanced)

Want to use JavaScript console? Try these:

```javascript
// Quick commands
window.taskManager.addTask({title: "Test", category: "projects"})
window.calendarManager.getUpcomingEvents()
window.linksManager.getLinks()
window.systemIntegration.getSystemStatus()
```

## Theme & Colors

**Change Colors:**
1. Click the **⚙️** icon (gear) in bottom right
2. Select from 5 color themes
3. Your choice is saved

**Dark/Light Mode:**
1. Click the **☀️/🌙** icon to toggle
2. Preference is saved

## Data Storage

All your data is saved locally in your browser:
- ✅ Tasks save automatically
- ✅ Links are persistent
- ✅ Language preference remembered
- ✅ Color theme saved

**Privacy:** Your data never leaves your device!

## Troubleshooting

### Tasks not showing?
1. Click **Tasks** section
2. Refresh the page (Ctrl+R or Cmd+R)
3. Check browser console for errors

### Calendar empty?
1. Create a task first
2. Calendar will populate when tasks exist
3. Tasks show on their due date

### Can't send email?
1. Check that you filled all form fields
2. Verify email format is correct
3. Check your spam folder

### Symbols not showing?
1. Switch to English or Arabic
2. Refresh page
3. Clear browser cache

## Mobile Tips

### On Phone/Tablet:
- Tap the **☰** menu icon to open navigation
- Tap a link to close the menu
- Tap and hold for longer options
- Pinch to zoom in/out

### Responsive Design:
- Works on any screen size
- Optimized for mobile-first experience
- No horizontal scrolling needed

## Keyboard Shortcuts

- **Tab**: Navigate between elements
- **Enter**: Click buttons and links
- **Esc**: Close menus/modals (when implemented)

## Data Management

### Export Your Data:
```javascript
// In browser console
const backup = window.storageOptimizer.exportData();
console.log(backup); // Copy and save to file
```

### Import Data:
```javascript
// Load from saved JSON file
window.storageOptimizer.importData(jsonString);
```

### Clear Everything:
```javascript
// In browser console (careful!)
window.systemIntegration.emergencyReset();
```

## Common Tasks

### Add 5 Tasks Quickly
```javascript
// Paste in console
['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'].forEach(t => {
    window.taskManager.addTask({title: t, category: 'projects'})
});
```

### Check All Tasks
```javascript
// In console
console.table(window.taskManager.getAllTasks());
```

### Delete All Tasks
```javascript
// In console
window.taskManager.getAllTasks().forEach(t => {
    window.taskManager.deleteTask(t.id);
});
```

### View All Links
```javascript
// In console
console.table(window.linksManager.getLinks());
```

## Performance

The portfolio is optimized for speed:
- ⚡ Loads in under 3 seconds
- 💨 No heavy dependencies
- 🎯 Instant task operations
- 📦 Small file sizes

## Support

### Need Help?
1. Check the README.md
2. See TESTING.md for detailed features
3. Check ADVANCED_USAGE.md for API docs
4. Open browser console (F12) for logs

### Reporting Issues
Include:
- Browser name and version
- Steps to reproduce
- What you expected vs what happened
- Any console errors

## File Structure

```
portfolio/
├── index.html          ← Open this file
├── css/               ← Styles
│   └── skins/        ← Color themes
├── js/               ← JavaScript
│   ├── tasks.js      ← Task management
│   ├── calendar.js   ← Calendar system
│   ├── links.js      ← Links & QR codes
│   └── ... (other systems)
├── images/          ← Portfolio images
└── files/          ← Downloads (CV, etc)
```

## What's New (v2.0)

✨ **New Features Added:**
- 📝 Task Management System
- 📅 Smart Calendar View
- 🔗 Social Links Manager
- 🔄 Automated Task Cleanup
- 🎯 System Integration Layer
- 📊 Performance Monitoring

🔧 **Improvements:**
- Better multi-language support
- Responsive design enhanced
- localStorage optimization
- Event-based architecture
- Health check system

## Tips & Tricks

1. **Use Categories:** Organize tasks by type for better tracking
2. **Set Priorities:** High priority tasks stand out
3. **Review Calendar:** Check upcoming events weekly
4. **Export Backups:** Save your tasks regularly
5. **Check Performance:** Use console to monitor speed

## Next Steps

1. ✅ Customize social links
2. ✅ Add your CV/resume
3. ✅ Update certificate images
4. ✅ Configure EmailJS for contact form
5. ✅ Deploy to your server

## Browser Support

Works on:
- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile Browsers ✅

## Happy Using! 🎉

Start with creating your first task, then explore the calendar and links sections. Everything is saved automatically!

For advanced features, see **ADVANCED_USAGE.md**
