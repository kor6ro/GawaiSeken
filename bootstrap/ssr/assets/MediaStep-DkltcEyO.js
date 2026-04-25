import { unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { ImagePlus, X } from "lucide-vue-next";
import { _ as _sfc_main$1 } from "./InputError-CAen27BF.js";
const _sfc_main = {
  __name: "MediaStep",
  __ssrInlineRender: true,
  props: {
    form: Object,
    imagePreviews: Array,
    fileInput: Object
  },
  emits: ["handleFiles", "removeFile"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="mb-1 text-lg font-bold">Foto Produk</h3><p class="mb-6 text-sm text-muted-foreground">Upload minimal 1 foto. Foto pertama jadi cover.</p><label for="images" class="group flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 transition-all hover:border-primary hover:bg-primary/5">`);
      _push(ssrRenderComponent(unref(ImagePlus), { class: "mb-2 h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" }, null, _parent));
      _push(`<p class="text-sm font-semibold text-muted-foreground group-hover:text-primary">Klik untuk tambah foto</p><p class="mt-1 text-[10px] text-muted-foreground">JPG, PNG – Maks 10 foto</p><input id="images" type="file" class="hidden" multiple accept="image/jpeg,image/png,image/jpg"${ssrIncludeBooleanAttr(__props.form.images.length === 0) ? " required" : ""}></label>`);
      if (__props.imagePreviews.length > 0) {
        _push(`<div class="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"><!--[-->`);
        ssrRenderList(__props.imagePreviews, (preview, index) => {
          _push(`<div class="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm"><img${ssrRenderAttr("src", preview.url)} loading="lazy" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"><button type="button" class="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg transition-transform hover:scale-110">`);
          _push(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent));
          _push(`</button>`);
          if (index === 0) {
            _push(`<div class="absolute bottom-0 left-0 right-0 bg-primary/80 py-0.5 text-center text-[9px] font-bold text-white">COVER</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-2",
        message: __props.form.errors.images
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(__props.form.errors, (error, index) => {
        _push(`<div>`);
        if (String(index).startsWith("images.")) {
          _push(ssrRenderComponent(_sfc_main$1, {
            class: "mt-1",
            message: error
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Partials/MediaStep.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
