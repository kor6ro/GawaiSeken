import { onMounted, ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, resolveDynamicComponent, Fragment, renderList, createCommentVNode, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import { usePage, Head, Link, router } from "@inertiajs/vue3";
import { ShoppingBag, Package, Users, CreditCard, Tag, MapPin, AlertCircle, XCircle, CheckCircle2, Truck, RefreshCw, Clock, Info, ChevronUp, ChevronDown, Calendar } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./Pagination-brVOzIHZ.js";
import _sfc_main$3 from "./DisputeForm-DotxPM7z.js";
import axios from "axios";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
import "./InputError-DDbcJ_iI.js";
import "./PrimaryButton-Chd5xZL9.js";
import "./SecondaryButton-BWOt3jtr.js";
const _sfc_main = {
  __name: "Orders",
  __ssrInlineRender: true,
  props: { orders: Object },
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
    const expandedOrders = ref({});
    ref({});
    const toggleExpand = (id) => {
      expandedOrders.value[id] = !expandedOrders.value[id];
    };
    const payNow = async (order) => {
      if (order.snap_token) {
        openSnap(order.snap_token);
      } else {
        refreshPayment(order);
      }
    };
    const openSnap = (token) => {
      window.snap.pay(token, {
        onSuccess: () => window.location.reload(),
        onPending: () => window.location.reload(),
        onError: (r) => console.error(r)
      });
    };
    const refreshPayment = async (order) => {
      try {
        const res = await axios.post(route("transactions.repay", order.id));
        if (res.data.snap_token) openSnap(res.data.snap_token);
      } catch {
        alert("Gagal memperbarui sesi pembayaran. Silakan coba lagi.");
      }
    };
    const simulatePayment = (order) => {
      if (confirm("Simulasi pembayaran sukses? (ONLY LOCAL)"))
        router.post(route("transactions.simulate-payment", order.id));
    };
    const confirmDelivery = (order) => {
      if (confirm("Konfirmasi bahwa barang sudah Anda terima dengan baik?"))
        router.post(route("transactions.deliver", order.id));
    };
    const completeCod = (order) => {
      if (confirm("Konfirmasi bahwa pertemuan COD telah selesai?"))
        router.post(route("transactions.cod-complete", order.id));
    };
    const acceptCounter = (negotiationId) => {
      if (confirm("Terima harga counter dari seller?"))
        router.post(route("negotiations.accept-counter", negotiationId));
    };
    const openDisputeModal = (transaction) => {
      selectedTransaction.value = transaction;
      showDisputeModal.value = true;
    };
    const statusConfig = {
      pending: { label: "Menunggu Pembayaran", color: "amber", icon: Clock },
      paid: { label: "Dibayar — Dalam Escrow", color: "blue", icon: CheckCircle2 },
      processing: { label: "Diproses Seller", color: "indigo", icon: RefreshCw },
      shipped: { label: "Dikirim", color: "purple", icon: Truck },
      delivered: { label: "Terima Dikonfirmasi", color: "teal", icon: CheckCircle2 },
      completed: { label: "Selesai ✓", color: "green", icon: CheckCircle2 },
      canceled: { label: "Dibatalkan", color: "slate", icon: XCircle },
      disputed: { label: "Sengketa", color: "red", icon: AlertCircle },
      cod_requested: { label: "COD — Menunggu Seller", color: "amber", icon: Users },
      cod_confirmed: { label: "COD — Jadwal Terkonfirmasi", color: "teal", icon: MapPin }
    };
    const getStatusConfig = (status) => statusConfig[status] || { label: status, color: "slate", icon: Info };
    const statusBadgeClass = (status) => {
      const colorMap = {
        amber: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
        blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
        indigo: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800",
        purple: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
        teal: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800",
        green: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
        red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
        slate: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
      };
      return colorMap[getStatusConfig(status).color] ?? colorMap.slate;
    };
    const formatRp = (v) => "Rp " + new Intl.NumberFormat("id-ID").format(v);
    const formatDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";
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
            _push2(`<div class="py-10"${_scopeId}><div class="mx-auto max-w-4xl px-4 sm:px-6"${_scopeId}><div class="mb-8 flex items-center gap-4"${_scopeId}><div class="rounded-2xl bg-primary/10 p-3 text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Riwayat Pembelian</h3><p class="text-sm text-muted-foreground"${_scopeId}>Semua transaksi Anda tercatat dengan aman di sini.</p></div></div>`);
            if (__props.orders.data.length === 0) {
              _push2(`<div class="flex flex-col items-center py-24 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Package), { class: "mb-4 h-16 w-16 text-muted-foreground/25" }, null, _parent2, _scopeId));
              _push2(`<h4 class="text-lg font-bold text-muted-foreground"${_scopeId}>Belum ada pesanan</h4><p class="mb-6 mt-1 text-sm text-muted-foreground"${_scopeId}>Yuk mulai cari gadget impianmu!</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("home"),
                class: "rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
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
              ssrRenderList(__props.orders.data, (order) => {
                var _a, _b, _c, _d, _e, _f;
                _push2(`<div class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3"${_scopeId}><div class="flex flex-wrap items-center gap-3"${_scopeId}><span class="font-mono text-[11px] font-bold text-muted-foreground tracking-widest"${_scopeId}>#${ssrInterpolate(order.reference_number)}</span><span class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(formatDate(order.created_at))}</span>`);
                if (order.payment_method === "cod") {
                  _push2(`<span class="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Users), { class: "h-2.5 w-2.5" }, null, _parent2, _scopeId));
                  _push2(` COD </span>`);
                } else {
                  _push2(`<span class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(CreditCard), { class: "h-2.5 w-2.5" }, null, _parent2, _scopeId));
                  _push2(` Rekber </span>`);
                }
                if (order.negotiation_id) {
                  _push2(`<span class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Tag), { class: "h-2.5 w-2.5" }, null, _parent2, _scopeId));
                  _push2(` Harga Nego </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><span class="${ssrRenderClass([statusBadgeClass(order.status), "rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider"])}"${_scopeId}>${ssrInterpolate(getStatusConfig(order.status).label)}</span></div><div class="p-5"${_scopeId}><div class="flex gap-4"${_scopeId}><div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted"${_scopeId}>`);
                if ((_b = (_a = order.product) == null ? void 0 : _a.images) == null ? void 0 : _b.length) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${order.product.images[0].image_path}`)} class="h-full w-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="flex h-full w-full items-center justify-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Package), { class: "h-8 w-8 text-muted-foreground/30" }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><div class="flex-1 min-w-0"${_scopeId}>`);
                if ((_c = order.product) == null ? void 0 : _c.slug) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.show", order.product.slug),
                    class: "font-bold text-base truncate hover:text-primary transition-colors block"
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
                } else {
                  _push2(`<p class="font-bold text-base text-muted-foreground italic truncate"${_scopeId}>${ssrInterpolate((_d = order.product) == null ? void 0 : _d.title)} (Dihapus)</p>`);
                }
                if ((_e = order.seller) == null ? void 0 : _e.id) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("store.show", order.seller.id),
                    class: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      var _a2, _b2, _c2, _d2;
                      if (_push3) {
                        _push3(`<div class="h-4 w-4 overflow-hidden rounded-full border border-border bg-muted"${_scopeId2}>`);
                        if ((_a2 = order.seller.profile) == null ? void 0 : _a2.store_logo) {
                          _push3(`<img${ssrRenderAttr("src", `/storage/${order.seller.profile.store_logo}`)} class="h-full w-full object-cover"${_scopeId2}>`);
                        } else {
                          _push3(`<div class="flex h-full w-full items-center justify-center text-[8px] font-bold"${_scopeId2}>${ssrInterpolate(order.seller.name.charAt(0))}</div>`);
                        }
                        _push3(`</div> ${ssrInterpolate(((_b2 = order.seller.profile) == null ? void 0 : _b2.store_name) || order.seller.name)}`);
                      } else {
                        return [
                          createVNode("div", { class: "h-4 w-4 overflow-hidden rounded-full border border-border bg-muted" }, [
                            ((_c2 = order.seller.profile) == null ? void 0 : _c2.store_logo) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: `/storage/${order.seller.profile.store_logo}`,
                              class: "h-full w-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex h-full w-full items-center justify-center text-[8px] font-bold"
                            }, toDisplayString(order.seller.name.charAt(0)), 1))
                          ]),
                          createTextVNode(" " + toDisplayString(((_d2 = order.seller.profile) == null ? void 0 : _d2.store_name) || order.seller.name), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="hidden sm:flex flex-col items-end justify-center shrink-0"${_scopeId}><div class="text-xs text-muted-foreground"${_scopeId}>Total Dibayar</div><div class="text-xl font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(order.total_amount))}</div>`);
                if (order.service_fee > 0) {
                  _push2(`<div class="text-[10px] text-muted-foreground/70"${_scopeId}>(incl. biaya layanan ${ssrInterpolate(formatRp(order.service_fee))})</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="mt-3 flex items-center justify-between sm:hidden border-t border-border pt-3"${_scopeId}><span class="text-sm font-bold text-muted-foreground"${_scopeId}>Total Dibayar</span><span class="text-lg font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(order.total_amount))}</span></div><button class="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors"${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(expandedOrders.value[order.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-4 w-4" }, null), _parent2, _scopeId);
                _push2(` ${ssrInterpolate(expandedOrders.value[order.id] ? "Sembunyikan Detail" : "Lihat Detail & Aksi")}</button>`);
                if (expandedOrders.value[order.id]) {
                  _push2(`<div class="mt-4 space-y-4"${_scopeId}><div class="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-muted-foreground"${_scopeId}>Harga Produk${ssrInterpolate(order.negotiation_id ? " (Nego)" : "")}</span><span class="font-bold"${_scopeId}>${ssrInterpolate(formatRp(order.price))}</span></div>`);
                  if (order.service_fee > 0) {
                    _push2(`<div class="flex justify-between"${_scopeId}><span class="text-muted-foreground"${_scopeId}>Biaya Layanan</span><span class="font-bold text-amber-600"${_scopeId}>${ssrInterpolate(formatRp(order.service_fee))}</span></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="flex justify-between border-t border-border pt-2"${_scopeId}><span class="font-bold"${_scopeId}>Total</span><span class="text-lg font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(order.total_amount))}</span></div></div>`);
                  if (order.payment_method === "cod" && (order.cod_location || order.cod_scheduled_at)) {
                    _push2(`<div class="rounded-xl border border-orange-200 bg-orange-50/50 p-4 dark:border-orange-800 dark:bg-orange-900/10"${_scopeId}><p class="mb-2 text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400"${_scopeId}>Detail Meetup COD</p>`);
                    if (order.cod_location) {
                      _push2(`<div class="flex items-start gap-2 text-sm"${_scopeId}>`);
                      _push2(ssrRenderComponent(unref(MapPin), { class: "mt-0.5 h-4 w-4 shrink-0 text-orange-500" }, null, _parent2, _scopeId));
                      _push2(`<span${_scopeId}>${ssrInterpolate(order.cod_location)}</span></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (order.cod_scheduled_at) {
                      _push2(`<div class="mt-1.5 flex items-center gap-2 text-sm"${_scopeId}>`);
                      _push2(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4 shrink-0 text-orange-500" }, null, _parent2, _scopeId));
                      _push2(`<span${_scopeId}>${ssrInterpolate(formatDate(order.cod_scheduled_at))}</span></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (order.tracking_number) {
                    _push2(`<div class="rounded-xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-800 dark:bg-purple-900/10"${_scopeId}><p class="mb-2 text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400"${_scopeId}>Info Pengiriman</p><div class="flex items-center gap-2 text-sm"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(Truck), { class: "h-4 w-4 text-purple-500" }, null, _parent2, _scopeId));
                    _push2(`<span class="font-bold"${_scopeId}>${ssrInterpolate(order.courier_name)}</span></div><div class="mt-1 flex items-center gap-2"${_scopeId}><span class="text-xs text-muted-foreground"${_scopeId}>No. Resi:</span><span class="font-mono text-sm font-bold tracking-wider"${_scopeId}>${ssrInterpolate(order.tracking_number)}</span></div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (order.seller_notes) {
                    _push2(`<div class="rounded-xl border border-border bg-muted/30 p-4 text-sm"${_scopeId}><p class="mb-1 text-xs font-bold text-muted-foreground uppercase tracking-widest"${_scopeId}>Catatan Seller</p><p${_scopeId}>${ssrInterpolate(order.seller_notes)}</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (((_f = order.negotiation) == null ? void 0 : _f.status) === "countered") {
                    _push2(`<div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-800 dark:bg-indigo-900/10"${_scopeId}><p class="mb-2 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400"${_scopeId}>Seller Memberi Counter-Offer</p><p class="text-sm text-muted-foreground"${_scopeId}>Seller menawarkan harga:</p><p class="text-xl font-black text-indigo-600"${_scopeId}>${ssrInterpolate(formatRp(order.negotiation.counter_price))}</p>`);
                    if (order.negotiation.seller_message) {
                      _push2(`<p class="mt-1 text-xs italic text-muted-foreground"${_scopeId}>&quot;${ssrInterpolate(order.negotiation.seller_message)}&quot;</p>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<button class="mt-3 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"${_scopeId}> Terima Counter-Offer &amp; Lanjut Checkout </button></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="flex flex-wrap gap-2"${_scopeId}>`);
                  if (order.payment_method === "rekber") {
                    _push2(`<!--[-->`);
                    if (order.status === "pending") {
                      _push2(`<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"${_scopeId}>`);
                      _push2(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                      _push2(` Bayar Sekarang </button>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (order.status === "pending" && _ctx.$page.props.app_env === "local") {
                      _push2(`<button class="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-colors"${_scopeId}> ⚡ Simulasi Bayar </button>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (order.status === "shipped") {
                      _push2(`<button class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors"${_scopeId}>`);
                      _push2(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                      _push2(` Konfirmasi Terima Barang </button>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<!--]-->`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (order.status === "cod_confirmed") {
                    _push2(`<button class="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-colors"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(Users), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                    _push2(` Konfirmasi COD Selesai </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (["shipped", "paid", "cod_confirmed"].includes(order.status)) {
                    _push2(`<button class="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors dark:bg-red-900/10 dark:border-red-800"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                    _push2(` Ajukan Komplain </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--><div class="mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                links: __props.orders.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showDisputeModal.value,
              transaction: selectedTransaction.value,
              onClose: ($event) => showDisputeModal.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-10" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 sm:px-6" }, [
                  createVNode("div", { class: "mb-8 flex items-center gap-4" }, [
                    createVNode("div", { class: "rounded-2xl bg-primary/10 p-3 text-primary" }, [
                      createVNode(unref(ShoppingBag), { class: "h-6 w-6" })
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-lg font-bold" }, "Riwayat Pembelian"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Semua transaksi Anda tercatat dengan aman di sini.")
                    ])
                  ]),
                  __props.orders.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col items-center py-24 text-center"
                  }, [
                    createVNode(unref(Package), { class: "mb-4 h-16 w-16 text-muted-foreground/25" }),
                    createVNode("h4", { class: "text-lg font-bold text-muted-foreground" }, "Belum ada pesanan"),
                    createVNode("p", { class: "mb-6 mt-1 text-sm text-muted-foreground" }, "Yuk mulai cari gadget impianmu!"),
                    createVNode(unref(Link), {
                      href: _ctx.route("home"),
                      class: "rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
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
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.orders.data, (order) => {
                      var _a, _b, _c, _d, _e;
                      return openBlock(), createBlock("div", {
                        key: order.id,
                        class: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                      }, [
                        createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3" }, [
                          createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                            createVNode("span", { class: "font-mono text-[11px] font-bold text-muted-foreground tracking-widest" }, "#" + toDisplayString(order.reference_number), 1),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(formatDate(order.created_at)), 1),
                            order.payment_method === "cod" ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                            }, [
                              createVNode(unref(Users), { class: "h-2.5 w-2.5" }),
                              createTextVNode(" COD ")
                            ])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            }, [
                              createVNode(unref(CreditCard), { class: "h-2.5 w-2.5" }),
                              createTextVNode(" Rekber ")
                            ])),
                            order.negotiation_id ? (openBlock(), createBlock("span", {
                              key: 2,
                              class: "inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                            }, [
                              createVNode(unref(Tag), { class: "h-2.5 w-2.5" }),
                              createTextVNode(" Harga Nego ")
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("span", {
                            class: ["rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider", statusBadgeClass(order.status)]
                          }, toDisplayString(getStatusConfig(order.status).label), 3)
                        ]),
                        createVNode("div", { class: "p-5" }, [
                          createVNode("div", { class: "flex gap-4" }, [
                            createVNode("div", { class: "h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted" }, [
                              ((_b = (_a = order.product) == null ? void 0 : _a.images) == null ? void 0 : _b.length) ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: `/storage/${order.product.images[0].image_path}`,
                                class: "h-full w-full object-cover"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex h-full w-full items-center justify-center"
                              }, [
                                createVNode(unref(Package), { class: "h-8 w-8 text-muted-foreground/30" })
                              ]))
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              ((_c = order.product) == null ? void 0 : _c.slug) ? (openBlock(), createBlock(unref(Link), {
                                key: 0,
                                href: _ctx.route("products.show", order.product.slug),
                                class: "font-bold text-base truncate hover:text-primary transition-colors block"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(order.product.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])) : (openBlock(), createBlock("p", {
                                key: 1,
                                class: "font-bold text-base text-muted-foreground italic truncate"
                              }, toDisplayString((_d = order.product) == null ? void 0 : _d.title) + " (Dihapus)", 1)),
                              ((_e = order.seller) == null ? void 0 : _e.id) ? (openBlock(), createBlock(unref(Link), {
                                key: 2,
                                href: _ctx.route("store.show", order.seller.id),
                                class: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
                              }, {
                                default: withCtx(() => {
                                  var _a2, _b2;
                                  return [
                                    createVNode("div", { class: "h-4 w-4 overflow-hidden rounded-full border border-border bg-muted" }, [
                                      ((_a2 = order.seller.profile) == null ? void 0 : _a2.store_logo) ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: `/storage/${order.seller.profile.store_logo}`,
                                        class: "h-full w-full object-cover"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "flex h-full w-full items-center justify-center text-[8px] font-bold"
                                      }, toDisplayString(order.seller.name.charAt(0)), 1))
                                    ]),
                                    createTextVNode(" " + toDisplayString(((_b2 = order.seller.profile) == null ? void 0 : _b2.store_name) || order.seller.name), 1)
                                  ];
                                }),
                                _: 2
                              }, 1032, ["href"])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "hidden sm:flex flex-col items-end justify-center shrink-0" }, [
                              createVNode("div", { class: "text-xs text-muted-foreground" }, "Total Dibayar"),
                              createVNode("div", { class: "text-xl font-black text-primary" }, toDisplayString(formatRp(order.total_amount)), 1),
                              order.service_fee > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-[10px] text-muted-foreground/70"
                              }, "(incl. biaya layanan " + toDisplayString(formatRp(order.service_fee)) + ")", 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "mt-3 flex items-center justify-between sm:hidden border-t border-border pt-3" }, [
                            createVNode("span", { class: "text-sm font-bold text-muted-foreground" }, "Total Dibayar"),
                            createVNode("span", { class: "text-lg font-black text-primary" }, toDisplayString(formatRp(order.total_amount)), 1)
                          ]),
                          createVNode("button", {
                            onClick: ($event) => toggleExpand(order.id),
                            class: "mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors"
                          }, [
                            (openBlock(), createBlock(resolveDynamicComponent(expandedOrders.value[order.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-4 w-4" })),
                            createTextVNode(" " + toDisplayString(expandedOrders.value[order.id] ? "Sembunyikan Detail" : "Lihat Detail & Aksi"), 1)
                          ], 8, ["onClick"]),
                          createVNode(Transition, {
                            "enter-from-class": "opacity-0 -translate-y-2",
                            "leave-to-class": "opacity-0 -translate-y-2",
                            "enter-active-class": "transition-all duration-200",
                            "leave-active-class": "transition-all duration-200"
                          }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                expandedOrders.value[order.id] ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-4 space-y-4"
                                }, [
                                  createVNode("div", { class: "rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2" }, [
                                    createVNode("div", { class: "flex justify-between" }, [
                                      createVNode("span", { class: "text-muted-foreground" }, "Harga Produk" + toDisplayString(order.negotiation_id ? " (Nego)" : ""), 1),
                                      createVNode("span", { class: "font-bold" }, toDisplayString(formatRp(order.price)), 1)
                                    ]),
                                    order.service_fee > 0 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex justify-between"
                                    }, [
                                      createVNode("span", { class: "text-muted-foreground" }, "Biaya Layanan"),
                                      createVNode("span", { class: "font-bold text-amber-600" }, toDisplayString(formatRp(order.service_fee)), 1)
                                    ])) : createCommentVNode("", true),
                                    createVNode("div", { class: "flex justify-between border-t border-border pt-2" }, [
                                      createVNode("span", { class: "font-bold" }, "Total"),
                                      createVNode("span", { class: "text-lg font-black text-primary" }, toDisplayString(formatRp(order.total_amount)), 1)
                                    ])
                                  ]),
                                  order.payment_method === "cod" && (order.cod_location || order.cod_scheduled_at) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "rounded-xl border border-orange-200 bg-orange-50/50 p-4 dark:border-orange-800 dark:bg-orange-900/10"
                                  }, [
                                    createVNode("p", { class: "mb-2 text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400" }, "Detail Meetup COD"),
                                    order.cod_location ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-start gap-2 text-sm"
                                    }, [
                                      createVNode(unref(MapPin), { class: "mt-0.5 h-4 w-4 shrink-0 text-orange-500" }),
                                      createVNode("span", null, toDisplayString(order.cod_location), 1)
                                    ])) : createCommentVNode("", true),
                                    order.cod_scheduled_at ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "mt-1.5 flex items-center gap-2 text-sm"
                                    }, [
                                      createVNode(unref(Calendar), { class: "h-4 w-4 shrink-0 text-orange-500" }),
                                      createVNode("span", null, toDisplayString(formatDate(order.cod_scheduled_at)), 1)
                                    ])) : createCommentVNode("", true)
                                  ])) : createCommentVNode("", true),
                                  order.tracking_number ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "rounded-xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-800 dark:bg-purple-900/10"
                                  }, [
                                    createVNode("p", { class: "mb-2 text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400" }, "Info Pengiriman"),
                                    createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                                      createVNode(unref(Truck), { class: "h-4 w-4 text-purple-500" }),
                                      createVNode("span", { class: "font-bold" }, toDisplayString(order.courier_name), 1)
                                    ]),
                                    createVNode("div", { class: "mt-1 flex items-center gap-2" }, [
                                      createVNode("span", { class: "text-xs text-muted-foreground" }, "No. Resi:"),
                                      createVNode("span", { class: "font-mono text-sm font-bold tracking-wider" }, toDisplayString(order.tracking_number), 1)
                                    ])
                                  ])) : createCommentVNode("", true),
                                  order.seller_notes ? (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "rounded-xl border border-border bg-muted/30 p-4 text-sm"
                                  }, [
                                    createVNode("p", { class: "mb-1 text-xs font-bold text-muted-foreground uppercase tracking-widest" }, "Catatan Seller"),
                                    createVNode("p", null, toDisplayString(order.seller_notes), 1)
                                  ])) : createCommentVNode("", true),
                                  ((_a2 = order.negotiation) == null ? void 0 : _a2.status) === "countered" ? (openBlock(), createBlock("div", {
                                    key: 3,
                                    class: "rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-800 dark:bg-indigo-900/10"
                                  }, [
                                    createVNode("p", { class: "mb-2 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400" }, "Seller Memberi Counter-Offer"),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, "Seller menawarkan harga:"),
                                    createVNode("p", { class: "text-xl font-black text-indigo-600" }, toDisplayString(formatRp(order.negotiation.counter_price)), 1),
                                    order.negotiation.seller_message ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "mt-1 text-xs italic text-muted-foreground"
                                    }, '"' + toDisplayString(order.negotiation.seller_message) + '"', 1)) : createCommentVNode("", true),
                                    createVNode("button", {
                                      onClick: ($event) => acceptCounter(order.negotiation.id),
                                      class: "mt-3 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
                                    }, " Terima Counter-Offer & Lanjut Checkout ", 8, ["onClick"])
                                  ])) : createCommentVNode("", true),
                                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                    order.payment_method === "rekber" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      order.status === "pending" ? (openBlock(), createBlock("button", {
                                        key: 0,
                                        onClick: ($event) => payNow(order),
                                        class: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                                      }, [
                                        createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                        createTextVNode(" Bayar Sekarang ")
                                      ], 8, ["onClick"])) : createCommentVNode("", true),
                                      order.status === "pending" && _ctx.$page.props.app_env === "local" ? (openBlock(), createBlock("button", {
                                        key: 1,
                                        onClick: ($event) => simulatePayment(order),
                                        class: "inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-colors"
                                      }, " ⚡ Simulasi Bayar ", 8, ["onClick"])) : createCommentVNode("", true),
                                      order.status === "shipped" ? (openBlock(), createBlock("button", {
                                        key: 2,
                                        onClick: ($event) => confirmDelivery(order),
                                        class: "inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors"
                                      }, [
                                        createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                                        createTextVNode(" Konfirmasi Terima Barang ")
                                      ], 8, ["onClick"])) : createCommentVNode("", true)
                                    ], 64)) : createCommentVNode("", true),
                                    order.status === "cod_confirmed" ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      onClick: ($event) => completeCod(order),
                                      class: "inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-colors"
                                    }, [
                                      createVNode(unref(Users), { class: "h-4 w-4" }),
                                      createTextVNode(" Konfirmasi COD Selesai ")
                                    ], 8, ["onClick"])) : createCommentVNode("", true),
                                    ["shipped", "paid", "cod_confirmed"].includes(order.status) ? (openBlock(), createBlock("button", {
                                      key: 2,
                                      onClick: ($event) => openDisputeModal(order),
                                      class: "inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors dark:bg-red-900/10 dark:border-red-800"
                                    }, [
                                      createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                                      createTextVNode(" Ajukan Komplain ")
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ])) : createCommentVNode("", true)
                              ];
                            }),
                            _: 2
                          }, 1024)
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
