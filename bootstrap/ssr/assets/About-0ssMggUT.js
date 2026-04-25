import { unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { Info } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "About Us" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-16"${_scopeId}><div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-12"${_scopeId}><div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-4xl font-black tracking-tight text-foreground sm:text-5xl"${_scopeId}>Tentang GawaiSeken</h1><p class="mt-4 text-lg text-muted-foreground"${_scopeId}>Mewujudkan ekosistem jual beli gadget seken yang aman, transparan, dan terpercaya.</p></div><div class="prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm"${_scopeId}><h3${_scopeId}>Visi Kami</h3><p${_scopeId}> GawaiSeken hadir untuk menjembatani pembeli dan penjual gadget bekas di seluruh Indonesia. Kami percaya bahwa setiap gadget memiliki nilai dan fungsi yang masih bisa dimanfaatkan dengan baik oleh orang lain. Misi kami adalah menciptakan platform yang tidak hanya memfasilitasi transaksi, tetapi juga membangun komunitas pecinta gadget yang solid. </p><h3${_scopeId}>Mengapa Memilih Kami?</h3><ul${_scopeId}><li${_scopeId}><strong${_scopeId}>Transaksi COD Murni:</strong> Bertemu langsung dengan penjual untuk memeriksa barang sebelum membayar, menjamin kepuasan 100%.</li><li${_scopeId}><strong${_scopeId}>Tanpa Potongan Admin:</strong> Transaksi di GawaiSeken sepenuhnya gratis tanpa potongan biaya platform bagi pembeli maupun penjual.</li><li${_scopeId}><strong${_scopeId}>Verifikasi Penjual:</strong> Sistem KYC (Know Your Customer) kami memastikan bahwa Anda bertransaksi dengan penjual yang terverifikasi dan amanah.</li><li${_scopeId}><strong${_scopeId}>Fitur Nego Harga:</strong> Tawar menawar harga layaknya di pasar tradisional, namun dengan kenyamanan aplikasi digital.</li></ul><h3${_scopeId}>Perjalanan Kami</h3><p${_scopeId}> Berawal dari kesulitan tim kami dalam menemukan platform jual beli gadget bekas yang transparan dan tanpa biaya tersembunyi, GawaiSeken diciptakan sebagai solusi dari komunitas untuk komunitas. Kami terus berkembang dan berinovasi untuk memberikan pengalaman pengguna yang lebih baik setiap harinya. </p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-16" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-12" }, [
                    createVNode("div", { class: "inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6" }, [
                      createVNode(unref(Info), { class: "h-8 w-8" })
                    ]),
                    createVNode("h1", { class: "text-4xl font-black tracking-tight text-foreground sm:text-5xl" }, "Tentang GawaiSeken"),
                    createVNode("p", { class: "mt-4 text-lg text-muted-foreground" }, "Mewujudkan ekosistem jual beli gadget seken yang aman, transparan, dan terpercaya.")
                  ]),
                  createVNode("div", { class: "prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm" }, [
                    createVNode("h3", null, "Visi Kami"),
                    createVNode("p", null, " GawaiSeken hadir untuk menjembatani pembeli dan penjual gadget bekas di seluruh Indonesia. Kami percaya bahwa setiap gadget memiliki nilai dan fungsi yang masih bisa dimanfaatkan dengan baik oleh orang lain. Misi kami adalah menciptakan platform yang tidak hanya memfasilitasi transaksi, tetapi juga membangun komunitas pecinta gadget yang solid. "),
                    createVNode("h3", null, "Mengapa Memilih Kami?"),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createVNode("strong", null, "Transaksi COD Murni:"),
                        createTextVNode(" Bertemu langsung dengan penjual untuk memeriksa barang sebelum membayar, menjamin kepuasan 100%.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Tanpa Potongan Admin:"),
                        createTextVNode(" Transaksi di GawaiSeken sepenuhnya gratis tanpa potongan biaya platform bagi pembeli maupun penjual.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Verifikasi Penjual:"),
                        createTextVNode(" Sistem KYC (Know Your Customer) kami memastikan bahwa Anda bertransaksi dengan penjual yang terverifikasi dan amanah.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Fitur Nego Harga:"),
                        createTextVNode(" Tawar menawar harga layaknya di pasar tradisional, namun dengan kenyamanan aplikasi digital.")
                      ])
                    ]),
                    createVNode("h3", null, "Perjalanan Kami"),
                    createVNode("p", null, " Berawal dari kesulitan tim kami dalam menemukan platform jual beli gadget bekas yang transparan dan tanpa biaya tersembunyi, GawaiSeken diciptakan sebagai solusi dari komunitas untuk komunitas. Kami terus berkembang dan berinovasi untuk memberikan pengalaman pengguna yang lebih baik setiap harinya. ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Static/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
