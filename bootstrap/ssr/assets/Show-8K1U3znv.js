import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./AppLayout-BDlcmPtd.js";
import { P as ProductCard } from "./ProductCard-DuFFyYn9.js";
import { ShieldCheck, MapPin, MessageCircle, Star, Package } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./onlineState-BAtS9nBF.js";
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
    const loading = ref(false);
    const allProducts = ref([...props.products.data]);
    const nextUrl = ref(props.products.next_page_url);
    const loadMoreTrigger = ref(null);
    let observer = null;
    const sellerInitial = computed(() => {
      var _a;
      const name = ((_a = props.seller) == null ? void 0 : _a.name) ?? "";
      return name ? name.charAt(0).toUpperCase() : "?";
    });
    const buyerInitial = (buyer) => {
      const name = (buyer == null ? void 0 : buyer.name) ?? "";
      return name ? name.charAt(0).toUpperCase() : "?";
    };
    const loadMore = async () => {
      if (!nextUrl.value || loading.value || activeTab.value !== "products") return;
      loading.value = true;
      try {
        const response = await axios.get(nextUrl.value, {
          headers: {
            "X-Inertia": "true",
            "X-Inertia-Version": usePage().version,
            "X-Inertia-Partial-Component": "Store/Show",
            "X-Inertia-Partial-Data": "products"
          }
        });
        const newProducts = response.data.props.products;
        allProducts.value.push(...newProducts.data);
        nextUrl.value = newProducts.next_page_url;
      } catch (error) {
        console.error("Error loading more store products:", error);
      } finally {
        loading.value = false;
      }
    };
    onMounted(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { rootMargin: "200px" }
      );
      if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
      }
    });
    onUnmounted(() => {
      if (observer) observer.disconnect();
    });
    watch(
      () => props.products,
      (newVal) => {
        if (newVal.current_page === 1) {
          allProducts.value = [...newVal.data];
        }
        nextUrl.value = newVal.next_page_url;
      },
      { deep: true }
    );
    const formattedJoined = computed(() => props.stats.joined);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: ((_a = __props.seller.profile) == null ? void 0 : _a.store_name) || __props.seller.name
            }, null, _parent2, _scopeId));
            _push2(`<div class="h-48 bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 dark:from-gray-800 dark:to-gray-900"${_scopeId}></div><div class="relative mx-auto -mt-24 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden rounded-[2.5rem] border border-border bg-card text-card-foreground shadow-2xl transition-all hover:shadow-primary/5"${_scopeId}><div class="md:flex"${_scopeId}><div class="border-b border-border bg-muted/30 p-8 text-center md:w-1/3 md:border-b-0 md:border-r md:text-left"${_scopeId}><div class="relative inline-block"${_scopeId}><div class="mx-auto h-32 w-32 overflow-hidden rounded-full bg-background p-1 shadow-lg ring-4 ring-primary/10 md:mx-0"${_scopeId}>`);
            if ((_b = __props.seller.profile) == null ? void 0 : _b.avatar) {
              _push2(`<img${ssrRenderAttr("src", "/storage/" + __props.seller.profile.avatar)}${ssrRenderAttr("alt", __props.seller.name)} loading="lazy" class="h-full w-full rounded-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<div class="flex h-full w-full items-center justify-center rounded-full bg-primary text-4xl font-black text-primary-foreground"${_scopeId}>${ssrInterpolate(sellerInitial.value)}</div>`);
            }
            _push2(`</div><span class="absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-500 shadow-sm ring-4 ring-background" title="Online"${_scopeId}></span></div><div class="mt-4 flex items-center gap-2"${_scopeId}><h1 class="text-2xl font-black"${_scopeId}>${ssrInterpolate(((_c = __props.seller.profile) == null ? void 0 : _c.store_name) || __props.seller.name)}</h1>`);
            if (__props.stats.is_premium) {
              _push2(`<div class="rounded-full bg-amber-400 p-1 text-white shadow-lg shadow-amber-500/30 ring-2 ring-white dark:ring-slate-900" title="Premium Seller"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShieldCheck), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="mt-1 flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground md:justify-start"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MapPin), { class: "h-3 w-3" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(((_d = __props.seller.profile) == null ? void 0 : _d.city) || "Lokasi tidak diisi")}</p><div class="mt-6 flex flex-col gap-3"${_scopeId}>`);
            if (unref(auth).user && unref(auth).user.id !== __props.seller.id) {
              _push2(`<button class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-black text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageCircle), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(` Chat Penjual </button>`);
            } else if (unref(auth).user && unref(auth).user.id === __props.seller.id) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("profile.edit"),
                class: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-center font-black text-foreground transition-all hover:bg-accent"
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
                class: "w-full rounded-2xl bg-primary px-4 py-3 text-center font-black text-primary-foreground shadow-xl transition-all"
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
            _push2(`</div></div><div class="flex flex-col justify-between p-8 md:w-2/3"${_scopeId}><div class="mb-10 grid grid-cols-3 gap-6 text-center"${_scopeId}><div class="rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted"${_scopeId}><span class="block text-3xl font-black text-foreground"${_scopeId}>${ssrInterpolate(__props.products.total)}</span><span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground"${_scopeId}>Produk Aktif</span></div><div class="rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted"${_scopeId}><span class="block text-3xl font-black text-foreground"${_scopeId}>${ssrInterpolate(__props.stats.sold)}</span><span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground"${_scopeId}>Terjual</span></div><div class="rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted"${_scopeId}><div class="flex items-center justify-center gap-1"${_scopeId}><span class="text-3xl font-black text-foreground"${_scopeId}>${ssrInterpolate(__props.stats.rating.toFixed(1))}</span>`);
            _push2(ssrRenderComponent(unref(Star), { class: "h-6 w-6 fill-current text-yellow-500" }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground"${_scopeId}>Rating Toko</span></div></div><div class="prose dark:prose-invert max-w-none"${_scopeId}><h3 class="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground"${_scopeId}><div class="h-4 w-1.5 rounded-full bg-primary"${_scopeId}></div> Tentang Toko </h3><p class="text-sm leading-relaxed text-muted-foreground"${_scopeId}>${ssrInterpolate(((_e = __props.seller.profile) == null ? void 0 : _e.bio) || `Halo! Saya member GawaiSeken sejak ${formattedJoined.value}. Saya menjual barang elektronik bekas berkualitas. Silakan chat untuk bertanya detail kondisi barang.`)}</p></div></div></div><div class="flex border-t border-border bg-card/50 backdrop-blur"${_scopeId}><button class="${ssrRenderClass([
              activeTab.value === "products" ? "border-primary bg-primary/5 text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
              "flex-1 border-b-2 py-5 text-sm font-black transition-all duration-300"
            ])}"${_scopeId}> Etalase (${ssrInterpolate(__props.products.total)}) </button><button class="${ssrRenderClass([
              activeTab.value === "reviews" ? "border-primary bg-primary/5 text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
              "flex-1 border-b-2 py-5 text-sm font-black transition-all duration-300"
            ])}"${_scopeId}> Ulasan (${ssrInterpolate(__props.reviews.length)}) </button></div></div><div class="mt-12 transition-all duration-500"${_scopeId}>`);
            if (activeTab.value === "products") {
              _push2(`<div class="animate-fade-in space-y-8"${_scopeId}><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5"${_scopeId}><!--[-->`);
              ssrRenderList(allProducts.value, (product) => {
                _push2(ssrRenderComponent(ProductCard, {
                  key: product.id,
                  product,
                  auth: unref(auth)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
              if (allProducts.value.length === 0) {
                _push2(`<div class="col-span-full rounded-[2.5rem] border border-dashed border-border bg-card py-20 text-center shadow-sm"${_scopeId}><div class="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Package), { class: "h-10 w-10 text-muted-foreground opacity-50" }, null, _parent2, _scopeId));
                _push2(`</div><h3 class="text-xl font-black text-foreground"${_scopeId}>Belum ada barang</h3><p class="text-sm text-muted-foreground"${_scopeId}>Penjual ini belum memajang produk apapun.</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mt-8 flex justify-center pb-4"${_scopeId}>`);
              if (loading.value) {
                _push2(`<div class="flex flex-col items-center gap-2"${_scopeId}><div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"${_scopeId}></div><span class="text-xs font-bold uppercase tracking-widest text-muted-foreground"${_scopeId}>Sambil memuat...</span></div>`);
              } else if (!nextUrl.value && allProducts.value.length > 0) {
                _push2(`<div class="py-4 text-center"${_scopeId}><span class="text-xs font-bold uppercase tracking-widest text-muted-foreground/30"${_scopeId}>Sekian koleksi dari ${ssrInterpolate(((_f = __props.seller.profile) == null ? void 0 : _f.store_name) || __props.seller.name)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "reviews") {
              _push2(`<div class="animate-fade-in mx-auto max-w-3xl space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reviews, (review) => {
                var _a2, _b2, _c2;
                _push2(`<div class="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"${_scopeId}><div class="flex gap-4"${_scopeId}><div class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary font-black text-primary-foreground shadow-lg shadow-primary/10"${_scopeId}>`);
                if ((_b2 = (_a2 = review.buyer) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.avatar) {
                  _push2(`<img${ssrRenderAttr("src", "/storage/" + review.buyer.profile.avatar)} loading="lazy" class="h-full w-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<span${_scopeId}>${ssrInterpolate(buyerInitial(review.buyer))}</span>`);
                }
                _push2(`</div><div class="flex-1"${_scopeId}><div class="mb-2 flex items-center justify-between"${_scopeId}><h4 class="font-black text-foreground"${_scopeId}>${ssrInterpolate((_c2 = review.buyer) == null ? void 0 : _c2.name)}</h4><span class="text-[10px] font-bold text-muted-foreground"${_scopeId}>Ulasan Pelanggan</span></div><div class="mb-3 flex text-yellow-500"${_scopeId}><!--[-->`);
                ssrRenderList(5, (i) => {
                  _push2(ssrRenderComponent(unref(Star), {
                    key: i,
                    class: ["h-3 w-3", { "fill-current": i <= review.rating, "text-muted": i > review.rating }]
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div><p class="mb-4 text-sm leading-relaxed text-muted-foreground"${_scopeId}>${ssrInterpolate(review.comment)}</p>`);
                if (review.product) {
                  _push2(`<div class="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-bold text-muted-foreground"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Package), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(review.product.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.reviews.length === 0) {
                _push2(`<div class="rounded-[2.5rem] border border-dashed border-border bg-card py-20 text-center"${_scopeId}><p class="font-bold italic text-muted-foreground"${_scopeId}>Belum ada ulasan untuk toko ini.</p></div>`);
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
                title: ((_g = __props.seller.profile) == null ? void 0 : _g.store_name) || __props.seller.name
              }, null, 8, ["title"]),
              createVNode("div", { class: "h-48 bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 dark:from-gray-800 dark:to-gray-900" }),
              createVNode("div", { class: "relative mx-auto -mt-24 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "overflow-hidden rounded-[2.5rem] border border-border bg-card text-card-foreground shadow-2xl transition-all hover:shadow-primary/5" }, [
                  createVNode("div", { class: "md:flex" }, [
                    createVNode("div", { class: "border-b border-border bg-muted/30 p-8 text-center md:w-1/3 md:border-b-0 md:border-r md:text-left" }, [
                      createVNode("div", { class: "relative inline-block" }, [
                        createVNode("div", { class: "mx-auto h-32 w-32 overflow-hidden rounded-full bg-background p-1 shadow-lg ring-4 ring-primary/10 md:mx-0" }, [
                          ((_h = __props.seller.profile) == null ? void 0 : _h.avatar) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: "/storage/" + __props.seller.profile.avatar,
                            alt: __props.seller.name,
                            loading: "lazy",
                            class: "h-full w-full rounded-full object-cover"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex h-full w-full items-center justify-center rounded-full bg-primary text-4xl font-black text-primary-foreground"
                          }, toDisplayString(sellerInitial.value), 1))
                        ]),
                        createVNode("span", {
                          class: "absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-500 shadow-sm ring-4 ring-background",
                          title: "Online"
                        })
                      ]),
                      createVNode("div", { class: "mt-4 flex items-center gap-2" }, [
                        createVNode("h1", { class: "text-2xl font-black" }, toDisplayString(((_i = __props.seller.profile) == null ? void 0 : _i.store_name) || __props.seller.name), 1),
                        __props.stats.is_premium ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-full bg-amber-400 p-1 text-white shadow-lg shadow-amber-500/30 ring-2 ring-white dark:ring-slate-900",
                          title: "Premium Seller"
                        }, [
                          createVNode(unref(ShieldCheck), { class: "h-4 w-4" })
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("p", { class: "mt-1 flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground md:justify-start" }, [
                        createVNode(unref(MapPin), { class: "h-3 w-3" }),
                        createTextVNode(" " + toDisplayString(((_j = __props.seller.profile) == null ? void 0 : _j.city) || "Lokasi tidak diisi"), 1)
                      ]),
                      createVNode("div", { class: "mt-6 flex flex-col gap-3" }, [
                        unref(auth).user && unref(auth).user.id !== __props.seller.id ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => _ctx.alert("Fitur Chat segera hadir"),
                          class: "flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-black text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90"
                        }, [
                          createVNode(unref(MessageCircle), { class: "h-5 w-5" }),
                          createTextVNode(" Chat Penjual ")
                        ], 8, ["onClick"])) : unref(auth).user && unref(auth).user.id === __props.seller.id ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: _ctx.route("profile.edit"),
                          class: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-center font-black text-foreground transition-all hover:bg-accent"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit Profil ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : (openBlock(), createBlock(unref(Link), {
                          key: 2,
                          href: _ctx.route("login"),
                          class: "w-full rounded-2xl bg-primary px-4 py-3 text-center font-black text-primary-foreground shadow-xl transition-all"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Login untuk Chat ")
                          ]),
                          _: 1
                        }, 8, ["href"]))
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-col justify-between p-8 md:w-2/3" }, [
                      createVNode("div", { class: "mb-10 grid grid-cols-3 gap-6 text-center" }, [
                        createVNode("div", { class: "rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted" }, [
                          createVNode("span", { class: "block text-3xl font-black text-foreground" }, toDisplayString(__props.products.total), 1),
                          createVNode("span", { class: "text-[10px] font-black uppercase tracking-widest text-muted-foreground" }, "Produk Aktif")
                        ]),
                        createVNode("div", { class: "rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted" }, [
                          createVNode("span", { class: "block text-3xl font-black text-foreground" }, toDisplayString(__props.stats.sold), 1),
                          createVNode("span", { class: "text-[10px] font-black uppercase tracking-widest text-muted-foreground" }, "Terjual")
                        ]),
                        createVNode("div", { class: "rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted" }, [
                          createVNode("div", { class: "flex items-center justify-center gap-1" }, [
                            createVNode("span", { class: "text-3xl font-black text-foreground" }, toDisplayString(__props.stats.rating.toFixed(1)), 1),
                            createVNode(unref(Star), { class: "h-6 w-6 fill-current text-yellow-500" })
                          ]),
                          createVNode("span", { class: "text-[10px] font-black uppercase tracking-widest text-muted-foreground" }, "Rating Toko")
                        ])
                      ]),
                      createVNode("div", { class: "prose dark:prose-invert max-w-none" }, [
                        createVNode("h3", { class: "mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground" }, [
                          createVNode("div", { class: "h-4 w-1.5 rounded-full bg-primary" }),
                          createTextVNode(" Tentang Toko ")
                        ]),
                        createVNode("p", { class: "text-sm leading-relaxed text-muted-foreground" }, toDisplayString(((_k = __props.seller.profile) == null ? void 0 : _k.bio) || `Halo! Saya member GawaiSeken sejak ${formattedJoined.value}. Saya menjual barang elektronik bekas berkualitas. Silakan chat untuk bertanya detail kondisi barang.`), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex border-t border-border bg-card/50 backdrop-blur" }, [
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "products",
                      class: [
                        "flex-1 border-b-2 py-5 text-sm font-black transition-all duration-300",
                        activeTab.value === "products" ? "border-primary bg-primary/5 text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                      ]
                    }, " Etalase (" + toDisplayString(__props.products.total) + ") ", 11, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "reviews",
                      class: [
                        "flex-1 border-b-2 py-5 text-sm font-black transition-all duration-300",
                        activeTab.value === "reviews" ? "border-primary bg-primary/5 text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                      ]
                    }, " Ulasan (" + toDisplayString(__props.reviews.length) + ") ", 11, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "mt-12 transition-all duration-500" }, [
                  activeTab.value === "products" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "animate-fade-in space-y-8"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(allProducts.value, (product) => {
                        return openBlock(), createBlock(ProductCard, {
                          key: product.id,
                          product,
                          auth: unref(auth)
                        }, null, 8, ["product", "auth"]);
                      }), 128))
                    ]),
                    allProducts.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-span-full rounded-[2.5rem] border border-dashed border-border bg-card py-20 text-center shadow-sm"
                    }, [
                      createVNode("div", { class: "mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted" }, [
                        createVNode(unref(Package), { class: "h-10 w-10 text-muted-foreground opacity-50" })
                      ]),
                      createVNode("h3", { class: "text-xl font-black text-foreground" }, "Belum ada barang"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Penjual ini belum memajang produk apapun.")
                    ])) : createCommentVNode("", true),
                    createVNode("div", {
                      ref_key: "loadMoreTrigger",
                      ref: loadMoreTrigger,
                      class: "mt-8 flex justify-center pb-4"
                    }, [
                      loading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col items-center gap-2"
                      }, [
                        createVNode("div", { class: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }),
                        createVNode("span", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground" }, "Sambil memuat...")
                      ])) : !nextUrl.value && allProducts.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "py-4 text-center"
                      }, [
                        createVNode("span", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground/30" }, "Sekian koleksi dari " + toDisplayString(((_l = __props.seller.profile) == null ? void 0 : _l.store_name) || __props.seller.name), 1)
                      ])) : createCommentVNode("", true)
                    ], 512)
                  ])) : createCommentVNode("", true),
                  activeTab.value === "reviews" ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "animate-fade-in mx-auto max-w-3xl space-y-6"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.reviews, (review) => {
                      var _a2, _b2, _c2;
                      return openBlock(), createBlock("div", {
                        key: review.id,
                        class: "group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                      }, [
                        createVNode("div", { class: "flex gap-4" }, [
                          createVNode("div", { class: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary font-black text-primary-foreground shadow-lg shadow-primary/10" }, [
                            ((_b2 = (_a2 = review.buyer) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.avatar) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: "/storage/" + review.buyer.profile.avatar,
                              loading: "lazy",
                              class: "h-full w-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(buyerInitial(review.buyer)), 1))
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "mb-2 flex items-center justify-between" }, [
                              createVNode("h4", { class: "font-black text-foreground" }, toDisplayString((_c2 = review.buyer) == null ? void 0 : _c2.name), 1),
                              createVNode("span", { class: "text-[10px] font-bold text-muted-foreground" }, "Ulasan Pelanggan")
                            ]),
                            createVNode("div", { class: "mb-3 flex text-yellow-500" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                return createVNode(unref(Star), {
                                  key: i,
                                  class: ["h-3 w-3", { "fill-current": i <= review.rating, "text-muted": i > review.rating }]
                                }, null, 8, ["class"]);
                              }), 64))
                            ]),
                            createVNode("p", { class: "mb-4 text-sm leading-relaxed text-muted-foreground" }, toDisplayString(review.comment), 1),
                            review.product ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-bold text-muted-foreground"
                            }, [
                              createVNode(unref(Package), { class: "h-3 w-3" }),
                              createTextVNode(" " + toDisplayString(review.product.title), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]);
                    }), 128)),
                    __props.reviews.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-[2.5rem] border border-dashed border-border bg-card py-20 text-center"
                    }, [
                      createVNode("p", { class: "font-bold italic text-muted-foreground" }, "Belum ada ulasan untuk toko ini.")
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
