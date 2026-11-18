# 🌿 PaperCraft & Co. — Bespoke 3D Packaging Studio

An interactive 3D web experience and wholesale packaging store for sustainable paper goods (cups, kraft bags, tissue dispenser boxes, and clamshell meal boxes), built with **Three.js**, **WebGL**, and **Node.js**.

---

## 🎨 Color Aesthetic & Design System
- **Oat Beige**: `#F4EBE1` / `#FAF6F0` (Authentic recycled paper backdrop)
- **Botanical Forest Green**: `#2C4A3E` / `#1E362D` (Primary brand color & action highlights)
- **Roasted Coffee Brown**: `#654321` / `#4A2E18` / `#8B5A2B` (Artisanal typography & espresso inks)

---

## ✨ Features
1. **Interactive 3D Customizer Studio**:
   - 4 Silhouettes: Paper Coffee Cup, Kraft Shopping Bag, Facial Tissue Box, Bio-Clamshell Meal Box.
   - **💥 Explode View**: Separates packaging into physical assembly layers (lid floats up, corrugated sleeve slides down, clamshell hinges open).
   - **Upload Custom Logo (PNG/JPG)** or choose from 5 artisan emblem badges.
   - Real-time custom branding print & typography on 3D paper surface.
   - **✨ 24K Gold Foil** & Matte Ink physical shader effects.
   - Camera angle presets (Front, 45° ISO, Top View, Macro Detail, Reset).
   - 3 Studio lighting presets (☀️ Warm Cafe, 🌿 Sunlit Studio, 🌙 Dramatic Rim).
   - **📸 Save Mockup**: Export high-resolution transparent 3D PNG mockups with one click.
2. **Wholesale Catalogue & Shopping Cart**:
   - Pricing in Indian Rupees (**₹ / INR**) with live volume tier discounts (10% to 25% OFF).
   - Slide-over cart drawer with quantity adjustments and quote request flow.
3. **Zero-Build Static & Node.js Ready**:
   - Works immediately on **GitHub Pages** (100% static client-side ES Modules).
   - Also includes zero-dependency `server.js` for local Node.js serving.

---

## 🚀 How to Host on GitHub Pages (Free Live Website)

### Method 1: Upload via GitHub Website (Fastest - No Git install required)
1. Go to [github.com/new](https://github.com/new) and log in.
2. Enter repository name: `papercraft-3d` (or any name you like).
3. Set visibility to **Public** and click **Create repository**.
4. Click **"uploading an existing file"**.
5. Drag and drop all files from this folder:
   - `index.html`
   - `style.css`
   - `app.js`
   - `package.json`
   - `README.md`
   - `.gitignore`
   - `server.js`
6. Click **Commit changes**.
7. Go to **Settings** &rarr; **Pages** (on the left sidebar).
8. Under **Branch**, select `main` and click **Save**.
9. In ~1 minute, your website will be live at:
   `https://<your-username>.github.io/papercraft-3d/`

---

### Method 2: Push Using Git CLI
```bash
git init
git add .
git commit -m "Initial commit: PaperCraft 3D Packaging Website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
Then enable GitHub Pages under **Repository Settings &rarr; Pages &rarr; Source: Deploy from a branch (`main`)**.

---

## 💻 Local Development (Node.js)

```bash
# Start local Node.js server
npm start
# or
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.
