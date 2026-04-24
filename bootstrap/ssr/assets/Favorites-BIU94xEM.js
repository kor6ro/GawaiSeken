import { ref, onMounted, onUnmounted, watch, withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Head, Link, usePage } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import { P as ProductCard } from "./ProductCard-DSHJPsZ5.js";
import { ShoppingCart, Package } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Favorites",
  __ssrInlineRender: true,
  props: {
    products: Object,
    auth: Object
  },
  setup(__props) {
    const props = __props;
    const loading = ref(false);
    const allProducts = ref([...props.products.data]);
    const nextUrl = ref(props.products.next_page_url);
    const loadMoreTrigger = ref(null);
    let observer = null;
    const loadMore = async () => {
      if (!nextUrl.value || loading.value) return;
      loading.value = true;
      try {
        const response = await axios.get(nextUrl.value, {
          headers: {
            "X-Inertia": "true",
            "X-Inertia-Version": usePage().version,
            "X-Inertia-Partial-Component": "Products/Favorites",
            "X-Inertia-Partial-Data": "products"
          }
        });
        const newProducts = response.data.props.products;
        allProducts.value.push(...newProducts.data);
        nextUrl.value = newProducts.next_page_url;
      } catch (error) {
        console.error("Error loading more favorites:", error);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Keranjang Saya" }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-screen bg-slate-50 py-12 dark:bg-slate-950"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-10 flex items-center gap-4"${_scopeId}><div class="rounded-2xl bg-primary p-3 shadow-lg shadow-primary/20"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingCart), { class: "h-8 w-8 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h1 class="text-3xl font-black text-slate-900 dark:text-white"${_scopeId}>Keranjang Saya</h1><p class="font-medium text-slate-500 dark:text-slate-400"${_scopeId}> Produk yang Anda taruh di keranjang. </p></div></div>`);
            if (allProducts.value.length > 0) {
              _push2(`<div class="space-y-8"${_scopeId}><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5"${_scopeId}><!--[-->`);
              ssrRenderList(allProducts.value, (product) => {
                _push2(ssrRenderComponent(ProductCard, {
                  key: product.id,
                  product,
                  auth: __props.auth
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><div class="mt-12 flex justify-center pb-8"${_scopeId}>`);
              if (loading.value) {
                _push2(`<div class="flex flex-col items-center gap-2"${_scopeId}><div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"${_scopeId}></div><span class="text-xs font-bold uppercase tracking-widest text-muted-foreground"${_scopeId}>Memuat favorit...</span></div>`);
              } else if (!nextUrl.value && allProducts.value.length > 0) {
                _push2(`<div class="py-4 text-center"${_scopeId}><div class="flex items-center gap-3 text-muted-foreground/30"${_scopeId}><div class="h-px w-8 bg-current"${_scopeId}></div><span class="text-[10px] font-black uppercase tracking-[0.2em]"${_scopeId}>Ini semua barang favorit Anda</span><div class="h-px w-8 bg-current"${_scopeId}></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900"${_scopeId}><div class="mb-4 rounded-full bg-slate-50 p-6 dark:bg-slate-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Package), { class: "h-12 w-12 text-slate-300 dark:text-slate-600" }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-xl font-bold text-slate-900 dark:text-white"${_scopeId}>Keranjang Kosong</h3><p class="mb-8 mt-2 text-slate-500 dark:text-slate-400"${_scopeId}> Anda belum memasukkan produk apapun ke keranjang. </p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("home"),
                class: "rounded-2xl bg-primary px-8 py-3 font-black text-white shadow-xl shadow-primary/20 transition-all hover:scale-105"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Cari Produk Sekarang `);
                  } else {
                    return [
                      createTextVNode(" Cari Produk Sekarang ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Keranjang Saya" }),
              createVNode("div", { class: "min-h-screen bg-slate-50 py-12 dark:bg-slate-950" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-10 flex items-center gap-4" }, [
                    createVNode("div", { class: "rounded-2xl bg-primary p-3 shadow-lg shadow-primary/20" }, [
                      createVNode(unref(ShoppingCart), { class: "h-8 w-8 text-white" })
                    ]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-black text-slate-900 dark:text-white" }, "Keranjang Saya"),
                      createVNode("p", { class: "font-medium text-slate-500 dark:text-slate-400" }, " Produk yang Anda taruh di keranjang. ")
                    ])
                  ]),
                  allProducts.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-8"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(allProducts.value, (product) => {
                        return openBlock(), createBlock(ProductCard, {
                          key: product.id,
                          product,
                          auth: __props.auth
                        }, null, 8, ["product", "auth"]);
                      }), 128))
                    ]),
                    createVNode("div", {
                      ref_key: "loadMoreTrigger",
                      ref: loadMoreTrigger,
                      class: "mt-12 flex justify-center pb-8"
                    }, [
                      loading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col items-center gap-2"
                      }, [
                        createVNode("div", { class: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }),
                        createVNode("span", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground" }, "Memuat favorit...")
                      ])) : !nextUrl.value && allProducts.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "py-4 text-center"
                      }, [
                        createVNode("div", { class: "flex items-center gap-3 text-muted-foreground/30" }, [
                          createVNode("div", { class: "h-px w-8 bg-current" }),
                          createVNode("span", { class: "text-[10px] font-black uppercase tracking-[0.2em]" }, "Ini semua barang favorit Anda"),
                          createVNode("div", { class: "h-px w-8 bg-current" })
                        ])
                      ])) : createCommentVNode("", true)
                    ], 512)
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900"
                  }, [
                    createVNode("div", { class: "mb-4 rounded-full bg-slate-50 p-6 dark:bg-slate-800" }, [
                      createVNode(unref(Package), { class: "h-12 w-12 text-slate-300 dark:text-slate-600" })
                    ]),
                    createVNode("h3", { class: "text-xl font-bold text-slate-900 dark:text-white" }, "Keranjang Kosong"),
                    createVNode("p", { class: "mb-8 mt-2 text-slate-500 dark:text-slate-400" }, " Anda belum memasukkan produk apapun ke keranjang. "),
                    createVNode(unref(Link), {
                      href: _ctx.route("home"),
                      class: "rounded-2xl bg-primary px-8 py-3 font-black text-white shadow-xl shadow-primary/20 transition-all hover:scale-105"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cari Produk Sekarang ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
