// Edit these project objects to add your own projects.
const projects = [
  {title:"Student Portfolio Website", category:"web", technologies:["HTML","CSS","JavaScript"], description:"A responsive personal website to showcase education, technical skills, achievements, and project work.", link:"https://github.com/", label:"View project"},
  {title:"Interactive Shopping Cart", category:"javascript", technologies:["HTML","CSS","JavaScript"], description:"A simple shopping cart interface that lets users add items, update quantities, and calculate a total.", link:"https://github.com/", label:"View project"},
  {title:"Student Result Analyzer", category:"python", technologies:["Python","Data"], description:"A beginner-friendly program concept for organizing student marks and calculating summary statistics.", link:"https://github.com/", label:"View project"},
  {title:"Campus Event Page", category:"web", technologies:["HTML","CSS","Responsive"], description:"A mobile-friendly event landing page with event information, schedule, and registration call-to-action.", link:"https://github.com/", label:"View project"},
  {title:"To-Do List", category:"javascript", technologies:["JavaScript","DOM"], description:"A small task manager with add, complete, and delete interactions for practicing DOM manipulation.", link:"https://github.com/", label:"View project"},
  {title:"Data Exploration Notebook", category:"python", technologies:["Python","Pandas"], description:"A starter data analysis project to explore a dataset, clean values, and summarize useful patterns.", link:"https://github.com/", label:"View project"}
];

const projectsGrid = document.getElementById("projectsGrid");
const filterButtons = [...document.querySelectorAll(".filter-btn")];

function renderProjects(filter = "all") {
  const filtered = projects.filter(project => filter === "all" || project.category === filter || project.technologies.some(tech => tech.toLowerCase() === filter));
  projectsGrid.innerHTML = "";
  if (!filtered.length) {
    projectsGrid.innerHTML = '<p class="section-lead">No projects found in this category yet.</p>';
    return;
  }
  filtered.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    const number = String(index + 1).padStart(2, "0");
    card.innerHTML = `
      <span class="project-number">PROJECT ${number}</span>
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.description)}</p>
      <div class="project-tags">${project.technologies.map(tech => `<span class="tech-tag">${escapeHTML(tech)}</span>`).join("")}</div>
      <a class="project-link" href="${safeURL(project.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.label)} ↗</a>`;
    projectsGrid.appendChild(card);
  });
  observeReveals();
}

// Keep text content safe when project details are edited.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function safeURL(value) {
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch { return "#"; }
}

filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  renderProjects(button.dataset.filter);
}));

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Validate required fields and email, then open the visitor's default email application.
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
form.querySelectorAll("input, textarea").forEach(field => {
  field.addEventListener("input", () => field.classList.remove("invalid"));
});
form.addEventListener("submit", event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const subject = form.elements.subject.value.trim();
  const message = form.elements.message.value.trim();
  const fields = [form.elements.name, form.elements.email, form.elements.subject, form.elements.message];
  fields.forEach(field => field.classList.remove("invalid"));
  let firstInvalid = null;
  fields.forEach(field => {
    const value = field.value.trim();
    const invalid = !value || !field.checkValidity() || (field.name === "email" && !emailPattern.test(value)) ||
      (field.name === "name" && value.length < 2) || (field.name === "message" && value.length < 10);
    if (invalid) { field.classList.add("invalid"); if (!firstInvalid) firstInvalid = field; }
  });
  if (firstInvalid) {
    formMessage.textContent = "Please complete every required field with valid information.";
    formMessage.className = "form-message error";
    firstInvalid.focus();
    return;
  }
  formMessage.textContent = "Opening your email application…";
  formMessage.className = "form-message";
  const recipient = "your.email@example.com"; // Replace with your actual email address.
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailto;
});

document.getElementById("year").textContent = new Date().getFullYear();

// Reveal elements as they enter the viewport.
let revealObserver;
function observeReveals() {
  const items = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) { items.forEach(item => item.classList.add("visible")); return; }
  if (!revealObserver) revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
    });
  }, {threshold: 0.12});
  items.forEach(item => revealObserver.observe(item));
}
document.querySelectorAll("section .container > *, .hero-copy, .hero-card").forEach(item => item.classList.add("reveal"));
renderProjects();
observeReveals();

// Highlight the navigation item for the visible section.
const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll("a").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  }), {rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section => sectionObserver.observe(section));
}