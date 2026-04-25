import { ref, computed, watch, onMounted, onUnmounted, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderTeleport } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./BackButton-DqmVU1VH.js";
import { Package, ChevronDown, Gavel, ShoppingCart, AlertTriangle, CheckCheck, Clock, ImageIcon, Send, X, Download, Info, CheckCircle, AlertCircle } from "lucide-vue-next";
import { o as onlineUserIds, s as setupOnlinePresence, i as isDark } from "./themeState-CpsLRyLx.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    chat: Object,
    isNewChat: Boolean,
    contextProduct: Object
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const auth = usePage().props.auth;
    const messages = ref(props.chat.messages || []);
    const newMessage = ref("");
    const isTyping = ref(false);
    const isOpponentOnline = computed(
      () => opponent.value ? onlineUserIds.value.includes(Number(opponent.value.id)) : false
    );
    const lightboxUrl = ref(null);
    const chatId = ref(props.isNewChat ? `product-${props.chat.product_id}` : props.chat.id);
    const currentIsNewChat = ref(props.isNewChat);
    const showProductContext = ref(!!props.contextProduct);
    const isContextMinimized = ref(false);
    const showNegoModal = ref(false);
    const negoPrice = ref(((_a = props.contextProduct) == null ? void 0 : _a.price) || 0);
    const negoMessage = ref("");
    const isSubmittingNego = ref(false);
    const notification = ref(null);
    const formatNumber = (num) => {
      return new Intl.NumberFormat("id-ID").format(num);
    };
    ref(null);
    const messagesEnd = ref(null);
    ref(null);
    ref(null);
    const opponent = computed(
      () => auth.user.id === props.chat.buyer_id ? props.chat.seller : props.chat.buyer
    );
    const oppName = computed(() => {
      var _a2;
      return ((_a2 = opponent.value.profile) == null ? void 0 : _a2.store_name) || opponent.value.name;
    });
    const oppAvatar = computed(() => {
      var _a2, _b2;
      if (opponent.value.role === "seller" && ((_a2 = opponent.value.profile) == null ? void 0 : _a2.store_logo)) {
        return `/storage/${opponent.value.profile.store_logo}`;
      }
      return ((_b2 = opponent.value.profile) == null ? void 0 : _b2.avatar) ? `/storage/${opponent.value.profile.avatar}` : null;
    });
    const oppInitial = computed(() => oppName.value.charAt(0).toUpperCase());
    const product = props.chat.product;
    (_c = (_b = product == null ? void 0 : product.images) == null ? void 0 : _b[0]) == null ? void 0 : _c.image_path;
    const avatarColors = [
      ["#FF6B35", "#FF8E53"],
      ["#6C63FF", "#9B93FF"],
      ["#00C9A7", "#00E5C0"],
      ["#FF3CAC", "#FF79C6"],
      ["#2196F3", "#42ABFF"],
      ["#FF9800", "#FFC947"],
      ["#4CAF50", "#76C442"]
    ];
    const oppAvatarGradient = computed(() => {
      const idx = oppName.value.charCodeAt(0) % avatarColors.length;
      const [c1, c2] = avatarColors[idx];
      return `linear-gradient(135deg, ${c1}, ${c2})`;
    });
    const scrollToBottom = (behavior = "smooth") => {
      nextTick(() => {
        if (messagesEnd.value) {
          messagesEnd.value.scrollIntoView({ behavior, block: "end" });
        }
      });
    };
    watch(
      () => messages.value.length,
      () => {
        scrollToBottom();
      }
    );
    const formatTime = (d) => {
      if (!d) return "";
      return new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    };
    const formatDate = (d) => {
      if (!d) return "";
      const date = new Date(d);
      const today = /* @__PURE__ */ new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (date.toDateString() === today.toDateString()) return "Hari Ini";
      if (date.toDateString() === yesterday.toDateString()) return "Kemarin";
      return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    };
    const showDateSeparator = (index) => {
      if (index === 0) return true;
      return new Date(messages.value[index].created_at).toDateString() !== new Date(messages.value[index - 1].created_at).toDateString();
    };
    let typingTimeout = null;
    const setupEcho = () => {
      if (!window.Echo) return;
      window.Echo.join(`chat.${chatId.value}`).here((users) => {
      }).joining((user) => {
      }).leaving((user) => {
      }).listen("MessageSent", (e) => {
        if (e.message.sender_id !== auth.user.id) {
          messages.value.push(e.message);
          scrollToBottom();
          axios.post(route("chat.read", chatId.value));
        }
      }).listen("MessageRead", () => {
        messages.value.forEach((m) => {
          if (m.sender_id === auth.user.id && !m.read_at) {
            m.read_at = (/* @__PURE__ */ new Date()).toISOString();
          }
        });
      }).listenForWhisper("typing", () => {
        isTyping.value = true;
        if (typingTimeout) clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          isTyping.value = false;
        }, 3e3);
      });
    };
    onMounted(() => {
      scrollToBottom("auto");
      const checkEcho = setInterval(() => {
        if (window.Echo) {
          clearInterval(checkEcho);
          setupOnlinePresence();
          if (!currentIsNewChat.value) {
            setupEcho();
          }
        }
      }, 100);
      setTimeout(() => clearInterval(checkEcho), 5e3);
    });
    onUnmounted(() => {
      if (window.Echo && !currentIsNewChat.value) {
        window.Echo.leave(`chat.${chatId.value}`);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-view-root" }, _attrs))} data-v-17d15104>`);
      _push(ssrRenderComponent(unref(Head), { title: oppName.value }, null, _parent));
      _push(`<header class="chat-header" data-v-17d15104>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        fallbackRoute: "chat.index",
        class: "mr-2 bg-transparent hover:bg-muted"
      }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(opponent.value.id ? unref(Link) : "div"), {
        href: opponent.value.id ? _ctx.route("store.show", opponent.value.id) : null,
        class: "chat-header-info"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="chat-header-avatar-wrap" data-v-17d15104${_scopeId}>`);
            if (oppAvatar.value) {
              _push2(`<img${ssrRenderAttr("src", oppAvatar.value)} loading="lazy" class="chat-header-avatar" data-v-17d15104${_scopeId}>`);
            } else {
              _push2(`<div class="chat-header-avatar-fallback" style="${ssrRenderStyle({ background: oppAvatarGradient.value })}" data-v-17d15104${_scopeId}>${ssrInterpolate(oppInitial.value)}</div>`);
            }
            if (isOpponentOnline.value) {
              _push2(`<span class="chat-header-online-dot" data-v-17d15104${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="min-w-0 flex-1" data-v-17d15104${_scopeId}><h3 class="chat-header-name" data-v-17d15104${_scopeId}>${ssrInterpolate(oppName.value)}</h3><p class="${ssrRenderClass([
              isTyping.value ? "text-primary" : isOpponentOnline.value ? "text-green-500" : "text-muted-foreground",
              "chat-header-status"
            ])}" data-v-17d15104${_scopeId}>`);
            if (isTyping.value) {
              _push2(`<span class="flex items-center gap-1" data-v-17d15104${_scopeId}><span class="typing-dots" data-v-17d15104${_scopeId}><span data-v-17d15104${_scopeId}></span><span data-v-17d15104${_scopeId}></span><span data-v-17d15104${_scopeId}></span></span> sedang mengetik... </span>`);
            } else if (isOpponentOnline.value) {
              _push2(`<span data-v-17d15104${_scopeId}>Online</span>`);
            } else {
              _push2(`<span data-v-17d15104${_scopeId}>${ssrInterpolate(unref(auth).user.id === __props.chat.buyer_id ? "Penjual" : "Pembeli")}</span>`);
            }
            _push2(`</p></div>`);
          } else {
            return [
              createVNode("div", { class: "chat-header-avatar-wrap" }, [
                oppAvatar.value ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: oppAvatar.value,
                  loading: "lazy",
                  class: "chat-header-avatar"
                }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "chat-header-avatar-fallback",
                  style: { background: oppAvatarGradient.value }
                }, toDisplayString(oppInitial.value), 5)),
                isOpponentOnline.value ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: "chat-header-online-dot"
                })) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "min-w-0 flex-1" }, [
                createVNode("h3", { class: "chat-header-name" }, toDisplayString(oppName.value), 1),
                createVNode("p", {
                  class: [
                    "chat-header-status",
                    isTyping.value ? "text-primary" : isOpponentOnline.value ? "text-green-500" : "text-muted-foreground"
                  ]
                }, [
                  isTyping.value ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "flex items-center gap-1"
                  }, [
                    createVNode("span", { class: "typing-dots" }, [
                      createVNode("span"),
                      createVNode("span"),
                      createVNode("span")
                    ]),
                    createTextVNode(" sedang mengetik... ")
                  ])) : isOpponentOnline.value ? (openBlock(), createBlock("span", { key: 1 }, "Online")) : (openBlock(), createBlock("span", { key: 2 }, toDisplayString(unref(auth).user.id === __props.chat.buyer_id ? "Penjual" : "Pembeli"), 1))
                ], 2)
              ])
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`<div class="w-9 flex-shrink-0" data-v-17d15104></div></header>`);
      if (__props.contextProduct && showProductContext.value) {
        _push(`<div class="${ssrRenderClass([{ "is-minimized": isContextMinimized.value }, "product-context-bar"])}" data-v-17d15104><div class="product-context-content" data-v-17d15104><div class="product-context-main" data-v-17d15104><div class="product-context-img" data-v-17d15104>`);
        if ((_b2 = (_a2 = __props.contextProduct.images) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.image_path) {
          _push(`<img${ssrRenderAttr("src", "/storage/" + __props.contextProduct.images[0].image_path)} loading="lazy" data-v-17d15104>`);
        } else {
          _push(`<div class="flex h-full w-full items-center justify-center bg-muted" data-v-17d15104>`);
          _push(ssrRenderComponent(unref(Package), { class: "h-4 w-4 text-muted-foreground" }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="product-context-info" data-v-17d15104><h4 class="product-context-title" data-v-17d15104>${ssrInterpolate(__props.contextProduct.title)}</h4><p class="product-context-price" data-v-17d15104>Rp ${ssrInterpolate(formatNumber(__props.contextProduct.price))}</p></div><button class="product-context-toggle" data-v-17d15104>`);
        _push(ssrRenderComponent(unref(ChevronDown), {
          class: ["h-4 w-4 transition-transform duration-300", { "rotate-180": isContextMinimized.value }]
        }, null, _parent));
        _push(`</button></div>`);
        if (!isContextMinimized.value) {
          _push(`<div class="product-context-actions" data-v-17d15104>`);
          if (unref(auth).user.id !== __props.contextProduct.user_id && __props.contextProduct.is_negotiable) {
            _push(`<button class="context-btn context-btn-nego" data-v-17d15104>`);
            _push(ssrRenderComponent(unref(Gavel), { class: "h-3.5 w-3.5" }, null, _parent));
            _push(` Nego </button>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(auth).user.id !== __props.contextProduct.user_id) {
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("products.show", __props.contextProduct.slug),
              class: "context-btn context-btn-buy"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(ShoppingCart), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
                  _push2(` Beli `);
                } else {
                  return [
                    createVNode(unref(ShoppingCart), { class: "h-3.5 w-3.5" }),
                    createTextVNode(" Beli ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="chat-messages-area" style="${ssrRenderStyle({ backgroundColor: unref(isDark) ? "#0b141a" : "#eae6df" })}" data-v-17d15104><div class="chat-pattern-overlay" data-v-17d15104></div><div class="chat-messages-inner" data-v-17d15104><div class="flex-grow" data-v-17d15104></div><!--[-->`);
      ssrRenderList(messages.value, (msg, index) => {
        _push(`<!--[-->`);
        if (showDateSeparator(index)) {
          _push(`<div class="chat-date-separator" data-v-17d15104><span class="chat-date-pill" data-v-17d15104>${ssrInterpolate(formatDate(msg.created_at))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([msg.sender_id === unref(auth).user.id ? "justify-end" : "justify-start", "chat-msg-row"])}" data-v-17d15104>`);
        if (msg.type === "image") {
          _push(`<div class="${ssrRenderClass([
            msg.sender_id === unref(auth).user.id ? "chat-bubble-image--mine" : "chat-bubble-image--theirs",
            "chat-bubble-image"
          ])}" data-v-17d15104><img${ssrRenderAttr("src", msg.image_url)} loading="lazy" class="chat-bubble-image-content" data-v-17d15104>`);
          if (msg.status === "sending") {
            _push(`<div class="chat-bubble-sending-overlay" data-v-17d15104><div class="uploading-spinner" data-v-17d15104></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (msg.status === "error") {
            _push(`<div class="chat-bubble-sending-overlay bg-red-500/20" data-v-17d15104>`);
            _push(ssrRenderComponent(unref(AlertTriangle), { class: "h-8 w-8 text-white" }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="chat-bubble-image-meta" data-v-17d15104><span class="text-[10px] font-medium text-white/90" data-v-17d15104>${ssrInterpolate(formatTime(msg.created_at))}</span>`);
          if (msg.sender_id === unref(auth).user.id) {
            _push(`<!--[-->`);
            if (msg.status !== "sending" && msg.status !== "error" && msg.read_at) {
              _push(ssrRenderComponent(unref(CheckCheck), { class: "h-3.5 w-3.5 text-blue-300" }, null, _parent));
            } else if (msg.status !== "sending" && msg.status !== "error") {
              _push(ssrRenderComponent(unref(CheckCheck), { class: "h-3.5 w-3.5 text-white/60" }, null, _parent));
            } else if (msg.status === "sending") {
              _push(ssrRenderComponent(unref(Clock), { class: "h-3 w-3 animate-spin text-white/60" }, null, _parent));
            } else {
              _push(ssrRenderComponent(unref(AlertTriangle), { class: "h-3.5 w-3.5 text-red-400" }, null, _parent));
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<div class="${ssrRenderClass([msg.sender_id === unref(auth).user.id ? "chat-bubble--mine" : "chat-bubble--theirs", "chat-bubble"])}" data-v-17d15104><p class="chat-bubble-text" data-v-17d15104>${ssrInterpolate(msg.message)}</p><div class="chat-bubble-meta" data-v-17d15104><span class="${ssrRenderClass([
            msg.sender_id === unref(auth).user.id ? "text-white/60" : "text-slate-500 dark:text-slate-400",
            "chat-bubble-time"
          ])}" data-v-17d15104>${ssrInterpolate(formatTime(msg.created_at))}</span>`);
          if (msg.sender_id === unref(auth).user.id) {
            _push(`<!--[-->`);
            if (msg.status === "sending") {
              _push(ssrRenderComponent(unref(Clock), { class: "h-3 w-3 animate-spin text-white/50" }, null, _parent));
            } else if (msg.read_at) {
              _push(ssrRenderComponent(unref(CheckCheck), { class: "h-3.5 w-3.5 text-blue-300" }, null, _parent));
            } else if (msg.status === "error") {
              _push(ssrRenderComponent(unref(AlertTriangle), { class: "h-3.5 w-3.5 text-red-400" }, null, _parent));
            } else {
              _push(ssrRenderComponent(unref(CheckCheck), { class: "h-3.5 w-3.5 text-white/50" }, null, _parent));
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        }
        _push(`</div><!--]-->`);
      });
      _push(`<!--]-->`);
      if (isTyping.value) {
        _push(`<div class="chat-msg-row justify-start" data-v-17d15104><div class="chat-bubble chat-bubble--theirs" data-v-17d15104><div class="typing-indicator" data-v-17d15104><span data-v-17d15104></span><span data-v-17d15104></span><span data-v-17d15104></span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="h-px" data-v-17d15104></div></div></main><footer class="chat-input-bar" data-v-17d15104><div class="chat-input-inner" data-v-17d15104><input type="file" class="hidden" accept="image/*" data-v-17d15104><button type="button" class="chat-input-attach" data-v-17d15104>`);
      _push(ssrRenderComponent(unref(ImageIcon), { class: "h-5 w-5" }, null, _parent));
      _push(`</button><div class="chat-input-field-wrap" data-v-17d15104><textarea class="chat-input-field" placeholder="Ketik pesan..." rows="1" data-v-17d15104>${ssrInterpolate(newMessage.value)}</textarea></div><button${ssrIncludeBooleanAttr(!newMessage.value.trim()) ? " disabled" : ""} class="${ssrRenderClass([newMessage.value.trim() ? "chat-send-btn--active" : "chat-send-btn--disabled", "chat-send-btn"])}" data-v-17d15104>`);
      _push(ssrRenderComponent(unref(Send), { class: "h-5 w-5" }, null, _parent));
      _push(`</button></div></footer>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (lightboxUrl.value) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md" data-v-17d15104><div class="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4" data-v-17d15104><button class="rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 active:scale-90" data-v-17d15104>`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button><button class="rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 active:scale-90" data-v-17d15104>`);
          _push2(ssrRenderComponent(unref(Download), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button></div><img${ssrRenderAttr("src", lightboxUrl.value)} class="max-h-[88vh] max-w-[95vw] rounded-lg object-contain shadow-2xl" data-v-17d15104></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (showNegoModal.value) {
          _push2(`<div class="modal-overlay" data-v-17d15104><div class="modal-card" data-v-17d15104><div class="modal-header" data-v-17d15104><h3 class="modal-title" data-v-17d15104>Tawar Produk</h3><button class="modal-close" data-v-17d15104>`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-17d15104><div class="flex items-center gap-4 mb-6 p-3 bg-muted/30 rounded-xl border border-border/50" data-v-17d15104><img${ssrRenderAttr("src", "/storage/" + __props.contextProduct.images[0].image_path)} class="h-16 w-16 rounded-lg object-cover shadow-sm" data-v-17d15104><div data-v-17d15104><h4 class="font-semibold text-sm line-clamp-1" data-v-17d15104>${ssrInterpolate(__props.contextProduct.title)}</h4><p class="text-xs text-muted-foreground mb-1" data-v-17d15104>Harga Asli: Rp ${ssrInterpolate(formatNumber(__props.contextProduct.price))}</p><p class="text-xs font-bold text-primary" data-v-17d15104>Penawaran Anda:</p></div></div><div class="space-y-4" data-v-17d15104><div data-v-17d15104><label class="block text-xs font-medium text-muted-foreground mb-1.5 ml-1" data-v-17d15104>Harga yang ditawarkan (Rp)</label><div class="relative" data-v-17d15104><span class="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold" data-v-17d15104>Rp</span><input${ssrRenderAttr("value", negoPrice.value)} type="number" class="modal-input" style="${ssrRenderStyle({ "padding-left": "60px !important" })}" placeholder="Masukkan harga..." data-v-17d15104></div></div><div data-v-17d15104><label class="block text-xs font-medium text-muted-foreground mb-1.5 ml-1" data-v-17d15104>Pesan untuk Penjual (Opsional)</label><textarea class="modal-input min-h-[100px] py-3" placeholder="Contoh: Boleh kurang dikit gan? Masih pelajar..." data-v-17d15104>${ssrInterpolate(negoMessage.value)}</textarea></div><div class="flex items-start gap-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20" data-v-17d15104>`);
          _push2(ssrRenderComponent(unref(Info), { class: "h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" }, null, _parent));
          _push2(`<p class="text-[11px] text-amber-700 dark:text-amber-400" data-v-17d15104> Penawaran berlaku selama 24 jam. Penjual dapat menerima, menolak, atau memberikan penawaran balik. </p></div></div></div><div class="modal-footer" data-v-17d15104><button class="modal-btn-secondary" data-v-17d15104>Batal</button><button${ssrIncludeBooleanAttr(isSubmittingNego.value || !negoPrice.value || negoPrice.value >= __props.contextProduct.price) ? " disabled" : ""} class="modal-btn-primary" data-v-17d15104>`);
          if (isSubmittingNego.value) {
            _push2(`<!--[--><div class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" data-v-17d15104></div> Mengirim... <!--]-->`);
          } else {
            _push2(`<!--[--> Kirim Penawaran <!--]-->`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (notification.value) {
          _push2(`<div class="${ssrRenderClass([notification.value.type, "toast-container"])}" data-v-17d15104><div class="toast-icon" data-v-17d15104>`);
          if (notification.value.type === "success") {
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-5 w-5" }, null, _parent));
          } else {
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-5 w-5" }, null, _parent));
          }
          _push2(`</div><div class="toast-message" data-v-17d15104>${ssrInterpolate(notification.value.message)}</div><button class="toast-close" data-v-17d15104>`);
          _push2(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent));
          _push2(`</button></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chat/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17d15104"]]);
export {
  Show as default
};
