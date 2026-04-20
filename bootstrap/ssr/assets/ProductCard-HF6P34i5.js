import { ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { Zap, Handshake, X, ShoppingCart, Flag, ImageOff, Star, MapPin, Clock, AlertTriangle } from "lucide-vue-next";
import { _ as _sfc_main$1 } from "./Modal-Cw8mmzBN.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: Object,
    auth: Object
  },
  setup(__props) {
    const props = __props;
    const activeImage = ref(0);
    const showRemoveModal = ref(false);
    const isFavorited = computed(() => {
      var _a, _b;
      return (_b = (_a = props.auth.user) == null ? void 0 : _a.favorites) == null ? void 0 : _b.includes(props.product.id);
    });
    const submitToggle = () => {
      showRemoveModal.value = false;
      router.post(route("products.toggle-favorite", props.product.id), {}, {
        preserveScroll: true
      });
    };
    const formatTimeAgo = (dateString) => {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diffInSeconds = Math.floor((now - date) / 1e3);
      if (diffInSeconds < 60) return "Baru saja";
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `${diffInMinutes}m`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}j`;
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays}hr`;
      return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    };
    const isNewPosting = computed(() => {
      const hours = (/* @__PURE__ */ new Date() - new Date(props.product.created_at)) / (1e3 * 60 * 60);
      return hours < 24;
    });
    computed(() => {
      var _a, _b, _c;
      return ((_b = (_a = props.product.store) == null ? void 0 : _a.profile) == null ? void 0 : _b.is_ktp_verified) && ((_c = props.product.store) == null ? void 0 : _c.transactions_as_seller_count) >= 5;
    });
    const conditionBadgeClass = computed(() => {
      const color = props.product.condition_badge_color;
      if (color === "green") return "bg-emerald-600 text-white";
      if (color === "yellow") return "bg-amber-500 text-white";
      return "bg-slate-500 text-white";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full overflow-hidden" }, _attrs))} data-v-6518487d>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("products.show", __props.product.slug),
        class: "absolute inset-0 z-10"
      }, null, _parent));
      _push(`<div class="absolute top-2.5 left-2.5 flex flex-col gap-1 z-20 pointer-events-none" data-v-6518487d>`);
      if (isNewPosting.value) {
        _push(`<div class="flex items-center gap-1 bg-emerald-500/90 backdrop-blur text-white pl-1 pr-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider shadow-sm" data-v-6518487d>`);
        _push(ssrRenderComponent(unref(Zap), { class: "w-2.5 h-2.5 fill-current" }, null, _parent));
        _push(`<span data-v-6518487d>Baru</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.is_cod) {
        _push(`<div class="flex items-center gap-1 bg-blue-500/90 backdrop-blur text-white pl-1 pr-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider shadow-sm" data-v-6518487d>`);
        _push(ssrRenderComponent(unref(Handshake), { class: "w-2.5 h-2.5" }, null, _parent));
        _push(`<span data-v-6518487d>COD</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.is_negotiable) {
        _push(`<div class="flex items-center gap-1 bg-indigo-500/90 backdrop-blur text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider shadow-sm" data-v-6518487d><span data-v-6518487d>Nego</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20" data-v-6518487d><button class="${ssrRenderClass([isFavorited.value ? "text-rose-500 hover:text-rose-600" : "text-slate-400 hover:text-blue-500", "p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 shadow-sm transition-all hover:scale-110 active:scale-95 group/heart"])}" data-v-6518487d>`);
      if (isFavorited.value) {
        _push(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(ShoppingCart), { class: "w-3.5 h-3.5" }, null, _parent));
      }
      _push(`</button><button class="p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 shadow-sm transition-all hover:scale-110 text-slate-400 hover:text-amber-500" data-v-6518487d>`);
      _push(ssrRenderComponent(unref(Flag), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(`</button></div><div class="aspect-square relative overflow-hidden bg-slate-50 dark:bg-slate-800/50" data-v-6518487d>`);
      if (__props.product.images && __props.product.images.length > 0) {
        _push(`<!--[--><img${ssrRenderAttr("src", `/storage/${__props.product.images[activeImage.value].image_path}`)}${ssrRenderAttr("alt", __props.product.title)} class="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" data-v-6518487d>`);
        if (__props.product.images.length > 1) {
          _push(`<div class="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-6518487d><!--[-->`);
          ssrRenderList(__props.product.images, (_, index) => {
            _push(`<div class="${ssrRenderClass([activeImage.value === index ? "w-4 bg-white shadow-sm" : "w-1 bg-white/40", "h-1 rounded-full transition-all duration-300"])}" data-v-6518487d></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center h-full text-slate-300 dark:text-slate-700" data-v-6518487d>`);
        _push(ssrRenderComponent(unref(ImageOff), { class: "w-10 h-10 mb-1 stroke-[1.5]" }, null, _parent));
        _push(`<span class="text-[8px] font-black uppercase tracking-widest" data-v-6518487d>No Image</span></div>`);
      }
      _push(`<div class="absolute bottom-1.5 left-1.5 z-20" data-v-6518487d><span class="${ssrRenderClass([conditionBadgeClass.value, "px-1.5 py-0.5 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-lg border border-white/10 whitespace-nowrap"])}" data-v-6518487d>${ssrInterpolate(__props.product.condition)}</span></div></div><div class="p-4 flex flex-col flex-grow" data-v-6518487d><div class="text-xl sm:text-2xl font-black text-primary dark:text-blue-400 tracking-tight leading-tight mb-1" data-v-6518487d> Rp${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.product.price))}</div><h3 class="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-primary transition-colors leading-snug mb-3" data-v-6518487d>${ssrInterpolate(__props.product.title)}</h3><div class="mt-auto space-y-3" data-v-6518487d><div class="flex items-center justify-between gap-2 overflow-hidden" data-v-6518487d><div class="flex items-center gap-1.5 min-w-0" data-v-6518487d><span class="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 shrink-0" data-v-6518487d>${ssrInterpolate(__props.product.condition)}</span><span class="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" data-v-6518487d></span>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("store.show", __props.product.user_id),
        class: "text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 truncate hover:text-primary transition-colors z-20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`${ssrInterpolate(((_a2 = __props.product.store.profile) == null ? void 0 : _a2.store_name) ?? __props.product.store.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(((_b = __props.product.store.profile) == null ? void 0 : _b.store_name) ?? __props.product.store.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.product.store.reviews_as_seller_avg_rating) {
        _push(`<div class="flex items-center gap-0.5 text-[10px] sm:text-xs font-bold text-amber-500 shrink-0" data-v-6518487d>`);
        _push(ssrRenderComponent(unref(Star), { class: "w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" }, null, _parent));
        _push(`<span data-v-6518487d>${ssrInterpolate(Number(__props.product.store.reviews_as_seller_avg_rating).toFixed(1))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-white/5 text-[9px] sm:text-[10px] text-slate-400" data-v-6518487d><div class="flex items-center gap-1 truncate" data-v-6518487d>`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" }, null, _parent));
      _push(`<span class="truncate" data-v-6518487d>${ssrInterpolate(((_a = __props.product.store.profile) == null ? void 0 : _a.city) ?? "Lokasi N/A")}</span></div><div class="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800/50" data-v-6518487d>`);
      _push(ssrRenderComponent(unref(Clock), { class: "w-2.5 h-2.5" }, null, _parent));
      _push(`<span data-v-6518487d>${ssrInterpolate(formatTimeAgo(__props.product.created_at))}</span></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showRemoveModal.value,
        onClose: ($event) => showRemoveModal.value = false,
        maxWidth: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 bg-white dark:bg-slate-900 rounded-2xl" data-v-6518487d${_scopeId}><div class="flex justify-center mb-4" data-v-6518487d${_scopeId}><div class="p-3 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full" data-v-6518487d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "w-8 h-8" }, null, _parent2, _scopeId));
            _push2(`</div></div><h3 class="text-lg font-black text-center text-slate-900 dark:text-white mb-2" data-v-6518487d${_scopeId}>Hapus dari Keranjang?</h3><p class="text-sm text-center text-slate-500 dark:text-slate-400 mb-6" data-v-6518487d${_scopeId}> Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda? </p><div class="flex gap-3" data-v-6518487d${_scopeId}><button class="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition" data-v-6518487d${_scopeId}> Batal </button><button class="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/20" data-v-6518487d${_scopeId}> Ya, Hapus </button></div></div>`);
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
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6518487d"]]);
export {
  ProductCard as P
};
