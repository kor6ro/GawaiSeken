import { ref } from "vue";
const onlineUserIds = ref([]);
const setupOnlinePresence = () => {
  if (!window.Echo) return;
  if (window.Echo.connector.channels["presence-online"]) return;
  window.Echo.join("online").here((users) => {
    onlineUserIds.value = users.map((user) => Number(user.id));
  }).joining((user) => {
    if (!onlineUserIds.value.includes(Number(user.id))) {
      onlineUserIds.value.push(Number(user.id));
    }
  }).leaving((user) => {
    onlineUserIds.value = onlineUserIds.value.filter((id) => id !== Number(user.id));
  });
};
const isDark = ref(
  localStorage.getItem("theme") === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches
);
const initTheme = () => {
  document.documentElement.classList.toggle("dark", isDark.value);
};
export {
  initTheme as a,
  isDark as i,
  onlineUserIds as o,
  setupOnlinePresence as s
};
