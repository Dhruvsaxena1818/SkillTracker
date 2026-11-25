document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("coursesGrid");
  const details = document.getElementById("courseDetails");
  if (grid) {
    const search = document.getElementById("courseSearch");
    const filter = document.getElementById("courseFilter");
    function render() {
      const query = search.value.toLowerCase();
      const status = filter.value;
      const list = getCourses().filter(course =>
        (course.title.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query)) &&
        (status === "all" || course.status === status)
      );
      grid.innerHTML = list.length ? list.map(course => `
        <a class="course-card card" href="course-details.html?id=${course.id}">
          <div class="course-cover ${course.theme}-cover"><span>${course.icon}</span><span class="pill" style="background:#ffffff30;color:white">${course.status}</span></div>
          <div class="course-body"><h3>${course.title}</h3><p>${course.instructor} · ${course.duration}</p><div class="course-meta"><span>${course.lessons} lessons</span><strong>${course.progress}%</strong></div><div class="progress"><span style="width:${course.progress}%"></span></div></div>
        </a>`).join("") : '<div class="card empty-state">No courses match your search.</div>';
    }
    search.addEventListener("input", render); filter.addEventListener("change", render); render();
  }
  if (details) {
    const id = new URLSearchParams(window.location.search).get("id");
    const course = getCourseById(id);
    if (!course) { details.innerHTML = '<div class="card empty-state">Course not found. <a href="courses.html">Back to courses</a></div>'; return; }
    details.innerHTML = `
      <div class="course-detail-hero"><p class="eyebrow" style="color:#d8d8ff">COURSE OVERVIEW</p><h1>${course.icon} ${course.title}</h1><p>${course.description}</p><p style="margin:18px 0 0;color:#e2e2ff">Instructor: ${course.instructor} · ${course.duration} · ${course.lessons} lessons</p></div>
      <div class="grid-2"><div class="card card-pad"><div class="section-title"><h2>Your progress</h2><strong>${course.progress}%</strong></div><div class="progress"><span style="width:${course.progress}%"></span></div><p class="muted" style="margin:14px 0 0">Status: ${course.status}</p></div>
      <div class="card card-pad"><h2 style="font:700 16px Manrope">About this course</h2><p class="muted" style="line-height:1.8">${course.description}</p></div></div>
      <div class="card card-pad" style="margin-top:20px"><div class="section-title"><h2>Course modules</h2><span class="pill">${course.lessons} lessons</span></div><div class="lesson-list">${["Introduction and fundamentals","Core concepts and practical examples","Guided exercises","Review and final practice"].map((lesson,i)=>`<div class="lesson-row"><strong><span class="muted">0${i+1}</span> &nbsp; ${lesson}</strong><span class="pill ${i===0?"green":""}">${i===0?"Available":"Upcoming"}</span></div>`).join("")}</div></div>`;
  }
});
