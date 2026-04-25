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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-Btf9mI-X.js"), "./Pages/Admin/Disputes/Index.vue": () => import("./assets/Index-SR1TBP0I.js"), "./Pages/Admin/Disputes/Show.vue": () => import("./assets/Show-Cb1DQbZR.js"), "./Pages/Admin/Products/Index.vue": () => import("./assets/Index-6A_qP5M5.js"), "./Pages/Admin/Users/Index.vue": () => import("./assets/Index-y8O1A1AM.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-rnrSLVEb.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-Cc9dH_PT.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-fdpBGM0Z.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-uufDntlf.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-C7jAXaZx.js"), "./Pages/Auth/VerifyCode.vue": () => import("./assets/VerifyCode-PkrjOMEc.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-CmBICfF1.js"), "./Pages/Buyer/Dashboard.vue": () => import("./assets/Dashboard-BI7aR2e4.js"), "./Pages/Chat/Index.vue": () => import("./assets/Index-lM5fNNJ3.js"), "./Pages/Chat/Show.vue": () => import("./assets/Show-BqwMmtT7.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-J954YebN.js"), "./Pages/Home.vue": () => import("./assets/Home-CsjY0DWa.js"), "./Pages/Products/Create.vue": () => import("./assets/Create-CdicL455.js"), "./Pages/Products/Edit.vue": () => import("./assets/Edit-aDVJr2PY.js"), "./Pages/Products/Favorites.vue": () => import("./assets/Favorites-qEI5OS5t.js"), "./Pages/Products/Partials/CategoryStep.vue": () => import("./assets/CategoryStep-DZCDlaR0.js"), "./Pages/Products/Partials/EditMediaStep.vue": () => import("./assets/EditMediaStep-COIoRgqk.js"), "./Pages/Products/Partials/KelengkapanStep.vue": () => import("./assets/KelengkapanStep-C5yCv2OY.js"), "./Pages/Products/Partials/MediaStep.vue": () => import("./assets/MediaStep-DkltcEyO.js"), "./Pages/Products/Partials/SalesStep.vue": () => import("./assets/SalesStep-686x_mPS.js").then((n) => n.S), "./Pages/Products/Partials/SpecsStep.vue": () => import("./assets/SpecsStep-CRyXc8zG.js"), "./Pages/Products/Show.vue": () => import("./assets/Show-Dz3tTA21.js"), "./Pages/Profile/DisputeForm.vue": () => import("./assets/DisputeForm-CyPyB5yR.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-Dwqic18Z.js"), "./Pages/Profile/Negotiations.vue": () => import("./assets/Negotiations-D_zHNPcX.js"), "./Pages/Profile/Orders.vue": () => import("./assets/Orders-BVbm8Gi7.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-h7DyrKoJ.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-KTlCqqRZ.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-DsVEUwX6.js"), "./Pages/Profile/VerifySeller.vue": () => import("./assets/VerifySeller-BI_6rzt5.js"), "./Pages/Seller/Negotiations.vue": () => import("./assets/Negotiations-DSvjnIn0.js"), "./Pages/Static/About.vue": () => import("./assets/About-0ssMggUT.js"), "./Pages/Static/Contact.vue": () => import("./assets/Contact-CHuqGdwL.js"), "./Pages/Static/Privacy.vue": () => import("./assets/Privacy-hxVsE111.js"), "./Pages/Static/Terms.vue": () => import("./assets/Terms-C6J-Fjuv.js"), "./Pages/Store/Show.vue": () => import("./assets/Show-BE85xXMs.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin).use(ZiggyVue, {
        ...props.initialPage.props.ziggy,
        location: new URL(props.initialPage.props.ziggy.location)
      });
    }
  })
);
