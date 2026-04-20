import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = {
  __name: "ApplicationLogo",
  __ssrInlineRender: true,
  props: {
    containerClass: {
      type: String,
      default: "relative"
    },
    width: {
      type: String,
      default: "128px"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: __props.containerClass }, _attrs))}><img src="/images/gawaiwhite.png" alt="GawaiSeken" class="block dark:hidden" style="${ssrRenderStyle({ maxWidth: __props.width, height: "auto" })}"><img src="/images/gawaiblack.png" alt="GawaiSeken" class="hidden dark:block" style="${ssrRenderStyle({ maxWidth: __props.width, height: "auto" })}"></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
