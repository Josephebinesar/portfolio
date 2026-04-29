# Joseph Ebinesar - Portfolio Website

A modern, animated, recruiter-focused personal portfolio website built with HTML5, CSS3, and Vanilla JavaScript.

## 🚀 Features

### Design & Aesthetics
- **Modern Dark Mode** (default) with Light Mode toggle
- **Animated Background** with moving gradient blobs
- **Glassmorphism Effects** on cards and components
- **Smooth Animations** using CSS transitions and keyframes
- **Micro-interactions** on hover for enhanced UX
- **Gradient Accents** throughout the design
- **Professional Typography** using Inter and Outfit fonts

### Functionality
- ✅ **Sticky Navigation** with active section highlighting
- ✅ **Smooth Scrolling** to all sections
- ✅ **Dark/Light Theme Toggle** with localStorage persistence
- ✅ **Mobile-Responsive** hamburger menu
- ✅ **Scroll Reveal Animations** using IntersectionObserver
- ✅ **Contact Form** with client-side validation
- ✅ **Back to Top Button** that appears on scroll
- ✅ **Fully Responsive** design (mobile-first approach)

### Sections
1. **Hero** - Eye-catching introduction with CTA buttons
2. **About** - Professional summary and career objectives
3. **Skills** - Categorized skill cards with proficiency levels
4. **Projects** - Featured projects with tech stacks and links
5. **Experience** - Timeline of internships and work experience
6. **Education** - Academic background with grades
7. **Achievements** - Awards and hackathon participation
8. **Certifications** - Professional certifications
9. **Contact** - Contact information and working form

## 📁 File Structure

```
projects/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## 🖥️ How to Run Locally

### Option 1: Direct File Opening
1. Navigate to the project folder
2. Double-click `index.html`
3. The portfolio will open in your default browser

### Option 2: VS Code Live Server (Recommended)
1. Open the project folder in VS Code
2. Install the "Live Server" extension by Ritwick Dey
3. Right-click on `index.html`
4. Select "Open with Live Server"
5. The portfolio will open at `http://127.0.0.1:5500`

### Option 3: Python HTTP Server
```bash
# Navigate to the project folder
cd c:/Users/HP/OneDrive/Desktop/projects

# Python 3
python -m http.server 8000

# Open browser to http://localhost:8000
```

### Option 4: Node.js HTTP Server
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to project folder
cd c:/Users/HP/OneDrive/Desktop/projects

# Start server
http-server -p 8000

# Open browser to http://localhost:8000
```

## 🌐 Deploy to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New Repository"
3. Name it: `portfolio` or `josephebinesar.github.io`
4. Keep it public
5. Click "Create Repository"

### Step 2: Push Your Code
```bash
# Navigate to your project folder
cd c:/Users/HP/OneDrive/Desktop/projects

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/portfolio.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll to "Pages" in the left sidebar
4. Under "Source", select branch: `main`
5. Select folder: `/ (root)`
6. Click "Save"
7. Wait 1-2 minutes for deployment

### Step 4: Access Your Site
Your portfolio will be live at:
- If repo name is `portfolio`: `https://USERNAME.github.io/portfolio`
- If repo name is `josephebinesar.github.io`: `https://josephebinesar.github.io`

## 📝 Customization Guide

### Update Resume File
1. Add your PDF resume to the project folder
2. Name it `Joseph_Ebinesar_Resume.pdf` OR
3. Update the filename in `index.html` (line with `href="Joseph_Ebinesar_Resume.pdf"`)

### Update Project Links
In `index.html`, find the project cards and update:
- GitHub repository URLs (currently placeholders)
- Live demo URLs (currently `#` placeholders)

### Change Colors
In `styles.css`, modify the CSS custom properties:
```css
:root {
  --accent-primary: #6366f1;     /* Primary accent color */
  --accent-secondary: #8b5cf6;   /* Secondary accent color */
  /* ... other colors ... */
}
```

### Add Project Images
1. Create an `images` folder in your project
2. Add project screenshots
3. In `index.html`, add `<img>` tags to project cards:
```html
<div class="project-card">
  <img src="images/project-name.png" alt="Project Name">
  <!-- rest of card content -->
</div>
```

### Modify Content
All content is in `index.html`. Search for:
- **Name**: Search for "JOSEPH EBINESAR"
- **Email**: Search for "josephebinesarofficial@gmail.com"
- **Phone**: Search for "+91 7708976094"
- **LinkedIn**: Search for "linkedin.com/in/josephebinesar"
- **GitHub**: Search for "github.com/Josephebinesar"

## 🎨 Theme Toggle

The portfolio includes a Dark/Light mode toggle:
- **Default**: Dark mode
- **Toggle**: Click the sun/moon icon in the navbar
- **Persistence**: Theme preference is saved in localStorage

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Browser Compatibility

Tested and works on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Performance Tips

1. **Optimize Images**: Compress project images before adding
2. **Minify CSS/JS**: Use tools like [CSS Minifier](https://cssminifier.com/) for production
3. **Enable Caching**: Configure caching headers on your hosting
4. **Use CDN**: Consider using a CDN for faster global delivery

## 📊 Analytics (Optional)

To add Google Analytics:
1. Get your GA tracking ID
2. Add this before `</head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Fonts Not Loading
- Check internet connection (fonts load from Google Fonts)
- Fallback fonts will be used if Google Fonts fails

### Animations Not Working
- Ensure JavaScript is enabled in your browser
- Check browser console for errors (F12)

### Mobile Menu Not Opening
- Clear browser cache
- Check if JavaScript is blocked

### Form Not Submitting
- This is expected - form only has client-side validation
- To enable actual email sending, integrate with a backend service like:
  - [Formspree](https://formspree.io/)
  - [EmailJS](https://www.emailjs.com/)
  - [Netlify Forms](https://www.netlify.com/products/forms/)

## 📧 Contact

**Joseph Ebinesar**
- Email: josephebinesarofficial@gmail.com
- LinkedIn: [linkedin.com/in/josephebinesar](https://linkedin.com/in/josephebinesar)
- GitHub: [github.com/Josephebinesar](https://github.com/Josephebinesar)
- Phone: +91 7708976094
- Location: Chennai, India

## 📄 License

This portfolio is open source and available for personal use. Feel free to fork and customize for your own portfolio!

## 🙏 Credits

- **Design & Development**: Joseph Ebinesar
- **Fonts**: Google Fonts (Inter, Outfit)
- **Icons**: Inline SVG icons

---

**Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript**

*Last Updated: February 2026*
