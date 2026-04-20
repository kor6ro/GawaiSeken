import { withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B-phu6gS.js";
import { P as ProductCard } from "./ProductCard-HF6P34i5.js";
import { ShoppingCart, Package } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./Pagination-p2pafXsX.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-Cw8mmzBN.js";
import "lodash/pickBy.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Favorites",
  __ssrInlineRender: true,
  props: {
    products: Object,
    auth: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Keranjang Saya" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex items-center gap-4 mb-10"${_scopeId}><div class="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingCart), { class: "w-8 h-8 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h1 class="text-3xl font-black text-slate-900 dark:text-white"${_scopeId}>Keranjang Saya</h1><p class="text-slate-500 dark:text-slate-400 font-medium"${_scopeId}>Produk yang Anda taruh di keranjang.</p></div></div>`);
            if (__props.products.data.length > 0) {
              _push2(`<div class="space-y-8"${_scopeId}><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5"${_scopeId}><!--[-->`);
              ssrRenderList(__props.products.data, (product) => {
                _push2(ssrRenderComponent(ProductCard, {
                  key: product.id,
                  product,
                  auth: __props.auth
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><div class="mt-8 flex justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                links: __props.products.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800"${_scopeId}><div class="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Package), { class: "w-12 h-12 text-slate-300 dark:text-slate-600" }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-xl font-bold text-slate-900 dark:text-white"${_scopeId}>Keranjang Kosong</h3><p class="text-slate-500 dark:text-slate-400 mt-2 mb-8"${_scopeId}>Anda belum memasukkan produk apapun ke keranjang.</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("home"),
                class: "px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all"
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
              createVNode("div", { class: "py-12 bg-slate-50 dark:bg-slate-950 min-h-screen" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex items-center gap-4 mb-10" }, [
                    createVNode("div", { class: "p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20" }, [
                      createVNode(unref(ShoppingCart), { class: "w-8 h-8 text-white" })
                    ]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-black text-slate-900 dark:text-white" }, "Keranjang Saya"),
                      createVNode("p", { class: "text-slate-500 dark:text-slate-400 font-medium" }, "Produk yang Anda taruh di keranjang.")
                    ])
                  ]),
                  __props.products.data.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-8"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                        return openBlock(), createBlock(ProductCard, {
                          key: product.id,
                          product,
                          auth: __props.auth
                        }, null, 8, ["product", "auth"]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "mt-8 flex justify-center" }, [
                      createVNode(_sfc_main$2, {
                        links: __props.products.links
                      }, null, 8, ["links"])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                  }, [
                    createVNode("div", { class: "p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-4" }, [
                      createVNode(unref(Package), { class: "w-12 h-12 text-slate-300 dark:text-slate-600" })
                    ]),
                    createVNode("h3", { class: "text-xl font-bold text-slate-900 dark:text-white" }, "Keranjang Kosong"),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 mt-2 mb-8" }, "Anda belum memasukkan produk apapun ke keranjang."),
                    createVNode(unref(Link), {
                      href: _ctx.route("home"),
                      class: "px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all"
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
