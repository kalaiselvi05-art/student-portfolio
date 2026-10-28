# Student Portfolio Website

A responsive student portfolio built with **HTML, CSS, and vanilla JavaScript**. No frameworks, package installation, API keys, or build tools are required.

## Features
- Responsive navigation with mobile menu
- About, Education, Skills, Projects, Achievements, and Contact sections
- Projects rendered dynamically from a JavaScript array
- Project filters by category/technology
- Downloadable sample resume (`assets/resume.txt`)
- Required-field and email validation in the contact form
- Contact form opens the visitor's email application using `mailto:`; it does **not** send data to a server
- Smooth scrolling, scroll reveal effects, skill bars, and active navigation state
- Keyboard-friendly labels and reduced-motion support

## Run locally
1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. Optional: open the folder in VS Code and use the Live Server extension.

## Personalize before publishing
1. Search `index.html` for `Your Name`, `Your College Name`, `Your School Name`, sample email, location, and social links. Replace them with your own accurate information.
2. Edit `assets/resume.txt` and replace all sample details. The current downloadable file is a plain-text sample resume.
3. In `script.js`, edit the `projects` array. Change each project's title, description, category (`web`, `javascript`, or `python`), technology list, and actual project URL.
4. In `script.js`, replace `your.email@example.com` in the `recipient` variable with your real contact email.
5. Change skill levels in `index.html` so they reflect your actual abilities.
6. Add only achievements and certifications you have genuinely earned.

## Project filtering
The project filter buttons use each project's `category` and `technologies`. Current buttons are `all`, `web`, `javascript`, and `python`. To add a category, add a matching button in `index.html` and use the same category key in `script.js`.

## Publish on GitHub Pages
1. Sign in to GitHub and create a new repository, for example `student-portfolio`.
2. Extract this ZIP on your computer.
3. Upload `index.html`, `style.css`, `script.js`, the `assets` folder, and `README.md` to the repository root (not the ZIP file itself).
4. Open repository **Settings → Pages**.
5. Under build and deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
6. Wait for the deployment to finish. GitHub will display the published website URL in the Pages section.

## Notes
- This is a static front-end project. The contact form uses the visitor's default email application; a real backend or form service is needed to submit messages directly.
- All projects, profile details, education, skills, and contact details are examples. Replace them before presenting the site as your own.
