import { ref, watch, resolveComponent, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, withDirectives, vModelText, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import { router, useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$5 } from "./SecondaryButton-BWOt3jtr.js";
import { _ as _sfc_main$6 } from "./DangerButton-Dpx20QNz.js";
import "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$7 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./InputError-DDbcJ_iI.js";
import { UserX, ShieldCheck, Search, Mail, MapPin } from "lucide-vue-next";
import debounce from "lodash/debounce.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const searchTerm = ref(props.filters.search || "");
    const filterRole = ref(props.filters.role || "");
    const sortBy = ref(props.filters.sort_by || "id");
    const sortDir = ref(props.filters.sort_dir || "asc");
    const loading = ref(false);
    const headers = [
      { text: "ID", value: "id", sortable: true },
      { text: "Pengguna", value: "name", sortable: true },
      { text: "Kontak & Lokasi", value: "contact" },
      { text: "Role", value: "role", sortable: true },
      { text: "Produk", value: "products_count", sortable: true },
      { text: "Status", value: "is_suspended", sortable: true },
      { text: "Aksi", value: "actions", width: 120 }
    ];
    const performSearch = debounce(() => {
      router.get(route("admin.users.index"), {
        search: searchTerm.value,
        role: filterRole.value,
        sort_by: sortBy.value,
        sort_dir: sortDir.value
      }, {
        preserveState: true,
        replace: true
      });
    }, 300);
    watch([searchTerm, filterRole], () => {
      performSearch();
    });
    const selectedUser = ref(null);
    const isSuspendModalOpen = ref(false);
    const suspendForm = useForm({
      suspension_reason: ""
    });
    const openSuspendModal = (user) => {
      selectedUser.value = user;
      isSuspendModalOpen.value = true;
    };
    const closeSuspendModal = () => {
      isSuspendModalOpen.value = false;
      selectedUser.value = null;
      suspendForm.reset();
    };
    const submitSuspension = () => {
      suspendForm.post(route("admin.users.suspend", selectedUser.value.id), {
        onSuccess: () => closeSuspendModal()
      });
    };
    const unsuspend = (user) => {
      if (confirm(`Apakah Anda yakin ingin mencabut suspensi untuk ${user.name}?`)) {
        router.post(route("admin.users.unsuspend", user.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EasyDataTable = resolveComponent("EasyDataTable");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Pengguna" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-v-f566b932${_scopeId}><h2 class="text-xl font-semibold leading-tight text-foreground" data-v-f566b932${_scopeId}> Manajemen Pengguna </h2><div class="flex flex-wrap items-center gap-3" data-v-f566b932${_scopeId}><div class="relative" data-v-f566b932${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              modelValue: searchTerm.value,
              "onUpdate:modelValue": ($event) => searchTerm.value = $event,
              placeholder: "Cari nama atau email...",
              class: "pl-9 h-10 w-full sm:w-64"
            }, null, _parent2, _scopeId));
            _push2(`</div><select class="h-10 rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary" data-v-f566b932${_scopeId}><option value="" data-v-f566b932${ssrIncludeBooleanAttr(Array.isArray(filterRole.value) ? ssrLooseContain(filterRole.value, "") : ssrLooseEqual(filterRole.value, "")) ? " selected" : ""}${_scopeId}>Semua Role</option><option value="buyer" data-v-f566b932${ssrIncludeBooleanAttr(Array.isArray(filterRole.value) ? ssrLooseContain(filterRole.value, "buyer") : ssrLooseEqual(filterRole.value, "buyer")) ? " selected" : ""}${_scopeId}>Buyer</option><option value="seller" data-v-f566b932${ssrIncludeBooleanAttr(Array.isArray(filterRole.value) ? ssrLooseContain(filterRole.value, "seller") : ssrLooseEqual(filterRole.value, "seller")) ? " selected" : ""}${_scopeId}>Seller</option><option value="admin" data-v-f566b932${ssrIncludeBooleanAttr(Array.isArray(filterRole.value) ? ssrLooseContain(filterRole.value, "admin") : ssrLooseEqual(filterRole.value, "admin")) ? " selected" : ""}${_scopeId}>Admin</option></select></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, [
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, " Manajemen Pengguna "),
                createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    createVNode(_sfc_main$7, {
                      modelValue: searchTerm.value,
                      "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                      placeholder: "Cari nama atau email...",
                      class: "pl-9 h-10 w-full sm:w-64"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => filterRole.value = $event,
                    class: "h-10 rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary"
                  }, [
                    createVNode("option", { value: "" }, "Semua Role"),
                    createVNode("option", { value: "buyer" }, "Buyer"),
                    createVNode("option", { value: "seller" }, "Seller"),
                    createVNode("option", { value: "admin" }, "Admin")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, filterRole.value]
                  ])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12" data-v-f566b932${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8" data-v-f566b932${_scopeId}><div class="overflow-hidden bg-card border border-border shadow sm:rounded-2xl" data-v-f566b932${_scopeId}><div class="p-6" data-v-f566b932${_scopeId}><div class="easy-table-wrapper" data-v-f566b932${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers,
              items: __props.users.data,
              loading: loading.value,
              "hide-footer": "",
              "border-cell": "",
              "buttons-pagination": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-id": withCtx(({ id }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold text-muted-foreground/70" data-v-f566b932${_scopeId2}>#${ssrInterpolate(id)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold text-muted-foreground/70" }, "#" + toDisplayString(id), 1)
                  ];
                }
              }),
              "item-name": withCtx(({ name, email, profile }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3 py-2" data-v-f566b932${_scopeId2}><div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary flex-shrink-0 overflow-hidden border border-border shadow-sm" data-v-f566b932${_scopeId2}>`);
                  if (profile == null ? void 0 : profile.avatar) {
                    _push3(`<img${ssrRenderAttr("src", `/storage/${profile.avatar}`)} class="h-full w-full object-cover" data-v-f566b932${_scopeId2}>`);
                  } else {
                    _push3(`<!--[-->${ssrInterpolate(name.charAt(0))}<!--]-->`);
                  }
                  _push3(`</div><div class="min-w-0" data-v-f566b932${_scopeId2}><p class="font-bold truncate text-foreground" data-v-f566b932${_scopeId2}>${ssrInterpolate(name)}</p><p class="text-[10px] text-muted-foreground/80 truncate" data-v-f566b932${_scopeId2}>${ssrInterpolate(email)}</p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3 py-2" }, [
                      createVNode("div", { class: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary flex-shrink-0 overflow-hidden border border-border shadow-sm" }, [
                        (profile == null ? void 0 : profile.avatar) ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `/storage/${profile.avatar}`,
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode(toDisplayString(name.charAt(0)), 1)
                        ], 64))
                      ]),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("p", { class: "font-bold truncate text-foreground" }, toDisplayString(name), 1),
                        createVNode("p", { class: "text-[10px] text-muted-foreground/80 truncate" }, toDisplayString(email), 1)
                      ])
                    ])
                  ];
                }
              }),
              "item-contact": withCtx(({ email, profile }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-1 text-[10px] py-2 text-muted-foreground" data-v-f566b932${_scopeId2}><span class="flex items-center gap-1.5" data-v-f566b932${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Mail), { class: "h-3 w-3 text-primary/70" }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(email)}</span><span class="flex items-center gap-1.5" data-v-f566b932${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(MapPin), { class: "h-3 w-3 text-primary/70" }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate((profile == null ? void 0 : profile.city) || "Lokasi belum diset")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col gap-1 text-[10px] py-2 text-muted-foreground" }, [
                      createVNode("span", { class: "flex items-center gap-1.5" }, [
                        createVNode(unref(Mail), { class: "h-3 w-3 text-primary/70" }),
                        createTextVNode(" " + toDisplayString(email), 1)
                      ]),
                      createVNode("span", { class: "flex items-center gap-1.5" }, [
                        createVNode(unref(MapPin), { class: "h-3 w-3 text-primary/70" }),
                        createTextVNode(" " + toDisplayString((profile == null ? void 0 : profile.city) || "Lokasi belum diset"), 1)
                      ])
                    ])
                  ];
                }
              }),
              "item-role": withCtx(({ role }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-2" data-v-f566b932${_scopeId2}><span class="text-xs font-black uppercase tracking-widest text-primary" data-v-f566b932${_scopeId2}>${ssrInterpolate(role)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-2" }, [
                      createVNode("span", { class: "text-xs font-black uppercase tracking-widest text-primary" }, toDisplayString(role), 1)
                    ])
                  ];
                }
              }),
              "item-products_count": withCtx(({ products_count }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-2" data-v-f566b932${_scopeId2}><span class="text-[10px] font-bold text-muted-foreground" data-v-f566b932${_scopeId2}>${ssrInterpolate(products_count)} Produk</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-2" }, [
                      createVNode("span", { class: "text-[10px] font-bold text-muted-foreground" }, toDisplayString(products_count) + " Produk", 1)
                    ])
                  ];
                }
              }),
              "item-is_suspended": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (item.is_suspended) {
                    _push3(`<div class="flex flex-col gap-1 py-2" data-v-f566b932${_scopeId2}><span class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400" data-v-f566b932${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(UserX), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` Suspended </span><p class="text-[9px] text-red-500 max-w-[120px] truncate"${ssrRenderAttr("title", item.suspension_reason)} data-v-f566b932${_scopeId2}>Ket: ${ssrInterpolate(item.suspension_reason)}</p></div>`);
                  } else {
                    _push3(`<span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" data-v-f566b932${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ShieldCheck), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` Aktif </span>`);
                  }
                } else {
                  return [
                    item.is_suspended ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col gap-1 py-2"
                    }, [
                      createVNode("span", { class: "inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400" }, [
                        createVNode(unref(UserX), { class: "h-3 w-3" }),
                        createTextVNode(" Suspended ")
                      ]),
                      createVNode("p", {
                        class: "text-[9px] text-red-500 max-w-[120px] truncate",
                        title: item.suspension_reason
                      }, "Ket: " + toDisplayString(item.suspension_reason), 9, ["title"])
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    }, [
                      createVNode(unref(ShieldCheck), { class: "h-3 w-3" }),
                      createTextVNode(" Aktif ")
                    ]))
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-2 py-2" data-v-f566b932${_scopeId2}>`);
                  if (!item.is_suspended && item.role !== "admin") {
                    _push3(`<button class="rounded-lg bg-red-500/10 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-all" title="Suspend User" data-v-f566b932${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(UserX), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (item.is_suspended) {
                    _push3(`<button class="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all" title="Cabut Suspensi" data-v-f566b932${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ShieldCheck), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (item.role === "seller") {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("store.show", item.id),
                      class: "rounded-lg bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-white transition-all",
                      title: "Lihat Toko"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Search), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Search), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-2 py-2" }, [
                      !item.is_suspended && item.role !== "admin" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => openSuspendModal(item),
                        class: "rounded-lg bg-red-500/10 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-all",
                        title: "Suspend User"
                      }, [
                        createVNode(unref(UserX), { class: "h-4 w-4" })
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      item.is_suspended ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: ($event) => unsuspend(item),
                        class: "rounded-lg bg-emerald-500/10 p-2 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all",
                        title: "Cabut Suspensi"
                      }, [
                        createVNode(unref(ShieldCheck), { class: "h-4 w-4" })
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      item.role === "seller" ? (openBlock(), createBlock(unref(Link), {
                        key: 2,
                        href: _ctx.route("store.show", item.id),
                        class: "rounded-lg bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-white transition-all",
                        title: "Lihat Toko"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Search), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.users.links.length > 3) {
              _push2(`<div class="mt-6 flex justify-center gap-1" data-v-f566b932${_scopeId}><!--[-->`);
              ssrRenderList(__props.users.links, (link, k) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: k,
                  href: link.url || "#",
                  class: ["rounded-lg px-3 py-1 text-sm transition-colors", {
                    "bg-primary text-primary-foreground font-bold": link.active,
                    "hover:bg-muted text-muted-foreground": !link.active && link.url,
                    "opacity-50 cursor-not-allowed": !link.url
                  }]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: isSuspendModalOpen.value,
              onClose: closeSuspendModal,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="p-6" data-v-f566b932${_scopeId2}><h2 class="text-lg font-bold text-foreground" data-v-f566b932${_scopeId2}> Suspend Pengguna: ${ssrInterpolate((_a = selectedUser.value) == null ? void 0 : _a.name)}</h2><p class="mt-1 text-sm text-muted-foreground" data-v-f566b932${_scopeId2}> Pengguna yang disuspend tidak akan bisa login ke aplikasi. </p><div class="mt-6" data-v-f566b932${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    for: "suspension_reason",
                    value: "Alasan Suspensi"
                  }, null, _parent3, _scopeId2));
                  _push3(`<textarea id="suspension_reason" class="mt-1 block w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary" rows="3" placeholder="Misal: Pelanggaran syarat &amp; ketentuan, indikasi penipuan, dsb." required data-v-f566b932${_scopeId2}>${ssrInterpolate(unref(suspendForm).suspension_reason)}</textarea>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(suspendForm).errors.suspension_reason
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-8 flex justify-end gap-3" data-v-f566b932${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, { onClick: closeSuspendModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Batal`);
                      } else {
                        return [
                          createTextVNode("Batal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    onClick: submitSuspension,
                    disabled: unref(suspendForm).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Suspend Sekarang `);
                      } else {
                        return [
                          createTextVNode(" Suspend Sekarang ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-lg font-bold text-foreground" }, " Suspend Pengguna: " + toDisplayString((_b = selectedUser.value) == null ? void 0 : _b.name), 1),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Pengguna yang disuspend tidak akan bisa login ke aplikasi. "),
                      createVNode("div", { class: "mt-6" }, [
                        createVNode(_sfc_main$3, {
                          for: "suspension_reason",
                          value: "Alasan Suspensi"
                        }),
                        withDirectives(createVNode("textarea", {
                          id: "suspension_reason",
                          "onUpdate:modelValue": ($event) => unref(suspendForm).suspension_reason = $event,
                          class: "mt-1 block w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary",
                          rows: "3",
                          placeholder: "Misal: Pelanggaran syarat & ketentuan, indikasi penipuan, dsb.",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(suspendForm).suspension_reason]
                        ]),
                        createVNode(_sfc_main$4, {
                          class: "mt-2",
                          message: unref(suspendForm).errors.suspension_reason
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                        createVNode(_sfc_main$5, { onClick: closeSuspendModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$6, {
                          onClick: submitSuspension,
                          disabled: unref(suspendForm).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Suspend Sekarang ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-card border border-border shadow sm:rounded-2xl" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "easy-table-wrapper" }, [
                        createVNode(_component_EasyDataTable, {
                          headers,
                          items: __props.users.data,
                          loading: loading.value,
                          "hide-footer": "",
                          "border-cell": "",
                          "buttons-pagination": "",
                          "table-class-name": "customize-table",
                          "header-class-name": "customize-header"
                        }, {
                          "item-id": withCtx(({ id }) => [
                            createVNode("span", { class: "font-bold text-muted-foreground/70" }, "#" + toDisplayString(id), 1)
                          ]),
                          "item-name": withCtx(({ name, email, profile }) => [
                            createVNode("div", { class: "flex items-center gap-3 py-2" }, [
                              createVNode("div", { class: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary flex-shrink-0 overflow-hidden border border-border shadow-sm" }, [
                                (profile == null ? void 0 : profile.avatar) ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: `/storage/${profile.avatar}`,
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(toDisplayString(name.charAt(0)), 1)
                                ], 64))
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "font-bold truncate text-foreground" }, toDisplayString(name), 1),
                                createVNode("p", { class: "text-[10px] text-muted-foreground/80 truncate" }, toDisplayString(email), 1)
                              ])
                            ])
                          ]),
                          "item-contact": withCtx(({ email, profile }) => [
                            createVNode("div", { class: "flex flex-col gap-1 text-[10px] py-2 text-muted-foreground" }, [
                              createVNode("span", { class: "flex items-center gap-1.5" }, [
                                createVNode(unref(Mail), { class: "h-3 w-3 text-primary/70" }),
                                createTextVNode(" " + toDisplayString(email), 1)
                              ]),
                              createVNode("span", { class: "flex items-center gap-1.5" }, [
                                createVNode(unref(MapPin), { class: "h-3 w-3 text-primary/70" }),
                                createTextVNode(" " + toDisplayString((profile == null ? void 0 : profile.city) || "Lokasi belum diset"), 1)
                              ])
                            ])
                          ]),
                          "item-role": withCtx(({ role }) => [
                            createVNode("div", { class: "py-2" }, [
                              createVNode("span", { class: "text-xs font-black uppercase tracking-widest text-primary" }, toDisplayString(role), 1)
                            ])
                          ]),
                          "item-products_count": withCtx(({ products_count }) => [
                            createVNode("div", { class: "py-2" }, [
                              createVNode("span", { class: "text-[10px] font-bold text-muted-foreground" }, toDisplayString(products_count) + " Produk", 1)
                            ])
                          ]),
                          "item-is_suspended": withCtx((item) => [
                            item.is_suspended ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex flex-col gap-1 py-2"
                            }, [
                              createVNode("span", { class: "inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400" }, [
                                createVNode(unref(UserX), { class: "h-3 w-3" }),
                                createTextVNode(" Suspended ")
                              ]),
                              createVNode("p", {
                                class: "text-[9px] text-red-500 max-w-[120px] truncate",
                                title: item.suspension_reason
                              }, "Ket: " + toDisplayString(item.suspension_reason), 9, ["title"])
                            ])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            }, [
                              createVNode(unref(ShieldCheck), { class: "h-3 w-3" }),
                              createTextVNode(" Aktif ")
                            ]))
                          ]),
                          "item-actions": withCtx((item) => [
                            createVNode("div", { class: "flex justify-end gap-2 py-2" }, [
                              !item.is_suspended && item.role !== "admin" ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => openSuspendModal(item),
                                class: "rounded-lg bg-red-500/10 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-all",
                                title: "Suspend User"
                              }, [
                                createVNode(unref(UserX), { class: "h-4 w-4" })
                              ], 8, ["onClick"])) : createCommentVNode("", true),
                              item.is_suspended ? (openBlock(), createBlock("button", {
                                key: 1,
                                onClick: ($event) => unsuspend(item),
                                class: "rounded-lg bg-emerald-500/10 p-2 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all",
                                title: "Cabut Suspensi"
                              }, [
                                createVNode(unref(ShieldCheck), { class: "h-4 w-4" })
                              ], 8, ["onClick"])) : createCommentVNode("", true),
                              item.role === "seller" ? (openBlock(), createBlock(unref(Link), {
                                key: 2,
                                href: _ctx.route("store.show", item.id),
                                class: "rounded-lg bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-white transition-all",
                                title: "Lihat Toko"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Search), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["href"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 1
                        }, 8, ["items", "loading"])
                      ]),
                      __props.users.links.length > 3 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 flex justify-center gap-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.users.links, (link, k) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: k,
                            href: link.url || "#",
                            innerHTML: link.label,
                            class: ["rounded-lg px-3 py-1 text-sm transition-colors", {
                              "bg-primary text-primary-foreground font-bold": link.active,
                              "hover:bg-muted text-muted-foreground": !link.active && link.url,
                              "opacity-50 cursor-not-allowed": !link.url
                            }]
                          }, null, 8, ["href", "innerHTML", "class"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$2, {
                show: isSuspendModalOpen.value,
                onClose: closeSuspendModal,
                maxWidth: "md"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-lg font-bold text-foreground" }, " Suspend Pengguna: " + toDisplayString((_a = selectedUser.value) == null ? void 0 : _a.name), 1),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Pengguna yang disuspend tidak akan bisa login ke aplikasi. "),
                      createVNode("div", { class: "mt-6" }, [
                        createVNode(_sfc_main$3, {
                          for: "suspension_reason",
                          value: "Alasan Suspensi"
                        }),
                        withDirectives(createVNode("textarea", {
                          id: "suspension_reason",
                          "onUpdate:modelValue": ($event) => unref(suspendForm).suspension_reason = $event,
                          class: "mt-1 block w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary",
                          rows: "3",
                          placeholder: "Misal: Pelanggaran syarat & ketentuan, indikasi penipuan, dsb.",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(suspendForm).suspension_reason]
                        ]),
                        createVNode(_sfc_main$4, {
                          class: "mt-2",
                          message: unref(suspendForm).errors.suspension_reason
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                        createVNode(_sfc_main$5, { onClick: closeSuspendModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$6, {
                          onClick: submitSuspension,
                          disabled: unref(suspendForm).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Suspend Sekarang ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ])
                  ];
                }),
                _: 1
              }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f566b932"]]);
export {
  Index as default
};
