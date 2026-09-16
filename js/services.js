/* ===========================================================
   Services page: services list + process steps
   =========================================================== */

const SERVICE_ICONS = {
  code: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 5 2 12l6 7M16 5l6 7-6 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  layers: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 2 8l10 5 10-5-10-5Z" stroke-linejoin="round"/><path d="M2 13l10 5 10-5M2 18l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pen: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20l4.2-.9L19 8.3a2 2 0 0 0 0-2.8L18.5 5a2 2 0 0 0-2.8 0L4.9 15.8 4 20Z" stroke-linejoin="round"/></svg>',
};

async function renderServices() {
  const mount = document.querySelector("[data-services-list]");
  if (!mount) return;
  const services = await loadJSON("data/services.json");

  mount.innerHTML = services
    .map(
      (s, i) => `
      <div class="service-row">
        <span class="service-index">0${i + 1}</span>
        <div class="service-main">
          <div class="service-icon">${SERVICE_ICONS[s.icon] || ""}</div>
          <h3>${s.title}</h3>
          <p>${s.summary}</p>
        </div>
        <ul class="service-includes">
          ${s.includes.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");
}

async function renderProcess() {
  const mount = document.querySelector("[data-process-grid]");
  if (!mount) return;
  const steps = await loadJSON("data/process.json");

  mount.innerHTML = steps
    .map(
      (s) => `
      <div class="process-card">
        <span class="step">${s.step}</span>
        <h4>${s.title}</h4>
        <p>${s.description}</p>
      </div>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderProcess();
});
