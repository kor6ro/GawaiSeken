import { onMounted, ref, computed, withCtx, unref, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, withDirectives, vShow, createCommentVNode, vModelSelect, vModelCheckbox, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderVNode, ssrInterpolate, ssrRenderStyle, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./InputError-DDbcJ_iI.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$3 } from "./TextInput-Cpy3OAqn.js";
import { g as getCategoryById, a as getFieldsByCategory, _ as _sfc_main$5, P as PRODUCT_CONDITIONS, b as _sfc_main$7, S as STORAGE_OPTIONS, R as RAM_OPTIONS } from "./constants-DzZsGHSf.js";
import { Tag, Wrench, CircleDollarSign, Package, Camera, Check, Info, ExternalLink, X, ImagePlus, ChevronLeft, ChevronRight } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
import "vue-advanced-cropper";
/* empty css               */
import "./SecondaryButton-BWOt3jtr.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    product: Object,
    categories: Array
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const props = __props;
    const formatCondition = (cond) => {
      if (!cond) return "second_like_new";
      const mapping = {
        "Bekas Mulus": "second_like_new",
        "Bekas - Mulus": "second_like_new",
        "Bekas Ada minus": "second_good",
        "Bekas - Ada minus": "second_good",
        "Minus": "minus",
        "Baru": "new"
      };
      const condValue = typeof cond === "object" ? cond.value : cond;
      return mapping[condValue] || condValue;
    };
    const getInitialKelengkapan = () => {
      var _a2;
      const k = (_a2 = props.product.specifications) == null ? void 0 : _a2.kelengkapan;
      if (Array.isArray(k)) return k;
      if (typeof k === "string") {
        return k.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return [];
    };
    const initialRam = ((_a = props.product.specifications) == null ? void 0 : _a.ram) || "";
    const initialStorage = ((_b = props.product.specifications) == null ? void 0 : _b.storage) || "";
    const isRamInList = RAM_OPTIONS.includes(initialRam);
    const isStorageInList = STORAGE_OPTIONS.includes(initialStorage);
    const form = useForm({
      _method: "put",
      category_id: props.product.category_id,
      brand: props.product.brand || "",
      custom_brand: "",
      type: props.product.type || "",
      condition: formatCondition(props.product.condition),
      is_cod: props.product.is_cod ?? false,
      is_negotiable: props.product.is_negotiable ?? true,
      price: props.product.price || "",
      availability: props.product.availability || "available",
      description: props.product.description || "",
      specifications: {
        sub_type: ((_c = props.product.specifications) == null ? void 0 : _c.sub_type) || "",
        ram: isRamInList ? initialRam : initialRam ? "Other" : "",
        custom_ram: isRamInList ? "" : initialRam,
        storage: isStorageInList ? initialStorage : initialStorage ? "Other" : "",
        custom_storage: isStorageInList ? "" : initialStorage,
        battery_health: ((_d = props.product.specifications) == null ? void 0 : _d.battery_health) || "",
        screen_size: ((_e = props.product.specifications) == null ? void 0 : _e.screen_size) || "",
        connectivity: ((_f = props.product.specifications) == null ? void 0 : _f.connectivity) || "",
        power_source: ((_g = props.product.specifications) == null ? void 0 : _g.power_source) || "",
        switch_type: ((_h = props.product.specifications) == null ? void 0 : _h.switch_type) || "",
        cfw_status: ((_i = props.product.specifications) == null ? void 0 : _i.cfw_status) || "",
        shutter_count: ((_j = props.product.specifications) == null ? void 0 : _j.shutter_count) || "",
        is_battery_balanced: ((_k = props.product.specifications) == null ? void 0 : _k.is_battery_balanced) || false,
        is_drift_free: ((_l = props.product.specifications) == null ? void 0 : _l.is_drift_free) || false,
        has_original_lens: ((_m = props.product.specifications) == null ? void 0 : _m.has_original_lens) || false,
        kelengkapan: getInitialKelengkapan(),
        kelengkapan_note: ((_n = props.product.specifications) == null ? void 0 : _n.kelengkapan_note) || ""
      },
      images: [],
      delete_images: []
    });
    onMounted(() => {
      const currentCat = getCategoryById(form.category_id);
      if (currentCat && props.product.brand) {
        const brands = currentCat.brands || [];
        if (!brands.includes(props.product.brand) && props.product.brand !== "Other") {
          form.brand = "Other";
          form.custom_brand = props.product.brand;
        }
      }
      if (initialRam && !isRamInList && initialRam !== "Other") {
        form.specifications.ram = "Other";
        form.specifications.custom_ram = initialRam;
      }
      if (initialStorage && !isStorageInList && initialStorage !== "Other") {
        form.specifications.storage = "Other";
        form.specifications.custom_storage = initialStorage;
      }
    });
    const currentStep = ref(1);
    const STEPS = [
      { id: "category", label: "Kategori", icon: Tag },
      { id: "specs", label: "Spesifikasi", icon: Wrench },
      { id: "sales", label: "Penjualan", icon: CircleDollarSign },
      { id: "kelengkapan", label: "Kelengkapan", icon: Package },
      { id: "media", label: "Foto", icon: Camera }
    ];
    const goNext = () => {
      if (currentStep.value < STEPS.length - 1) currentStep.value++;
    };
    const goPrev = () => {
      if (currentStep.value > 0) currentStep.value--;
    };
    const goTo = (i) => {
      if (i <= maxReachedStep.value) currentStep.value = i;
    };
    const maxReachedStep = ref(STEPS.length - 1);
    const canProceedStep1 = computed(() => {
      const ok = !!form.brand && !!form.type;
      if (form.brand === "Other") return ok && !!form.custom_brand;
      return ok;
    });
    const canProceedStep2 = computed(() => !!form.price && !!form.description);
    const canProceedStep3 = computed(() => true);
    const canGoNext = computed(() => {
      if (currentStep.value === 1) return canProceedStep1.value;
      if (currentStep.value === 2) return canProceedStep2.value;
      if (currentStep.value === 3) return canProceedStep3.value;
      return true;
    });
    const currentCategory = computed(() => getCategoryById(form.category_id));
    const selectedCategoryName = computed(() => {
      var _a2;
      return ((_a2 = currentCategory.value) == null ? void 0 : _a2.label.toLowerCase()) || "";
    });
    const formSections = computed(() => getFieldsByCategory(form.category_id, form));
    const filteredBrands = computed(() => {
      var _a2;
      if (!currentCategory.value) return [];
      const subTypeKey = form.specifications.sub_type;
      const subType = (_a2 = currentCategory.value.sub_types) == null ? void 0 : _a2.find((st) => st.value === subTypeKey);
      return (subType == null ? void 0 : subType.brands) || currentCategory.value.brands || [];
    });
    const isTopLevel = (key) => ["brand", "type"].includes(key);
    const getFieldModel = (key) => isTopLevel(key) ? form[key] : form.specifications[key];
    const updateFieldModel = (key, value) => {
      if (isTopLevel(key)) {
        form[key] = value;
        if (value !== "Other") form["custom_" + key] = "";
      } else {
        form.specifications[key] = value;
        if (value !== "Other") form.specifications["custom_" + key] = "";
      }
    };
    const getCustomModel = (key) => isTopLevel(key) ? form["custom_" + key] : form.specifications["custom_" + key];
    const updateCustomModel = (key, value) => {
      if (isTopLevel(key)) form["custom_" + key] = value;
      else form.specifications["custom_" + key] = value;
    };
    const openGsmSearch = () => {
      if (!form.brand || !form.type) {
        alert("Pilih Merek dan isi Tipe terlebih dahulu.");
        return;
      }
      const query = encodeURIComponent(form.brand + " " + form.type);
      if (selectedCategoryName.value.includes("smartphone") || selectedCategoryName.value.includes("tablet")) {
        window.open(`https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=${query}`, "_blank");
      } else if (selectedCategoryName.value.includes("camera")) {
        window.open(`https://www.google.com/search?q=${query}+specs+dpreview`, "_blank");
      } else {
        const suffix = selectedCategoryName.value.includes("laptop") ? " specs laptopmedia" : " specs";
        window.open(`https://www.google.com/search?q=${query}${suffix}`, "_blank");
      }
    };
    const imagePreviews = ref([]);
    const fileInput = ref(null);
    const showCropper = ref(false);
    const pendingFiles = ref([]);
    const handleFiles = (event) => {
      const files = Array.from(event.target.files);
      const existingCount = props.product.images.length - form.delete_images.length;
      const currentNewCount = form.images.length;
      const remaining = 10 - (existingCount + currentNewCount);
      if (remaining <= 0) {
        alert("Maksimal 10 foto diperbolehkan.");
        if (fileInput.value) fileInput.value.value = "";
        return;
      }
      const toAdd = files.slice(0, remaining);
      if (toAdd.length > 0) {
        pendingFiles.value = toAdd;
        showCropper.value = true;
      }
    };
    const handleCropped = ({ blob, originalFile }) => {
      const fileName = originalFile.name.replace(/\.[^/.]+$/, "") + ".jpg";
      const file = new File([blob], fileName, { type: "image/jpeg" });
      form.images.push(file);
      const reader = new FileReader();
      reader.onload = (e) => imagePreviews.value.push({ url: e.target.result, name: fileName });
      reader.readAsDataURL(file);
    };
    const handleCropperFinished = () => {
      showCropper.value = false;
      pendingFiles.value = [];
      if (fileInput.value) fileInput.value.value = "";
    };
    const removeNewFile = (index) => {
      form.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };
    const toggleDeleteExisting = (imageId) => {
      const index = form.delete_images.indexOf(imageId);
      if (index > -1) form.delete_images.splice(index, 1);
      else form.delete_images.push(imageId);
    };
    const isExistingDeleted = (imageId) => form.delete_images.includes(imageId);
    const confirmCancel = () => {
      if (confirm("Apakah Anda yakin ingin membatalkan? Perubahan yang belum disimpan akan hilang.")) {
        window.location.href = route("dashboard");
      }
    };
    const submit = () => {
      form.post(route("products.update", props.product.slug), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Edit Produk</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Edit Produk")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Edit Produk" }, null, _parent2, _scopeId));
            _push2(`<div class="py-8"${_scopeId}><div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"${_scopeId}><nav aria-label="Form steps" class="mb-8"${_scopeId}><ol class="flex items-center justify-between gap-1"${_scopeId}><!--[-->`);
            ssrRenderList(STEPS, (step, i) => {
              _push2(`<li class="flex flex-1 flex-col items-center gap-1.5"${_scopeId}><div class="flex w-full items-center"${_scopeId}><div class="${ssrRenderClass([i === 0 ? "invisible" : i <= currentStep.value ? "bg-primary" : "bg-border", "flex-1 h-px"])}"${_scopeId}></div><button type="button"${ssrIncludeBooleanAttr(i === 0 || i > maxReachedStep.value) ? " disabled" : ""} class="${ssrRenderClass([[
                i === currentStep.value ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30" : i < currentStep.value ? "border-primary bg-primary/10 text-primary cursor-pointer hover:bg-primary/20" : "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              ], "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all"])}"${ssrRenderAttr("title", step.label)}${_scopeId}>`);
              if (i < currentStep.value) {
                _push2(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              } else {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(step.icon), { class: "h-4 w-4" }, null), _parent2, _scopeId);
              }
              _push2(`</button><div class="${ssrRenderClass([i === STEPS.length - 1 ? "invisible" : i < currentStep.value ? "bg-primary" : "bg-border", "flex-1 h-px"])}"${_scopeId}></div></div><span class="${ssrRenderClass([i === currentStep.value ? "text-primary" : i < currentStep.value ? "text-primary/70" : "text-muted-foreground", "text-[10px] font-semibold transition-colors"])}"${_scopeId}>${ssrInterpolate(step.label)}</span></li>`);
            });
            _push2(`<!--]--></ol></nav><div class="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"${_scopeId}><div style="${ssrRenderStyle(currentStep.value === 0 ? null : { display: "none" })}"${_scopeId}><h3 class="mb-1 text-lg font-bold"${_scopeId}>Kategori Produk</h3><p class="mb-6 text-sm text-muted-foreground"${_scopeId}>Kategori tidak dapat diubah.</p><div class="rounded-xl border-2 border-primary bg-primary/10 p-4 text-sm font-bold text-primary"${_scopeId}>${ssrInterpolate(__props.product.category.name)}</div><p class="mt-4 flex items-center gap-2 text-xs italic text-muted-foreground"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "h-3 w-3" }, null, _parent2, _scopeId));
            _push2(` Kategori tetap untuk menjaga integritas spesifikasi. </p></div><div style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Spesifikasi Produk</h3><p class="text-sm text-muted-foreground"${_scopeId}>Perbarui detail teknis gawai Anda.</p></div><button type="button" class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-accent px-3 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/80"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ExternalLink), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(selectedCategoryName.value.includes("smartphone") || selectedCategoryName.value.includes("tablet") ? "GSM Arena" : "Cari Spek")}</span></button></div>`);
            if ((_a2 = currentCategory.value) == null ? void 0 : _a2.sub_types) {
              _push2(`<div class="mb-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { value: "Tipe Spesifik" }, null, _parent2, _scopeId));
              _push2(`<div class="mt-2 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(currentCategory.value.sub_types, (st) => {
                _push2(`<button type="button" class="${ssrRenderClass([unref(form).specifications.sub_type === st.value ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-background text-muted-foreground border-border hover:bg-muted", "rounded-xl border px-4 py-2 text-sm font-medium transition-all"])}"${_scopeId}>${ssrInterpolate(st.label)}</button>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-8"${_scopeId}><!--[-->`);
            ssrRenderList(formSections.value, (section) => {
              _push2(`<div${_scopeId}><p class="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground"${_scopeId}>${ssrInterpolate(section.label)}</p><div class="grid grid-cols-1 gap-5 sm:grid-cols-2"${_scopeId}><!--[-->`);
              ssrRenderList(section.fields, (field) => {
                _push2(`<!--[-->`);
                if (field.type === "select") {
                  _push2(`<div${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    for: field.key,
                    value: field.label + (field.unit ? ` (${field.unit})` : "")
                  }, null, _parent2, _scopeId));
                  _push2(`<select${ssrRenderAttr("value", getFieldModel(field.key))}${ssrRenderAttr("id", field.key)} class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"${ssrIncludeBooleanAttr(field.required) ? " required" : ""}${_scopeId}><option value=""${_scopeId}>${ssrInterpolate(field.placeholder || "Pilih...")}</option>`);
                  if (field.key === "brand") {
                    _push2(`<!--[-->`);
                    ssrRenderList(filteredBrands.value, (brand) => {
                      _push2(`<option${ssrRenderAttr("value", brand)}${_scopeId}>${ssrInterpolate(brand)}</option>`);
                    });
                    _push2(`<!--]-->`);
                  } else {
                    _push2(`<!--[-->`);
                    ssrRenderList(field.options, (opt) => {
                      _push2(`<option${ssrRenderAttr("value", opt)}${_scopeId}>${ssrInterpolate(opt)}</option>`);
                    });
                    _push2(`<!--]-->`);
                  }
                  _push2(`</select>`);
                  if (field.allowOther && getFieldModel(field.key) === "Other") {
                    _push2(`<div class="mt-2"${_scopeId}>`);
                    _push2(ssrRenderComponent(_sfc_main$3, {
                      value: getCustomModel(field.key),
                      onInput: ($event) => updateCustomModel(field.key, $event.target.value),
                      placeholder: "Sebutkan " + field.label,
                      class: "h-10",
                      required: ""
                    }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(ssrRenderComponent(_sfc_main$4, {
                    class: "mt-1",
                    message: isTopLevel(field.key) ? unref(form).errors[field.key] : unref(form).errors["specifications." + field.key]
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else if (["number", "text"].includes(field.type)) {
                  _push2(`<div${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    for: field.key,
                    value: field.label + (field.unit ? ` (${field.unit})` : "")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_sfc_main$3, {
                    value: getFieldModel(field.key),
                    onInput: ($event) => updateFieldModel(field.key, $event.target.value),
                    id: field.key,
                    type: field.type,
                    class: "mt-1 block h-11 w-full",
                    placeholder: field.placeholder,
                    required: field.required
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_sfc_main$4, {
                    class: "mt-1",
                    message: isTopLevel(field.key) ? unref(form).errors[field.key] : unref(form).errors["specifications." + field.key]
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else if (field.type === "boolean") {
                  _push2(`<div class="flex items-center gap-3 sm:col-span-1 pt-6"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(getFieldModel(field.key)) ? " checked" : ""}${ssrRenderAttr("id", field.key)} class="h-5 w-5 rounded border-border text-primary focus:ring-primary"${_scopeId}><label${ssrRenderAttr("for", field.key)} class="cursor-pointer text-sm font-medium leading-none"${_scopeId}>${ssrInterpolate(field.label)} `);
                  if (field.placeholder) {
                    _push2(`<span class="block text-[10px] font-normal text-muted-foreground"${_scopeId}>${ssrInterpolate(field.placeholder)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</label>`);
                  _push2(ssrRenderComponent(_sfc_main$4, {
                    class: "mt-1",
                    message: unref(form).errors["specifications." + field.key]
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div></div><div style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}"${_scopeId}><h3 class="mb-1 text-lg font-bold"${_scopeId}>Informasi Penjualan</h3><p class="mb-6 text-sm text-muted-foreground"${_scopeId}>Tetapkan harga dan kondisi produk Anda.</p><div class="space-y-5"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "price",
              value: "Harga Produk (Rp)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "price",
              modelValue: unref(form).price,
              "onUpdate:modelValue": ($event) => unref(form).price = $event,
              required: true,
              placeholder: "0"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors.price
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "condition",
              value: "Kondisi Barang"
            }, null, _parent2, _scopeId));
            _push2(`<select id="condition" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary" required${_scopeId}><!--[-->`);
            ssrRenderList(unref(PRODUCT_CONDITIONS), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, item.value) : ssrLooseEqual(unref(form).condition, item.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.label)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors.condition
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "availability",
              value: "Status Ketersediaan"
            }, null, _parent2, _scopeId));
            _push2(`<select id="availability" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary" required${_scopeId}><option value="available"${ssrIncludeBooleanAttr(Array.isArray(unref(form).availability) ? ssrLooseContain(unref(form).availability, "available") : ssrLooseEqual(unref(form).availability, "available")) ? " selected" : ""}${_scopeId}>Tersedia (Available)</option><option value="sold"${ssrIncludeBooleanAttr(Array.isArray(unref(form).availability) ? ssrLooseContain(unref(form).availability, "sold") : ssrLooseEqual(unref(form).availability, "sold")) ? " selected" : ""}${_scopeId}>Terjual (Sold)</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors.availability
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-wrap gap-3"${_scopeId}><label class="${ssrRenderClass([unref(form).is_cod ? "border-primary bg-primary/5" : "border-border bg-muted/30", "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all flex-1 min-w-[140px]"])}"${_scopeId}><input type="checkbox" id="is_cod"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_cod) ? ssrLooseContain(unref(form).is_cod, null) : unref(form).is_cod) ? " checked" : ""} class="h-5 w-5 rounded border-border text-primary focus:ring-primary"${_scopeId}><div${_scopeId}><p class="text-sm font-bold"${_scopeId}>COD</p><p class="text-[10px] text-muted-foreground"${_scopeId}>Cash On Delivery</p></div></label><label class="${ssrRenderClass([unref(form).is_negotiable ? "border-primary bg-primary/5" : "border-border bg-muted/30", "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all flex-1 min-w-[140px]"])}"${_scopeId}><input type="checkbox" id="is_negotiable"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_negotiable) ? ssrLooseContain(unref(form).is_negotiable, null) : unref(form).is_negotiable) ? " checked" : ""} class="h-5 w-5 rounded border-border text-primary focus:ring-primary"${_scopeId}><div${_scopeId}><p class="text-sm font-bold"${_scopeId}>Bisa Nego</p><p class="text-[10px] text-muted-foreground"${_scopeId}>Harga dapat dinegosiasikan</p></div></label></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: "Deskripsi Produk"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="description" rows="5" class="mt-1 block w-full rounded-xl border-border bg-background p-3 text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary" required${ssrRenderAttr("placeholder", unref(form).condition === "second_good" || unref(form).condition === "minus" ? "WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)..." : "Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail...")}${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}"${_scopeId}><h3 class="mb-1 text-lg font-bold"${_scopeId}>Kelengkapan Produk</h3><p class="mb-6 text-sm text-muted-foreground"${_scopeId}>Centang semua item yang tersedia dalam paket penjualan.</p>`);
            if (currentCategory.value) {
              _push2(`<div class="grid grid-cols-2 gap-3 sm:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(currentCategory.value.checklists, (item) => {
                _push2(`<label class="${ssrRenderClass([unref(form).specifications.kelengkapan.includes(item) ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 hover:border-primary/40", "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all"])}"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.kelengkapan) ? ssrLooseContain(unref(form).specifications.kelengkapan, item) : unref(form).specifications.kelengkapan) ? " checked" : ""} class="h-5 w-5 rounded border-border text-primary focus:ring-primary"${_scopeId}><span class="text-sm font-semibold"${_scopeId}>${ssrInterpolate(item)}</span></label>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Keterangan Lain (Opsional)" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              modelValue: unref(form).specifications.kelengkapan_note,
              "onUpdate:modelValue": ($event) => unref(form).specifications.kelengkapan_note = $event,
              placeholder: "Misal: Dus ada penyok dikit",
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors["specifications.kelengkapan_note"]
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-3",
              message: unref(form).errors["specifications.kelengkapan"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}"${_scopeId}><h3 class="mb-1 text-lg font-bold"${_scopeId}>Foto Produk</h3><p class="mb-6 text-sm text-muted-foreground"${_scopeId}>Kelola foto produk Anda. Maksimal 10 foto.</p>`);
            if (__props.product.images.length > 0) {
              _push2(`<div class="mb-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: "Foto Saat Ini (Klik untuk hapus)",
                class: "mb-3"
              }, null, _parent2, _scopeId));
              _push2(`<div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.images, (img) => {
                _push2(`<div class="${ssrRenderClass([{ "opacity-30 grayscale scale-95 border-destructive": isExistingDeleted(img.id) }, "group relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm transition-all"])}"${_scopeId}><img${ssrRenderAttr("src", "/storage/" + img.image_path)} class="h-full w-full object-cover"${_scopeId}><button type="button" class="${ssrRenderClass([isExistingDeleted(img.id) ? "bg-primary text-white" : "bg-background/80 text-foreground hover:bg-destructive hover:text-white", "absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-lg transition-all"])}"${_scopeId}>`);
                if (isExistingDeleted(img.id)) {
                  _push2(ssrRenderComponent(unref(Check), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                }
                _push2(`</button>`);
                if (isExistingDeleted(img.id)) {
                  _push2(`<div class="absolute inset-0 flex items-center justify-center"${_scopeId}><span class="bg-destructive px-1.5 py-0.5 text-[8px] font-bold text-white rounded"${_scopeId}>DIHAPUS</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<label for="images" class="group flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 transition-all hover:border-primary hover:bg-primary/5"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ImagePlus), { class: "mb-2 h-7 w-7 text-muted-foreground transition-colors group-hover:text-primary" }, null, _parent2, _scopeId));
            _push2(`<p class="text-sm font-semibold text-muted-foreground group-hover:text-primary"${_scopeId}>Tambah foto baru</p><input id="images" type="file" class="hidden" multiple accept="image/jpeg,image/png,image/jpg"${_scopeId}></label>`);
            if (imagePreviews.value.length > 0) {
              _push2(`<div class="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"${_scopeId}><!--[-->`);
              ssrRenderList(imagePreviews.value, (preview, index) => {
                _push2(`<div class="group relative aspect-square overflow-hidden rounded-xl border border-primary/30 bg-card shadow-sm"${_scopeId}><img${ssrRenderAttr("src", preview.url)} class="h-full w-full object-cover"${_scopeId}><button type="button" class="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</button><div class="absolute bottom-0 left-0 right-0 bg-emerald-500/80 py-0.5 text-center text-[9px] font-bold text-white"${_scopeId}>BARU</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.images
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-8 flex items-center justify-between border-t border-border pt-5"${_scopeId}>`);
            if (currentStep.value > 1) {
              _push2(`<button type="button" class="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-5 py-2.5 text-sm font-semibold transition-all hover:bg-muted"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Sebelumnya </button>`);
            } else {
              _push2(`<button type="button" class="text-sm font-bold text-muted-foreground transition-colors hover:text-destructive"${_scopeId}>Batal</button>`);
            }
            _push2(`<div class="flex items-center gap-3"${_scopeId}><span class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(currentStep.value + 1)} / ${ssrInterpolate(STEPS.length)}</span>`);
            if (currentStep.value < STEPS.length - 1) {
              _push2(`<button type="button"${ssrIncludeBooleanAttr(!canGoNext.value) ? " disabled" : ""} class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}> Selanjutnya `);
              _push2(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(ssrRenderComponent(_sfc_main$6, {
                disabled: unref(form).processing,
                onClick: submit,
                class: "h-11 px-6 text-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(form).processing ? "Memproses..." : "Simpan Perubahan")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(form).processing ? "Memproses..." : "Simpan Perubahan"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              show: showCropper.value,
              files: pendingFiles.value,
              onClose: handleCropperFinished,
              onCropped: handleCropped,
              onFinished: handleCropperFinished
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Edit Produk" }),
              createVNode("div", { class: "py-8" }, [
                createVNode("div", { class: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("nav", {
                    "aria-label": "Form steps",
                    class: "mb-8"
                  }, [
                    createVNode("ol", { class: "flex items-center justify-between gap-1" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(STEPS, (step, i) => {
                        return createVNode("li", {
                          key: step.id,
                          class: "flex flex-1 flex-col items-center gap-1.5"
                        }, [
                          createVNode("div", { class: "flex w-full items-center" }, [
                            createVNode("div", {
                              class: ["flex-1 h-px", i === 0 ? "invisible" : i <= currentStep.value ? "bg-primary" : "bg-border"]
                            }, null, 2),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => goTo(i),
                              disabled: i === 0 || i > maxReachedStep.value,
                              class: ["flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all", [
                                i === currentStep.value ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30" : i < currentStep.value ? "border-primary bg-primary/10 text-primary cursor-pointer hover:bg-primary/20" : "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                              ]],
                              title: step.label
                            }, [
                              i < currentStep.value ? (openBlock(), createBlock(unref(Check), {
                                key: 0,
                                class: "h-4 w-4"
                              })) : (openBlock(), createBlock(resolveDynamicComponent(step.icon), {
                                key: 1,
                                class: "h-4 w-4"
                              }))
                            ], 10, ["onClick", "disabled", "title"]),
                            createVNode("div", {
                              class: ["flex-1 h-px", i === STEPS.length - 1 ? "invisible" : i < currentStep.value ? "bg-primary" : "bg-border"]
                            }, null, 2)
                          ]),
                          createVNode("span", {
                            class: ["text-[10px] font-semibold transition-colors", i === currentStep.value ? "text-primary" : i < currentStep.value ? "text-primary/70" : "text-muted-foreground"]
                          }, toDisplayString(step.label), 3)
                        ]);
                      }), 64))
                    ])
                  ]),
                  createVNode("div", { class: "rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8" }, [
                    withDirectives(createVNode("div", null, [
                      createVNode("h3", { class: "mb-1 text-lg font-bold" }, "Kategori Produk"),
                      createVNode("p", { class: "mb-6 text-sm text-muted-foreground" }, "Kategori tidak dapat diubah."),
                      createVNode("div", { class: "rounded-xl border-2 border-primary bg-primary/10 p-4 text-sm font-bold text-primary" }, toDisplayString(__props.product.category.name), 1),
                      createVNode("p", { class: "mt-4 flex items-center gap-2 text-xs italic text-muted-foreground" }, [
                        createVNode(unref(Info), { class: "h-3 w-3" }),
                        createTextVNode(" Kategori tetap untuk menjaga integritas spesifikasi. ")
                      ])
                    ], 512), [
                      [vShow, currentStep.value === 0]
                    ]),
                    withDirectives(createVNode("div", null, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-bold" }, "Spesifikasi Produk"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Perbarui detail teknis gawai Anda.")
                        ]),
                        createVNode("button", {
                          type: "button",
                          onClick: openGsmSearch,
                          class: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-accent px-3 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/80"
                        }, [
                          createVNode(unref(ExternalLink), { class: "h-3.5 w-3.5" }),
                          createVNode("span", null, toDisplayString(selectedCategoryName.value.includes("smartphone") || selectedCategoryName.value.includes("tablet") ? "GSM Arena" : "Cari Spek"), 1)
                        ])
                      ]),
                      ((_b2 = currentCategory.value) == null ? void 0 : _b2.sub_types) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-6"
                      }, [
                        createVNode(_sfc_main$2, { value: "Tipe Spesifik" }),
                        createVNode("div", { class: "mt-2 flex flex-wrap gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(currentCategory.value.sub_types, (st) => {
                            return openBlock(), createBlock("button", {
                              key: st.value,
                              type: "button",
                              onClick: ($event) => unref(form).specifications.sub_type = st.value,
                              class: ["rounded-xl border px-4 py-2 text-sm font-medium transition-all", unref(form).specifications.sub_type === st.value ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-background text-muted-foreground border-border hover:bg-muted"]
                            }, toDisplayString(st.label), 11, ["onClick"]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-8" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(formSections.value, (section) => {
                          return openBlock(), createBlock("div", {
                            key: section.id
                          }, [
                            createVNode("p", { class: "mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground" }, toDisplayString(section.label), 1),
                            createVNode("div", { class: "grid grid-cols-1 gap-5 sm:grid-cols-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(section.fields, (field) => {
                                return openBlock(), createBlock(Fragment, {
                                  key: field.key
                                }, [
                                  field.type === "select" ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode(_sfc_main$2, {
                                      for: field.key,
                                      value: field.label + (field.unit ? ` (${field.unit})` : "")
                                    }, null, 8, ["for", "value"]),
                                    createVNode("select", {
                                      value: getFieldModel(field.key),
                                      onInput: ($event) => updateFieldModel(field.key, $event.target.value),
                                      id: field.key,
                                      class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary",
                                      required: field.required
                                    }, [
                                      createVNode("option", { value: "" }, toDisplayString(field.placeholder || "Pilih..."), 1),
                                      field.key === "brand" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(filteredBrands.value, (brand) => {
                                        return openBlock(), createBlock("option", {
                                          key: brand,
                                          value: brand
                                        }, toDisplayString(brand), 9, ["value"]);
                                      }), 128)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(field.options, (opt) => {
                                        return openBlock(), createBlock("option", {
                                          key: opt,
                                          value: opt
                                        }, toDisplayString(opt), 9, ["value"]);
                                      }), 128))
                                    ], 40, ["value", "onInput", "id", "required"]),
                                    field.allowOther && getFieldModel(field.key) === "Other" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-2"
                                    }, [
                                      createVNode(_sfc_main$3, {
                                        value: getCustomModel(field.key),
                                        onInput: ($event) => updateCustomModel(field.key, $event.target.value),
                                        placeholder: "Sebutkan " + field.label,
                                        class: "h-10",
                                        required: ""
                                      }, null, 8, ["value", "onInput", "placeholder"])
                                    ])) : createCommentVNode("", true),
                                    createVNode(_sfc_main$4, {
                                      class: "mt-1",
                                      message: isTopLevel(field.key) ? unref(form).errors[field.key] : unref(form).errors["specifications." + field.key]
                                    }, null, 8, ["message"])
                                  ])) : ["number", "text"].includes(field.type) ? (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode(_sfc_main$2, {
                                      for: field.key,
                                      value: field.label + (field.unit ? ` (${field.unit})` : "")
                                    }, null, 8, ["for", "value"]),
                                    createVNode(_sfc_main$3, {
                                      value: getFieldModel(field.key),
                                      onInput: ($event) => updateFieldModel(field.key, $event.target.value),
                                      id: field.key,
                                      type: field.type,
                                      class: "mt-1 block h-11 w-full",
                                      placeholder: field.placeholder,
                                      required: field.required
                                    }, null, 8, ["value", "onInput", "id", "type", "placeholder", "required"]),
                                    createVNode(_sfc_main$4, {
                                      class: "mt-1",
                                      message: isTopLevel(field.key) ? unref(form).errors[field.key] : unref(form).errors["specifications." + field.key]
                                    }, null, 8, ["message"])
                                  ])) : field.type === "boolean" ? (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "flex items-center gap-3 sm:col-span-1 pt-6"
                                  }, [
                                    createVNode("input", {
                                      type: "checkbox",
                                      checked: getFieldModel(field.key),
                                      onChange: ($event) => updateFieldModel(field.key, $event.target.checked),
                                      id: field.key,
                                      class: "h-5 w-5 rounded border-border text-primary focus:ring-primary"
                                    }, null, 40, ["checked", "onChange", "id"]),
                                    createVNode("label", {
                                      for: field.key,
                                      class: "cursor-pointer text-sm font-medium leading-none"
                                    }, [
                                      createTextVNode(toDisplayString(field.label) + " ", 1),
                                      field.placeholder ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "block text-[10px] font-normal text-muted-foreground"
                                      }, toDisplayString(field.placeholder), 1)) : createCommentVNode("", true)
                                    ], 8, ["for"]),
                                    createVNode(_sfc_main$4, {
                                      class: "mt-1",
                                      message: unref(form).errors["specifications." + field.key]
                                    }, null, 8, ["message"])
                                  ])) : createCommentVNode("", true)
                                ], 64);
                              }), 128))
                            ])
                          ]);
                        }), 128))
                      ])
                    ], 512), [
                      [vShow, currentStep.value === 1]
                    ]),
                    withDirectives(createVNode("div", null, [
                      createVNode("h3", { class: "mb-1 text-lg font-bold" }, "Informasi Penjualan"),
                      createVNode("p", { class: "mb-6 text-sm text-muted-foreground" }, "Tetapkan harga dan kondisi produk Anda."),
                      createVNode("div", { class: "space-y-5" }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "price",
                            value: "Harga Produk (Rp)"
                          }),
                          createVNode(_sfc_main$5, {
                            id: "price",
                            modelValue: unref(form).price,
                            "onUpdate:modelValue": ($event) => unref(form).price = $event,
                            required: true,
                            placeholder: "0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-1",
                            message: unref(form).errors.price
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "condition",
                            value: "Kondisi Barang"
                          }),
                          withDirectives(createVNode("select", {
                            id: "condition",
                            "onUpdate:modelValue": ($event) => unref(form).condition = $event,
                            class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary",
                            required: ""
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_CONDITIONS), (item) => {
                              return openBlock(), createBlock("option", {
                                key: item.value,
                                value: item.value
                              }, toDisplayString(item.label), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).condition]
                          ]),
                          createVNode(_sfc_main$4, {
                            class: "mt-1",
                            message: unref(form).errors.condition
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "availability",
                            value: "Status Ketersediaan"
                          }),
                          withDirectives(createVNode("select", {
                            id: "availability",
                            "onUpdate:modelValue": ($event) => unref(form).availability = $event,
                            class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary",
                            required: ""
                          }, [
                            createVNode("option", { value: "available" }, "Tersedia (Available)"),
                            createVNode("option", { value: "sold" }, "Terjual (Sold)")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).availability]
                          ]),
                          createVNode(_sfc_main$4, {
                            class: "mt-1",
                            message: unref(form).errors.availability
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex flex-wrap gap-3" }, [
                          createVNode("label", {
                            class: ["flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all flex-1 min-w-[140px]", unref(form).is_cod ? "border-primary bg-primary/5" : "border-border bg-muted/30"]
                          }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              id: "is_cod",
                              "onUpdate:modelValue": ($event) => unref(form).is_cod = $event,
                              class: "h-5 w-5 rounded border-border text-primary focus:ring-primary"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_cod]
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-bold" }, "COD"),
                              createVNode("p", { class: "text-[10px] text-muted-foreground" }, "Cash On Delivery")
                            ])
                          ], 2),
                          createVNode("label", {
                            class: ["flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all flex-1 min-w-[140px]", unref(form).is_negotiable ? "border-primary bg-primary/5" : "border-border bg-muted/30"]
                          }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              id: "is_negotiable",
                              "onUpdate:modelValue": ($event) => unref(form).is_negotiable = $event,
                              class: "h-5 w-5 rounded border-border text-primary focus:ring-primary"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_negotiable]
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-bold" }, "Bisa Nego"),
                              createVNode("p", { class: "text-[10px] text-muted-foreground" }, "Harga dapat dinegosiasikan")
                            ])
                          ], 2)
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "description",
                            value: "Deskripsi Produk"
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "5",
                            class: "mt-1 block w-full rounded-xl border-border bg-background p-3 text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary",
                            required: "",
                            placeholder: unref(form).condition === "second_good" || unref(form).condition === "minus" ? "WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)..." : "Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail..."
                          }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode(_sfc_main$4, {
                            class: "mt-1",
                            message: unref(form).errors.description
                          }, null, 8, ["message"])
                        ])
                      ])
                    ], 512), [
                      [vShow, currentStep.value === 2]
                    ]),
                    withDirectives(createVNode("div", null, [
                      createVNode("h3", { class: "mb-1 text-lg font-bold" }, "Kelengkapan Produk"),
                      createVNode("p", { class: "mb-6 text-sm text-muted-foreground" }, "Centang semua item yang tersedia dalam paket penjualan."),
                      currentCategory.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-2 gap-3 sm:grid-cols-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(currentCategory.value.checklists, (item) => {
                          return openBlock(), createBlock("label", {
                            key: item,
                            class: ["flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all", unref(form).specifications.kelengkapan.includes(item) ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 hover:border-primary/40"]
                          }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              value: item,
                              "onUpdate:modelValue": ($event) => unref(form).specifications.kelengkapan = $event,
                              class: "h-5 w-5 rounded border-border text-primary focus:ring-primary"
                            }, null, 8, ["value", "onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).specifications.kelengkapan]
                            ]),
                            createVNode("span", { class: "text-sm font-semibold" }, toDisplayString(item), 1)
                          ], 2);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-5" }, [
                        createVNode(_sfc_main$2, { value: "Keterangan Lain (Opsional)" }),
                        createVNode(_sfc_main$3, {
                          modelValue: unref(form).specifications.kelengkapan_note,
                          "onUpdate:modelValue": ($event) => unref(form).specifications.kelengkapan_note = $event,
                          placeholder: "Misal: Dus ada penyok dikit",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          class: "mt-1",
                          message: unref(form).errors["specifications.kelengkapan_note"]
                        }, null, 8, ["message"])
                      ]),
                      createVNode(_sfc_main$4, {
                        class: "mt-3",
                        message: unref(form).errors["specifications.kelengkapan"]
                      }, null, 8, ["message"])
                    ], 512), [
                      [vShow, currentStep.value === 3]
                    ]),
                    withDirectives(createVNode("div", null, [
                      createVNode("h3", { class: "mb-1 text-lg font-bold" }, "Foto Produk"),
                      createVNode("p", { class: "mb-6 text-sm text-muted-foreground" }, "Kelola foto produk Anda. Maksimal 10 foto."),
                      __props.product.images.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-8"
                      }, [
                        createVNode(_sfc_main$2, {
                          value: "Foto Saat Ini (Klik untuk hapus)",
                          class: "mb-3"
                        }),
                        createVNode("div", { class: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.product.images, (img) => {
                            return openBlock(), createBlock("div", {
                              key: img.id,
                              class: ["group relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm transition-all", { "opacity-30 grayscale scale-95 border-destructive": isExistingDeleted(img.id) }]
                            }, [
                              createVNode("img", {
                                src: "/storage/" + img.image_path,
                                class: "h-full w-full object-cover"
                              }, null, 8, ["src"]),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => toggleDeleteExisting(img.id),
                                class: ["absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-lg transition-all", isExistingDeleted(img.id) ? "bg-primary text-white" : "bg-background/80 text-foreground hover:bg-destructive hover:text-white"]
                              }, [
                                isExistingDeleted(img.id) ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "h-3 w-3"
                                })) : (openBlock(), createBlock(unref(X), {
                                  key: 1,
                                  class: "h-3 w-3"
                                }))
                              ], 10, ["onClick"]),
                              isExistingDeleted(img.id) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "absolute inset-0 flex items-center justify-center"
                              }, [
                                createVNode("span", { class: "bg-destructive px-1.5 py-0.5 text-[8px] font-bold text-white rounded" }, "DIHAPUS")
                              ])) : createCommentVNode("", true)
                            ], 2);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("label", {
                        for: "images",
                        class: "group flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 transition-all hover:border-primary hover:bg-primary/5"
                      }, [
                        createVNode(unref(ImagePlus), { class: "mb-2 h-7 w-7 text-muted-foreground transition-colors group-hover:text-primary" }),
                        createVNode("p", { class: "text-sm font-semibold text-muted-foreground group-hover:text-primary" }, "Tambah foto baru"),
                        createVNode("input", {
                          id: "images",
                          ref_key: "fileInput",
                          ref: fileInput,
                          type: "file",
                          onChange: handleFiles,
                          class: "hidden",
                          multiple: "",
                          accept: "image/jpeg,image/png,image/jpg"
                        }, null, 544)
                      ]),
                      imagePreviews.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(imagePreviews.value, (preview, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "group relative aspect-square overflow-hidden rounded-xl border border-primary/30 bg-card shadow-sm"
                          }, [
                            createVNode("img", {
                              src: preview.url,
                              class: "h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeNewFile(index),
                              class: "absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg"
                            }, [
                              createVNode(unref(X), { class: "h-3 w-3" })
                            ], 8, ["onClick"]),
                            createVNode("div", { class: "absolute bottom-0 left-0 right-0 bg-emerald-500/80 py-0.5 text-center text-[9px] font-bold text-white" }, "BARU")
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.images
                      }, null, 8, ["message"])
                    ], 512), [
                      [vShow, currentStep.value === 4]
                    ]),
                    createVNode("div", { class: "mt-8 flex items-center justify-between border-t border-border pt-5" }, [
                      currentStep.value > 1 ? (openBlock(), createBlock("button", {
                        key: 0,
                        type: "button",
                        onClick: goPrev,
                        class: "inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-5 py-2.5 text-sm font-semibold transition-all hover:bg-muted"
                      }, [
                        createVNode(unref(ChevronLeft), { class: "h-4 w-4" }),
                        createTextVNode(" Sebelumnya ")
                      ])) : (openBlock(), createBlock("button", {
                        key: 1,
                        type: "button",
                        onClick: confirmCancel,
                        class: "text-sm font-bold text-muted-foreground transition-colors hover:text-destructive"
                      }, "Batal")),
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(currentStep.value + 1) + " / " + toDisplayString(STEPS.length), 1),
                        currentStep.value < STEPS.length - 1 ? (openBlock(), createBlock("button", {
                          key: 0,
                          type: "button",
                          onClick: goNext,
                          disabled: !canGoNext.value,
                          class: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        }, [
                          createTextVNode(" Selanjutnya "),
                          createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                        ], 8, ["disabled"])) : (openBlock(), createBlock(_sfc_main$6, {
                          key: 1,
                          disabled: unref(form).processing,
                          onClick: submit,
                          class: "h-11 px-6 text-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(form).processing ? "Memproses..." : "Simpan Perubahan"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]))
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$7, {
                show: showCropper.value,
                files: pendingFiles.value,
                onClose: handleCropperFinished,
                onCropped: handleCropped,
                onFinished: handleCropperFinished
              }, null, 8, ["show", "files"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
