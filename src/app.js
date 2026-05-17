const data = window.projectData;
let selectedWorkbook = 0;

function toneClass(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, "-");
}

function renderSummary() {
  document.querySelector("#summary").innerHTML = data.summary.map((item) => `
    <article class="metric ${item.tone}">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <small>${item.detail}</small>
    </article>
  `).join("");
}

function renderWorkbookList() {
  document.querySelector("#workbook-list").innerHTML = data.workbooks.map((workbook, index) => `
    <button class="${index === selectedWorkbook ? "active" : ""}" data-index="${index}">
      <span>
        <strong>${workbook.name}</strong>
        <small>${workbook.owner} | ${workbook.audience}</small>
      </span>
      <b>${workbook.riskScore}</b>
    </button>
  `).join("");

  document.querySelectorAll("#workbook-list button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedWorkbook = Number(button.dataset.index);
      renderTriage();
    });
  });
}

function renderHealth(label, value) {
  return `
    <div class="health-row">
      <div>
        <span>${label}</span>
        <strong>${value}%</strong>
      </div>
      <i aria-hidden="true"><b style="width:${value}%"></b></i>
    </div>
  `;
}

function renderTriage() {
  const workbook = data.workbooks[selectedWorkbook];
  renderWorkbookList();
  document.querySelector("#workbook-title").textContent = workbook.name;
  document.querySelector("#workbook-risk").textContent = `${workbook.riskBand} risk`;
  document.querySelector("#workbook-risk").className = `risk-pill ${toneClass(workbook.riskBand)}`;
  document.querySelector("#workbook-stats").innerHTML = [
    ["Average load", `${workbook.avgLoad}s`],
    ["P95 load", `${workbook.p95Load}s`],
    ["Support tickets", workbook.supportTickets],
    ["Criticality", workbook.criticality]
  ].map(([label, value]) => `<article><span>${label}</span><strong>${value}</strong></article>`).join("");
  document.querySelector("#health-grid").innerHTML = [
    renderHealth("Extract pass rate", workbook.extractPass),
    renderHealth("Freshness score", workbook.freshness),
    renderHealth("KPI certification", workbook.certification)
  ].join("");
  document.querySelector("#root-causes").innerHTML = workbook.rootCauses.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#next-actions").innerHTML = workbook.actions.map((item) => `<li>${item}</li>`).join("");
}

function renderOptimizationQueue() {
  const totalSavings = data.optimizationQueue.reduce((sum, item) => sum + (item.before - item.after), 0);
  document.querySelector("#queue-total").textContent = `${totalSavings.toFixed(1)} seconds projected load reduction`;
  document.querySelector("#optimization-table").innerHTML = data.optimizationQueue.map((item) => {
    const beforeWidth = Math.min(100, item.before * 2);
    const afterWidth = Math.min(100, item.after * 2);
    return `
      <article class="optimization-row">
        <div>
          <strong>${item.workbook}</strong>
          <span>${item.pattern}</span>
        </div>
        <div class="load-bars">
          <p><span>Before</span><i><b style="width:${beforeWidth}%"></b></i><strong>${item.before}s</strong></p>
          <p><span>After</span><i><b style="width:${afterWidth}%"></b></i><strong>${item.after}s</strong></p>
        </div>
        <div>
          <span class="savings">${item.savings} saved</span>
          <p>${item.evidence}</p>
          <p>${item.recommendation}</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderPublishingReadiness() {
  document.querySelector("#readiness-list").innerHTML = data.publishingReadiness.map((item) => `
    <article class="readiness-item">
      <div>
        <strong>${item.area}</strong>
        <span class="status ${toneClass(item.status)}">${item.status}</span>
      </div>
      <p>${item.check}</p>
      <small>${item.owner}</small>
      <p>${item.action}</p>
    </article>
  `).join("");

  document.querySelector("#release-checklist").innerHTML = data.releaseChecklist.map(([check, requirement, status]) => `
    <article>
      <span>${requirement}</span>
      <strong>${check}</strong>
      <p>${status}</p>
    </article>
  `).join("");
}

function wireTabs() {
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".surface").forEach((surface) => surface.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`#surface-${button.dataset.surface}`).classList.add("active");
    });
  });
}

renderSummary();
renderTriage();
renderOptimizationQueue();
renderPublishingReadiness();
wireTabs();
