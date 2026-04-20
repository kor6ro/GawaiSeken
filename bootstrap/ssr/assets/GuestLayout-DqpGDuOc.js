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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background text-foreground transition-colors duration-300 font-sans antialiased" }, _attrs))}><div class="w-full sm:max-w-md mt-6 px-6 py-8 bg-card text-card-foreground border border-border shadow-xl sm:rounded-3xl"><div class="flex justify-center mb-8">`);
      _push(ssrRenderComponent(unref(Link), { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { class: "w-32 h-auto text-primary" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { class: "w-32 h-auto text-primary" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="mt-8"><button class="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors">`);
      if (!isDark.value) {
        _push(`<span>Mode Gelap</span>`);
      } else {
        _push(`<span>Mode Terang</span>`);
      }
      _push(`</button></div></div>`);
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
