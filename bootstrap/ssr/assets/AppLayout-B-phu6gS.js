import { computed, unref, mergeProps, withCtx, renderSlot, useSSRContext, ref, onMounted, onUnmounted, watch, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, withDirectives, vModelRadio } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { Link, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./ApplicationLogo-5BXBKbkR.js";
import { Home, LayoutDashboard, MessageSquare, Search, SlidersHorizontal, ShoppingCart, Sun, Moon, User, LogOut, ChevronDown, Menu, X, Settings, Cpu, HardDrive, ArrowUpDown } from "lucide-vue-next";
import debounce from "lodash/debounce.js";
import { _ as _sfc_main$5 } from "./Modal-Cw8mmzBN.js";
import pickBy from "lodash/pickBy.js";
const _sfc_main$3 = {
  __name: "ResponsiveNavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "block w-full ps-3 pe-4 py-2 border-l-4 border-primary text-start text-base font-medium text-primary bg-primary/5 focus:outline-none focus:text-primary focus:bg-primary/10 focus:border-primary transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border focus:outline-none focus:text-foreground focus:bg-accent focus:border-border transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      default: "right"
    },
    width: {
      default: "48"
    },
    contentClasses: {
      default: () => ["py-1", "bg-background"]
    }
  },
  setup(__props) {
    const props = __props;
    let open = ref(false);
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "ltr:origin-top-left rtl:origin-top-right start-0";
      } else if (props.align === "right") {
        return "ltr:origin-top-right rtl:origin-top-left end-0";
      } else {
        return "origin-top";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}"></div><div class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg border border-border"])}" style="${ssrRenderStyle([
        { "display": "none" },
        unref(open) ? null : { display: "none" }
      ])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: "block w-full px-4 py-2 text-start text-sm leading-5 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent transition duration-150 ease-in-out"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AppLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { props: pageProps } = usePage();
    const auth = pageProps.auth;
    const globalFilters = pageProps.global_filters;
    const initialFilters = pageProps.active_filters;
    const filterModalOpen = ref(false);
    const search = ref(initialFilters.search || "");
    const filterParams = ref({
      category: initialFilters.category || "",
      ram: initialFilters.ram || "",
      storage: initialFilters.storage || "",
      kelengkapan: initialFilters.kelengkapan || "",
      sort: initialFilters.sort || "latest"
    });
    const performSearch = debounce(() => {
      let params = pickBy({
        search: search.value,
        ...filterParams.value
      }, (value, key) => {
        if (key === "sort" && value === "latest") return false;
        return value !== "" && value !== null && value !== void 0;
      });
      router.get(route("home"), params, {
        preserveState: true,
        preserveScroll: true
      });
    }, 500);
    watch(search, () => {
      performSearch();
    });
    const applyFilters = () => {
      filterModalOpen.value = false;
      performSearch();
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
    const showingNavigationDropdown = ref(false);
    const isDark = ref(localStorage.getItem("theme") === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    onMounted(() => {
      document.documentElement.classList.toggle("dark", isDark.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground transition-colors duration-200" }, _attrs))}><nav class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50 transition-colors duration-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex items-center"><div class="shrink-0 flex items-center mr-6">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, { class: "w-28 h-auto" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, { class: "w-28 h-auto" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden sm:flex items-center gap-1 border-l border-border/50 pl-4 h-8">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: [[_ctx.route().current("home") ? "text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"], "p-2 rounded-xl transition-all duration-200 group relative"],
        title: "Home"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Home), { class: "w-5 h-5 group-hover:scale-110 transition-transform" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Home), { class: "w-5 h-5 group-hover:scale-110 transition-transform" })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth).user) {
        _push(`<!--[-->`);
        if (unref(auth).user.role === "seller") {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            class: [[_ctx.route().current("dashboard") ? "text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"], "p-2 rounded-xl transition-all duration-200 group relative"],
            title: "Dashboard"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "w-5 h-5 group-hover:scale-110 transition-transform" }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(LayoutDashboard), { class: "w-5 h-5 group-hover:scale-110 transition-transform" })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("chat.index"),
          class: [[_ctx.route().current("chat.*") ? "text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"], "p-2 rounded-xl transition-all duration-200 group relative"],
          title: "Pesan"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(MessageSquare), { class: "w-5 h-5 group-hover:scale-110 transition-transform" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(MessageSquare), { class: "w-5 h-5 group-hover:scale-110 transition-transform" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="hidden sm:flex sm:items-center gap-1"><div class="flex items-center gap-2 mr-2"><div class="relative group"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-colors">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-4 w-4 text-muted-foreground group-focus-within:text-primary" }, null, _parent));
      _push(`</div><input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari gadget..." class="w-40 lg:w-56 pl-9 pr-4 py-1.5 rounded-xl bg-muted/60 border-transparent focus:border-border focus:bg-background focus:ring-2 focus:ring-primary/20 text-sm transition-all duration-200 placeholder:text-muted-foreground/70"></div><button class="p-2 rounded-xl bg-muted/60 hover:bg-accent text-muted-foreground hover:text-primary transition-all relative group" title="Filter Pencarian">`);
      _push(ssrRenderComponent(unref(SlidersHorizontal), { class: "w-4 h-4" }, null, _parent));
      if (hasActiveFilters()) {
        _push(`<span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><div class="flex items-center gap-1 mr-2 px-2 border-r border-border/50">`);
      if (unref(auth).user) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("products.favorites"),
          class: [[_ctx.route().current("products.favorites") ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-accent hover:text-primary"], "p-2 rounded-xl transition relative group"],
          title: "Keranjang Saya"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(ssrRenderComponent(unref(ShoppingCart), { class: "w-5 h-5 transition-transform group-hover:scale-110" }, null, _parent2, _scopeId));
              if (((_a = unref(auth).user.favorites) == null ? void 0 : _a.length) > 0) {
                _push2(`<span class="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(unref(ShoppingCart), { class: "w-5 h-5 transition-transform group-hover:scale-110" }),
                ((_b = unref(auth).user.favorites) == null ? void 0 : _b.length) > 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none rounded-xl p-2 transition">`);
      if (isDark.value) {
        _push(ssrRenderComponent(unref(Sun), { class: "w-5 h-5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Moon), { class: "w-5 h-5" }, null, _parent));
      }
      _push(`</button></div>`);
      if (unref(auth).user) {
        _push(`<div class="relative">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          align: "right",
          width: "48"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-muted-foreground bg-muted/60 backdrop-blur-md hover:text-foreground hover:bg-muted/80 focus:outline-none transition ease-in-out duration-150 shadow-sm"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase"${_scopeId}>${ssrInterpolate(unref(auth).user.name.charAt(0))}</div><div class="hidden lg:block text-left mr-1"${_scopeId}><div class="text-[11px] font-bold truncate max-w-[100px] leading-tight"${_scopeId}>${ssrInterpolate(unref(auth).user.name)}</div><div class="text-[9px] text-muted-foreground leading-tight"${_scopeId}>${ssrInterpolate(unref(auth).user.role)}</div></div></div>`);
              _push2(ssrRenderComponent(unref(ChevronDown), { class: "h-3 w-3 text-muted-foreground" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-muted-foreground bg-muted/60 backdrop-blur-md hover:text-foreground hover:bg-muted/80 focus:outline-none transition ease-in-out duration-150 shadow-sm"
                }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase" }, toDisplayString(unref(auth).user.name.charAt(0)), 1),
                    createVNode("div", { class: "hidden lg:block text-left mr-1" }, [
                      createVNode("div", { class: "text-[11px] font-bold truncate max-w-[100px] leading-tight" }, toDisplayString(unref(auth).user.name), 1),
                      createVNode("div", { class: "text-[9px] text-muted-foreground leading-tight" }, toDisplayString(unref(auth).user.role), 1)
                    ])
                  ]),
                  createVNode(unref(ChevronDown), { class: "h-3 w-3 text-muted-foreground" })
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-4 py-2 border-b border-border mb-1 block lg:hidden"${_scopeId}><div class="text-sm font-bold truncate"${_scopeId}>${ssrInterpolate(unref(auth).user.name)}</div><div class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(auth).user.role)}</div></div>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                href: _ctx.route("profile.edit")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(User), { class: "w-4 h-4 inline mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Profile `);
                  } else {
                    return [
                      createVNode(unref(User), { class: "w-4 h-4 inline mr-2" }),
                      createTextVNode(" Profile ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, {
                href: _ctx.route("logout"),
                method: "post",
                as: "button"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4 inline mr-2 text-red-500" }, null, _parent3, _scopeId2));
                    _push3(` Log Out `);
                  } else {
                    return [
                      createVNode(unref(LogOut), { class: "w-4 h-4 inline mr-2 text-red-500" }),
                      createTextVNode(" Log Out ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", { class: "px-4 py-2 border-b border-border mb-1 block lg:hidden" }, [
                  createVNode("div", { class: "text-sm font-bold truncate" }, toDisplayString(unref(auth).user.name), 1),
                  createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(auth).user.role), 1)
                ]),
                createVNode(_sfc_main$1, {
                  href: _ctx.route("profile.edit")
                }, {
                  default: withCtx(() => [
                    createVNode(unref(User), { class: "w-4 h-4 inline mr-2" }),
                    createTextVNode(" Profile ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_sfc_main$1, {
                  href: _ctx.route("logout"),
                  method: "post",
                  as: "button"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(LogOut), { class: "w-4 h-4 inline mr-2 text-red-500" }),
                    createTextVNode(" Log Out ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="flex items-center gap-2 pl-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "text-xs text-foreground hover:text-primary font-bold transition px-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-xl font-black text-[10px] text-primary-foreground uppercase tracking-widest hover:bg-primary/90 transition duration-150 shadow-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Daftar `);
            } else {
              return [
                createTextVNode(" Daftar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="-me-2 flex items-center sm:hidden gap-1"><button type="button" class="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-lg text-sm p-2.5 transition">`);
      if (isDark.value) {
        _push(ssrRenderComponent(unref(Sun), { class: "w-5 h-5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Moon), { class: "w-5 h-5" }, null, _parent));
      }
      _push(`</button><button class="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none transition duration-150 ease-in-out">`);
      if (!showingNavigationDropdown.value) {
        _push(ssrRenderComponent(unref(Menu), { class: "w-6 h-6" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(X), { class: "w-6 h-6" }, null, _parent));
      }
      _push(`</button></div></div></div><div class="${ssrRenderClass([{ block: showingNavigationDropdown.value, hidden: !showingNavigationDropdown.value }, "sm:hidden bg-background border-t border-border shadow-xl"])}"><div class="p-4 border-b border-border flex gap-2"><div class="relative flex-1"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-4 w-4 text-muted-foreground" }, null, _parent));
      _push(`</div><input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari gadget..." class="w-full pl-10 pr-4 py-2 rounded-xl bg-muted border-none focus:ring-2 focus:ring-primary text-sm transition-all"></div><button class="p-2 bg-muted rounded-xl text-muted-foreground">`);
      _push(ssrRenderComponent(unref(SlidersHorizontal), { class: "w-5 h-5" }, null, _parent));
      _push(`</button></div><div class="pt-2 pb-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        href: _ctx.route("home"),
        active: _ctx.route().current("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Home), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Home </div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(unref(Home), { class: "w-4 h-4" }),
                createTextVNode(" Home ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth).user) {
        _push(`<!--[-->`);
        if (unref(auth).user.role === "seller") {
          _push(ssrRenderComponent(_sfc_main$3, {
            href: _ctx.route("dashboard"),
            active: _ctx.route().current("dashboard")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(` Seller Dashboard </div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(unref(LayoutDashboard), { class: "w-4 h-4" }),
                    createTextVNode(" Seller Dashboard ")
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$3, {
          href: _ctx.route("chat.index"),
          active: _ctx.route().current("chat.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageSquare), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Pesan </div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(unref(MessageSquare), { class: "w-4 h-4" }),
                  createTextVNode(" Pesan ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="pt-4 pb-1 border-t border-border">`);
      if (unref(auth).user) {
        _push(`<!--[--><div class="px-4 flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center">`);
        _push(ssrRenderComponent(unref(User), { class: "w-6 h-6 text-muted-foreground" }, null, _parent));
        _push(`</div><div><div class="font-medium text-base text-foreground">${ssrInterpolate(unref(auth).user.name)}</div><div class="font-medium text-sm text-muted-foreground">${ssrInterpolate(unref(auth).user.role)} | ${ssrInterpolate(unref(auth).user.email)}</div></div></div><div class="mt-3 space-y-1">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          href: _ctx.route("profile.edit")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Settings), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Profile Settings </div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(unref(Settings), { class: "w-4 h-4" }),
                  createTextVNode(" Profile Settings ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          href: _ctx.route("logout"),
          method: "post",
          as: "button",
          class: "text-red-500 font-bold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Log Out </div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(unref(LogOut), { class: "w-4 h-4" }),
                  createTextVNode(" Log Out ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<div class="p-4 space-y-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "block w-full text-center py-2 text-foreground font-semibold border border-border rounded-xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "block w-full text-center py-2 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Daftar Akun Baru `);
            } else {
              return [
                createTextVNode(" Daftar Akun Baru ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></nav>`);
      _push(ssrRenderComponent(_sfc_main$5, {
        show: filterModalOpen.value,
        onClose: ($event) => filterModalOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 bg-background text-foreground transition-colors"${_scopeId}><div class="flex justify-between items-center mb-6 pb-4 border-b border-border"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>Filter Pencarian</h2><p class="text-xs text-muted-foreground mt-1"${_scopeId}>Sesuaikan hasil sesuai kebutuhan Anda</p></div><button class="p-2 bg-muted rounded-full text-muted-foreground hover:bg-accent transition"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(`</button></div><div class="mb-6"${_scopeId}><h4 class="text-sm font-bold mb-3 uppercase tracking-wider"${_scopeId}>Kategori</h4><div class="grid grid-cols-2 sm:grid-cols-3 gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(unref(globalFilters).categories, (cat) => {
              _push2(`<label class="cursor-pointer relative group"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.category, cat.slug)) ? " checked" : ""}${ssrRenderAttr("value", cat.slug)} class="peer sr-only"${_scopeId}><div class="px-3 py-2.5 rounded-xl border border-border text-center text-xs font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary"${_scopeId}>${ssrInterpolate(cat.name)}</div></label>`);
            });
            _push2(`<!--]--><label class="cursor-pointer relative group"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.category, "")) ? " checked" : ""} value="" class="peer sr-only"${_scopeId}><div class="px-3 py-2.5 rounded-xl border border-border text-center text-xs font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary"${_scopeId}> Semua </div></label></div></div><div class="mb-6"${_scopeId}><h4 class="text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Cpu), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` RAM </h4><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(globalFilters).rams, (ram) => {
              _push2(`<label class="cursor-pointer group relative"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.ram, ram)) ? " checked" : ""}${ssrRenderAttr("value", ram)} class="peer sr-only"${_scopeId}><span class="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-border bg-background peer-checked:bg-primary peer-checked:text-primary-foreground transition-all"${_scopeId}>${ssrInterpolate(ram)}</span></label>`);
            });
            _push2(`<!--]--></div></div><div class="mb-6"${_scopeId}><h4 class="text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(HardDrive), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Penyimpanan </h4><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(globalFilters).storages, (storage) => {
              _push2(`<label class="cursor-pointer group relative"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.storage, storage)) ? " checked" : ""}${ssrRenderAttr("value", storage)} class="peer sr-only"${_scopeId}><span class="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-border bg-background peer-checked:bg-primary peer-checked:text-primary-foreground transition-all"${_scopeId}>${ssrInterpolate(storage)}</span></label>`);
            });
            _push2(`<!--]--></div></div><div class="mb-8"${_scopeId}><h4 class="text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ArrowUpDown), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Urutkan </h4><div class="grid grid-cols-2 gap-3"${_scopeId}><label class="cursor-pointer group relative"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.sort, "latest")) ? " checked" : ""} value="latest" class="peer sr-only"${_scopeId}><div class="px-3 py-2.5 rounded-xl border border-border text-center text-[10px] font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground"${_scopeId}> Terbaru </div></label><label class="cursor-pointer group relative"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.sort, "oldest")) ? " checked" : ""} value="oldest" class="peer sr-only"${_scopeId}><div class="px-3 py-2.5 rounded-xl border border-border text-center text-[10px] font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground"${_scopeId}> Terlama </div></label></div></div><div class="flex items-center justify-end gap-3 pt-6 border-t border-border"${_scopeId}><button class="text-xs text-red-500 hover:text-red-600 font-bold px-4 transition-colors"${_scopeId}> Reset </button><button class="px-8 py-2 text-sm font-black text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"${_scopeId}> Terapkan </button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 bg-background text-foreground transition-colors" }, [
                createVNode("div", { class: "flex justify-between items-center mb-6 pb-4 border-b border-border" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-bold" }, "Filter Pencarian"),
                    createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Sesuaikan hasil sesuai kebutuhan Anda")
                  ]),
                  createVNode("button", {
                    onClick: ($event) => filterModalOpen.value = false,
                    class: "p-2 bg-muted rounded-full text-muted-foreground hover:bg-accent transition"
                  }, [
                    createVNode(unref(X), { class: "h-5 w-5" })
                  ], 8, ["onClick"])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h4", { class: "text-sm font-bold mb-3 uppercase tracking-wider" }, "Kategori"),
                  createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(globalFilters).categories, (cat) => {
                      return openBlock(), createBlock("label", {
                        key: cat.id,
                        class: "cursor-pointer relative group"
                      }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => filterParams.value.category = $event,
                          value: cat.slug,
                          class: "peer sr-only"
                        }, null, 8, ["onUpdate:modelValue", "value"]), [
                          [vModelRadio, filterParams.value.category]
                        ]),
                        createVNode("div", { class: "px-3 py-2.5 rounded-xl border border-border text-center text-xs font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary" }, toDisplayString(cat.name), 1)
                      ]);
                    }), 128)),
                    createVNode("label", { class: "cursor-pointer relative group" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => filterParams.value.category = $event,
                        value: "",
                        class: "peer sr-only"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, filterParams.value.category]
                      ]),
                      createVNode("div", { class: "px-3 py-2.5 rounded-xl border border-border text-center text-xs font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary" }, " Semua ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h4", { class: "text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary" }, [
                    createVNode(unref(Cpu), { class: "w-4 h-4" }),
                    createTextVNode(" RAM ")
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(globalFilters).rams, (ram) => {
                      return openBlock(), createBlock("label", {
                        key: ram,
                        class: "cursor-pointer group relative"
                      }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => filterParams.value.ram = $event,
                          value: ram,
                          class: "peer sr-only"
                        }, null, 8, ["onUpdate:modelValue", "value"]), [
                          [vModelRadio, filterParams.value.ram]
                        ]),
                        createVNode("span", { class: "px-3 py-1.5 rounded-lg text-[10px] font-bold border border-border bg-background peer-checked:bg-primary peer-checked:text-primary-foreground transition-all" }, toDisplayString(ram), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h4", { class: "text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary" }, [
                    createVNode(unref(HardDrive), { class: "w-4 h-4" }),
                    createTextVNode(" Penyimpanan ")
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(globalFilters).storages, (storage) => {
                      return openBlock(), createBlock("label", {
                        key: storage,
                        class: "cursor-pointer group relative"
                      }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => filterParams.value.storage = $event,
                          value: storage,
                          class: "peer sr-only"
                        }, null, 8, ["onUpdate:modelValue", "value"]), [
                          [vModelRadio, filterParams.value.storage]
                        ]),
                        createVNode("span", { class: "px-3 py-1.5 rounded-lg text-[10px] font-bold border border-border bg-background peer-checked:bg-primary peer-checked:text-primary-foreground transition-all" }, toDisplayString(storage), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "mb-8" }, [
                  createVNode("h4", { class: "text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary" }, [
                    createVNode(unref(ArrowUpDown), { class: "w-4 h-4" }),
                    createTextVNode(" Urutkan ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                    createVNode("label", { class: "cursor-pointer group relative" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => filterParams.value.sort = $event,
                        value: "latest",
                        class: "peer sr-only"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, filterParams.value.sort]
                      ]),
                      createVNode("div", { class: "px-3 py-2.5 rounded-xl border border-border text-center text-[10px] font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground" }, " Terbaru ")
                    ]),
                    createVNode("label", { class: "cursor-pointer group relative" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => filterParams.value.sort = $event,
                        value: "oldest",
                        class: "peer sr-only"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, filterParams.value.sort]
                      ]),
                      createVNode("div", { class: "px-3 py-2.5 rounded-xl border border-border text-center text-[10px] font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground" }, " Terlama ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex items-center justify-end gap-3 pt-6 border-t border-border" }, [
                  createVNode("button", {
                    onClick: resetFilters,
                    class: "text-xs text-red-500 hover:text-red-600 font-bold px-4 transition-colors"
                  }, " Reset "),
                  createVNode("button", {
                    onClick: applyFilters,
                    class: "px-8 py-2 text-sm font-black text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                  }, " Terapkan ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.$slots.header) {
        _push(`<header class="bg-card border-b border-border shadow-sm"><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AppLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
