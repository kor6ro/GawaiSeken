import { ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { Zap, Handshake, X, ShoppingCart, Flag, ImageOff, Star, MapPin, Clock, AlertTriangle } from "lucide-vue-next";
import { _ as _sfc_main$1 } from "./Modal-C0YBTj_6.js";
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
      router.post(
        route("products.toggle-favorite", props.product.id),
        {},
        {
          preserveScroll: true
        }
      );
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 dark:border-white/5 dark:bg-slate-900" }, _attrs))} data-v-a5566284>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("products.show", __props.product.slug),
        class: "absolute inset-0 z-10"
      }, null, _parent));
      _push(`<div class="pointer-events-none absolute left-2.5 top-2.5 z-20 flex flex-col gap-1" data-v-a5566284>`);
      if (isNewPosting.value) {
        _push(`<div class="flex items-center gap-1 rounded-md bg-emerald-500/90 py-0.5 pl-1 pr-2 text-[8px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur" data-v-a5566284>`);
        _push(ssrRenderComponent(unref(Zap), { class: "h-2.5 w-2.5 fill-current" }, null, _parent));
        _push(`<span data-v-a5566284>Baru</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.is_cod) {
        _push(`<div class="flex items-center gap-1 rounded-md bg-blue-500/90 py-0.5 pl-1 pr-2 text-[8px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur" data-v-a5566284>`);
        _push(ssrRenderComponent(unref(Handshake), { class: "h-2.5 w-2.5" }, null, _parent));
        _push(`<span data-v-a5566284>COD</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.is_negotiable) {
        _push(`<div class="flex items-center gap-1 rounded-md bg-indigo-500/90 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur" data-v-a5566284><span data-v-a5566284>Nego</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="absolute right-2.5 top-2.5 z-20 flex flex-col gap-1.5" data-v-a5566284><button class="${ssrRenderClass([
        isFavorited.value ? "text-rose-500 hover:text-rose-600" : "text-slate-400 hover:text-blue-500",
        "group/heart rounded-full border border-white/20 bg-white/60 p-2 shadow-sm backdrop-blur-md transition-all hover:scale-110 active:scale-95 dark:bg-slate-800/60"
      ])}" data-v-a5566284>`);
      if (isFavorited.value) {
        _push(ssrRenderComponent(unref(X), { class: "h-3.5 w-3.5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(ShoppingCart), { class: "h-3.5 w-3.5" }, null, _parent));
      }
      _push(`</button><button class="rounded-full border border-white/20 bg-white/60 p-2 text-slate-400 shadow-sm backdrop-blur-md transition-all hover:scale-110 hover:text-amber-500 dark:bg-slate-800/60" data-v-a5566284>`);
      _push(ssrRenderComponent(unref(Flag), { class: "h-3.5 w-3.5" }, null, _parent));
      _push(`</button></div><div class="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800/50" data-v-a5566284>`);
      if (__props.product.images && __props.product.images.length > 0) {
        _push(`<!--[--><img${ssrRenderAttr("src", `/storage/${__props.product.images[activeImage.value].image_path}`)}${ssrRenderAttr("alt", __props.product.title)} loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-a5566284>`);
        if (__props.product.images.length > 1) {
          _push(`<div class="absolute bottom-2.5 left-0 right-0 z-20 flex justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100" data-v-a5566284><!--[-->`);
          ssrRenderList(__props.product.images, (_, index) => {
            _push(`<div class="${ssrRenderClass([activeImage.value === index ? "w-4 bg-white shadow-sm" : "w-1 bg-white/40", "h-1 rounded-full transition-all duration-300"])}" data-v-a5566284></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="flex h-full flex-col items-center justify-center text-slate-300 dark:text-slate-700" data-v-a5566284>`);
        _push(ssrRenderComponent(unref(ImageOff), { class: "mb-1 h-10 w-10 stroke-[1.5]" }, null, _parent));
        _push(`<span class="text-[8px] font-black uppercase tracking-widest" data-v-a5566284>No Image</span></div>`);
      }
      _push(`<div class="absolute bottom-1.5 left-1.5 z-20" data-v-a5566284><span class="${ssrRenderClass([
        conditionBadgeClass.value,
        "whitespace-nowrap rounded-lg border border-white/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest shadow-lg sm:text-[9px]"
      ])}" data-v-a5566284>${ssrInterpolate(__props.product.condition)}</span></div></div><div class="flex flex-grow flex-col p-4" data-v-a5566284><div class="mb-1 text-xl font-black leading-tight tracking-tight text-primary dark:text-blue-400 sm:text-2xl" data-v-a5566284> Rp${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.product.price))}</div><h3 class="mb-3 line-clamp-1 text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-primary dark:text-slate-100 sm:text-base" data-v-a5566284>${ssrInterpolate(__props.product.title)}</h3><div class="mt-auto space-y-3" data-v-a5566284><div class="flex items-center justify-between gap-2 overflow-hidden" data-v-a5566284><div class="flex min-w-0 items-center gap-1.5" data-v-a5566284><span class="shrink-0 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 sm:text-xs" data-v-a5566284>${ssrInterpolate(__props.product.condition)}</span><span class="h-1 w-1 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" data-v-a5566284></span>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("store.show", __props.product.user_id),
        class: "z-20 truncate text-[10px] font-bold text-slate-500 transition-colors hover:text-primary dark:text-slate-400 sm:text-xs"
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
        _push(`<div class="flex shrink-0 items-center gap-0.5 text-[10px] font-bold text-amber-500 sm:text-xs" data-v-a5566284>`);
        _push(ssrRenderComponent(unref(Star), { class: "h-2.5 w-2.5 fill-current sm:h-3 sm:w-3" }, null, _parent));
        _push(`<span data-v-a5566284>${ssrInterpolate(Number(__props.product.store.reviews_as_seller_avg_rating).toFixed(1))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-between border-t border-slate-100 pt-2.5 text-[9px] text-slate-400 dark:border-white/5 sm:text-[10px]" data-v-a5566284><div class="flex items-center gap-1 truncate" data-v-a5566284>`);
      _push(ssrRenderComponent(unref(MapPin), { class: "h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" }, null, _parent));
      _push(`<span class="truncate" data-v-a5566284>${ssrInterpolate(((_a = __props.product.store.profile) == null ? void 0 : _a.city) ?? "Lokasi N/A")}</span></div><div class="flex shrink-0 items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 dark:bg-slate-800/50" data-v-a5566284>`);
      _push(ssrRenderComponent(unref(Clock), { class: "h-2.5 w-2.5" }, null, _parent));
      _push(`<span data-v-a5566284>${ssrInterpolate(formatTimeAgo(__props.product.created_at))}</span></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showRemoveModal.value,
        onClose: ($event) => showRemoveModal.value = false,
        maxWidth: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-2xl bg-white p-6 dark:bg-slate-900" data-v-a5566284${_scopeId}><div class="mb-4 flex justify-center" data-v-a5566284${_scopeId}><div class="rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500/20" data-v-a5566284${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(`</div></div><h3 class="mb-2 text-center text-lg font-black text-slate-900 dark:text-white" data-v-a5566284${_scopeId}> Hapus dari Keranjang? </h3><p class="mb-6 text-center text-sm text-slate-500 dark:text-slate-400" data-v-a5566284${_scopeId}> Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda? </p><div class="flex gap-3" data-v-a5566284${_scopeId}><button class="flex-1 rounded-xl bg-slate-100 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" data-v-a5566284${_scopeId}> Batal </button><button class="flex-1 rounded-xl bg-red-500 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600" data-v-a5566284${_scopeId}> Ya, Hapus </button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-2xl bg-white p-6 dark:bg-slate-900" }, [
                createVNode("div", { class: "mb-4 flex justify-center" }, [
                  createVNode("div", { class: "rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500/20" }, [
                    createVNode(unref(AlertTriangle), { class: "h-8 w-8" })
                  ])
                ]),
                createVNode("h3", { class: "mb-2 text-center text-lg font-black text-slate-900 dark:text-white" }, " Hapus dari Keranjang? "),
                createVNode("p", { class: "mb-6 text-center text-sm text-slate-500 dark:text-slate-400" }, " Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda? "),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("button", {
                    onClick: ($event) => showRemoveModal.value = false,
                    class: "flex-1 rounded-xl bg-slate-100 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }, " Batal ", 8, ["onClick"]),
                  createVNode("button", {
                    onClick: submitToggle,
                    class: "flex-1 rounded-xl bg-red-500 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
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
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a5566284"]]);
export {
  ProductCard as P
};
