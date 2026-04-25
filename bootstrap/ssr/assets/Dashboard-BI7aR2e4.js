import { ref, watch, onMounted, withCtx, unref, createTextVNode, toDisplayString, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { _ as _sfc_main$3 } from "./BackButton-DqmVU1VH.js";
import { ShoppingCart, Gavel, ShoppingBag, Heart, Package, Trash2, ArrowRight, Calendar, MessageSquare, CheckCircle2, ChevronUp, ChevronDown, MapPin, Users, AlertCircle, XCircle, Info, Clock, RefreshCw } from "lucide-vue-next";
import "./Pagination-brVOzIHZ.js";
import _sfc_main$2 from "./DisputeForm-CyPyB5yR.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
import "./InputLabel-D_lYO37a.js";
import "./InputError-CAen27BF.js";
import "./PrimaryButton-Chd5xZL9.js";
import "./SecondaryButton-BWOt3jtr.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    favorites: Array,
    negotiations: Array,
    orders: Array,
    mustVerifyEmail: Boolean,
    status: String
  },
  setup(__props) {
    const tab = ref(new URLSearchParams(window.location.search).get("tab") || "favorites");
    watch(tab, (newTab) => {
      const url = new URL(window.location);
      url.searchParams.set("tab", newTab);
      window.history.pushState({}, "", url);
    });
    const formatRp = (v) => "Rp " + new Intl.NumberFormat("id-ID").format(v);
    const formatDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";
    const removeFavorite = (product) => {
      if (confirm("Hapus produk ini dari keranjang?")) {
        router.post(route("products.toggle-favorite", product.id), {}, {
          preserveScroll: true
        });
      }
    };
    const expandedNego = ref({});
    const toggleNego = (id) => expandedNego.value[id] = !expandedNego.value[id];
    const showAcceptModal = ref(false);
    const selectedNego = ref(null);
    const confirmAcceptCounter = (nego) => {
      selectedNego.value = nego;
      showAcceptModal.value = true;
    };
    const acceptCounter = () => {
      if (!selectedNego.value) return;
      router.post(route("negotiations.accept-counter", selectedNego.value.id), {}, {
        onFinish: () => {
          showAcceptModal.value = false;
          selectedNego.value = null;
        }
      });
    };
    const negoStatusConfig = {
      pending: { label: "Menunggu Respon", color: "amber", icon: Clock },
      accepted: { label: "Diterima", color: "green", icon: CheckCircle2 },
      rejected: { label: "Ditolak", color: "red", icon: XCircle },
      countered: { label: "Counter-Offer", color: "indigo", icon: RefreshCw },
      expired: { label: "Kadaluarsa", color: "slate", icon: Clock }
    };
    const getNegoStatus = (n) => {
      if ((n.status === "pending" || n.status === "countered") && new Date(n.expires_at) < /* @__PURE__ */ new Date()) return negoStatusConfig.expired;
      return negoStatusConfig[n.status] || { label: n.status, color: "slate", icon: Info };
    };
    const expandedOrders = ref({});
    const toggleOrder = (id) => expandedOrders.value[id] = !expandedOrders.value[id];
    const showDisputeModal = ref(false);
    const selectedTransaction = ref(null);
    onMounted(() => {
    });
    const completeCod = (order) => {
      if (confirm("Konfirmasi pertemuan COD selesai?")) router.post(route("transactions.cod-complete", order.id));
    };
    const orderStatusConfig = {
      completed: { label: "Selesai ✓", color: "green", icon: CheckCircle2 },
      canceled: { label: "Batal", color: "slate", icon: XCircle },
      disputed: { label: "Sengketa", color: "red", icon: AlertCircle },
      cod_requested: { label: "COD - Tunggu", color: "amber", icon: Users },
      cod_confirmed: { label: "COD - Jadwal", color: "teal", icon: MapPin }
    };
    const getOrderStatus = (s) => orderStatusConfig[s] || { label: s, color: "slate", icon: Info };
    const badgeClass = (color) => {
      const map = {
        amber: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
        green: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400",
        red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400",
        indigo: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400",
        blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
        purple: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400",
        teal: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400",
        slate: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400"
      };
      return map[color] || map.slate;
    };
    const openDisputeModal = (order) => {
      selectedTransaction.value = order;
      showDisputeModal.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { fallbackRoute: "home" }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Aktivitas Saya</h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(_sfc_main$3, { fallbackRoute: "home" }),
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Aktivitas Saya")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Aktivitas Saya" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"${_scopeId}><div class="mx-auto flex max-w-md space-x-1 rounded-2xl bg-muted p-1.5 shadow-sm border border-border/50"${_scopeId}><button class="${ssrRenderClass([tab.value === "favorites" ? "bg-background text-primary shadow-sm ring-1 ring-black/5" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingCart), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Keranjang </button><button class="${ssrRenderClass([tab.value === "negotiations" ? "bg-background text-primary shadow-sm ring-1 ring-black/5" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Gavel), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Penawaran </button><button class="${ssrRenderClass([tab.value === "orders" ? "bg-background text-primary shadow-sm ring-1 ring-black/5" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Pesanan </button></div><div class="transition-all duration-500"${_scopeId}>`);
            if (tab.value === "favorites") {
              _push2(`<div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"${_scopeId}><div class="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative"${_scopeId}><div class="absolute -right-20 -top-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="mb-8"${_scopeId}><h3 class="text-2xl font-black tracking-tight"${_scopeId}>Keranjang Saya</h3><p class="text-muted-foreground text-sm mt-1"${_scopeId}>Daftar produk gadget impian yang Anda simpan.</p></div>`);
              if (__props.favorites.length === 0) {
                _push2(`<div class="flex flex-col items-center py-20 text-center"${_scopeId}><div class="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Heart), { class: "h-10 w-10 text-muted-foreground/30" }, null, _parent2, _scopeId));
                _push2(`</div><h4 class="text-lg font-bold text-muted-foreground"${_scopeId}>Keranjang masih kosong</h4><p class="text-sm text-muted-foreground/60 mt-1 mb-8"${_scopeId}>Yuk cari gadget impianmu dan tambahkan ke sini!</p>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("home"),
                  class: "rounded-2xl bg-primary px-8 py-3 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Eksplor Produk `);
                    } else {
                      return [
                        createTextVNode(" Eksplor Produk ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
                ssrRenderList(__props.favorites, (product) => {
                  var _a2, _b2;
                  _push2(`<div class="group relative overflow-hidden rounded-3xl border border-border bg-background transition-all hover:shadow-xl hover:border-primary/20"${_scopeId}><div class="aspect-square overflow-hidden bg-muted"${_scopeId}>`);
                  if ((_a2 = product.images) == null ? void 0 : _a2.length) {
                    _push2(`<img${ssrRenderAttr("src", `/storage/${product.images[0].image_path}`)} class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"${_scopeId}>`);
                  } else {
                    _push2(`<div class="flex h-full w-full items-center justify-center"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(Package), { class: "h-12 w-12 text-muted-foreground/20" }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  }
                  _push2(`<button class="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-red-500 shadow-lg hover:scale-110 transition-transform active:scale-90 z-20"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Trash2), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                  _push2(`</button></div><div class="p-6"${_scopeId}><div class="mb-4"${_scopeId}><div class="text-[10px] font-black uppercase tracking-widest text-primary mb-1"${_scopeId}>${ssrInterpolate((_b2 = product.category) == null ? void 0 : _b2.name)}</div>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.show", product.slug),
                    class: "text-lg font-bold leading-tight line-clamp-2 hover:text-primary transition-colors"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(product.title)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(product.title), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div><div class="flex items-center justify-between mt-auto pt-4 border-t border-border/50"${_scopeId}><div class="text-xl font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(product.price))}</div>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.show", product.slug),
                    class: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(ArrowRight), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(ArrowRight), { class: "h-5 w-5" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (tab.value === "negotiations") {
              _push2(`<div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"${_scopeId}><div class="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative"${_scopeId}><div class="mb-8"${_scopeId}><h3 class="text-2xl font-black tracking-tight"${_scopeId}>Penawaran Saya</h3><p class="text-muted-foreground text-sm mt-1"${_scopeId}>Pantau status tawar-menawar harga Anda.</p></div>`);
              if (__props.negotiations.length === 0) {
                _push2(`<div class="flex flex-col items-center py-20 text-center"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Gavel), { class: "h-16 w-16 text-muted-foreground/20 mb-4" }, null, _parent2, _scopeId));
                _push2(`<h4 class="text-lg font-bold text-muted-foreground"${_scopeId}>Belum ada penawaran aktif</h4><p class="text-sm text-muted-foreground/60 mt-1 mb-8"${_scopeId}>Nego harga bisa bikin belanja makin hemat!</p></div>`);
              } else {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(__props.negotiations, (nego) => {
                  var _a2, _b2;
                  _push2(`<div class="overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-primary/30 group"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 bg-muted/30 px-5 py-3"${_scopeId}><div class="flex items-center gap-3 text-xs font-bold text-muted-foreground"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(formatDate(nego.created_at))}</div><span class="${ssrRenderClass([badgeClass(getNegoStatus(nego).color), "rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm"])}"${_scopeId}>${ssrInterpolate(getNegoStatus(nego).label)}</span></div><div class="p-5"${_scopeId}><div class="flex gap-4"${_scopeId}><div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted"${_scopeId}>`);
                  if ((_b2 = (_a2 = nego.product) == null ? void 0 : _a2.images) == null ? void 0 : _b2.length) {
                    _push2(`<img${ssrRenderAttr("src", `/storage/${nego.product.images[0].image_path}`)} class="h-full w-full object-cover"${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="flex-1 min-w-0"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.show", nego.product.slug),
                    class: "font-bold text-base truncate block hover:text-primary transition-colors"
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
                  _push2(`<div class="flex items-center gap-6 mt-3"${_scopeId}><div${_scopeId}><div class="text-[9px] font-black text-muted-foreground uppercase"${_scopeId}>Asli</div><div class="text-xs font-bold text-muted-foreground line-through"${_scopeId}>${ssrInterpolate(formatRp(nego.product.price))}</div></div>`);
                  _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-3 w-3 text-muted-foreground/30" }, null, _parent2, _scopeId));
                  _push2(`<div${_scopeId}><div class="text-[9px] font-black text-primary uppercase"${_scopeId}>Tawaran</div><div class="text-lg font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(nego.proposed_price))}</div></div>`);
                  if (nego.counter_price) {
                    _push2(`<!--[-->`);
                    _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-3 w-3 text-indigo-300 dark:text-indigo-700" }, null, _parent2, _scopeId));
                    _push2(`<div${_scopeId}><div class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase"${_scopeId}>Counter</div><div class="text-lg font-black text-indigo-600 dark:text-indigo-400"${_scopeId}>${ssrInterpolate(formatRp(nego.counter_price))}</div></div><!--]-->`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></div><div class="mt-5 flex items-center gap-3"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("chat.new", nego.product.slug),
                    class: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-muted px-5 py-2.5 text-xs font-bold hover:bg-accent transition-colors"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(MessageSquare), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                        _push3(` Chat Seller `);
                      } else {
                        return [
                          createVNode(unref(MessageSquare), { class: "h-4 w-4" }),
                          createTextVNode(" Chat Seller ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  if (nego.status === "countered") {
                    _push2(`<button class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                    _push2(` Terima Counter-Offer </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<button class="ml-auto p-2 text-muted-foreground hover:text-foreground"${_scopeId}>`);
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(expandedNego.value[nego.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-5 w-5" }, null), _parent2, _scopeId);
                  _push2(`</button></div>`);
                  if (expandedNego.value[nego.id]) {
                    _push2(`<div class="mt-4 pt-4 border-t border-border space-y-4 animate-in slide-in-from-top-2 duration-300"${_scopeId}>`);
                    if (nego.message) {
                      _push2(`<div class="rounded-xl bg-muted/50 p-4"${_scopeId}><p class="text-[10px] font-black uppercase text-muted-foreground mb-1"${_scopeId}>Catatan Anda</p><p class="text-sm italic"${_scopeId}>&quot;${ssrInterpolate(nego.message)}&quot;</p></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (nego.status === "countered") {
                      _push2(`<div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/10 p-4 border border-indigo-100 dark:border-indigo-900/30"${_scopeId}><p class="text-[10px] font-black uppercase text-indigo-600 mb-1"${_scopeId}>Tawaran Balik Seller</p><p class="text-xl font-black text-indigo-600"${_scopeId}>${ssrInterpolate(formatRp(nego.counter_price))}</p>`);
                      if (nego.seller_message) {
                        _push2(`<p class="mt-2 text-sm italic"${_scopeId}>&quot;${ssrInterpolate(nego.seller_message)}&quot;</p>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (tab.value === "orders") {
              _push2(`<div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"${_scopeId}><div class="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative"${_scopeId}><div class="mb-8"${_scopeId}><h3 class="text-2xl font-black tracking-tight"${_scopeId}>Pesanan Saya</h3><p class="text-muted-foreground text-sm mt-1"${_scopeId}>Kelola riwayat belanja dan lacak pengiriman.</p></div>`);
              if (__props.orders.length === 0) {
                _push2(`<div class="flex flex-col items-center py-20 text-center"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(ShoppingBag), { class: "h-16 w-16 text-muted-foreground/20 mb-4" }, null, _parent2, _scopeId));
                _push2(`<h4 class="text-lg font-bold text-muted-foreground"${_scopeId}>Belum ada pesanan</h4><p class="text-sm text-muted-foreground/60 mt-1 mb-8"${_scopeId}>Gadget impian menantimu untuk diangkut!</p></div>`);
              } else {
                _push2(`<div class="space-y-5"${_scopeId}><!--[-->`);
                ssrRenderList(__props.orders, (order) => {
                  var _a2, _b2, _c2;
                  _push2(`<div class="overflow-hidden rounded-2xl border border-border bg-background hover:shadow-md transition-all"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 bg-muted/20 px-5 py-3 border-b border-border"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="font-mono text-[10px] font-bold text-muted-foreground tracking-tighter"${_scopeId}>#${ssrInterpolate(order.reference_number)}</span><span class="text-[10px] text-muted-foreground"${_scopeId}>${ssrInterpolate(formatDate(order.created_at))}</span><span class="inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/20 px-2 py-0.5 text-[8px] font-black uppercase text-orange-600"${_scopeId}>COD</span></div><span class="${ssrRenderClass([badgeClass(getOrderStatus(order.status).color), "rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider"])}"${_scopeId}>${ssrInterpolate(getOrderStatus(order.status).label)}</span></div><div class="p-5"${_scopeId}><div class="flex gap-4"${_scopeId}><div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted"${_scopeId}>`);
                  if ((_b2 = (_a2 = order.product) == null ? void 0 : _a2.images) == null ? void 0 : _b2.length) {
                    _push2(`<img${ssrRenderAttr("src", `/storage/${order.product.images[0].image_path}`)} class="h-full w-full object-cover"${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-start justify-between gap-4"${_scopeId}><div${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.show", order.product.slug),
                    class: "font-bold text-base truncate block hover:text-primary"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(order.product.title)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(order.product.title), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<div class="text-xs text-muted-foreground mt-1"${_scopeId}>Seller: ${ssrInterpolate(((_c2 = order.seller.profile) == null ? void 0 : _c2.store_name) || order.seller.name)}</div></div><div class="text-right"${_scopeId}><div class="text-[10px] font-black text-muted-foreground uppercase mb-0.5"${_scopeId}>Total Bayar</div><div class="text-lg font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(order.price))}</div></div></div></div></div><div class="mt-6 flex items-center gap-3"${_scopeId}>`);
                  if (order.status === "cod_confirmed") {
                    _push2(`<button class="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-700 transition-colors"${_scopeId}> Konfirmasi COD Selesai </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (["cod_confirmed"].includes(order.status)) {
                    _push2(`<button class="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                    _push2(` Komplain </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<button class="ml-auto flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground"${_scopeId}>${ssrInterpolate(expandedOrders.value[order.id] ? "Sembunyikan" : "Detail")} `);
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(expandedOrders.value[order.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-4 w-4" }, null), _parent2, _scopeId);
                  _push2(`</button></div>`);
                  if (expandedOrders.value[order.id]) {
                    _push2(`<div class="mt-5 pt-5 border-t border-border space-y-4 animate-in slide-in-from-top-2 duration-300"${_scopeId}><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div class="rounded-xl bg-muted/30 p-4 space-y-2"${_scopeId}><p class="text-[10px] font-black uppercase text-muted-foreground mb-2"${_scopeId}>Rincian Pembayaran</p><div class="flex justify-between text-sm"${_scopeId}><span${_scopeId}>Harga Produk</span><span class="font-bold"${_scopeId}>${ssrInterpolate(formatRp(order.price))}</span></div><div class="flex justify-between text-base font-black border-t border-border pt-2 text-primary"${_scopeId}><span${_scopeId}>Total</span><span${_scopeId}>${ssrInterpolate(formatRp(order.price))}</span></div></div></div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showDisputeModal.value,
              transaction: selectedTransaction.value,
              onClose: ($event) => showDisputeModal.value = false
            }, null, _parent2, _scopeId));
            if (showAcceptModal.value) {
              _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"${_scopeId}><div class="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"${_scopeId}></div><div class="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-card p-8 shadow-2xl border border-border animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"${_scopeId}><div class="absolute -right-10 -top-10 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl"${_scopeId}></div><div class="relative space-y-6"${_scopeId}><div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Gavel), { class: "h-8 w-8" }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h3 class="text-2xl font-black tracking-tight text-foreground"${_scopeId}>Terima Penawaran?</h3><p class="mt-2 text-sm text-muted-foreground"${_scopeId}> Anda akan menyetujui harga tawaran balik dari penjual untuk produk ini. </p></div><div class="rounded-3xl bg-muted/50 p-6 space-y-4 border border-border/50"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="h-12 w-12 overflow-hidden rounded-xl border border-border bg-background"${_scopeId}>`);
              if ((_c = (_b = (_a = selectedNego.value) == null ? void 0 : _a.product) == null ? void 0 : _b.images) == null ? void 0 : _c.length) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${selectedNego.value.product.images[0].image_path}`)} class="h-full w-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex-1 font-bold text-sm truncate"${_scopeId}>${ssrInterpolate((_e = (_d = selectedNego.value) == null ? void 0 : _d.product) == null ? void 0 : _e.title)}</div></div><div class="pt-4 border-t border-border/50"${_scopeId}><div class="flex justify-between items-center mb-2"${_scopeId}><span class="text-xs font-bold text-muted-foreground uppercase"${_scopeId}>Tawaran Anda</span><span class="text-sm font-bold text-muted-foreground line-through"${_scopeId}>${ssrInterpolate(formatRp((_f = selectedNego.value) == null ? void 0 : _f.proposed_price))}</span></div><div class="flex justify-between items-center"${_scopeId}><span class="text-xs font-bold text-indigo-600 uppercase"${_scopeId}>Harga Final</span><span class="text-2xl font-black text-indigo-600"${_scopeId}>${ssrInterpolate(formatRp((_g = selectedNego.value) == null ? void 0 : _g.counter_price))}</span></div></div></div><div class="flex flex-col gap-3"${_scopeId}><button class="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"${_scopeId}> Ya, Saya Setuju </button><button class="w-full py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"${_scopeId}> Mungkin Nanti </button></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Aktivitas Saya" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mx-auto flex max-w-md space-x-1 rounded-2xl bg-muted p-1.5 shadow-sm border border-border/50" }, [
                    createVNode("button", {
                      onClick: ($event) => tab.value = "favorites",
                      class: [tab.value === "favorites" ? "bg-background text-primary shadow-sm ring-1 ring-black/5" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"]
                    }, [
                      createVNode(unref(ShoppingCart), { class: "h-4 w-4" }),
                      createTextVNode(" Keranjang ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "negotiations",
                      class: [tab.value === "negotiations" ? "bg-background text-primary shadow-sm ring-1 ring-black/5" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"]
                    }, [
                      createVNode(unref(Gavel), { class: "h-4 w-4" }),
                      createTextVNode(" Penawaran ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "orders",
                      class: [tab.value === "orders" ? "bg-background text-primary shadow-sm ring-1 ring-black/5" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"]
                    }, [
                      createVNode(unref(ShoppingBag), { class: "h-4 w-4" }),
                      createTextVNode(" Pesanan ")
                    ], 10, ["onClick"])
                  ]),
                  createVNode("div", { class: "transition-all duration-500" }, [
                    tab.value === "favorites" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    }, [
                      createVNode("div", { class: "bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative" }, [
                        createVNode("div", { class: "absolute -right-20 -top-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl" }),
                        createVNode("div", { class: "relative z-10" }, [
                          createVNode("div", { class: "mb-8" }, [
                            createVNode("h3", { class: "text-2xl font-black tracking-tight" }, "Keranjang Saya"),
                            createVNode("p", { class: "text-muted-foreground text-sm mt-1" }, "Daftar produk gadget impian yang Anda simpan.")
                          ]),
                          __props.favorites.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-col items-center py-20 text-center"
                          }, [
                            createVNode("div", { class: "h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4" }, [
                              createVNode(unref(Heart), { class: "h-10 w-10 text-muted-foreground/30" })
                            ]),
                            createVNode("h4", { class: "text-lg font-bold text-muted-foreground" }, "Keranjang masih kosong"),
                            createVNode("p", { class: "text-sm text-muted-foreground/60 mt-1 mb-8" }, "Yuk cari gadget impianmu dan tambahkan ke sini!"),
                            createVNode(unref(Link), {
                              href: _ctx.route("home"),
                              class: "rounded-2xl bg-primary px-8 py-3 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Eksplor Produk ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.favorites, (product) => {
                              var _a2, _b2;
                              return openBlock(), createBlock("div", {
                                key: product.id,
                                class: "group relative overflow-hidden rounded-3xl border border-border bg-background transition-all hover:shadow-xl hover:border-primary/20"
                              }, [
                                createVNode("div", { class: "aspect-square overflow-hidden bg-muted" }, [
                                  ((_a2 = product.images) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${product.images[0].image_path}`,
                                    class: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex h-full w-full items-center justify-center"
                                  }, [
                                    createVNode(unref(Package), { class: "h-12 w-12 text-muted-foreground/20" })
                                  ])),
                                  createVNode("button", {
                                    onClick: ($event) => removeFavorite(product),
                                    class: "absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-red-500 shadow-lg hover:scale-110 transition-transform active:scale-90 z-20"
                                  }, [
                                    createVNode(unref(Trash2), { class: "h-5 w-5" })
                                  ], 8, ["onClick"])
                                ]),
                                createVNode("div", { class: "p-6" }, [
                                  createVNode("div", { class: "mb-4" }, [
                                    createVNode("div", { class: "text-[10px] font-black uppercase tracking-widest text-primary mb-1" }, toDisplayString((_b2 = product.category) == null ? void 0 : _b2.name), 1),
                                    createVNode(unref(Link), {
                                      href: _ctx.route("products.show", product.slug),
                                      class: "text-lg font-bold leading-tight line-clamp-2 hover:text-primary transition-colors"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-between mt-auto pt-4 border-t border-border/50" }, [
                                    createVNode("div", { class: "text-xl font-black text-primary" }, toDisplayString(formatRp(product.price)), 1),
                                    createVNode(unref(Link), {
                                      href: _ctx.route("products.show", product.slug),
                                      class: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(ArrowRight), { class: "h-5 w-5" })
                                      ]),
                                      _: 1
                                    }, 8, ["href"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ]))
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    tab.value === "negotiations" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    }, [
                      createVNode("div", { class: "bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative" }, [
                        createVNode("div", { class: "mb-8" }, [
                          createVNode("h3", { class: "text-2xl font-black tracking-tight" }, "Penawaran Saya"),
                          createVNode("p", { class: "text-muted-foreground text-sm mt-1" }, "Pantau status tawar-menawar harga Anda.")
                        ]),
                        __props.negotiations.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-col items-center py-20 text-center"
                        }, [
                          createVNode(unref(Gavel), { class: "h-16 w-16 text-muted-foreground/20 mb-4" }),
                          createVNode("h4", { class: "text-lg font-bold text-muted-foreground" }, "Belum ada penawaran aktif"),
                          createVNode("p", { class: "text-sm text-muted-foreground/60 mt-1 mb-8" }, "Nego harga bisa bikin belanja makin hemat!")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.negotiations, (nego) => {
                            var _a2, _b2;
                            return openBlock(), createBlock("div", {
                              key: nego.id,
                              class: "overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-primary/30 group"
                            }, [
                              createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 bg-muted/30 px-5 py-3" }, [
                                createVNode("div", { class: "flex items-center gap-3 text-xs font-bold text-muted-foreground" }, [
                                  createVNode(unref(Calendar), { class: "h-4 w-4" }),
                                  createTextVNode(" " + toDisplayString(formatDate(nego.created_at)), 1)
                                ]),
                                createVNode("span", {
                                  class: ["rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm", badgeClass(getNegoStatus(nego).color)]
                                }, toDisplayString(getNegoStatus(nego).label), 3)
                              ]),
                              createVNode("div", { class: "p-5" }, [
                                createVNode("div", { class: "flex gap-4" }, [
                                  createVNode("div", { class: "h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted" }, [
                                    ((_b2 = (_a2 = nego.product) == null ? void 0 : _a2.images) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: `/storage/${nego.product.images[0].image_path}`,
                                      class: "h-full w-full object-cover"
                                    }, null, 8, ["src"])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("products.show", nego.product.slug),
                                      class: "font-bold text-base truncate block hover:text-primary transition-colors"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(nego.product.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode("div", { class: "flex items-center gap-6 mt-3" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "text-[9px] font-black text-muted-foreground uppercase" }, "Asli"),
                                        createVNode("div", { class: "text-xs font-bold text-muted-foreground line-through" }, toDisplayString(formatRp(nego.product.price)), 1)
                                      ]),
                                      createVNode(unref(ArrowRight), { class: "h-3 w-3 text-muted-foreground/30" }),
                                      createVNode("div", null, [
                                        createVNode("div", { class: "text-[9px] font-black text-primary uppercase" }, "Tawaran"),
                                        createVNode("div", { class: "text-lg font-black text-primary" }, toDisplayString(formatRp(nego.proposed_price)), 1)
                                      ]),
                                      nego.counter_price ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createVNode(unref(ArrowRight), { class: "h-3 w-3 text-indigo-300 dark:text-indigo-700" }),
                                        createVNode("div", null, [
                                          createVNode("div", { class: "text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase" }, "Counter"),
                                          createVNode("div", { class: "text-lg font-black text-indigo-600 dark:text-indigo-400" }, toDisplayString(formatRp(nego.counter_price)), 1)
                                        ])
                                      ], 64)) : createCommentVNode("", true)
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "mt-5 flex items-center gap-3" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("chat.new", nego.product.slug),
                                    class: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-muted px-5 py-2.5 text-xs font-bold hover:bg-accent transition-colors"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(MessageSquare), { class: "h-4 w-4" }),
                                      createTextVNode(" Chat Seller ")
                                    ]),
                                    _: 1
                                  }, 8, ["href"]),
                                  nego.status === "countered" ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => confirmAcceptCounter(nego),
                                    class: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                                  }, [
                                    createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                                    createTextVNode(" Terima Counter-Offer ")
                                  ], 8, ["onClick"])) : createCommentVNode("", true),
                                  createVNode("button", {
                                    onClick: ($event) => toggleNego(nego.id),
                                    class: "ml-auto p-2 text-muted-foreground hover:text-foreground"
                                  }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(expandedNego.value[nego.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-5 w-5" }))
                                  ], 8, ["onClick"])
                                ]),
                                expandedNego.value[nego.id] ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-4 pt-4 border-t border-border space-y-4 animate-in slide-in-from-top-2 duration-300"
                                }, [
                                  nego.message ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "rounded-xl bg-muted/50 p-4"
                                  }, [
                                    createVNode("p", { class: "text-[10px] font-black uppercase text-muted-foreground mb-1" }, "Catatan Anda"),
                                    createVNode("p", { class: "text-sm italic" }, '"' + toDisplayString(nego.message) + '"', 1)
                                  ])) : createCommentVNode("", true),
                                  nego.status === "countered" ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "rounded-xl bg-indigo-50 dark:bg-indigo-900/10 p-4 border border-indigo-100 dark:border-indigo-900/30"
                                  }, [
                                    createVNode("p", { class: "text-[10px] font-black uppercase text-indigo-600 mb-1" }, "Tawaran Balik Seller"),
                                    createVNode("p", { class: "text-xl font-black text-indigo-600" }, toDisplayString(formatRp(nego.counter_price)), 1),
                                    nego.seller_message ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "mt-2 text-sm italic"
                                    }, '"' + toDisplayString(nego.seller_message) + '"', 1)) : createCommentVNode("", true)
                                  ])) : createCommentVNode("", true)
                                ])) : createCommentVNode("", true)
                              ])
                            ]);
                          }), 128))
                        ]))
                      ])
                    ])) : createCommentVNode("", true),
                    tab.value === "orders" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    }, [
                      createVNode("div", { class: "bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative" }, [
                        createVNode("div", { class: "mb-8" }, [
                          createVNode("h3", { class: "text-2xl font-black tracking-tight" }, "Pesanan Saya"),
                          createVNode("p", { class: "text-muted-foreground text-sm mt-1" }, "Kelola riwayat belanja dan lacak pengiriman.")
                        ]),
                        __props.orders.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-col items-center py-20 text-center"
                        }, [
                          createVNode(unref(ShoppingBag), { class: "h-16 w-16 text-muted-foreground/20 mb-4" }),
                          createVNode("h4", { class: "text-lg font-bold text-muted-foreground" }, "Belum ada pesanan"),
                          createVNode("p", { class: "text-sm text-muted-foreground/60 mt-1 mb-8" }, "Gadget impian menantimu untuk diangkut!")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-5"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.orders, (order) => {
                            var _a2, _b2, _c2;
                            return openBlock(), createBlock("div", {
                              key: order.id,
                              class: "overflow-hidden rounded-2xl border border-border bg-background hover:shadow-md transition-all"
                            }, [
                              createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 bg-muted/20 px-5 py-3 border-b border-border" }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("span", { class: "font-mono text-[10px] font-bold text-muted-foreground tracking-tighter" }, "#" + toDisplayString(order.reference_number), 1),
                                  createVNode("span", { class: "text-[10px] text-muted-foreground" }, toDisplayString(formatDate(order.created_at)), 1),
                                  createVNode("span", { class: "inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/20 px-2 py-0.5 text-[8px] font-black uppercase text-orange-600" }, "COD")
                                ]),
                                createVNode("span", {
                                  class: ["rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider", badgeClass(getOrderStatus(order.status).color)]
                                }, toDisplayString(getOrderStatus(order.status).label), 3)
                              ]),
                              createVNode("div", { class: "p-5" }, [
                                createVNode("div", { class: "flex gap-4" }, [
                                  createVNode("div", { class: "h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted" }, [
                                    ((_b2 = (_a2 = order.product) == null ? void 0 : _a2.images) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: `/storage/${order.product.images[0].image_path}`,
                                      class: "h-full w-full object-cover"
                                    }, null, 8, ["src"])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                                      createVNode("div", null, [
                                        createVNode(unref(Link), {
                                          href: _ctx.route("products.show", order.product.slug),
                                          class: "font-bold text-base truncate block hover:text-primary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(order.product.title), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["href"]),
                                        createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, "Seller: " + toDisplayString(((_c2 = order.seller.profile) == null ? void 0 : _c2.store_name) || order.seller.name), 1)
                                      ]),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode("div", { class: "text-[10px] font-black text-muted-foreground uppercase mb-0.5" }, "Total Bayar"),
                                        createVNode("div", { class: "text-lg font-black text-primary" }, toDisplayString(formatRp(order.price)), 1)
                                      ])
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "mt-6 flex items-center gap-3" }, [
                                  order.status === "cod_confirmed" ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => completeCod(order),
                                    class: "inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-700 transition-colors"
                                  }, " Konfirmasi COD Selesai ", 8, ["onClick"])) : createCommentVNode("", true),
                                  ["cod_confirmed"].includes(order.status) ? (openBlock(), createBlock("button", {
                                    key: 1,
                                    onClick: ($event) => openDisputeModal(order),
                                    class: "inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                                  }, [
                                    createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                                    createTextVNode(" Komplain ")
                                  ], 8, ["onClick"])) : createCommentVNode("", true),
                                  createVNode("button", {
                                    onClick: ($event) => toggleOrder(order.id),
                                    class: "ml-auto flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground"
                                  }, [
                                    createTextVNode(toDisplayString(expandedOrders.value[order.id] ? "Sembunyikan" : "Detail") + " ", 1),
                                    (openBlock(), createBlock(resolveDynamicComponent(expandedOrders.value[order.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-4 w-4" }))
                                  ], 8, ["onClick"])
                                ]),
                                expandedOrders.value[order.id] ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-5 pt-5 border-t border-border space-y-4 animate-in slide-in-from-top-2 duration-300"
                                }, [
                                  createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                                    createVNode("div", { class: "rounded-xl bg-muted/30 p-4 space-y-2" }, [
                                      createVNode("p", { class: "text-[10px] font-black uppercase text-muted-foreground mb-2" }, "Rincian Pembayaran"),
                                      createVNode("div", { class: "flex justify-between text-sm" }, [
                                        createVNode("span", null, "Harga Produk"),
                                        createVNode("span", { class: "font-bold" }, toDisplayString(formatRp(order.price)), 1)
                                      ]),
                                      createVNode("div", { class: "flex justify-between text-base font-black border-t border-border pt-2 text-primary" }, [
                                        createVNode("span", null, "Total"),
                                        createVNode("span", null, toDisplayString(formatRp(order.price)), 1)
                                      ])
                                    ])
                                  ])
                                ])) : createCommentVNode("", true)
                              ])
                            ]);
                          }), 128))
                        ]))
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode(_sfc_main$2, {
                show: showDisputeModal.value,
                transaction: selectedTransaction.value,
                onClose: ($event) => showDisputeModal.value = false
              }, null, 8, ["show", "transaction", "onClose"]),
              showAcceptModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
              }, [
                createVNode("div", {
                  onClick: ($event) => showAcceptModal.value = false,
                  class: "absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                }, null, 8, ["onClick"]),
                createVNode("div", { class: "relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-card p-8 shadow-2xl border border-border animate-in zoom-in-95 slide-in-from-bottom-10 duration-500" }, [
                  createVNode("div", { class: "absolute -right-10 -top-10 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl" }),
                  createVNode("div", { class: "relative space-y-6" }, [
                    createVNode("div", { class: "flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600" }, [
                      createVNode(unref(Gavel), { class: "h-8 w-8" })
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-2xl font-black tracking-tight text-foreground" }, "Terima Penawaran?"),
                      createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, " Anda akan menyetujui harga tawaran balik dari penjual untuk produk ini. ")
                    ]),
                    createVNode("div", { class: "rounded-3xl bg-muted/50 p-6 space-y-4 border border-border/50" }, [
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("div", { class: "h-12 w-12 overflow-hidden rounded-xl border border-border bg-background" }, [
                          ((_j = (_i = (_h = selectedNego.value) == null ? void 0 : _h.product) == null ? void 0 : _i.images) == null ? void 0 : _j.length) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: `/storage/${selectedNego.value.product.images[0].image_path}`,
                            class: "h-full w-full object-cover"
                          }, null, 8, ["src"])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex-1 font-bold text-sm truncate" }, toDisplayString((_l = (_k = selectedNego.value) == null ? void 0 : _k.product) == null ? void 0 : _l.title), 1)
                      ]),
                      createVNode("div", { class: "pt-4 border-t border-border/50" }, [
                        createVNode("div", { class: "flex justify-between items-center mb-2" }, [
                          createVNode("span", { class: "text-xs font-bold text-muted-foreground uppercase" }, "Tawaran Anda"),
                          createVNode("span", { class: "text-sm font-bold text-muted-foreground line-through" }, toDisplayString(formatRp((_m = selectedNego.value) == null ? void 0 : _m.proposed_price)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("span", { class: "text-xs font-bold text-indigo-600 uppercase" }, "Harga Final"),
                          createVNode("span", { class: "text-2xl font-black text-indigo-600" }, toDisplayString(formatRp((_n = selectedNego.value) == null ? void 0 : _n.counter_price)), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-col gap-3" }, [
                      createVNode("button", {
                        onClick: acceptCounter,
                        class: "w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"
                      }, " Ya, Saya Setuju "),
                      createVNode("button", {
                        onClick: ($event) => showAcceptModal.value = false,
                        class: "w-full py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                      }, " Mungkin Nanti ", 8, ["onClick"])
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Buyer/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
