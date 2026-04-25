import { ref, watch, computed, withCtx, unref, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderVNode, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$8 } from "./BackButton-DqmVU1VH.js";
import { Tag, Wrench, CircleDollarSign, Package, Camera, Check, Info, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { _ as _sfc_main$7 } from "./ImageCropperModal-BlmPKPCV.js";
import _sfc_main$2 from "./SpecsStep-CRyXc8zG.js";
import { g as getCategoryById, a as getFieldsByCategory, _ as _sfc_main$3 } from "./SalesStep-686x_mPS.js";
import _sfc_main$4 from "./KelengkapanStep-C5yCv2OY.js";
import _sfc_main$5 from "./EditMediaStep-COIoRgqk.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
import "vue-advanced-cropper";
/* empty css               */
import "./SecondaryButton-BWOt3jtr.js";
import "./InputLabel-D_lYO37a.js";
import "./TextInput-Cpy3OAqn.js";
import "./InputError-CAen27BF.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    product: Object,
    categories: Array
  },
  setup(__props) {
    var _a;
    const props = __props;
    const form = useForm({
      _method: "PUT",
      category_id: props.product.category_id,
      brand: props.product.brand,
      custom_brand: props.product.custom_brand || "",
      type: props.product.type,
      condition: props.product.condition,
      availability: props.product.availability,
      is_cod: !!props.product.is_cod,
      is_negotiable: !!props.product.is_negotiable,
      price: props.product.price,
      description: props.product.description,
      specifications: {
        ...props.product.specifications,
        kelengkapan: ((_a = props.product.specifications) == null ? void 0 : _a.kelengkapan) || []
      },
      images: [],
      delete_images: []
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
      if (currentStep.value > 1) currentStep.value--;
    };
    const goTo = (i) => {
      if (i > 0 && i <= maxReachedStep.value) currentStep.value = i;
    };
    const maxReachedStep = ref(1);
    watch(currentStep, (v) => {
      if (v > maxReachedStep.value) maxReachedStep.value = v;
    });
    const canGoNext = computed(() => {
      if (currentStep.value === 1) {
        const ok = !!form.brand && !!form.type;
        return form.brand === "Other" ? ok && !!form.custom_brand : ok;
      }
      if (currentStep.value === 2) return !!form.price && !!form.description;
      return true;
    });
    const currentCategory = computed(() => getCategoryById(form.category_id));
    const selectedCategoryName = computed(() => {
      var _a2;
      return ((_a2 = currentCategory.value) == null ? void 0 : _a2.label.toLowerCase()) || "";
    });
    const formSections = computed(() => {
      return getFieldsByCategory(form.category_id, {
        specifications: {
          sub_type: form.specifications.sub_type,
          connectivity: form.specifications.connectivity
        }
      });
    });
    const filteredBrands = computed(() => {
      var _a2;
      if (!currentCategory.value) return [];
      const subTypeKey = form.specifications.sub_type;
      const subType = (_a2 = currentCategory.value.sub_types) == null ? void 0 : _a2.find((st) => st.value === subTypeKey);
      return (subType == null ? void 0 : subType.brands) || currentCategory.value.brands || [];
    });
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
    const showCropper = ref(false);
    const pendingFiles = ref([]);
    const handleFiles = (event) => {
      const files = Array.from(event.target.files);
      const currentTotal = props.product.images.length - form.delete_images.length + form.images.length;
      const remaining = 10 - currentTotal;
      if (remaining <= 0) {
        alert("Maksimal 10 foto diperbolehkan.");
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
      imagePreviews.value.push({ url: URL.createObjectURL(blob), name: fileName });
    };
    const handleCropperFinished = () => {
      showCropper.value = false;
      pendingFiles.value = [];
    };
    const removeNewFile = (index) => {
      form.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };
    const toggleDeleteExisting = (id) => {
      const idx = form.delete_images.indexOf(id);
      if (idx > -1) form.delete_images.splice(idx, 1);
      else form.delete_images.push(id);
    };
    const isExistingDeleted = (id) => form.delete_images.includes(id);
    const submit = () => {
      form.post(route("products.update", props.product.slug), { forceFormData: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, { fallbackRoute: "dashboard" }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Edit Produk</h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(_sfc_main$8, { fallbackRoute: "dashboard" }),
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Edit Produk")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Edit Produk" }, null, _parent2, _scopeId));
            _push2(`<div class="py-8"${_scopeId}><div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"${_scopeId}><nav aria-label="Form steps" class="mb-8"${_scopeId}><ol class="flex items-center justify-between gap-1"${_scopeId}><!--[-->`);
            ssrRenderList(STEPS, (step, i) => {
              _push2(`<li class="flex flex-1 flex-col items-center gap-1.5"${_scopeId}><div class="flex w-full items-center"${_scopeId}><div class="${ssrRenderClass([i === 0 ? "invisible" : i <= currentStep.value ? "bg-primary" : "bg-border", "flex-1 h-px"])}"${_scopeId}></div><button type="button"${ssrIncludeBooleanAttr(i === 0 || i > maxReachedStep.value) ? " disabled" : ""} class="${ssrRenderClass([[
                i === currentStep.value ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30" : i < currentStep.value ? "border-primary bg-primary/10 text-primary cursor-pointer hover:bg-primary/20" : "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              ], "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all"])}"${_scopeId}>`);
              if (i < currentStep.value) {
                _push2(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              } else {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(step.icon), { class: "h-4 w-4" }, null), _parent2, _scopeId);
              }
              _push2(`</button><div class="${ssrRenderClass([i === STEPS.length - 1 ? "invisible" : i < currentStep.value ? "bg-primary" : "bg-border", "flex-1 h-px"])}"${_scopeId}></div></div><span class="${ssrRenderClass([i === currentStep.value ? "text-primary" : "text-muted-foreground", "text-[10px] font-semibold"])}"${_scopeId}>${ssrInterpolate(step.label)}</span></li>`);
            });
            _push2(`<!--]--></ol></nav><div class="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"${_scopeId}><div style="${ssrRenderStyle(currentStep.value === 0 ? null : { display: "none" })}"${_scopeId}><h3 class="mb-1 text-lg font-bold"${_scopeId}>Kategori Produk</h3><p class="mb-6 text-sm text-muted-foreground"${_scopeId}>Kategori tidak dapat diubah.</p><div class="rounded-xl border-2 border-primary bg-primary/10 p-4 text-sm font-bold text-primary"${_scopeId}>${ssrInterpolate(__props.product.category.name)}</div><p class="mt-4 flex items-center gap-2 text-xs italic text-muted-foreground"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "h-3 w-3" }, null, _parent2, _scopeId));
            _push2(` Kategori tetap untuk menjaga integritas spesifikasi. </p></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              style: currentStep.value === 1 ? null : { display: "none" },
              form: unref(form),
              "form-sections": formSections.value,
              "filtered-brands": filteredBrands.value,
              "current-category": currentCategory.value,
              "selected-category-name": selectedCategoryName.value,
              onOpenGsmSearch: openGsmSearch
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              style: currentStep.value === 2 ? null : { display: "none" },
              form: unref(form)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              style: currentStep.value === 3 ? null : { display: "none" },
              form: unref(form),
              "current-category": currentCategory.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              style: currentStep.value === 4 ? null : { display: "none" },
              product: __props.product,
              form: unref(form),
              "image-previews": imagePreviews.value,
              "is-existing-deleted": isExistingDeleted,
              onHandleFiles: handleFiles,
              onRemoveNewFile: removeNewFile,
              onToggleDeleteExisting: toggleDeleteExisting
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-8 flex items-center justify-between border-t border-border pt-5"${_scopeId}>`);
            if (currentStep.value > 1) {
              _push2(`<button type="button" class="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-5 py-2.5 text-sm font-semibold transition-all hover:bg-muted"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Sebelumnya </button>`);
            } else {
              _push2(`<div${_scopeId}></div>`);
            }
            _push2(`<div class="flex items-center gap-3"${_scopeId}><span class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(currentStep.value + 1)} / ${ssrInterpolate(STEPS.length)}</span>`);
            if (currentStep.value < STEPS.length - 1) {
              _push2(`<button type="button"${ssrIncludeBooleanAttr(!canGoNext.value) ? " disabled" : ""} class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"${_scopeId}> Selanjutnya `);
              _push2(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(ssrRenderComponent(_sfc_main$6, {
                disabled: unref(form).processing,
                onClick: submit
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
              onClose: ($event) => showCropper.value = false,
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
                              ]]
                            }, [
                              i < currentStep.value ? (openBlock(), createBlock(unref(Check), {
                                key: 0,
                                class: "h-4 w-4"
                              })) : (openBlock(), createBlock(resolveDynamicComponent(step.icon), {
                                key: 1,
                                class: "h-4 w-4"
                              }))
                            ], 10, ["onClick", "disabled"]),
                            createVNode("div", {
                              class: ["flex-1 h-px", i === STEPS.length - 1 ? "invisible" : i < currentStep.value ? "bg-primary" : "bg-border"]
                            }, null, 2)
                          ]),
                          createVNode("span", {
                            class: ["text-[10px] font-semibold", i === currentStep.value ? "text-primary" : "text-muted-foreground"]
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
                    withDirectives(createVNode(_sfc_main$2, {
                      form: unref(form),
                      "form-sections": formSections.value,
                      "filtered-brands": filteredBrands.value,
                      "current-category": currentCategory.value,
                      "selected-category-name": selectedCategoryName.value,
                      onOpenGsmSearch: openGsmSearch
                    }, null, 8, ["form", "form-sections", "filtered-brands", "current-category", "selected-category-name"]), [
                      [vShow, currentStep.value === 1]
                    ]),
                    withDirectives(createVNode(_sfc_main$3, { form: unref(form) }, null, 8, ["form"]), [
                      [vShow, currentStep.value === 2]
                    ]),
                    withDirectives(createVNode(_sfc_main$4, {
                      form: unref(form),
                      "current-category": currentCategory.value
                    }, null, 8, ["form", "current-category"]), [
                      [vShow, currentStep.value === 3]
                    ]),
                    withDirectives(createVNode(_sfc_main$5, {
                      product: __props.product,
                      form: unref(form),
                      "image-previews": imagePreviews.value,
                      "is-existing-deleted": isExistingDeleted,
                      onHandleFiles: handleFiles,
                      onRemoveNewFile: removeNewFile,
                      onToggleDeleteExisting: toggleDeleteExisting
                    }, null, 8, ["product", "form", "image-previews"]), [
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
                      ])) : (openBlock(), createBlock("div", { key: 1 })),
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(currentStep.value + 1) + " / " + toDisplayString(STEPS.length), 1),
                        currentStep.value < STEPS.length - 1 ? (openBlock(), createBlock("button", {
                          key: 0,
                          type: "button",
                          onClick: goNext,
                          disabled: !canGoNext.value,
                          class: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"
                        }, [
                          createTextVNode(" Selanjutnya "),
                          createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                        ], 8, ["disabled"])) : (openBlock(), createBlock(_sfc_main$6, {
                          key: 1,
                          disabled: unref(form).processing,
                          onClick: submit
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
                onClose: ($event) => showCropper.value = false,
                onCropped: handleCropped,
                onFinished: handleCropperFinished
              }, null, 8, ["show", "files", "onClose"])
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
