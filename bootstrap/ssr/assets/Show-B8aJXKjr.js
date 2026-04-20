import { ref, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B-phu6gS.js";
import { Home, ChevronRight, ExternalLink, Globe, ArrowRight, ShieldCheck, MapPin, Store, MessageCircle, Edit3, X, ShoppingCart, Flag, AlertTriangle } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./Modal-Cw8mmzBN.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "lodash/pickBy.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    product: Object
  },
  setup(__props) {
    const props = __props;
    const activeImage = ref(props.product.images.length > 0 ? `/storage/${props.product.images[0].image_path}` : "/images/placeholder-product.png");
    const showRemoveModal = ref(false);
    const auth = usePage().props.auth;
    const isFavorited = computed(() => {
      var _a, _b;
      return (_b = (_a = auth.user) == null ? void 0 : _a.favorites) == null ? void 0 : _b.includes(props.product.id);
    });
    const toggleFavorite = () => {
      if (!auth.user) {
        router.get(route("login"));
        return;
      }
      if (isFavorited.value) {
        showRemoveModal.value = true;
      } else {
        submitToggle();
      }
    };
    const submitToggle = () => {
      showRemoveModal.value = false;
      router.post(route("products.toggle-favorite", props.product.id), {}, {
        preserveScroll: true
      });
    };
    const reportProduct = () => {
      if (!auth.user) {
        router.get(route("login"));
        return;
      }
      const reason = prompt("Alasan melaporkan produk ini?");
      if (reason) {
        router.post(route("products.report", props.product.id), { reason }, {
          preserveScroll: true
        });
      }
    };
    computed(() => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(props.product.price);
    });
    const specifications = computed(() => {
      if (!props.product.specifications) return [];
      return Object.entries(props.product.specifications).filter(([key, value]) => value !== null && value !== "").map(([key, value]) => ({
        label: key.replace(/_/g, " "),
        value
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: __props.product.title
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-12 bg-background min-h-screen"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><nav class="flex mb-8 text-sm font-medium" aria-label="Breadcrumb"${_scopeId}><ol class="inline-flex items-center space-x-1 md:space-x-3"${_scopeId}><li class="inline-flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("home"),
              class: "text-muted-foreground hover:text-primary transition-colors flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Home), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Beranda `);
                } else {
                  return [
                    createVNode(unref(Home), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Beranda ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}><div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-1 text-muted-foreground md:ml-2"${_scopeId}>${ssrInterpolate((_a = __props.product.category) == null ? void 0 : _a.name)}</span></div></li></ol></nav><div class="grid grid-cols-1 lg:grid-cols-12 gap-12"${_scopeId}><div class="lg:col-span-7 space-y-6"${_scopeId}><div class="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl transition-all duration-500 hover:shadow-primary/5"${_scopeId}><img${ssrRenderAttr("src", activeImage.value)}${ssrRenderAttr("alt", __props.product.title)} class="w-full h-full object-cover transition-all duration-700"${_scopeId}><div class="absolute top-6 left-6 flex flex-col gap-2"${_scopeId}>`);
            if (__props.product.reference_url) {
              _push2(`<div class="flex"${_scopeId}><a${ssrRenderAttr("href", __props.product.reference_url)} target="_blank" class="bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider hover:bg-primary transition-all flex items-center gap-2"${_scopeId}>${ssrInterpolate(__props.product.brand)} `);
              _push2(ssrRenderComponent(unref(ExternalLink), { class: "w-3 h-3" }, null, _parent2, _scopeId));
              _push2(`</a></div>`);
            } else {
              _push2(`<span class="bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider"${_scopeId}>${ssrInterpolate(__props.product.brand)}</span>`);
            }
            _push2(`</div></div>`);
            if (__props.product.images.length > 1) {
              _push2(`<div class="grid grid-cols-4 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.images, (image) => {
                _push2(`<button class="${ssrRenderClass([activeImage.value === `/storage/${image.image_path}` ? "border-primary shadow-lg" : "border-transparent hover:border-muted-foreground/30 opacity-70 hover:opacity-100", "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 group"])}"${_scopeId}><img${ssrRenderAttr("src", `/storage/${image.image_path}`)} class="w-full h-full object-cover transition-transform group-hover:scale-110"${_scopeId}></button>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="lg:col-span-5"${_scopeId}><div class="bg-card text-card-foreground rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-border sticky top-8"${_scopeId}><div class="mb-8"${_scopeId}><div class="flex flex-wrap items-center gap-3 mb-4"${_scopeId}><span class="px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-widest"${_scopeId}>${ssrInterpolate((_b = __props.product.category) == null ? void 0 : _b.name)}</span><span class="${ssrRenderClass([
              __props.product.condition_badge_color === "green" ? "bg-emerald-500" : __props.product.condition_badge_color === "yellow" ? "bg-amber-500" : "bg-slate-400",
              "px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"
            ])}"${_scopeId}>${ssrInterpolate(__props.product.condition)}</span>`);
            if (__props.product.is_cod) {
              _push2(`<span class="px-3 py-1 bg-blue-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"${_scopeId}>COD</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.product.is_negotiable) {
              _push2(`<span class="px-3 py-1 bg-indigo-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"${_scopeId}>Bisa Nego</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h1 class="text-3xl md:text-4xl font-black leading-tight mb-4"${_scopeId}>${ssrInterpolate(__props.product.title)}</h1><div class="flex items-baseline gap-2"${_scopeId}><span class="text-4xl font-black text-primary"${_scopeId}>Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.product.price))}</span></div></div><div class="space-y-10"${_scopeId}>`);
            if (specifications.value.length > 0) {
              _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(specifications.value, (spec) => {
                _push2(`<div class="bg-muted/50 p-4 rounded-2xl border border-border group hover:bg-muted transition-colors"${_scopeId}><span class="block text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mb-1"${_scopeId}>${ssrInterpolate(spec.label)}</span><span class="block text-sm font-bold"${_scopeId}>${ssrInterpolate(spec.value)}</span></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.product.reference_url) {
              _push2(`<a${ssrRenderAttr("href", __props.product.reference_url)} target="_blank" class="flex items-center justify-center gap-3 w-full py-4 bg-muted hover:bg-accent border border-border rounded-2xl text-sm font-black transition-all group shadow-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Globe), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(` Lihat Referensi Eksternal `);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 transition-transform group-hover:translate-x-1" }, null, _parent2, _scopeId));
              _push2(`</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><h3 class="text-sm font-black text-foreground uppercase tracking-wider mb-3 flex items-center gap-2"${_scopeId}><div class="w-1.5 h-4 bg-primary rounded-full"${_scopeId}></div> Deskripsi Produk </h3><div class="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(__props.product.description)}</div></div><div class="bg-muted/30 border border-border rounded-3xl p-6 overflow-hidden relative group"${_scopeId}><div class="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150"${_scopeId}></div><div class="flex items-center justify-between mb-6 relative z-10"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="relative"${_scopeId}><div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-xl font-black text-primary-foreground shadow-xl transition-transform group-hover:scale-105"${_scopeId}>${ssrInterpolate((_c = __props.product.store) == null ? void 0 : _c.name.charAt(0).toUpperCase())}</div>`);
            if (((_e = (_d = __props.product.store) == null ? void 0 : _d.profile) == null ? void 0 : _e.is_ktp_verified) && ((_f = __props.product.store) == null ? void 0 : _f.transactions_as_seller_count) >= 5) {
              _push2(`<div class="absolute -bottom-1 -right-1 bg-amber-400 text-white p-1 rounded-lg border-2 border-card shadow-lg ring-1 ring-amber-500/20"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShieldCheck), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><div class="flex items-center gap-2"${_scopeId}><h4 class="font-black text-lg"${_scopeId}>${ssrInterpolate(((_h = (_g = __props.product.store) == null ? void 0 : _g.profile) == null ? void 0 : _h.store_name) ?? ((_i = __props.product.store) == null ? void 0 : _i.name))}</h4>`);
            if (((_k = (_j = __props.product.store) == null ? void 0 : _j.profile) == null ? void 0 : _k.is_ktp_verified) && ((_l = __props.product.store) == null ? void 0 : _l.transactions_as_seller_count) >= 5) {
              _push2(`<div class="bg-amber-400/10 text-amber-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider"${_scopeId}> Premium Seller </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center text-xs text-muted-foreground mt-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MapPin), { class: "w-3 h-3 mr-1" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(((_n = (_m = __props.product.store) == null ? void 0 : _m.profile) == null ? void 0 : _n.city) || "Lokasi tidak diisi")}</div></div></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("store.show", __props.product.user_id),
              class: "p-3 bg-card hover:bg-accent rounded-xl transition-all border border-border shadow-sm group-hover:border-primary/30"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Store), { class: "w-5 h-5 transition-transform group-hover:scale-110" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Store), { class: "w-5 h-5 transition-transform group-hover:scale-110" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(auth).user) {
              _push2(`<div${_scopeId}><div class="flex gap-4"${_scopeId}>`);
              if (unref(auth).user.id !== __props.product.user_id) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("chat.initiate", __props.product.slug),
                  method: "post",
                  as: "button",
                  class: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-2xl font-black text-sm shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(MessageCircle), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                      _push3(` Chat Penjual `);
                    } else {
                      return [
                        createVNode(unref(MessageCircle), { class: "w-5 h-5" }),
                        createTextVNode(" Chat Penjual ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("products.edit", __props.product.slug),
                  class: "flex-1 bg-accent text-accent-foreground hover:bg-accent/80 py-4 rounded-2xl font-black text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Edit3), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                      _push3(` Edit Produk `);
                    } else {
                      return [
                        createVNode(unref(Edit3), { class: "w-5 h-5" }),
                        createTextVNode(" Edit Produk ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
              _push2(`<button class="${ssrRenderClass([isFavorited.value ? "bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100" : "bg-background border-border text-muted-foreground hover:text-blue-500 hover:border-blue-200", "p-4 rounded-2xl border-2 transition-all duration-300 transform active:scale-90 flex items-center justify-center shadow-lg"])}"${_scopeId}>`);
              if (isFavorited.value) {
                _push2(ssrRenderComponent(unref(X), { class: "w-6 h-6" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(ShoppingCart), { class: "w-6 h-6" }, null, _parent2, _scopeId));
              }
              _push2(`</button></div>`);
              if (unref(auth).user.id !== __props.product.user_id) {
                _push2(`<button class="w-full mt-4 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground hover:text-amber-600 transition-colors py-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Flag), { class: "w-3.5 h-3.5" }, null, _parent2, _scopeId));
                _push2(` Laporkan masalah pada produk ini </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("login"),
                class: "w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Login untuk Chat &amp; Keranjang `);
                  } else {
                    return [
                      createTextVNode(" Login untuk Chat & Keranjang ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showRemoveModal.value,
              onClose: ($event) => showRemoveModal.value = false,
              maxWidth: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6 bg-white dark:bg-slate-900 rounded-2xl"${_scopeId2}><div class="flex justify-center mb-4"${_scopeId2}><div class="p-3 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(AlertTriangle), { class: "w-8 h-8" }, null, _parent3, _scopeId2));
                  _push3(`</div></div><h3 class="text-lg font-black text-center text-slate-900 dark:text-white mb-2"${_scopeId2}>Hapus dari Keranjang?</h3><p class="text-sm text-center text-slate-500 dark:text-slate-400 mb-6"${_scopeId2}> Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda? </p><div class="flex gap-3"${_scopeId2}><button class="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"${_scopeId2}> Batal </button><button class="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/20"${_scopeId2}> Ya, Hapus </button></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6 bg-white dark:bg-slate-900 rounded-2xl" }, [
                      createVNode("div", { class: "flex justify-center mb-4" }, [
                        createVNode("div", { class: "p-3 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full" }, [
                          createVNode(unref(AlertTriangle), { class: "w-8 h-8" })
                        ])
                      ]),
                      createVNode("h3", { class: "text-lg font-black text-center text-slate-900 dark:text-white mb-2" }, "Hapus dari Keranjang?"),
                      createVNode("p", { class: "text-sm text-center text-slate-500 dark:text-slate-400 mb-6" }, " Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda? "),
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode("button", {
                          onClick: ($event) => showRemoveModal.value = false,
                          class: "flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                        }, " Batal ", 8, ["onClick"]),
                        createVNode("button", {
                          onClick: submitToggle,
                          class: "flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/20"
                        }, " Ya, Hapus ")
                      ])
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
              createVNode("div", { class: "py-12 bg-background min-h-screen" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("nav", {
                    class: "flex mb-8 text-sm font-medium",
                    "aria-label": "Breadcrumb"
                  }, [
                    createVNode("ol", { class: "inline-flex items-center space-x-1 md:space-x-3" }, [
                      createVNode("li", { class: "inline-flex items-center" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("home"),
                          class: "text-muted-foreground hover:text-primary transition-colors flex items-center"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Home), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Beranda ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("li", null, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(unref(ChevronRight), { class: "w-4 h-4 text-muted-foreground" }),
                          createVNode("span", { class: "ml-1 text-muted-foreground md:ml-2" }, toDisplayString((_o = __props.product.category) == null ? void 0 : _o.name), 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-12 gap-12" }, [
                    createVNode("div", { class: "lg:col-span-7 space-y-6" }, [
                      createVNode("div", { class: "relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl transition-all duration-500 hover:shadow-primary/5" }, [
                        createVNode("img", {
                          src: activeImage.value,
                          alt: __props.product.title,
                          class: "w-full h-full object-cover transition-all duration-700"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "absolute top-6 left-6 flex flex-col gap-2" }, [
                          __props.product.reference_url ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex"
                          }, [
                            createVNode("a", {
                              href: __props.product.reference_url,
                              target: "_blank",
                              class: "bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider hover:bg-primary transition-all flex items-center gap-2"
                            }, [
                              createTextVNode(toDisplayString(__props.product.brand) + " ", 1),
                              createVNode(unref(ExternalLink), { class: "w-3 h-3" })
                            ], 8, ["href"])
                          ])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider"
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
                            class: ["relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 group", activeImage.value === `/storage/${image.image_path}` ? "border-primary shadow-lg" : "border-transparent hover:border-muted-foreground/30 opacity-70 hover:opacity-100"]
                          }, [
                            createVNode("img", {
                              src: `/storage/${image.image_path}`,
                              class: "w-full h-full object-cover transition-transform group-hover:scale-110"
                            }, null, 8, ["src"])
                          ], 10, ["onClick"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "lg:col-span-5" }, [
                      createVNode("div", { class: "bg-card text-card-foreground rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-border sticky top-8" }, [
                        createVNode("div", { class: "mb-8" }, [
                          createVNode("div", { class: "flex flex-wrap items-center gap-3 mb-4" }, [
                            createVNode("span", { class: "px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-widest" }, toDisplayString((_p = __props.product.category) == null ? void 0 : _p.name), 1),
                            createVNode("span", {
                              class: [
                                __props.product.condition_badge_color === "green" ? "bg-emerald-500" : __props.product.condition_badge_color === "yellow" ? "bg-amber-500" : "bg-slate-400",
                                "px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"
                              ]
                            }, toDisplayString(__props.product.condition), 3),
                            __props.product.is_cod ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "px-3 py-1 bg-blue-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"
                            }, "COD")) : createCommentVNode("", true),
                            __props.product.is_negotiable ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: "px-3 py-1 bg-indigo-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"
                            }, "Bisa Nego")) : createCommentVNode("", true)
                          ]),
                          createVNode("h1", { class: "text-3xl md:text-4xl font-black leading-tight mb-4" }, toDisplayString(__props.product.title), 1),
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
                                class: "bg-muted/50 p-4 rounded-2xl border border-border group hover:bg-muted transition-colors"
                              }, [
                                createVNode("span", { class: "block text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mb-1" }, toDisplayString(spec.label), 1),
                                createVNode("span", { class: "block text-sm font-bold" }, toDisplayString(spec.value), 1)
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          __props.product.reference_url ? (openBlock(), createBlock("a", {
                            key: 1,
                            href: __props.product.reference_url,
                            target: "_blank",
                            class: "flex items-center justify-center gap-3 w-full py-4 bg-muted hover:bg-accent border border-border rounded-2xl text-sm font-black transition-all group shadow-sm"
                          }, [
                            createVNode(unref(Globe), { class: "w-5 h-5" }),
                            createTextVNode(" Lihat Referensi Eksternal "),
                            createVNode(unref(ArrowRight), { class: "w-4 h-4 transition-transform group-hover:translate-x-1" })
                          ], 8, ["href"])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-sm font-black text-foreground uppercase tracking-wider mb-3 flex items-center gap-2" }, [
                              createVNode("div", { class: "w-1.5 h-4 bg-primary rounded-full" }),
                              createTextVNode(" Deskripsi Produk ")
                            ]),
                            createVNode("div", { class: "text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap" }, toDisplayString(__props.product.description), 1)
                          ]),
                          createVNode("div", { class: "bg-muted/30 border border-border rounded-3xl p-6 overflow-hidden relative group" }, [
                            createVNode("div", { class: "absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150" }),
                            createVNode("div", { class: "flex items-center justify-between mb-6 relative z-10" }, [
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode("div", { class: "relative" }, [
                                  createVNode("div", { class: "w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-xl font-black text-primary-foreground shadow-xl transition-transform group-hover:scale-105" }, toDisplayString((_q = __props.product.store) == null ? void 0 : _q.name.charAt(0).toUpperCase()), 1),
                                  ((_s = (_r = __props.product.store) == null ? void 0 : _r.profile) == null ? void 0 : _s.is_ktp_verified) && ((_t = __props.product.store) == null ? void 0 : _t.transactions_as_seller_count) >= 5 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "absolute -bottom-1 -right-1 bg-amber-400 text-white p-1 rounded-lg border-2 border-card shadow-lg ring-1 ring-amber-500/20"
                                  }, [
                                    createVNode(unref(ShieldCheck), { class: "w-4 h-4" })
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", null, [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode("h4", { class: "font-black text-lg" }, toDisplayString(((_v = (_u = __props.product.store) == null ? void 0 : _u.profile) == null ? void 0 : _v.store_name) ?? ((_w = __props.product.store) == null ? void 0 : _w.name)), 1),
                                    ((_y = (_x = __props.product.store) == null ? void 0 : _x.profile) == null ? void 0 : _y.is_ktp_verified) && ((_z = __props.product.store) == null ? void 0 : _z.transactions_as_seller_count) >= 5 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "bg-amber-400/10 text-amber-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider"
                                    }, " Premium Seller ")) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "flex items-center text-xs text-muted-foreground mt-1" }, [
                                    createVNode(unref(MapPin), { class: "w-3 h-3 mr-1" }),
                                    createTextVNode(" " + toDisplayString(((_B = (_A = __props.product.store) == null ? void 0 : _A.profile) == null ? void 0 : _B.city) || "Lokasi tidak diisi"), 1)
                                  ])
                                ])
                              ]),
                              createVNode(unref(Link), {
                                href: _ctx.route("store.show", __props.product.user_id),
                                class: "p-3 bg-card hover:bg-accent rounded-xl transition-all border border-border shadow-sm group-hover:border-primary/30"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Store), { class: "w-5 h-5 transition-transform group-hover:scale-110" })
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            unref(auth).user ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("div", { class: "flex gap-4" }, [
                                unref(auth).user.id !== __props.product.user_id ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: _ctx.route("chat.initiate", __props.product.slug),
                                  method: "post",
                                  as: "button",
                                  class: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-2xl font-black text-sm shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(MessageCircle), { class: "w-5 h-5" }),
                                    createTextVNode(" Chat Penjual ")
                                  ]),
                                  _: 1
                                }, 8, ["href"])) : (openBlock(), createBlock(unref(Link), {
                                  key: 1,
                                  href: _ctx.route("products.edit", __props.product.slug),
                                  class: "flex-1 bg-accent text-accent-foreground hover:bg-accent/80 py-4 rounded-2xl font-black text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Edit3), { class: "w-5 h-5" }),
                                    createTextVNode(" Edit Produk ")
                                  ]),
                                  _: 1
                                }, 8, ["href"])),
                                createVNode("button", {
                                  onClick: toggleFavorite,
                                  class: ["p-4 rounded-2xl border-2 transition-all duration-300 transform active:scale-90 flex items-center justify-center shadow-lg", isFavorited.value ? "bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100" : "bg-background border-border text-muted-foreground hover:text-blue-500 hover:border-blue-200"]
                                }, [
                                  isFavorited.value ? (openBlock(), createBlock(unref(X), {
                                    key: 0,
                                    class: "w-6 h-6"
                                  })) : (openBlock(), createBlock(unref(ShoppingCart), {
                                    key: 1,
                                    class: "w-6 h-6"
                                  }))
                                ], 2)
                              ]),
                              unref(auth).user.id !== __props.product.user_id ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: reportProduct,
                                class: "w-full mt-4 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground hover:text-amber-600 transition-colors py-2"
                              }, [
                                createVNode(unref(Flag), { class: "w-3.5 h-3.5" }),
                                createTextVNode(" Laporkan masalah pada produk ini ")
                              ])) : createCommentVNode("", true)
                            ])) : (openBlock(), createBlock(unref(Link), {
                              key: 1,
                              href: _ctx.route("login"),
                              class: "w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Login untuk Chat & Keranjang ")
                              ]),
                              _: 1
                            }, 8, ["href"]))
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
                  createVNode("div", { class: "p-6 bg-white dark:bg-slate-900 rounded-2xl" }, [
                    createVNode("div", { class: "flex justify-center mb-4" }, [
                      createVNode("div", { class: "p-3 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full" }, [
                        createVNode(unref(AlertTriangle), { class: "w-8 h-8" })
                      ])
                    ]),
                    createVNode("h3", { class: "text-lg font-black text-center text-slate-900 dark:text-white mb-2" }, "Hapus dari Keranjang?"),
                    createVNode("p", { class: "text-sm text-center text-slate-500 dark:text-slate-400 mb-6" }, " Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda? "),
                    createVNode("div", { class: "flex gap-3" }, [
                      createVNode("button", {
                        onClick: ($event) => showRemoveModal.value = false,
                        class: "flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      }, " Batal ", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: submitToggle,
                        class: "flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/20"
                      }, " Ya, Hapus ")
                    ])
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
