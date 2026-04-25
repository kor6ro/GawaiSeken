import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$2 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$3 } from "./InputError-CAen27BF.js";
import { useSSRContext } from "vue";
const _sfc_main = {
  __name: "KelengkapanStep",
  __ssrInlineRender: true,
  props: {
    form: Object,
    currentCategory: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="mb-1 text-lg font-bold">Kelengkapan Produk</h3><p class="mb-6 text-sm text-muted-foreground">Centang semua item yang tersedia dalam paket penjualan.</p>`);
      if (__props.currentCategory) {
        _push(`<div class="grid grid-cols-2 gap-3 sm:grid-cols-3"><!--[-->`);
        ssrRenderList(__props.currentCategory.checklists, (item) => {
          _push(`<label class="${ssrRenderClass([__props.form.specifications.kelengkapan.includes(item) ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 hover:border-primary/40", "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all"])}"><input type="checkbox"${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(Array.isArray(__props.form.specifications.kelengkapan) ? ssrLooseContain(__props.form.specifications.kelengkapan, item) : __props.form.specifications.kelengkapan) ? " checked" : ""} class="h-5 w-5 rounded border-border text-primary focus:ring-primary"><span class="text-sm font-semibold">${ssrInterpolate(item)}</span></label>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="text-sm italic text-muted-foreground">Pilih kategori terlebih dahulu.</p>`);
      }
      _push(`<div class="mt-5">`);
      _push(ssrRenderComponent(_sfc_main$1, { value: "Keterangan Lain (Opsional)" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: __props.form.specifications.kelengkapan_note,
        "onUpdate:modelValue": ($event) => __props.form.specifications.kelengkapan_note = $event,
        placeholder: "Misal: Dus ada penyok dikit",
        class: "mt-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-1",
        message: __props.form.errors["specifications.kelengkapan_note"]
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-3",
        message: __props.form.errors["specifications.kelengkapan"]
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Partials/KelengkapanStep.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
