import { ref, watch, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
const _sfc_main = {
  __name: "CurrencyInput",
  __ssrInlineRender: true,
  props: {
    modelValue: [String, Number],
    id: String,
    required: Boolean,
    placeholder: String,
    class: String,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 99999999999
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const displayValue = ref("");
    const formatRupiah = (value) => {
      if (value === null || value === void 0 || value === "") return "";
      const cleanValue = typeof value === "number" ? Math.floor(value).toString() : String(value).replace(/[^0-9]/g, "");
      if (!cleanValue) return "";
      return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    watch(() => props.modelValue, (newVal) => {
      const formatted = formatRupiah(newVal);
      if (formatted !== displayValue.value) {
        displayValue.value = formatted;
      }
    }, { immediate: true });
    onMounted(() => {
      if (props.modelValue) {
        displayValue.value = formatRupiah(props.modelValue);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mt-1" }, _attrs))}><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><span class="text-muted-foreground font-bold text-sm">Rp</span></div><input${ssrRenderAttr("id", __props.id)} type="text"${ssrRenderAttr("value", displayValue.value)} class="${ssrRenderClass([props.class, "block w-full h-11 pl-10 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all"])}"${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrRenderAttr("placeholder", __props.placeholder)}></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CurrencyInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PRODUCT_BRANDS = {
  "1": ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo", "Realme", "Infinix", "Poco", "Asus", "Sony", "Huawei", "Google", "OnePlus", "Advan", "Evercoss", "Luna"],
  // Smartphone
  "2": ["Apple", "Asus", "Lenovo", "HP", "Dell", "Acer", "MSI", "Microsoft", "Huawei", "Xiaomi", "Razer", "Gigabyte", "Axioo", "Zyrex", "Advan"],
  // Laptop
  "3": ["Apple", "Samsung", "Xiaomi", "Huawei", "Lenovo", "Microsoft", "Oppo", "Realme", "Advan", "Axioo", "Evercoss"],
  // Tablet
  "default": ["Apple", "Samsung", "Xiaomi", "Sony", "Logitech", "Razer", "Anker", "Baseus"]
  // Aksesoris/Lainnya
};
const PRODUCT_CONDITIONS = [
  { value: "Bekas Mulus", label: "Bekas Mulus" },
  { value: "Bekas Ada minus", label: "Bekas Ada minus" },
  { value: "Minus", label: "Minus" }
];
const RAM_OPTIONS = ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB", "18GB", "24GB", "32GB", "64GB"];
const STORAGE_OPTIONS = ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB"];
const KELENGKAPAN_OPTIONS = [
  { value: "Fullset", label: "Fullset (Box + Charger)" },
  { value: "Unit + Charger", label: "Unit + Charger" },
  { value: "Batangan", label: "Unit Only / Batangan" }
];
export {
  KELENGKAPAN_OPTIONS as K,
  PRODUCT_BRANDS as P,
  RAM_OPTIONS as R,
  STORAGE_OPTIONS as S,
  _sfc_main as _,
  PRODUCT_CONDITIONS as a
};
