import { ref, onMounted, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./ApplicationLogo-5BXBKbkR.js";
const _sfc_main = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = ref(false);
    onMounted(() => {
      isDark.value = document.documentElement.classList.contains("dark");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] font-sans text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100" }, _attrs))}><div class="fixed inset-0 z-0 overflow-hidden pointer-events-none"><div class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]"></div><div class="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-500/5 blur-[120px]"></div></div><div class="relative z-10 w-full px-4 sm:max-w-[440px]"><div class="mb-8 flex flex-col items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "transition-transform hover:scale-105 active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { class: "h-12 w-auto text-primary" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { class: "h-12 w-auto text-primary" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/70 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80 sm:p-10">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="mt-8 flex flex-col items-center gap-4"><button class="rounded-full bg-white/50 px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:bg-white hover:text-slate-900 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 shadow-sm">`);
      if (!isDark.value) {
        _push(`<span>🌙 Mode Gelap</span>`);
      } else {
        _push(`<span>☀️ Mode Terang</span>`);
      }
      _push(`</button><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400"> © 2026 GawaiSeken Marketplace </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
