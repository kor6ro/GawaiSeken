import { computed, unref, mergeProps, withCtx, renderSlot, useSSRContext, ref, onMounted, onUnmounted, watch, onBeforeUnmount, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, Fragment, renderList, withDirectives, vModelRadio } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { Link, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./ApplicationLogo-5BXBKbkR.js";
import { Home, LayoutDashboard, MessageSquare, ShoppingCart, Search, SlidersHorizontal, Sun, Moon, User, Store, LogOut, ChevronDown, Menu, X, Settings, Cpu, HardDrive, ArrowUpDown } from "lucide-vue-next";
import debounce from "lodash/debounce.js";
import { _ as _sfc_main$5 } from "./Modal-C0YBTj_6.js";
import pickBy from "lodash/pickBy.js";
import { a as initTheme, s as setupOnlinePresence, i as isDark } from "./themeState-CpsLRyLx.js";
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
      _push(ssrRenderComponent(unref(Link), mergeProps({ href: __props.href }, _ctx.$attrs, { class: classes.value }, _attrs), {
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
      _push(`</div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}"></div><div class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md border border-border shadow-lg"])}" style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
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
      _push(ssrRenderComponent(unref(Link), mergeProps({ href: __props.href }, _ctx.$attrs, { class: "block w-full px-4 py-2 text-start text-sm leading-5 text-muted-foreground transition duration-150 ease-in-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:outline-none" }, _attrs), {
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
    const page = usePage();
    const { props: pageProps } = page;
    const auth = pageProps.auth;
    const globalFilters = pageProps.global_filters;
    const initialFilters = pageProps.active_filters;
    const toastVisible = ref(false);
    const toastText = ref("");
    const toastType = ref("success");
    let toastTimer = null;
    const flashText = computed(
      () => {
        var _a, _b, _c, _d;
        return ((_a = page.props.flash) == null ? void 0 : _a.status) || ((_b = page.props.flash) == null ? void 0 : _b.success) || ((_c = page.props.flash) == null ? void 0 : _c.message) || ((_d = page.props.flash) == null ? void 0 : _d.error) || "";
      }
    );
    const flashType = computed(() => {
      var _a;
      return ((_a = page.props.flash) == null ? void 0 : _a.error) ? "error" : "success";
    });
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
    onMounted(() => {
      initTheme();
      const checkEcho = setInterval(() => {
        if (window.Echo) {
          clearInterval(checkEcho);
          setupOnlinePresence();
        }
      }, 100);
      setTimeout(() => clearInterval(checkEcho), 5e3);
    });
    watch(
      flashText,
      (message) => {
        if (!message) return;
        toastText.value = message;
        toastType.value = flashType.value;
        toastVisible.value = true;
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toastVisible.value = false;
        }, 2800);
      },
      { immediate: true }
    );
    onBeforeUnmount(() => {
      if (toastTimer) clearTimeout(toastTimer);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground transition-colors duration-100" }, _attrs))}>`);
      if (toastVisible.value) {
        _push(`<div class="${ssrRenderClass([
          toastType.value === "error" ? "border border-red-200 bg-red-50 text-red-700" : "border border-emerald-200 bg-emerald-50 text-emerald-700",
          "fixed right-4 top-20 z-[70] rounded-xl px-4 py-2.5 text-xs font-bold shadow-xl sm:right-6"
        ])}">${ssrInterpolate(toastText.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<nav class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur transition-colors duration-100 supports-[backdrop-filter]:bg-background/60"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex items-center"><div class="mr-6 flex shrink-0 items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, { class: "h-auto w-28" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, { class: "h-auto w-28" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden h-8 items-center gap-1 border-l border-border/50 pl-4 sm:flex">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: [[
          _ctx.route().current("home") ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-accent hover:text-foreground"
        ], "group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"],
        title: "Home"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Home), { class: "h-5 w-5 transition-transform group-hover:scale-110" }, null, _parent2, _scopeId));
            _push2(`<span class="hidden text-sm font-bold md:block"${_scopeId}>Beranda</span>`);
          } else {
            return [
              createVNode(unref(Home), { class: "h-5 w-5 transition-transform group-hover:scale-110" }),
              createVNode("span", { class: "hidden text-sm font-bold md:block" }, "Beranda")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth).user) {
        _push(`<!--[-->`);
        if (unref(auth).user.role === "admin") {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.dashboard"),
            class: [[
              _ctx.route().current("admin.*") ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            ], "group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"],
            title: "Admin Panel"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "h-5 w-5 transition-transform group-hover:scale-110" }, null, _parent2, _scopeId));
                _push2(`<span class="hidden text-sm font-bold md:block"${_scopeId}>Admin</span>`);
              } else {
                return [
                  createVNode(unref(LayoutDashboard), { class: "h-5 w-5 transition-transform group-hover:scale-110" }),
                  createVNode("span", { class: "hidden text-sm font-bold md:block" }, "Admin")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(auth).user.role === "seller") {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            class: [[
              _ctx.route().current("dashboard") ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            ], "group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"],
            title: "Dashboard"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "h-5 w-5 transition-transform group-hover:scale-110" }, null, _parent2, _scopeId));
                _push2(`<span class="hidden text-sm font-bold md:block"${_scopeId}>Dashboard</span>`);
              } else {
                return [
                  createVNode(unref(LayoutDashboard), { class: "h-5 w-5 transition-transform group-hover:scale-110" }),
                  createVNode("span", { class: "hidden text-sm font-bold md:block" }, "Dashboard")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(auth).user.role !== "admin") {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("chat.index"),
            class: [[
              _ctx.route().current("chat.*") ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            ], "group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"],
            title: "Pesan"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(MessageSquare), { class: "h-5 w-5 transition-transform group-hover:scale-110" }, null, _parent2, _scopeId));
                _push2(`<span class="hidden text-sm font-bold md:block"${_scopeId}>Pesan</span>`);
                if (unref(auth).user.unread_messages_count > 0) {
                  _push2(`<span class="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background"${_scopeId}>${ssrInterpolate(unref(auth).user.unread_messages_count > 9 ? "9+" : unref(auth).user.unread_messages_count)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createVNode(unref(MessageSquare), { class: "h-5 w-5 transition-transform group-hover:scale-110" }),
                  createVNode("span", { class: "hidden text-sm font-bold md:block" }, "Pesan"),
                  unref(auth).user.unread_messages_count > 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background"
                  }, toDisplayString(unref(auth).user.unread_messages_count > 9 ? "9+" : unref(auth).user.unread_messages_count), 1)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(auth).user.role !== "admin") {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("buyer.dashboard"),
            class: [[
              _ctx.route().current("buyer.dashboard") ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            ], "group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"],
            title: "Aktivitas Saya"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a2, _b2;
              if (_push2) {
                _push2(ssrRenderComponent(unref(ShoppingCart), { class: "h-5 w-5 transition-transform group-hover:scale-110" }, null, _parent2, _scopeId));
                _push2(`<span class="hidden text-sm font-bold md:block"${_scopeId}>Aktivitas</span>`);
                if (((_a2 = unref(auth).user.favorites) == null ? void 0 : _a2.length) > 0) {
                  _push2(`<span class="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-primary shadow-sm"${_scopeId}></span>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createVNode(unref(ShoppingCart), { class: "h-5 w-5 transition-transform group-hover:scale-110" }),
                  createVNode("span", { class: "hidden text-sm font-bold md:block" }, "Aktivitas"),
                  ((_b2 = unref(auth).user.favorites) == null ? void 0 : _b2.length) > 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-primary shadow-sm"
                  })) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="hidden gap-1 sm:flex sm:items-center">`);
      if (_ctx.$page.component === "Home") {
        _push(`<div class="mr-2 flex items-center gap-2"><div class="group relative"><div class="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 transition-colors">`);
        _push(ssrRenderComponent(unref(Search), { class: "h-4 w-4 text-muted-foreground group-focus-within:text-primary" }, null, _parent));
        _push(`</div><input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari gadget..." class="w-40 rounded-xl border-transparent bg-muted/60 py-1.5 pl-9 pr-4 text-sm transition-all duration-100 placeholder:text-muted-foreground/70 focus:border-border focus:bg-background focus:ring-2 focus:ring-primary/20 lg:w-56"></div><button class="group relative rounded-xl bg-muted/60 p-2 text-muted-foreground transition-all hover:bg-accent hover:text-primary" title="Filter Pencarian">`);
        _push(ssrRenderComponent(unref(SlidersHorizontal), { class: "h-4 w-4" }, null, _parent));
        if (hasActiveFilters()) {
          _push(`<span class="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-background bg-primary"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mr-2 flex items-center gap-1 border-r border-border/50 px-2"><button type="button" class="rounded-xl p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground focus:outline-none">`);
      if (unref(isDark)) {
        _push(ssrRenderComponent(unref(Sun), { class: "h-5 w-5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Moon), { class: "h-5 w-5" }, null, _parent));
      }
      _push(`</button></div>`);
      if (unref(auth).user) {
        _push(`<div class="relative">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          align: "right",
          width: "48"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b2, _c2, _d, _e, _f;
            if (_push2) {
              _push2(`<button type="button" class="group inline-flex items-center gap-2.5 rounded-2xl border border-border/40 bg-muted/20 px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:border-primary/30 hover:bg-muted/40 focus:outline-none"${_scopeId}><div class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/10 text-xs font-bold uppercase text-primary shadow-sm"${_scopeId}>`);
              if (unref(auth).user.role === "seller" && ((_a2 = unref(auth).user.profile) == null ? void 0 : _a2.store_logo)) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${unref(auth).user.profile.store_logo}`)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"${_scopeId}>`);
              } else if ((_b2 = unref(auth).user.profile) == null ? void 0 : _b2.avatar) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${unref(auth).user.profile.avatar}`)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"${_scopeId}>`);
              } else {
                _push2(`<!--[-->${ssrInterpolate(unref(auth).user.name.charAt(0))}<!--]-->`);
              }
              _push2(`</div><div class="hidden text-left lg:block"${_scopeId}><div class="max-w-[110px] truncate text-[12px] font-bold text-foreground leading-tight"${_scopeId}>${ssrInterpolate(unref(auth).user.role === "seller" ? ((_c2 = unref(auth).user.profile) == null ? void 0 : _c2.store_name) || unref(auth).user.name : unref(auth).user.name)}</div><div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-0.5 opacity-60"${_scopeId}>${ssrInterpolate(unref(auth).user.role)}</div></div>`);
              _push2(ssrRenderComponent(unref(ChevronDown), { class: "h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-300 group-hover:rotate-180" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                createVNode("button", {
                  type: "button",
                  class: "group inline-flex items-center gap-2.5 rounded-2xl border border-border/40 bg-muted/20 px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:border-primary/30 hover:bg-muted/40 focus:outline-none"
                }, [
                  createVNode("div", { class: "flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/10 text-xs font-bold uppercase text-primary shadow-sm" }, [
                    unref(auth).user.role === "seller" && ((_d = unref(auth).user.profile) == null ? void 0 : _d.store_logo) ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: `/storage/${unref(auth).user.profile.store_logo}`,
                      class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    }, null, 8, ["src"])) : ((_e = unref(auth).user.profile) == null ? void 0 : _e.avatar) ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: `/storage/${unref(auth).user.profile.avatar}`,
                      class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    }, null, 8, ["src"])) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createTextVNode(toDisplayString(unref(auth).user.name.charAt(0)), 1)
                    ], 64))
                  ]),
                  createVNode("div", { class: "hidden text-left lg:block" }, [
                    createVNode("div", { class: "max-w-[110px] truncate text-[12px] font-bold text-foreground leading-tight" }, toDisplayString(unref(auth).user.role === "seller" ? ((_f = unref(auth).user.profile) == null ? void 0 : _f.store_name) || unref(auth).user.name : unref(auth).user.name), 1),
                    createVNode("div", { class: "text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-0.5 opacity-60" }, toDisplayString(unref(auth).user.role), 1)
                  ]),
                  createVNode(unref(ChevronDown), { class: "h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-300 group-hover:rotate-180" })
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-4 py-2.5 border-b border-border/50 bg-muted/5"${_scopeId}><p class="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60"${_scopeId}>Email</p><p class="truncate text-xs font-bold text-foreground mt-0.5"${_scopeId}>${ssrInterpolate(unref(auth).user.email)}</p></div><div class="p-1"${_scopeId}>`);
              if (unref(auth).user.role === "admin") {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  href: _ctx.route("admin.dashboard")
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(LayoutDashboard), { class: "mr-2 inline h-3.5 w-3.5 text-primary" }, null, _parent3, _scopeId2));
                      _push3(` Admin Panel `);
                    } else {
                      return [
                        createVNode(unref(LayoutDashboard), { class: "mr-2 inline h-3.5 w-3.5 text-primary" }),
                        createTextVNode(" Admin Panel ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$1, {
                href: _ctx.route("profile.edit")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(User), { class: "mr-2 inline h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                    _push3(` Profil Saya `);
                  } else {
                    return [
                      createVNode(unref(User), { class: "mr-2 inline h-3.5 w-3.5" }),
                      createTextVNode(" Profil Saya ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(auth).user.role === "buyer") {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  href: _ctx.route("seller.verification.create"),
                  class: "text-primary font-bold"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Store), { class: "mr-2 inline h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                      _push3(` Jadi Penjual `);
                    } else {
                      return [
                        createVNode(unref(Store), { class: "mr-2 inline h-3.5 w-3.5" }),
                        createTextVNode(" Jadi Penjual ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="border-t border-border/40 p-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                href: _ctx.route("logout"),
                method: "post",
                as: "button",
                class: "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(LogOut), { class: "mr-2 inline h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                    _push3(` Log Out `);
                  } else {
                    return [
                      createVNode(unref(LogOut), { class: "mr-2 inline h-3.5 w-3.5" }),
                      createTextVNode(" Log Out ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "px-4 py-2.5 border-b border-border/50 bg-muted/5" }, [
                  createVNode("p", { class: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60" }, "Email"),
                  createVNode("p", { class: "truncate text-xs font-bold text-foreground mt-0.5" }, toDisplayString(unref(auth).user.email), 1)
                ]),
                createVNode("div", { class: "p-1" }, [
                  unref(auth).user.role === "admin" ? (openBlock(), createBlock(_sfc_main$1, {
                    key: 0,
                    href: _ctx.route("admin.dashboard")
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(LayoutDashboard), { class: "mr-2 inline h-3.5 w-3.5 text-primary" }),
                      createTextVNode(" Admin Panel ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("profile.edit")
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(User), { class: "mr-2 inline h-3.5 w-3.5" }),
                      createTextVNode(" Profil Saya ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  unref(auth).user.role === "buyer" ? (openBlock(), createBlock(_sfc_main$1, {
                    key: 1,
                    href: _ctx.route("seller.verification.create"),
                    class: "text-primary font-bold"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Store), { class: "mr-2 inline h-3.5 w-3.5" }),
                      createTextVNode(" Jadi Penjual ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "border-t border-border/40 p-1" }, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("logout"),
                    method: "post",
                    as: "button",
                    class: "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(LogOut), { class: "mr-2 inline h-3.5 w-3.5" }),
                      createTextVNode(" Log Out ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
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
          class: "px-3 text-xs font-bold text-foreground transition hover:text-primary"
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
          class: "inline-flex items-center rounded-xl border border-transparent bg-primary px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-sm transition duration-150 hover:bg-primary/90"
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
      _push(`</div><div class="-me-2 flex items-center gap-1 sm:hidden"><button type="button" class="rounded-lg p-2.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring">`);
      if (unref(isDark)) {
        _push(ssrRenderComponent(unref(Sun), { class: "h-5 w-5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Moon), { class: "h-5 w-5" }, null, _parent));
      }
      _push(`</button>`);
      if (unref(auth).user && unref(auth).user.role !== "admin") {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("chat.index"),
          class: "group relative rounded-lg p-2.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(MessageSquare), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              if (unref(auth).user.unread_messages_count > 0) {
                _push2(`<span class="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-background"${_scopeId}>${ssrInterpolate(unref(auth).user.unread_messages_count > 9 ? "9+" : unref(auth).user.unread_messages_count)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(unref(MessageSquare), { class: "h-5 w-5" }),
                unref(auth).user.unread_messages_count > 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-background"
                }, toDisplayString(unref(auth).user.unread_messages_count > 9 ? "9+" : unref(auth).user.unread_messages_count), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition duration-150 ease-in-out hover:bg-accent hover:text-foreground focus:outline-none">`);
      if (!showingNavigationDropdown.value) {
        _push(ssrRenderComponent(unref(Menu), { class: "h-6 w-6" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(X), { class: "h-6 w-6" }, null, _parent));
      }
      _push(`</button></div></div>`);
      if (_ctx.$page.component === "Home") {
        _push(`<div class="pb-3 pt-2 sm:hidden"><div class="flex gap-2"><div class="group relative flex-1"><div class="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 transition-colors">`);
        _push(ssrRenderComponent(unref(Search), { class: "h-4 w-4 text-muted-foreground group-focus-within:text-primary" }, null, _parent));
        _push(`</div><input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari gadget..." class="w-full rounded-xl border-transparent bg-muted/60 py-2 pl-10 pr-4 text-sm transition-all duration-100 placeholder:text-muted-foreground/70 focus:border-border focus:bg-background focus:ring-2 focus:ring-primary/20"></div><button class="group relative rounded-xl bg-muted/60 p-2 text-muted-foreground transition-all hover:bg-accent hover:text-primary" title="Filter Pencarian">`);
        _push(ssrRenderComponent(unref(SlidersHorizontal), { class: "h-5 w-5" }, null, _parent));
        if (hasActiveFilters()) {
          _push(`<span class="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-background bg-primary"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([{ block: showingNavigationDropdown.value, hidden: !showingNavigationDropdown.value }, "border-t border-border bg-background shadow-2xl sm:hidden"])}">`);
      if (unref(auth).user) {
        _push(`<div class="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background p-6"><div class="relative z-10 flex items-center gap-4"><div class="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/20 bg-muted shadow-lg">`);
        if (unref(auth).user.role === "seller" && ((_a = unref(auth).user.profile) == null ? void 0 : _a.store_logo)) {
          _push(`<img${ssrRenderAttr("src", `/storage/${unref(auth).user.profile.store_logo}`)} class="h-full w-full object-cover">`);
        } else if ((_b = unref(auth).user.profile) == null ? void 0 : _b.avatar) {
          _push(`<img${ssrRenderAttr("src", `/storage/${unref(auth).user.profile.avatar}`)} class="h-full w-full object-cover">`);
        } else {
          _push(`<div class="flex h-full w-full items-center justify-center text-xl font-black text-primary/40">${ssrInterpolate(unref(auth).user.name.charAt(0))}</div>`);
        }
        _push(`</div><div class="flex-1 overflow-hidden"><div class="flex items-center gap-2"><h3 class="truncate text-lg font-black text-foreground tracking-tight">${ssrInterpolate(unref(auth).user.role === "seller" ? ((_c = unref(auth).user.profile) == null ? void 0 : _c.store_name) || unref(auth).user.name : unref(auth).user.name)}</h3><span class="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-primary-foreground shadow-sm">${ssrInterpolate(unref(auth).user.role)}</span></div><p class="truncate text-xs font-medium text-muted-foreground mt-0.5">${ssrInterpolate(unref(auth).user.email)}</p></div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.edit"),
          class: "rounded-xl bg-card border border-border p-2 text-muted-foreground shadow-sm transition hover:bg-accent hover:text-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Settings), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Settings), { class: "h-5 w-5" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pb-6 pt-2"><div class="space-y-1 px-3">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        href: _ctx.route("home"),
        active: _ctx.route().current("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Home), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Home</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(unref(Home), { class: "h-5 w-5" }),
                createTextVNode(" Home")
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
                _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                _push2(` Seller Dashboard </div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(LayoutDashboard), { class: "h-5 w-5" }),
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
        _push(`<div class="my-3 border-t border-border/50 mx-4"></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          href: _ctx.route("buyer.dashboard"),
          active: _ctx.route().current("buyer.dashboard")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShoppingCart), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(` Aktivitas Saya </div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(unref(ShoppingCart), { class: "h-5 w-5" }),
                  createTextVNode(" Aktivitas Saya ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(auth).user.role === "buyer") {
          _push(ssrRenderComponent(_sfc_main$3, {
            href: _ctx.route("seller.verification.create"),
            class: "mt-4"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center gap-3 font-bold text-primary"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Store), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                _push2(` Jadi Penjual </div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center gap-3 font-bold text-primary" }, [
                    createVNode(unref(Store), { class: "h-5 w-5" }),
                    createTextVNode(" Jadi Penjual ")
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="my-3 border-t border-border/50 mx-4"></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          href: _ctx.route("logout"),
          method: "post",
          as: "button",
          class: "font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(LogOut), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(` Log Out</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(unref(LogOut), { class: "h-5 w-5" }),
                  createTextVNode(" Log Out")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<div class="space-y-3 p-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "block w-full rounded-2xl border border-border bg-card py-3 text-center text-sm font-bold text-foreground shadow-sm transition hover:bg-accent"
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
          class: "block w-full rounded-2xl bg-primary py-3 text-center text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
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
      _push(`</div></div></div></nav>`);
      _push(ssrRenderComponent(_sfc_main$5, {
        show: filterModalOpen.value,
        onClose: ($event) => filterModalOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-background p-6 text-foreground transition-colors duration-100"${_scopeId}><div class="mb-6 flex items-center justify-between border-b border-border pb-4"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>Filter Pencarian</h2><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Sesuaikan hasil sesuai kebutuhan Anda</p></div><button class="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-accent"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(`</button></div><div class="mb-6"${_scopeId}><h4 class="mb-3 text-sm font-bold uppercase tracking-wider"${_scopeId}>Kategori</h4><div class="grid grid-cols-2 gap-3 sm:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(unref(globalFilters).categories, (cat) => {
              _push2(`<label class="group relative cursor-pointer"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.category, cat.slug)) ? " checked" : ""}${ssrRenderAttr("value", cat.slug)} class="peer sr-only"${_scopeId}><div class="rounded-xl border border-border px-3 py-2.5 text-center text-xs font-bold transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"${_scopeId}>${ssrInterpolate(cat.name)}</div></label>`);
            });
            _push2(`<!--]--><label class="group relative cursor-pointer"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.category, "")) ? " checked" : ""} value="" class="peer sr-only"${_scopeId}><div class="rounded-xl border border-border px-3 py-2.5 text-center text-xs font-bold transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"${_scopeId}> Semua </div></label></div></div><div class="mb-6"${_scopeId}><h4 class="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Cpu), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` RAM </h4><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(globalFilters).rams, (ram) => {
              _push2(`<label class="group relative cursor-pointer"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.ram, ram)) ? " checked" : ""}${ssrRenderAttr("value", ram)} class="peer sr-only"${_scopeId}><span class="rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground"${_scopeId}>${ssrInterpolate(ram)}</span></label>`);
            });
            _push2(`<!--]--></div></div><div class="mb-6"${_scopeId}><h4 class="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(HardDrive), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Penyimpanan </h4><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(globalFilters).storages, (storage) => {
              _push2(`<label class="group relative cursor-pointer"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.storage, storage)) ? " checked" : ""}${ssrRenderAttr("value", storage)} class="peer sr-only"${_scopeId}><span class="rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground"${_scopeId}>${ssrInterpolate(storage)}</span></label>`);
            });
            _push2(`<!--]--></div></div><div class="mb-8"${_scopeId}><h4 class="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ArrowUpDown), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Urutkan </h4><div class="grid grid-cols-2 gap-3"${_scopeId}><label class="group relative cursor-pointer"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.sort, "latest")) ? " checked" : ""} value="latest" class="peer sr-only"${_scopeId}><div class="rounded-xl border border-border px-3 py-2.5 text-center text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground"${_scopeId}> Terbaru </div></label><label class="group relative cursor-pointer"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(filterParams.value.sort, "oldest")) ? " checked" : ""} value="oldest" class="peer sr-only"${_scopeId}><div class="rounded-xl border border-border px-3 py-2.5 text-center text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground"${_scopeId}> Terlama </div></label></div></div><div class="flex items-center justify-end gap-3 border-t border-border pt-6"${_scopeId}><button class="px-4 text-xs font-bold text-red-500 transition-colors hover:text-red-600"${_scopeId}> Reset </button><button class="rounded-xl bg-primary px-8 py-2 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"${_scopeId}> Terapkan </button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-background p-6 text-foreground transition-colors duration-100" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between border-b border-border pb-4" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-bold" }, "Filter Pencarian"),
                    createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Sesuaikan hasil sesuai kebutuhan Anda")
                  ]),
                  createVNode("button", {
                    onClick: ($event) => filterModalOpen.value = false,
                    class: "rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-accent"
                  }, [
                    createVNode(unref(X), { class: "h-5 w-5" })
                  ], 8, ["onClick"])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h4", { class: "mb-3 text-sm font-bold uppercase tracking-wider" }, "Kategori"),
                  createVNode("div", { class: "grid grid-cols-2 gap-3 sm:grid-cols-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(globalFilters).categories, (cat) => {
                      return openBlock(), createBlock("label", {
                        key: cat.id,
                        class: "group relative cursor-pointer"
                      }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => filterParams.value.category = $event,
                          value: cat.slug,
                          class: "peer sr-only"
                        }, null, 8, ["onUpdate:modelValue", "value"]), [
                          [vModelRadio, filterParams.value.category]
                        ]),
                        createVNode("div", { class: "rounded-xl border border-border px-3 py-2.5 text-center text-xs font-bold transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground" }, toDisplayString(cat.name), 1)
                      ]);
                    }), 128)),
                    createVNode("label", { class: "group relative cursor-pointer" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => filterParams.value.category = $event,
                        value: "",
                        class: "peer sr-only"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, filterParams.value.category]
                      ]),
                      createVNode("div", { class: "rounded-xl border border-border px-3 py-2.5 text-center text-xs font-bold transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground" }, " Semua ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h4", { class: "mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary" }, [
                    createVNode(unref(Cpu), { class: "h-4 w-4" }),
                    createTextVNode(" RAM ")
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(globalFilters).rams, (ram) => {
                      return openBlock(), createBlock("label", {
                        key: ram,
                        class: "group relative cursor-pointer"
                      }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => filterParams.value.ram = $event,
                          value: ram,
                          class: "peer sr-only"
                        }, null, 8, ["onUpdate:modelValue", "value"]), [
                          [vModelRadio, filterParams.value.ram]
                        ]),
                        createVNode("span", { class: "rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground" }, toDisplayString(ram), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h4", { class: "mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary" }, [
                    createVNode(unref(HardDrive), { class: "h-4 w-4" }),
                    createTextVNode(" Penyimpanan ")
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(globalFilters).storages, (storage) => {
                      return openBlock(), createBlock("label", {
                        key: storage,
                        class: "group relative cursor-pointer"
                      }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => filterParams.value.storage = $event,
                          value: storage,
                          class: "peer sr-only"
                        }, null, 8, ["onUpdate:modelValue", "value"]), [
                          [vModelRadio, filterParams.value.storage]
                        ]),
                        createVNode("span", { class: "rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground" }, toDisplayString(storage), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "mb-8" }, [
                  createVNode("h4", { class: "mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary" }, [
                    createVNode(unref(ArrowUpDown), { class: "h-4 w-4" }),
                    createTextVNode(" Urutkan ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                    createVNode("label", { class: "group relative cursor-pointer" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => filterParams.value.sort = $event,
                        value: "latest",
                        class: "peer sr-only"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, filterParams.value.sort]
                      ]),
                      createVNode("div", { class: "rounded-xl border border-border px-3 py-2.5 text-center text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground" }, " Terbaru ")
                    ]),
                    createVNode("label", { class: "group relative cursor-pointer" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => filterParams.value.sort = $event,
                        value: "oldest",
                        class: "peer sr-only"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, filterParams.value.sort]
                      ]),
                      createVNode("div", { class: "rounded-xl border border-border px-3 py-2.5 text-center text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground" }, " Terlama ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex items-center justify-end gap-3 border-t border-border pt-6" }, [
                  createVNode("button", {
                    onClick: resetFilters,
                    class: "px-4 text-xs font-bold text-red-500 transition-colors hover:text-red-600"
                  }, " Reset "),
                  createVNode("button", {
                    onClick: applyFilters,
                    class: "rounded-xl bg-primary px-8 py-2 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
                  }, " Terapkan ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.$slots.header) {
        _push(`<header class="border-b border-border bg-card shadow-sm"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="mt-20 border-t border-border bg-card py-12 shadow-sm"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex flex-col items-center justify-between gap-6 md:flex-row"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$4, { class: "h-8 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" }, null, _parent));
      _push(`<div class="h-6 w-px bg-border"></div><p class="text-xs font-bold tracking-widest uppercase text-muted-foreground">© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} GawaiSeken.</p></div><div class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-black uppercase tracking-widest text-muted-foreground">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("about"),
        class: "hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Tentang Kami`);
          } else {
            return [
              createTextVNode("Tentang Kami")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("contact"),
        class: "hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Hubungi Kami`);
          } else {
            return [
              createTextVNode("Hubungi Kami")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("privacy"),
        class: "hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kebijakan Privasi`);
          } else {
            return [
              createTextVNode("Kebijakan Privasi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("terms"),
        class: "hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Syarat &amp; Ketentuan`);
          } else {
            return [
              createTextVNode("Syarat & Ketentuan")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></footer></div>`);
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
