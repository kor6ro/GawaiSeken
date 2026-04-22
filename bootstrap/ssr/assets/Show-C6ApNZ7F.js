import { computed, ref, watch, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderTeleport } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { ChevronLeft, Package, AlertTriangle, CheckCheck, Clock, ImageIcon, Send, X, Download } from "lucide-vue-next";
import { o as onlineUserIds, s as setupOnlinePresence } from "./onlineState-BAtS9nBF.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    chat: Object,
    isNewChat: Boolean
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const auth = usePage().props.auth;
    const isDark = computed(() => document.documentElement.classList.contains("dark"));
    const messages = ref(props.chat.messages || []);
    const newMessage = ref("");
    const isTyping = ref(false);
    const isOpponentOnline = computed(
      () => opponent.value ? onlineUserIds.value.includes(Number(opponent.value.id)) : false
    );
    const lightboxUrl = ref(null);
    const chatId = ref(props.isNewChat ? `product-${props.chat.product_id}` : props.chat.id);
    const currentIsNewChat = ref(props.isNewChat);
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
    const oppAvatar = computed(
      () => {
        var _a2;
        return ((_a2 = opponent.value.profile) == null ? void 0 : _a2.avatar) ? `/storage/${opponent.value.profile.avatar}` : null;
      }
    );
    const oppInitial = computed(() => oppName.value.charAt(0).toUpperCase());
    const product = props.chat.product;
    const productImage = (_b = (_a = product == null ? void 0 : product.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.image_path;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-view-root" }, _attrs))} data-v-dbce4391>`);
      _push(ssrRenderComponent(unref(Head), { title: oppName.value }, null, _parent));
      _push(`<header class="chat-header" data-v-dbce4391>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("chat.index"),
        class: "chat-header-back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("store.show", opponent.value.id),
        class: "chat-header-info"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="chat-header-avatar-wrap" data-v-dbce4391${_scopeId}>`);
            if (oppAvatar.value) {
              _push2(`<img${ssrRenderAttr("src", oppAvatar.value)} loading="lazy" class="chat-header-avatar" data-v-dbce4391${_scopeId}>`);
            } else {
              _push2(`<div class="chat-header-avatar-fallback" style="${ssrRenderStyle({ background: oppAvatarGradient.value })}" data-v-dbce4391${_scopeId}>${ssrInterpolate(oppInitial.value)}</div>`);
            }
            if (isOpponentOnline.value) {
              _push2(`<span class="chat-header-online-dot" data-v-dbce4391${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="min-w-0 flex-1" data-v-dbce4391${_scopeId}><h3 class="chat-header-name" data-v-dbce4391${_scopeId}>${ssrInterpolate(oppName.value)}</h3><p class="${ssrRenderClass([
              isTyping.value ? "text-primary" : isOpponentOnline.value ? "text-green-500" : "text-muted-foreground",
              "chat-header-status"
            ])}" data-v-dbce4391${_scopeId}>`);
            if (isTyping.value) {
              _push2(`<span class="flex items-center gap-1" data-v-dbce4391${_scopeId}><span class="typing-dots" data-v-dbce4391${_scopeId}><span data-v-dbce4391${_scopeId}></span><span data-v-dbce4391${_scopeId}></span><span data-v-dbce4391${_scopeId}></span></span> sedang mengetik... </span>`);
            } else if (isOpponentOnline.value) {
              _push2(`<span data-v-dbce4391${_scopeId}>Online</span>`);
            } else {
              _push2(`<span data-v-dbce4391${_scopeId}>${ssrInterpolate(unref(auth).user.id === __props.chat.buyer_id ? "Penjual" : "Pembeli")}</span>`);
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
      }, _parent));
      _push(`<div class="flex flex-shrink-0 items-center gap-1" data-v-dbce4391>`);
      if (unref(product)) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("products.show", unref(product).slug),
          class: "chat-header-product",
          title: unref(product).title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(productImage)) {
                _push2(`<img${ssrRenderAttr("src", "/storage/" + unref(productImage))} loading="lazy" class="h-full w-full object-cover" data-v-dbce4391${_scopeId}>`);
              } else {
                _push2(`<div class="flex h-full w-full items-center justify-center bg-muted" data-v-dbce4391${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Package), { class: "h-4 w-4 text-muted-foreground" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
            } else {
              return [
                unref(productImage) ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: "/storage/" + unref(productImage),
                  loading: "lazy",
                  class: "h-full w-full object-cover"
                }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex h-full w-full items-center justify-center bg-muted"
                }, [
                  createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><main class="chat-messages-area" style="${ssrRenderStyle({ backgroundColor: isDark.value ? "#0b141a" : "#eae6df" })}" data-v-dbce4391><div class="chat-pattern-overlay" data-v-dbce4391></div><div class="chat-messages-inner" data-v-dbce4391><div class="flex-grow" data-v-dbce4391></div><!--[-->`);
      ssrRenderList(messages.value, (msg, index) => {
        _push(`<!--[-->`);
        if (showDateSeparator(index)) {
          _push(`<div class="chat-date-separator" data-v-dbce4391><span class="chat-date-pill" data-v-dbce4391>${ssrInterpolate(formatDate(msg.created_at))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([msg.sender_id === unref(auth).user.id ? "justify-end" : "justify-start", "chat-msg-row"])}" data-v-dbce4391>`);
        if (msg.type === "image") {
          _push(`<div class="${ssrRenderClass([
            msg.sender_id === unref(auth).user.id ? "chat-bubble-image--mine" : "chat-bubble-image--theirs",
            "chat-bubble-image"
          ])}" data-v-dbce4391><img${ssrRenderAttr("src", msg.image_url)} loading="lazy" class="chat-bubble-image-content" data-v-dbce4391>`);
          if (msg.status === "sending") {
            _push(`<div class="chat-bubble-sending-overlay" data-v-dbce4391><div class="uploading-spinner" data-v-dbce4391></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (msg.status === "error") {
            _push(`<div class="chat-bubble-sending-overlay bg-red-500/20" data-v-dbce4391>`);
            _push(ssrRenderComponent(unref(AlertTriangle), { class: "h-8 w-8 text-white" }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="chat-bubble-image-meta" data-v-dbce4391><span class="text-[10px] font-medium text-white/90" data-v-dbce4391>${ssrInterpolate(formatTime(msg.created_at))}</span>`);
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
          _push(`<div class="${ssrRenderClass([msg.sender_id === unref(auth).user.id ? "chat-bubble--mine" : "chat-bubble--theirs", "chat-bubble"])}" data-v-dbce4391><p class="chat-bubble-text" data-v-dbce4391>${ssrInterpolate(msg.message)}</p><div class="chat-bubble-meta" data-v-dbce4391><span class="${ssrRenderClass([
            msg.sender_id === unref(auth).user.id ? "text-white/60" : "text-slate-500 dark:text-slate-400",
            "chat-bubble-time"
          ])}" data-v-dbce4391>${ssrInterpolate(formatTime(msg.created_at))}</span>`);
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
        _push(`<div class="chat-msg-row justify-start" data-v-dbce4391><div class="chat-bubble chat-bubble--theirs" data-v-dbce4391><div class="typing-indicator" data-v-dbce4391><span data-v-dbce4391></span><span data-v-dbce4391></span><span data-v-dbce4391></span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="h-px" data-v-dbce4391></div></div></main><footer class="chat-input-bar" data-v-dbce4391><div class="chat-input-inner" data-v-dbce4391><input type="file" class="hidden" accept="image/*" data-v-dbce4391><button type="button" class="chat-input-attach" data-v-dbce4391>`);
      _push(ssrRenderComponent(unref(ImageIcon), { class: "h-5 w-5" }, null, _parent));
      _push(`</button><div class="chat-input-field-wrap" data-v-dbce4391><textarea class="chat-input-field" placeholder="Ketik pesan..." rows="1" data-v-dbce4391>${ssrInterpolate(newMessage.value)}</textarea></div><button${ssrIncludeBooleanAttr(!newMessage.value.trim()) ? " disabled" : ""} class="${ssrRenderClass([newMessage.value.trim() ? "chat-send-btn--active" : "chat-send-btn--disabled", "chat-send-btn"])}" data-v-dbce4391>`);
      _push(ssrRenderComponent(unref(Send), { class: "h-5 w-5" }, null, _parent));
      _push(`</button></div></footer>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (lightboxUrl.value) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md" data-v-dbce4391><div class="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4" data-v-dbce4391><button class="rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 active:scale-90" data-v-dbce4391>`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button><button class="rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 active:scale-90" data-v-dbce4391>`);
          _push2(ssrRenderComponent(unref(Download), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button></div><img${ssrRenderAttr("src", lightboxUrl.value)} class="max-h-[88vh] max-w-[95vw] rounded-lg object-contain shadow-2xl" data-v-dbce4391></div>`);
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
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dbce4391"]]);
export {
  Show as default
};
