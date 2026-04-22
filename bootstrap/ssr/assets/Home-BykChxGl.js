import { ref, shallowRef, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { router, Head, usePage } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./AppLayout-x9cx5faw.js";
import { P as ProductCard } from "./ProductCard-DuFFyYn9.js";
import "./Modal-C0YBTj_6.js";
import { Search } from "lucide-vue-next";
import debounce from "lodash/debounce.js";
import pickBy from "lodash/pickBy.js";
import { useIntersectionObserver } from "@vueuse/core";
import "./ApplicationLogo-5BXBKbkR.js";
import "./onlineState-BAtS9nBF.js";
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
    const allProducts = shallowRef([...props.products.data]);
    const nextUrl = ref(props.products.next_page_url);
    const loadMoreTrigger = ref(null);
    const loadMore = async () => {
      if (!nextUrl.value || loading.value) return;
      loading.value = true;
      try {
        const response = await axios.get(nextUrl.value, {
          headers: {
            "X-Inertia": "true",
            "X-Inertia-Version": usePage().version,
            "X-Inertia-Partial-Component": "Home",
            // Ensure fetching correct component partial
            "X-Inertia-Partial-Data": "products"
          }
        });
        const newProducts = response.data.props.products;
        allProducts.value = [...allProducts.value, ...newProducts.data];
        nextUrl.value = newProducts.next_page_url;
      } catch (error) {
        console.error("Error loading more products:", error);
      } finally {
        loading.value = false;
      }
    };
    useIntersectionObserver(
      loadMoreTrigger,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          loadMore();
        }
      },
      {
        // Increase root margin to buffer loading before user actually reaches the end
        rootMargin: "400px 0px"
      }
    );
    watch(
      () => props.products,
      (newVal) => {
        if (newVal.current_page === 1) {
          allProducts.value = [...newVal.data];
        }
        nextUrl.value = newVal.next_page_url;
      },
      { deep: false }
      // Avoid deep watching the entire products object!
    );
    const filterParams = ref({
      category: props.filters.category || "",
      ram: props.filters.ram || "",
      storage: props.filters.storage || "",
      kelengkapan: props.filters.kelengkapan || "",
      sort: props.filters.sort || "latest"
    });
    const performSearch = debounce(() => {
      loading.value = true;
      let params = pickBy(
        {
          search: search.value,
          ...filterParams.value
        },
        (value, key) => {
          if (key === "sort" && value === "latest") return false;
          return value !== "" && value !== null && value !== void 0;
        }
      );
      router.get(route("home"), params, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => loading.value = false
      });
    }, 500);
    watch(
      () => props.filters.search,
      (newVal) => {
        search.value = newVal || "";
      }
    );
    watch(search, () => {
      performSearch();
    });
    const applyFilters = () => {
      filterModalOpen.value = false;
      let params = pickBy(
        {
          search: search.value,
          ...filterParams.value
        },
        (value, key) => {
          if (key === "sort" && value === "latest") return false;
          return value !== "" && value !== null && value !== void 0;
        }
      );
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
            _push2(`<div class="px-4 py-8"${_scopeId}><div class="mx-auto max-w-7xl"${_scopeId}>`);
            if (hasActiveFilters()) {
              _push2(`<div class="mb-6 flex items-center justify-between rounded-xl border border-border bg-card p-4"${_scopeId}><div class="flex flex-wrap items-center gap-2"${_scopeId}><span class="mr-2 text-sm font-medium text-muted-foreground"${_scopeId}>Hasil untuk:</span>`);
              if (search.value) {
                _push2(`<span class="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"${_scopeId}>&quot;${ssrInterpolate(search.value)}&quot;</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (filterParams.value.category) {
                _push2(`<span class="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"${_scopeId}>${ssrInterpolate(filterParams.value.category)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (filterParams.value.ram) {
                _push2(`<span class="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"${_scopeId}>RAM: ${ssrInterpolate(filterParams.value.ram)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (filterParams.value.storage) {
                _push2(`<span class="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"${_scopeId}>ROM: ${ssrInterpolate(filterParams.value.storage)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><button class="text-xs font-bold text-red-500 hover:underline"${_scopeId}> Hapus Semua </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5"${_scopeId}><!--[-->`);
            ssrRenderList(allProducts.value, (product) => {
              _push2(ssrRenderComponent(ProductCard, {
                key: product.id,
                product,
                auth: __props.auth
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
            if (allProducts.value.length === 0) {
              _push2(`<div class="col-span-full rounded-2xl border border-dashed border-border bg-card py-20 text-center text-card-foreground transition-colors"${_scopeId}><div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Search), { class: "h-8 w-8 text-gray-400 dark:text-gray-500" }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}>Tidak ditemukan</h3><p class="mt-1 text-gray-500 dark:text-gray-400"${_scopeId}> Coba kata kunci lain atau reset filter. </p><button class="mt-4 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"${_scopeId}> Reset Filter </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-12 flex justify-center"${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="flex w-full flex-col items-center gap-6 py-6"${_scopeId}><div class="flex gap-2"${_scopeId}><div class="h-3 w-3 animate-[bounce_1s_infinite_0ms] rounded-full bg-primary/70"${_scopeId}></div><div class="h-3 w-3 animate-[bounce_1s_infinite_200ms] rounded-full bg-primary/80"${_scopeId}></div><div class="h-3 w-3 animate-[bounce_1s_infinite_400ms] rounded-full bg-primary/90"${_scopeId}></div></div><span class="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60"${_scopeId}>Mengambil Data Produk...</span></div>`);
            } else if (!nextUrl.value && allProducts.value.length > 0) {
              _push2(`<div class="py-8 text-center"${_scopeId}><div class="flex items-center gap-3 text-muted-foreground/40"${_scopeId}><div class="h-px w-8 bg-current"${_scopeId}></div><span class="text-[10px] font-black uppercase tracking-[0.2em]"${_scopeId}>Semua produk telah ditampilkan</span><div class="h-px w-8 bg-current"${_scopeId}></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Home" }),
              createVNode("div", { class: "px-4 py-8" }, [
                createVNode("div", { class: "mx-auto max-w-7xl" }, [
                  hasActiveFilters() ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 flex items-center justify-between rounded-xl border border-border bg-card p-4"
                  }, [
                    createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                      createVNode("span", { class: "mr-2 text-sm font-medium text-muted-foreground" }, "Hasil untuk:"),
                      search.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                      }, '"' + toDisplayString(search.value) + '"', 1)) : createCommentVNode("", true),
                      filterParams.value.category ? (openBlock(), createBlock("span", {
                        key: 1,
                        class: "rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"
                      }, toDisplayString(filterParams.value.category), 1)) : createCommentVNode("", true),
                      filterParams.value.ram ? (openBlock(), createBlock("span", {
                        key: 2,
                        class: "rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"
                      }, "RAM: " + toDisplayString(filterParams.value.ram), 1)) : createCommentVNode("", true),
                      filterParams.value.storage ? (openBlock(), createBlock("span", {
                        key: 3,
                        class: "rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"
                      }, "ROM: " + toDisplayString(filterParams.value.storage), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("button", {
                      onClick: resetFilters,
                      class: "text-xs font-bold text-red-500 hover:underline"
                    }, " Hapus Semua ")
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(allProducts.value, (product) => {
                      return openBlock(), createBlock(ProductCard, {
                        key: product.id,
                        product,
                        auth: __props.auth
                      }, null, 8, ["product", "auth"]);
                    }), 128))
                  ]),
                  allProducts.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "col-span-full rounded-2xl border border-dashed border-border bg-card py-20 text-center text-card-foreground transition-colors"
                  }, [
                    createVNode("div", { class: "mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700" }, [
                      createVNode(unref(Search), { class: "h-8 w-8 text-gray-400 dark:text-gray-500" })
                    ]),
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-gray-100" }, "Tidak ditemukan"),
                    createVNode("p", { class: "mt-1 text-gray-500 dark:text-gray-400" }, " Coba kata kunci lain atau reset filter. "),
                    createVNode("button", {
                      onClick: resetFilters,
                      class: "mt-4 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    }, " Reset Filter ")
                  ])) : createCommentVNode("", true),
                  createVNode("div", {
                    ref_key: "loadMoreTrigger",
                    ref: loadMoreTrigger,
                    class: "mt-12 flex justify-center"
                  }, [
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex w-full flex-col items-center gap-6 py-6"
                    }, [
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("div", { class: "h-3 w-3 animate-[bounce_1s_infinite_0ms] rounded-full bg-primary/70" }),
                        createVNode("div", { class: "h-3 w-3 animate-[bounce_1s_infinite_200ms] rounded-full bg-primary/80" }),
                        createVNode("div", { class: "h-3 w-3 animate-[bounce_1s_infinite_400ms] rounded-full bg-primary/90" })
                      ]),
                      createVNode("span", { class: "text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60" }, "Mengambil Data Produk...")
                    ])) : !nextUrl.value && allProducts.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-8 text-center"
                    }, [
                      createVNode("div", { class: "flex items-center gap-3 text-muted-foreground/40" }, [
                        createVNode("div", { class: "h-px w-8 bg-current" }),
                        createVNode("span", { class: "text-[10px] font-black uppercase tracking-[0.2em]" }, "Semua produk telah ditampilkan"),
                        createVNode("div", { class: "h-px w-8 bg-current" })
                      ])
                    ])) : createCommentVNode("", true)
                  ], 512)
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
