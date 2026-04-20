import { ref, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { router, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B-phu6gS.js";
import { P as ProductCard } from "./ProductCard-HF6P34i5.js";
import { _ as _sfc_main$2 } from "./Pagination-p2pafXsX.js";
import "./Modal-Cw8mmzBN.js";
import { Search } from "lucide-vue-next";
import debounce from "lodash/debounce.js";
import pickBy from "lodash/pickBy.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    products: Object,
    categories: Array,
    rams: Array,
    storages: Array,
    kelengkapan: Array,
    filters: Object,
    auth: Object
  },
  setup(__props) {
    const props = __props;
    const filterModalOpen = ref(false);
    const search = ref(props.filters.search || "");
    const loading = ref(false);
    const filterParams = ref({
      category: props.filters.category || "",
      ram: props.filters.ram || "",
      storage: props.filters.storage || "",
      kelengkapan: props.filters.kelengkapan || "",
      sort: props.filters.sort || "latest"
    });
    const performSearch = debounce(() => {
      loading.value = true;
      let params = pickBy({
        search: search.value,
        ...filterParams.value
      }, (value, key) => {
        if (key === "sort" && value === "latest") return false;
        return value !== "" && value !== null && value !== void 0;
      });
      router.get(route("home"), params, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => loading.value = false
      });
    }, 500);
    watch(() => props.filters.search, (newVal) => {
      search.value = newVal || "";
    });
    watch(search, () => {
      performSearch();
    });
    const applyFilters = () => {
      filterModalOpen.value = false;
      let params = pickBy({
        search: search.value,
        ...filterParams.value
      }, (value, key) => {
        if (key === "sort" && value === "latest") return false;
        return value !== "" && value !== null && value !== void 0;
      });
      router.get(route("home"), params, {
        preserveState: true
      });
    };
    const resetFilters = () => {
      search.value = "";
      filterParams.value = {
        category: "",
        ram: "",
        storage: "",
        kelengkapan: "",
        sort: "latest"
      };
      applyFilters();
    };
    const hasActiveFilters = () => {
      return filterParams.value.category || filterParams.value.ram || filterParams.value.storage || filterParams.value.kelengkapan || filterParams.value.sort && filterParams.value.sort !== "latest" || search.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Home" }, null, _parent2, _scopeId));
            _push2(`<div class="py-8 px-4"${_scopeId}><div class="max-w-7xl mx-auto"${_scopeId}>`);
            if (hasActiveFilters()) {
              _push2(`<div class="mb-6 flex items-center justify-between bg-card p-4 rounded-xl border border-border"${_scopeId}><div class="flex items-center gap-2 flex-wrap"${_scopeId}><span class="text-sm font-medium text-muted-foreground mr-2"${_scopeId}>Hasil untuk:</span>`);
              if (search.value) {
                _push2(`<span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20"${_scopeId}>&quot;${ssrInterpolate(search.value)}&quot;</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (filterParams.value.category) {
                _push2(`<span class="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border"${_scopeId}>${ssrInterpolate(filterParams.value.category)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (filterParams.value.ram) {
                _push2(`<span class="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border"${_scopeId}>RAM: ${ssrInterpolate(filterParams.value.ram)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (filterParams.value.storage) {
                _push2(`<span class="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border"${_scopeId}>ROM: ${ssrInterpolate(filterParams.value.storage)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><button class="text-xs text-red-500 font-bold hover:underline"${_scopeId}>Hapus Semua</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5"${_scopeId}><!--[-->`);
            ssrRenderList(__props.products.data, (product) => {
              _push2(ssrRenderComponent(ProductCard, {
                key: product.id,
                product,
                auth: __props.auth
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
            if (__props.products.data.length === 0) {
              _push2(`<div class="col-span-full py-20 text-center bg-card text-card-foreground rounded-2xl border border-dashed border-border transition-colors"${_scopeId}><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Search), { class: "w-8 h-8 text-gray-400 dark:text-gray-500" }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}>Tidak ditemukan</h3><p class="text-gray-500 dark:text-gray-400 mt-1"${_scopeId}>Coba kata kunci lain atau reset filter.</p><button class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"${_scopeId}> Reset Filter </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.products.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Home" }),
              createVNode("div", { class: "py-8 px-4" }, [
                createVNode("div", { class: "max-w-7xl mx-auto" }, [
                  hasActiveFilters() ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 flex items-center justify-between bg-card p-4 rounded-xl border border-border"
                  }, [
                    createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                      createVNode("span", { class: "text-sm font-medium text-muted-foreground mr-2" }, "Hasil untuk:"),
                      search.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20"
                      }, '"' + toDisplayString(search.value) + '"', 1)) : createCommentVNode("", true),
                      filterParams.value.category ? (openBlock(), createBlock("span", {
                        key: 1,
                        class: "bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border"
                      }, toDisplayString(filterParams.value.category), 1)) : createCommentVNode("", true),
                      filterParams.value.ram ? (openBlock(), createBlock("span", {
                        key: 2,
                        class: "bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border"
                      }, "RAM: " + toDisplayString(filterParams.value.ram), 1)) : createCommentVNode("", true),
                      filterParams.value.storage ? (openBlock(), createBlock("span", {
                        key: 3,
                        class: "bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border"
                      }, "ROM: " + toDisplayString(filterParams.value.storage), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("button", {
                      onClick: resetFilters,
                      class: "text-xs text-red-500 font-bold hover:underline"
                    }, "Hapus Semua")
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                      return openBlock(), createBlock(ProductCard, {
                        key: product.id,
                        product,
                        auth: __props.auth
                      }, null, 8, ["product", "auth"]);
                    }), 128))
                  ]),
                  __props.products.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "col-span-full py-20 text-center bg-card text-card-foreground rounded-2xl border border-dashed border-border transition-colors"
                  }, [
                    createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700 mb-4" }, [
                      createVNode(unref(Search), { class: "w-8 h-8 text-gray-400 dark:text-gray-500" })
                    ]),
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-gray-100" }, "Tidak ditemukan"),
                    createVNode("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, "Coba kata kunci lain atau reset filter."),
                    createVNode("button", {
                      onClick: resetFilters,
                      class: "mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
                    }, " Reset Filter ")
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "mt-8" }, [
                    createVNode(_sfc_main$2, {
                      links: __props.products.links
                    }, null, 8, ["links"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
