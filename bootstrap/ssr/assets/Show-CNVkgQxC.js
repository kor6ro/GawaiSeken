import { ref, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, useForm, Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import { Home, ChevronRight, ExternalLink, Globe, ArrowRight, ShieldCheck, MapPin, Store, Edit3, Clock, HandCoins, Truck, Users, MessageCircle, Heart, Flag, AlertTriangle } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./Modal-C0YBTj_6.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    product: Object,
    myNegotiation: Object,
    myActiveTransaction: Object
  },
  setup(__props) {
    const props = __props;
    const auth = usePage().props.auth;
    const activeImage = ref(
      props.product.images.length > 0 ? `/storage/${props.product.images[0].image_path}` : "/images/placeholder-product.png"
    );
    const showRemoveModal = ref(false);
    const showBuyModal = ref(false);
    const showNegoModal = ref(false);
    const showCodModal = ref(false);
    const rekberForm = useForm({ payment_method: "rekber", shipping_address: "", negotiation_id: null });
    const codForm = useForm({ payment_method: "cod", cod_location: "", cod_scheduled_at: "", negotiation_id: null });
    const negoForm = useForm({ proposed_price: Math.floor(Number(props.product.price)), message: "" });
    const submitRekber = () => {
      var _a;
      if (((_a = props.myNegotiation) == null ? void 0 : _a.status) === "accepted") rekberForm.negotiation_id = props.myNegotiation.id;
      rekberForm.post(route("transactions.checkout", props.product.slug), {
        onSuccess: () => {
          showBuyModal.value = false;
        }
      });
    };
    const submitCod = () => {
      var _a;
      if (((_a = props.myNegotiation) == null ? void 0 : _a.status) === "accepted") codForm.negotiation_id = props.myNegotiation.id;
      codForm.post(route("transactions.checkout", props.product.slug), {
        onSuccess: () => {
          showCodModal.value = false;
        }
      });
    };
    const submitNego = () => {
      negoForm.post(route("negotiations.store", props.product.slug), {
        onSuccess: () => {
          showNegoModal.value = false;
        }
      });
    };
    const acceptCounter = () => {
      router.post(route("negotiations.accept-counter", props.myNegotiation.id), {}, { preserveScroll: true });
    };
    const isFavorited = computed(() => {
      var _a, _b;
      return (_b = (_a = auth.user) == null ? void 0 : _a.favorites) == null ? void 0 : _b.includes(props.product.id);
    });
    const toggleFavorite = () => {
      if (!auth.user) {
        router.get(route("login"));
        return;
      }
      if (isFavorited.value) showRemoveModal.value = true;
      else submitToggle();
    };
    const submitToggle = () => {
      showRemoveModal.value = false;
      router.post(route("products.toggle-favorite", props.product.id), {}, { preserveScroll: true });
    };
    const reportProduct = () => {
      if (!auth.user) {
        router.get(route("login"));
        return;
      }
      const reason = prompt("Alasan melaporkan produk ini?");
      if (reason) router.post(route("products.report", props.product.id), { reason }, { preserveScroll: true });
    };
    const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);
    const specifications = computed(() => {
      if (!props.product.specifications) return [];
      return Object.entries(props.product.specifications).filter(([k, v]) => v !== null && v !== "" && k !== "sub_type").map(([k, v]) => ({
        label: k.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value: Array.isArray(v) ? v.join(", ") : v
      }));
    });
    const negoStatusLabel = computed(() => {
      var _a;
      const s = (_a = props.myNegotiation) == null ? void 0 : _a.status;
      if (s === "pending") return { text: "Menunggu respons seller", color: "text-amber-500" };
      if (s === "countered") return { text: "Seller kirim counter-offer!", color: "text-blue-500" };
      if (s === "accepted") return { text: "Penawaran diterima! Lanjutkan checkout", color: "text-emerald-600" };
      return null;
    });
    const isOwner = computed(() => {
      var _a;
      return ((_a = auth.user) == null ? void 0 : _a.id) === props.product.user_id;
    });
    const hasActiveTransaction = computed(() => !!props.myActiveTransaction);
    computed(() => route("transactions.checkout", props.product.slug));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: __props.product.title
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-screen bg-background py-12"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><nav class="mb-8 flex text-sm font-medium" aria-label="Breadcrumb"${_scopeId}><ol class="inline-flex items-center space-x-1 md:space-x-3"${_scopeId}><li class="inline-flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("home"),
              class: "flex items-center text-muted-foreground transition-colors hover:text-primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Home), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Beranda `);
                } else {
                  return [
                    createVNode(unref(Home), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Beranda ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}><div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-1 text-muted-foreground md:ml-2"${_scopeId}>${ssrInterpolate((_a = __props.product.category) == null ? void 0 : _a.name)}</span></div></li></ol></nav><div class="grid grid-cols-1 gap-12 lg:grid-cols-12"${_scopeId}><div class="space-y-6 lg:col-span-7"${_scopeId}><div class="relative aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl transition-all duration-500 hover:shadow-primary/5 md:aspect-[4/3]"${_scopeId}><img${ssrRenderAttr("src", activeImage.value)}${ssrRenderAttr("alt", __props.product.title)} loading="lazy" class="h-full w-full object-cover transition-all duration-700"${_scopeId}><div class="absolute left-6 top-6 flex flex-col gap-2"${_scopeId}>`);
            if (__props.product.reference_url) {
              _push2(`<div class="flex"${_scopeId}><a${ssrRenderAttr("href", __props.product.reference_url)} target="_blank" class="flex items-center gap-2 rounded-xl bg-primary/90 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-lg backdrop-blur-md transition-all hover:bg-primary"${_scopeId}>${ssrInterpolate(__props.product.brand)} `);
              _push2(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              _push2(`</a></div>`);
            } else {
              _push2(`<span class="rounded-xl bg-primary/90 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-lg backdrop-blur-md"${_scopeId}>${ssrInterpolate(__props.product.brand)}</span>`);
            }
            _push2(`</div></div>`);
            if (__props.product.images.length > 1) {
              _push2(`<div class="grid grid-cols-4 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.images, (image) => {
                _push2(`<button class="${ssrRenderClass([
                  activeImage.value === `/storage/${image.image_path}` ? "border-primary shadow-lg" : "border-transparent opacity-70 hover:border-muted-foreground/30 hover:opacity-100",
                  "group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300"
                ])}"${_scopeId}><img${ssrRenderAttr("src", `/storage/${image.image_path}`)} loading="lazy" class="h-full w-full object-cover transition-transform group-hover:scale-110"${_scopeId}></button>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="lg:col-span-5"${_scopeId}><div class="sticky top-8 rounded-[2.5rem] border border-border bg-card p-8 text-card-foreground shadow-xl md:p-10"${_scopeId}><div class="mb-8"${_scopeId}><div class="mb-4 flex flex-wrap items-center gap-3"${_scopeId}><span class="rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"${_scopeId}>${ssrInterpolate((_b = __props.product.category) == null ? void 0 : _b.name)}</span><span class="${ssrRenderClass([
              __props.product.condition_badge_color === "green" ? "bg-emerald-500" : __props.product.condition_badge_color === "yellow" ? "bg-amber-500" : "bg-slate-400",
              "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
            ])}"${_scopeId}>${ssrInterpolate(__props.product.condition_label)}</span>`);
            if (__props.product.is_cod) {
              _push2(`<span class="rounded-full bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"${_scopeId}>COD</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.product.is_negotiable) {
              _push2(`<span class="rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"${_scopeId}>Bisa Nego</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h1 class="mb-4 text-3xl font-black leading-tight md:text-4xl"${_scopeId}>${ssrInterpolate(__props.product.title)}</h1><div class="flex items-baseline gap-2"${_scopeId}><span class="text-4xl font-black text-primary"${_scopeId}>Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.product.price))}</span></div></div><div class="space-y-10"${_scopeId}>`);
            if (specifications.value.length > 0) {
              _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(specifications.value, (spec) => {
                _push2(`<div class="group rounded-2xl border border-border bg-muted/50 p-4 transition-colors hover:bg-muted"${_scopeId}><span class="mb-1 block text-[10px] font-bold uppercase tracking-tighter text-muted-foreground"${_scopeId}>${ssrInterpolate(spec.label)}</span><span class="block text-sm font-bold"${_scopeId}>${ssrInterpolate(spec.value)}</span></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.product.reference_url) {
              _push2(`<a${ssrRenderAttr("href", __props.product.reference_url)} target="_blank" class="group flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-muted py-4 text-sm font-black shadow-sm transition-all hover:bg-accent"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Globe), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(` Lihat Referensi Eksternal `);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 transition-transform group-hover:translate-x-1" }, null, _parent2, _scopeId));
              _push2(`</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><h3 class="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground"${_scopeId}><div class="h-4 w-1.5 rounded-full bg-primary"${_scopeId}></div> Deskripsi Produk </h3><div class="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"${_scopeId}>${ssrInterpolate(__props.product.description)}</div></div><div class="group relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-6"${_scopeId}><div class="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-700 group-hover:scale-150"${_scopeId}></div><div class="relative z-10 mb-6 flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="relative"${_scopeId}><div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary overflow-hidden shadow-xl transition-transform group-hover:scale-105"${_scopeId}>`);
            if ((_d = (_c = __props.product.store) == null ? void 0 : _c.profile) == null ? void 0 : _d.store_logo) {
              _push2(`<img${ssrRenderAttr("src", `/storage/${__props.product.store.profile.store_logo}`)} class="h-full w-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<span class="text-xl font-black text-primary-foreground"${_scopeId}>${ssrInterpolate((((_f = (_e = __props.product.store) == null ? void 0 : _e.profile) == null ? void 0 : _f.store_name) ?? ((_g = __props.product.store) == null ? void 0 : _g.name)).charAt(0).toUpperCase())}</span>`);
            }
            _push2(`</div>`);
            if (((_i = (_h = __props.product.store) == null ? void 0 : _h.profile) == null ? void 0 : _i.is_ktp_verified) && ((_j = __props.product.store) == null ? void 0 : _j.transactions_as_seller_count) >= 5) {
              _push2(`<div class="absolute -bottom-1 -right-1 rounded-lg border-2 border-card bg-amber-400 p-1 text-white shadow-lg ring-1 ring-amber-500/20"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShieldCheck), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><div class="flex items-center gap-2"${_scopeId}><h4 class="text-lg font-black"${_scopeId}>${ssrInterpolate(((_l = (_k = __props.product.store) == null ? void 0 : _k.profile) == null ? void 0 : _l.store_name) ?? ((_m = __props.product.store) == null ? void 0 : _m.name))}</h4>`);
            if (((_o = (_n = __props.product.store) == null ? void 0 : _n.profile) == null ? void 0 : _o.is_ktp_verified) && ((_p = __props.product.store) == null ? void 0 : _p.transactions_as_seller_count) >= 5) {
              _push2(`<div class="rounded bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-600"${_scopeId}> Premium Seller </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-1 flex items-center text-xs text-muted-foreground"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MapPin), { class: "mr-1 h-3 w-3" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(((_r = (_q = __props.product.store) == null ? void 0 : _q.profile) == null ? void 0 : _r.city) || "Lokasi tidak diisi")}</div></div></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("store.show", ((_s = __props.product.store) == null ? void 0 : _s.id) ?? __props.product.user_id),
              class: "rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:bg-accent group-hover:border-primary/30"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Store), { class: "h-5 w-5 transition-transform group-hover:scale-110" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Store), { class: "h-5 w-5 transition-transform group-hover:scale-110" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (isOwner.value) {
              _push2(`<div class="flex gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("products.edit", __props.product.slug),
                class: "flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-sm font-black text-accent-foreground shadow-xl transition-all hover:bg-accent/80"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit3), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                    _push3(` Edit Produk `);
                  } else {
                    return [
                      createVNode(unref(Edit3), { class: "h-5 w-5" }),
                      createTextVNode(" Edit Produk ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (!unref(auth).user) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("login"),
                class: "flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black text-primary-foreground shadow-xl"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Login untuk Beli / Chat `);
                  } else {
                    return [
                      createTextVNode(" Login untuk Beli / Chat ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<div class="space-y-3"${_scopeId}>`);
              if (hasActiveTransaction.value) {
                _push2(`<div class="flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm text-amber-700 dark:text-amber-400"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Clock), { class: "h-5 w-5 shrink-0" }, null, _parent2, _scopeId));
                _push2(`<div${_scopeId}><p class="font-black"${_scopeId}>Transaksi Sedang Berjalan</p><p class="text-xs mt-0.5"${_scopeId}>Anda sudah memiliki transaksi aktif untuk produk ini.</p></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("profile.orders"),
                  class: "ml-auto shrink-0 text-xs font-black underline"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Lihat`);
                    } else {
                      return [
                        createTextVNode("Lihat")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.myNegotiation && !hasActiveTransaction.value) {
                _push2(`<div class="${ssrRenderClass([{
                  "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700": __props.myNegotiation.status === "pending",
                  "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700": __props.myNegotiation.status === "countered",
                  "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700": __props.myNegotiation.status === "accepted"
                }, "rounded-2xl border p-4 space-y-2"])}"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(HandCoins), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                _push2(`<span class="${ssrRenderClass([(_t = negoStatusLabel.value) == null ? void 0 : _t.color, "text-xs font-black uppercase tracking-wider"])}"${_scopeId}>${ssrInterpolate((_u = negoStatusLabel.value) == null ? void 0 : _u.text)}</span></div><div class="text-xs space-y-1"${_scopeId}><p${_scopeId}>Penawaran Anda: <strong${_scopeId}>Rp ${ssrInterpolate(fmt(__props.myNegotiation.proposed_price))}</strong></p>`);
                if (__props.myNegotiation.counter_price) {
                  _push2(`<p${_scopeId}>Counter Seller: <strong${_scopeId}>Rp ${ssrInterpolate(fmt(__props.myNegotiation.counter_price))}</strong></p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.myNegotiation.agreed_price) {
                  _push2(`<p${_scopeId}>Harga Disepakati: <strong class="text-emerald-600"${_scopeId}>Rp ${ssrInterpolate(fmt(__props.myNegotiation.agreed_price))}</strong></p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (__props.myNegotiation.status === "countered") {
                  _push2(`<button class="w-full rounded-xl bg-blue-500 py-2.5 text-xs font-black text-white hover:bg-blue-600 transition"${_scopeId}> Terima Counter-Offer Seller </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!hasActiveTransaction.value) {
                _push2(`<div class="flex flex-col gap-2"${_scopeId}><button class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black text-primary-foreground shadow-xl transition hover:bg-primary/90 active:scale-95"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Truck), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                _push2(` Beli via Rekber `);
                if (((_v = __props.myNegotiation) == null ? void 0 : _v.status) === "accepted") {
                  _push2(`<span class="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px]"${_scopeId}>Harga Nego</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button>`);
                if (__props.product.is_cod) {
                  _push2(`<button class="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-blue-500 bg-blue-500/10 py-4 text-sm font-black text-blue-600 dark:text-blue-400 transition hover:bg-blue-500/20 active:scale-95"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Users), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                  _push2(` Beli via COD (Ketemu Langsung) </button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.product.is_negotiable && !__props.myNegotiation) {
                  _push2(`<button class="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-indigo-400 bg-indigo-400/10 py-4 text-sm font-black text-indigo-600 dark:text-indigo-400 transition hover:bg-indigo-400/20 active:scale-95"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(HandCoins), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                  _push2(` Tawar Harga </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("chat.initiate", __props.product.slug),
                  method: "post",
                  as: "button",
                  class: "flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm font-bold text-muted-foreground transition hover:bg-accent active:scale-95"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(MessageCircle), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(` Chat Penjual `);
                    } else {
                      return [
                        createVNode(unref(MessageCircle), { class: "h-4 w-4" }),
                        createTextVNode(" Chat Penjual ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex items-center gap-2 pt-1"${_scopeId}><button class="${ssrRenderClass([isFavorited.value ? "border-rose-200 bg-rose-50 text-rose-500" : "border-border text-muted-foreground hover:text-rose-500", "flex items-center justify-center rounded-2xl border-2 p-3 transition active:scale-90"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Heart), {
                class: ["h-5 w-5", { "fill-current": isFavorited.value }]
              }, null, _parent2, _scopeId));
              _push2(`</button><button class="flex flex-1 items-center justify-center gap-1 py-2 text-xs font-bold text-muted-foreground hover:text-amber-600 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Flag), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              _push2(` Laporkan produk ini </button></div></div>`);
            }
            _push2(`</div></div></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showRemoveModal.value,
              onClose: ($event) => showRemoveModal.value = false,
              maxWidth: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="rounded-2xl bg-white p-6 dark:bg-slate-900"${_scopeId2}><div class="mb-4 flex justify-center"${_scopeId2}><div class="rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500/20"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(AlertTriangle), { class: "h-8 w-8" }, null, _parent3, _scopeId2));
                  _push3(`</div></div><h3 class="mb-2 text-center text-lg font-black text-slate-900 dark:text-white"${_scopeId2}>Hapus dari Favorit?</h3><div class="flex gap-3 mt-4"${_scopeId2}><button class="flex-1 rounded-xl bg-slate-100 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"${_scopeId2}>Batal</button><button class="flex-1 rounded-xl bg-red-500 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"${_scopeId2}>Ya, Hapus</button></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "rounded-2xl bg-white p-6 dark:bg-slate-900" }, [
                      createVNode("div", { class: "mb-4 flex justify-center" }, [
                        createVNode("div", { class: "rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500/20" }, [
                          createVNode(unref(AlertTriangle), { class: "h-8 w-8" })
                        ])
                      ]),
                      createVNode("h3", { class: "mb-2 text-center text-lg font-black text-slate-900 dark:text-white" }, "Hapus dari Favorit?"),
                      createVNode("div", { class: "flex gap-3 mt-4" }, [
                        createVNode("button", {
                          onClick: ($event) => showRemoveModal.value = false,
                          class: "flex-1 rounded-xl bg-slate-100 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                        }, "Batal", 8, ["onClick"]),
                        createVNode("button", {
                          onClick: submitToggle,
                          class: "flex-1 rounded-xl bg-red-500 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
                        }, "Ya, Hapus")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showBuyModal.value,
              onClose: ($event) => showBuyModal.value = false,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<div class="bg-card text-card-foreground rounded-2xl p-6"${_scopeId2}><h3 class="text-xl font-black mb-1"${_scopeId2}>Beli via Rekening Bersama</h3><p class="text-sm text-muted-foreground mb-5"${_scopeId2}>Dana Anda ditahan hingga barang diterima.</p><div class="rounded-2xl bg-muted/50 border border-border p-4 mb-5 space-y-1 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Harga Produk</span><span class="font-bold"${_scopeId2}>Rp ${ssrInterpolate(fmt(((_a2 = __props.myNegotiation) == null ? void 0 : _a2.status) === "accepted" ? __props.myNegotiation.agreed_price : __props.product.price))}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Biaya Layanan</span><span class="text-xs text-muted-foreground"${_scopeId2}>Rp 5.000 + 1% (maks Rp 25.000)</span></div></div><form class="space-y-4"${_scopeId2}><div${_scopeId2}><label class="block text-xs font-black uppercase tracking-wider mb-1.5"${_scopeId2}>Alamat Pengiriman <span class="text-red-500"${_scopeId2}>*</span></label><textarea rows="3" required placeholder="Alamat lengkap pengiriman..." class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 resize-none"${_scopeId2}>${ssrInterpolate(unref(rekberForm).shipping_address)}</textarea>`);
                  if (unref(rekberForm).errors.shipping_address) {
                    _push3(`<p class="text-xs text-red-500 mt-1"${_scopeId2}>${ssrInterpolate(unref(rekberForm).errors.shipping_address)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex gap-3"${_scopeId2}><button type="button" class="flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"${_scopeId2}>Batal</button><button type="submit"${ssrIncludeBooleanAttr(unref(rekberForm).processing) ? " disabled" : ""} class="flex-1 rounded-xl bg-primary py-3 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-60"${_scopeId2}>${ssrInterpolate(unref(rekberForm).processing ? "Memproses..." : "Konfirmasi Beli")}</button></div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-card text-card-foreground rounded-2xl p-6" }, [
                      createVNode("h3", { class: "text-xl font-black mb-1" }, "Beli via Rekening Bersama"),
                      createVNode("p", { class: "text-sm text-muted-foreground mb-5" }, "Dana Anda ditahan hingga barang diterima."),
                      createVNode("div", { class: "rounded-2xl bg-muted/50 border border-border p-4 mb-5 space-y-1 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Harga Produk"),
                          createVNode("span", { class: "font-bold" }, "Rp " + toDisplayString(fmt(((_b2 = __props.myNegotiation) == null ? void 0 : _b2.status) === "accepted" ? __props.myNegotiation.agreed_price : __props.product.price)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Biaya Layanan"),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "Rp 5.000 + 1% (maks Rp 25.000)")
                        ])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitRekber, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, [
                            createTextVNode("Alamat Pengiriman "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(rekberForm).shipping_address = $event,
                            rows: "3",
                            required: "",
                            placeholder: "Alamat lengkap pengiriman...",
                            class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(rekberForm).shipping_address]
                          ]),
                          unref(rekberForm).errors.shipping_address ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500 mt-1"
                          }, toDisplayString(unref(rekberForm).errors.shipping_address), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex gap-3" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showBuyModal.value = false,
                            class: "flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"
                          }, "Batal", 8, ["onClick"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(rekberForm).processing,
                            class: "flex-1 rounded-xl bg-primary py-3 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-60"
                          }, toDisplayString(unref(rekberForm).processing ? "Memproses..." : "Konfirmasi Beli"), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showCodModal.value,
              onClose: ($event) => showCodModal.value = false,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-card text-card-foreground rounded-2xl p-6"${_scopeId2}><h3 class="text-xl font-black mb-1"${_scopeId2}>Beli via COD</h3><p class="text-sm text-muted-foreground mb-5"${_scopeId2}>Tentukan lokasi dan waktu bertemu dengan penjual.</p><form class="space-y-4"${_scopeId2}><div${_scopeId2}><label class="block text-xs font-black uppercase tracking-wider mb-1.5"${_scopeId2}>Lokasi Pertemuan <span class="text-red-500"${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(codForm).cod_location)} type="text" required placeholder="Contoh: Alfamart Jl. Sudirman No. 12" class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"${_scopeId2}>`);
                  if (unref(codForm).errors.cod_location) {
                    _push3(`<p class="text-xs text-red-500 mt-1"${_scopeId2}>${ssrInterpolate(unref(codForm).errors.cod_location)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label class="block text-xs font-black uppercase tracking-wider mb-1.5"${_scopeId2}>Jadwal Pertemuan <span class="text-red-500"${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(codForm).cod_scheduled_at)} type="datetime-local" required class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"${_scopeId2}>`);
                  if (unref(codForm).errors.cod_scheduled_at) {
                    _push3(`<p class="text-xs text-red-500 mt-1"${_scopeId2}>${ssrInterpolate(unref(codForm).errors.cod_scheduled_at)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex gap-3"${_scopeId2}><button type="button" class="flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"${_scopeId2}>Batal</button><button type="submit"${ssrIncludeBooleanAttr(unref(codForm).processing) ? " disabled" : ""} class="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-600 disabled:opacity-60"${_scopeId2}>${ssrInterpolate(unref(codForm).processing ? "Memproses..." : "Kirim Permintaan COD")}</button></div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-card text-card-foreground rounded-2xl p-6" }, [
                      createVNode("h3", { class: "text-xl font-black mb-1" }, "Beli via COD"),
                      createVNode("p", { class: "text-sm text-muted-foreground mb-5" }, "Tentukan lokasi dan waktu bertemu dengan penjual."),
                      createVNode("form", {
                        onSubmit: withModifiers(submitCod, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, [
                            createTextVNode("Lokasi Pertemuan "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(codForm).cod_location = $event,
                            type: "text",
                            required: "",
                            placeholder: "Contoh: Alfamart Jl. Sudirman No. 12",
                            class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(codForm).cod_location]
                          ]),
                          unref(codForm).errors.cod_location ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500 mt-1"
                          }, toDisplayString(unref(codForm).errors.cod_location), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, [
                            createTextVNode("Jadwal Pertemuan "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(codForm).cod_scheduled_at = $event,
                            type: "datetime-local",
                            required: "",
                            class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(codForm).cod_scheduled_at]
                          ]),
                          unref(codForm).errors.cod_scheduled_at ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500 mt-1"
                          }, toDisplayString(unref(codForm).errors.cod_scheduled_at), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex gap-3" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showCodModal.value = false,
                            class: "flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"
                          }, "Batal", 8, ["onClick"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(codForm).processing,
                            class: "flex-1 rounded-xl bg-blue-500 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-600 disabled:opacity-60"
                          }, toDisplayString(unref(codForm).processing ? "Memproses..." : "Kirim Permintaan COD"), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showNegoModal.value,
              onClose: ($event) => showNegoModal.value = false,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-card text-card-foreground rounded-2xl p-6"${_scopeId2}><h3 class="text-xl font-black mb-1"${_scopeId2}>Tawar Harga</h3><p class="text-sm text-muted-foreground mb-5"${_scopeId2}>Harga asli: <strong${_scopeId2}>Rp ${ssrInterpolate(fmt(__props.product.price))}</strong>. Penawaran harus lebih rendah.</p><form class="space-y-4"${_scopeId2}><div${_scopeId2}><label class="block text-xs font-black uppercase tracking-wider mb-1.5"${_scopeId2}>Harga Penawaran (Rp) <span class="text-red-500"${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(negoForm).proposed_price)} type="number" required${ssrRenderAttr("max", __props.product.price - 1)} min="1000" placeholder="Masukkan harga penawaran..." class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"${_scopeId2}>`);
                  if (unref(negoForm).errors.proposed_price) {
                    _push3(`<p class="text-xs text-red-500 mt-1"${_scopeId2}>${ssrInterpolate(unref(negoForm).errors.proposed_price)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label class="block text-xs font-black uppercase tracking-wider mb-1.5"${_scopeId2}>Pesan (Opsional)</label><textarea rows="2" placeholder="Alasan penawaran Anda..." class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 resize-none"${_scopeId2}>${ssrInterpolate(unref(negoForm).message)}</textarea></div><div class="flex gap-3"${_scopeId2}><button type="button" class="flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"${_scopeId2}>Batal</button><button type="submit"${ssrIncludeBooleanAttr(unref(negoForm).processing) ? " disabled" : ""} class="flex-1 rounded-xl bg-indigo-500 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600 disabled:opacity-60"${_scopeId2}>${ssrInterpolate(unref(negoForm).processing ? "Mengirim..." : "Kirim Penawaran")}</button></div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-card text-card-foreground rounded-2xl p-6" }, [
                      createVNode("h3", { class: "text-xl font-black mb-1" }, "Tawar Harga"),
                      createVNode("p", { class: "text-sm text-muted-foreground mb-5" }, [
                        createTextVNode("Harga asli: "),
                        createVNode("strong", null, "Rp " + toDisplayString(fmt(__props.product.price)), 1),
                        createTextVNode(". Penawaran harus lebih rendah.")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitNego, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, [
                            createTextVNode("Harga Penawaran (Rp) "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(negoForm).proposed_price = $event,
                            type: "number",
                            required: "",
                            max: __props.product.price - 1,
                            min: "1000",
                            placeholder: "Masukkan harga penawaran...",
                            class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                          }, null, 8, ["onUpdate:modelValue", "max"]), [
                            [vModelText, unref(negoForm).proposed_price]
                          ]),
                          unref(negoForm).errors.proposed_price ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500 mt-1"
                          }, toDisplayString(unref(negoForm).errors.proposed_price), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, "Pesan (Opsional)"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(negoForm).message = $event,
                            rows: "2",
                            placeholder: "Alasan penawaran Anda...",
                            class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(negoForm).message]
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-3" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showNegoModal.value = false,
                            class: "flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"
                          }, "Batal", 8, ["onClick"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(negoForm).processing,
                            class: "flex-1 rounded-xl bg-indigo-500 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600 disabled:opacity-60"
                          }, toDisplayString(unref(negoForm).processing ? "Mengirim..." : "Kirim Penawaran"), 9, ["disabled"])
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
              createVNode(unref(Head), {
                title: __props.product.title
              }, null, 8, ["title"]),
              createVNode("div", { class: "min-h-screen bg-background py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("nav", {
                    class: "mb-8 flex text-sm font-medium",
                    "aria-label": "Breadcrumb"
                  }, [
                    createVNode("ol", { class: "inline-flex items-center space-x-1 md:space-x-3" }, [
                      createVNode("li", { class: "inline-flex items-center" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("home"),
                          class: "flex items-center text-muted-foreground transition-colors hover:text-primary"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Home), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Beranda ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("li", null, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(unref(ChevronRight), { class: "h-4 w-4 text-muted-foreground" }),
                          createVNode("span", { class: "ml-1 text-muted-foreground md:ml-2" }, toDisplayString((_w = __props.product.category) == null ? void 0 : _w.name), 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 gap-12 lg:grid-cols-12" }, [
                    createVNode("div", { class: "space-y-6 lg:col-span-7" }, [
                      createVNode("div", { class: "relative aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl transition-all duration-500 hover:shadow-primary/5 md:aspect-[4/3]" }, [
                        createVNode("img", {
                          src: activeImage.value,
                          alt: __props.product.title,
                          loading: "lazy",
                          class: "h-full w-full object-cover transition-all duration-700"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "absolute left-6 top-6 flex flex-col gap-2" }, [
                          __props.product.reference_url ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex"
                          }, [
                            createVNode("a", {
                              href: __props.product.reference_url,
                              target: "_blank",
                              class: "flex items-center gap-2 rounded-xl bg-primary/90 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-lg backdrop-blur-md transition-all hover:bg-primary"
                            }, [
                              createTextVNode(toDisplayString(__props.product.brand) + " ", 1),
                              createVNode(unref(ExternalLink), { class: "h-3 w-3" })
                            ], 8, ["href"])
                          ])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "rounded-xl bg-primary/90 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-lg backdrop-blur-md"
                          }, toDisplayString(__props.product.brand), 1))
                        ])
                      ]),
                      __props.product.images.length > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-4 gap-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.product.images, (image) => {
                          return openBlock(), createBlock("button", {
                            key: image.id,
                            onClick: ($event) => activeImage.value = `/storage/${image.image_path}`,
                            class: [
                              "group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300",
                              activeImage.value === `/storage/${image.image_path}` ? "border-primary shadow-lg" : "border-transparent opacity-70 hover:border-muted-foreground/30 hover:opacity-100"
                            ]
                          }, [
                            createVNode("img", {
                              src: `/storage/${image.image_path}`,
                              loading: "lazy",
                              class: "h-full w-full object-cover transition-transform group-hover:scale-110"
                            }, null, 8, ["src"])
                          ], 10, ["onClick"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "lg:col-span-5" }, [
                      createVNode("div", { class: "sticky top-8 rounded-[2.5rem] border border-border bg-card p-8 text-card-foreground shadow-xl md:p-10" }, [
                        createVNode("div", { class: "mb-8" }, [
                          createVNode("div", { class: "mb-4 flex flex-wrap items-center gap-3" }, [
                            createVNode("span", { class: "rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground" }, toDisplayString((_x = __props.product.category) == null ? void 0 : _x.name), 1),
                            createVNode("span", {
                              class: [
                                __props.product.condition_badge_color === "green" ? "bg-emerald-500" : __props.product.condition_badge_color === "yellow" ? "bg-amber-500" : "bg-slate-400",
                                "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                              ]
                            }, toDisplayString(__props.product.condition_label), 3),
                            __props.product.is_cod ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "rounded-full bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                            }, "COD")) : createCommentVNode("", true),
                            __props.product.is_negotiable ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: "rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                            }, "Bisa Nego")) : createCommentVNode("", true)
                          ]),
                          createVNode("h1", { class: "mb-4 text-3xl font-black leading-tight md:text-4xl" }, toDisplayString(__props.product.title), 1),
                          createVNode("div", { class: "flex items-baseline gap-2" }, [
                            createVNode("span", { class: "text-4xl font-black text-primary" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(__props.product.price)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-10" }, [
                          specifications.value.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "grid grid-cols-2 gap-4"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(specifications.value, (spec) => {
                              return openBlock(), createBlock("div", {
                                key: spec.label,
                                class: "group rounded-2xl border border-border bg-muted/50 p-4 transition-colors hover:bg-muted"
                              }, [
                                createVNode("span", { class: "mb-1 block text-[10px] font-bold uppercase tracking-tighter text-muted-foreground" }, toDisplayString(spec.label), 1),
                                createVNode("span", { class: "block text-sm font-bold" }, toDisplayString(spec.value), 1)
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          __props.product.reference_url ? (openBlock(), createBlock("a", {
                            key: 1,
                            href: __props.product.reference_url,
                            target: "_blank",
                            class: "group flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-muted py-4 text-sm font-black shadow-sm transition-all hover:bg-accent"
                          }, [
                            createVNode(unref(Globe), { class: "h-5 w-5" }),
                            createTextVNode(" Lihat Referensi Eksternal "),
                            createVNode(unref(ArrowRight), { class: "h-4 w-4 transition-transform group-hover:translate-x-1" })
                          ], 8, ["href"])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("h3", { class: "mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground" }, [
                              createVNode("div", { class: "h-4 w-1.5 rounded-full bg-primary" }),
                              createTextVNode(" Deskripsi Produk ")
                            ]),
                            createVNode("div", { class: "whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground" }, toDisplayString(__props.product.description), 1)
                          ]),
                          createVNode("div", { class: "group relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-6" }, [
                            createVNode("div", { class: "absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-700 group-hover:scale-150" }),
                            createVNode("div", { class: "relative z-10 mb-6 flex items-center justify-between" }, [
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode("div", { class: "relative" }, [
                                  createVNode("div", { class: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary overflow-hidden shadow-xl transition-transform group-hover:scale-105" }, [
                                    ((_z = (_y = __props.product.store) == null ? void 0 : _y.profile) == null ? void 0 : _z.store_logo) ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: `/storage/${__props.product.store.profile.store_logo}`,
                                      class: "h-full w-full object-cover"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-xl font-black text-primary-foreground"
                                    }, toDisplayString((((_B = (_A = __props.product.store) == null ? void 0 : _A.profile) == null ? void 0 : _B.store_name) ?? ((_C = __props.product.store) == null ? void 0 : _C.name)).charAt(0).toUpperCase()), 1))
                                  ]),
                                  ((_E = (_D = __props.product.store) == null ? void 0 : _D.profile) == null ? void 0 : _E.is_ktp_verified) && ((_F = __props.product.store) == null ? void 0 : _F.transactions_as_seller_count) >= 5 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "absolute -bottom-1 -right-1 rounded-lg border-2 border-card bg-amber-400 p-1 text-white shadow-lg ring-1 ring-amber-500/20"
                                  }, [
                                    createVNode(unref(ShieldCheck), { class: "h-4 w-4" })
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", null, [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode("h4", { class: "text-lg font-black" }, toDisplayString(((_H = (_G = __props.product.store) == null ? void 0 : _G.profile) == null ? void 0 : _H.store_name) ?? ((_I = __props.product.store) == null ? void 0 : _I.name)), 1),
                                    ((_K = (_J = __props.product.store) == null ? void 0 : _J.profile) == null ? void 0 : _K.is_ktp_verified) && ((_L = __props.product.store) == null ? void 0 : _L.transactions_as_seller_count) >= 5 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "rounded bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-600"
                                    }, " Premium Seller ")) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "mt-1 flex items-center text-xs text-muted-foreground" }, [
                                    createVNode(unref(MapPin), { class: "mr-1 h-3 w-3" }),
                                    createTextVNode(" " + toDisplayString(((_N = (_M = __props.product.store) == null ? void 0 : _M.profile) == null ? void 0 : _N.city) || "Lokasi tidak diisi"), 1)
                                  ])
                                ])
                              ]),
                              createVNode(unref(Link), {
                                href: _ctx.route("store.show", ((_O = __props.product.store) == null ? void 0 : _O.id) ?? __props.product.user_id),
                                class: "rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:bg-accent group-hover:border-primary/30"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Store), { class: "h-5 w-5 transition-transform group-hover:scale-110" })
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            isOwner.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex gap-3"
                            }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("products.edit", __props.product.slug),
                                class: "flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-sm font-black text-accent-foreground shadow-xl transition-all hover:bg-accent/80"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Edit3), { class: "h-5 w-5" }),
                                  createTextVNode(" Edit Produk ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ])) : !unref(auth).user ? (openBlock(), createBlock(unref(Link), {
                              key: 1,
                              href: _ctx.route("login"),
                              class: "flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black text-primary-foreground shadow-xl"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Login untuk Beli / Chat ")
                              ]),
                              _: 1
                            }, 8, ["href"])) : (openBlock(), createBlock("div", {
                              key: 2,
                              class: "space-y-3"
                            }, [
                              hasActiveTransaction.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm text-amber-700 dark:text-amber-400"
                              }, [
                                createVNode(unref(Clock), { class: "h-5 w-5 shrink-0" }),
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-black" }, "Transaksi Sedang Berjalan"),
                                  createVNode("p", { class: "text-xs mt-0.5" }, "Anda sudah memiliki transaksi aktif untuk produk ini.")
                                ]),
                                createVNode(unref(Link), {
                                  href: _ctx.route("profile.orders"),
                                  class: "ml-auto shrink-0 text-xs font-black underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Lihat")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ])) : createCommentVNode("", true),
                              __props.myNegotiation && !hasActiveTransaction.value ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: ["rounded-2xl border p-4 space-y-2", {
                                  "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700": __props.myNegotiation.status === "pending",
                                  "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700": __props.myNegotiation.status === "countered",
                                  "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700": __props.myNegotiation.status === "accepted"
                                }]
                              }, [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode(unref(HandCoins), { class: "h-4 w-4" }),
                                  createVNode("span", {
                                    class: ["text-xs font-black uppercase tracking-wider", (_P = negoStatusLabel.value) == null ? void 0 : _P.color]
                                  }, toDisplayString((_Q = negoStatusLabel.value) == null ? void 0 : _Q.text), 3)
                                ]),
                                createVNode("div", { class: "text-xs space-y-1" }, [
                                  createVNode("p", null, [
                                    createTextVNode("Penawaran Anda: "),
                                    createVNode("strong", null, "Rp " + toDisplayString(fmt(__props.myNegotiation.proposed_price)), 1)
                                  ]),
                                  __props.myNegotiation.counter_price ? (openBlock(), createBlock("p", { key: 0 }, [
                                    createTextVNode("Counter Seller: "),
                                    createVNode("strong", null, "Rp " + toDisplayString(fmt(__props.myNegotiation.counter_price)), 1)
                                  ])) : createCommentVNode("", true),
                                  __props.myNegotiation.agreed_price ? (openBlock(), createBlock("p", { key: 1 }, [
                                    createTextVNode("Harga Disepakati: "),
                                    createVNode("strong", { class: "text-emerald-600" }, "Rp " + toDisplayString(fmt(__props.myNegotiation.agreed_price)), 1)
                                  ])) : createCommentVNode("", true)
                                ]),
                                __props.myNegotiation.status === "countered" ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: acceptCounter,
                                  class: "w-full rounded-xl bg-blue-500 py-2.5 text-xs font-black text-white hover:bg-blue-600 transition"
                                }, " Terima Counter-Offer Seller ")) : createCommentVNode("", true)
                              ], 2)) : createCommentVNode("", true),
                              !hasActiveTransaction.value ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: "flex flex-col gap-2"
                              }, [
                                createVNode("button", {
                                  onClick: ($event) => showBuyModal.value = true,
                                  class: "flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black text-primary-foreground shadow-xl transition hover:bg-primary/90 active:scale-95"
                                }, [
                                  createVNode(unref(Truck), { class: "h-5 w-5" }),
                                  createTextVNode(" Beli via Rekber "),
                                  ((_R = __props.myNegotiation) == null ? void 0 : _R.status) === "accepted" ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px]"
                                  }, "Harga Nego")) : createCommentVNode("", true)
                                ], 8, ["onClick"]),
                                __props.product.is_cod ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => showCodModal.value = true,
                                  class: "flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-blue-500 bg-blue-500/10 py-4 text-sm font-black text-blue-600 dark:text-blue-400 transition hover:bg-blue-500/20 active:scale-95"
                                }, [
                                  createVNode(unref(Users), { class: "h-5 w-5" }),
                                  createTextVNode(" Beli via COD (Ketemu Langsung) ")
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                __props.product.is_negotiable && !__props.myNegotiation ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => showNegoModal.value = true,
                                  class: "flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-indigo-400 bg-indigo-400/10 py-4 text-sm font-black text-indigo-600 dark:text-indigo-400 transition hover:bg-indigo-400/20 active:scale-95"
                                }, [
                                  createVNode(unref(HandCoins), { class: "h-5 w-5" }),
                                  createTextVNode(" Tawar Harga ")
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                createVNode(unref(Link), {
                                  href: _ctx.route("chat.initiate", __props.product.slug),
                                  method: "post",
                                  as: "button",
                                  class: "flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm font-bold text-muted-foreground transition hover:bg-accent active:scale-95"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(MessageCircle), { class: "h-4 w-4" }),
                                    createTextVNode(" Chat Penjual ")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "flex items-center gap-2 pt-1" }, [
                                createVNode("button", {
                                  onClick: toggleFavorite,
                                  class: ["flex items-center justify-center rounded-2xl border-2 p-3 transition active:scale-90", isFavorited.value ? "border-rose-200 bg-rose-50 text-rose-500" : "border-border text-muted-foreground hover:text-rose-500"]
                                }, [
                                  createVNode(unref(Heart), {
                                    class: ["h-5 w-5", { "fill-current": isFavorited.value }]
                                  }, null, 8, ["class"])
                                ], 2),
                                createVNode("button", {
                                  onClick: reportProduct,
                                  class: "flex flex-1 items-center justify-center gap-1 py-2 text-xs font-bold text-muted-foreground hover:text-amber-600 transition"
                                }, [
                                  createVNode(unref(Flag), { class: "h-3.5 w-3.5" }),
                                  createTextVNode(" Laporkan produk ini ")
                                ])
                              ])
                            ]))
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$2, {
                show: showRemoveModal.value,
                onClose: ($event) => showRemoveModal.value = false,
                maxWidth: "sm"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "rounded-2xl bg-white p-6 dark:bg-slate-900" }, [
                    createVNode("div", { class: "mb-4 flex justify-center" }, [
                      createVNode("div", { class: "rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500/20" }, [
                        createVNode(unref(AlertTriangle), { class: "h-8 w-8" })
                      ])
                    ]),
                    createVNode("h3", { class: "mb-2 text-center text-lg font-black text-slate-900 dark:text-white" }, "Hapus dari Favorit?"),
                    createVNode("div", { class: "flex gap-3 mt-4" }, [
                      createVNode("button", {
                        onClick: ($event) => showRemoveModal.value = false,
                        class: "flex-1 rounded-xl bg-slate-100 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                      }, "Batal", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: submitToggle,
                        class: "flex-1 rounded-xl bg-red-500 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
                      }, "Ya, Hapus")
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["show", "onClose"]),
              createVNode(_sfc_main$2, {
                show: showBuyModal.value,
                onClose: ($event) => showBuyModal.value = false,
                maxWidth: "md"
              }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode("div", { class: "bg-card text-card-foreground rounded-2xl p-6" }, [
                      createVNode("h3", { class: "text-xl font-black mb-1" }, "Beli via Rekening Bersama"),
                      createVNode("p", { class: "text-sm text-muted-foreground mb-5" }, "Dana Anda ditahan hingga barang diterima."),
                      createVNode("div", { class: "rounded-2xl bg-muted/50 border border-border p-4 mb-5 space-y-1 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Harga Produk"),
                          createVNode("span", { class: "font-bold" }, "Rp " + toDisplayString(fmt(((_a2 = __props.myNegotiation) == null ? void 0 : _a2.status) === "accepted" ? __props.myNegotiation.agreed_price : __props.product.price)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Biaya Layanan"),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "Rp 5.000 + 1% (maks Rp 25.000)")
                        ])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitRekber, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, [
                            createTextVNode("Alamat Pengiriman "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(rekberForm).shipping_address = $event,
                            rows: "3",
                            required: "",
                            placeholder: "Alamat lengkap pengiriman...",
                            class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(rekberForm).shipping_address]
                          ]),
                          unref(rekberForm).errors.shipping_address ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500 mt-1"
                          }, toDisplayString(unref(rekberForm).errors.shipping_address), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex gap-3" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showBuyModal.value = false,
                            class: "flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"
                          }, "Batal", 8, ["onClick"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(rekberForm).processing,
                            class: "flex-1 rounded-xl bg-primary py-3 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-60"
                          }, toDisplayString(unref(rekberForm).processing ? "Memproses..." : "Konfirmasi Beli"), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ];
                }),
                _: 1
              }, 8, ["show", "onClose"]),
              createVNode(_sfc_main$2, {
                show: showCodModal.value,
                onClose: ($event) => showCodModal.value = false,
                maxWidth: "md"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "bg-card text-card-foreground rounded-2xl p-6" }, [
                    createVNode("h3", { class: "text-xl font-black mb-1" }, "Beli via COD"),
                    createVNode("p", { class: "text-sm text-muted-foreground mb-5" }, "Tentukan lokasi dan waktu bertemu dengan penjual."),
                    createVNode("form", {
                      onSubmit: withModifiers(submitCod, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, [
                          createTextVNode("Lokasi Pertemuan "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(codForm).cod_location = $event,
                          type: "text",
                          required: "",
                          placeholder: "Contoh: Alfamart Jl. Sudirman No. 12",
                          class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(codForm).cod_location]
                        ]),
                        unref(codForm).errors.cod_location ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-500 mt-1"
                        }, toDisplayString(unref(codForm).errors.cod_location), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, [
                          createTextVNode("Jadwal Pertemuan "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(codForm).cod_scheduled_at = $event,
                          type: "datetime-local",
                          required: "",
                          class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(codForm).cod_scheduled_at]
                        ]),
                        unref(codForm).errors.cod_scheduled_at ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-500 mt-1"
                        }, toDisplayString(unref(codForm).errors.cod_scheduled_at), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showCodModal.value = false,
                          class: "flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"
                        }, "Batal", 8, ["onClick"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(codForm).processing,
                          class: "flex-1 rounded-xl bg-blue-500 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-600 disabled:opacity-60"
                        }, toDisplayString(unref(codForm).processing ? "Memproses..." : "Kirim Permintaan COD"), 9, ["disabled"])
                      ])
                    ], 32)
                  ])
                ]),
                _: 1
              }, 8, ["show", "onClose"]),
              createVNode(_sfc_main$2, {
                show: showNegoModal.value,
                onClose: ($event) => showNegoModal.value = false,
                maxWidth: "md"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "bg-card text-card-foreground rounded-2xl p-6" }, [
                    createVNode("h3", { class: "text-xl font-black mb-1" }, "Tawar Harga"),
                    createVNode("p", { class: "text-sm text-muted-foreground mb-5" }, [
                      createTextVNode("Harga asli: "),
                      createVNode("strong", null, "Rp " + toDisplayString(fmt(__props.product.price)), 1),
                      createTextVNode(". Penawaran harus lebih rendah.")
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submitNego, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, [
                          createTextVNode("Harga Penawaran (Rp) "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(negoForm).proposed_price = $event,
                          type: "number",
                          required: "",
                          max: __props.product.price - 1,
                          min: "1000",
                          placeholder: "Masukkan harga penawaran...",
                          class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                        }, null, 8, ["onUpdate:modelValue", "max"]), [
                          [vModelText, unref(negoForm).proposed_price]
                        ]),
                        unref(negoForm).errors.proposed_price ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-500 mt-1"
                        }, toDisplayString(unref(negoForm).errors.proposed_price), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-black uppercase tracking-wider mb-1.5" }, "Pesan (Opsional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(negoForm).message = $event,
                          rows: "2",
                          placeholder: "Alasan penawaran Anda...",
                          class: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 resize-none"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(negoForm).message]
                        ])
                      ]),
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showNegoModal.value = false,
                          class: "flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80"
                        }, "Batal", 8, ["onClick"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(negoForm).processing,
                          class: "flex-1 rounded-xl bg-indigo-500 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600 disabled:opacity-60"
                        }, toDisplayString(unref(negoForm).processing ? "Mengirim..." : "Kirim Penawaran"), 9, ["disabled"])
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
