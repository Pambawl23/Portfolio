/* ===========================================================
   Projects page: filtering by status (terminé / en_cours / à_venir)
   =========================================================== */

const PROJECT_STATUS_LABEL = {
  termine: "Terminé",
  en_cours: "En cours",
  a_venir: "À venir",
};

function projectCardTemplate(p) {
  const links = [];
  if (p.site) links.push(`<a href="${p.site}" target="_blank" rel="noopener">Voir le site</a>`);
  if (p.github) links.push(`<a href="${p.github}" target="_blank" rel="noopener">Voir sur GitHub</a>`);
  const linksHTML = links.length
    ? links.join("")
    : `<span class="no-link">Liens à venir</span>`;

  return `
    <article class="project-full-card" data-status="${p.status}">
      <div class="thumb">
        <img src="${p.image}" alt="Aperçu du projet ${p.title}" loading="lazy">
        <span class="status-pill ${p.status}">
          <span class="status-dot" style="background:currentColor"></span>
          ${PROJECT_STATUS_LABEL[p.status]}
        </span>
      </div>
      <div class="body">
        <span class="cat">${p.category}</span>
        <h3>${p.title}</h3>
        <p class="desc">${p.description}</p>
        <div class="tag-row">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="link-row">${linksHTML}</div>
      </div>
    </article>`;
}

async function initProjects() {
  const grid = document.querySelector("[data-projects-grid]");
  const tabsEl = document.querySelector("[data-filter-tabs]");
  const countEl = document.querySelector("[data-filter-count]");
  if (!grid) return;

  const projects = await loadJSON("data/projects.json");
  let activeFilter = "tous";

  const filters = [
    { id: "tous", label: "Tous" },
    { id: "termine", label: "Terminé" },
    { id: "en_cours", label: "En cours" },
    { id: "a_venir", label: "À venir" },
  ];

  function renderTabs() {
    if (!tabsEl) return;
    tabsEl.innerHTML = filters
      .map((f) => {
        const count = f.id === "tous" ? projects.length : projects.filter((p) => p.status === f.id).length;
        return `
        <button type="button" class="filter-tab ${f.id === activeFilter ? "is-active" : ""}" data-filter="${f.id}">
          ${f.label} <span style="opacity:.6">(${count})</span>
        </button>`;
      })
      .join("");
  }

  function renderGrid() {
    const list = activeFilter === "tous" ? projects : projects.filter((p) => p.status === activeFilter);

    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-state">Aucun projet dans cette catégorie pour le moment.</div>`;
    } else {
      grid.innerHTML = list.map(projectCardTemplate).join("");
    }

    if (countEl) {
      countEl.textContent = `${list.length} projet${list.length > 1 ? "s" : ""}`;
    }
  }

  tabsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    renderTabs();
    renderGrid();
  });

  renderTabs();
  renderGrid();
}

document.addEventListener("DOMContentLoaded", initProjects);
