# Testing Guide - Portfolio Project

## Testing Checklist

### 1. Core Navigation
- [ ] Click each nav link (Home, About, Certificates, Services, Portfolio, Tasks, Links, Calendar, Contact)
- [ ] Check smooth transitions between sections
- [ ] Verify hamburger menu works on mobile
- [ ] Sidebar closes after selecting a link on mobile

### 2. Language Switching
- [ ] Click AR button - all text should switch to Arabic
- [ ] Click EN button - all text should switch to English
- [ ] Verify page direction changes (RTL for Arabic, LTR for English)
- [ ] Check language preference persists on page reload
- [ ] All new sections (Tasks, Links, Calendar) have proper translations

### 3. Task Management System
- [ ] Navigate to Tasks section
- [ ] **Create Task**: 
  - [ ] Fill form and click "Add Task"
  - [ ] Task appears in the list
  - [ ] Data saves to localStorage
- [ ] **Toggle Task Completion**:
  - [ ] Check checkbox to mark complete
  - [ ] Uncompleted checkbox should return to pending
  - [ ] Completed tasks appear faded/strikethrough
- [ ] **Delete Task**:
  - [ ] Click delete button removes task from list
  - [ ] Refresh page - task should not reappear
- [ ] **Task Display**:
  - [ ] Shows task title, category, date, time, duration, priority
  - [ ] Categories display as colored tags
- [ ] **Automation**:
  - [ ] Completed tasks clear at 23:59 (simulate by checking localStorage)
  - [ ] Old month tasks clear on new month

### 4. Links & QR Codes
- [ ] Navigate to Links section
- [ ] **Link Display**:
  - [ ] All 8 default links display
  - [ ] Icons show correctly
  - [ ] Card layout is responsive
- [ ] **Copy Link**:
  - [ ] Click "Copy" button
  - [ ] Link is copied to clipboard
  - [ ] Success message appears
- [ ] **QR Code**:
  - [ ] Click "QR" button
  - [ ] QR code generates
  - [ ] QR code is scannable and links work
- [ ] **Responsive Grid**:
  - [ ] Mobile: 1 column
  - [ ] Tablet: 2 columns
  - [ ] Desktop: 3-4 columns

### 5. Calendar System
- [ ] Navigate to Calendar section
- [ ] **Calendar Display**:
  - [ ] Current month shows
  - [ ] Days arranged correctly
  - [ ] Today's date highlighted
- [ ] **Month Navigation**:
  - [ ] Click next/previous arrows
  - [ ] Month changes correctly
  - [ ] Title updates
- [ ] **Task Indicators**:
  - [ ] Days with tasks show indicator dots
  - [ ] Correct number of tasks displays on hover
- [ ] **Upcoming Events**:
  - [ ] Shows next 7 days with tasks
  - [ ] Displays pending task count
  - [ ] Shows "Today" indicator for current day

### 6. Responsive Design

#### Mobile (320px - 480px)
- [ ] Sidebar slides from left/right (RTL)
- [ ] Toggle button appears and works
- [ ] Text sizes readable
- [ ] Images scale correctly
- [ ] Forms stack vertically
- [ ] Buttons have adequate touch targets
- [ ] No horizontal scrolling

#### Tablet (481px - 768px)
- [ ] Sidebar visible with reduced width
- [ ] Two-column layouts work
- [ ] Portfolio shows 2 items per row
- [ ] Services show 2 items per row
- [ ] All elements visible without scrolling

#### Desktop (1025px+)
- [ ] Full sidebar visible
- [ ] Multi-column grids work
- [ ] Portfolio shows 3+ items per row
- [ ] Services show 3 items per row
- [ ] Maximum width constraints work

### 7. Avatar Image Responsiveness
- [ ] Image scales on mobile
- [ ] Image scales on tablet
- [ ] Image scales on desktop
- [ ] Image maintains aspect ratio
- [ ] No distortion at any size
- [ ] Border radius consistent

### 8. Form Testing

#### Contact Form
- [ ] All fields required (name, email, subject, message)
- [ ] Email validation works
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Form clears after submission
- [ ] Refresh doesn't resubmit

#### Task Form
- [ ] Title field required
- [ ] Category dropdown works
- [ ] Description optional
- [ ] Form validation works
- [ ] Task saves to localStorage

### 9. Multi-Language Content
- [ ] English sections render correctly in English
- [ ] Arabic sections render correctly in Arabic
- [ ] Numbers display correctly in both languages
- [ ] Dates format properly
- [ ] Special characters display correctly

### 10. Performance & Optimization

#### Page Load
- [ ] Page loads in under 3 seconds
- [ ] No console errors on load
- [ ] All scripts load with defer attribute
- [ ] No render-blocking resources

#### Data Management
- [ ] LocalStorage saves data correctly
- [ ] Data persists across sessions
- [ ] No duplicate data on refresh
- [ ] localStorage quota not exceeded (< 5MB)

#### Memory
- [ ] No memory leaks on navigation
- [ ] Event listeners properly removed
- [ ] No duplicate event listeners
- [ ] Tasks list doesn't slow down with 100+ items

### 11. Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile
- [ ] Safari Mobile

### 12. Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Color contrast sufficient (WCAG AA)
- [ ] Screen reader friendly
- [ ] Alt text on images
- [ ] Proper heading hierarchy
- [ ] Form labels associated with inputs

### 13. Data Persistence

- [ ] Tasks save to localStorage
- [ ] Links save to localStorage
- [ ] Language preference saves
- [ ] Close and reopen browser - data persists
- [ ] Clear localStorage and start fresh
- [ ] Export/import functionality works

### 14. Security

- [ ] Input sanitization works
- [ ] XSS protection (no script injection)
- [ ] No sensitive data in localStorage
- [ ] Form data encrypted in transit
- [ ] No console errors about security

### 15. Edge Cases

- [ ] Very long task titles display correctly
- [ ] Many tasks (100+) don't break UI
- [ ] Very long descriptions wrap properly
- [ ] Empty states handled gracefully
- [ ] No tasks for a day shows "No tasks"
- [ ] Rapid task creation/deletion works
- [ ] Switching languages with unsaved changes
- [ ] Network offline - tasks still work

## Automated Testing Commands

```javascript
// Test Tasks
console.log(window.taskManager.getAllTasks());
window.addTask({title: "Test Task", category: "project"});
window.toggleTask(lastTaskId);
window.deleteTask(lastTaskId);

// Test Links
console.log(window.linksManager.getLinks());
window.copyLinkToClipboard("https://example.com");

// Test Calendar
console.log(window.calendarManager.getCalendarData());
console.log(window.calendarManager.getUpcomingEvents());

// Test Language
window.setLanguage('ar');
window.setLanguage('en');
```

## Known Issues & Workarounds

### Issue: QR codes not generating
**Workaround**: Ensure QRCode.js library loads before generating

### Issue: Tasks not deleting at 23:59
**Workaround**: Set time to 23:59 or use localStorage directly

### Issue: Calendar showing wrong month
**Workaround**: Clear localStorage('lastMonthlyTaskCleanup')

## Performance Benchmarks

Target metrics:
- Page Load: < 3 seconds
- First Contentful Paint: < 2 seconds
- Interaction to Paint: < 100ms
- Tasks Load: < 500ms (even with 100+ tasks)
- Language Switch: < 200ms
- Month Navigation: < 300ms

## Manual Testing Script

```javascript
// Initialize all systems
window.taskManager.addTask({
    title: "Test Task",
    category: "project",
    description: "Testing task automation"
});

window.linksManager.getLinks();

window.calendarManager.getCalendarData();

// Check localStorage
localStorage.getItem('portfolio_tasks');
localStorage.getItem('portfolio_links');
localStorage.getItem('selectedLanguage');
```

## Regression Testing

After updates, verify:
1. All sections still load
2. Navigation still works
3. Tasks still save and delete
4. Calendar still displays
5. Links still work
6. Languages still switch
7. Responsive design still works
8. No console errors
9. No performance regression
10. All data persists

## Testing Environments

### Development
- Local file system
- localhost server
- Different browsers

### Staging
- Cloud server with HTTPS
- Real domain
- All browsers

### Production
- Live website
- Real users
- Monitor console errors

## Reporting Issues

When reporting issues, include:
- Browser and version
- Operating system
- Screen size
- Steps to reproduce
- Expected vs actual result
- Console errors (if any)
- localStorage contents
- Screenshots or videos
