import { ref, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-BDlcmPtd.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./InputError-DDbcJ_iI.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-Chd5xZL9.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lucide-vue-next";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./onlineState-BAtS9nBF.js";
const _sfc_main = {
  __name: "VerifySeller",
  __ssrInlineRender: true,
  props: {
    verification: {
      type: Object
    }
  },
  setup(__props) {
    const form = useForm({
      ktp_image: null,
      face_image: null
    });
    const ktpPreview = ref(null);
    const facePreview = ref(null);
    const handleKtpChange = (e) => {
      const file = e.target.files[0];
      form.ktp_image = file;
      if (file) {
        ktpPreview.value = URL.createObjectURL(file);
      }
    };
    const handleFaceChange = (e) => {
      const file = e.target.files[0];
      form.face_image = file;
      if (file) {
        facePreview.value = URL.createObjectURL(file);
      }
    };
    const submit = () => {
      form.post(route("seller.verification.store"), {
        forceFormData: true,
        onSuccess: () => {
          form.reset();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Verifikasi Seller" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Verifikasi Seller (KYC)</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Verifikasi Seller (KYC)")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-card border border-border shadow sm:rounded-2xl"${_scopeId}><div class="p-6"${_scopeId}>`);
            if (__props.verification) {
              _push2(`<div class="mb-6"${_scopeId}>`);
              if (__props.verification.status === "pending") {
                _push2(`<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"${_scopeId}><p class="font-bold"${_scopeId}>Verifikasi Sedang Diproses</p><p${_scopeId}>Dokumen Anda telah kami terima dan sedang dalam tahap peninjauan oleh tim admin.</p></div>`);
              } else if (__props.verification.status === "approved") {
                _push2(`<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"${_scopeId}><p class="font-bold"${_scopeId}>Verifikasi Disetujui</p><p${_scopeId}>Selamat! Akun Anda telah terverifikasi sebagai seller.</p></div>`);
              } else if (__props.verification.status === "rejected") {
                _push2(`<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"${_scopeId}><p class="font-bold"${_scopeId}>Verifikasi Ditolak</p><p${_scopeId}>${ssrInterpolate(__props.verification.rejection_note)}</p><p class="mt-2"${_scopeId}>Silakan unggah kembali dokumen yang valid.</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<header class="mb-6"${_scopeId}><h3 class="text-lg font-medium"${_scopeId}>Unggah Dokumen</h3><p class="text-sm text-muted-foreground"${_scopeId}> Mohon unggah foto KTP dan foto wajah Anda untuk memverifikasi identitas sebagai seller. </p></header><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "ktp_image",
              value: "Foto KTP"
            }, null, _parent2, _scopeId));
            _push2(`<input type="file" id="ktp_image" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" accept="image/*"${_scopeId}>`);
            if (ktpPreview.value) {
              _push2(`<div class="mt-2"${_scopeId}><img${ssrRenderAttr("src", ktpPreview.value)} class="h-40 w-auto rounded-lg shadow-md"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.ktp_image
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "face_image",
              value: "Foto Wajah (Selfie)"
            }, null, _parent2, _scopeId));
            _push2(`<input type="file" id="face_image" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" accept="image/*"${_scopeId}>`);
            if (facePreview.value) {
              _push2(`<div class="mt-2"${_scopeId}><img${ssrRenderAttr("src", facePreview.value)} class="h-40 w-auto rounded-lg shadow-md"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.face_image
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Unggah Dokumen Verifikasi `);
                } else {
                  return [
                    createTextVNode(" Unggah Dokumen Verifikasi ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(form).recentlySuccessful) {
              _push2(`<p class="text-sm text-green-600 font-bold"${_scopeId}> Tersimpan. </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-card border border-border shadow sm:rounded-2xl" }, [
                    createVNode("div", { class: "p-6" }, [
                      __props.verification ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-6"
                      }, [
                        __props.verification.status === "pending" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
                        }, [
                          createVNode("p", { class: "font-bold" }, "Verifikasi Sedang Diproses"),
                          createVNode("p", null, "Dokumen Anda telah kami terima dan sedang dalam tahap peninjauan oleh tim admin.")
                        ])) : __props.verification.status === "approved" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
                        }, [
                          createVNode("p", { class: "font-bold" }, "Verifikasi Disetujui"),
                          createVNode("p", null, "Selamat! Akun Anda telah terverifikasi sebagai seller.")
                        ])) : __props.verification.status === "rejected" ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                        }, [
                          createVNode("p", { class: "font-bold" }, "Verifikasi Ditolak"),
                          createVNode("p", null, toDisplayString(__props.verification.rejection_note), 1),
                          createVNode("p", { class: "mt-2" }, "Silakan unggah kembali dokumen yang valid.")
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("header", { class: "mb-6" }, [
                        createVNode("h3", { class: "text-lg font-medium" }, "Unggah Dokumen"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Mohon unggah foto KTP dan foto wajah Anda untuk memverifikasi identitas sebagai seller. ")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "ktp_image",
                            value: "Foto KTP"
                          }),
                          createVNode("input", {
                            type: "file",
                            id: "ktp_image",
                            class: "mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90",
                            onChange: handleKtpChange,
                            accept: "image/*"
                          }, null, 32),
                          ktpPreview.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2"
                          }, [
                            createVNode("img", {
                              src: ktpPreview.value,
                              class: "h-40 w-auto rounded-lg shadow-md"
                            }, null, 8, ["src"])
                          ])) : createCommentVNode("", true),
                          createVNode(_sfc_main$3, {
                            class: "mt-2",
                            message: unref(form).errors.ktp_image
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "face_image",
                            value: "Foto Wajah (Selfie)"
                          }),
                          createVNode("input", {
                            type: "file",
                            id: "face_image",
                            class: "mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90",
                            onChange: handleFaceChange,
                            accept: "image/*"
                          }, null, 32),
                          facePreview.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2"
                          }, [
                            createVNode("img", {
                              src: facePreview.value,
                              class: "h-40 w-auto rounded-lg shadow-md"
                            }, null, 8, ["src"])
                          ])) : createCommentVNode("", true),
                          createVNode(_sfc_main$3, {
                            class: "mt-2",
                            message: unref(form).errors.face_image
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(_sfc_main$4, {
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Unggah Dokumen Verifikasi ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(Transition, {
                            "enter-from-class": "opacity-0",
                            "leave-to-class": "opacity-0",
                            class: "transition ease-in-out"
                          }, {
                            default: withCtx(() => [
                              unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-green-600 font-bold"
                              }, " Tersimpan. ")) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/VerifySeller.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
