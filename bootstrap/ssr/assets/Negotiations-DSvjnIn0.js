import { ref, unref, withCtx, createVNode, createTextVNode, resolveDynamicComponent, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, Transition, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { LayoutDashboard, ShoppingBag, Tag, Settings, Clock, Package, ChevronUp, ChevronDown, CheckCircle2, XCircle } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./Pagination-brVOzIHZ.js";
import { _ as _sfc_main$3 } from "./BackButton-DqmVU1VH.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Negotiations",
  __ssrInlineRender: true,
  props: { negotiations: Object },
  setup(__props) {
    const expandedItems = ref({});
    const toggleExpand = (id) => {
      expandedItems.value[id] = !expandedItems.value[id];
    };
    const counterForms = ref({});
    const getCounterForm = (id) => {
      if (!counterForms.value[id]) {
        counterForms.value[id] = { counter_price: "", seller_message: "" };
      }
      return counterForms.value[id];
    };
    const acceptNegotiation = (id) => {
      if (confirm("Terima penawaran harga dari buyer?"))
        router.post(route("negotiations.accept", id));
    };
    const rejectNegotiation = (id, message) => {
      if (confirm("Tolak penawaran ini?"))
        router.post(route("negotiations.reject", id), { seller_message: message });
    };
    const counterNegotiation = (id, form) => {
      if (!form.counter_price) return alert("Masukkan harga counter terlebih dahulu.");
      router.post(route("negotiations.counter", id), form);
    };
    const formatRp = (v) => "Rp " + new Intl.NumberFormat("id-ID").format(v);
    const formatDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-";
    const expiresIn = (d) => {
      const diff = new Date(d) - /* @__PURE__ */ new Date();
      if (diff <= 0) return "Kadaluarsa";
      const hours = Math.floor(diff / 1e3 / 3600);
      const mins = Math.floor(diff / 1e3 % 3600 / 60);
      return `${hours}j ${mins}m lagi`;
    };
    const statusConfig = {
      pending: { label: "Menunggu Respons", color: "amber" },
      accepted: { label: "Diterima ✓", color: "green" },
      rejected: { label: "Ditolak", color: "red" },
      countered: { label: "Counter-Offer Dikirim", color: "indigo" },
      expired: { label: "Kadaluarsa", color: "slate" }
    };
    const badgeClass = (status) => {
      var _a;
      const colorMap = {
        amber: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
        green: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400",
        red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400",
        indigo: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400",
        slate: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400"
      };
      return colorMap[(_a = statusConfig[status]) == null ? void 0 : _a.color] ?? colorMap.slate;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Penawaran Masuk" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { fallbackRoute: "dashboard" }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Penawaran Masuk (NEGO)</h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(_sfc_main$3, { fallbackRoute: "dashboard" }),
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Penawaran Masuk (NEGO)")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"${_scopeId}><div class="mx-auto flex max-w-2xl space-x-1 rounded-xl bg-muted p-1 sm:mx-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("dashboard", { tab: "overview" }),
              class: "text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(LayoutDashboard), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Ringkasan `);
                } else {
                  return [
                    createVNode(unref(LayoutDashboard), { class: "h-4 w-4" }),
                    createTextVNode(" Ringkasan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("dashboard", { tab: "transactions" }),
              class: "text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ShoppingBag), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Pesanan `);
                } else {
                  return [
                    createVNode(unref(ShoppingBag), { class: "h-4 w-4" }),
                    createTextVNode(" Pesanan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="bg-background text-foreground shadow-sm flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Tag), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Penawaran </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("dashboard", { tab: "settings" }),
              class: "text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Settings), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Pengaturan `);
                } else {
                  return [
                    createVNode(unref(Settings), { class: "h-4 w-4" }),
                    createTextVNode(" Pengaturan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mb-8 flex items-center gap-4"${_scopeId}><div class="rounded-2xl bg-primary/10 p-3 text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Tag), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Penawaran Harga dari Buyer</h3><p class="text-sm text-muted-foreground"${_scopeId}>Terima, counter, atau tolak penawaran yang masuk.</p></div></div>`);
            if (__props.negotiations.data.length === 0) {
              _push2(`<div class="flex flex-col items-center py-24 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Tag), { class: "mb-4 h-16 w-16 text-muted-foreground/25" }, null, _parent2, _scopeId));
              _push2(`<h4 class="text-lg font-bold text-muted-foreground"${_scopeId}>Belum ada penawaran masuk</h4><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Aktifkan opsi NEGO di produk Anda agar buyer bisa menawar.</p></div>`);
            } else {
              _push2(`<div class="space-y-5"${_scopeId}><!--[-->`);
              ssrRenderList(__props.negotiations.data, (nego) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
                _push2(`<div class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="h-8 w-8 overflow-hidden rounded-full border border-border bg-muted"${_scopeId}>`);
                if ((_b = (_a = nego.buyer) == null ? void 0 : _a.profile) == null ? void 0 : _b.avatar) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${nego.buyer.profile.avatar}`)} class="h-full w-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="flex h-full w-full items-center justify-center text-xs font-bold text-primary"${_scopeId}>${ssrInterpolate((_d = (_c = nego.buyer) == null ? void 0 : _c.name) == null ? void 0 : _d.charAt(0))}</div>`);
                }
                _push2(`</div><div${_scopeId}><p class="text-sm font-bold"${_scopeId}>${ssrInterpolate((_e = nego.buyer) == null ? void 0 : _e.name)}</p><p class="text-[10px] text-muted-foreground"${_scopeId}>${ssrInterpolate(formatDate(nego.created_at))}</p></div></div><div class="flex items-center gap-2"${_scopeId}><span class="${ssrRenderClass([badgeClass(nego.status), "rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider"])}"${_scopeId}>${ssrInterpolate(((_f = statusConfig[nego.status]) == null ? void 0 : _f.label) ?? nego.status)}</span>`);
                if (["pending", "countered"].includes(nego.status)) {
                  _push2(`<span class="flex items-center gap-1 text-[10px] text-muted-foreground"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Clock), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(expiresIn(nego.expires_at))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="p-5"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><div class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted"${_scopeId}>`);
                if ((_h = (_g = nego.product) == null ? void 0 : _g.images) == null ? void 0 : _h.length) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${nego.product.images[0].image_path}`)} class="h-full w-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="flex h-full w-full items-center justify-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Package), { class: "h-6 w-6 text-muted-foreground/30" }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><div${_scopeId}><p class="font-bold truncate max-w-xs"${_scopeId}>${ssrInterpolate((_i = nego.product) == null ? void 0 : _i.title)}</p><div class="mt-1 flex items-center gap-3 text-sm"${_scopeId}><span class="text-muted-foreground line-through"${_scopeId}>${ssrInterpolate(formatRp((_j = nego.product) == null ? void 0 : _j.price))}</span><span class="font-black text-primary"${_scopeId}>${ssrInterpolate(formatRp(nego.proposed_price))}</span><span class="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-900/20 dark:text-red-400"${_scopeId}> -${ssrInterpolate(Math.round((1 - nego.proposed_price / ((_k = nego.product) == null ? void 0 : _k.price)) * 100))}% </span></div></div></div>`);
                if (nego.message) {
                  _push2(`<div class="mb-4 rounded-xl border border-border bg-muted/30 p-3 text-sm italic text-muted-foreground"${_scopeId}> &quot;${ssrInterpolate(nego.message)}&quot; </div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (nego.counter_price) {
                  _push2(`<div class="mb-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 text-sm dark:border-indigo-800 dark:bg-indigo-900/10"${_scopeId}><span class="text-xs font-bold text-indigo-600 dark:text-indigo-400"${_scopeId}>Counter-offer Anda: </span><span class="font-black text-indigo-700 dark:text-indigo-300"${_scopeId}>${ssrInterpolate(formatRp(nego.counter_price))}</span>`);
                  if (nego.seller_message) {
                    _push2(`<p class="mt-1 text-xs italic text-muted-foreground"${_scopeId}>&quot;${ssrInterpolate(nego.seller_message)}&quot;</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (["pending", "countered"].includes(nego.status)) {
                  _push2(`<button class="flex w-full items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors"${_scopeId}>`);
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(expandedItems.value[nego.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-4 w-4" }, null), _parent2, _scopeId);
                  _push2(` ${ssrInterpolate(expandedItems.value[nego.id] ? "Tutup" : "Buka Aksi")}</button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (expandedItems.value[nego.id] && nego.status === "pending") {
                  _push2(`<div class="mt-4 space-y-4 border-t border-border pt-4"${_scopeId}><button class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(` Terima Harga ${ssrInterpolate(formatRp(nego.proposed_price))}</button><div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-800 dark:bg-indigo-900/10"${_scopeId}><p class="mb-3 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400"${_scopeId}>Beri Counter-Offer</p><div class="flex gap-2"${_scopeId}><div class="relative flex-1"${_scopeId}><span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground"${_scopeId}>Rp</span><input${ssrRenderAttr("value", getCounterForm(nego.id).counter_price)} type="number" placeholder="Harga counter..." class="w-full rounded-xl border border-border bg-background pl-8 pr-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"${_scopeId}></div><button class="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"${_scopeId}> Kirim </button></div><input${ssrRenderAttr("value", getCounterForm(nego.id).seller_message)} type="text" placeholder="Pesan untuk buyer (opsional)..." class="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"${_scopeId}></div><button class="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors dark:bg-red-900/10 dark:border-red-800"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(` Tolak Penawaran </button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--><div class="mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                links: __props.negotiations.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mx-auto flex max-w-2xl space-x-1 rounded-xl bg-muted p-1 sm:mx-0" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("dashboard", { tab: "overview" }),
                      class: "text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(LayoutDashboard), { class: "h-4 w-4" }),
                        createTextVNode(" Ringkasan ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("dashboard", { tab: "transactions" }),
                      class: "text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ShoppingBag), { class: "h-4 w-4" }),
                        createTextVNode(" Pesanan ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", { class: "bg-background text-foreground shadow-sm flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm" }, [
                      createVNode(unref(Tag), { class: "h-4 w-4" }),
                      createTextVNode(" Penawaran ")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("dashboard", { tab: "settings" }),
                      class: "text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Settings), { class: "h-4 w-4" }),
                        createTextVNode(" Pengaturan ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "mb-8 flex items-center gap-4" }, [
                    createVNode("div", { class: "rounded-2xl bg-primary/10 p-3 text-primary" }, [
                      createVNode(unref(Tag), { class: "h-6 w-6" })
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-lg font-bold" }, "Penawaran Harga dari Buyer"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Terima, counter, atau tolak penawaran yang masuk.")
                    ])
                  ]),
                  __props.negotiations.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col items-center py-24 text-center"
                  }, [
                    createVNode(unref(Tag), { class: "mb-4 h-16 w-16 text-muted-foreground/25" }),
                    createVNode("h4", { class: "text-lg font-bold text-muted-foreground" }, "Belum ada penawaran masuk"),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Aktifkan opsi NEGO di produk Anda agar buyer bisa menawar.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-5"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.negotiations.data, (nego) => {
                      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
                      return openBlock(), createBlock("div", {
                        key: nego.id,
                        class: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                      }, [
                        createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3" }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "h-8 w-8 overflow-hidden rounded-full border border-border bg-muted" }, [
                              ((_b = (_a = nego.buyer) == null ? void 0 : _a.profile) == null ? void 0 : _b.avatar) ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: `/storage/${nego.buyer.profile.avatar}`,
                                class: "h-full w-full object-cover"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex h-full w-full items-center justify-center text-xs font-bold text-primary"
                              }, toDisplayString((_d = (_c = nego.buyer) == null ? void 0 : _c.name) == null ? void 0 : _d.charAt(0)), 1))
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-bold" }, toDisplayString((_e = nego.buyer) == null ? void 0 : _e.name), 1),
                              createVNode("p", { class: "text-[10px] text-muted-foreground" }, toDisplayString(formatDate(nego.created_at)), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("span", {
                              class: ["rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider", badgeClass(nego.status)]
                            }, toDisplayString(((_f = statusConfig[nego.status]) == null ? void 0 : _f.label) ?? nego.status), 3),
                            ["pending", "countered"].includes(nego.status) ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "flex items-center gap-1 text-[10px] text-muted-foreground"
                            }, [
                              createVNode(unref(Clock), { class: "h-3 w-3" }),
                              createTextVNode(" " + toDisplayString(expiresIn(nego.expires_at)), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "p-5" }, [
                          createVNode("div", { class: "flex items-center gap-3 mb-4" }, [
                            createVNode("div", { class: "h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted" }, [
                              ((_h = (_g = nego.product) == null ? void 0 : _g.images) == null ? void 0 : _h.length) ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: `/storage/${nego.product.images[0].image_path}`,
                                class: "h-full w-full object-cover"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex h-full w-full items-center justify-center"
                              }, [
                                createVNode(unref(Package), { class: "h-6 w-6 text-muted-foreground/30" })
                              ]))
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "font-bold truncate max-w-xs" }, toDisplayString((_i = nego.product) == null ? void 0 : _i.title), 1),
                              createVNode("div", { class: "mt-1 flex items-center gap-3 text-sm" }, [
                                createVNode("span", { class: "text-muted-foreground line-through" }, toDisplayString(formatRp((_j = nego.product) == null ? void 0 : _j.price)), 1),
                                createVNode("span", { class: "font-black text-primary" }, toDisplayString(formatRp(nego.proposed_price)), 1),
                                createVNode("span", { class: "rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-900/20 dark:text-red-400" }, " -" + toDisplayString(Math.round((1 - nego.proposed_price / ((_k = nego.product) == null ? void 0 : _k.price)) * 100)) + "% ", 1)
                              ])
                            ])
                          ]),
                          nego.message ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-4 rounded-xl border border-border bg-muted/30 p-3 text-sm italic text-muted-foreground"
                          }, ' "' + toDisplayString(nego.message) + '" ', 1)) : createCommentVNode("", true),
                          nego.counter_price ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mb-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 text-sm dark:border-indigo-800 dark:bg-indigo-900/10"
                          }, [
                            createVNode("span", { class: "text-xs font-bold text-indigo-600 dark:text-indigo-400" }, "Counter-offer Anda: "),
                            createVNode("span", { class: "font-black text-indigo-700 dark:text-indigo-300" }, toDisplayString(formatRp(nego.counter_price)), 1),
                            nego.seller_message ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-xs italic text-muted-foreground"
                            }, '"' + toDisplayString(nego.seller_message) + '"', 1)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          ["pending", "countered"].includes(nego.status) ? (openBlock(), createBlock("button", {
                            key: 2,
                            onClick: ($event) => toggleExpand(nego.id),
                            class: "flex w-full items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors"
                          }, [
                            (openBlock(), createBlock(resolveDynamicComponent(expandedItems.value[nego.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-4 w-4" })),
                            createTextVNode(" " + toDisplayString(expandedItems.value[nego.id] ? "Tutup" : "Buka Aksi"), 1)
                          ], 8, ["onClick"])) : createCommentVNode("", true),
                          createVNode(Transition, {
                            "enter-from-class": "opacity-0 -translate-y-2",
                            "leave-to-class": "opacity-0 -translate-y-2",
                            "enter-active-class": "transition-all duration-200",
                            "leave-active-class": "transition-all duration-200"
                          }, {
                            default: withCtx(() => [
                              expandedItems.value[nego.id] && nego.status === "pending" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-4 space-y-4 border-t border-border pt-4"
                              }, [
                                createVNode("button", {
                                  onClick: ($event) => acceptNegotiation(nego.id),
                                  class: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors"
                                }, [
                                  createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                                  createTextVNode(" Terima Harga " + toDisplayString(formatRp(nego.proposed_price)), 1)
                                ], 8, ["onClick"]),
                                createVNode("div", { class: "rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-800 dark:bg-indigo-900/10" }, [
                                  createVNode("p", { class: "mb-3 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400" }, "Beri Counter-Offer"),
                                  createVNode("div", { class: "flex gap-2" }, [
                                    createVNode("div", { class: "relative flex-1" }, [
                                      createVNode("span", { class: "absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground" }, "Rp"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => getCounterForm(nego.id).counter_price = $event,
                                        type: "number",
                                        placeholder: "Harga counter...",
                                        class: "w-full rounded-xl border border-border bg-background pl-8 pr-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, getCounterForm(nego.id).counter_price]
                                      ])
                                    ]),
                                    createVNode("button", {
                                      onClick: ($event) => counterNegotiation(nego.id, getCounterForm(nego.id)),
                                      class: "shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
                                    }, " Kirim ", 8, ["onClick"])
                                  ]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => getCounterForm(nego.id).seller_message = $event,
                                    type: "text",
                                    placeholder: "Pesan untuk buyer (opsional)...",
                                    class: "mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, getCounterForm(nego.id).seller_message]
                                  ])
                                ]),
                                createVNode("button", {
                                  onClick: ($event) => rejectNegotiation(nego.id, getCounterForm(nego.id).seller_message),
                                  class: "flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors dark:bg-red-900/10 dark:border-red-800"
                                }, [
                                  createVNode(unref(XCircle), { class: "h-4 w-4" }),
                                  createTextVNode(" Tolak Penawaran ")
                                ], 8, ["onClick"])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]);
                    }), 128)),
                    createVNode("div", { class: "mt-8" }, [
                      createVNode(_sfc_main$2, {
                        links: __props.negotiations.links
                      }, null, 8, ["links"])
                    ])
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Seller/Negotiations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
