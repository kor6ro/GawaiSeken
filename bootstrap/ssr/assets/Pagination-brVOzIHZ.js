import { unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    links: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.links.length > 3) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="-mb-1 mt-12 flex flex-wrap justify-center"><!--[-->`);
        ssrRenderList(__props.links, (link, key) => {
          _push(`<!--[-->`);
          if (link.url === null) {
            _push(`<div class="mb-1 mr-1 rounded-xl border border-border px-4 py-3 text-sm leading-4 text-muted-foreground">${link.label ?? ""}</div>`);
          } else {
            _push(ssrRenderComponent(unref(Link), {
              key: `link-${key}`,
              class: ["mb-1 mr-1 rounded-xl border border-border px-4 py-3 text-sm leading-4 transition-all duration-100 hover:bg-accent hover:text-accent-foreground focus:border-primary focus:text-primary", { "border-primary bg-primary font-bold text-primary-foreground": link.active }],
              href: link.url
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
