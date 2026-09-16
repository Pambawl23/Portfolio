/* ===========================================================
   Home page: hero, services teaser, featured projects
   =========================================================== */

const ICONS = {
  code: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 5 2 12l6 7M16 5l6 7-6 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  layers: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 2 8l10 5 10-5-10-5Z" stroke-linejoin="round"/><path d="M2 13l10 5 10-5M2 18l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pen: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20l4.2-.9L19 8.3a2 2 0 0 0 0-2.8L18.5 5a2 2 0 0 0-2.8 0L4.9 15.8 4 20Z" stroke-linejoin="round"/></svg>',
};

const STATUS_LABEL = {
  termine: "Terminé",
  en_cours: "En cours",
  a_venir: "À venir",
};
const STATUS_COLOR = {
  termine: "var(--teal)",
  en_cours: "var(--amber)",
  a_venir: "var(--text-faint)",
};

async function renderHero() {
  const profile = await loadJSON("data/profile.json");

  const nameEl = document.querySelector("[data-hero-name]");
  const roleEl = document.querySelector("[data-hero-role]");
  const taglineEl = document.querySelector("[data-hero-tagline]");
  const statsEl = document.querySelector("[data-hero-stats]");
  const yearsBadge = document.querySelector("[data-hero-badge-value]");

  if (nameEl) nameEl.textContent = profile.name;
  if (roleEl) roleEl.textContent = profile.role;
  if (taglineEl) taglineEl.textContent = profile.tagline;
  if (yearsBadge) yearsBadge.textContent = profile.stats[0].value;

  if (statsEl) {
    statsEl.innerHTML = profile.stats
      .map(
        (s) => `
        <div class="stat">
          <span class="stat-value">${s.value}</span>
          <span class="stat-label">${s.label}</span>
        </div>`
      )
      .join("");
  }
}

async function renderServicesTeaser() {
  const mount = document.querySelector("[data-services-teaser]");
  if (!mount) return;
  const services = await loadJSON("data/services.json");

  mount.innerHTML = services
    .map(
      (s) => `
      <article class="teaser-card">
        <div class="teaser-icon">${ICONS[s.icon] || ""}</div>
        <h3>${s.title}</h3>
        <p>${s.summary}</p>
        <a class="teaser-link" href="services.html">En savoir plus &nbsp;›</a>
      </article>`
    )
    .join("");
}

async function renderFeaturedProjects() {
  const mount = document.querySelector("[data-featured-projects]");
  if (!mount) return;
  const projects = await loadJSON("data/projects.json");
  const featured = projects.slice(0, 3);

  mount.innerHTML = featured
    .map(
      (p) => `
      <a class="project-card" href="projects.html">
        <div class="thumb"><img src="${p.image}" alt="Aperçu du projet ${p.title}" loading="lazy"></div>
        <div class="body">
          <div class="status-row">
            <span class="status-dot" style="background:${STATUS_COLOR[p.status]}"></span>
            ${STATUS_LABEL[p.status]}
          </div>
          <h3>${p.title}</h3>
          <span class="cat">${p.category}</span>
        </div>
      </a>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderServicesTeaser();
  renderFeaturedProjects();
});
