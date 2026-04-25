import { ref, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderVNode, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Gavel, Tag, Calendar, Package, Store, ArrowRight, MessageSquare, CheckCircle2, ShoppingCart, ChevronUp, ChevronDown, RefreshCw, Info, Clock, XCircle } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./Pagination-brVOzIHZ.js";
import { _ as _sfc_main$3 } from "./BackButton-DqmVU1VH.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Negotiations",
  __ssrInlineRender: true,
  props: { negotiations: Object },
  setup(__props) {
    const expandedItems = ref({});
    const toggleExpand = (id) => {
      expandedItems.value[id] = !expandedItems.value[id];
    };
    const formatRp = (v) => "Rp " + new Intl.NumberFormat("id-ID").format(v);
    const formatDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";
    const statusConfig = {
      pending: { label: "Menunggu Respon", color: "amber", icon: Clock },
      accepted: { label: "Penawaran Diterima", color: "green", icon: CheckCircle2 },
      rejected: { label: "Penawaran Ditolak", color: "red", icon: XCircle },
      countered: { label: "Counter-Offer", color: "indigo", icon: RefreshCw },
      expired: { label: "Kadaluarsa", color: "slate", icon: Clock }
    };
    const getStatusConfig = (status, expires_at) => {
      if (status === "pending" || status === "countered") {
        if (new Date(expires_at) < /* @__PURE__ */ new Date()) {
          return statusConfig.expired;
        }
      }
      return statusConfig[status] || { label: status, color: "slate", icon: Info };
    };
    const statusBadgeClass = (status, expires_at) => {
      const config = getStatusConfig(status, expires_at);
      const colorMap = {
        amber: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
        green: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
        red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
        indigo: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800",
        slate: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
      };
      return colorMap[config.color] ?? colorMap.slate;
    };
    const acceptCounter = (id) => {
      if (confirm("Terima penawaran balik dari penjual?")) {
        router.post(route("negotiations.accept-counter", id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Penawaran Saya" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { fallbackRoute: "buyer.dashboard" }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Penawaran Saya</h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(_sfc_main$3, { fallbackRoute: "buyer.dashboard" }),
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Penawaran Saya")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-10"${_scopeId}><div class="mx-auto max-w-4xl px-4 sm:px-6"${_scopeId}><div class="mb-8 flex items-center gap-4"${_scopeId}><div class="rounded-2xl bg-primary/10 p-3 text-primary shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Gavel), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Daftar Penawaran Harga</h3><p class="text-sm text-muted-foreground"${_scopeId}>Pantau status negosiasi produk yang Anda tawar di sini.</p></div></div>`);
            if (__props.negotiations.data.length === 0) {
              _push2(`<div class="flex flex-col items-center py-24 text-center"${_scopeId}><div class="relative mb-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Gavel), { class: "h-20 w-20 text-muted-foreground/10" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Tag), { class: "absolute -bottom-2 -right-2 h-8 w-8 text-muted-foreground/20" }, null, _parent2, _scopeId));
              _push2(`</div><h4 class="text-lg font-bold text-muted-foreground"${_scopeId}>Belum ada penawaran</h4><p class="mb-6 mt-1 text-sm text-muted-foreground"${_scopeId}>Anda bisa menawar produk yang memiliki label &quot;Nego&quot; di halamannya.</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("home"),
                class: "rounded-xl bg-primary px-8 py-2.5 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
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
              _push2(`</div>`);
            } else {
              _push2(`<div class="space-y-5"${_scopeId}><!--[-->`);
              ssrRenderList(__props.negotiations.data, (nego) => {
                var _a, _b;
                _push2(`<div class="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3 transition-colors group-hover:bg-muted/40"${_scopeId}><div class="flex items-center gap-3 text-xs text-muted-foreground"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Calendar), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>Diajukan pada ${ssrInterpolate(formatDate(nego.created_at))}</span></div><span class="${ssrRenderClass([statusBadgeClass(nego.status, nego.expires_at), "rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm"])}"${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getStatusConfig(nego.status, nego.expires_at).icon), { class: "mr-1 inline h-3 w-3" }, null), _parent2, _scopeId);
                _push2(` ${ssrInterpolate(getStatusConfig(nego.status, nego.expires_at).label)}</span></div><div class="p-5"${_scopeId}><div class="flex gap-4 sm:gap-6"${_scopeId}><div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-inner sm:h-24 sm:w-24"${_scopeId}>`);
                if ((_b = (_a = nego.product) == null ? void 0 : _a.images) == null ? void 0 : _b.length) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${nego.product.images[0].image_path}`)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"${_scopeId}>`);
                } else {
                  _push2(`<div class="flex h-full w-full items-center justify-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Package), { class: "h-8 w-8 text-muted-foreground/30" }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><div class="flex-1 min-w-0 flex flex-col justify-between py-0.5"${_scopeId}><div${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("products.show", nego.product.slug),
                  class: "font-bold text-base sm:text-lg hover:text-primary transition-colors block line-clamp-1"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(nego.product.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(nego.product.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("store.show", nego.seller.id),
                  class: "mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit font-medium"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b2;
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Store), { class: "h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(((_a2 = nego.seller.profile) == null ? void 0 : _a2.store_name) || nego.seller.name)}`);
                    } else {
                      return [
                        createVNode(unref(Store), { class: "h-3.5 w-3.5" }),
                        createTextVNode(" " + toDisplayString(((_b2 = nego.seller.profile) == null ? void 0 : _b2.store_name) || nego.seller.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="hidden sm:flex items-end gap-6 mt-3"${_scopeId}><div${_scopeId}><p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1"${_scopeId}>Harga Asli</p><p class="text-sm font-bold text-muted-foreground line-through decoration-red-500/50"${_scopeId}>${ssrInterpolate(formatRp(nego.product.price))}</p></div>`);
                _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 text-muted-foreground/30 mb-1" }, null, _parent2, _scopeId));
                _push2(`<div${_scopeId}><p class="text-[10px] font-bold uppercase tracking-widest text-primary mb-1"${_scopeId}>Penawaran Anda</p><p class="text-xl font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(nego.proposed_price))}</p></div></div></div></div><div class="mt-5 flex items-center justify-between sm:hidden rounded-xl bg-muted/30 p-3 border border-border/50"${_scopeId}><div class="text-center flex-1"${_scopeId}><p class="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1"${_scopeId}>Harga Asli</p><p class="text-xs font-bold text-muted-foreground line-through"${_scopeId}>${ssrInterpolate(formatRp(nego.product.price))}</p></div>`);
                _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 text-muted-foreground/20" }, null, _parent2, _scopeId));
                _push2(`<div class="text-center flex-1"${_scopeId}><p class="text-[9px] font-bold uppercase tracking-widest text-primary mb-1"${_scopeId}>Penawaran</p><p class="text-sm font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(nego.proposed_price))}</p></div></div><div class="mt-6 flex flex-col sm:flex-row items-center gap-3"${_scopeId}><div class="flex items-center gap-2 w-full sm:w-auto"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("chat.new", nego.product.slug),
                  class: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(MessageSquare), { class: "h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                      _push3(` Chat Penjual `);
                    } else {
                      return [
                        createVNode(unref(MessageSquare), { class: "h-3.5 w-3.5" }),
                        createTextVNode(" Chat Penjual ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                if (nego.status === "countered") {
                  _push2(`<button class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(CheckCircle2), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
                  _push2(` Terima Balasan </button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (nego.status === "accepted" && nego.product.availability === "available") {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.show", nego.product.slug),
                    class: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all active:scale-95"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(ShoppingCart), { class: "h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                        _push3(` Checkout Sekarang `);
                      } else {
                        return [
                          createVNode(unref(ShoppingCart), { class: "h-3.5 w-3.5" }),
                          createTextVNode(" Checkout Sekarang ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><button class="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors"${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(expandedItems.value[nego.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-3.5 w-3.5" }, null), _parent2, _scopeId);
                _push2(` ${ssrInterpolate(expandedItems.value[nego.id] ? "Sembunyikan" : "Rincian")}</button></div>`);
                if (expandedItems.value[nego.id]) {
                  _push2(`<div class="mt-4 space-y-4 pt-4 border-t border-border"${_scopeId}>`);
                  if (nego.message) {
                    _push2(`<div class="rounded-xl border border-border bg-muted/30 p-4"${_scopeId}><p class="mb-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest"${_scopeId}>Pesan Anda</p><p class="text-sm italic"${_scopeId}>&quot;${ssrInterpolate(nego.message)}&quot;</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (nego.status === "countered") {
                    _push2(`<div class="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-800/50 dark:bg-indigo-900/10"${_scopeId}><div class="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(RefreshCw), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                    _push2(`<p class="text-xs font-black uppercase tracking-widest"${_scopeId}>Penawaran Balik Seller</p></div><p class="text-xl font-black text-indigo-600 dark:text-indigo-400"${_scopeId}>${ssrInterpolate(formatRp(nego.counter_price))}</p>`);
                    if (nego.seller_message) {
                      _push2(`<p class="mt-2 text-sm italic text-muted-foreground bg-white/50 dark:bg-black/20 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900/30"${_scopeId}> &quot;${ssrInterpolate(nego.seller_message)}&quot; </p>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (nego.status === "rejected" && nego.seller_message) {
                    _push2(`<div class="rounded-xl border border-red-200 bg-red-50/30 p-4 dark:border-red-800/50 dark:bg-red-900/10"${_scopeId}><p class="mb-1 text-[10px] font-bold text-red-600 uppercase tracking-widest"${_scopeId}>Alasan Penolakan</p><p class="text-sm italic"${_scopeId}>&quot;${ssrInterpolate(nego.seller_message)}&quot;</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="flex items-start gap-2 p-3 bg-muted/30 rounded-xl"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Info), { class: "h-3.5 w-3.5 text-muted-foreground mt-0.5" }, null, _parent2, _scopeId));
                  _push2(`<p class="text-[11px] text-muted-foreground leading-relaxed"${_scopeId}> Penawaran ini berlaku hingga <span class="font-bold"${_scopeId}>${ssrInterpolate(formatDate(nego.expires_at))}</span>. Jika tidak ada respon hingga batas waktu tersebut, penawaran akan dianggap kadaluarsa secara otomatis. </p></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--><div class="mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                links: __props.negotiations.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-10" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 sm:px-6" }, [
                  createVNode("div", { class: "mb-8 flex items-center gap-4" }, [
                    createVNode("div", { class: "rounded-2xl bg-primary/10 p-3 text-primary shadow-sm" }, [
                      createVNode(unref(Gavel), { class: "h-6 w-6" })
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-lg font-bold" }, "Daftar Penawaran Harga"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Pantau status negosiasi produk yang Anda tawar di sini.")
                    ])
                  ]),
                  __props.negotiations.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col items-center py-24 text-center"
                  }, [
                    createVNode("div", { class: "relative mb-6" }, [
                      createVNode(unref(Gavel), { class: "h-20 w-20 text-muted-foreground/10" }),
                      createVNode(unref(Tag), { class: "absolute -bottom-2 -right-2 h-8 w-8 text-muted-foreground/20" })
                    ]),
                    createVNode("h4", { class: "text-lg font-bold text-muted-foreground" }, "Belum ada penawaran"),
                    createVNode("p", { class: "mb-6 mt-1 text-sm text-muted-foreground" }, 'Anda bisa menawar produk yang memiliki label "Nego" di halamannya.'),
                    createVNode(unref(Link), {
                      href: _ctx.route("home"),
                      class: "rounded-xl bg-primary px-8 py-2.5 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cari Produk ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-5"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.negotiations.data, (nego) => {
                      var _a, _b;
                      return openBlock(), createBlock("div", {
                        key: nego.id,
                        class: "group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                      }, [
                        createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3 transition-colors group-hover:bg-muted/40" }, [
                          createVNode("div", { class: "flex items-center gap-3 text-xs text-muted-foreground" }, [
                            createVNode(unref(Calendar), { class: "h-3.5 w-3.5" }),
                            createVNode("span", null, "Diajukan pada " + toDisplayString(formatDate(nego.created_at)), 1)
                          ]),
                          createVNode("span", {
                            class: ["rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm", statusBadgeClass(nego.status, nego.expires_at)]
                          }, [
                            (openBlock(), createBlock(resolveDynamicComponent(getStatusConfig(nego.status, nego.expires_at).icon), { class: "mr-1 inline h-3 w-3" })),
                            createTextVNode(" " + toDisplayString(getStatusConfig(nego.status, nego.expires_at).label), 1)
                          ], 2)
                        ]),
                        createVNode("div", { class: "p-5" }, [
                          createVNode("div", { class: "flex gap-4 sm:gap-6" }, [
                            createVNode("div", { class: "h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-inner sm:h-24 sm:w-24" }, [
                              ((_b = (_a = nego.product) == null ? void 0 : _a.images) == null ? void 0 : _b.length) ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: `/storage/${nego.product.images[0].image_path}`,
                                class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex h-full w-full items-center justify-center"
                              }, [
                                createVNode(unref(Package), { class: "h-8 w-8 text-muted-foreground/30" })
                              ]))
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0 flex flex-col justify-between py-0.5" }, [
                              createVNode("div", null, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("products.show", nego.product.slug),
                                  class: "font-bold text-base sm:text-lg hover:text-primary transition-colors block line-clamp-1"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(nego.product.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode(unref(Link), {
                                  href: _ctx.route("store.show", nego.seller.id),
                                  class: "mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit font-medium"
                                }, {
                                  default: withCtx(() => {
                                    var _a2;
                                    return [
                                      createVNode(unref(Store), { class: "h-3.5 w-3.5" }),
                                      createTextVNode(" " + toDisplayString(((_a2 = nego.seller.profile) == null ? void 0 : _a2.store_name) || nego.seller.name), 1)
                                    ];
                                  }),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              createVNode("div", { class: "hidden sm:flex items-end gap-6 mt-3" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1" }, "Harga Asli"),
                                  createVNode("p", { class: "text-sm font-bold text-muted-foreground line-through decoration-red-500/50" }, toDisplayString(formatRp(nego.product.price)), 1)
                                ]),
                                createVNode(unref(ArrowRight), { class: "h-4 w-4 text-muted-foreground/30 mb-1" }),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-[10px] font-bold uppercase tracking-widest text-primary mb-1" }, "Penawaran Anda"),
                                  createVNode("p", { class: "text-xl font-black text-primary" }, toDisplayString(formatRp(nego.proposed_price)), 1)
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mt-5 flex items-center justify-between sm:hidden rounded-xl bg-muted/30 p-3 border border-border/50" }, [
                            createVNode("div", { class: "text-center flex-1" }, [
                              createVNode("p", { class: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1" }, "Harga Asli"),
                              createVNode("p", { class: "text-xs font-bold text-muted-foreground line-through" }, toDisplayString(formatRp(nego.product.price)), 1)
                            ]),
                            createVNode(unref(ArrowRight), { class: "h-4 w-4 text-muted-foreground/20" }),
                            createVNode("div", { class: "text-center flex-1" }, [
                              createVNode("p", { class: "text-[9px] font-bold uppercase tracking-widest text-primary mb-1" }, "Penawaran"),
                              createVNode("p", { class: "text-sm font-black text-primary" }, toDisplayString(formatRp(nego.proposed_price)), 1)
                            ])
                          ]),
                          createVNode("div", { class: "mt-6 flex flex-col sm:flex-row items-center gap-3" }, [
                            createVNode("div", { class: "flex items-center gap-2 w-full sm:w-auto" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("chat.new", nego.product.slug),
                                class: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(MessageSquare), { class: "h-3.5 w-3.5" }),
                                  createTextVNode(" Chat Penjual ")
                                ]),
                                _: 1
                              }, 8, ["href"]),
                              nego.status === "countered" ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => acceptCounter(nego.id),
                                class: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"
                              }, [
                                createVNode(unref(CheckCircle2), { class: "h-3.5 w-3.5" }),
                                createTextVNode(" Terima Balasan ")
                              ], 8, ["onClick"])) : createCommentVNode("", true),
                              nego.status === "accepted" && nego.product.availability === "available" ? (openBlock(), createBlock(unref(Link), {
                                key: 1,
                                href: _ctx.route("products.show", nego.product.slug),
                                class: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all active:scale-95"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ShoppingCart), { class: "h-3.5 w-3.5" }),
                                  createTextVNode(" Checkout Sekarang ")
                                ]),
                                _: 1
                              }, 8, ["href"])) : createCommentVNode("", true)
                            ]),
                            createVNode("button", {
                              onClick: ($event) => toggleExpand(nego.id),
                              class: "w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors"
                            }, [
                              (openBlock(), createBlock(resolveDynamicComponent(expandedItems.value[nego.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-3.5 w-3.5" })),
                              createTextVNode(" " + toDisplayString(expandedItems.value[nego.id] ? "Sembunyikan" : "Rincian"), 1)
                            ], 8, ["onClick"])
                          ]),
                          createVNode(Transition, {
                            "enter-from-class": "opacity-0 -translate-y-2",
                            "leave-to-class": "opacity-0 -translate-y-2",
                            "enter-active-class": "transition-all duration-200",
                            "leave-active-class": "transition-all duration-200"
                          }, {
                            default: withCtx(() => [
                              expandedItems.value[nego.id] ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-4 space-y-4 pt-4 border-t border-border"
                              }, [
                                nego.message ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "rounded-xl border border-border bg-muted/30 p-4"
                                }, [
                                  createVNode("p", { class: "mb-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest" }, "Pesan Anda"),
                                  createVNode("p", { class: "text-sm italic" }, '"' + toDisplayString(nego.message) + '"', 1)
                                ])) : createCommentVNode("", true),
                                nego.status === "countered" ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "rounded-xl border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-800/50 dark:bg-indigo-900/10"
                                }, [
                                  createVNode("div", { class: "flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400" }, [
                                    createVNode(unref(RefreshCw), { class: "h-4 w-4" }),
                                    createVNode("p", { class: "text-xs font-black uppercase tracking-widest" }, "Penawaran Balik Seller")
                                  ]),
                                  createVNode("p", { class: "text-xl font-black text-indigo-600 dark:text-indigo-400" }, toDisplayString(formatRp(nego.counter_price)), 1),
                                  nego.seller_message ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "mt-2 text-sm italic text-muted-foreground bg-white/50 dark:bg-black/20 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900/30"
                                  }, ' "' + toDisplayString(nego.seller_message) + '" ', 1)) : createCommentVNode("", true)
                                ])) : createCommentVNode("", true),
                                nego.status === "rejected" && nego.seller_message ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "rounded-xl border border-red-200 bg-red-50/30 p-4 dark:border-red-800/50 dark:bg-red-900/10"
                                }, [
                                  createVNode("p", { class: "mb-1 text-[10px] font-bold text-red-600 uppercase tracking-widest" }, "Alasan Penolakan"),
                                  createVNode("p", { class: "text-sm italic" }, '"' + toDisplayString(nego.seller_message) + '"', 1)
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "flex items-start gap-2 p-3 bg-muted/30 rounded-xl" }, [
                                  createVNode(unref(Info), { class: "h-3.5 w-3.5 text-muted-foreground mt-0.5" }),
                                  createVNode("p", { class: "text-[11px] text-muted-foreground leading-relaxed" }, [
                                    createTextVNode(" Penawaran ini berlaku hingga "),
                                    createVNode("span", { class: "font-bold" }, toDisplayString(formatDate(nego.expires_at)), 1),
                                    createTextVNode(". Jika tidak ada respon hingga batas waktu tersebut, penawaran akan dianggap kadaluarsa secara otomatis. ")
                                  ])
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]);
                    }), 128)),
                    createVNode("div", { class: "mt-8" }, [
                      createVNode(_sfc_main$2, {
                        links: __props.negotiations.links
                      }, null, 8, ["links"])
                    ])
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Negotiations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
