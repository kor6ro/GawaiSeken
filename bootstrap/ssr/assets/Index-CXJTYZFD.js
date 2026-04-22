import { ref, watch, onMounted, onUnmounted, computed, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, withDirectives, vModelText, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { usePage, router, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-BDlcmPtd.js";
import { Search, X, MessageSquare, CheckCheck } from "lucide-vue-next";
import { o as onlineUserIds } from "./onlineState-BAtS9nBF.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
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
    const localChats = ref([...props.chats]);
    watch(
      () => props.chats,
      (newChats) => {
        localChats.value = [...newChats];
      },
      { deep: true }
    );
    onMounted(() => {
      if (window.Echo && auth.user) {
        window.Echo.private(`App.Models.User.${auth.user.id}`).listen("MessageSent", (e) => {
          const chatIndex = localChats.value.findIndex((c) => c.id === e.chatId);
          if (chatIndex !== -1) {
            const chat = { ...localChats.value[chatIndex] };
            chat.messages = [e.message];
            chat.unread_count = (chat.unread_count || 0) + 1;
            const newList = [...localChats.value];
            newList.splice(chatIndex, 1);
            newList.unshift(chat);
            localChats.value = newList;
            if (usePage().props.auth.user) {
              usePage().props.auth.user.unread_messages_count++;
            }
          } else {
            router.reload({ only: ["chats"] });
          }
        });
      }
    });
    onUnmounted(() => {
      if (window.Echo && auth.user) {
        window.Echo.leave(`App.Models.User.${auth.user.id}`);
      }
    });
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
      if (!searchQuery.value.trim()) return localChats.value;
      const q = searchQuery.value.toLowerCase();
      return localChats.value.filter((chat) => {
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
            _push2(`<div class="flex items-center justify-between" data-v-bbc37838${_scopeId}><h2 class="text-2xl font-black leading-tight text-foreground" data-v-bbc37838${_scopeId}>Pesan</h2><div class="flex items-center gap-2" data-v-bbc37838${_scopeId}><span class="flex h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" data-v-bbc37838${_scopeId}></span><span class="text-sm font-semibold text-muted-foreground" data-v-bbc37838${_scopeId}>${ssrInterpolate(props.chats.length)} Chat</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h2", { class: "text-2xl font-black leading-tight text-foreground" }, "Pesan"),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("span", { class: "flex h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" }),
                  createVNode("span", { class: "text-sm font-semibold text-muted-foreground" }, toDisplayString(props.chats.length) + " Chat", 1)
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Pesan" }, null, _parent2, _scopeId));
            _push2(`<div class="py-0 md:py-6" data-v-bbc37838${_scopeId}><div class="mx-auto max-w-2xl sm:px-4" data-v-bbc37838${_scopeId}><div class="chat-card" data-v-bbc37838${_scopeId}><div class="chat-search-bar" data-v-bbc37838${_scopeId}><div class="relative" data-v-bbc37838${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60" }, null, _parent2, _scopeId));
            _push2(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari percakapan..." class="w-full rounded-lg border border-transparent bg-muted/60 py-2 pl-10 pr-10 text-sm text-foreground placeholder-muted-foreground/50 transition-all focus:border-primary/20 focus:bg-muted focus:outline-none focus:ring-1 focus:ring-primary/30" data-v-bbc37838${_scopeId}>`);
            if (searchQuery.value) {
              _push2(`<button class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground" data-v-bbc37838${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="chat-list-container" data-v-bbc37838${_scopeId}>`);
            if (filteredChats.value.length === 0) {
              _push2(`<div class="flex flex-col items-center justify-center px-8 py-20 text-center" data-v-bbc37838${_scopeId}><div class="relative mb-6" data-v-bbc37838${_scopeId}><div class="absolute inset-0 scale-150 animate-pulse rounded-full bg-primary/20 opacity-50 blur-3xl" data-v-bbc37838${_scopeId}></div><div class="relative rounded-[2rem] border border-border bg-muted p-6 shadow-xl" data-v-bbc37838${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageSquare), { class: "h-12 w-12 text-primary" }, null, _parent2, _scopeId));
              _push2(`</div></div><h3 class="mb-2 text-xl font-black text-foreground" data-v-bbc37838${_scopeId}>${ssrInterpolate(searchQuery.value ? "Tidak ditemukan" : "Belum ada percakapan")}</h3><p class="max-w-xs text-sm leading-relaxed text-muted-foreground" data-v-bbc37838${_scopeId}>${ssrInterpolate(searchQuery.value ? "Coba kata kunci lain." : "Temukan produk dan mulai mengobrol dengan penjual.")}</p>`);
              if (!searchQuery.value) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("home"),
                  class: "mt-8 inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
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
              _push2(`<div class="chat-list-item" data-v-bbc37838${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("chat.show", chat.id),
                class: "chat-list-link"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`<div class="chat-avatar-wrap" data-v-bbc37838${_scopeId2}>`);
                    if (getDisplayAvatar(chat)) {
                      _push3(`<img${ssrRenderAttr("src", getDisplayAvatar(chat))} loading="lazy" class="chat-avatar-img" data-v-bbc37838${_scopeId2}>`);
                    } else {
                      _push3(`<div class="chat-avatar-fallback" style="${ssrRenderStyle({ background: getAvatarGradient(chat) })}" data-v-bbc37838${_scopeId2}>${ssrInterpolate(getInitial(chat))}</div>`);
                    }
                    if (unref(onlineUserIds).includes(Number(getOpponent(chat).id))) {
                      _push3(`<span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500 shadow-sm" data-v-bbc37838${_scopeId2}></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="min-w-0 flex-1" data-v-bbc37838${_scopeId2}><div class="flex items-start justify-between gap-3" data-v-bbc37838${_scopeId2}><div class="min-w-0 flex-1" data-v-bbc37838${_scopeId2}><h3 class="${ssrRenderClass([chat.unread_count > 0 ? "font-bold" : "", "chat-item-name"])}" data-v-bbc37838${_scopeId2}>${ssrInterpolate(getDisplayName(chat))}</h3><div class="mt-0.5 flex min-w-0 items-center gap-1.5" data-v-bbc37838${_scopeId2}>`);
                    if (isMine(chat)) {
                      _push3(`<!--[-->`);
                      if (isRead(chat)) {
                        _push3(ssrRenderComponent(unref(CheckCheck), { class: "h-4 w-4 flex-shrink-0 text-primary" }, null, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(unref(CheckCheck), { class: "h-4 w-4 flex-shrink-0 text-muted-foreground/50" }, null, _parent3, _scopeId2));
                      }
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<p class="${ssrRenderClass([
                      chat.unread_count > 0 ? "font-medium text-foreground" : "text-muted-foreground",
                      "chat-item-preview"
                    ])}" data-v-bbc37838${_scopeId2}>${ssrInterpolate(getPreviewContent(chat))}</p></div>`);
                    if ((_a = chat.product) == null ? void 0 : _a.title) {
                      _push3(`<div class="mt-1" data-v-bbc37838${_scopeId2}><span class="chat-item-product" data-v-bbc37838${_scopeId2}> 📦 ${ssrInterpolate(chat.product.title)}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="flex flex-shrink-0 flex-col items-end gap-1.5" data-v-bbc37838${_scopeId2}><span class="${ssrRenderClass([
                      chat.unread_count > 0 ? "font-bold text-primary" : "text-muted-foreground",
                      "chat-item-time"
                    ])}" data-v-bbc37838${_scopeId2}>${ssrInterpolate(formatTime(chat))}</span>`);
                    if (chat.unread_count > 0) {
                      _push3(`<span class="chat-unread-pill" data-v-bbc37838${_scopeId2}>${ssrInterpolate(chat.unread_count)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "chat-avatar-wrap" }, [
                        getDisplayAvatar(chat) ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: getDisplayAvatar(chat),
                          loading: "lazy",
                          class: "chat-avatar-img"
                        }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "chat-avatar-fallback",
                          style: { background: getAvatarGradient(chat) }
                        }, toDisplayString(getInitial(chat)), 5)),
                        unref(onlineUserIds).includes(Number(getOpponent(chat).id)) ? (openBlock(), createBlock("span", {
                          key: 2,
                          class: "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500 shadow-sm"
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "min-w-0 flex-1" }, [
                        createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("h3", {
                              class: ["chat-item-name", chat.unread_count > 0 ? "font-bold" : ""]
                            }, toDisplayString(getDisplayName(chat)), 3),
                            createVNode("div", { class: "mt-0.5 flex min-w-0 items-center gap-1.5" }, [
                              isMine(chat) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                isRead(chat) ? (openBlock(), createBlock(unref(CheckCheck), {
                                  key: 0,
                                  class: "h-4 w-4 flex-shrink-0 text-primary"
                                })) : (openBlock(), createBlock(unref(CheckCheck), {
                                  key: 1,
                                  class: "h-4 w-4 flex-shrink-0 text-muted-foreground/50"
                                }))
                              ], 64)) : createCommentVNode("", true),
                              createVNode("p", {
                                class: [
                                  "chat-item-preview",
                                  chat.unread_count > 0 ? "font-medium text-foreground" : "text-muted-foreground"
                                ]
                              }, toDisplayString(getPreviewContent(chat)), 3)
                            ]),
                            ((_b = chat.product) == null ? void 0 : _b.title) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1"
                            }, [
                              createVNode("span", { class: "chat-item-product" }, " 📦 " + toDisplayString(chat.product.title), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex flex-shrink-0 flex-col items-end gap-1.5" }, [
                            createVNode("span", {
                              class: [
                                "chat-item-time",
                                chat.unread_count > 0 ? "font-bold text-primary" : "text-muted-foreground"
                              ]
                            }, toDisplayString(formatTime(chat)), 3),
                            chat.unread_count > 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "chat-unread-pill"
                            }, toDisplayString(chat.unread_count), 1)) : createCommentVNode("", true)
                          ])
                        ])
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
                createVNode("div", { class: "mx-auto max-w-2xl sm:px-4" }, [
                  createVNode("div", { class: "chat-card" }, [
                    createVNode("div", { class: "chat-search-bar" }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Search), { class: "absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60" }),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Cari percakapan...",
                          class: "w-full rounded-lg border border-transparent bg-muted/60 py-2 pl-10 pr-10 text-sm text-foreground placeholder-muted-foreground/50 transition-all focus:border-primary/20 focus:bg-muted focus:outline-none focus:ring-1 focus:ring-primary/30"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ]),
                        searchQuery.value ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => searchQuery.value = "",
                          class: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        }, [
                          createVNode(unref(X), { class: "h-4 w-4" })
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "chat-list-container" }, [
                      filteredChats.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col items-center justify-center px-8 py-20 text-center"
                      }, [
                        createVNode("div", { class: "relative mb-6" }, [
                          createVNode("div", { class: "absolute inset-0 scale-150 animate-pulse rounded-full bg-primary/20 opacity-50 blur-3xl" }),
                          createVNode("div", { class: "relative rounded-[2rem] border border-border bg-muted p-6 shadow-xl" }, [
                            createVNode(unref(MessageSquare), { class: "h-12 w-12 text-primary" })
                          ])
                        ]),
                        createVNode("h3", { class: "mb-2 text-xl font-black text-foreground" }, toDisplayString(searchQuery.value ? "Tidak ditemukan" : "Belum ada percakapan"), 1),
                        createVNode("p", { class: "max-w-xs text-sm leading-relaxed text-muted-foreground" }, toDisplayString(searchQuery.value ? "Coba kata kunci lain." : "Temukan produk dan mulai mengobrol dengan penjual."), 1),
                        !searchQuery.value ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("home"),
                          class: "mt-8 inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
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
                                    loading: "lazy",
                                    class: "chat-avatar-img"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "chat-avatar-fallback",
                                    style: { background: getAvatarGradient(chat) }
                                  }, toDisplayString(getInitial(chat)), 5)),
                                  unref(onlineUserIds).includes(Number(getOpponent(chat).id)) ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    class: "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500 shadow-sm"
                                  })) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "min-w-0 flex-1" }, [
                                  createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                                    createVNode("div", { class: "min-w-0 flex-1" }, [
                                      createVNode("h3", {
                                        class: ["chat-item-name", chat.unread_count > 0 ? "font-bold" : ""]
                                      }, toDisplayString(getDisplayName(chat)), 3),
                                      createVNode("div", { class: "mt-0.5 flex min-w-0 items-center gap-1.5" }, [
                                        isMine(chat) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                          isRead(chat) ? (openBlock(), createBlock(unref(CheckCheck), {
                                            key: 0,
                                            class: "h-4 w-4 flex-shrink-0 text-primary"
                                          })) : (openBlock(), createBlock(unref(CheckCheck), {
                                            key: 1,
                                            class: "h-4 w-4 flex-shrink-0 text-muted-foreground/50"
                                          }))
                                        ], 64)) : createCommentVNode("", true),
                                        createVNode("p", {
                                          class: [
                                            "chat-item-preview",
                                            chat.unread_count > 0 ? "font-medium text-foreground" : "text-muted-foreground"
                                          ]
                                        }, toDisplayString(getPreviewContent(chat)), 3)
                                      ]),
                                      ((_a = chat.product) == null ? void 0 : _a.title) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "mt-1"
                                      }, [
                                        createVNode("span", { class: "chat-item-product" }, " 📦 " + toDisplayString(chat.product.title), 1)
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "flex flex-shrink-0 flex-col items-end gap-1.5" }, [
                                      createVNode("span", {
                                        class: [
                                          "chat-item-time",
                                          chat.unread_count > 0 ? "font-bold text-primary" : "text-muted-foreground"
                                        ]
                                      }, toDisplayString(formatTime(chat)), 3),
                                      chat.unread_count > 0 ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "chat-unread-pill"
                                      }, toDisplayString(chat.unread_count), 1)) : createCommentVNode("", true)
                                    ])
                                  ])
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbc37838"]]);
export {
  Index as default
};
