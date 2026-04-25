import { ref, watch, mergeProps, useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./InputLabel-D_lYO37a.js";
import "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$3 } from "./InputError-CAen27BF.js";
const _sfc_main$1 = {
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
      const numericValue = Number(value);
      let cleanValue = "";
      if (!isNaN(numericValue)) {
        cleanValue = Math.floor(numericValue).toString();
      } else {
        cleanValue = String(value).replace(/[^0-9]/g, "");
      }
      if (!cleanValue) return "";
      return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    watch(
      () => props.modelValue,
      (newVal) => {
        const formatted = formatRupiah(newVal);
        if (formatted !== displayValue.value) {
          displayValue.value = formatted;
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mt-1" }, _attrs))}><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"><span class="text-sm font-bold text-muted-foreground">Rp</span></div><input${ssrRenderAttr("id", __props.id)} type="text"${ssrRenderAttr("value", displayValue.value)} class="${ssrRenderClass([props.class, "block h-11 w-full rounded-xl border-border bg-background pl-10 text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary"])}"${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrRenderAttr("placeholder", __props.placeholder)}></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CurrencyInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const RAM_OPTIONS = ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB", "24GB", "32GB", "64GB", "128GB", "Other"];
const STORAGE_OPTIONS = ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB", "Other"];
const CONNECTIVITY_OPTIONS = ["Wired", "Wireless", "Bluetooth", "Cellular", "WiFi Only", "Other"];
const POWER_SOURCE_OPTIONS = ["Baterai AA/AAA", "Rechargeable (Built-in)", "Direct AC", "Other"];
const SWITCH_TYPE_OPTIONS = ["Mechanical", "Membrane", "Optical", "Other"];
const CFW_STATUS_OPTIONS = ["Original (OFW)", "Custom Firmware (CFW)", "Jailbreak", "Other"];
const BASE_SPECS = {
  brand: { label: "Merek", type: "select", placeholder: "Pilih Merek", required: true, allowOther: true },
  type: { label: "Tipe / Model", type: "text", placeholder: "Misal: iPhone 13 Pro", required: true },
  ram: { label: "RAM", type: "select", unit: "GB", options: RAM_OPTIONS, placeholder: "Pilih RAM", required: true, allowOther: true },
  storage: { label: "Penyimpanan", type: "select", unit: "GB/TB", options: STORAGE_OPTIONS, placeholder: "Pilih Kapasitas", required: true, allowOther: true },
  battery_health: { label: "Battery Health", type: "number", unit: "%", placeholder: "90", rules: { min: 0, max: 100 } },
  screen_size: { label: "Ukuran Layar", type: "text", unit: "Inch", placeholder: "Misal: 6.7" },
  shutter_count: { label: "Shutter Count", type: "number", placeholder: "Misal: 15000", rules: { min: 0 } },
  connectivity: { label: "Konektivitas", type: "select", options: CONNECTIVITY_OPTIONS, placeholder: "Pilih Koneksi" },
  power_source: { label: "Sumber Daya", type: "select", options: POWER_SOURCE_OPTIONS, placeholder: "Pilih Sumber Daya" },
  switch_type: { label: "Tipe Switch", type: "select", options: SWITCH_TYPE_OPTIONS, placeholder: "Mechanical/Membrane" },
  cfw_status: { label: "Status Firmware", type: "select", options: CFW_STATUS_OPTIONS, placeholder: "Pilih Status" },
  is_battery_balanced: { label: "Baterai L/R Seimbang", type: "boolean", placeholder: "Kiri & kanan masih awet seimbang" },
  is_drift_free: { label: "Bebas Drift (Analog)", type: "boolean", placeholder: "Analog tidak ghosting/drift" },
  has_original_lens: { label: "Lensa Original", type: "boolean", placeholder: "Lensa bawaan masih ada" }
};
const PRODUCT_SCHEMA = {
  smartphone: {
    id: 1,
    label: "Smartphone",
    features: {
      has_ram: true,
      has_storage: true,
      has_battery_health: true,
      has_screen: true
    },
    dynamic_specs: {
      ram: { ...BASE_SPECS.ram },
      storage: { ...BASE_SPECS.storage },
      battery_health: { ...BASE_SPECS.battery_health },
      screen_size: { ...BASE_SPECS.screen_size }
    },
    brands: ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo", "Realme", "Infinix", "Poco", "Asus", "Sony", "Huawei", "Google", "OnePlus", "Advan", "Other"],
    checklists: ["Box", "Charger", "Kabel Data", "Earphone", "Softcase", "Nota Pembelian"]
  },
  tablet: {
    id: 2,
    label: "Tablet",
    features: {
      has_ram: true,
      has_storage: true,
      has_battery_health: true,
      has_screen: true,
      has_connectivity: true
    },
    dynamic_specs: {
      ram: { ...BASE_SPECS.ram },
      storage: { ...BASE_SPECS.storage },
      battery_health: { ...BASE_SPECS.battery_health },
      screen_size: { ...BASE_SPECS.screen_size },
      connectivity: { ...BASE_SPECS.connectivity }
    },
    brands: ["Apple", "Samsung", "Xiaomi", "Huawei", "Lenovo", "Microsoft", "Oppo", "Realme", "Advan", "Axioo", "Other"],
    checklists: ["Box", "Charger", "Kabel Data", "Stylus", "Keyboard Case", "Nota Pembelian"]
  },
  laptop: {
    id: 3,
    label: "Laptop",
    features: {
      has_ram: true,
      has_storage: true,
      has_screen: true
    },
    dynamic_specs: {
      ram: { ...BASE_SPECS.ram },
      storage: { ...BASE_SPECS.storage },
      screen_size: { ...BASE_SPECS.screen_size }
    },
    brands: ["Apple", "Asus", "Lenovo", "HP", "Dell", "Acer", "MSI", "Microsoft", "Huawei", "Xiaomi", "Razer", "Gigabyte", "Axioo", "Other"],
    checklists: ["Box", "Adaptor / Charger", "Tas / Sleeve", "Nota Pembelian"]
  },
  wearable: {
    id: 4,
    label: "Smartwatch & Wearable",
    features: { has_battery_health: true, has_screen: true, has_connectivity: true },
    dynamic_specs: {
      battery_health: { ...BASE_SPECS.battery_health },
      screen_size: { ...BASE_SPECS.screen_size },
      connectivity: { ...BASE_SPECS.connectivity }
    },
    brands: ["Apple", "Samsung", "Huawei", "Xiaomi", "Garmin", "Amazfit", "Fitbit", "Suunto", "Other"],
    checklists: ["Box", "Strap", "Charger", "Nota Pembelian"]
  },
  audio: {
    id: 5,
    label: "Audio",
    features: {
      has_sub_types: true
    },
    sub_types: [
      { label: "TWS", value: "tws", features: { has_battery_balanced: true, has_battery_health: true } },
      { label: "Headphone", value: "headphone", features: { has_connectivity: true } },
      { label: "Speaker", value: "speaker", features: { has_connectivity: true } }
    ],
    dynamic_specs: {
      connectivity: { ...BASE_SPECS.connectivity },
      battery_health: { ...BASE_SPECS.battery_health },
      is_battery_balanced: { ...BASE_SPECS.is_battery_balanced }
    },
    brands: ["Sony", "Bose", "Sennheiser", "JBL", "Audio-Technica", "Marshall", "Apple", "Samsung", "Jabra", "Soundcore", "Other"],
    checklists: ["Box", "Charging Case", "Kabel USB", "Eartips Cadangan", "Pouch", "Nota Pembelian"]
  },
  gaming: {
    id: 6,
    label: "Gaming",
    features: {
      has_sub_types: true
    },
    sub_types: [
      { label: "Console", value: "console", features: { has_storage: true, has_cfw: true } },
      { label: "Handheld", value: "handheld", features: { has_storage: true, has_screen: true, has_cfw: true, has_drift_check: true } },
      { label: "Controller", value: "controller", features: { has_connectivity: true, has_drift_check: true } }
    ],
    dynamic_specs: {
      storage: { ...BASE_SPECS.storage },
      connectivity: { ...BASE_SPECS.connectivity },
      screen_size: { ...BASE_SPECS.screen_size },
      cfw_status: { ...BASE_SPECS.cfw_status },
      is_drift_free: { ...BASE_SPECS.is_drift_free }
    },
    brands: ["Sony", "Microsoft", "Nintendo", "Valve", "Asus", "MSI", "Lenovo", "Logitech", "Razer", "Other"],
    checklists: ["Box", "Controller", "Kabel HDMI", "Power Cable", "Dock", "Nota Pembelian"]
  },
  powermanagement: {
    id: 8,
    label: "Power Management",
    features: {
      has_sub_types: true
    },
    sub_types: [
      { label: "Power Bank", value: "powerbank", features: { has_battery_health: true, has_storage: true } },
      { label: "UPS", value: "ups", features: { has_power_source: true } },
      { label: "Charger", value: "charger", features: { has_power_source: true } }
    ],
    dynamic_specs: {
      battery_health: { ...BASE_SPECS.battery_health },
      storage: { ...BASE_SPECS.storage, label: "Kapasitas (mAh/Wh)" },
      power_source: { ...BASE_SPECS.power_source }
    },
    brands: ["Anker", "Baseus", "Acmic", "APC", "ICA", "Eaton", "Aukey", "Other"],
    checklists: ["Box", "Kabel Power", "Nota Pembelian"]
  },
  peripherals: {
    id: 9,
    label: "Peripherals & Monitor",
    features: { has_sub_types: true },
    sub_types: [
      { label: "Monitor", value: "monitor", features: { has_screen: true, has_connectivity: true }, brands: ["LG", "Samsung", "Asus", "Dell", "BenQ", "AOC", "Xiaomi", "Other"] },
      { label: "Mouse", value: "mouse", features: { has_connectivity: true }, brands: ["Logitech", "Razer", "SteelSeries", "Corsair", "Fantech", "Rexus", "Other"] },
      { label: "Keyboard", value: "keyboard", features: { has_connectivity: true, has_switch_type: true }, brands: ["Keychron", "VortexSeries", "Logitech", "Razer", "Corsair", "Digital Alliance", "Other"] },
      { label: "Webcam", value: "webcam", features: { has_connectivity: true } },
      { label: "Microphone", value: "microphone", features: { has_connectivity: true } }
    ],
    dynamic_specs: {
      screen_size: { ...BASE_SPECS.screen_size },
      connectivity: { ...BASE_SPECS.connectivity },
      switch_type: { ...BASE_SPECS.switch_type }
    },
    brands: ["Logitech", "Razer", "Corsair", "SteelSeries", "Keychron", "VortexSeries", "Fantech", "Rexus", "Other"],
    checklists: ["Box", "Dongle Wireless", "Kabel USB", "Keycap Puller", "Nota Pembelian"]
  },
  photography: {
    id: 10,
    label: "Fotografi & Videografi",
    features: {
      has_sub_types: true
    },
    sub_types: [
      { label: "Body Kamera", value: "body", features: { has_shutter_count: true, has_storage: true, has_battery_health: true, has_screen: true, has_lens_check: true } },
      { label: "Lensa", value: "lens", features: {}, brands: ["Sony", "Canon", "Nikon", "Fujifilm", "Sigma", "Tamron", "Samyang", "Other"] },
      { label: "Gimbal / Stabilizer", value: "gimbal", features: { has_battery_health: true }, brands: ["DJI", "Zhiyun", "FeiyuTech", "Moza", "Other"] },
      { label: "Tripod / Monopod", value: "tripod", features: {}, brands: ["Manfrotto", "Benro", "Sirui", "Joby", "Other"] },
      { label: "Flash / Lighting", value: "lighting", features: { has_power_source: true }, brands: ["Godox", "Yongnuo", "Aputure", "Nanlite", "Other"] }
    ],
    dynamic_specs: {
      shutter_count: { ...BASE_SPECS.shutter_count },
      storage: { ...BASE_SPECS.storage },
      battery_health: { ...BASE_SPECS.battery_health },
      screen_size: { ...BASE_SPECS.screen_size },
      connectivity: { ...BASE_SPECS.connectivity },
      has_original_lens: { ...BASE_SPECS.has_original_lens },
      power_source: { ...BASE_SPECS.power_source }
    },
    brands: ["Canon", "Nikon", "Sony", "Fujifilm", "Lumix", "GoPro", "DJI", "Zhiyun", "Godox", "Sigma", "Tamron", "Other"],
    checklists: ["Box", "Baterai", "Charger", "Strap", "Tas", "Nota Pembelian"]
  },
  storage: {
    id: 11,
    label: "Storage",
    features: {
      has_sub_types: true
    },
    sub_types: [
      { label: "External SSD", value: "ext_ssd", features: { has_storage: true, has_connectivity: true } },
      { label: "External HDD", value: "ext_hdd", features: { has_storage: true, has_connectivity: true } },
      { label: "Flashdisk", value: "flashdisk", features: { has_storage: true } },
      { label: "MicroSD / SD Card", value: "sd_card", features: { has_storage: true } }
    ],
    dynamic_specs: {
      storage: { ...BASE_SPECS.storage },
      connectivity: { ...BASE_SPECS.connectivity }
    },
    brands: ["Samsung", "SanDisk", "Seagate", "WD", "Toshiba", "Kingston", "Adata", "Lexar", "Other"],
    checklists: ["Box", "Kabel Data", "Pouch", "Adapter SD", "Nota Pembelian"]
  },
  office: {
    id: 12,
    label: "Office & Printer",
    features: {
      has_sub_types: true
    },
    sub_types: [
      { label: "Printer", value: "printer", features: { has_connectivity: true } },
      { label: "Scanner", value: "scanner", features: { has_connectivity: true } },
      { label: "Projector", value: "projector", features: { has_connectivity: true } }
    ],
    dynamic_specs: {
      connectivity: { ...BASE_SPECS.connectivity }
    },
    brands: ["Epson", "Canon", "HP", "Brother", "Fujitsu", "BenQ", "ViewSonic", "Other"],
    checklists: ["Box", "Kabel Power", "Kabel Data", "Nota Pembelian"]
  }
};
const getCategoryById = (id) => {
  return Object.values(PRODUCT_SCHEMA).find((cat) => cat.id === parseInt(id));
};
const getFieldsByCategory = (categoryId, currentForm = {}) => {
  var _a, _b, _c;
  const category = getCategoryById(categoryId);
  if (!category) return [];
  const specs = category.dynamic_specs;
  const subTypeKey = ((_a = currentForm.specifications) == null ? void 0 : _a.sub_type) || "";
  const subType = (_b = category.sub_types) == null ? void 0 : _b.find((st) => st.value === subTypeKey);
  const features = {
    ...category.features,
    ...(subType == null ? void 0 : subType.features) || {}
  };
  const sections = [
    {
      id: "main",
      label: "Informasi Utama",
      fields: [
        { key: "brand", ...BASE_SPECS.brand },
        { key: "type", ...BASE_SPECS.type }
      ]
    },
    {
      id: "specs",
      label: "Spesifikasi Teknis",
      fields: []
    }
  ];
  const specFields = sections.find((s) => s.id === "specs").fields;
  if (features.has_ram) specFields.push({ key: "ram", ...specs.ram });
  if (features.has_storage) specFields.push({ key: "storage", ...specs.storage });
  if (features.has_battery_health) specFields.push({ key: "battery_health", ...specs.battery_health });
  if (features.has_screen) specFields.push({ key: "screen_size", ...specs.screen_size });
  if (features.has_connectivity) specFields.push({ key: "connectivity", ...specs.connectivity });
  if (features.has_shutter_count) specFields.push({ key: "shutter_count", ...specs.shutter_count });
  if (features.has_cfw) specFields.push({ key: "cfw_status", ...specs.cfw_status });
  if (features.has_battery_balanced) specFields.push({ key: "is_battery_balanced", ...specs.is_battery_balanced });
  if (features.has_drift_check) specFields.push({ key: "is_drift_free", ...specs.is_drift_free });
  if (features.has_lens_check) specFields.push({ key: "has_original_lens", ...specs.has_original_lens });
  if (features.has_switch_type) specFields.push({ key: "switch_type", ...specs.switch_type });
  if (features.has_power_source) specFields.push({ key: "power_source", ...specs.power_source });
  const connectivity = ((_c = currentForm.specifications) == null ? void 0 : _c.connectivity) || "";
  if ((connectivity === "Wireless" || connectivity === "Bluetooth") && !features.has_power_source) {
    if (!specFields.find((f) => f.key === "power_source")) {
      specFields.push({ key: "power_source", ...BASE_SPECS.power_source });
    }
  }
  return sections.filter((s) => s.fields.length > 0);
};
const PRODUCT_CONDITIONS = [
  { value: "second_like_new", label: "Bekas Mulus (Like New)" },
  { value: "second_good", label: "Bekas Normal (Lecet Pemakaian)" },
  { value: "minus", label: "Minus (Ada fungsi rusak)" }
];
const _sfc_main = {
  __name: "SalesStep",
  __ssrInlineRender: true,
  props: {
    form: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h3 class="mb-1 text-lg font-bold">Informasi Penjualan</h3><p class="mb-6 text-sm text-muted-foreground">Tetapkan harga dan kondisi produk Anda.</p></div><div class="space-y-5"><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "price",
        value: "Harga Produk (Rp)"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        id: "price",
        modelValue: __props.form.price,
        "onUpdate:modelValue": ($event) => __props.form.price = $event,
        required: true,
        placeholder: "0"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-1",
        message: __props.form.errors.price
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "condition",
        value: "Kondisi Barang"
      }, null, _parent));
      _push(`<select id="condition" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary" required><!--[-->`);
      ssrRenderList(unref(PRODUCT_CONDITIONS), (item) => {
        _push(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(__props.form.condition) ? ssrLooseContain(__props.form.condition, item.value) : ssrLooseEqual(__props.form.condition, item.value)) ? " selected" : ""}>${ssrInterpolate(item.label)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-1",
        message: __props.form.errors.condition
      }, null, _parent));
      _push(`</div><div class="flex flex-wrap gap-3"><label class="${ssrRenderClass([__props.form.is_cod ? "border-primary bg-primary/5" : "border-border bg-muted/30", "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all flex-1 min-w-[140px]"])}"><input type="checkbox" id="is_cod"${ssrIncludeBooleanAttr(Array.isArray(__props.form.is_cod) ? ssrLooseContain(__props.form.is_cod, null) : __props.form.is_cod) ? " checked" : ""} class="h-5 w-5 rounded border-border text-primary focus:ring-primary"><div><p class="text-sm font-bold">COD</p><p class="text-[10px] text-muted-foreground">Cash On Delivery</p></div></label><label class="${ssrRenderClass([__props.form.is_negotiable ? "border-primary bg-primary/5" : "border-border bg-muted/30", "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all flex-1 min-w-[140px]"])}"><input type="checkbox" id="is_negotiable"${ssrIncludeBooleanAttr(Array.isArray(__props.form.is_negotiable) ? ssrLooseContain(__props.form.is_negotiable, null) : __props.form.is_negotiable) ? " checked" : ""} class="h-5 w-5 rounded border-border text-primary focus:ring-primary"><div><p class="text-sm font-bold">Bisa Nego</p><p class="text-[10px] text-muted-foreground">Harga dapat dinegosiasikan</p></div></label></div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "description",
        value: "Deskripsi Produk"
      }, null, _parent));
      _push(`<textarea id="description" rows="5" class="mt-1 block w-full rounded-xl border-border bg-background p-3 text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary" required${ssrRenderAttr("placeholder", __props.form.condition === "second_good" || __props.form.condition === "minus" ? "WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)..." : "Jelaskan kelengkapan, garansi, and kondisi fisik secara detail...")}>${ssrInterpolate(__props.form.description)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-1",
        message: __props.form.errors.description
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Partials/SalesStep.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SalesStep = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  SalesStep as S,
  _sfc_main as _,
  getFieldsByCategory as a,
  getCategoryById as g
};
