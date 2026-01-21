# Academic CV Website - Abolfazl Younesi

A professional academic CV website built for GitHub Pages. Clean, modern, and optimized for academic researchers.

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub repository**
   ```bash
   # Repository name should be: [your-username].github.io
   # For example: abolfazl-younesi.github.io
   ```

2. **Upload all files to your repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Academic CV website"
   git branch -M main
   git remote add origin https://github.com/....
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Click Save

4. **Access your website**
   - Your site will be live at: `https://.....github.io/`
   - It may take a few minutes for the first deployment

### Option 2: Local Development

```bash
# Navigate to the project directory
cd /home/user/Downloads/webpage

# Start a local server (Python 3)
python3 -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Open in browser
# http://localhost:8000
```

## 📁 Repository Structure

```
.
├── index.html              # Main homepage
├── cv.html                 # Full CV page (print-optimized)
├── css/
│   ├── style.css          # Main stylesheet
│   └── cv.css             # CV page styles
├── js/
│   ├── main.js            # Main JavaScript
│   └── cv.js              # CV page JavaScript
├── data/
│   ├── news.json          # News updates
│   ├── publications.json  # Publications list
│   ├── teaching.json      # Teaching experience
│   ├── service.json       # Professional service
│   ├── projects.json      # Research projects
│   ├── talks.json         # Talks & presentations
│   └── awards.json        # Awards & honors
├── files/
│   ├── cv.pdf             # Your CV PDF (add this)
│   ├── papers/            # PDF papers (add these)
│   └── slides/            # Presentation slides (add these)
├── favicon.png            # Site favicon (add this)
└── README.md              # This file
```

## ✏️ Customization Guide

### 1. Update Personal Information

**In `index.html`:**
- Line 8-9: Update meta description
- Line 14-15: Update Open Graph URL
- Line 18-29: Update JSON-LD schema with your URLs
- Line 48: Update name
- Line 49-50: Update title and affiliation
- Line 53: Update bio text
- Line 60-67: Update research interests
- Line 72-107: Update contact links (replace `[EMAIL]`, `[GOOGLE_SCHOLAR]`, `[ORCID]`, `[GITHUB]`)

**In `cv.html`:**
- Line 24: Update contact information
- Line 33-40: Update "About" section
- Line 48-73: Update Education section
- Line 78-90: Update Professional Experience

### 2. Update Content Data

All content is stored in JSON files in the `data/` directory. Simply edit these files to update your website:

**`data/news.json`** - Add news items:
```json
{
  "date": "January 2026",
  "content": "Your news update here."
}
```

**`data/publications.json`** - Add publications:
```json
{
  "type": "journal",  // or "conference", "preprint", "thesis"
  "title": "Paper Title",
  "authors": ["Author 1", "Abolfazl Younesi", "Author 3"],
  "venue": "Journal/Conference Name",
  "meta": "vol. X, no. Y, pp. Z-W, Month Year",
  "doi": "https://doi.org/...",
  "pdf": "files/papers/filename.pdf",
  "code": "https://github.com/...",  // optional
  "selected": true  // optional, adds "Selected" badge
}
```

**`data/teaching.json`** - Add teaching:
```json
{
  "course": "Course Name",
  "role": "Teaching Assistant",
  "semester": "Winter 2025/26",
  "description": "Course description."
}
```

**`data/service.json`** - Add service:
```json
{
  "category": "reviewer",  // or "pc", "membership"
  "name": "Journal/Conference Name",
  "year": "2025"  // optional
}
```

**`data/projects.json`** - Add projects:
```json
{
  "title": "Project Name",
  "description": "Project description.",
  "technologies": "Python, TensorFlow, Docker",
  "github": "https://github.com/...",  // optional
  "demo": "https://...",  // optional
  "paper": "files/papers/..."  // optional
}
```

**`data/talks.json`** - Add talks:
```json
{
  "title": "Talk Title",
  "venue": "Conference/Event Name",
  "date": "Month Year",
  "slides": "files/slides/filename.pdf"  // optional
}
```

**`data/awards.json`** - Add awards:
```json
{
  "year": "2025",
  "name": "Award Name",
  "description": "Award description."
}
```

### 3. Update Last Modified Date

**Single location to update:**
- Edit `index.html` line 191: `<span id="last-updated-date">January 2026</span>`
- Edit `cv.html` line 136: `<span id="cv-last-updated">January 2026</span>`

### 4. Customize Colors and Fonts

**In `css/style.css` (lines 1-20):**
```css
:root {
    --color-primary: #2c5282;        /* Main accent color */
    --color-accent: #3182ce;         /* Secondary accent */
    --font-serif: 'Crimson Text', ...;
    --font-sans: 'Inter', ...;
}
```

To change fonts, update the Google Fonts import on line 28 of `css/style.css`.

### 5. Add Files

**Required files to add:**
- `favicon.png` - Your site favicon (32x32 or 64x64 px)
- `files/cv.pdf` - Your CV PDF
- `files/papers/` - Add your paper PDFs here
- `files/slides/` - Add your presentation slides here

**Optional:**
- Add profile photo to homepage if desired

## 🎨 Design Features

- ✅ Clean, academic, professional design
- ✅ Mobile-responsive layout
- ✅ Sticky navigation with smooth scrolling
- ✅ Publication filtering by type
- ✅ Print-optimized CV page
- ✅ SEO-friendly with meta tags and JSON-LD
- ✅ Accessible (WCAG-aware)
- ✅ Fast loading with minimal JavaScript
- ✅ Easy content updates via JSON files

## 📄 CV Page Features

The `/cv.html` page is optimized for printing and PDF export:

- Professional academic CV layout
- Print-friendly CSS (removes navigation, buttons, etc.)
- Proper page breaks
- One-click "Print to PDF" button

**To generate PDF:**
1. Visit `https://[YOUR-USERNAME].github.io/cv.html`
2. Click "Print / Save as PDF" or press Ctrl+P / Cmd+P
3. Select "Save as PDF" as destination
4. Adjust margins if needed
5. Save

## 🔧 Advanced Customization

### Change Color Scheme
Edit CSS variables in `css/style.css` (lines 5-12)

### Add Dark Mode
Uncomment and implement dark mode CSS variables and toggle button

### Add Google Analytics
Add tracking code before `</head>` in `index.html` and `cv.html`

### Add More Sections
1. Add section HTML in `index.html`
2. Add navigation link in navbar
3. Create corresponding JSON data file
4. Add loading function in `js/main.js`

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

**Website not loading on GitHub Pages:**
- Check that repository name is `[username].github.io`
- Verify GitHub Pages is enabled in Settings
- Wait 5-10 minutes for first deployment
- Check for errors in repository Actions tab

**Content not appearing:**
- Check browser console for JavaScript errors
- Verify JSON files are valid (use JSONLint.com)
- Ensure file paths are correct

**Styling issues:**
- Clear browser cache
- Check CSS file paths
- Verify Google Fonts are loading

## 📝 License

This template is free to use for academic purposes. Attribution appreciated but not required.

## 🤝 Support

For issues or questions:
1. Check this README
2. Inspect browser console for errors
3. Validate JSON files
4. Check file paths and permissions

---

**Last Updated:** January 2026
