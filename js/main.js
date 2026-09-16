/* ===========================================================
   Shared behaviour: mobile nav + footer content from data/profile.json
   =========================================================== */

const SOCIAL_ICONS = {
  GitHub: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.5 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.28 9.28 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.54 1.42.2 2.47.1 2.73.64.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .28.18.6.69.5A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02ZM3.2 8.75h3.48V21H3.2V8.75Zm6.28 0h3.34v1.68h.05c.47-.86 1.6-1.77 3.3-1.77 3.53 0 4.18 2.28 4.18 5.25V21h-3.48v-6.4c0-1.53-.03-3.49-2.12-3.49-2.13 0-2.46 1.65-2.46 3.38V21H9.48V8.75Z"/></svg>',
  Dribbble: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9.2"/><path d="M4 9.3c4.7 1.5 10 1.6 15.4-.2M3.2 15c5.6-1.4 10.7-.6 14.6 2.3M8.7 3.4c3 3.8 4.8 8.4 5 17"/></svg>',
};

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Impossible de charger ${path}`);
  return res.json();
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

async function fillFooter() {
  const footer = document.querySelector("[data-footer]");

  try {
    const profile = await loadJSON("data/profile.json");

    document.querySelectorAll("[data-contact-email]").forEach((el) => {
      el.href = `mailto:${profile.email}`;
    });

    if (!footer) return;

    const nameEl = footer.querySelector("[data-footer-name]");
    const taglineEl = footer.querySelector("[data-footer-tagline]");
    const emailEl = footer.querySelector("[data-footer-email]");
    const phoneEl = footer.querySelector("[data-footer-phone]");
    const locationEl = footer.querySelector("[data-footer-location]");
    const socialEl = footer.querySelector("[data-footer-social]");
    const yearEl = footer.querySelector("[data-footer-year]");

    if (nameEl) nameEl.textContent = profile.name;
    if (taglineEl) taglineEl.textContent = profile.tagline;
    if (emailEl) { emailEl.textContent = profile.email; emailEl.href = `mailto:${profile.email}`; }
    if (phoneEl) { phoneEl.textContent = profile.phone; phoneEl.href = `tel:${profile.phone.replace(/\s+/g, "")}`; }
    if (locationEl) locationEl.textContent = profile.location;
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (socialEl && Array.isArray(profile.social)) {
      socialEl.innerHTML = profile.social
        .map(
          (s) => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" title="${s.label}">${SOCIAL_ICONS[s.label] || s.label}</a></li>`
        )
        .join("");
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  fillFooter();
});