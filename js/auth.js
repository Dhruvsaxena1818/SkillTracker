const DEMO_USER = { name: "Dhruv Saxena", email: "student@skilltracker.com", password: "student123" };

function getCurrentUser() {
  return Storage.get(STORAGE_KEYS.session, null);
}
function requireAuth() {
  if (!getCurrentUser()) window.location.href = "login.html";
}
function redirectIfLoggedIn() {
  if (getCurrentUser()) window.location.href = "index.html";
}
function logout() {
  Storage.remove(STORAGE_KEYS.session);
  window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    redirectIfLoggedIn();
    loginForm.addEventListener("submit", event => {
      event.preventDefault();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const errorBox = document.getElementById("loginError");
      if (email === DEMO_USER.email && password === DEMO_USER.password) {
        Storage.set(STORAGE_KEYS.session, { name: DEMO_USER.name, email: DEMO_USER.email });
        window.location.href = "index.html";
      } else {
        errorBox.textContent = "Email or password is incorrect. Please try the demo credentials shown below.";
        errorBox.classList.add("show");
      }
    });
  }
  if (document.querySelector(".app-shell")) {
    requireAuth();
    const user = getCurrentUser();
    if (user) {
      const name = document.getElementById("topUserName");
      const avatar = document.getElementById("topAvatar");
      if (name) name.textContent = user.name;
      if (avatar) avatar.textContent = user.name.split(" ").map(part => part[0]).join("").slice(0,2).toUpperCase();
    }
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    document.getElementById("menuToggle")?.addEventListener("click", () => document.getElementById("sidebar")?.classList.toggle("open"));
  }
});
