# Content Update Guide

This guide explains how to easily update content on your academic CV website.

## 📝 Quick Updates

### Adding a News Item

Edit `data/news.json` and add to the top of the array:

```json
{
  "date": "Month Year",
  "content": "Your news update here. Can include <a href='url'>links</a>."
}
```

### Adding a Publication

Edit `data/publications.json` and add:

```json
{
  "type": "journal",
  "title": "Your Paper Title",
  "authors": ["Author 1", "Abolfazl Younesi", "Author 3"],
  "venue": "Journal Name",
  "meta": "vol. X, no. Y, pp. Z-W, Month Year",
  "doi": "https://doi.org/10.XXXX/XXXXX",
  "pdf": "files/papers/yourpaper.pdf",
  "code": "https://github.com/username/repo",
  "selected": true
}
```

**Publication types:**
- `"journal"` - Journal articles
- `"conference"` - Conference papers
- `"preprint"` - Preprints (arXiv, etc.)
- `"thesis"` - Theses and reports

**Optional fields:**
- `"code"` - Link to code repository
- `"data"` - Link to dataset
- `"selected"` - Set to `true` to add "Selected" badge

### Adding a Teaching Entry

Edit `data/teaching.json`:

```json
{
  "course": "Course Name",
  "role": "Teaching Assistant",
  "semester": "Winter 2025/26",
  "description": "Brief description of your role and responsibilities."
}
```

### Adding Professional Service

Edit `data/service.json`:

```json
{
  "category": "reviewer",
  "name": "Journal or Conference Name",
  "year": "2025"
}
```

**Categories:**
- `"reviewer"` - Journal/conference reviewer
- `"pc"` - Program committee member
- `"membership"` - Professional memberships

### Adding a Project

Edit `data/projects.json`:

```json
{
  "title": "Project Name",
  "description": "Project description.",
  "technologies": "Python, TensorFlow, Docker",
  "github": "https://github.com/username/repo",
  "demo": "https://demo-url.com",
  "paper": "files/papers/paper.pdf"
}
```

### Adding a Talk

Edit `data/talks.json`:

```json
{
  "title": "Talk Title",
  "venue": "Conference or Event Name",
  "date": "Month Year",
  "slides": "files/slides/presentation.pdf"
}
```

### Adding an Award

Edit `data/awards.json`:

```json
{
  "year": "2025",
  "name": "Award Name",
  "description": "Brief description of the award and context."
}
```

## 🔄 Updating Existing Content

1. Open the relevant JSON file in `data/` directory
2. Find the item you want to update
3. Edit the fields
4. Save the file
5. Commit and push to GitHub (changes appear automatically)

## 📅 Updating "Last Modified" Date

Update in two places:
1. `index.html` line 191: `<span id="last-updated-date">January 2026</span>`
2. `cv.html` line 136: `<span id="cv-last-updated">January 2026</span>`

## 📄 Adding PDFs

### Paper PDFs
1. Add PDF to `files/papers/`
2. Reference in `data/publications.json` as `"pdf": "files/papers/filename.pdf"`

### Slides
1. Add PDF to `files/slides/`
2. Reference in `data/talks.json` as `"slides": "files/slides/filename.pdf"`

### CV PDF
1. Replace `files/cv.pdf` with your updated CV
2. Keep the filename as `cv.pdf` (or update link in `index.html` line 104)

## ✅ Validation

After making changes:

1. **Validate JSON syntax**
   - Use [JSONLint.com](https://jsonlint.com/)
   - Paste your JSON file content
   - Fix any syntax errors

2. **Test locally**
   ```bash
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` and verify changes

3. **Deploy to GitHub**
   ```bash
   git add .
   git commit -m "Update: [describe your changes]"
   git push
   ```

## 🎨 Styling Tips

### Bold Your Name in Publications
The JavaScript automatically bolds "Younesi" in author lists. If you change your name, update:
- `js/main.js` line 76
- `js/cv.js` line 57

### Selected Publications Badge
Add `"selected": true` to highlight important publications with a blue badge.

## 🚨 Common Mistakes

❌ **Forgetting commas between JSON objects**
```json
[
  {"item": 1}  // Missing comma!
  {"item": 2}
]
```

✅ **Correct:**
```json
[
  {"item": 1},
  {"item": 2}
]
```

❌ **Trailing comma in last item**
```json
[
  {"item": 1},
  {"item": 2},  // Remove this comma!
]
```

✅ **Correct:**
```json
[
  {"item": 1},
  {"item": 2}
]
```

❌ **Wrong file paths**
```json
"pdf": "papers/file.pdf"  // Missing "files/"
```

✅ **Correct:**
```json
"pdf": "files/papers/file.pdf"
```

## 📱 Testing Checklist

After updates:
- [ ] JSON validates without errors
- [ ] Content appears on homepage
- [ ] Content appears on CV page (if applicable)
- [ ] Links work correctly
- [ ] PDFs download properly
- [ ] Mobile view looks good
- [ ] No console errors in browser

---

**Pro Tip:** Keep a local copy of your JSON files backed up separately, and always validate before pushing to GitHub!
