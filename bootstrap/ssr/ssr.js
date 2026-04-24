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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-C8oo7YWd.js"), "./Pages/Admin/Disputes/Index.vue": () => import("./assets/Index-k43241wQ.js"), "./Pages/Admin/Disputes/Show.vue": () => import("./assets/Show-D1KIZFMO.js"), "./Pages/Admin/Products/Index.vue": () => import("./assets/Index-DgLIUypq.js"), "./Pages/Admin/Users/Index.vue": () => import("./assets/Index-DiO23LJ_.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-Bq2K5uhm.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-fSRltq9X.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-D_Vgx7Z7.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-Cn7vWoJA.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BQ5sFKXa.js"), "./Pages/Auth/VerifyCode.vue": () => import("./assets/VerifyCode-BjkZCrwb.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-CzXTSC6r.js"), "./Pages/Buyer/Dashboard.vue": () => import("./assets/Dashboard-DY0LPe9M.js"), "./Pages/Chat/Index.vue": () => import("./assets/Index-D_uAxMBN.js"), "./Pages/Chat/Show.vue": () => import("./assets/Show-SVMB3hgv.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-D5x4Tsg1.js"), "./Pages/Home.vue": () => import("./assets/Home-BEuEwPGk.js"), "./Pages/Products/Create.vue": () => import("./assets/Create-BmK1YXIO.js"), "./Pages/Products/Edit.vue": () => import("./assets/Edit-CrkjJG9Q.js"), "./Pages/Products/Favorites.vue": () => import("./assets/Favorites-BIU94xEM.js"), "./Pages/Products/Show.vue": () => import("./assets/Show-CNVkgQxC.js"), "./Pages/Profile/DisputeForm.vue": () => import("./assets/DisputeForm-DotxPM7z.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-j-cHu3n9.js"), "./Pages/Profile/Negotiations.vue": () => import("./assets/Negotiations-U8YlrSmj.js"), "./Pages/Profile/Orders.vue": () => import("./assets/Orders-CDaIAX4t.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-CiRQjIi_.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-DhXA2h2s.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-DDxmmD5M.js"), "./Pages/Profile/VerifySeller.vue": () => import("./assets/VerifySeller-C-GWI24B.js"), "./Pages/Seller/Negotiations.vue": () => import("./assets/Negotiations-Dh-vG5fZ.js"), "./Pages/Store/Show.vue": () => import("./assets/Show-CNmSlRrQ.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin).use(ZiggyVue, {
        ...props.initialPage.props.ziggy,
        location: new URL(props.initialPage.props.ziggy.location)
      });
    }
  })
);
