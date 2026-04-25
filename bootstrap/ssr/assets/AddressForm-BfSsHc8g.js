import { ref, computed, onMounted, onUnmounted, mergeProps, unref, useSSRContext, watch, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import axios from "axios";
import { _ as _sfc_main$2 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$3 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$4 } from "./TextInput-Cpy3OAqn.js";
import { ChevronDown, Search, Building, Navigation, MapPin } from "lucide-vue-next";
const _sfc_main$1 = {
  __name: "SearchableSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: "Pilih opsi..."
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isOpen = ref(false);
    const searchQuery = ref("");
    const selectRef = ref(null);
    const filteredOptions = computed(() => {
      if (!searchQuery.value) return props.options;
      return props.options.filter(
        (option) => option.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
    const selectedOption = computed(() => {
      return props.options.find((option) => option.id === props.modelValue);
    });
    const handleClickOutside = (event) => {
      if (selectRef.value && !selectRef.value.contains(event.target)) {
        isOpen.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative",
        ref_key: "selectRef",
        ref: selectRef
      }, _attrs))}><button type="button"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="${ssrRenderClass([{ "ring-2 ring-primary bg-background": isOpen.value }, "block w-full rounded-2xl border-transparent bg-muted/30 py-3 pl-11 pr-10 text-sm focus:border-primary focus:bg-background focus:ring-primary transition-all dark:bg-gray-900 disabled:opacity-50 text-left truncate"])}">`);
      if (selectedOption.value) {
        _push(`<span class="text-foreground">${ssrInterpolate(selectedOption.value.name)}</span>`);
      } else {
        _push(`<span class="text-muted-foreground">${ssrInterpolate(__props.placeholder)}</span>`);
      }
      _push(ssrRenderComponent(unref(ChevronDown), {
        class: ["absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-transform duration-200", { "rotate-180": isOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
      if (isOpen.value) {
        _push(`<div class="absolute z-50 w-full mt-2 rounded-2xl bg-popover text-popover-foreground shadow-lg border border-border overflow-hidden ring-1 ring-black ring-opacity-5"><div class="p-2 border-b border-border bg-muted/30 relative">`);
        _push(ssrRenderComponent(unref(Search), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, null, _parent));
        _push(`<input type="text"${ssrRenderAttr("value", searchQuery.value)} class="w-full bg-background border-transparent rounded-xl text-sm pl-9 pr-3 py-2 focus:ring-primary focus:border-primary transition-all" placeholder="Cari..."></div><ul class="max-h-60 overflow-auto py-1">`);
        if (filteredOptions.value.length === 0) {
          _push(`<li class="px-4 py-3 text-sm text-muted-foreground text-center"> Tidak ditemukan </li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(filteredOptions.value, (option) => {
          _push(`<li class="${ssrRenderClass([{ "bg-primary/5 text-primary font-bold": __props.modelValue === option.id }, "px-4 py-2.5 text-sm cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"])}">${ssrInterpolate(option.name)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SearchableSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AddressForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    prefix: {
      type: String,
      default: ""
      // '' for personal (e.g. 'province'), 'store_' for store (e.g. 'store_province')
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = props.modelValue;
    const getField = (field) => form[`${props.prefix}${field}`];
    const setField = (field, value) => {
      form[`${props.prefix}${field}`] = value;
    };
    const getError = (field) => {
      var _a;
      return (_a = form.errors) == null ? void 0 : _a[`${props.prefix}${field}`];
    };
    const provinces = ref([]);
    const cities = ref([]);
    const districts = ref([]);
    const villages = ref([]);
    const isInitializing = ref(true);
    const selectedProvinceId = ref("");
    const selectedCityId = ref("");
    const selectedDistrictId = ref("");
    const selectedVillageId = ref("");
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("/api/regions/provinces");
        provinces.value = response.data;
        if (getField("province")) {
          const found = provinces.value.find((p) => p.name === getField("province"));
          if (found) {
            selectedProvinceId.value = found.id;
            await fetchCities(found.id, true);
          }
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    const fetchCities = async (provinceId, isInit = false) => {
      if (!provinceId) {
        cities.value = [];
        return;
      }
      try {
        const response = await axios.get(`/api/regions/regencies/${provinceId}`);
        cities.value = response.data;
        if (isInit && getField("city")) {
          const found = cities.value.find((c) => c.name === getField("city"));
          if (found) {
            selectedCityId.value = found.id;
            await fetchDistricts(found.id, true);
          }
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    const fetchDistricts = async (cityId, isInit = false) => {
      if (!cityId) {
        districts.value = [];
        return;
      }
      try {
        const response = await axios.get(`/api/regions/districts/${cityId}`);
        districts.value = response.data;
        if (isInit && getField("district")) {
          const found = districts.value.find((d) => d.name === getField("district"));
          if (found) {
            selectedDistrictId.value = found.id;
            await fetchVillages(found.id, true);
          }
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    const fetchVillages = async (districtId, isInit = false) => {
      if (!districtId) {
        villages.value = [];
        return;
      }
      try {
        const response = await axios.get(`/api/regions/villages/${districtId}`);
        villages.value = response.data;
        if (isInit && getField("village")) {
          const found = villages.value.find((v) => v.name === getField("village"));
          if (found) {
            selectedVillageId.value = found.id;
          }
        }
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    };
    watch(selectedProvinceId, (newId) => {
      if (newId) {
        const prov = provinces.value.find((p) => p.id === newId);
        if (prov) setField("province", prov.name);
        if (!isInitializing.value) {
          selectedCityId.value = "";
          selectedDistrictId.value = "";
          selectedVillageId.value = "";
          setField("city", "");
          setField("district", "");
          setField("village", "");
          fetchCities(newId);
        }
      } else {
        setField("province", "");
        cities.value = [];
        districts.value = [];
        villages.value = [];
      }
      emit("update:modelValue", form);
    });
    watch(selectedCityId, (newId) => {
      if (newId) {
        const city = cities.value.find((c) => c.id === newId);
        if (city) setField("city", city.name);
        if (!isInitializing.value) {
          selectedDistrictId.value = "";
          selectedVillageId.value = "";
          setField("district", "");
          setField("village", "");
          fetchDistricts(newId);
        }
      } else {
        setField("city", "");
        districts.value = [];
        villages.value = [];
      }
      emit("update:modelValue", form);
    });
    watch(selectedDistrictId, (newId) => {
      if (newId) {
        const dist = districts.value.find((d) => d.id === newId);
        if (dist) setField("district", dist.name);
        if (!isInitializing.value) {
          selectedVillageId.value = "";
          setField("village", "");
          fetchVillages(newId);
        }
      } else {
        setField("district", "");
        villages.value = [];
      }
      emit("update:modelValue", form);
    });
    watch(selectedVillageId, (newId) => {
      if (newId) {
        const vil = villages.value.find((v) => v.id === newId);
        if (vil) setField("village", vil.name);
      } else {
        setField("village", "");
      }
      emit("update:modelValue", form);
    });
    onMounted(async () => {
      await fetchProvinces();
      isInitializing.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 mt-6" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "province",
        value: "Provinsi",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: selectedProvinceId.value,
        "onUpdate:modelValue": ($event) => selectedProvinceId.value = $event,
        options: provinces.value,
        placeholder: "Pilih Provinsi"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Building), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Building), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: getError("province")
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "city",
        value: "Kabupaten / Kota",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: selectedCityId.value,
        "onUpdate:modelValue": ($event) => selectedCityId.value = $event,
        options: cities.value,
        disabled: !selectedProvinceId.value,
        placeholder: "Pilih Kota/Kabupaten"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Building), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Building), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: getError("city")
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "district",
        value: "Kecamatan",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: selectedDistrictId.value,
        "onUpdate:modelValue": ($event) => selectedDistrictId.value = $event,
        options: districts.value,
        disabled: !selectedCityId.value,
        placeholder: "Pilih Kecamatan"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Navigation), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: getError("district")
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "village",
        value: "Kelurahan / Desa",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: selectedVillageId.value,
        "onUpdate:modelValue": ($event) => selectedVillageId.value = $event,
        options: villages.value,
        disabled: !selectedDistrictId.value,
        placeholder: "Pilih Kelurahan/Desa"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MapPin), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(MapPin), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: getError("village")
      }, null, _parent));
      _push(`</div></div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "landmark",
        value: "Patokan Lokasi (Opsional)",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "landmark",
        type: "text",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        "model-value": getField("landmark"),
        "onUpdate:modelValue": (val) => setField("landmark", val),
        autocomplete: "off",
        placeholder: "Contoh: Samping masjid agung, rumah cat biru pagar hitam",
        onInput: ($event) => emit("update:modelValue", unref(form))
      }, null, _parent));
      _push(ssrRenderComponent(unref(Building), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: getError("landmark")
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "address",
        value: "Alamat Lengkap (Jalan, No Rumah, RT/RW)",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "address",
        type: "text",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        "model-value": getField("address"),
        "onUpdate:modelValue": (val) => setField("address", val),
        autocomplete: "address",
        placeholder: "Contoh: Jl. Sudirman No. 123, RT 01/RW 02",
        onInput: ($event) => emit("update:modelValue", unref(form))
      }, null, _parent));
      _push(ssrRenderComponent(unref(MapPin), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: getError("address")
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AddressForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
