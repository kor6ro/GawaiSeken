import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { ZiggyVue } from "ziggy-js";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "GawaiSeken";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DUqaiff7.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-BhqLWciw.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-CurL5meL.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-B6azyFMb.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-uT8W-s_d.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-CzXTSC6r.js"), "./Pages/Chat/Index.vue": () => import("./assets/Index-CYiiF7ew.js"), "./Pages/Chat/Show.vue": () => import("./assets/Show-Cey_cNVg.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-B6rKY4f2.js"), "./Pages/Home.vue": () => import("./assets/Home-BhVLz55e.js"), "./Pages/Products/Create.vue": () => import("./assets/Create-DylKl9rU.js"), "./Pages/Products/Edit.vue": () => import("./assets/Edit-BbQcHxoD.js"), "./Pages/Products/Favorites.vue": () => import("./assets/Favorites-BcrNb2VV.js"), "./Pages/Products/Show.vue": () => import("./assets/Show-DjXEb-eP.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-47P6SUmO.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-BBjJluVq.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-Bu8h5msk.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-C9xkWZFu.js"), "./Pages/Store/Show.vue": () => import("./assets/Show-Czj3TjiS.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin).use(ZiggyVue, {
        ...props.initialPage.props.ziggy,
        location: new URL(props.initialPage.props.ziggy.location)
      });
    }
  })
);
