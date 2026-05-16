# 🎓 EchoLens AI & Data Science Institute - Website

Modern, professional website for EchoLens AI training institute. Built with pure HTML, CSS, and JavaScript - no frameworks required!

## 📁 Files Included

```
echolens-website/
├── index.html                                      # Main website file
├── styles.css                                      # All styling
├── script.js                                       # Interactions & animations
├── logo.png                                        # EchoLens logo
├── EchoLens_Complete_Academic_Calendar_2025-26.xlsx  # Downloadable calendar
└── README.md                                       # This file
```

## ✨ Features

### Pages & Sections
- **Hero Section** - Eye-catching landing with animated background
- **About Section** - Mission, vision, CEO message
- **Courses Section** - All 31 courses organized by track (AI & Creative)
- **Calendar Section** - Batch schedule information
- **Contact Section** - Phone, email, WhatsApp integration
- **FAQ Section** - Common questions answered

### Key Features
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Modern, tech-focused design
- ✅ Smooth animations and scroll effects
- ✅ WhatsApp floating button
- ✅ Google Form integration for enrollment
- ✅ Downloadable academic calendar
- ✅ Two tracks: AI & Creative courses
- ✅ SEO optimized
- ✅ Fast loading (no external dependencies)

## 🚀 Deployment Options

### Option 1: Netlify (FREE & RECOMMENDED)

1. **Create a Netlify account**
   - Go to https://netlify.com
   - Sign up with GitHub, GitLab, or Email

2. **Deploy your site**
   - Drag and drop the `echolens-website` folder to Netlify
   - OR use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --dir=echolens-website --prod
     ```

3. **Your site will be live at:**
   - `https://your-site-name.netlify.app`
   - You can customize the subdomain in settings

4. **Add custom domain (optional)**
   - Buy domain from Namecheap, GoDaddy, etc.
   - Add custom domain in Netlify settings
   - Follow DNS configuration instructions

### Option 2: GitHub Pages (FREE)

1. **Create GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/echolens-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select branch: `main`
   - Select folder: `/` (root)
   - Click Save

3. **Your site will be at:**
   - `https://YOUR-USERNAME.github.io/echolens-website`

### Option 3: Vercel (FREE)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd echolens-website
   vercel
   ```

3. **Follow prompts and your site goes live!**

## 🛠️ Customization Guide

### Change Contact Information
Edit in `index.html`:
- Line 22: WhatsApp link
- Line 596-616: Contact section
- Line 742-748: Footer

### Add/Remove Courses
Edit the course cards in `index.html` starting from line 181

### Change Colors
Edit CSS variables in `styles.css` (lines 11-17):
```css
:root {
    --navy: #0D2D5E;      /* Main brand color */
    --teal: #00B5C8;      /* Accent color */
    --orange: #F4600C;    /* Highlight color */
}
```

### Update Logo
Replace `logo.png` with your new logo (recommended size: 400x400px PNG with transparency)

## 📱 Testing Locally

Simply open `index.html` in your web browser!

Or use a local server:
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 🔧 Troubleshooting

### Logo not showing?
- Make sure `logo.png` is in the same folder as `index.html`
- Check file name is exactly `logo.png` (case-sensitive on Linux servers)

### Fonts not loading?
- Fonts are loaded from Google Fonts CDN
- Check internet connection
- Fallback fonts will be used if CDN fails

### Contact form not working?
- Verify Google Form URL is correct (line 22, 596)
- Test the form link directly in browser

## 📊 Website Structure

```
Homepage
├── Hero (with CTA buttons)
├── About
│   ├── Mission/Vision/Approach
│   ├── CEO Message
│   └── Why Choose Us
├── Courses
│   ├── AI & Data Science Track (15 courses)
│   └── Graphics & Creative Track (16 courses)
├── Calendar
├── Contact
├── FAQ
└── Footer
```

## 🎨 Design Credits

- **Fonts**: Orbitron (headings), IBM Plex Sans (body)
- **Color Scheme**: Navy (#0D2D5E) + Teal (#00B5C8)
- **Icons**: SVG inline icons
- **Animations**: CSS keyframes + Intersection Observer API

## 📈 Performance Tips

- **Optimize images**: Use tools like TinyPNG before uploading
- **Enable caching**: Most hosting providers do this automatically
- **Minify files**: Use tools like UglifyJS (CSS/JS) for production

## 🆘 Support

Need help deploying or customizing?
- 📞 WhatsApp: +92 349 9577864
- ✉️ Email: echolens816@gmail.com

## 📄 License

© 2025 EchoLens AI & Data Science Institute. All rights reserved.

---

**Built with ❤️ in Pakistan**
