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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-BlT00ztu.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-CkDmPSD3.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-9ZCEUk_e.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DcgMZFV_.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DboB25FM.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-CjdrD5m9.js"), "./Pages/Chat/Index.vue": () => import("./assets/Index-BwFBNiO0.js"), "./Pages/Chat/Show.vue": () => import("./assets/Show-B-GaEz2t.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-CPjnbKRh.js"), "./Pages/Home.vue": () => import("./assets/Home-ZrcHpTeP.js"), "./Pages/Products/Create.vue": () => import("./assets/Create-Cwcgw_rF.js"), "./Pages/Products/Edit.vue": () => import("./assets/Edit-Be2S0A4y.js"), "./Pages/Products/Favorites.vue": () => import("./assets/Favorites-D_83wT2d.js"), "./Pages/Products/Show.vue": () => import("./assets/Show-B8aJXKjr.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-BICoXHb5.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-2T2EYzR-.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-BQD6Fr3v.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-C3Qjpk6n.js"), "./Pages/Store/Show.vue": () => import("./assets/Show-PbLFfeeA.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin).use(ZiggyVue, {
        ...props.initialPage.props.ziggy,
        location: new URL(props.initialPage.props.ziggy.location)
      });
    }
  })
);
