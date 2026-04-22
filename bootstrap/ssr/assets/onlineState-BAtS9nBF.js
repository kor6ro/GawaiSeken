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
export {
  onlineUserIds as o,
  setupOnlinePresence as s
};
