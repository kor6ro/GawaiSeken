import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ChevronLeft } from "lucide-vue-next";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "BackButton",
  __ssrInlineRender: true,
  props: {
    fallbackRoute: {
      type: String,
      default: "home"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground flex-shrink-0" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent));
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BackButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
