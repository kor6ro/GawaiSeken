import { onMounted, ref, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-BDlcmPtd.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { ShoppingBag, Package, ExternalLink, CreditCard, Clock, AlertCircle } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./Pagination-brVOzIHZ.js";
import _sfc_main$3 from "./DisputeForm-DotxPM7z.js";
import axios from "axios";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./onlineState-BAtS9nBF.js";
import "./InputError-DDbcJ_iI.js";
import "./PrimaryButton-Chd5xZL9.js";
import "./SecondaryButton-BWOt3jtr.js";
const _sfc_main = {
  __name: "Orders",
  __ssrInlineRender: true,
  props: {
    orders: Object
  },
  setup(__props) {
    onMounted(() => {
      const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
      const clientKey = usePage().props.midtrans_client_key;
      if (!document.querySelector(`script[src="${midtransScriptUrl}"]`)) {
        const script = document.createElement("script");
        script.src = midtransScriptUrl;
        script.setAttribute("data-client-key", clientKey);
        document.head.appendChild(script);
      }
    });
    const showDisputeModal = ref(false);
    const selectedTransaction = ref(null);
    const payNow = async (order) => {
      if (order.snap_token) {
        openSnap(order.snap_token);
      } else {
        refreshPayment(order);
      }
    };
    const openSnap = (token) => {
      window.snap.pay(token, {
        onSuccess: function(result) {
          window.location.reload();
        },
        onPending: function(result) {
          window.location.reload();
        },
        onError: function(result) {
          console.error(result);
        },
        onClose: function() {
          console.log("customer closed the popup without finishing the payment");
        }
      });
    };
    const refreshPayment = async (order) => {
      try {
        const response = await axios.post(route("transactions.repay", order.id));
        if (response.data.snap_token) {
          openSnap(response.data.snap_token);
        }
      } catch (error) {
        console.error("Gagal memperbarui token pembayaran:", error);
        alert("Gagal memperbarui sesi pembayaran. Silakan coba lagi.");
      }
    };
    const openDisputeModal = (transaction) => {
      selectedTransaction.value = transaction;
      showDisputeModal.value = true;
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "pending":
          return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
        case "paid":
          return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
        case "shipped":
          return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";
        case "completed":
          return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
        case "disputed":
          return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
        case "canceled":
          return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
        default:
          return "bg-slate-100 text-slate-700";
      }
    };
    const getStatusLabel = (status) => {
      switch (status) {
        case "pending":
          return "Menunggu Pembayaran";
        case "paid":
          return "Dibayar";
        case "shipped":
          return "Dikirim";
        case "completed":
          return "Selesai";
        case "disputed":
          return "Komplain / Dispute";
        case "canceled":
          return "Dibatalkan";
        default:
          return status;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pesanan Saya" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Pesanan Saya</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Pesanan Saya")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="bg-card border border-border shadow-sm rounded-3xl overflow-hidden"${_scopeId}><div class="p-6 sm:p-8"${_scopeId}><div class="flex items-center gap-3 mb-8"${_scopeId}><div class="p-3 rounded-2xl bg-primary/10 text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Riwayat Pembelian</h3><p class="text-sm text-muted-foreground"${_scopeId}>Daftar semua transaksi yang pernah Anda lakukan.</p></div></div>`);
            if (__props.orders.data.length === 0) {
              _push2(`<div class="py-20 text-center"${_scopeId}><div class="flex flex-col items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Package), { class: "h-16 w-16 text-muted-foreground/30 mb-4" }, null, _parent2, _scopeId));
              _push2(`<h4 class="text-lg font-bold text-muted-foreground"${_scopeId}>Belum ada pesanan</h4><p class="text-sm text-muted-foreground mb-6"${_scopeId}>Ayo mulai belanja gadget impianmu sekarang!</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("home"),
                class: "px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Cari Produk `);
                  } else {
                    return [
                      createTextVNode(" Cari Produk ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.orders.data, (order) => {
                var _a, _b;
                _push2(`<div class="group border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors bg-muted/30"${_scopeId}><div class="p-4 sm:p-6"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="text-xs font-bold text-muted-foreground uppercase tracking-widest"${_scopeId}>#${ssrInterpolate(order.reference_number)}</span><span class="text-xs text-muted-foreground"${_scopeId}>•</span><span class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }))}</span></div><span class="${ssrRenderClass([getStatusClass(order.status), "px-3 py-1 text-[10px] font-black uppercase tracking-wider border rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusLabel(order.status))}</span></div><div class="flex flex-col sm:flex-row gap-4 sm:gap-6"${_scopeId}><div class="h-20 w-20 flex-shrink-0 rounded-xl border border-border bg-card overflow-hidden"${_scopeId}>`);
                if (order.product.images && order.product.images.length > 0) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${order.product.images[0].image_path}`)} class="h-full w-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="h-full w-full flex items-center justify-center bg-muted"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Package), { class: "h-8 w-8 text-muted-foreground/30" }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><h4 class="font-bold text-lg truncate group-hover:text-primary transition-colors"${_scopeId}>${ssrInterpolate(order.product.title)}</h4><div class="flex items-center gap-2 mt-1 mb-2"${_scopeId}><div class="h-5 w-5 rounded-full bg-muted overflow-hidden border border-border"${_scopeId}>`);
                if ((_a = order.seller.profile) == null ? void 0 : _a.avatar) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${order.seller.profile.avatar}`)} class="h-full w-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="h-full w-full flex items-center justify-center bg-primary/10 text-[8px] font-bold text-primary"${_scopeId}>${ssrInterpolate(order.seller.name.substring(0, 1))}</div>`);
                }
                _push2(`</div><span class="text-xs font-medium text-muted-foreground"${_scopeId}>${ssrInterpolate(((_b = order.seller.profile) == null ? void 0 : _b.store_name) || order.seller.name)}</span></div><p class="font-black text-primary"${_scopeId}>Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(order.price))}</p></div><div class="flex flex-col sm:items-end justify-between gap-4"${_scopeId}><div class="flex flex-wrap gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("products.show", order.product.slug),
                  class: "inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted transition-colors"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                      _push3(` Detail Produk `);
                    } else {
                      return [
                        createVNode(unref(ExternalLink), { class: "h-3 w-3" }),
                        createTextVNode(" Detail Produk ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                if (order.status === "pending") {
                  _push2(`<div class="flex flex-col gap-2"${_scopeId}><button class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(CreditCard), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                  _push2(` Bayar Sekarang </button><button class="text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Clock), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                  _push2(` Refresh Sesi Pembayaran </button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (["shipped", "paid"].includes(order.status)) {
                  _push2(`<button class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                  _push2(` Ajukan Komplain </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div></div>`);
              });
              _push2(`<!--]--><div class="mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                links: __props.orders.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
            _push2(`</div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showDisputeModal.value,
              transaction: selectedTransaction.value,
              onClose: ($event) => showDisputeModal.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-card border border-border shadow-sm rounded-3xl overflow-hidden" }, [
                    createVNode("div", { class: "p-6 sm:p-8" }, [
                      createVNode("div", { class: "flex items-center gap-3 mb-8" }, [
                        createVNode("div", { class: "p-3 rounded-2xl bg-primary/10 text-primary" }, [
                          createVNode(unref(ShoppingBag), { class: "h-6 w-6" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-bold" }, "Riwayat Pembelian"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Daftar semua transaksi yang pernah Anda lakukan.")
                        ])
                      ]),
                      __props.orders.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-20 text-center"
                      }, [
                        createVNode("div", { class: "flex flex-col items-center" }, [
                          createVNode(unref(Package), { class: "h-16 w-16 text-muted-foreground/30 mb-4" }),
                          createVNode("h4", { class: "text-lg font-bold text-muted-foreground" }, "Belum ada pesanan"),
                          createVNode("p", { class: "text-sm text-muted-foreground mb-6" }, "Ayo mulai belanja gadget impianmu sekarang!"),
                          createVNode(unref(Link), {
                            href: _ctx.route("home"),
                            class: "px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cari Produk ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-6"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.orders.data, (order) => {
                          var _a, _b;
                          return openBlock(), createBlock("div", {
                            key: order.id,
                            class: "group border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors bg-muted/30"
                          }, [
                            createVNode("div", { class: "p-4 sm:p-6" }, [
                              createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border" }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("span", { class: "text-xs font-bold text-muted-foreground uppercase tracking-widest" }, "#" + toDisplayString(order.reference_number), 1),
                                  createVNode("span", { class: "text-xs text-muted-foreground" }, "•"),
                                  createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })), 1)
                                ]),
                                createVNode("span", {
                                  class: ["px-3 py-1 text-[10px] font-black uppercase tracking-wider border rounded-full", getStatusClass(order.status)]
                                }, toDisplayString(getStatusLabel(order.status)), 3)
                              ]),
                              createVNode("div", { class: "flex flex-col sm:flex-row gap-4 sm:gap-6" }, [
                                createVNode("div", { class: "h-20 w-20 flex-shrink-0 rounded-xl border border-border bg-card overflow-hidden" }, [
                                  order.product.images && order.product.images.length > 0 ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${order.product.images[0].image_path}`,
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "h-full w-full flex items-center justify-center bg-muted"
                                  }, [
                                    createVNode(unref(Package), { class: "h-8 w-8 text-muted-foreground/30" })
                                  ]))
                                ]),
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("h4", { class: "font-bold text-lg truncate group-hover:text-primary transition-colors" }, toDisplayString(order.product.title), 1),
                                  createVNode("div", { class: "flex items-center gap-2 mt-1 mb-2" }, [
                                    createVNode("div", { class: "h-5 w-5 rounded-full bg-muted overflow-hidden border border-border" }, [
                                      ((_a = order.seller.profile) == null ? void 0 : _a.avatar) ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: `/storage/${order.seller.profile.avatar}`,
                                        class: "h-full w-full object-cover"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "h-full w-full flex items-center justify-center bg-primary/10 text-[8px] font-bold text-primary"
                                      }, toDisplayString(order.seller.name.substring(0, 1)), 1))
                                    ]),
                                    createVNode("span", { class: "text-xs font-medium text-muted-foreground" }, toDisplayString(((_b = order.seller.profile) == null ? void 0 : _b.store_name) || order.seller.name), 1)
                                  ]),
                                  createVNode("p", { class: "font-black text-primary" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(order.price)), 1)
                                ]),
                                createVNode("div", { class: "flex flex-col sm:items-end justify-between gap-4" }, [
                                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("products.show", order.product.slug),
                                      class: "inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted transition-colors"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(ExternalLink), { class: "h-3 w-3" }),
                                        createTextVNode(" Detail Produk ")
                                      ]),
                                      _: 1
                                    }, 8, ["href"]),
                                    order.status === "pending" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex flex-col gap-2"
                                    }, [
                                      createVNode("button", {
                                        onClick: ($event) => payNow(order),
                                        class: "inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                      }, [
                                        createVNode(unref(CreditCard), { class: "h-3 w-3" }),
                                        createTextVNode(" Bayar Sekarang ")
                                      ], 8, ["onClick"]),
                                      createVNode("button", {
                                        onClick: ($event) => refreshPayment(order),
                                        class: "text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
                                      }, [
                                        createVNode(unref(Clock), { class: "h-3 w-3" }),
                                        createTextVNode(" Refresh Sesi Pembayaran ")
                                      ], 8, ["onClick"])
                                    ])) : createCommentVNode("", true),
                                    ["shipped", "paid"].includes(order.status) ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      onClick: ($event) => openDisputeModal(order),
                                      class: "inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors"
                                    }, [
                                      createVNode(unref(AlertCircle), { class: "h-3 w-3" }),
                                      createTextVNode(" Ajukan Komplain ")
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ])
                            ])
                          ]);
                        }), 128)),
                        createVNode("div", { class: "mt-8" }, [
                          createVNode(_sfc_main$2, {
                            links: __props.orders.links
                          }, null, 8, ["links"])
                        ])
                      ]))
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$3, {
                show: showDisputeModal.value,
                transaction: selectedTransaction.value,
                onClose: ($event) => showDisputeModal.value = false
              }, null, 8, ["show", "transaction", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
