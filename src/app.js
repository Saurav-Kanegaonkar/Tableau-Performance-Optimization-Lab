const data = window.projectData;
let selected = 0;

function render() {
  document.querySelector("#scoreboard").innerHTML = data.summary.map(([label, value]) => `<article><span>${label}</span><strong>${value}</strong></article>`).join("");
  document.querySelector("#workbooks").innerHTML = data.workbooks.map((workbook, index) => `
    <button class="${index === selected ? "active" : ""}" data-index="${index}">
      <strong>${workbook.name}</strong>
      <span>${workbook.owner} - ${workbook.risk} risk</span>
    </button>
  `).join("");

  const workbook = data.workbooks[selected];
  document.querySelector("#workbook-title").textContent = workbook.name;
  document.querySelector("#health-bars").innerHTML = [
    ["Load speed", workbook.load],
    ["Extract freshness", workbook.freshness],
    ["KPI definition", workbook.definition]
  ].map(([label, value]) => `
    <div class="health-row">
      <span>${label}</span>
      <div><i style="width:${value}%"></i></div>
      <b>${value}</b>
    </div>
  `).join("");
  document.querySelector("#audit-output").textContent = workbook.audit.map((item) => "> " + item).join("\n");
  document.querySelector("#insights").innerHTML = workbook.insights.map((item) => `<p>${item}</p>`).join("");
  document.querySelector("#recommendations").innerHTML = workbook.recs.map((item) => `<p>${item}</p>`).join("");

  document.querySelectorAll("#workbooks button").forEach((button) => {
    button.addEventListener("click", () => {
      selected = Number(button.dataset.index);
      render();
    });
  });
}

render();
