import { ref, mergeProps, withCtx, unref, createTextVNode, createBlock, createCommentVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, vModelSelect, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./InputError-DDbcJ_iI.js";
import { _ as _sfc_main$5 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$4 } from "./SecondaryButton-BWOt3jtr.js";
import { AlertTriangle, X, Upload } from "lucide-vue-next";
const _sfc_main = {
  __name: "DisputeForm",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    transaction: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      reason: "",
      description: "",
      evidence_images: []
    });
    const imagePreviews = ref([]);
    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;
      files.forEach((file) => {
        form.evidence_images.push(file);
        const reader = new FileReader();
        reader.onload = (e2) => {
          imagePreviews.value.push(e2.target.result);
        };
        reader.readAsDataURL(file);
      });
    };
    const removeImage = (index) => {
      form.evidence_images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };
    const submit = () => {
      form.post(route("transactions.dispute", props.transaction.id), {
        onSuccess: () => {
          form.reset();
          imagePreviews.value = [];
          emit("close");
        }
      });
    };
    const closeModal = () => {
      form.reset();
      imagePreviews.value = [];
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: closeModal,
        maxWidth: "2xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="flex items-center gap-3 mb-6"${_scopeId}><div class="p-2 rounded-full bg-amber-100 text-amber-600"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h2 class="text-xl font-bold text-foreground"${_scopeId}>Ajukan Komplain Pesanan</h2><p class="text-sm text-muted-foreground"${_scopeId}>Transaksi #${ssrInterpolate((_a = __props.transaction) == null ? void 0 : _a.reference_number)}</p></div></div><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "reason",
              value: "Alasan Komplain"
            }, null, _parent2, _scopeId));
            _push2(`<select id="reason" class="mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).reason) ? ssrLooseContain(unref(form).reason, "") : ssrLooseEqual(unref(form).reason, "")) ? " selected" : ""}${_scopeId}>Pilih alasan...</option><option value="not_delivered"${ssrIncludeBooleanAttr(Array.isArray(unref(form).reason) ? ssrLooseContain(unref(form).reason, "not_delivered") : ssrLooseEqual(unref(form).reason, "not_delivered")) ? " selected" : ""}${_scopeId}>Barang Belum Sampai</option><option value="not_as_described"${ssrIncludeBooleanAttr(Array.isArray(unref(form).reason) ? ssrLooseContain(unref(form).reason, "not_as_described") : ssrLooseEqual(unref(form).reason, "not_as_described")) ? " selected" : ""}${_scopeId}>Barang Tidak Sesuai Deskripsi</option><option value="damaged"${ssrIncludeBooleanAttr(Array.isArray(unref(form).reason) ? ssrLooseContain(unref(form).reason, "damaged") : ssrLooseEqual(unref(form).reason, "damaged")) ? " selected" : ""}${_scopeId}>Barang Rusak / Cacat</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).reason) ? ssrLooseContain(unref(form).reason, "other") : ssrLooseEqual(unref(form).reason, "other")) ? " selected" : ""}${_scopeId}>Alasan Lainnya</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.reason,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: "Deskripsi Masalah"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="description" rows="4" class="mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary" placeholder="Jelaskan secara detail masalah yang Anda hadapi..." required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.description,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Foto Bukti (Minimal 1)" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(imagePreviews.value, (preview, index) => {
              _push2(`<div class="relative aspect-square rounded-xl border border-border bg-muted overflow-hidden group"${_scopeId}><img${ssrRenderAttr("src", preview)} class="h-full w-full object-cover"${_scopeId}><button class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              _push2(`</button></div>`);
            });
            _push2(`<!--]-->`);
            if (imagePreviews.value.length < 4) {
              _push2(`<label class="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Upload), { class: "h-6 w-6 text-muted-foreground mb-1" }, null, _parent2, _scopeId));
              _push2(`<span class="text-[10px] font-bold text-muted-foreground uppercase"${_scopeId}>Upload</span><input type="file" multiple accept="image/*" class="hidden"${_scopeId}></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="mt-2 text-xs text-muted-foreground"${_scopeId}>Lampirkan foto label pengiriman atau kondisi barang yang rusak.</p>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.evidence_images,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end gap-3 pt-4 border-t border-border"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              onClick: closeModal,
              type: "button"
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
            _push2(ssrRenderComponent(_sfc_main$5, {
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(`<span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"${_scopeId2}></span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Kirim Komplain `);
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Kirim Komplain ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "flex items-center gap-3 mb-6" }, [
                  createVNode("div", { class: "p-2 rounded-full bg-amber-100 text-amber-600" }, [
                    createVNode(unref(AlertTriangle), { class: "h-6 w-6" })
                  ]),
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-bold text-foreground" }, "Ajukan Komplain Pesanan"),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, "Transaksi #" + toDisplayString((_b = __props.transaction) == null ? void 0 : _b.reference_number), 1)
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$2, {
                      for: "reason",
                      value: "Alasan Komplain"
                    }),
                    withDirectives(createVNode("select", {
                      id: "reason",
                      "onUpdate:modelValue": ($event) => unref(form).reason = $event,
                      class: "mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary",
                      required: ""
                    }, [
                      createVNode("option", {
                        value: "",
                        disabled: ""
                      }, "Pilih alasan..."),
                      createVNode("option", { value: "not_delivered" }, "Barang Belum Sampai"),
                      createVNode("option", { value: "not_as_described" }, "Barang Tidak Sesuai Deskripsi"),
                      createVNode("option", { value: "damaged" }, "Barang Rusak / Cacat"),
                      createVNode("option", { value: "other" }, "Alasan Lainnya")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, unref(form).reason]
                    ]),
                    createVNode(_sfc_main$3, {
                      message: unref(form).errors.reason,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$2, {
                      for: "description",
                      value: "Deskripsi Masalah"
                    }),
                    withDirectives(createVNode("textarea", {
                      id: "description",
                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                      rows: "4",
                      class: "mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary",
                      placeholder: "Jelaskan secara detail masalah yang Anda hadapi...",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).description]
                    ]),
                    createVNode(_sfc_main$3, {
                      message: unref(form).errors.description,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$2, { value: "Foto Bukti (Minimal 1)" }),
                    createVNode("div", { class: "mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(imagePreviews.value, (preview, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "relative aspect-square rounded-xl border border-border bg-muted overflow-hidden group"
                        }, [
                          createVNode("img", {
                            src: preview,
                            class: "h-full w-full object-cover"
                          }, null, 8, ["src"]),
                          createVNode("button", {
                            onClick: withModifiers(($event) => removeImage(index), ["prevent"]),
                            class: "absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          }, [
                            createVNode(unref(X), { class: "h-3 w-3" })
                          ], 8, ["onClick"])
                        ]);
                      }), 128)),
                      imagePreviews.value.length < 4 ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors"
                      }, [
                        createVNode(unref(Upload), { class: "h-6 w-6 text-muted-foreground mb-1" }),
                        createVNode("span", { class: "text-[10px] font-bold text-muted-foreground uppercase" }, "Upload"),
                        createVNode("input", {
                          type: "file",
                          multiple: "",
                          accept: "image/*",
                          class: "hidden",
                          onChange: handleImageUpload
                        }, null, 32)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("p", { class: "mt-2 text-xs text-muted-foreground" }, "Lampirkan foto label pengiriman atau kondisi barang yang rusak."),
                    createVNode(_sfc_main$3, {
                      message: unref(form).errors.evidence_images,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "flex items-center justify-end gap-3 pt-4 border-t border-border" }, [
                    createVNode(_sfc_main$4, {
                      onClick: closeModal,
                      type: "button"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Batal")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$5, {
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        unref(form).processing ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        })) : createCommentVNode("", true),
                        createTextVNode(" Kirim Komplain ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/DisputeForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
