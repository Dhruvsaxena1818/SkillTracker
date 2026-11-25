const STORAGE_KEYS = {
  session: "skilltracker_session",
  profile: "skilltracker_profile",
  assignments: "skilltracker_assignments",
  notifications: "skilltracker_notifications"
};

const Storage = {
  get(key, fallback = null) {
    try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
    catch (error) { console.error("Could not read local data:", error); return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) { console.error("Could not save local data:", error); return false; }
  },
  remove(key) { localStorage.removeItem(key); }
};

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}
