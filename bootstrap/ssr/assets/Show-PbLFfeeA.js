import { ref, computed, withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B-phu6gS.js";
import { P as ProductCard } from "./ProductCard-HF6P34i5.js";
import { ShieldCheck, MapPin, MessageCircle, Star, Package } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./Pagination-p2pafXsX.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-Cw8mmzBN.js";
import "lodash/pickBy.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    seller: Object,
    products: Object,
    stats: Object,
    reviews: Array
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref("products");
    const auth = usePage().props.auth;
    const formattedJoined = computed(() => props.stats.joined);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: ((_a = __props.seller.profile) == null ? void 0 : _a.store_name) || __props.seller.name
            }, null, _parent2, _scopeId));
            _push2(`<div class="h-48 bg-gradient-to-r from-primary to-primary/80 dark:from-gray-800 dark:to-gray-900 transition-all duration-500"${_scopeId}></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative pb-12"${_scopeId}><div class="bg-card text-card-foreground rounded-[2.5rem] shadow-2xl overflow-hidden border border-border transition-all hover:shadow-primary/5"${_scopeId}><div class="md:flex"${_scopeId}><div class="p-8 md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-border bg-muted/30"${_scopeId}><div class="inline-block relative"${_scopeId}><div class="h-32 w-32 rounded-full bg-background p-1 shadow-lg mx-auto md:mx-0 overflow-hidden ring-4 ring-primary/10"${_scopeId}>`);
            if ((_b = __props.seller.profile) == null ? void 0 : _b.avatar) {
              _push2(`<img${ssrRenderAttr("src", "/storage/" + __props.seller.profile.avatar)}${ssrRenderAttr("alt", __props.seller.name)} class="h-full w-full rounded-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<div class="h-full w-full rounded-full bg-primary flex items-center justify-center text-4xl font-black text-primary-foreground"${_scopeId}>${ssrInterpolate(__props.seller.name.charAt(0).toUpperCase())}</div>`);
            }
            _push2(`</div><span class="absolute bottom-2 right-2 block h-5 w-5 rounded-full ring-4 ring-background bg-green-500 shadow-sm" title="Online"${_scopeId}></span></div><div class="flex items-center gap-2 mt-4"${_scopeId}><h1 class="text-2xl font-black"${_scopeId}>${ssrInterpolate(((_c = __props.seller.profile) == null ? void 0 : _c.store_name) || __props.seller.name)}</h1>`);
            if (__props.stats.is_premium) {
              _push2(`<div class="bg-amber-400 text-white p-1 rounded-full shadow-lg shadow-amber-500/30 ring-2 ring-white dark:ring-slate-900" title="Premium Seller"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShieldCheck), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-xs text-muted-foreground mt-1 flex items-center justify-center md:justify-start gap-1 font-bold"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MapPin), { class: "w-3 h-3" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(((_d = __props.seller.profile) == null ? void 0 : _d.city) || "Lokasi tidak diisi")}</p><div class="mt-6 flex flex-col gap-3"${_scopeId}>`);
            if (unref(auth).user && unref(auth).user.id !== __props.seller.id) {
              _push2(`<button class="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-black shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageCircle), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(` Chat Penjual </button>`);
            } else if (unref(auth).user && unref(auth).user.id === __props.seller.id) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("profile.edit"),
                class: "w-full py-3 px-4 bg-background border border-border text-foreground hover:bg-accent rounded-2xl font-black transition-all text-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Edit Profil `);
                  } else {
                    return [
                      createTextVNode(" Edit Profil ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("login"),
                class: "w-full py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-black shadow-xl transition-all text-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Login untuk Chat `);
                  } else {
                    return [
                      createTextVNode(" Login untuk Chat ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div><div class="p-8 md:w-2/3 flex flex-col justify-between"${_scopeId}><div class="grid grid-cols-3 gap-6 text-center mb-10"${_scopeId}><div class="p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors"${_scopeId}><span class="block text-3xl font-black text-foreground"${_scopeId}>${ssrInterpolate(__props.products.length)}</span><span class="text-[10px] text-muted-foreground uppercase font-black tracking-widest"${_scopeId}>Produk Aktif</span></div><div class="p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors"${_scopeId}><span class="block text-3xl font-black text-foreground"${_scopeId}>${ssrInterpolate(__props.stats.sold)}</span><span class="text-[10px] text-muted-foreground uppercase font-black tracking-widest"${_scopeId}>Terjual</span></div><div class="p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors"${_scopeId}><div class="flex items-center justify-center gap-1"${_scopeId}><span class="text-3xl font-black text-foreground"${_scopeId}>${ssrInterpolate(__props.stats.rating.toFixed(1))}</span>`);
            _push2(ssrRenderComponent(unref(Star), { class: "w-6 h-6 text-yellow-500 fill-current" }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-[10px] text-muted-foreground uppercase font-black tracking-widest"${_scopeId}>Rating Toko</span></div></div><div class="prose dark:prose-invert max-w-none"${_scopeId}><h3 class="text-foreground font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2"${_scopeId}><div class="w-1.5 h-4 bg-primary rounded-full"${_scopeId}></div> Tentang Toko </h3><p class="text-muted-foreground text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(((_e = __props.seller.profile) == null ? void 0 : _e.bio) || `Halo! Saya member GawaiSeken sejak ${formattedJoined.value}. Saya menjual barang elektronik bekas berkualitas. Silakan chat untuk bertanya detail kondisi barang.`)}</p></div></div></div><div class="flex border-t border-border bg-card/50 backdrop-blur"${_scopeId}><button class="${ssrRenderClass([activeTab.value === "products" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground", "flex-1 py-5 text-sm font-black border-b-2 transition-all duration-300"])}"${_scopeId}> Etalase (${ssrInterpolate(__props.products.total)}) </button><button class="${ssrRenderClass([activeTab.value === "reviews" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground", "flex-1 py-5 text-sm font-black border-b-2 transition-all duration-300"])}"${_scopeId}> Ulasan (${ssrInterpolate(__props.reviews.length)}) </button></div></div><div class="mt-12 transition-all duration-500"${_scopeId}>`);
            if (activeTab.value === "products") {
              _push2(`<div class="space-y-8 animate-fade-in"${_scopeId}><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5"${_scopeId}><!--[-->`);
              ssrRenderList(__props.products.data, (product) => {
                _push2(ssrRenderComponent(ProductCard, {
                  key: product.id,
                  product,
                  auth: unref(auth)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
              if (__props.products.data.length === 0) {
                _push2(`<div class="col-span-full text-center py-20 bg-card rounded-[2.5rem] border border-border border-dashed shadow-sm"${_scopeId}><div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Package), { class: "w-10 h-10 text-muted-foreground opacity-50" }, null, _parent2, _scopeId));
                _push2(`</div><h3 class="text-xl font-black text-foreground"${_scopeId}>Belum ada barang</h3><p class="text-muted-foreground text-sm"${_scopeId}>Penjual ini belum memajang produk apapun.</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.products.data.length > 0) {
                _push2(`<div class="mt-8"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  links: __props.products.links
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "reviews") {
              _push2(`<div class="max-w-3xl mx-auto space-y-6 animate-fade-in"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reviews, (review) => {
                var _a2, _b2, _c2, _d2;
                _push2(`<div class="bg-card p-6 rounded-3xl border border-border shadow-sm group hover:shadow-md transition-all"${_scopeId}><div class="flex gap-4"${_scopeId}><div class="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0 overflow-hidden shadow-lg shadow-primary/10"${_scopeId}>`);
                if ((_b2 = (_a2 = review.buyer) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.avatar) {
                  _push2(`<img${ssrRenderAttr("src", "/storage/" + review.buyer.profile.avatar)} class="h-full w-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<span${_scopeId}>${ssrInterpolate((_c2 = review.buyer) == null ? void 0 : _c2.name.charAt(0).toUpperCase())}</span>`);
                }
                _push2(`</div><div class="flex-1"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><h4 class="font-black text-foreground"${_scopeId}>${ssrInterpolate((_d2 = review.buyer) == null ? void 0 : _d2.name)}</h4><span class="text-[10px] text-muted-foreground font-bold"${_scopeId}>Ulasan Pelanggan</span></div><div class="flex text-yellow-500 mb-3"${_scopeId}><!--[-->`);
                ssrRenderList(5, (i) => {
                  _push2(ssrRenderComponent(unref(Star), {
                    key: i,
                    class: ["w-3 h-3", { "fill-current": i <= review.rating, "text-muted": i > review.rating }]
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div><p class="text-muted-foreground text-sm leading-relaxed mb-4"${_scopeId}>${ssrInterpolate(review.comment)}</p>`);
                if (review.product) {
                  _push2(`<div class="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground border border-border"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Package), { class: "w-3 h-3" }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(review.product.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.reviews.length === 0) {
                _push2(`<div class="text-center py-20 bg-card rounded-[2.5rem] border border-border border-dashed"${_scopeId}><p class="text-muted-foreground font-bold italic"${_scopeId}>Belum ada ulasan untuk toko ini.</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: ((_f = __props.seller.profile) == null ? void 0 : _f.store_name) || __props.seller.name
              }, null, 8, ["title"]),
              createVNode("div", { class: "h-48 bg-gradient-to-r from-primary to-primary/80 dark:from-gray-800 dark:to-gray-900 transition-all duration-500" }),
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative pb-12" }, [
                createVNode("div", { class: "bg-card text-card-foreground rounded-[2.5rem] shadow-2xl overflow-hidden border border-border transition-all hover:shadow-primary/5" }, [
                  createVNode("div", { class: "md:flex" }, [
                    createVNode("div", { class: "p-8 md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-border bg-muted/30" }, [
                      createVNode("div", { class: "inline-block relative" }, [
                        createVNode("div", { class: "h-32 w-32 rounded-full bg-background p-1 shadow-lg mx-auto md:mx-0 overflow-hidden ring-4 ring-primary/10" }, [
                          ((_g = __props.seller.profile) == null ? void 0 : _g.avatar) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: "/storage/" + __props.seller.profile.avatar,
                            alt: __props.seller.name,
                            class: "h-full w-full rounded-full object-cover"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "h-full w-full rounded-full bg-primary flex items-center justify-center text-4xl font-black text-primary-foreground"
                          }, toDisplayString(__props.seller.name.charAt(0).toUpperCase()), 1))
                        ]),
                        createVNode("span", {
                          class: "absolute bottom-2 right-2 block h-5 w-5 rounded-full ring-4 ring-background bg-green-500 shadow-sm",
                          title: "Online"
                        })
                      ]),
                      createVNode("div", { class: "flex items-center gap-2 mt-4" }, [
                        createVNode("h1", { class: "text-2xl font-black" }, toDisplayString(((_h = __props.seller.profile) == null ? void 0 : _h.store_name) || __props.seller.name), 1),
                        __props.stats.is_premium ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-amber-400 text-white p-1 rounded-full shadow-lg shadow-amber-500/30 ring-2 ring-white dark:ring-slate-900",
                          title: "Premium Seller"
                        }, [
                          createVNode(unref(ShieldCheck), { class: "w-4 h-4" })
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground mt-1 flex items-center justify-center md:justify-start gap-1 font-bold" }, [
                        createVNode(unref(MapPin), { class: "w-3 h-3" }),
                        createTextVNode(" " + toDisplayString(((_i = __props.seller.profile) == null ? void 0 : _i.city) || "Lokasi tidak diisi"), 1)
                      ]),
                      createVNode("div", { class: "mt-6 flex flex-col gap-3" }, [
                        unref(auth).user && unref(auth).user.id !== __props.seller.id ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => _ctx.alert("Fitur Chat segera hadir"),
                          class: "w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-black shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        }, [
                          createVNode(unref(MessageCircle), { class: "w-5 h-5" }),
                          createTextVNode(" Chat Penjual ")
                        ], 8, ["onClick"])) : unref(auth).user && unref(auth).user.id === __props.seller.id ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: _ctx.route("profile.edit"),
                          class: "w-full py-3 px-4 bg-background border border-border text-foreground hover:bg-accent rounded-2xl font-black transition-all text-center"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit Profil ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : (openBlock(), createBlock(unref(Link), {
                          key: 2,
                          href: _ctx.route("login"),
                          class: "w-full py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-black shadow-xl transition-all text-center"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Login untuk Chat ")
                          ]),
                          _: 1
                        }, 8, ["href"]))
                      ])
                    ]),
                    createVNode("div", { class: "p-8 md:w-2/3 flex flex-col justify-between" }, [
                      createVNode("div", { class: "grid grid-cols-3 gap-6 text-center mb-10" }, [
                        createVNode("div", { class: "p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors" }, [
                          createVNode("span", { class: "block text-3xl font-black text-foreground" }, toDisplayString(__props.products.length), 1),
                          createVNode("span", { class: "text-[10px] text-muted-foreground uppercase font-black tracking-widest" }, "Produk Aktif")
                        ]),
                        createVNode("div", { class: "p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors" }, [
                          createVNode("span", { class: "block text-3xl font-black text-foreground" }, toDisplayString(__props.stats.sold), 1),
                          createVNode("span", { class: "text-[10px] text-muted-foreground uppercase font-black tracking-widest" }, "Terjual")
                        ]),
                        createVNode("div", { class: "p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors" }, [
                          createVNode("div", { class: "flex items-center justify-center gap-1" }, [
                            createVNode("span", { class: "text-3xl font-black text-foreground" }, toDisplayString(__props.stats.rating.toFixed(1)), 1),
                            createVNode(unref(Star), { class: "w-6 h-6 text-yellow-500 fill-current" })
                          ]),
                          createVNode("span", { class: "text-[10px] text-muted-foreground uppercase font-black tracking-widest" }, "Rating Toko")
                        ])
                      ]),
                      createVNode("div", { class: "prose dark:prose-invert max-w-none" }, [
                        createVNode("h3", { class: "text-foreground font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2" }, [
                          createVNode("div", { class: "w-1.5 h-4 bg-primary rounded-full" }),
                          createTextVNode(" Tentang Toko ")
                        ]),
                        createVNode("p", { class: "text-muted-foreground text-sm leading-relaxed" }, toDisplayString(((_j = __props.seller.profile) == null ? void 0 : _j.bio) || `Halo! Saya member GawaiSeken sejak ${formattedJoined.value}. Saya menjual barang elektronik bekas berkualitas. Silakan chat untuk bertanya detail kondisi barang.`), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex border-t border-border bg-card/50 backdrop-blur" }, [
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "products",
                      class: ["flex-1 py-5 text-sm font-black border-b-2 transition-all duration-300", activeTab.value === "products" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground"]
                    }, " Etalase (" + toDisplayString(__props.products.total) + ") ", 11, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "reviews",
                      class: ["flex-1 py-5 text-sm font-black border-b-2 transition-all duration-300", activeTab.value === "reviews" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground"]
                    }, " Ulasan (" + toDisplayString(__props.reviews.length) + ") ", 11, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "mt-12 transition-all duration-500" }, [
                  activeTab.value === "products" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-8 animate-fade-in"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                        return openBlock(), createBlock(ProductCard, {
                          key: product.id,
                          product,
                          auth: unref(auth)
                        }, null, 8, ["product", "auth"]);
                      }), 128))
                    ]),
                    __props.products.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-span-full text-center py-20 bg-card rounded-[2.5rem] border border-border border-dashed shadow-sm"
                    }, [
                      createVNode("div", { class: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4" }, [
                        createVNode(unref(Package), { class: "w-10 h-10 text-muted-foreground opacity-50" })
                      ]),
                      createVNode("h3", { class: "text-xl font-black text-foreground" }, "Belum ada barang"),
                      createVNode("p", { class: "text-muted-foreground text-sm" }, "Penjual ini belum memajang produk apapun.")
                    ])) : createCommentVNode("", true),
                    __props.products.data.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-8"
                    }, [
                      createVNode(_sfc_main$2, {
                        links: __props.products.links
                      }, null, 8, ["links"])
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  activeTab.value === "reviews" ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "max-w-3xl mx-auto space-y-6 animate-fade-in"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.reviews, (review) => {
                      var _a2, _b2, _c2, _d2;
                      return openBlock(), createBlock("div", {
                        key: review.id,
                        class: "bg-card p-6 rounded-3xl border border-border shadow-sm group hover:shadow-md transition-all"
                      }, [
                        createVNode("div", { class: "flex gap-4" }, [
                          createVNode("div", { class: "h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0 overflow-hidden shadow-lg shadow-primary/10" }, [
                            ((_b2 = (_a2 = review.buyer) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.avatar) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: "/storage/" + review.buyer.profile.avatar,
                              class: "h-full w-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString((_c2 = review.buyer) == null ? void 0 : _c2.name.charAt(0).toUpperCase()), 1))
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                              createVNode("h4", { class: "font-black text-foreground" }, toDisplayString((_d2 = review.buyer) == null ? void 0 : _d2.name), 1),
                              createVNode("span", { class: "text-[10px] text-muted-foreground font-bold" }, "Ulasan Pelanggan")
                            ]),
                            createVNode("div", { class: "flex text-yellow-500 mb-3" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                return createVNode(unref(Star), {
                                  key: i,
                                  class: ["w-3 h-3", { "fill-current": i <= review.rating, "text-muted": i > review.rating }]
                                }, null, 8, ["class"]);
                              }), 64))
                            ]),
                            createVNode("p", { class: "text-muted-foreground text-sm leading-relaxed mb-4" }, toDisplayString(review.comment), 1),
                            review.product ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground border border-border"
                            }, [
                              createVNode(unref(Package), { class: "w-3 h-3" }),
                              createTextVNode(" " + toDisplayString(review.product.title), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]);
                    }), 128)),
                    __props.reviews.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-20 bg-card rounded-[2.5rem] border border-border border-dashed"
                    }, [
                      createVNode("p", { class: "text-muted-foreground font-bold italic" }, "Belum ada ulasan untuk toko ini.")
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Store/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
