/* ===========================================================
   About page: parcours timeline + compétences carousel
   =========================================================== */

async function renderIntroAndTimeline() {
  const about = await loadJSON("data/about.json");

  const introEl = document.querySelector("[data-about-intro]");
  if (introEl) introEl.textContent = about.intro;

  const timelineEl = document.querySelector("[data-timeline]");
  if (timelineEl) {
    timelineEl.innerHTML = about.timeline
      .map(
        (item) => `
        <div class="timeline-item">
          <span class="timeline-period">${item.period}</span>
          <div class="timeline-heading">
            <div>
              <h3>${item.title}</h3>
              <span class="timeline-place">${item.place}</span>
            </div>
            ${item.image ? `<img class="timeline-logo" src="${item.image}" alt="Logo ${item.place}">` : ""}
          </div>
          <p>${item.description}</p>
        </div>`
      )
      .join("");
  }
}

function initLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = document.querySelector("[data-lightbox-img]");
  const closeBtn = document.querySelector("[data-lightbox-close]");
  if (!lightbox || !lightboxImg) return;

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }
  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  document.querySelector("[data-timeline]")?.addEventListener("click", (e) => {
    const img = e.target.closest(".timeline-logo");
    if (!img) return;
    open(img.src, img.alt);
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

async function initSkills() {
  const tabsEl = document.querySelector("[data-skills-tabs]");
  const trackEl = document.querySelector("[data-skills-track]");
  const prevBtn = document.querySelector("[data-carousel-prev]");
  const nextBtn = document.querySelector("[data-carousel-next]");
  if (!tabsEl || !trackEl) return;

  const skills = await loadJSON("data/skills.json");
  let activeId = skills.categories[0].id;

  function renderTabs() {
    tabsEl.innerHTML = skills.categories
      .map(
        (cat) => `
        <button type="button" class="skills-tab ${cat.id === activeId ? "is-active" : ""}" data-tab="${cat.id}">
          ${cat.label}
        </button>`
      )
      .join("");
  }

  function renderTrack() {
    const cat = skills.categories.find((c) => c.id === activeId);
    if (!cat || cat.items.length === 0) {
      trackEl.innerHTML = `<div class="carousel-empty">Catégorie à compléter — ajoutez vos compétences dans data/skills.json.</div>`;
      return;
    }
    trackEl.innerHTML = cat.items
      .map(
        (item) => `
        <div class="skill-card">
          <h4>${item.name}</h4>
          <div class="skill-level-label"><span>Maîtrise</span><span>${item.level}%</span></div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width:${item.level}%"></div>
          </div>
        </div>`
      )
      .join("");
    trackEl.scrollTo({ left: 0 });
  }

  function updateCarouselButtons() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = trackEl.scrollLeft <= 4;
    nextBtn.disabled = trackEl.scrollLeft >= trackEl.scrollWidth - trackEl.clientWidth - 4;
  }

  tabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]");
    if (!btn) return;
    activeId = btn.dataset.tab;
    renderTabs();
    renderTrack();
    updateCarouselButtons();
  });

  prevBtn?.addEventListener("click", () => {
    trackEl.scrollBy({ left: -280, behavior: "smooth" });
  });
  nextBtn?.addEventListener("click", () => {
    trackEl.scrollBy({ left: 280, behavior: "smooth" });
  });
  trackEl.addEventListener("scroll", updateCarouselButtons);

  renderTabs();
  renderTrack();
  requestAnimationFrame(updateCarouselButtons);
  window.addEventListener("resize", updateCarouselButtons);
}

document.addEventListener("DOMContentLoaded", () => {
  renderIntroAndTimeline();
  initSkills();
  initLightbox();
});