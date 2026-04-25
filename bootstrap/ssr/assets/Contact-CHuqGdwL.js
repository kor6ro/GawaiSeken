import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { Mail } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Contact Us" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-16"${_scopeId}><div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-12"${_scopeId}><div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Mail), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-4xl font-black tracking-tight text-foreground sm:text-5xl"${_scopeId}>Hubungi Kami</h1><p class="mt-4 text-lg text-muted-foreground"${_scopeId}>Tim dukungan kami siap membantu setiap pertanyaan dan keluhan Anda.</p></div><div class="rounded-3xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Mail), { class: "h-12 w-12 text-primary mx-auto mb-6" }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-2xl font-bold mb-3"${_scopeId}>Email Bantuan</h3><p class="text-muted-foreground mb-8"${_scopeId}>Kirimkan pertanyaan, masukan, atau kendala Anda langsung ke alamat email resmi kami. Tim kami akan merespons pesan Anda secepat mungkin.</p><a href="mailto:gawai2nd@gmail.com" class="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-black text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform"${_scopeId}> gawai2nd@gmail.com </a></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-16" }, [
                createVNode("div", { class: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-12" }, [
                    createVNode("div", { class: "inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6" }, [
                      createVNode(unref(Mail), { class: "h-8 w-8" })
                    ]),
                    createVNode("h1", { class: "text-4xl font-black tracking-tight text-foreground sm:text-5xl" }, "Hubungi Kami"),
                    createVNode("p", { class: "mt-4 text-lg text-muted-foreground" }, "Tim dukungan kami siap membantu setiap pertanyaan dan keluhan Anda.")
                  ]),
                  createVNode("div", { class: "rounded-3xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm" }, [
                    createVNode(unref(Mail), { class: "h-12 w-12 text-primary mx-auto mb-6" }),
                    createVNode("h3", { class: "text-2xl font-bold mb-3" }, "Email Bantuan"),
                    createVNode("p", { class: "text-muted-foreground mb-8" }, "Kirimkan pertanyaan, masukan, atau kendala Anda langsung ke alamat email resmi kami. Tim kami akan merespons pesan Anda secepat mungkin."),
                    createVNode("a", {
                      href: "mailto:gawai2nd@gmail.com",
                      class: "inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-black text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform"
                    }, " gawai2nd@gmail.com ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Static/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
