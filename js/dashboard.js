document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("courseCount")) return;
  const courses = getCourses();
  const assignments = getAssignments();
  const graded = assignments.filter(item => item.status === "Graded" && typeof item.score === "number");
  const average = graded.length ? Math.round(graded.reduce((sum, item) => sum + item.score, 0) / graded.length) : 0;
  document.getElementById("courseCount").textContent = courses.length;
  document.getElementById("assignmentCount").textContent = assignments.length;
  document.getElementById("pendingCount").textContent = assignments.filter(item => item.status === "Pending").length;
  document.getElementById("averageGrade").textContent = `${average}%`;
  const user = getCurrentUser();
  document.getElementById("welcomeTitle").textContent = `Welcome back, ${user?.name?.split(" ")[0] || "Student"}!`;
  document.getElementById("dashboardCourses").innerHTML = courses.slice(0,2).map(course => `
    <a class="course-card card" href="course-details.html?id=${course.id}">
      <div class="course-cover ${course.theme}-cover"><span>${course.icon}</span><span class="pill" style="background:#ffffff30;color:white">${course.status}</span></div>
      <div class="course-body"><h3>${course.title}</h3><p>${course.instructor}</p><div class="course-meta"><span>Progress</span><strong>${course.progress}%</strong></div><div class="progress"><span style="width:${course.progress}%"></span></div></div>
    </a>`).join("");
  const upcoming = assignments.filter(item => item.status === "Pending" || item.status === "Submitted").slice(0,4);
  document.getElementById("upcomingAssignments").innerHTML = upcoming.length ? upcoming.map(item => `
    <div class="activity-item"><div class="activity-dot">☷</div><div><strong>${item.title}</strong><small>${getCourseName(item.courseId)} · Due ${formatDate(item.dueDate)}</small></div></div>`).join("") : '<div class="empty-state">No upcoming assignments.</div>';
});
