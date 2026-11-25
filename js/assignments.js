document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("assignmentsTable");
  if (!table) return;
  const search = document.getElementById("assignmentSearch");
  const filter = document.getElementById("assignmentFilter");
  const panel = document.getElementById("submissionPanel");
  function render() {
    const query = search.value.toLowerCase();
    const status = filter.value;
    const items = getAssignments().filter(item =>
      (item.title.toLowerCase().includes(query) || getCourseName(item.courseId).toLowerCase().includes(query)) &&
      (status === "all" || item.status === status)
    );
    table.innerHTML = items.length ? items.map(item => `
      <tr><td><strong>${item.title}</strong></td><td>${getCourseName(item.courseId)}</td><td>${formatDate(item.dueDate)}</td>
      <td><span class="pill ${item.status==="Graded"?"green":item.status==="Submitted"?"orange":"red"}">${item.status}</span></td>
      <td>${item.status==="Pending"?`<button class="btn btn-small" data-submit="${item.id}">Submit</button>`:item.status==="Graded"?`<span class="muted">${item.score}%</span>`:"Submitted"}</td></tr>`).join("") : '<tr><td colspan="5" class="empty-state">No assignments found.</td></tr>';
    table.querySelectorAll("[data-submit]").forEach(button => button.addEventListener("click", () => openSubmission(Number(button.dataset.submit))));
  }
  function openSubmission(id) {
    const item = getAssignments().find(a => a.id === id);
    document.getElementById("submissionId").value = id;
    document.getElementById("submissionTitle").textContent = `Submit: ${item.title}`;
    document.getElementById("submissionText").value = "";
    panel.hidden = false; panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  document.getElementById("submissionForm").addEventListener("submit", event => {
    event.preventDefault();
    const id = Number(document.getElementById("submissionId").value);
    const note = document.getElementById("submissionText").value.trim();
    if (!note) return;
    const items = getAssignments();
    const item = items.find(a => a.id === id);
    item.status = "Submitted"; item.submission = note;
    saveAssignments(items); panel.hidden = true; render(); showToast("Assignment submitted successfully.");
  });
  document.getElementById("closeSubmission").addEventListener("click", () => panel.hidden = true);
  search.addEventListener("input", render); filter.addEventListener("change", render); render();
});
