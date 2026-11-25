document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");
  if (!form) return;
  const user = getCurrentUser();
  const profile = Storage.get(STORAGE_KEYS.profile, user);
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("profileEmailInput");
  nameInput.value = profile.name || "";
  emailInput.value = profile.email || "";
  document.getElementById("profileHeading").textContent = profile.name;
  document.getElementById("profileEmail").textContent = profile.email;
  document.getElementById("profileAvatar").textContent = profile.name.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase();
  form.addEventListener("submit", event => {
    event.preventDefault();
    const updated = { name: nameInput.value.trim(), email: emailInput.value.trim() };
    if (!updated.name || !updated.email) return;
    Storage.set(STORAGE_KEYS.profile, updated);
    Storage.set(STORAGE_KEYS.session, updated);
    document.getElementById("profileHeading").textContent = updated.name;
    document.getElementById("profileEmail").textContent = updated.email;
    document.getElementById("profileAvatar").textContent = updated.name.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase();
    document.getElementById("topUserName").textContent = updated.name;
    document.getElementById("topAvatar").textContent = updated.name.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase();
    showToast("Profile updated successfully.");
  });
});
