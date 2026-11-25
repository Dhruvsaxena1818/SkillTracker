document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("gradesTable");
  if (!table) return;
  const graded = getAssignments().filter(item => item.status === "Graded" && typeof item.score === "number");
  const average = graded.length ? Math.round(graded.reduce((sum,item)=>sum+item.score,0)/graded.length) : 0;
  document.getElementById("gradeAverage").textContent = `${average}%`;
  document.getElementById("gradedCount").textContent = graded.length;
  table.innerHTML = graded.length ? graded.map(item => `<tr><td><strong>${item.title}</strong></td><td>${getCourseName(item.courseId)}</td><td><span class="grade-score">${item.score}%</span></td><td>${item.feedback || "No feedback provided."}</td></tr>`).join("") : '<tr><td colspan="4" class="empty-state">No grades available yet.</td></tr>';
});
