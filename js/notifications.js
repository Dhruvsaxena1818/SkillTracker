document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("notificationsList");
  if (!list) return;
  function render() {
    const notifications = getNotifications();
    list.innerHTML = notifications.length ? notifications.map(item => `
      <div class="activity-item" style="${item.read?"opacity:.65":""}">
        <div class="activity-dot">♧</div><div style="flex:1"><strong>${item.title} ${item.read?"":'<span class="pill">New</span>'}</strong><p class="muted" style="font-size:12px;margin:5px 0">${item.message}</p><small class="muted">${item.time}</small></div>
      </div>`).join("") : '<div class="empty-state">You are all caught up.</div>';
  }
  document.getElementById("markAllRead").addEventListener("click", () => {
    const items = getNotifications().map(item => ({...item, read:true}));
    saveNotifications(items); render(); showToast("All notifications marked as read.");
  });
  render();
});
