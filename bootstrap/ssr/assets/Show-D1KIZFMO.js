import { ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, vModelText, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { CheckCircle, AlertCircle, ExternalLink, Info, ArrowRight, XCircle, ChevronLeft } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$7 } from "./SecondaryButton-BWOt3jtr.js";
import { _ as _sfc_main$3 } from "./DangerButton-Dpx20QNz.js";
import { _ as _sfc_main$4 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$5, a as _sfc_main$6 } from "./InputError-DDbcJ_iI.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    dispute: Object
  },
  setup(__props) {
    const props = __props;
    const showDecisionModal = ref(false);
    const decisionType = ref("");
    const form = useForm({
      resolution: "",
      admin_note: ""
    });
    const openDecision = (type) => {
      decisionType.value = type;
      form.resolution = type;
      showDecisionModal.value = true;
    };
    const submitResolution = () => {
      form.post(route("admin.disputes.resolve", props.dispute.id), {
        onSuccess: () => {
          showDecisionModal.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Detail Komplain" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.disputes.index"),
              class: "p-2 rounded-xl border border-border hover:bg-muted transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Detail Komplain #${ssrInterpolate(__props.dispute.transaction.reference_number)}</h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("admin.disputes.index"),
                  class: "p-2 rounded-xl border border-border hover:bg-muted transition-colors"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Detail Komplain #" + toDisplayString(__props.dispute.transaction.reference_number), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6"${_scopeId}>`);
            if (__props.dispute.status === "resolved" || __props.dispute.status === "closed") {
              _push2(`<div class="${ssrRenderClass([__props.dispute.status === "resolved" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-blue-50 border-blue-200 text-blue-800", "p-4 rounded-2xl border flex items-center gap-3"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(`<p class="font-bold"${_scopeId}>${ssrInterpolate(__props.dispute.status === "resolved" ? "Sengketa telah diselesaikan dengan pengembalian dana (Refund)." : "Sengketa telah ditutup dengan meneruskan dana ke Seller.")}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2 space-y-6"${_scopeId}><div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-bold mb-4 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "text-red-500 h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Informasi Masalah </h3><div class="bg-muted/50 p-4 rounded-xl mb-6"${_scopeId}><p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1"${_scopeId}>Alasan Komplain</p><p class="text-lg font-bold text-foreground"${_scopeId}>${ssrInterpolate(__props.dispute.reason === "not_delivered" ? "Barang Belum Sampai" : __props.dispute.reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : __props.dispute.reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya")}</p></div><div class="mb-8"${_scopeId}><p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2"${_scopeId}>Deskripsi Lengkap</p><p class="text-sm leading-relaxed text-foreground whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.dispute.description)}</p></div>`);
            if (((_a = __props.dispute.evidence_images) == null ? void 0 : _a.length) > 0) {
              _push2(`<div${_scopeId}><p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4"${_scopeId}>Bukti Foto dari Buyer</p><div class="grid grid-cols-2 sm:grid-cols-3 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.dispute.evidence_images, (img, idx) => {
                _push2(`<a${ssrRenderAttr("href", `/storage/${img}`)} target="_blank" class="aspect-square rounded-2xl border border-border overflow-hidden hover:opacity-80 transition-opacity group relative"${_scopeId}><img${ssrRenderAttr("src", `/storage/${img}`)} class="h-full w-full object-cover"${_scopeId}><div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(ExternalLink), { class: "text-white h-6 w-6" }, null, _parent2, _scopeId));
                _push2(`</div></a>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-card border border-border shadow sm:rounded-2xl p-6"${_scopeId}><h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-muted-foreground/60"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Catatan Admin </h3>`);
            if (__props.dispute.admin_note) {
              _push2(`<div class="p-4 rounded-xl bg-muted border border-border"${_scopeId}><p class="text-sm italic text-foreground"${_scopeId}>${ssrInterpolate(__props.dispute.admin_note)}</p></div>`);
            } else {
              _push2(`<p class="text-sm text-muted-foreground italic"${_scopeId}>Belum ada catatan resolusi.</p>`);
            }
            _push2(`</div></div><div class="space-y-6"${_scopeId}><div class="bg-card border border-border shadow sm:rounded-2xl p-6"${_scopeId}><h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6"${_scopeId}>Pihak Terlibat</h3><div class="space-y-6"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold"${_scopeId}>${ssrInterpolate(__props.dispute.user.name.substring(0, 1))}</div><div${_scopeId}><p class="text-xs font-bold uppercase tracking-widest text-blue-500"${_scopeId}>Buyer (Pelapor)</p><p class="font-bold text-foreground"${_scopeId}>${ssrInterpolate(__props.dispute.user.name)}</p><p class="text-[10px] text-muted-foreground truncate"${_scopeId}>${ssrInterpolate(__props.dispute.user.email)}</p></div></div><div class="flex justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 text-muted-foreground rotate-90 lg:rotate-0" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-3 text-right justify-end lg:justify-start lg:text-left"${_scopeId}><div class="lg:order-last"${_scopeId}><div class="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold"${_scopeId}>${ssrInterpolate(__props.dispute.transaction.seller.name.substring(0, 1))}</div></div><div class="lg:order-first"${_scopeId}><p class="text-xs font-bold uppercase tracking-widest text-emerald-600"${_scopeId}>Seller</p><p class="font-bold text-foreground"${_scopeId}>${ssrInterpolate(__props.dispute.transaction.seller.name)}</p><p class="text-[10px] text-muted-foreground truncate"${_scopeId}>${ssrInterpolate(__props.dispute.transaction.seller.email)}</p></div></div></div></div><div class="bg-card border border-border shadow sm:rounded-2xl p-6"${_scopeId}><h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4"${_scopeId}>Transaksi</h3><div class="flex gap-4 mb-4"${_scopeId}><div class="h-16 w-16 rounded-xl border border-border overflow-hidden bg-muted"${_scopeId}>`);
            if (((_b = __props.dispute.transaction.product.images) == null ? void 0 : _b.length) > 0) {
              _push2(`<img${ssrRenderAttr("src", `/storage/${__props.dispute.transaction.product.images[0].image_path}`)} class="h-full w-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><p class="font-bold text-sm line-clamp-1"${_scopeId}>${ssrInterpolate(__props.dispute.transaction.product.title)}</p><p class="text-lg font-black text-primary"${_scopeId}>Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.dispute.transaction.price))}</p></div></div></div>`);
            if (__props.dispute.status === "pending" || __props.dispute.status === "investigating") {
              _push2(`<div class="bg-card border border-border shadow sm:rounded-2xl p-6 space-y-4"${_scopeId}><h3 class="text-sm font-bold uppercase tracking-widest text-foreground mb-2 text-center"${_scopeId}>Putusan Admin</h3>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                class: "w-full justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 h-12 rounded-2xl",
                onClick: ($event) => openDecision("release_to_seller")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Release ke Seller `);
                  } else {
                    return [
                      createVNode(unref(CheckCircle), { class: "h-4 w-4" }),
                      createTextVNode(" Release ke Seller ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                class: "w-full justify-center gap-2 h-12 rounded-2xl",
                onClick: ($event) => openDecision("refund_to_buyer")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Refund ke Buyer `);
                  } else {
                    return [
                      createVNode(unref(XCircle), { class: "h-4 w-4" }),
                      createTextVNode(" Refund ke Buyer ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p class="text-[10px] text-center text-muted-foreground italic"${_scopeId}>Keputusan admin bersifat mutlak dan tidak dapat diganggu gugat.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              show: showDecisionModal.value,
              onClose: ($event) => showDecisionModal.value = false,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6"${_scopeId2}><h2 class="text-xl font-bold text-foreground mb-2"${_scopeId2}> Konfirmasi Putusan </h2><div class="${ssrRenderClass([decisionType.value === "refund_to_buyer" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700", "p-4 rounded-xl mb-6 flex items-start gap-3"])}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Info), { class: "h-5 w-5 mt-0.5 flex-shrink-0" }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm font-medium"${_scopeId2}> Anda akan memutus perkara ini dengan <strong${_scopeId2}>${ssrInterpolate(decisionType.value === "refund_to_buyer" ? "Mengembalikan dana ke Pembeli" : "Meneruskan dana ke Penjual")}</strong>. </p></div><form class="space-y-4"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    for: "admin_note",
                    value: "Alasan Keputusan Admin"
                  }, null, _parent3, _scopeId2));
                  _push3(`<textarea id="admin_note" rows="4" class="mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary" placeholder="Jelaskan alasan dibalik keputusan ini agar transparan bagi kedua belah pihak..." required${_scopeId2}>${ssrInterpolate(unref(form).admin_note)}</textarea>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.admin_note,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex justify-end gap-3 pt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    onClick: ($event) => showDecisionModal.value = false
                  }, {
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
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    disabled: unref(form).processing,
                    class: decisionType.value === "refund_to_buyer" ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Konfirmasi &amp; Selesaikan `);
                      } else {
                        return [
                          createTextVNode(" Konfirmasi & Selesaikan ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-xl font-bold text-foreground mb-2" }, " Konfirmasi Putusan "),
                      createVNode("div", {
                        class: ["p-4 rounded-xl mb-6 flex items-start gap-3", decisionType.value === "refund_to_buyer" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"]
                      }, [
                        createVNode(unref(Info), { class: "h-5 w-5 mt-0.5 flex-shrink-0" }),
                        createVNode("p", { class: "text-sm font-medium" }, [
                          createTextVNode(" Anda akan memutus perkara ini dengan "),
                          createVNode("strong", null, toDisplayString(decisionType.value === "refund_to_buyer" ? "Mengembalikan dana ke Pembeli" : "Meneruskan dana ke Penjual"), 1),
                          createTextVNode(". ")
                        ])
                      ], 2),
                      createVNode("form", {
                        onSubmit: withModifiers(submitResolution, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$5, {
                            for: "admin_note",
                            value: "Alasan Keputusan Admin"
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "admin_note",
                            "onUpdate:modelValue": ($event) => unref(form).admin_note = $event,
                            rows: "4",
                            class: "mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary",
                            placeholder: "Jelaskan alasan dibalik keputusan ini agar transparan bagi kedua belah pihak...",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).admin_note]
                          ]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.admin_note,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                          createVNode(_sfc_main$7, {
                            onClick: ($event) => showDecisionModal.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_sfc_main$2, {
                            disabled: unref(form).processing,
                            class: decisionType.value === "refund_to_buyer" ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Konfirmasi & Selesaikan ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "class"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6" }, [
                  __props.dispute.status === "resolved" || __props.dispute.status === "closed" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ["p-4 rounded-2xl border flex items-center gap-3", __props.dispute.status === "resolved" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-blue-50 border-blue-200 text-blue-800"]
                  }, [
                    createVNode(unref(CheckCircle), { class: "h-5 w-5" }),
                    createVNode("p", { class: "font-bold" }, toDisplayString(__props.dispute.status === "resolved" ? "Sengketa telah diselesaikan dengan pengembalian dana (Refund)." : "Sengketa telah ditutup dengan meneruskan dana ke Seller."), 1)
                  ], 2)) : createCommentVNode("", true),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                      createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl overflow-hidden" }, [
                        createVNode("div", { class: "p-6" }, [
                          createVNode("h3", { class: "text-lg font-bold mb-4 flex items-center gap-2" }, [
                            createVNode(unref(AlertCircle), { class: "text-red-500 h-5 w-5" }),
                            createTextVNode(" Informasi Masalah ")
                          ]),
                          createVNode("div", { class: "bg-muted/50 p-4 rounded-xl mb-6" }, [
                            createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1" }, "Alasan Komplain"),
                            createVNode("p", { class: "text-lg font-bold text-foreground" }, toDisplayString(__props.dispute.reason === "not_delivered" ? "Barang Belum Sampai" : __props.dispute.reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : __props.dispute.reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya"), 1)
                          ]),
                          createVNode("div", { class: "mb-8" }, [
                            createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2" }, "Deskripsi Lengkap"),
                            createVNode("p", { class: "text-sm leading-relaxed text-foreground whitespace-pre-line" }, toDisplayString(__props.dispute.description), 1)
                          ]),
                          ((_c = __props.dispute.evidence_images) == null ? void 0 : _c.length) > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4" }, "Bukti Foto dari Buyer"),
                            createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-4" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.dispute.evidence_images, (img, idx) => {
                                return openBlock(), createBlock("a", {
                                  key: idx,
                                  href: `/storage/${img}`,
                                  target: "_blank",
                                  class: "aspect-square rounded-2xl border border-border overflow-hidden hover:opacity-80 transition-opacity group relative"
                                }, [
                                  createVNode("img", {
                                    src: `/storage/${img}`,
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"]),
                                  createVNode("div", { class: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity" }, [
                                    createVNode(unref(ExternalLink), { class: "text-white h-6 w-6" })
                                  ])
                                ], 8, ["href"]);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl p-6" }, [
                        createVNode("h3", { class: "text-lg font-bold mb-4 flex items-center gap-2 text-muted-foreground/60" }, [
                          createVNode(unref(Info), { class: "h-5 w-5" }),
                          createTextVNode(" Catatan Admin ")
                        ]),
                        __props.dispute.admin_note ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-4 rounded-xl bg-muted border border-border"
                        }, [
                          createVNode("p", { class: "text-sm italic text-foreground" }, toDisplayString(__props.dispute.admin_note), 1)
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-sm text-muted-foreground italic"
                        }, "Belum ada catatan resolusi."))
                      ])
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl p-6" }, [
                        createVNode("h3", { class: "text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6" }, "Pihak Terlibat"),
                        createVNode("div", { class: "space-y-6" }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold" }, toDisplayString(__props.dispute.user.name.substring(0, 1)), 1),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-blue-500" }, "Buyer (Pelapor)"),
                              createVNode("p", { class: "font-bold text-foreground" }, toDisplayString(__props.dispute.user.name), 1),
                              createVNode("p", { class: "text-[10px] text-muted-foreground truncate" }, toDisplayString(__props.dispute.user.email), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(unref(ArrowRight), { class: "h-4 w-4 text-muted-foreground rotate-90 lg:rotate-0" })
                          ]),
                          createVNode("div", { class: "flex items-center gap-3 text-right justify-end lg:justify-start lg:text-left" }, [
                            createVNode("div", { class: "lg:order-last" }, [
                              createVNode("div", { class: "h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold" }, toDisplayString(__props.dispute.transaction.seller.name.substring(0, 1)), 1)
                            ]),
                            createVNode("div", { class: "lg:order-first" }, [
                              createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-emerald-600" }, "Seller"),
                              createVNode("p", { class: "font-bold text-foreground" }, toDisplayString(__props.dispute.transaction.seller.name), 1),
                              createVNode("p", { class: "text-[10px] text-muted-foreground truncate" }, toDisplayString(__props.dispute.transaction.seller.email), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl p-6" }, [
                        createVNode("h3", { class: "text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4" }, "Transaksi"),
                        createVNode("div", { class: "flex gap-4 mb-4" }, [
                          createVNode("div", { class: "h-16 w-16 rounded-xl border border-border overflow-hidden bg-muted" }, [
                            ((_d = __props.dispute.transaction.product.images) == null ? void 0 : _d.length) > 0 ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: `/storage/${__props.dispute.transaction.product.images[0].image_path}`,
                              class: "h-full w-full object-cover"
                            }, null, 8, ["src"])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "font-bold text-sm line-clamp-1" }, toDisplayString(__props.dispute.transaction.product.title), 1),
                            createVNode("p", { class: "text-lg font-black text-primary" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(__props.dispute.transaction.price)), 1)
                          ])
                        ])
                      ]),
                      __props.dispute.status === "pending" || __props.dispute.status === "investigating" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-card border border-border shadow sm:rounded-2xl p-6 space-y-4"
                      }, [
                        createVNode("h3", { class: "text-sm font-bold uppercase tracking-widest text-foreground mb-2 text-center" }, "Putusan Admin"),
                        createVNode(_sfc_main$2, {
                          class: "w-full justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 h-12 rounded-2xl",
                          onClick: ($event) => openDecision("release_to_seller")
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(CheckCircle), { class: "h-4 w-4" }),
                            createTextVNode(" Release ke Seller ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_sfc_main$3, {
                          class: "w-full justify-center gap-2 h-12 rounded-2xl",
                          onClick: ($event) => openDecision("refund_to_buyer")
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(XCircle), { class: "h-4 w-4" }),
                            createTextVNode(" Refund ke Buyer ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode("p", { class: "text-[10px] text-center text-muted-foreground italic" }, "Keputusan admin bersifat mutlak dan tidak dapat diganggu gugat.")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$4, {
                show: showDecisionModal.value,
                onClose: ($event) => showDecisionModal.value = false,
                maxWidth: "md"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("h2", { class: "text-xl font-bold text-foreground mb-2" }, " Konfirmasi Putusan "),
                    createVNode("div", {
                      class: ["p-4 rounded-xl mb-6 flex items-start gap-3", decisionType.value === "refund_to_buyer" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"]
                    }, [
                      createVNode(unref(Info), { class: "h-5 w-5 mt-0.5 flex-shrink-0" }),
                      createVNode("p", { class: "text-sm font-medium" }, [
                        createTextVNode(" Anda akan memutus perkara ini dengan "),
                        createVNode("strong", null, toDisplayString(decisionType.value === "refund_to_buyer" ? "Mengembalikan dana ke Pembeli" : "Meneruskan dana ke Penjual"), 1),
                        createTextVNode(". ")
                      ])
                    ], 2),
                    createVNode("form", {
                      onSubmit: withModifiers(submitResolution, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$5, {
                          for: "admin_note",
                          value: "Alasan Keputusan Admin"
                        }),
                        withDirectives(createVNode("textarea", {
                          id: "admin_note",
                          "onUpdate:modelValue": ($event) => unref(form).admin_note = $event,
                          rows: "4",
                          class: "mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary",
                          placeholder: "Jelaskan alasan dibalik keputusan ini agar transparan bagi kedua belah pihak...",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).admin_note]
                        ]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.admin_note,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                        createVNode(_sfc_main$7, {
                          onClick: ($event) => showDecisionModal.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_sfc_main$2, {
                          disabled: unref(form).processing,
                          class: decisionType.value === "refund_to_buyer" ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Konfirmasi & Selesaikan ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "class"])
                      ])
                    ], 32)
                  ])
                ]),
                _: 1
              }, 8, ["show", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Disputes/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
