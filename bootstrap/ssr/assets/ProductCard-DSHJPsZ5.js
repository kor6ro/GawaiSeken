import { ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { Zap, Handshake, CheckCircle2, Undo2, Clock, AlertTriangle, X, ShoppingCart, Flag, ImageOff, Star, MapPin } from "lucide-vue-next";
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
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-card-container group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 will-change-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:border-white/5 dark:bg-slate-900" }, _attrs))} data-v-3af23642>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("products.show", __props.product.slug),
        class: "absolute inset-0 z-10"
      }, null, _parent));
      _push(`<div class="pointer-events-none absolute left-2.5 top-2.5 z-20 flex flex-col gap-1" data-v-3af23642>`);
      if (isNewPosting.value) {
        _push(`<div class="flex items-center gap-1 rounded-md bg-emerald-500 py-0.5 pl-1 pr-2 text-[8px] font-black uppercase tracking-wider text-white shadow-sm" data-v-3af23642>`);
        _push(ssrRenderComponent(unref(Zap), { class: "h-2.5 w-2.5 fill-current" }, null, _parent));
        _push(`<span data-v-3af23642>Baru</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.is_cod) {
        _push(`<div class="flex items-center gap-1 rounded-md bg-blue-500 py-0.5 pl-1 pr-2 text-[8px] font-black uppercase tracking-wider text-white shadow-sm" data-v-3af23642>`);
        _push(ssrRenderComponent(unref(Handshake), { class: "h-2.5 w-2.5" }, null, _parent));
        _push(`<span data-v-3af23642>COD</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.is_negotiable) {
        _push(`<div class="flex items-center gap-1 rounded-md bg-indigo-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white shadow-sm" data-v-3af23642><span data-v-3af23642>Nego</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.product.active_negotiation) {
        _push(`<div class="pointer-events-none absolute left-0 right-0 top-1/2 z-20 -translate-y-1/2 px-3" data-v-3af23642><div class="${ssrRenderClass([{
          "bg-emerald-600/90": __props.product.active_negotiation.status === "accepted",
          "bg-indigo-600/90": __props.product.active_negotiation.status === "countered",
          "bg-slate-800/90": __props.product.active_negotiation.status === "pending",
          "bg-red-600/90": __props.product.active_negotiation.status === "rejected"
        }, "flex flex-col items-center gap-1 rounded-2xl border border-white/20 px-3 py-3 text-center text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-105"])}" data-v-3af23642><div class="flex items-center gap-1.5" data-v-3af23642>`);
        if (__props.product.active_negotiation.status === "accepted") {
          _push(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent));
        } else if (__props.product.active_negotiation.status === "countered") {
          _push(ssrRenderComponent(unref(Undo2), { class: "h-4 w-4" }, null, _parent));
        } else if (__props.product.active_negotiation.status === "pending") {
          _push(ssrRenderComponent(unref(Clock), { class: "h-4 w-4" }, null, _parent));
        } else if (__props.product.active_negotiation.status === "rejected") {
          _push(ssrRenderComponent(unref(AlertTriangle), { class: "h-4 w-4" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-[9px] font-black uppercase tracking-[0.1em]" data-v-3af23642>${ssrInterpolate(__props.product.active_negotiation.status === "accepted" ? "Nego Diterima" : __props.product.active_negotiation.status === "countered" ? "Ada Counter Offer" : __props.product.active_negotiation.status === "rejected" ? "Nego Ditolak" : "Nego Diproses")}</span></div>`);
        if (__props.product.active_negotiation.status === "countered") {
          _push(`<div class="text-sm font-black mt-1" data-v-3af23642> Rp${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.product.active_negotiation.counter_price))}</div>`);
        } else if (__props.product.active_negotiation.status === "pending") {
          _push(`<div class="text-[10px] font-bold opacity-80 mt-0.5" data-v-3af23642> Menunggu Seller </div>`);
        } else if (__props.product.active_negotiation.status === "accepted") {
          _push(`<div class="text-sm font-black mt-1" data-v-3af23642> Rp${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.product.active_negotiation.agreed_price))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute right-2.5 top-2.5 z-20 flex flex-col gap-1.5" data-v-3af23642><button class="${ssrRenderClass([
        isFavorited.value ? "text-rose-500 hover:text-rose-600" : "text-slate-400 hover:text-blue-500",
        "group/heart rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-slate-800"
      ])}" data-v-3af23642>`);
      if (isFavorited.value) {
        _push(ssrRenderComponent(unref(X), { class: "h-3.5 w-3.5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(ShoppingCart), { class: "h-3.5 w-3.5" }, null, _parent));
      }
      _push(`</button><button class="rounded-full border border-slate-200 bg-white p-2 text-slate-400 shadow-sm transition-all duration-200 hover:scale-105 hover:text-amber-500 dark:border-white/10 dark:bg-slate-800" data-v-3af23642>`);
      _push(ssrRenderComponent(unref(Flag), { class: "h-3.5 w-3.5" }, null, _parent));
      _push(`</button></div><div class="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800/50" data-v-3af23642>`);
      if (__props.product.images && __props.product.images.length > 0) {
        _push(`<!--[--><img${ssrRenderAttr("src", `/storage/${__props.product.images[activeImage.value].image_path}`)}${ssrRenderAttr("alt", __props.product.title)} loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" data-v-3af23642>`);
        if (__props.product.images.length > 1) {
          _push(`<div class="absolute bottom-2.5 left-0 right-0 z-20 flex justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100" data-v-3af23642><!--[-->`);
          ssrRenderList(__props.product.images, (_, index) => {
            _push(`<div class="${ssrRenderClass([activeImage.value === index ? "w-4 bg-white shadow-sm" : "w-1 bg-white/40", "h-1 rounded-full transition-all duration-300"])}" data-v-3af23642></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="flex h-full flex-col items-center justify-center text-slate-300 dark:text-slate-700" data-v-3af23642>`);
        _push(ssrRenderComponent(unref(ImageOff), { class: "mb-1 h-10 w-10 stroke-[1.5]" }, null, _parent));
        _push(`<span class="text-[8px] font-black uppercase tracking-widest" data-v-3af23642>No Image</span></div>`);
      }
      _push(`<div class="absolute bottom-1.5 left-1.5 z-20" data-v-3af23642><span class="${ssrRenderClass([
        conditionBadgeClass.value,
        "whitespace-nowrap rounded-lg border border-white/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest shadow-lg sm:text-[9px]"
      ])}" data-v-3af23642>${ssrInterpolate(__props.product.condition_label)}</span></div></div><div class="flex flex-grow flex-col p-4" data-v-3af23642><div class="mb-1 text-xl font-black leading-tight tracking-tight text-primary dark:text-blue-400 sm:text-2xl" data-v-3af23642> Rp${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.product.price))}</div><h3 class="mb-3 line-clamp-1 text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-primary dark:text-slate-100 sm:text-base" data-v-3af23642>${ssrInterpolate(__props.product.title)}</h3><div class="mt-auto space-y-3" data-v-3af23642><div class="flex items-center justify-between gap-2 overflow-hidden" data-v-3af23642><div class="flex min-w-0 items-center gap-1.5" data-v-3af23642>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("store.show", ((_a = __props.product.store) == null ? void 0 : _a.id) ?? __props.product.user_id),
        class: "z-20 truncate text-[10px] font-bold text-slate-500 transition-colors hover:text-primary dark:text-slate-400 sm:text-xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e2, _f;
          if (_push2) {
            _push2(`${ssrInterpolate(((_b2 = (_a2 = __props.product.store) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.store_name) ?? ((_c2 = __props.product.store) == null ? void 0 : _c2.name) ?? "Toko")}`);
          } else {
            return [
              createTextVNode(toDisplayString(((_e2 = (_d2 = __props.product.store) == null ? void 0 : _d2.profile) == null ? void 0 : _e2.store_name) ?? ((_f = __props.product.store) == null ? void 0 : _f.name) ?? "Toko"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if ((_b = __props.product.store) == null ? void 0 : _b.reviews_as_seller_avg_rating) {
        _push(`<div class="flex shrink-0 items-center gap-0.5 text-[10px] font-bold text-amber-500 sm:text-xs" data-v-3af23642>`);
        _push(ssrRenderComponent(unref(Star), { class: "h-2.5 w-2.5 fill-current sm:h-3 sm:w-3" }, null, _parent));
        _push(`<span data-v-3af23642>${ssrInterpolate(Number((_c = __props.product.store) == null ? void 0 : _c.reviews_as_seller_avg_rating).toFixed(1))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-between border-t border-slate-100 pt-2.5 text-[9px] text-slate-400 dark:border-white/5 sm:text-[10px]" data-v-3af23642><div class="flex items-center gap-1 truncate" data-v-3af23642>`);
      _push(ssrRenderComponent(unref(MapPin), { class: "h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" }, null, _parent));
      _push(`<span class="truncate" data-v-3af23642>${ssrInterpolate(((_e = (_d = __props.product.store) == null ? void 0 : _d.profile) == null ? void 0 : _e.city) ?? "Lokasi N/A")}</span></div><div class="flex shrink-0 items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 dark:bg-slate-800/50" data-v-3af23642>`);
      _push(ssrRenderComponent(unref(Clock), { class: "h-2.5 w-2.5" }, null, _parent));
      _push(`<span data-v-3af23642>${ssrInterpolate(formatTimeAgo(__props.product.created_at))}</span></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showRemoveModal.value,
        onClose: ($event) => showRemoveModal.value = false,
        maxWidth: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-2xl bg-white p-6 dark:bg-slate-900" data-v-3af23642${_scopeId}><div class="mb-4 flex justify-center" data-v-3af23642${_scopeId}><div class="rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500/20" data-v-3af23642${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(`</div></div><h3 class="mb-2 text-center text-lg font-black text-slate-900 dark:text-white" data-v-3af23642${_scopeId}> Hapus dari Keranjang? </h3><p class="mb-6 text-center text-sm text-slate-500 dark:text-slate-400" data-v-3af23642${_scopeId}> Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda? </p><div class="flex gap-3" data-v-3af23642${_scopeId}><button class="flex-1 rounded-xl bg-slate-100 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" data-v-3af23642${_scopeId}> Batal </button><button class="flex-1 rounded-xl bg-red-500 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600" data-v-3af23642${_scopeId}> Ya, Hapus </button></div></div>`);
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
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3af23642"]]);
export {
  ProductCard as P
};
