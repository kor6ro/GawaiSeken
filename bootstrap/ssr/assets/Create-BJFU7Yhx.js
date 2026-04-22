import { watch, computed, ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, withModifiers, withDirectives, createBlock, openBlock, Fragment, renderList, vModelSelect, vModelCheckbox, vModelText, Transition, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-BDlcmPtd.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./InputError-DDbcJ_iI.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$4 } from "./TextInput-Cpy3OAqn.js";
import { P as PRODUCT_BRANDS, _ as _sfc_main$5, a as PRODUCT_CONDITIONS, R as RAM_OPTIONS, S as STORAGE_OPTIONS, K as KELENGKAPAN_OPTIONS } from "./constants-CeaA9YUP.js";
import { ExternalLink, Info, ImagePlus, X } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./onlineState-BAtS9nBF.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      category_id: "",
      brand: "",
      type: "",
      condition: "second_like_new",
      is_cod: false,
      is_negotiable: true,
      price: "",
      description: "",
      specifications: {
        ram: "",
        storage: "",
        battery_health: "",
        screen_size: "",
        processor: "",
        gpu: "",
        kelengkapan: ""
      },
      images: []
    });
    watch(
      () => form.condition,
      (newVal) => {
        if (newVal && newVal !== "new") {
          form.is_negotiable = true;
        }
      }
    );
    const filteredBrands = computed(() => {
      return PRODUCT_BRANDS[form.category_id] || PRODUCT_BRANDS["default"];
    });
    const selectedCategoryName = computed(() => {
      const cat = props.categories.find((c) => c.id == form.category_id);
      return cat ? cat.name.toLowerCase() : "";
    });
    const showSpecs = computed(() => form.category_id !== "");
    const showField = (cats) => {
      if (!selectedCategoryName.value) return false;
      const allowed = cats.split(",");
      return allowed.some((cat) => selectedCategoryName.value.includes(cat));
    };
    const openGsmSearch = () => {
      if (!form.brand || !form.type) {
        alert("Pilih Merek dan isi Tipe terlebih dahulu.");
        return;
      }
      const query = encodeURIComponent(form.brand + " " + form.type);
      if (selectedCategoryName.value.includes("smartphone") || selectedCategoryName.value.includes("tablet")) {
        window.open(`https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=${query}`, "_blank");
      } else {
        const suffix = selectedCategoryName.value.includes("laptop") ? " specs laptopmedia" : " specs";
        window.open(`https://www.google.com/search?q=${query}${suffix}`, "_blank");
      }
    };
    const imagePreviews = ref([]);
    const fileInput = ref(null);
    const handleFiles = (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        form.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviews.value.push({
            url: e.target.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      });
    };
    const removeFile = (index) => {
      form.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };
    const submit = () => {
      form.post(route("products.store"), {
        forceFormData: true,
        onSuccess: () => {
        }
      });
    };
    watch(
      () => form.category_id,
      () => {
        form.specifications = {
          ram: "",
          storage: "",
          battery_health: "",
          screen_size: "",
          processor: "",
          gpu: "",
          kelengkapan: ""
        };
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Jual Produk Baru</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Jual Produk Baru")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Jual Produk Baru" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="border border-border bg-card p-4 text-card-foreground shadow sm:rounded-2xl sm:p-8"${_scopeId}><div class="mx-auto max-w-2xl"${_scopeId}><header${_scopeId}><div class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold"${_scopeId}>Informasi Produk</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId}> Lengkapi detail gawai yang ingin Anda jual. </p></div><button type="button" class="inline-flex items-center gap-2 rounded-xl border border-border bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/80"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ExternalLink), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(selectedCategoryName.value.includes("smartphone") || selectedCategoryName.value.includes("tablet") ? "Cari di GSM Arena" : "Cari Spesifikasi")}</span></button></div></header><form class="space-y-8"${_scopeId}><div class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8"${_scopeId}><h3 class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"${_scopeId}><span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"${_scopeId}>1</span> 1. Identitas Produk </h3><div class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "category_id",
              value: "Kategori"
            }, null, _parent2, _scopeId));
            _push2(`<select id="category_id" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>-- Pilih Kategori --</option><!--[-->`);
            ssrRenderList(__props.categories, (cat) => {
              _push2(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, cat.id) : ssrLooseEqual(unref(form).category_id, cat.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.category_id
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "brand",
              value: "Merek / Brand"
            }, null, _parent2, _scopeId));
            _push2(`<select id="brand" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).brand) ? ssrLooseContain(unref(form).brand, "") : ssrLooseEqual(unref(form).brand, "")) ? " selected" : ""}${_scopeId}>-- Pilih Merek --</option><!--[-->`);
            ssrRenderList(filteredBrands.value, (brandName) => {
              _push2(`<option${ssrRenderAttr("value", brandName)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).brand) ? ssrLooseContain(unref(form).brand, brandName) : ssrLooseEqual(unref(form).brand, brandName)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(brandName)}</option>`);
            });
            _push2(`<!--]--><option value="Lainnya"${ssrIncludeBooleanAttr(Array.isArray(unref(form).brand) ? ssrLooseContain(unref(form).brand, "Lainnya") : ssrLooseEqual(unref(form).brand, "Lainnya")) ? " selected" : ""}${_scopeId}>Lainnya</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.brand
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "type",
              value: "Tipe / Model"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "type",
              modelValue: unref(form).type,
              "onUpdate:modelValue": ($event) => unref(form).type = $event,
              type: "text",
              class: "mt-1 block h-11 w-full",
              required: "",
              placeholder: "Misal: iPhone 13"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.type
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8"${_scopeId}><h3 class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"${_scopeId}><span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"${_scopeId}>2</span> 2. Informasi Penjualan </h3><div class="space-y-6"${_scopeId}><div${_scopeId}>`);
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
            _push2(`<p class="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "h-3 w-3" }, null, _parent2, _scopeId));
            _push2(` Isi harga dengan wajar sesuai kondisi gadget Second. </p>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.price
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div class="col-span-1 md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "condition",
              value: "Kondisi Barang"
            }, null, _parent2, _scopeId));
            _push2(`<select id="condition" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary" required${_scopeId}><!--[-->`);
            ssrRenderList(unref(PRODUCT_CONDITIONS), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, item.value) : ssrLooseEqual(unref(form).condition, item.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.label)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.condition
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-2 flex items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><input type="checkbox" id="is_cod"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_cod) ? ssrLooseContain(unref(form).is_cod, null) : unref(form).is_cod) ? " checked" : ""} class="rounded border-border text-primary focus:ring-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "is_cod",
              value: "Fitur COD",
              class: "!mb-0 cursor-pointer"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mx-2 h-6 w-px bg-border"${_scopeId}></div><div class="flex items-center gap-2"${_scopeId}><input type="checkbox" id="is_negotiable"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_negotiable) ? ssrLooseContain(unref(form).is_negotiable, null) : unref(form).is_negotiable) ? " checked" : ""} class="rounded border-border text-primary focus:ring-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "is_negotiable",
              value: "Bisa Nego",
              class: "!mb-0 cursor-pointer"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: "Deskripsi Produk"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="description" rows="5" class="mt-1 block w-full rounded-xl border-border bg-background p-3 text-sm text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary" required${ssrRenderAttr(
              "placeholder",
              unref(form).condition === "second_good" || unref(form).condition === "minus" ? "WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)..." : "Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail..."
            )}${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            if (showSpecs.value) {
              _push2(`<div class="rounded-3xl border border-border bg-primary/5 p-6 shadow-sm transition-all duration-300 sm:p-8"${_scopeId}><h3 class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"${_scopeId}><span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"${_scopeId}>3</span> 3. Spesifikasi ${ssrInterpolate(selectedCategoryName.value)}</h3><p class="mb-6 text-xs text-muted-foreground"${_scopeId}> Informasi spesifikasi membantu calon pembeli mengenal produk lebih dalam. </p><div class="grid grid-cols-1 gap-6 md:grid-cols-2"${_scopeId}>`);
              if (showField("smartphone,laptop,tablet")) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  for: "spec_ram",
                  value: "RAM"
                }, null, _parent2, _scopeId));
                _push2(`<select id="spec_ram" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.ram) ? ssrLooseContain(unref(form).specifications.ram, "") : ssrLooseEqual(unref(form).specifications.ram, "")) ? " selected" : ""}${_scopeId}>Pilih RAM</option><!--[-->`);
                ssrRenderList(unref(RAM_OPTIONS), (ram) => {
                  _push2(`<option${ssrRenderAttr("value", ram)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.ram) ? ssrLooseContain(unref(form).specifications.ram, ram) : ssrLooseEqual(unref(form).specifications.ram, ram)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(ram)}</option>`);
                });
                _push2(`<!--]--></select></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (showField("smartphone,laptop,tablet")) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  for: "spec_storage",
                  value: "Penyimpanan (ROM/SSD)"
                }, null, _parent2, _scopeId));
                _push2(`<select id="spec_storage" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.storage) ? ssrLooseContain(unref(form).specifications.storage, "") : ssrLooseEqual(unref(form).specifications.storage, "")) ? " selected" : ""}${_scopeId}>Pilih Kapasitas</option><!--[-->`);
                ssrRenderList(unref(STORAGE_OPTIONS), (rom) => {
                  _push2(`<option${ssrRenderAttr("value", rom)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.storage) ? ssrLooseContain(unref(form).specifications.storage, rom) : ssrLooseEqual(unref(form).specifications.storage, rom)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(rom)}</option>`);
                });
                _push2(`<!--]--></select></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (showField("smartphone,tablet")) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  for: "spec_bh",
                  value: "Battery Health (BH) %"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$4, {
                  modelValue: unref(form).specifications.battery_health,
                  "onUpdate:modelValue": ($event) => unref(form).specifications.battery_health = $event,
                  type: "number",
                  class: "mt-1 block h-11 w-full",
                  placeholder: "Misal: 85",
                  min: "0",
                  max: "100"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (showField("laptop")) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  for: "spec_screen",
                  value: "Ukuran Layar (Inch)"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$4, {
                  modelValue: unref(form).specifications.screen_size,
                  "onUpdate:modelValue": ($event) => unref(form).specifications.screen_size = $event,
                  type: "text",
                  class: "mt-1 block h-11 w-full",
                  placeholder: "Misal: 14"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (showField("laptop")) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  for: "spec_processor",
                  value: "Processor"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$4, {
                  modelValue: unref(form).specifications.processor,
                  "onUpdate:modelValue": ($event) => unref(form).specifications.processor = $event,
                  type: "text",
                  class: "mt-1 block h-11 w-full",
                  placeholder: "Contoh: Intel Core i5 Gen 12"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (showField("laptop")) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  for: "spec_gpu",
                  value: "VGA / GPU"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$4, {
                  modelValue: unref(form).specifications.gpu,
                  "onUpdate:modelValue": ($event) => unref(form).specifications.gpu = $event,
                  type: "text",
                  class: "mt-1 block h-11 w-full",
                  placeholder: "Contoh: NVIDIA RTX 3050"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (showField("smartphone,laptop,tablet,aksesoris")) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  for: "spec_kelengkapan",
                  value: "Kelengkapan"
                }, null, _parent2, _scopeId));
                _push2(`<select id="spec_kelengkapan" class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.kelengkapan) ? ssrLooseContain(unref(form).specifications.kelengkapan, "") : ssrLooseEqual(unref(form).specifications.kelengkapan, "")) ? " selected" : ""}${_scopeId}>-- Pilih Kelengkapan --</option><!--[-->`);
                ssrRenderList(unref(KELENGKAPAN_OPTIONS), (item) => {
                  _push2(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.kelengkapan) ? ssrLooseContain(unref(form).specifications.kelengkapan, item.value) : ssrLooseEqual(unref(form).specifications.kelengkapan, item.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.label)}</option>`);
                });
                _push2(`<!--]--></select></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8"${_scopeId}><h3 class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"${_scopeId}><span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"${_scopeId}>4</span> 4. Media Foto </h3><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "images",
              value: "Upload Foto Produk (Min 1)"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 flex w-full items-center justify-center"${_scopeId}><label for="images" class="group flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition-all hover:bg-muted/50"${_scopeId}><div class="flex flex-col items-center justify-center pb-6 pt-5"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ImagePlus), { class: "mb-3 h-10 w-10 text-muted-foreground transition-all group-hover:scale-110 group-hover:text-primary" }, null, _parent2, _scopeId));
            _push2(`<p class="text-sm text-muted-foreground"${_scopeId}><span class="font-bold text-primary"${_scopeId}>Klik untuk tambah</span> atau seret ke sini </p><p class="mt-1 text-[10px] text-muted-foreground"${_scopeId}>JPG, PNG up to 2MB</p></div><input id="images" type="file" class="hidden" multiple accept="image/jpeg,image/png,image/jpg"${ssrIncludeBooleanAttr(unref(form).images.length === 0) ? " required" : ""}${_scopeId}></label></div>`);
            if (imagePreviews.value.length > 0) {
              _push2(`<div class="animate-fade-in mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-muted/50 p-4 sm:grid-cols-4 md:grid-cols-5"${_scopeId}><!--[-->`);
              ssrRenderList(imagePreviews.value, (preview, index) => {
                _push2(`<div class="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm"${_scopeId}><img${ssrRenderAttr("src", preview.url)} loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"${_scopeId}><button type="button" class="absolute right-2 top-2 z-10 flex items-center justify-center rounded-full border border-border bg-background/90 p-1.5 text-foreground shadow-lg transition-all hover:bg-destructive hover:text-white"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</button></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.images
            }, null, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).errors, (error, index) => {
              _push2(`<div${_scopeId}>`);
              if (index.startsWith("images.")) {
                _push2(ssrRenderComponent(_sfc_main$3, {
                  class: "mt-1",
                  message: error
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div><div class="mt-10 flex items-center gap-6 border-t border-border pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              disabled: unref(form).processing,
              class: "h-12 px-8 text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? "Sedang Memproses..." : "Tayangkan Produk")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? "Sedang Memproses..." : "Tayangkan Produk"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("dashboard"),
              class: "text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Batal`);
                } else {
                  return [
                    createTextVNode("Batal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Jual Produk Baru" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "border border-border bg-card p-4 text-card-foreground shadow sm:rounded-2xl sm:p-8" }, [
                    createVNode("div", { class: "mx-auto max-w-2xl" }, [
                      createVNode("header", null, [
                        createVNode("div", { class: "mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center" }, [
                          createVNode("div", null, [
                            createVNode("h2", { class: "text-2xl font-bold" }, "Informasi Produk"),
                            createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Lengkapi detail gawai yang ingin Anda jual. ")
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: openGsmSearch,
                            class: "inline-flex items-center gap-2 rounded-xl border border-border bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/80"
                          }, [
                            createVNode(unref(ExternalLink), { class: "h-4 w-4" }),
                            createVNode("span", null, toDisplayString(selectedCategoryName.value.includes("smartphone") || selectedCategoryName.value.includes("tablet") ? "Cari di GSM Arena" : "Cari Spesifikasi"), 1)
                          ])
                        ])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-8"
                      }, [
                        createVNode("div", { class: "rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8" }, [
                          createVNode("h3", { class: "mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold" }, [
                            createVNode("span", { class: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary" }, "1"),
                            createTextVNode(" 1. Identitas Produk ")
                          ]),
                          createVNode("div", { class: "space-y-6" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, {
                                for: "category_id",
                                value: "Kategori"
                              }),
                              withDirectives(createVNode("select", {
                                id: "category_id",
                                "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                                class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary",
                                required: ""
                              }, [
                                createVNode("option", { value: "" }, "-- Pilih Kategori --"),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                                  return openBlock(), createBlock("option", {
                                    key: cat.id,
                                    value: cat.id
                                  }, toDisplayString(cat.name), 9, ["value"]);
                                }), 128))
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(form).category_id]
                              ]),
                              createVNode(_sfc_main$3, {
                                class: "mt-2",
                                message: unref(form).errors.category_id
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "brand",
                                  value: "Merek / Brand"
                                }),
                                withDirectives(createVNode("select", {
                                  id: "brand",
                                  "onUpdate:modelValue": ($event) => unref(form).brand = $event,
                                  class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary",
                                  required: ""
                                }, [
                                  createVNode("option", { value: "" }, "-- Pilih Merek --"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredBrands.value, (brandName) => {
                                    return openBlock(), createBlock("option", {
                                      key: brandName,
                                      value: brandName
                                    }, toDisplayString(brandName), 9, ["value"]);
                                  }), 128)),
                                  createVNode("option", { value: "Lainnya" }, "Lainnya")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(form).brand]
                                ]),
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.brand
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "type",
                                  value: "Tipe / Model"
                                }),
                                createVNode(_sfc_main$4, {
                                  id: "type",
                                  modelValue: unref(form).type,
                                  "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                  type: "text",
                                  class: "mt-1 block h-11 w-full",
                                  required: "",
                                  placeholder: "Misal: iPhone 13"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.type
                                }, null, 8, ["message"])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8" }, [
                          createVNode("h3", { class: "mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold" }, [
                            createVNode("span", { class: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary" }, "2"),
                            createTextVNode(" 2. Informasi Penjualan ")
                          ]),
                          createVNode("div", { class: "space-y-6" }, [
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
                              createVNode("p", { class: "mt-1 flex items-center gap-1 text-[10px] text-muted-foreground" }, [
                                createVNode(unref(Info), { class: "h-3 w-3" }),
                                createTextVNode(" Isi harga dengan wajar sesuai kondisi gadget Second. ")
                              ]),
                              createVNode(_sfc_main$3, {
                                class: "mt-2",
                                message: unref(form).errors.price
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                              createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                                createVNode(_sfc_main$2, {
                                  for: "condition",
                                  value: "Kondisi Barang"
                                }),
                                withDirectives(createVNode("select", {
                                  id: "condition",
                                  "onUpdate:modelValue": ($event) => unref(form).condition = $event,
                                  class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary",
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
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.condition
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "mt-2 flex items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4" }, [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  withDirectives(createVNode("input", {
                                    type: "checkbox",
                                    id: "is_cod",
                                    "onUpdate:modelValue": ($event) => unref(form).is_cod = $event,
                                    class: "rounded border-border text-primary focus:ring-primary"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelCheckbox, unref(form).is_cod]
                                  ]),
                                  createVNode(_sfc_main$2, {
                                    for: "is_cod",
                                    value: "Fitur COD",
                                    class: "!mb-0 cursor-pointer"
                                  })
                                ]),
                                createVNode("div", { class: "mx-2 h-6 w-px bg-border" }),
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  withDirectives(createVNode("input", {
                                    type: "checkbox",
                                    id: "is_negotiable",
                                    "onUpdate:modelValue": ($event) => unref(form).is_negotiable = $event,
                                    class: "rounded border-border text-primary focus:ring-primary"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelCheckbox, unref(form).is_negotiable]
                                  ]),
                                  createVNode(_sfc_main$2, {
                                    for: "is_negotiable",
                                    value: "Bisa Nego",
                                    class: "!mb-0 cursor-pointer"
                                  })
                                ])
                              ])
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
                                class: "mt-1 block w-full rounded-xl border-border bg-background p-3 text-sm text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary",
                                required: "",
                                placeholder: unref(form).condition === "second_good" || unref(form).condition === "minus" ? "WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)..." : "Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail..."
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, unref(form).description]
                              ]),
                              createVNode(_sfc_main$3, {
                                class: "mt-2",
                                message: unref(form).errors.description
                              }, null, 8, ["message"])
                            ])
                          ])
                        ]),
                        createVNode(Transition, {
                          "enter-active-class": "transition ease-out duration-200",
                          "enter-from-class": "opacity-0 -translate-y-4",
                          "enter-to-class": "opacity-100 translate-y-0"
                        }, {
                          default: withCtx(() => [
                            showSpecs.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "rounded-3xl border border-border bg-primary/5 p-6 shadow-sm transition-all duration-300 sm:p-8"
                            }, [
                              createVNode("h3", { class: "mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold" }, [
                                createVNode("span", { class: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary" }, "3"),
                                createTextVNode(" 3. Spesifikasi " + toDisplayString(selectedCategoryName.value), 1)
                              ]),
                              createVNode("p", { class: "mb-6 text-xs text-muted-foreground" }, " Informasi spesifikasi membantu calon pembeli mengenal produk lebih dalam. "),
                              createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                                showField("smartphone,laptop,tablet") ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode(_sfc_main$2, {
                                    for: "spec_ram",
                                    value: "RAM"
                                  }),
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => unref(form).specifications.ram = $event,
                                    id: "spec_ram",
                                    class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                  }, [
                                    createVNode("option", { value: "" }, "Pilih RAM"),
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(RAM_OPTIONS), (ram) => {
                                      return openBlock(), createBlock("option", {
                                        key: ram,
                                        value: ram
                                      }, toDisplayString(ram), 9, ["value"]);
                                    }), 128))
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, unref(form).specifications.ram]
                                  ])
                                ])) : createCommentVNode("", true),
                                showField("smartphone,laptop,tablet") ? (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode(_sfc_main$2, {
                                    for: "spec_storage",
                                    value: "Penyimpanan (ROM/SSD)"
                                  }),
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => unref(form).specifications.storage = $event,
                                    id: "spec_storage",
                                    class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                  }, [
                                    createVNode("option", { value: "" }, "Pilih Kapasitas"),
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(STORAGE_OPTIONS), (rom) => {
                                      return openBlock(), createBlock("option", {
                                        key: rom,
                                        value: rom
                                      }, toDisplayString(rom), 9, ["value"]);
                                    }), 128))
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, unref(form).specifications.storage]
                                  ])
                                ])) : createCommentVNode("", true),
                                showField("smartphone,tablet") ? (openBlock(), createBlock("div", { key: 2 }, [
                                  createVNode(_sfc_main$2, {
                                    for: "spec_bh",
                                    value: "Battery Health (BH) %"
                                  }),
                                  createVNode(_sfc_main$4, {
                                    modelValue: unref(form).specifications.battery_health,
                                    "onUpdate:modelValue": ($event) => unref(form).specifications.battery_health = $event,
                                    type: "number",
                                    class: "mt-1 block h-11 w-full",
                                    placeholder: "Misal: 85",
                                    min: "0",
                                    max: "100"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])) : createCommentVNode("", true),
                                showField("laptop") ? (openBlock(), createBlock("div", { key: 3 }, [
                                  createVNode(_sfc_main$2, {
                                    for: "spec_screen",
                                    value: "Ukuran Layar (Inch)"
                                  }),
                                  createVNode(_sfc_main$4, {
                                    modelValue: unref(form).specifications.screen_size,
                                    "onUpdate:modelValue": ($event) => unref(form).specifications.screen_size = $event,
                                    type: "text",
                                    class: "mt-1 block h-11 w-full",
                                    placeholder: "Misal: 14"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])) : createCommentVNode("", true),
                                showField("laptop") ? (openBlock(), createBlock("div", { key: 4 }, [
                                  createVNode(_sfc_main$2, {
                                    for: "spec_processor",
                                    value: "Processor"
                                  }),
                                  createVNode(_sfc_main$4, {
                                    modelValue: unref(form).specifications.processor,
                                    "onUpdate:modelValue": ($event) => unref(form).specifications.processor = $event,
                                    type: "text",
                                    class: "mt-1 block h-11 w-full",
                                    placeholder: "Contoh: Intel Core i5 Gen 12"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])) : createCommentVNode("", true),
                                showField("laptop") ? (openBlock(), createBlock("div", { key: 5 }, [
                                  createVNode(_sfc_main$2, {
                                    for: "spec_gpu",
                                    value: "VGA / GPU"
                                  }),
                                  createVNode(_sfc_main$4, {
                                    modelValue: unref(form).specifications.gpu,
                                    "onUpdate:modelValue": ($event) => unref(form).specifications.gpu = $event,
                                    type: "text",
                                    class: "mt-1 block h-11 w-full",
                                    placeholder: "Contoh: NVIDIA RTX 3050"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])) : createCommentVNode("", true),
                                showField("smartphone,laptop,tablet,aksesoris") ? (openBlock(), createBlock("div", { key: 6 }, [
                                  createVNode(_sfc_main$2, {
                                    for: "spec_kelengkapan",
                                    value: "Kelengkapan"
                                  }),
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => unref(form).specifications.kelengkapan = $event,
                                    id: "spec_kelengkapan",
                                    class: "mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                  }, [
                                    createVNode("option", { value: "" }, "-- Pilih Kelengkapan --"),
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(KELENGKAPAN_OPTIONS), (item) => {
                                      return openBlock(), createBlock("option", {
                                        key: item.value,
                                        value: item.value
                                      }, toDisplayString(item.label), 9, ["value"]);
                                    }), 128))
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, unref(form).specifications.kelengkapan]
                                  ])
                                ])) : createCommentVNode("", true)
                              ])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8" }, [
                          createVNode("h3", { class: "mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold" }, [
                            createVNode("span", { class: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary" }, "4"),
                            createTextVNode(" 4. Media Foto ")
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "images",
                              value: "Upload Foto Produk (Min 1)"
                            }),
                            createVNode("div", { class: "mt-2 flex w-full items-center justify-center" }, [
                              createVNode("label", {
                                for: "images",
                                class: "group flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition-all hover:bg-muted/50"
                              }, [
                                createVNode("div", { class: "flex flex-col items-center justify-center pb-6 pt-5" }, [
                                  createVNode(unref(ImagePlus), { class: "mb-3 h-10 w-10 text-muted-foreground transition-all group-hover:scale-110 group-hover:text-primary" }),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, [
                                    createVNode("span", { class: "font-bold text-primary" }, "Klik untuk tambah"),
                                    createTextVNode(" atau seret ke sini ")
                                  ]),
                                  createVNode("p", { class: "mt-1 text-[10px] text-muted-foreground" }, "JPG, PNG up to 2MB")
                                ]),
                                createVNode("input", {
                                  id: "images",
                                  ref_key: "fileInput",
                                  ref: fileInput,
                                  type: "file",
                                  onChange: handleFiles,
                                  class: "hidden",
                                  multiple: "",
                                  accept: "image/jpeg,image/png,image/jpg",
                                  required: unref(form).images.length === 0
                                }, null, 40, ["required"])
                              ])
                            ]),
                            imagePreviews.value.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "animate-fade-in mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-muted/50 p-4 sm:grid-cols-4 md:grid-cols-5"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(imagePreviews.value, (preview, index) => {
                                return openBlock(), createBlock("div", {
                                  key: index,
                                  class: "group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm"
                                }, [
                                  createVNode("img", {
                                    src: preview.url,
                                    loading: "lazy",
                                    class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  }, null, 8, ["src"]),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: ($event) => removeFile(index),
                                    class: "absolute right-2 top-2 z-10 flex items-center justify-center rounded-full border border-border bg-background/90 p-1.5 text-foreground shadow-lg transition-all hover:bg-destructive hover:text-white"
                                  }, [
                                    createVNode(unref(X), { class: "h-3 w-3" })
                                  ], 8, ["onClick"])
                                ]);
                              }), 128))
                            ])) : createCommentVNode("", true),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.images
                            }, null, 8, ["message"]),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).errors, (error, index) => {
                              return openBlock(), createBlock("div", { key: index }, [
                                index.startsWith("images.") ? (openBlock(), createBlock(_sfc_main$3, {
                                  key: 0,
                                  class: "mt-1",
                                  message: error
                                }, null, 8, ["message"])) : createCommentVNode("", true)
                              ]);
                            }), 128))
                          ])
                        ]),
                        createVNode("div", { class: "mt-10 flex items-center gap-6 border-t border-border pt-4" }, [
                          createVNode(_sfc_main$6, {
                            disabled: unref(form).processing,
                            class: "h-12 px-8 text-sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(form).processing ? "Sedang Memproses..." : "Tayangkan Produk"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(Link), {
                            href: _ctx.route("dashboard"),
                            class: "text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ], 32)
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
