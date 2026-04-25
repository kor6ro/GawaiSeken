import { ref, watch, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Cropper } from "vue-advanced-cropper";
/* empty css               */
import { _ as _sfc_main$1 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$3 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$2 } from "./SecondaryButton-BWOt3jtr.js";
const _sfc_main = {
  __name: "ImageCropperModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    files: {
      type: Array,
      default: () => []
    }
  },
  emits: ["close", "cropped", "finished"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentIdx = ref(0);
    const cropperRef = ref(null);
    const currentImageUrl = ref("");
    const loadCurrentImage = () => {
      if (props.files && props.files[currentIdx.value]) {
        const file = props.files[currentIdx.value];
        const reader = new FileReader();
        reader.onload = (e) => {
          currentImageUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    watch(
      () => props.show,
      (newVal) => {
        if (newVal) {
          currentIdx.value = 0;
          loadCurrentImage();
        }
      }
    );
    watch(currentIdx, () => {
      loadCurrentImage();
    });
    const handleNext = () => {
      if (currentIdx.value < props.files.length - 1) {
        currentIdx.value++;
      } else {
        emit("finished");
        emit("close");
      }
    };
    const crop = () => {
      const { canvas } = cropperRef.value.getResult();
      if (canvas) {
        const maxDim = 1080;
        const tempCanvas = document.createElement("canvas");
        let width = canvas.width;
        let height = canvas.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height *= maxDim / width;
            width = maxDim;
          } else {
            width *= maxDim / height;
            height = maxDim;
          }
        }
        tempCanvas.width = width;
        tempCanvas.height = height;
        const ctx = tempCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0, width, height);
        tempCanvas.toBlob(
          (blob) => {
            if (blob) {
              emit("cropped", {
                blob,
                originalFile: props.files[currentIdx.value]
              });
              handleNext();
            }
          },
          "image/jpeg",
          0.8
        );
      }
    };
    const skip = () => {
      handleNext();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-bold"${_scopeId}> Sesuaikan Foto `);
            if (__props.files.length > 1) {
              _push2(`<span class="text-sm font-normal text-muted-foreground"${_scopeId}> (${ssrInterpolate(currentIdx.value + 1)} / ${ssrInterpolate(__props.files.length)}) </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</h3><p class="text-xs text-muted-foreground"${_scopeId}>Seret dan zoom untuk hasil 1:1</p></div><div class="overflow-hidden rounded-2xl border border-border bg-black/5 shadow-inner"${_scopeId}>`);
            if (currentImageUrl.value) {
              _push2(ssrRenderComponent(unref(Cropper), {
                ref_key: "cropperRef",
                ref: cropperRef,
                class: "h-[400px] w-full",
                src: currentImageUrl.value,
                "stencil-props": {
                  aspectRatio: 1 / 1
                },
                canvas: {
                  minHeight: 300,
                  minWidth: 300,
                  maxHeight: 2e3,
                  maxWidth: 2e3
                }
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<div class="flex h-[400px] items-center justify-center italic text-muted-foreground"${_scopeId}> Memuat gambar... </div>`);
            }
            _push2(`</div><div class="mt-8 flex items-center justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { onClick: skip }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(currentIdx.value < __props.files.length - 1 ? "Lewati" : "Batal")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(currentIdx.value < __props.files.length - 1 ? "Lewati" : "Batal"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              onClick: crop,
              class: "px-8"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(currentIdx.value < __props.files.length - 1 ? "Lanjut" : "Selesai & Simpan")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(currentIdx.value < __props.files.length - 1 ? "Lanjut" : "Selesai & Simpan"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                  createVNode("h3", { class: "text-lg font-bold" }, [
                    createTextVNode(" Sesuaikan Foto "),
                    __props.files.length > 1 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-sm font-normal text-muted-foreground"
                    }, " (" + toDisplayString(currentIdx.value + 1) + " / " + toDisplayString(__props.files.length) + ") ", 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Seret dan zoom untuk hasil 1:1")
                ]),
                createVNode("div", { class: "overflow-hidden rounded-2xl border border-border bg-black/5 shadow-inner" }, [
                  currentImageUrl.value ? (openBlock(), createBlock(unref(Cropper), {
                    key: 0,
                    ref_key: "cropperRef",
                    ref: cropperRef,
                    class: "h-[400px] w-full",
                    src: currentImageUrl.value,
                    "stencil-props": {
                      aspectRatio: 1 / 1
                    },
                    canvas: {
                      minHeight: 300,
                      minWidth: 300,
                      maxHeight: 2e3,
                      maxWidth: 2e3
                    }
                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex h-[400px] items-center justify-center italic text-muted-foreground"
                  }, " Memuat gambar... "))
                ]),
                createVNode("div", { class: "mt-8 flex items-center justify-end gap-3" }, [
                  createVNode(_sfc_main$2, { onClick: skip }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(currentIdx.value < __props.files.length - 1 ? "Lewati" : "Batal"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$3, {
                    onClick: crop,
                    class: "px-8"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(currentIdx.value < __props.files.length - 1 ? "Lanjut" : "Selesai & Simpan"), 1)
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ImageCropperModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
