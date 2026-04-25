import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$2 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$3 } from "./InputError-CAen27BF.js";
import { ExternalLink } from "lucide-vue-next";
const _sfc_main = {
  __name: "SpecsStep",
  __ssrInlineRender: true,
  props: {
    form: Object,
    formSections: Array,
    filteredBrands: Array,
    currentCategory: Object,
    selectedCategoryName: String
  },
  emits: ["openGsmSearch"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h3 class="text-lg font-bold">Spesifikasi Produk</h3><p class="text-sm text-muted-foreground">Isi detail teknis gawai Anda.</p></div><button type="button" class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-accent px-3 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/80">`);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "h-3.5 w-3.5" }, null, _parent));
      _push(`<span>${ssrInterpolate(__props.selectedCategoryName.includes("smartphone") || __props.selectedCategoryName.includes("tablet") ? "GSM Arena" : "Cari Spek")}</span></button></div>`);
      if ((_a = __props.currentCategory) == null ? void 0 : _a.sub_types) {
        _push(`<div class="mb-6">`);
        _push(ssrRenderComponent(_sfc_main$1, { value: "Tipe Spesifik" }, null, _parent));
        _push(`<div class="mt-2 flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(__props.currentCategory.sub_types, (st) => {
          _push(`<button type="button" class="${ssrRenderClass([__props.form.specifications.sub_type === st.value ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-background text-muted-foreground border-border hover:bg-muted", "rounded-xl border px-4 py-2 text-sm font-medium transition-all"])}">${ssrInterpolate(st.label)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-8"><!--[-->`);
      ssrRenderList(__props.formSections, (section) => {
        _push(`<div><p class="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">${ssrInterpolate(section.label)}</p><div class="grid grid-cols-1 gap-5 sm:grid-cols-2"><!--[-->`);
        ssrRenderList(section.fields, (field) => {
          _push(`<div>`);
          if (field.type === "select") {
            _push(`<div>`);
            _push(ssrRenderComponent(_sfc_main$1, {
              for: field.key,
              value: field.label + (field.unit ? ` (${field.unit})` : "")
            }, null, _parent));
            if (["brand", "type"].includes(field.key)) {
              _push(`<select${ssrRenderAttr("id", field.key)} class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"${ssrIncludeBooleanAttr(field.required) ? " required" : ""}><option value=""${ssrIncludeBooleanAttr(Array.isArray(__props.form[field.key]) ? ssrLooseContain(__props.form[field.key], "") : ssrLooseEqual(__props.form[field.key], "")) ? " selected" : ""}>${ssrInterpolate(field.placeholder || "Pilih...")}</option>`);
              if (field.key === "brand") {
                _push(`<!--[-->`);
                ssrRenderList(__props.filteredBrands, (brand) => {
                  _push(`<option${ssrRenderAttr("value", brand)}${ssrIncludeBooleanAttr(Array.isArray(__props.form[field.key]) ? ssrLooseContain(__props.form[field.key], brand) : ssrLooseEqual(__props.form[field.key], brand)) ? " selected" : ""}>${ssrInterpolate(brand)}</option>`);
                });
                _push(`<!--]-->`);
              } else {
                _push(`<!--[-->`);
                ssrRenderList(field.options, (opt) => {
                  _push(`<option${ssrRenderAttr("value", opt)}${ssrIncludeBooleanAttr(Array.isArray(__props.form[field.key]) ? ssrLooseContain(__props.form[field.key], opt) : ssrLooseEqual(__props.form[field.key], opt)) ? " selected" : ""}>${ssrInterpolate(opt)}</option>`);
                });
                _push(`<!--]-->`);
              }
              _push(`</select>`);
            } else {
              _push(`<select${ssrRenderAttr("id", field.key)} class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"${ssrIncludeBooleanAttr(field.required) ? " required" : ""}><option value=""${ssrIncludeBooleanAttr(Array.isArray(__props.form.specifications[field.key]) ? ssrLooseContain(__props.form.specifications[field.key], "") : ssrLooseEqual(__props.form.specifications[field.key], "")) ? " selected" : ""}>${ssrInterpolate(field.placeholder || "Pilih...")}</option><!--[-->`);
              ssrRenderList(field.options, (opt) => {
                _push(`<option${ssrRenderAttr("value", opt)}${ssrIncludeBooleanAttr(Array.isArray(__props.form.specifications[field.key]) ? ssrLooseContain(__props.form.specifications[field.key], opt) : ssrLooseEqual(__props.form.specifications[field.key], opt)) ? " selected" : ""}>${ssrInterpolate(opt)}</option>`);
              });
              _push(`<!--]--></select>`);
            }
            if (field.allowOther && (["brand", "type"].includes(field.key) ? __props.form[field.key] : __props.form.specifications[field.key]) === "Other") {
              _push(`<div class="mt-2">`);
              if (["brand", "type"].includes(field.key)) {
                _push(ssrRenderComponent(_sfc_main$2, {
                  modelValue: __props.form["custom_" + field.key],
                  "onUpdate:modelValue": ($event) => __props.form["custom_" + field.key] = $event,
                  placeholder: "Sebutkan " + field.label,
                  class: "h-10",
                  required: ""
                }, null, _parent));
              } else {
                _push(ssrRenderComponent(_sfc_main$2, {
                  modelValue: __props.form.specifications["custom_" + field.key],
                  "onUpdate:modelValue": ($event) => __props.form.specifications["custom_" + field.key] = $event,
                  placeholder: "Sebutkan " + field.label,
                  class: "h-10",
                  required: ""
                }, null, _parent));
              }
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(ssrRenderComponent(_sfc_main$3, {
              class: "mt-1",
              message: ["brand", "type"].includes(field.key) ? __props.form.errors[field.key] : __props.form.errors["specifications." + field.key]
            }, null, _parent));
            _push(`</div>`);
          } else if (["number", "text"].includes(field.type)) {
            _push(`<div>`);
            _push(ssrRenderComponent(_sfc_main$1, {
              for: field.key,
              value: field.label + (field.unit ? ` (${field.unit})` : "")
            }, null, _parent));
            if (["brand", "type"].includes(field.key)) {
              _push(ssrRenderComponent(_sfc_main$2, {
                modelValue: __props.form[field.key],
                "onUpdate:modelValue": ($event) => __props.form[field.key] = $event,
                id: field.key,
                type: field.type,
                class: "mt-1 block h-11 w-full",
                placeholder: field.placeholder,
                required: field.required
              }, null, _parent));
            } else {
              _push(ssrRenderComponent(_sfc_main$2, {
                modelValue: __props.form.specifications[field.key],
                "onUpdate:modelValue": ($event) => __props.form.specifications[field.key] = $event,
                id: field.key,
                type: field.type,
                class: "mt-1 block h-11 w-full",
                placeholder: field.placeholder,
                required: field.required
              }, null, _parent));
            }
            _push(ssrRenderComponent(_sfc_main$3, {
              class: "mt-1",
              message: ["brand", "type"].includes(field.key) ? __props.form.errors[field.key] : __props.form.errors["specifications." + field.key]
            }, null, _parent));
            _push(`</div>`);
          } else if (field.type === "boolean") {
            _push(`<div class="flex items-center gap-3 pt-6">`);
            if (["brand", "type"].includes(field.key)) {
              _push(`<input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(__props.form[field.key]) ? ssrLooseContain(__props.form[field.key], null) : __props.form[field.key]) ? " checked" : ""}${ssrRenderAttr("id", field.key)} class="h-5 w-5 rounded border-border text-primary focus:ring-primary">`);
            } else {
              _push(`<input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(__props.form.specifications[field.key]) ? ssrLooseContain(__props.form.specifications[field.key], null) : __props.form.specifications[field.key]) ? " checked" : ""}${ssrRenderAttr("id", field.key)} class="h-5 w-5 rounded border-border text-primary focus:ring-primary">`);
            }
            _push(`<label${ssrRenderAttr("for", field.key)} class="cursor-pointer text-sm font-medium leading-none">${ssrInterpolate(field.label)} `);
            if (field.placeholder) {
              _push(`<span class="block text-[10px] font-normal text-muted-foreground">${ssrInterpolate(field.placeholder)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</label>`);
            _push(ssrRenderComponent(_sfc_main$3, {
              class: "mt-1",
              message: ["brand", "type"].includes(field.key) ? __props.form.errors[field.key] : __props.form.errors["specifications." + field.key]
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Partials/SpecsStep.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
