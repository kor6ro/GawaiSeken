import { unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { Check, X, ImagePlus } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$1 } from "./InputLabel-D_lYO37a.js";
const _sfc_main = {
  __name: "EditMediaStep",
  __ssrInlineRender: true,
  props: {
    product: Object,
    form: Object,
    imagePreviews: Array,
    isExistingDeleted: Function
  },
  emits: ["handleFiles", "removeNewFile", "toggleDeleteExisting"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="mb-1 text-lg font-bold">Foto Produk</h3><p class="mb-6 text-sm text-muted-foreground">Kelola foto produk Anda. Maksimal 10 foto.</p>`);
      if (__props.product.images.length > 0) {
        _push(`<div class="mb-8">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: "Foto Saat Ini (Klik untuk hapus)",
          class: "mb-3"
        }, null, _parent));
        _push(`<div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"><!--[-->`);
        ssrRenderList(__props.product.images, (img) => {
          _push(`<div class="${ssrRenderClass([{ "opacity-30 grayscale scale-95 border-destructive": __props.isExistingDeleted(img.id) }, "group relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm transition-all"])}"><img${ssrRenderAttr("src", "/storage/" + img.image_path)} class="h-full w-full object-cover"><button type="button" class="${ssrRenderClass([__props.isExistingDeleted(img.id) ? "bg-primary text-white" : "bg-background/80 text-foreground hover:bg-destructive hover:text-white", "absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-lg transition-all"])}">`);
          if (__props.isExistingDeleted(img.id)) {
            _push(ssrRenderComponent(unref(Check), { class: "h-3 w-3" }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent));
          }
          _push(`</button>`);
          if (__props.isExistingDeleted(img.id)) {
            _push(`<div class="absolute inset-0 flex items-center justify-center"><span class="bg-destructive px-1.5 py-0.5 text-[8px] font-bold text-white rounded">DIHAPUS</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<label for="images" class="group flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 transition-all hover:border-primary hover:bg-primary/5">`);
      _push(ssrRenderComponent(unref(ImagePlus), { class: "mb-2 h-7 w-7 text-muted-foreground transition-colors group-hover:text-primary" }, null, _parent));
      _push(`<p class="text-sm font-semibold text-muted-foreground group-hover:text-primary">Tambah foto baru</p><input id="images" type="file" class="hidden" multiple accept="image/jpeg,image/png,image/jpg"></label>`);
      if (__props.imagePreviews.length > 0) {
        _push(`<div class="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"><!--[-->`);
        ssrRenderList(__props.imagePreviews, (preview, index) => {
          _push(`<div class="group relative aspect-square overflow-hidden rounded-xl border border-primary/30 bg-card shadow-sm"><img${ssrRenderAttr("src", preview.url)} class="h-full w-full object-cover"><button type="button" class="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg">`);
          _push(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent));
          _push(`</button><div class="absolute bottom-0 left-0 right-0 bg-emerald-500/80 py-0.5 text-center text-[9px] font-bold text-white">BARU</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        class: "mt-2",
        message: __props.form.errors.images
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Partials/EditMediaStep.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
