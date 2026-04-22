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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-72vmOu0S.js"), "./Pages/Admin/Disputes/Index.vue": () => import("./assets/Index-BTrUL3Tl.js"), "./Pages/Admin/Disputes/Show.vue": () => import("./assets/Show-CxBuLPdz.js"), "./Pages/Admin/Products/Index.vue": () => import("./assets/Index-DfRXiqfx.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-Bq2K5uhm.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-fSRltq9X.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-D_Vgx7Z7.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-Cn7vWoJA.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BQ5sFKXa.js"), "./Pages/Auth/VerifyCode.vue": () => import("./assets/VerifyCode-BjkZCrwb.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-CzXTSC6r.js"), "./Pages/Chat/Index.vue": () => import("./assets/Index-CXJTYZFD.js"), "./Pages/Chat/Show.vue": () => import("./assets/Show-C6ApNZ7F.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-D6OFr34n.js"), "./Pages/Home.vue": () => import("./assets/Home-BZa-1emy.js"), "./Pages/Products/Create.vue": () => import("./assets/Create-BJFU7Yhx.js"), "./Pages/Products/Edit.vue": () => import("./assets/Edit-CnO9JtTT.js"), "./Pages/Products/Favorites.vue": () => import("./assets/Favorites-Cp1bwIls.js"), "./Pages/Products/Show.vue": () => import("./assets/Show-BBdRliaI.js"), "./Pages/Profile/DisputeForm.vue": () => import("./assets/DisputeForm-DotxPM7z.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-DcMUoPgi.js"), "./Pages/Profile/Orders.vue": () => import("./assets/Orders-DuYaU_U-.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-CiRQjIi_.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-DhXA2h2s.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-B9t5C5Ol.js"), "./Pages/Profile/VerifySeller.vue": () => import("./assets/VerifySeller-ndAfif1M.js"), "./Pages/Store/Show.vue": () => import("./assets/Show-8K1U3znv.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin).use(ZiggyVue, {
        ...props.initialPage.props.ziggy,
        location: new URL(props.initialPage.props.ziggy.location)
      });
    }
  })
);
