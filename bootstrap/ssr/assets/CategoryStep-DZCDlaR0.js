import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { useSSRContext } from "vue";
import "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$1 } from "./InputError-CAen27BF.js";
const _sfc_main = {
  __name: "CategoryStep",
  __ssrInlineRender: true,
  props: {
    form: Object,
    categories: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="mb-1 text-lg font-bold">Pilih Kategori</h3><p class="mb-6 text-sm text-muted-foreground">Pilih kategori gawai yang ingin Anda jual.</p><div class="grid grid-cols-2 gap-3 sm:grid-cols-3"><!--[-->`);
      ssrRenderList(__props.categories, (cat) => {
        _push(`<button type="button" class="${ssrRenderClass([__props.form.category_id === cat.id ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border bg-muted/40 text-foreground", "rounded-xl border-2 p-4 text-left text-sm font-semibold transition-all hover:border-primary/60"])}">${ssrInterpolate(cat.name)}</button>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-3",
        message: __props.form.errors.category_id
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Partials/CategoryStep.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
