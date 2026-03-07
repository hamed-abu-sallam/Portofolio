# My Portfolio - Integrated Version

A modern, responsive portfolio website with integrated task management, social links, and calendar system.

## Features

### Core Portfolio Sections
- **Home**: Professional introduction with typing animation
- **About**: Personal information, skills, education, and experience
- **Certificates**: Organized certificates from different categories
- **Services**: Comprehensive list of offered services
- **Portfolio**: Showcase of projects and work
- **Contact**: Email contact form with EmailJS integration

### New Integrated Features

#### 1. Task Management System
- Create, update, and delete tasks
- Organize tasks by categories (academy, freelance, support, projects)
- Smart automation:
  - Auto-delete completed tasks at end of day (23:59)
  - Automatic monthly cleanup of old tasks
  - Prevents task list bloat
- View today's tasks with details and priorities
- Task metadata (date, time, duration, priority)

#### 2. Social Links & QR Codes
- Centralized management of all social links
- One-click copy to clipboard
- QR code generation for easy sharing
- Responsive link cards with flexible grid layout

#### 3. Calendar System
- Monthly calendar view with task indicators
- Highlight today's date
- 7-day upcoming events preview
- Monthly statistics
- Navigation between months

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, and responsive design
- **JavaScript (Vanilla)**: No heavy frameworks
- **LocalStorage**: For persistent storage
- **Third-party Libraries**:
  - Typed.js - Typing animation
  - QRCode.js - QR code generation
  - EmailJS - Contact form emails
  - Font Awesome - Icons

## Multi-Language Support

- Arabic (RTL) and English (LTR)
- Real-time language switching
- All UI text translatable

## Responsive Design

- Mobile (320px - 480px)
- Tablet (481px - 768px)
- Desktop (1025px+)
- All images scale responsively

## File Structure

```
├── index.html
├── css/
│   ├── styles.css
│   ├── tasks.css
│   ├── responsive.css
│   ├── language-styles.css
│   └── skins/
├── js/
│   ├── script.js
│   ├── languages.js
│   ├── tasks.js
│   ├── links.js
│   ├── calendar.js
│   ├── ui-manager.js
│   └── email-handler.js
├── images/
└── files/
```

## Quick Start

1. Open `index.html` in a browser
2. No build process required
3. Customize content through JavaScript APIs
4. Tasks save automatically to LocalStorage
5. Switch languages with AR/EN buttons

## Features

### Task Automation
- Tasks auto-delete at end of day
- Monthly cleanup prevents bloat
- Smart categorization

### Performance
- No external dependencies for core functionality
- Lazy loading of scripts
- Optimized CSS and JavaScript
- LocalStorage for instant access

### Accessibility
- Semantic HTML
- Proper contrast ratios
- Keyboard navigation
- Screen reader support

## Browser Support

- Chrome/Chromium
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization

- Edit social links in `js/links.js`
- Change color theme with palette icon
- Switch languages anytime
- Add/manage tasks through UI
- EmailJS integration for contact form

## Contact Form

To enable email functionality:
1. Sign up at EmailJS.com
2. Add your credentials to `js/email-handler.js`
3. Contact form will send emails automatically

## Author

Hamed Sayed Ahmed Abu Sallam
- GitHub: https://github.com/hamed-abu-sallam
- LinkedIn: https://linkedin.com/in/hamed-abu-sallam
- Email: hamedabusallam@gmail.com

**Version**: 2.0 - Integrated with Smart Task Management & QR Code System
