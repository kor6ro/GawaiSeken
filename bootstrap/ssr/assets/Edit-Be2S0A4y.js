import { computed, ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelCheckbox, vModelText, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B-phu6gS.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4 } from "./TextInput-ivY_q2i2.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-b74eHQMS.js";
import { P as PRODUCT_BRANDS, _ as _sfc_main$5, a as PRODUCT_CONDITIONS, R as RAM_OPTIONS, S as STORAGE_OPTIONS, K as KELENGKAPAN_OPTIONS } from "./constants-ATjFajIu.js";
import { Info, X, ImagePlus } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-Cw8mmzBN.js";
import "lodash/pickBy.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    product: Object,
    categories: Array
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g;
    const props = __props;
    const formatCondition = (cond) => {
      if (!cond || cond.includes("Baru")) return "Bekas Mulus";
      if (cond === "Bekas - Mulus") return "Bekas Mulus";
      if (cond === "Bekas - Ada minus") return "Bekas Ada minus";
      return cond;
    };
    const form = useForm({
      _method: "put",
      brand: props.product.brand,
      type: props.product.type,
      condition: formatCondition(props.product.condition),
      is_cod: props.product.is_cod,
      is_negotiable: props.product.is_negotiable,
      price: props.product.price,
      status: props.product.status,
      description: props.product.description,
      specifications: {
        ram: ((_a = props.product.specifications) == null ? void 0 : _a.ram) || "",
        storage: ((_b = props.product.specifications) == null ? void 0 : _b.storage) || "",
        battery_health: ((_c = props.product.specifications) == null ? void 0 : _c.battery_health) || "",
        screen_size: ((_d = props.product.specifications) == null ? void 0 : _d.screen_size) || "",
        processor: ((_e = props.product.specifications) == null ? void 0 : _e.processor) || "",
        gpu: ((_f = props.product.specifications) == null ? void 0 : _f.gpu) || "",
        kelengkapan: ((_g = props.product.specifications) == null ? void 0 : _g.kelengkapan) || ""
      },
      images: [],
      delete_images: []
    });
    const categoryName = computed(() => {
      var _a2;
      return ((_a2 = props.product.category) == null ? void 0 : _a2.name.toLowerCase()) || "";
    });
    const categoryId = computed(() => props.product.category_id);
    const filteredBrands = computed(() => {
      return PRODUCT_BRANDS[categoryId.value] || PRODUCT_BRANDS["default"];
    });
    const showField = (cats) => {
      const allowed = cats.split(",");
      return allowed.some((cat) => categoryName.value.includes(cat));
    };
    const imagePreviews = ref([]);
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
    const removeNewFile = (index) => {
      form.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };
    const toggleDeleteExisting = (imageId) => {
      const index = form.delete_images.indexOf(imageId);
      if (index > -1) {
        form.delete_images.splice(index, 1);
      } else {
        form.delete_images.push(imageId);
      }
    };
    const isExistingDeleted = (imageId) => form.delete_images.includes(imageId);
    const submit = () => {
      form.post(route("products.update", props.product.slug), {
        forceFormData: true,
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-foreground leading-tight"${_scopeId}> Edit Produk </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-foreground leading-tight" }, " Edit Produk ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Edit Produk" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="p-4 sm:p-8 bg-card text-card-foreground shadow sm:rounded-2xl border border-border"${_scopeId}><div class="max-w-2xl mx-auto"${_scopeId}><header class="mb-8"${_scopeId}><h2 class="text-2xl font-bold"${_scopeId}>Edit Produk</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Perbarui informasi harga, kondisi, atau detail spesifikasi gawai Anda.</p></header><form class="space-y-8"${_scopeId}><div class="p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm"${_scopeId}><h3 class="text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2"${_scopeId}><span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs"${_scopeId}>1</span> 1. Identitas Produk </h3><div class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Kategori" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              value: __props.product.category.name,
              class: "mt-1 block w-full bg-muted/50 cursor-not-allowed",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-[10px] text-muted-foreground mt-1 italic flex items-center gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "w-3 h-3" }, null, _parent2, _scopeId));
            _push2(` Kategori tidak dapat diubah untuk menjaga konsistensi spesifikasi. </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "brand",
              value: "Merek / Brand"
            }, null, _parent2, _scopeId));
            _push2(`<select id="brand" class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).brand) ? ssrLooseContain(unref(form).brand, "") : ssrLooseEqual(unref(form).brand, "")) ? " selected" : ""}${_scopeId}>-- Pilih Merek --</option><!--[-->`);
            ssrRenderList(filteredBrands.value, (brand) => {
              _push2(`<option${ssrRenderAttr("value", brand)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).brand) ? ssrLooseContain(unref(form).brand, brand) : ssrLooseEqual(unref(form).brand, brand)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(brand)}</option>`);
            });
            _push2(`<!--]--><option value="Lainnya"${ssrIncludeBooleanAttr(Array.isArray(unref(form).brand) ? ssrLooseContain(unref(form).brand, "Lainnya") : ssrLooseEqual(unref(form).brand, "Lainnya")) ? " selected" : ""}${_scopeId}>Lainnya</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.brand
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "type",
              value: "Tipe / Model"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "type",
              modelValue: unref(form).type,
              "onUpdate:modelValue": ($event) => unref(form).type = $event,
              type: "text",
              class: "mt-1 block w-full h-11",
              required: "",
              placeholder: "Misal: iPhone 13"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.type
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm"${_scopeId}><h3 class="text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2"${_scopeId}><span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs"${_scopeId}>2</span> 2. Informasi Penjualan </h3><div class="space-y-6"${_scopeId}><div${_scopeId}>`);
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
              class: "mt-2",
              message: unref(form).errors.price
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div class="col-span-1 md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "condition",
              value: "Kondisi Barang"
            }, null, _parent2, _scopeId));
            _push2(`<select id="condition" class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm" required${_scopeId}><!--[-->`);
            ssrRenderList(unref(PRODUCT_CONDITIONS), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, item.value) : ssrLooseEqual(unref(form).condition, item.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.label)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.condition
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-4 bg-muted/50 p-4 rounded-2xl border border-border mt-2"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><input type="checkbox" id="is_cod"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_cod) ? ssrLooseContain(unref(form).is_cod, null) : unref(form).is_cod) ? " checked" : ""} class="rounded border-border text-primary focus:ring-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "is_cod",
              value: "Fitur COD",
              class: "!mb-0 cursor-pointer"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="w-px h-6 bg-border mx-2"${_scopeId}></div><div class="flex items-center gap-2"${_scopeId}><input type="checkbox" id="is_negotiable"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_negotiable) ? ssrLooseContain(unref(form).is_negotiable, null) : unref(form).is_negotiable) ? " checked" : ""} class="rounded border-border text-primary focus:ring-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "is_negotiable",
              value: "Bisa Nego",
              class: "!mb-0 cursor-pointer"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-span-1 md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "status",
              value: "Status Ketersediaan"
            }, null, _parent2, _scopeId));
            _push2(`<select id="status" class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm"${_scopeId}><option value="available"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "available") : ssrLooseEqual(unref(form).status, "available")) ? " selected" : ""}${_scopeId}>Tersedia (Available)</option><option value="sold"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "sold") : ssrLooseEqual(unref(form).status, "sold")) ? " selected" : ""}${_scopeId}>Terjual (Sold)</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.status
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: "Deskripsi Produk"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="description" rows="5" class="mt-1 block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all p-3 text-sm" required${ssrRenderAttr("placeholder", unref(form).condition === "Bekas Ada minus" || unref(form).condition === "Minus" ? "WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)..." : "Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail...")}${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="p-6 sm:p-8 rounded-3xl border border-border bg-primary/5 shadow-sm"${_scopeId}><h3 class="text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2"${_scopeId}><span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs"${_scopeId}>3</span> 3. Spesifikasi ${ssrInterpolate(__props.product.category.name)}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
            if (showField("smartphone,laptop,tablet")) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "spec_ram",
                value: "RAM"
              }, null, _parent2, _scopeId));
              _push2(`<select id="spec_ram" class="block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.ram) ? ssrLooseContain(unref(form).specifications.ram, "") : ssrLooseEqual(unref(form).specifications.ram, "")) ? " selected" : ""}${_scopeId}>Pilih RAM</option><!--[-->`);
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
              _push2(`<select id="spec_storage" class="block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.storage) ? ssrLooseContain(unref(form).specifications.storage, "") : ssrLooseEqual(unref(form).specifications.storage, "")) ? " selected" : ""}${_scopeId}>Pilih Kapasitas</option><!--[-->`);
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
              _push2(ssrRenderComponent(_sfc_main$3, {
                modelValue: unref(form).specifications.battery_health,
                "onUpdate:modelValue": ($event) => unref(form).specifications.battery_health = $event,
                type: "number",
                class: "block w-full mt-1 h-11",
                placeholder: "Misal: 85",
                min: "0",
                max: "100"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!categoryName.value.includes("smartphone")) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "spec_screen",
                value: "Ukuran Layar (Inch)"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                modelValue: unref(form).specifications.screen_size,
                "onUpdate:modelValue": ($event) => unref(form).specifications.screen_size = $event,
                type: "text",
                class: "block w-full mt-1 h-11",
                placeholder: "Misal: 14"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (categoryName.value.includes("laptop")) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "spec_processor",
                value: "Processor"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                modelValue: unref(form).specifications.processor,
                "onUpdate:modelValue": ($event) => unref(form).specifications.processor = $event,
                type: "text",
                class: "block w-full mt-1 h-11",
                placeholder: "Contoh: Intel Core i5 Gen 12"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (categoryName.value.includes("laptop")) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "spec_gpu",
                value: "VGA / GPU"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                modelValue: unref(form).specifications.gpu,
                "onUpdate:modelValue": ($event) => unref(form).specifications.gpu = $event,
                type: "text",
                class: "block w-full mt-1 h-11",
                placeholder: "Contoh: NVIDIA RTX 3050"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "spec_kelengkapan",
              value: "Kelengkapan"
            }, null, _parent2, _scopeId));
            _push2(`<select id="spec_kelengkapan" class="block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.kelengkapan) ? ssrLooseContain(unref(form).specifications.kelengkapan, "") : ssrLooseEqual(unref(form).specifications.kelengkapan, "")) ? " selected" : ""}${_scopeId}>-- Pilih Kelengkapan --</option><!--[-->`);
            ssrRenderList(unref(KELENGKAPAN_OPTIONS), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).specifications.kelengkapan) ? ssrLooseContain(unref(form).specifications.kelengkapan, item.value) : ssrLooseEqual(unref(form).specifications.kelengkapan, item.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.label)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div><div class="p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm"${_scopeId}><h3 class="text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2"${_scopeId}><span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs"${_scopeId}>4</span> 4. Media Foto </h3><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Foto Produk Saat Ini" }, null, _parent2, _scopeId));
            if (__props.product.images.length > 0) {
              _push2(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.images, (image) => {
                _push2(`<div class="${ssrRenderClass([{ "opacity-40 grayscale scale-95 border-destructive": isExistingDeleted(image.id) }, "relative group aspect-square rounded-2xl overflow-hidden border border-border shadow-sm transition-all"])}"${_scopeId}><img${ssrRenderAttr("src", "/storage/" + image.image_path)} class="h-full w-full object-cover transition-transform group-hover:scale-110"${_scopeId}><button type="button" class="${ssrRenderClass([isExistingDeleted(image.id) ? "bg-primary text-primary-foreground border-primary" : "bg-background/90 text-foreground border-border hover:bg-destructive hover:text-white", "absolute top-2 right-2 p-2 rounded-full shadow-lg border transition-all z-10"])}"${_scopeId}>`);
                if (!isExistingDeleted(image.id)) {
                  _push2(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span class="text-[10px] font-bold"${_scopeId}>CANCEL</span>`);
                }
                _push2(`</button>`);
                if (isExistingDeleted(image.id)) {
                  _push2(`<div class="absolute inset-0 bg-destructive/10 flex items-center justify-center pointer-events-none"${_scopeId}><span class="bg-destructive text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm"${_scopeId}>AKAN DIHAPUS</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<p class="text-sm text-muted-foreground mt-2 mb-8 italic"${_scopeId}>Belum ada foto yang di-upload.</p>`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "images",
              value: "Tambah Foto Baru (Opsional)",
              class: "mt-10 pt-6 border-t border-border"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 flex items-center justify-center w-full"${_scopeId}><label for="images" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-2xl cursor-pointer bg-background hover:bg-muted/50 transition-all group"${_scopeId}><div class="flex flex-col items-center justify-center pt-5 pb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ImagePlus), { class: "w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-muted-foreground"${_scopeId}><span class="font-bold text-primary"${_scopeId}>Klik untuk tambah foto baru</span></p></div><input id="images" type="file" class="hidden" multiple accept="image/*"${_scopeId}></label></div>`);
            if (imagePreviews.value.length > 0) {
              _push2(`<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20"${_scopeId}><!--[-->`);
              ssrRenderList(imagePreviews.value, (preview, index) => {
                _push2(`<div class="relative aspect-square rounded-xl overflow-hidden border border-border shadow-md bg-card group"${_scopeId}><img${ssrRenderAttr("src", preview.url)} class="w-full h-full object-cover"${_scopeId}><button type="button" class="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full hover:bg-destructive/80 shadow-lg z-10 transition-transform active:scale-95"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "w-3 h-3" }, null, _parent2, _scopeId));
                _push2(`</button></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.images
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex items-center gap-6 pt-6 border-t border-border mt-10"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              disabled: unref(form).processing,
              class: "h-12 px-8"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Simpan Perubahan `);
                } else {
                  return [
                    createTextVNode(" Simpan Perubahan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("dashboard"),
              class: "text-sm font-bold text-muted-foreground hover:text-foreground"
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
              createVNode(unref(Head), { title: "Edit Produk" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "p-4 sm:p-8 bg-card text-card-foreground shadow sm:rounded-2xl border border-border" }, [
                    createVNode("div", { class: "max-w-2xl mx-auto" }, [
                      createVNode("header", { class: "mb-8" }, [
                        createVNode("h2", { class: "text-2xl font-bold" }, "Edit Produk"),
                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Perbarui informasi harga, kondisi, atau detail spesifikasi gawai Anda.")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-8"
                      }, [
                        createVNode("div", { class: "p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm" }, [
                          createVNode("h3", { class: "text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2" }, [
                            createVNode("span", { class: "flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs" }, "1"),
                            createTextVNode(" 1. Identitas Produk ")
                          ]),
                          createVNode("div", { class: "space-y-6" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, { value: "Kategori" }),
                              createVNode(_sfc_main$3, {
                                value: __props.product.category.name,
                                class: "mt-1 block w-full bg-muted/50 cursor-not-allowed",
                                disabled: ""
                              }, null, 8, ["value"]),
                              createVNode("p", { class: "text-[10px] text-muted-foreground mt-1 italic flex items-center gap-1" }, [
                                createVNode(unref(Info), { class: "w-3 h-3" }),
                                createTextVNode(" Kategori tidak dapat diubah untuk menjaga konsistensi spesifikasi. ")
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "brand",
                                  value: "Merek / Brand"
                                }),
                                withDirectives(createVNode("select", {
                                  id: "brand",
                                  "onUpdate:modelValue": ($event) => unref(form).brand = $event,
                                  class: "mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all",
                                  required: ""
                                }, [
                                  createVNode("option", { value: "" }, "-- Pilih Merek --"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredBrands.value, (brand) => {
                                    return openBlock(), createBlock("option", {
                                      key: brand,
                                      value: brand
                                    }, toDisplayString(brand), 9, ["value"]);
                                  }), 128)),
                                  createVNode("option", { value: "Lainnya" }, "Lainnya")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(form).brand]
                                ]),
                                createVNode(_sfc_main$4, {
                                  class: "mt-2",
                                  message: unref(form).errors.brand
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "type",
                                  value: "Tipe / Model"
                                }),
                                createVNode(_sfc_main$3, {
                                  id: "type",
                                  modelValue: unref(form).type,
                                  "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                  type: "text",
                                  class: "mt-1 block w-full h-11",
                                  required: "",
                                  placeholder: "Misal: iPhone 13"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$4, {
                                  class: "mt-2",
                                  message: unref(form).errors.type
                                }, null, 8, ["message"])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm" }, [
                          createVNode("h3", { class: "text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2" }, [
                            createVNode("span", { class: "flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs" }, "2"),
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
                              createVNode(_sfc_main$4, {
                                class: "mt-2",
                                message: unref(form).errors.price
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                                createVNode(_sfc_main$2, {
                                  for: "condition",
                                  value: "Kondisi Barang"
                                }),
                                withDirectives(createVNode("select", {
                                  id: "condition",
                                  "onUpdate:modelValue": ($event) => unref(form).condition = $event,
                                  class: "mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm",
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
                                  class: "mt-2",
                                  message: unref(form).errors.condition
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "flex items-center gap-4 bg-muted/50 p-4 rounded-2xl border border-border mt-2" }, [
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
                                createVNode("div", { class: "w-px h-6 bg-border mx-2" }),
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
                              ]),
                              createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                                createVNode(_sfc_main$2, {
                                  for: "status",
                                  value: "Status Ketersediaan"
                                }),
                                withDirectives(createVNode("select", {
                                  id: "status",
                                  "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                  class: "mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm"
                                }, [
                                  createVNode("option", { value: "available" }, "Tersedia (Available)"),
                                  createVNode("option", { value: "sold" }, "Terjual (Sold)")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(form).status]
                                ]),
                                createVNode(_sfc_main$4, {
                                  class: "mt-2",
                                  message: unref(form).errors.status
                                }, null, 8, ["message"])
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
                                class: "mt-1 block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all p-3 text-sm",
                                required: "",
                                placeholder: unref(form).condition === "Bekas Ada minus" || unref(form).condition === "Minus" ? "WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)..." : "Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail..."
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, unref(form).description]
                              ]),
                              createVNode(_sfc_main$4, {
                                class: "mt-2",
                                message: unref(form).errors.description
                              }, null, 8, ["message"])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "p-6 sm:p-8 rounded-3xl border border-border bg-primary/5 shadow-sm" }, [
                          createVNode("h3", { class: "text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2" }, [
                            createVNode("span", { class: "flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs" }, "3"),
                            createTextVNode(" 3. Spesifikasi " + toDisplayString(__props.product.category.name), 1)
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            showField("smartphone,laptop,tablet") ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode(_sfc_main$2, {
                                for: "spec_ram",
                                value: "RAM"
                              }),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => unref(form).specifications.ram = $event,
                                id: "spec_ram",
                                class: "block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11"
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
                                class: "block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11"
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
                              createVNode(_sfc_main$3, {
                                modelValue: unref(form).specifications.battery_health,
                                "onUpdate:modelValue": ($event) => unref(form).specifications.battery_health = $event,
                                type: "number",
                                class: "block w-full mt-1 h-11",
                                placeholder: "Misal: 85",
                                min: "0",
                                max: "100"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])) : createCommentVNode("", true),
                            !categoryName.value.includes("smartphone") ? (openBlock(), createBlock("div", { key: 3 }, [
                              createVNode(_sfc_main$2, {
                                for: "spec_screen",
                                value: "Ukuran Layar (Inch)"
                              }),
                              createVNode(_sfc_main$3, {
                                modelValue: unref(form).specifications.screen_size,
                                "onUpdate:modelValue": ($event) => unref(form).specifications.screen_size = $event,
                                type: "text",
                                class: "block w-full mt-1 h-11",
                                placeholder: "Misal: 14"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])) : createCommentVNode("", true),
                            categoryName.value.includes("laptop") ? (openBlock(), createBlock("div", { key: 4 }, [
                              createVNode(_sfc_main$2, {
                                for: "spec_processor",
                                value: "Processor"
                              }),
                              createVNode(_sfc_main$3, {
                                modelValue: unref(form).specifications.processor,
                                "onUpdate:modelValue": ($event) => unref(form).specifications.processor = $event,
                                type: "text",
                                class: "block w-full mt-1 h-11",
                                placeholder: "Contoh: Intel Core i5 Gen 12"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])) : createCommentVNode("", true),
                            categoryName.value.includes("laptop") ? (openBlock(), createBlock("div", { key: 5 }, [
                              createVNode(_sfc_main$2, {
                                for: "spec_gpu",
                                value: "VGA / GPU"
                              }),
                              createVNode(_sfc_main$3, {
                                modelValue: unref(form).specifications.gpu,
                                "onUpdate:modelValue": ($event) => unref(form).specifications.gpu = $event,
                                type: "text",
                                class: "block w-full mt-1 h-11",
                                placeholder: "Contoh: NVIDIA RTX 3050"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])) : createCommentVNode("", true),
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, {
                                for: "spec_kelengkapan",
                                value: "Kelengkapan"
                              }),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => unref(form).specifications.kelengkapan = $event,
                                id: "spec_kelengkapan",
                                class: "block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11"
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
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm" }, [
                          createVNode("h3", { class: "text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2" }, [
                            createVNode("span", { class: "flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs" }, "4"),
                            createTextVNode(" 4. Media Foto ")
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, { value: "Foto Produk Saat Ini" }),
                            __props.product.images.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.product.images, (image) => {
                                return openBlock(), createBlock("div", {
                                  key: image.id,
                                  class: ["relative group aspect-square rounded-2xl overflow-hidden border border-border shadow-sm transition-all", { "opacity-40 grayscale scale-95 border-destructive": isExistingDeleted(image.id) }]
                                }, [
                                  createVNode("img", {
                                    src: "/storage/" + image.image_path,
                                    class: "h-full w-full object-cover transition-transform group-hover:scale-110"
                                  }, null, 8, ["src"]),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: ($event) => toggleDeleteExisting(image.id),
                                    class: ["absolute top-2 right-2 p-2 rounded-full shadow-lg border transition-all z-10", isExistingDeleted(image.id) ? "bg-primary text-primary-foreground border-primary" : "bg-background/90 text-foreground border-border hover:bg-destructive hover:text-white"]
                                  }, [
                                    !isExistingDeleted(image.id) ? (openBlock(), createBlock(unref(X), {
                                      key: 0,
                                      class: "w-4 h-4"
                                    })) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-[10px] font-bold"
                                    }, "CANCEL"))
                                  ], 10, ["onClick"]),
                                  isExistingDeleted(image.id) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "absolute inset-0 bg-destructive/10 flex items-center justify-center pointer-events-none"
                                  }, [
                                    createVNode("span", { class: "bg-destructive text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm" }, "AKAN DIHAPUS")
                                  ])) : createCommentVNode("", true)
                                ], 2);
                              }), 128))
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-muted-foreground mt-2 mb-8 italic"
                            }, "Belum ada foto yang di-upload.")),
                            createVNode(_sfc_main$2, {
                              for: "images",
                              value: "Tambah Foto Baru (Opsional)",
                              class: "mt-10 pt-6 border-t border-border"
                            }),
                            createVNode("div", { class: "mt-2 flex items-center justify-center w-full" }, [
                              createVNode("label", {
                                for: "images",
                                class: "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-2xl cursor-pointer bg-background hover:bg-muted/50 transition-all group"
                              }, [
                                createVNode("div", { class: "flex flex-col items-center justify-center pt-5 pb-6" }, [
                                  createVNode(unref(ImagePlus), { class: "w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" }),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, [
                                    createVNode("span", { class: "font-bold text-primary" }, "Klik untuk tambah foto baru")
                                  ])
                                ]),
                                createVNode("input", {
                                  id: "images",
                                  type: "file",
                                  onChange: handleFiles,
                                  class: "hidden",
                                  multiple: "",
                                  accept: "image/*"
                                }, null, 32)
                              ])
                            ]),
                            imagePreviews.value.length > 0 ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(imagePreviews.value, (preview, index) => {
                                return openBlock(), createBlock("div", {
                                  key: index,
                                  class: "relative aspect-square rounded-xl overflow-hidden border border-border shadow-md bg-card group"
                                }, [
                                  createVNode("img", {
                                    src: preview.url,
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"]),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: ($event) => removeNewFile(index),
                                    class: "absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full hover:bg-destructive/80 shadow-lg z-10 transition-transform active:scale-95"
                                  }, [
                                    createVNode(unref(X), { class: "w-3 h-3" })
                                  ], 8, ["onClick"])
                                ]);
                              }), 128))
                            ])) : createCommentVNode("", true),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.images
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center gap-6 pt-6 border-t border-border mt-10" }, [
                          createVNode(_sfc_main$6, {
                            disabled: unref(form).processing,
                            class: "h-12 px-8"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Simpan Perubahan ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(Link), {
                            href: _ctx.route("dashboard"),
                            class: "text-sm font-bold text-muted-foreground hover:text-foreground"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
