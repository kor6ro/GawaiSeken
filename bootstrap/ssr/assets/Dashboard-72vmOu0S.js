import { ref, resolveComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-BDlcmPtd.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$4 } from "./SecondaryButton-BWOt3jtr.js";
import { _ as _sfc_main$5 } from "./DangerButton-Dpx20QNz.js";
import { _ as _sfc_main$2 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$7 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$6, a as _sfc_main$8 } from "./InputError-DDbcJ_iI.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lucide-vue-next";
import "lodash/debounce.js";
import "lodash/pickBy.js";
import "./onlineState-BAtS9nBF.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    pendingVerifications: {
      type: Array,
      default: () => []
    },
    pendingProductsCount: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const selectedVerification = ref(null);
    const isRejectModalOpen = ref(false);
    const form = useForm({
      rejection_note: ""
    });
    const openReview = (verification) => {
      selectedVerification.value = verification;
    };
    const closeReview = () => {
      selectedVerification.value = null;
    };
    const approve = (verification) => {
      if (confirm("Apakah Anda yakin ingin menyetujui verifikasi ini?")) {
        useForm({}).post(route("admin.verifications.approve", verification.id), {
          onSuccess: () => closeReview()
        });
      }
    };
    const openRejectModal = () => {
      isRejectModalOpen.value = true;
    };
    const closeRejectModal = () => {
      isRejectModalOpen.value = false;
      form.reset();
    };
    const reject = () => {
      form.post(route("admin.verifications.reject", selectedVerification.value.id), {
        onSuccess: () => {
          closeRejectModal();
          closeReview();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Admin Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}> Admin Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, " Admin Dashboard ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"${_scopeId}><div class="rounded-2xl border border-border bg-card p-6 shadow-sm"${_scopeId}><h3 class="text-sm font-medium text-muted-foreground"${_scopeId}>Menunggu Verifikasi Seller</h3><p class="mt-2 text-3xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(__props.pendingVerifications.length)}</p></div>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("admin.products.index", { status: "pending" }),
              class: "rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-sm font-medium text-muted-foreground"${_scopeId2}>Produk Menunggu Moderasi</h3><p class="mt-2 text-3xl font-bold text-foreground"${_scopeId2}>${ssrInterpolate(__props.pendingProductsCount)}</p>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-sm font-medium text-muted-foreground" }, "Produk Menunggu Moderasi"),
                    createVNode("p", { class: "mt-2 text-3xl font-bold text-foreground" }, toDisplayString(__props.pendingProductsCount), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("admin.disputes.index"),
              class: "rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-red-500 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-sm font-medium text-muted-foreground"${_scopeId2}>Komplain Transaksi</h3><p class="mt-2 text-3xl font-bold text-red-500"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.pendingDisputesCount || 0)}</p>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-sm font-medium text-muted-foreground" }, "Komplain Transaksi"),
                    createVNode("p", { class: "mt-2 text-3xl font-bold text-red-500" }, toDisplayString(_ctx.$page.props.pendingDisputesCount || 0), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="overflow-hidden bg-card border border-border shadow sm:rounded-2xl"${_scopeId}><div class="p-6"${_scopeId}><h3 class="mb-4 text-lg font-bold text-foreground"${_scopeId}>Daftar Pengajuan Verifikasi Seller</h3><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left text-sm text-foreground"${_scopeId}><thead class="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>User</th><th class="px-6 py-4"${_scopeId}>Email</th><th class="px-6 py-4"${_scopeId}>Tanggal Pengajuan</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-border"${_scopeId}><!--[-->`);
            ssrRenderList(__props.pendingVerifications, (verification) => {
              _push2(`<tr class="hover:bg-muted/50 transition-colors"${_scopeId}><td class="px-6 py-4 font-medium"${_scopeId}>${ssrInterpolate(verification.user.name)}</td><td class="px-6 py-4 text-muted-foreground"${_scopeId}>${ssrInterpolate(verification.user.email)}</td><td class="px-6 py-4 text-muted-foreground"${_scopeId}>${ssrInterpolate(new Date(verification.created_at).toLocaleDateString("id-ID"))}</td><td class="px-6 py-4 text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                onClick: ($event) => openReview(verification)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Review KYC`);
                  } else {
                    return [
                      createTextVNode("Review KYC")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.pendingVerifications.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-6 py-8 text-center text-muted-foreground italic"${_scopeId}> Tidak ada pengajuan verifikasi yang sedang menunggu. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: !!selectedVerification.value,
              onClose: closeReview,
              maxWidth: "2xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
                if (_push3) {
                  _push3(`<div class="p-6"${_scopeId2}><header class="mb-6"${_scopeId2}><h2 class="text-xl font-bold text-foreground"${_scopeId2}> Review Verifikasi: ${ssrInterpolate((_a = selectedVerification.value) == null ? void 0 : _a.user.name)}</h2><p class="text-sm text-muted-foreground"${_scopeId2}>Silakan periksa dokumen berikut dengan teliti.</p></header><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId2}><div class="space-y-2"${_scopeId2}><h4 class="text-sm font-semibold text-foreground uppercase tracking-wider"${_scopeId2}>Foto KTP</h4><div class="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted"${_scopeId2}><img${ssrRenderAttr("src", "/storage/" + ((_b = selectedVerification.value) == null ? void 0 : _b.ktp_image_path))} class="absolute inset-0 h-full w-full object-cover"${_scopeId2}><a${ssrRenderAttr("href", "/storage/" + ((_c = selectedVerification.value) == null ? void 0 : _c.ktp_image_path))} target="_blank" class="absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"${_scopeId2}> Buka Fullsize </a></div></div><div class="space-y-2"${_scopeId2}><h4 class="text-sm font-semibold text-foreground uppercase tracking-wider"${_scopeId2}>Foto Wajah</h4><div class="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted"${_scopeId2}><img${ssrRenderAttr("src", "/storage/" + ((_d = selectedVerification.value) == null ? void 0 : _d.face_image_path))} class="absolute inset-0 h-full w-full object-cover"${_scopeId2}><a${ssrRenderAttr("href", "/storage/" + ((_e = selectedVerification.value) == null ? void 0 : _e.face_image_path))} target="_blank" class="absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"${_scopeId2}> Buka Fullsize </a></div></div></div><div class="mt-8 flex justify-end gap-3 border-t border-border pt-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, { onClick: closeReview }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tutup`);
                      } else {
                        return [
                          createTextVNode("Tutup")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, { onClick: openRejectModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tolak`);
                      } else {
                        return [
                          createTextVNode("Tolak")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    onClick: ($event) => approve(selectedVerification.value)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Setujui Verifikasi`);
                      } else {
                        return [
                          createTextVNode("Setujui Verifikasi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("header", { class: "mb-6" }, [
                        createVNode("h2", { class: "text-xl font-bold text-foreground" }, " Review Verifikasi: " + toDisplayString((_f = selectedVerification.value) == null ? void 0 : _f.user.name), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Silakan periksa dokumen berikut dengan teliti.")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground uppercase tracking-wider" }, "Foto KTP"),
                          createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" }, [
                            createVNode("img", {
                              src: "/storage/" + ((_g = selectedVerification.value) == null ? void 0 : _g.ktp_image_path),
                              class: "absolute inset-0 h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("a", {
                              href: "/storage/" + ((_h = selectedVerification.value) == null ? void 0 : _h.ktp_image_path),
                              target: "_blank",
                              class: "absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                            }, " Buka Fullsize ", 8, ["href"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground uppercase tracking-wider" }, "Foto Wajah"),
                          createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" }, [
                            createVNode("img", {
                              src: "/storage/" + ((_i = selectedVerification.value) == null ? void 0 : _i.face_image_path),
                              class: "absolute inset-0 h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("a", {
                              href: "/storage/" + ((_j = selectedVerification.value) == null ? void 0 : _j.face_image_path),
                              target: "_blank",
                              class: "absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                            }, " Buka Fullsize ", 8, ["href"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3 border-t border-border pt-6" }, [
                        createVNode(_sfc_main$4, { onClick: closeReview }, {
                          default: withCtx(() => [
                            createTextVNode("Tutup")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$5, { onClick: openRejectModal }, {
                          default: withCtx(() => [
                            createTextVNode("Tolak")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, {
                          onClick: ($event) => approve(selectedVerification.value)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Setujui Verifikasi")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: isRejectModalOpen.value,
              onClose: closeRejectModal,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6"${_scopeId2}><h2 class="text-lg font-bold text-foreground"${_scopeId2}> Konfirmasi Penolakan </h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId2}> Berikan alasan mengapa pengajuan verifikasi ini ditolak agar user dapat memperbaikinya. </p><div class="mt-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    for: "rejection_note",
                    value: "Alasan Penolakan"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    id: "rejection_note",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).rejection_note,
                    "onUpdate:modelValue": ($event) => unref(form).rejection_note = $event,
                    placeholder: "Contoh: Foto KTP buram atau tidak sesuai.",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    class: "mt-2",
                    message: unref(form).errors.rejection_note
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-8 flex justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, { onClick: closeRejectModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Batal`);
                      } else {
                        return [
                          createTextVNode("Batal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    onClick: reject,
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Tolak Sekarang `);
                      } else {
                        return [
                          createTextVNode(" Tolak Sekarang ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-lg font-bold text-foreground" }, " Konfirmasi Penolakan "),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Berikan alasan mengapa pengajuan verifikasi ini ditolak agar user dapat memperbaikinya. "),
                      createVNode("div", { class: "mt-6" }, [
                        createVNode(_sfc_main$6, {
                          for: "rejection_note",
                          value: "Alasan Penolakan"
                        }),
                        createVNode(_sfc_main$7, {
                          id: "rejection_note",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).rejection_note,
                          "onUpdate:modelValue": ($event) => unref(form).rejection_note = $event,
                          placeholder: "Contoh: Foto KTP buram atau tidak sesuai.",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$8, {
                          class: "mt-2",
                          message: unref(form).errors.rejection_note
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                        createVNode(_sfc_main$4, { onClick: closeRejectModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$5, {
                          onClick: reject,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tolak Sekarang ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3" }, [
                    createVNode("div", { class: "rounded-2xl border border-border bg-card p-6 shadow-sm" }, [
                      createVNode("h3", { class: "text-sm font-medium text-muted-foreground" }, "Menunggu Verifikasi Seller"),
                      createVNode("p", { class: "mt-2 text-3xl font-bold text-foreground" }, toDisplayString(__props.pendingVerifications.length), 1)
                    ]),
                    createVNode(_component_Link, {
                      href: _ctx.route("admin.products.index", { status: "pending" }),
                      class: "rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary transition-colors"
                    }, {
                      default: withCtx(() => [
                        createVNode("h3", { class: "text-sm font-medium text-muted-foreground" }, "Produk Menunggu Moderasi"),
                        createVNode("p", { class: "mt-2 text-3xl font-bold text-foreground" }, toDisplayString(__props.pendingProductsCount), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(_component_Link, {
                      href: _ctx.route("admin.disputes.index"),
                      class: "rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-red-500 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createVNode("h3", { class: "text-sm font-medium text-muted-foreground" }, "Komplain Transaksi"),
                        createVNode("p", { class: "mt-2 text-3xl font-bold text-red-500" }, toDisplayString(_ctx.$page.props.pendingDisputesCount || 0), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "overflow-hidden bg-card border border-border shadow sm:rounded-2xl" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "mb-4 text-lg font-bold text-foreground" }, "Daftar Pengajuan Verifikasi Seller"),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full text-left text-sm text-foreground" }, [
                          createVNode("thead", { class: "border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-4" }, "User"),
                              createVNode("th", { class: "px-6 py-4" }, "Email"),
                              createVNode("th", { class: "px-6 py-4" }, "Tanggal Pengajuan"),
                              createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-border" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.pendingVerifications, (verification) => {
                              return openBlock(), createBlock("tr", {
                                key: verification.id,
                                class: "hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("td", { class: "px-6 py-4 font-medium" }, toDisplayString(verification.user.name), 1),
                                createVNode("td", { class: "px-6 py-4 text-muted-foreground" }, toDisplayString(verification.user.email), 1),
                                createVNode("td", { class: "px-6 py-4 text-muted-foreground" }, toDisplayString(new Date(verification.created_at).toLocaleDateString("id-ID")), 1),
                                createVNode("td", { class: "px-6 py-4 text-right" }, [
                                  createVNode(_sfc_main$2, {
                                    onClick: ($event) => openReview(verification)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Review KYC")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ]);
                            }), 128)),
                            __props.pendingVerifications.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "4",
                                class: "px-6 py-8 text-center text-muted-foreground italic"
                              }, " Tidak ada pengajuan verifikasi yang sedang menunggu. ")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$3, {
                show: !!selectedVerification.value,
                onClose: closeReview,
                maxWidth: "2xl"
              }, {
                default: withCtx(() => {
                  var _a, _b, _c, _d, _e;
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("header", { class: "mb-6" }, [
                        createVNode("h2", { class: "text-xl font-bold text-foreground" }, " Review Verifikasi: " + toDisplayString((_a = selectedVerification.value) == null ? void 0 : _a.user.name), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Silakan periksa dokumen berikut dengan teliti.")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground uppercase tracking-wider" }, "Foto KTP"),
                          createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" }, [
                            createVNode("img", {
                              src: "/storage/" + ((_b = selectedVerification.value) == null ? void 0 : _b.ktp_image_path),
                              class: "absolute inset-0 h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("a", {
                              href: "/storage/" + ((_c = selectedVerification.value) == null ? void 0 : _c.ktp_image_path),
                              target: "_blank",
                              class: "absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                            }, " Buka Fullsize ", 8, ["href"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground uppercase tracking-wider" }, "Foto Wajah"),
                          createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" }, [
                            createVNode("img", {
                              src: "/storage/" + ((_d = selectedVerification.value) == null ? void 0 : _d.face_image_path),
                              class: "absolute inset-0 h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("a", {
                              href: "/storage/" + ((_e = selectedVerification.value) == null ? void 0 : _e.face_image_path),
                              target: "_blank",
                              class: "absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                            }, " Buka Fullsize ", 8, ["href"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3 border-t border-border pt-6" }, [
                        createVNode(_sfc_main$4, { onClick: closeReview }, {
                          default: withCtx(() => [
                            createTextVNode("Tutup")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$5, { onClick: openRejectModal }, {
                          default: withCtx(() => [
                            createTextVNode("Tolak")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, {
                          onClick: ($event) => approve(selectedVerification.value)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Setujui Verifikasi")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }),
                _: 1
              }, 8, ["show"]),
              createVNode(_sfc_main$3, {
                show: isRejectModalOpen.value,
                onClose: closeRejectModal,
                maxWidth: "md"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("h2", { class: "text-lg font-bold text-foreground" }, " Konfirmasi Penolakan "),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Berikan alasan mengapa pengajuan verifikasi ini ditolak agar user dapat memperbaikinya. "),
                    createVNode("div", { class: "mt-6" }, [
                      createVNode(_sfc_main$6, {
                        for: "rejection_note",
                        value: "Alasan Penolakan"
                      }),
                      createVNode(_sfc_main$7, {
                        id: "rejection_note",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).rejection_note,
                        "onUpdate:modelValue": ($event) => unref(form).rejection_note = $event,
                        placeholder: "Contoh: Foto KTP buram atau tidak sesuai.",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$8, {
                        class: "mt-2",
                        message: unref(form).errors.rejection_note
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                      createVNode(_sfc_main$4, { onClick: closeRejectModal }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$5, {
                        onClick: reject,
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tolak Sekarang ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
