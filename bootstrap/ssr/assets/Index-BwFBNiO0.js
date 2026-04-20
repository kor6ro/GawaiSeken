import { ref, computed, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, withDirectives, vModelText, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B-phu6gS.js";
import { Search, X, MessageSquare, CheckCheck } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-Cw8mmzBN.js";
import "lodash/pickBy.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    chats: Array
  },
  setup(__props) {
    const props = __props;
    const auth = usePage().props.auth;
    const searchQuery = ref("");
    const getOpponent = (chat) => {
      return auth.user.id === chat.buyer_id ? chat.seller : chat.buyer;
    };
    const getDisplayName = (chat) => {
      var _a;
      const opponent = getOpponent(chat);
      return ((_a = opponent.profile) == null ? void 0 : _a.store_name) || opponent.name;
    };
    const getDisplayAvatar = (chat) => {
      var _a;
      const opponent = getOpponent(chat);
      return ((_a = opponent.profile) == null ? void 0 : _a.avatar) ? `/storage/${opponent.profile.avatar}` : null;
    };
    const getInitial = (chat) => {
      return getDisplayName(chat).charAt(0).toUpperCase();
    };
    const getPreviewContent = (chat) => {
      const lastMessage = chat.messages[0];
      if (!lastMessage) return "Belum ada percakapan";
      if (lastMessage.type === "image") return "📷 Foto";
      return lastMessage.message;
    };
    const isMine = (chat) => {
      var _a;
      return ((_a = chat.messages[0]) == null ? void 0 : _a.sender_id) === auth.user.id;
    };
    const isRead = (chat) => {
      var _a;
      return ((_a = chat.messages[0]) == null ? void 0 : _a.read_at) != null;
    };
    const formatTime = (chat) => {
      const lastMessage = chat.messages[0];
      if (!lastMessage) return "";
      const date = new Date(lastMessage.created_at);
      const now = /* @__PURE__ */ new Date();
      const diff = now - date;
      const oneDay = 24 * 60 * 60 * 1e3;
      if (diff < oneDay && now.getDate() === date.getDate()) {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
      } else if (diff < oneDay * 2) {
        return "Kemarin";
      } else if (diff < oneDay * 7) {
        return date.toLocaleDateString("id-ID", { weekday: "short" });
      } else {
        return date.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit" });
      }
    };
    const avatarColors = [
      ["#FF6B35", "#FF8E53"],
      ["#6C63FF", "#9B93FF"],
      ["#00C9A7", "#00E5C0"],
      ["#FF3CAC", "#FF79C6"],
      ["#2196F3", "#42ABFF"],
      ["#FF9800", "#FFC947"],
      ["#4CAF50", "#76C442"]
    ];
    const getAvatarGradient = (chat) => {
      const name = getDisplayName(chat);
      const idx = name.charCodeAt(0) % avatarColors.length;
      const [c1, c2] = avatarColors[idx];
      return `linear-gradient(135deg, ${c1}, ${c2})`;
    };
    const filteredChats = computed(() => {
      if (!searchQuery.value.trim()) return props.chats;
      const q = searchQuery.value.toLowerCase();
      return props.chats.filter((chat) => {
        var _a;
        const name = getDisplayName(chat).toLowerCase();
        const preview = getPreviewContent(chat).toLowerCase();
        const product = (((_a = chat.product) == null ? void 0 : _a.title) || "").toLowerCase();
        return name.includes(q) || preview.includes(q) || product.includes(q);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between" data-v-cb95ff30${_scopeId}><h2 class="font-black text-2xl text-foreground leading-tight" data-v-cb95ff30${_scopeId}>Pesan</h2><div class="flex items-center gap-2" data-v-cb95ff30${_scopeId}><span class="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" data-v-cb95ff30${_scopeId}></span><span class="text-sm font-semibold text-muted-foreground" data-v-cb95ff30${_scopeId}>${ssrInterpolate(props.chats.length)} Chat</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h2", { class: "font-black text-2xl text-foreground leading-tight" }, "Pesan"),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("span", { class: "flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" }),
                  createVNode("span", { class: "text-sm font-semibold text-muted-foreground" }, toDisplayString(props.chats.length) + " Chat", 1)
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Pesan" }, null, _parent2, _scopeId));
            _push2(`<div class="py-0 md:py-6" data-v-cb95ff30${_scopeId}><div class="max-w-2xl mx-auto sm:px-4" data-v-cb95ff30${_scopeId}><div class="chat-card" data-v-cb95ff30${_scopeId}><div class="chat-search-bar" data-v-cb95ff30${_scopeId}><div class="relative" data-v-cb95ff30${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/60" }, null, _parent2, _scopeId));
            _push2(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari percakapan..." class="w-full bg-muted/60 rounded-lg pl-10 pr-10 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-muted transition-all border border-transparent focus:border-primary/20" data-v-cb95ff30${_scopeId}>`);
            if (searchQuery.value) {
              _push2(`<button class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" data-v-cb95ff30${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="chat-list-container" data-v-cb95ff30${_scopeId}>`);
            if (filteredChats.value.length === 0) {
              _push2(`<div class="flex flex-col items-center justify-center py-20 px-8 text-center" data-v-cb95ff30${_scopeId}><div class="relative mb-6" data-v-cb95ff30${_scopeId}><div class="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-50 scale-150 animate-pulse" data-v-cb95ff30${_scopeId}></div><div class="relative bg-muted p-6 rounded-[2rem] shadow-xl border border-border" data-v-cb95ff30${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageSquare), { class: "w-12 h-12 text-primary" }, null, _parent2, _scopeId));
              _push2(`</div></div><h3 class="text-xl font-black text-foreground mb-2" data-v-cb95ff30${_scopeId}>${ssrInterpolate(searchQuery.value ? "Tidak ditemukan" : "Belum ada percakapan")}</h3><p class="text-muted-foreground text-sm leading-relaxed max-w-xs" data-v-cb95ff30${_scopeId}>${ssrInterpolate(searchQuery.value ? "Coba kata kunci lain." : "Temukan produk dan mulai mengobrol dengan penjual.")}</p>`);
              if (!searchQuery.value) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("home"),
                  class: "mt-8 inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 text-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Jelajahi Produk `);
                    } else {
                      return [
                        createTextVNode(" Jelajahi Produk ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(filteredChats.value, (chat) => {
              _push2(`<div class="chat-list-item" data-v-cb95ff30${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("chat.show", chat.id),
                class: "chat-list-link"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`<div class="chat-avatar-wrap" data-v-cb95ff30${_scopeId2}>`);
                    if (getDisplayAvatar(chat)) {
                      _push3(`<img${ssrRenderAttr("src", getDisplayAvatar(chat))} class="chat-avatar-img" data-v-cb95ff30${_scopeId2}>`);
                    } else {
                      _push3(`<div class="chat-avatar-fallback" style="${ssrRenderStyle({ background: getAvatarGradient(chat) })}" data-v-cb95ff30${_scopeId2}>${ssrInterpolate(getInitial(chat))}</div>`);
                    }
                    if (chat.unread_count > 0) {
                      _push3(`<span class="chat-unread-badge" data-v-cb95ff30${_scopeId2}>${ssrInterpolate(chat.unread_count > 99 ? "99+" : chat.unread_count)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="flex-1 min-w-0" data-v-cb95ff30${_scopeId2}><div class="flex items-center justify-between mb-0.5" data-v-cb95ff30${_scopeId2}><h3 class="${ssrRenderClass([chat.unread_count > 0 ? "font-bold" : "", "chat-item-name"])}" data-v-cb95ff30${_scopeId2}>${ssrInterpolate(getDisplayName(chat))}</h3><span class="${ssrRenderClass([chat.unread_count > 0 ? "text-primary font-semibold" : "text-muted-foreground", "chat-item-time"])}" data-v-cb95ff30${_scopeId2}>${ssrInterpolate(formatTime(chat))}</span></div><div class="flex items-center gap-1.5 min-w-0" data-v-cb95ff30${_scopeId2}>`);
                    if (isMine(chat)) {
                      _push3(`<!--[-->`);
                      if (isRead(chat)) {
                        _push3(ssrRenderComponent(unref(CheckCheck), { class: "w-4 h-4 text-primary flex-shrink-0" }, null, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(unref(CheckCheck), { class: "w-4 h-4 text-muted-foreground/50 flex-shrink-0" }, null, _parent3, _scopeId2));
                      }
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<p class="${ssrRenderClass([chat.unread_count > 0 ? "text-foreground font-medium" : "text-muted-foreground", "chat-item-preview"])}" data-v-cb95ff30${_scopeId2}>${ssrInterpolate(getPreviewContent(chat))}</p></div>`);
                    if ((_a = chat.product) == null ? void 0 : _a.title) {
                      _push3(`<div class="mt-1" data-v-cb95ff30${_scopeId2}><span class="chat-item-product" data-v-cb95ff30${_scopeId2}> 📦 ${ssrInterpolate(chat.product.title)}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "chat-avatar-wrap" }, [
                        getDisplayAvatar(chat) ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: getDisplayAvatar(chat),
                          class: "chat-avatar-img"
                        }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "chat-avatar-fallback",
                          style: { background: getAvatarGradient(chat) }
                        }, toDisplayString(getInitial(chat)), 5)),
                        chat.unread_count > 0 ? (openBlock(), createBlock("span", {
                          key: 2,
                          class: "chat-unread-badge"
                        }, toDisplayString(chat.unread_count > 99 ? "99+" : chat.unread_count), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-0.5" }, [
                          createVNode("h3", {
                            class: ["chat-item-name", chat.unread_count > 0 ? "font-bold" : ""]
                          }, toDisplayString(getDisplayName(chat)), 3),
                          createVNode("span", {
                            class: ["chat-item-time", chat.unread_count > 0 ? "text-primary font-semibold" : "text-muted-foreground"]
                          }, toDisplayString(formatTime(chat)), 3)
                        ]),
                        createVNode("div", { class: "flex items-center gap-1.5 min-w-0" }, [
                          isMine(chat) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            isRead(chat) ? (openBlock(), createBlock(unref(CheckCheck), {
                              key: 0,
                              class: "w-4 h-4 text-primary flex-shrink-0"
                            })) : (openBlock(), createBlock(unref(CheckCheck), {
                              key: 1,
                              class: "w-4 h-4 text-muted-foreground/50 flex-shrink-0"
                            }))
                          ], 64)) : createCommentVNode("", true),
                          createVNode("p", {
                            class: ["chat-item-preview", chat.unread_count > 0 ? "text-foreground font-medium" : "text-muted-foreground"]
                          }, toDisplayString(getPreviewContent(chat)), 3)
                        ]),
                        ((_b = chat.product) == null ? void 0 : _b.title) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1"
                        }, [
                          createVNode("span", { class: "chat-item-product" }, " 📦 " + toDisplayString(chat.product.title), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Pesan" }),
              createVNode("div", { class: "py-0 md:py-6" }, [
                createVNode("div", { class: "max-w-2xl mx-auto sm:px-4" }, [
                  createVNode("div", { class: "chat-card" }, [
                    createVNode("div", { class: "chat-search-bar" }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Search), { class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/60" }),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Cari percakapan...",
                          class: "w-full bg-muted/60 rounded-lg pl-10 pr-10 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-muted transition-all border border-transparent focus:border-primary/20"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ]),
                        searchQuery.value ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => searchQuery.value = "",
                          class: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        }, [
                          createVNode(unref(X), { class: "w-4 h-4" })
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "chat-list-container" }, [
                      filteredChats.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col items-center justify-center py-20 px-8 text-center"
                      }, [
                        createVNode("div", { class: "relative mb-6" }, [
                          createVNode("div", { class: "absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-50 scale-150 animate-pulse" }),
                          createVNode("div", { class: "relative bg-muted p-6 rounded-[2rem] shadow-xl border border-border" }, [
                            createVNode(unref(MessageSquare), { class: "w-12 h-12 text-primary" })
                          ])
                        ]),
                        createVNode("h3", { class: "text-xl font-black text-foreground mb-2" }, toDisplayString(searchQuery.value ? "Tidak ditemukan" : "Belum ada percakapan"), 1),
                        createVNode("p", { class: "text-muted-foreground text-sm leading-relaxed max-w-xs" }, toDisplayString(searchQuery.value ? "Coba kata kunci lain." : "Temukan produk dan mulai mengobrol dengan penjual."), 1),
                        !searchQuery.value ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("home"),
                          class: "mt-8 inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 text-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Jelajahi Produk ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredChats.value, (chat) => {
                        return openBlock(), createBlock("div", {
                          key: chat.id,
                          class: "chat-list-item"
                        }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("chat.show", chat.id),
                            class: "chat-list-link"
                          }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode("div", { class: "chat-avatar-wrap" }, [
                                  getDisplayAvatar(chat) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: getDisplayAvatar(chat),
                                    class: "chat-avatar-img"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "chat-avatar-fallback",
                                    style: { background: getAvatarGradient(chat) }
                                  }, toDisplayString(getInitial(chat)), 5)),
                                  chat.unread_count > 0 ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    class: "chat-unread-badge"
                                  }, toDisplayString(chat.unread_count > 99 ? "99+" : chat.unread_count), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex items-center justify-between mb-0.5" }, [
                                    createVNode("h3", {
                                      class: ["chat-item-name", chat.unread_count > 0 ? "font-bold" : ""]
                                    }, toDisplayString(getDisplayName(chat)), 3),
                                    createVNode("span", {
                                      class: ["chat-item-time", chat.unread_count > 0 ? "text-primary font-semibold" : "text-muted-foreground"]
                                    }, toDisplayString(formatTime(chat)), 3)
                                  ]),
                                  createVNode("div", { class: "flex items-center gap-1.5 min-w-0" }, [
                                    isMine(chat) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      isRead(chat) ? (openBlock(), createBlock(unref(CheckCheck), {
                                        key: 0,
                                        class: "w-4 h-4 text-primary flex-shrink-0"
                                      })) : (openBlock(), createBlock(unref(CheckCheck), {
                                        key: 1,
                                        class: "w-4 h-4 text-muted-foreground/50 flex-shrink-0"
                                      }))
                                    ], 64)) : createCommentVNode("", true),
                                    createVNode("p", {
                                      class: ["chat-item-preview", chat.unread_count > 0 ? "text-foreground font-medium" : "text-muted-foreground"]
                                    }, toDisplayString(getPreviewContent(chat)), 3)
                                  ]),
                                  ((_a = chat.product) == null ? void 0 : _a.title) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-1"
                                  }, [
                                    createVNode("span", { class: "chat-item-product" }, " 📦 " + toDisplayString(chat.product.title), 1)
                                  ])) : createCommentVNode("", true)
                                ])
                              ];
                            }),
                            _: 2
                          }, 1032, ["href"])
                        ]);
                      }), 128))
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chat/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb95ff30"]]);
export {
  Index as default
};
