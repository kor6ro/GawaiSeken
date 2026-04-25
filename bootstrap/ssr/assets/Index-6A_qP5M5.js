import { ref, watch, resolveComponent, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, Fragment, withDirectives, vModelText, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { router, useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$5 } from "./SecondaryButton-BWOt3jtr.js";
import { _ as _sfc_main$6 } from "./DangerButton-Dpx20QNz.js";
import { _ as _sfc_main$7 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$9 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$3 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$4 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$8 } from "./BackButton-DqmVU1VH.js";
import { Eye, CheckCircle, XCircle, Ban, Trash2, Search } from "lucide-vue-next";
import debounce from "lodash/debounce.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    products: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const searchTerm = ref(props.filters.search || "");
    const filterStatus = ref(props.filters.status || "");
    const sortBy = ref(props.filters.sort_by || "id");
    const sortDir = ref(props.filters.sort_dir || "desc");
    const loading = ref(false);
    const headers = [
      { text: "ID", value: "id", sortable: true },
      { text: "Produk", value: "title", sortable: true },
      { text: "Seller / Pengguna", value: "user" },
      { text: "Status", value: "status", sortable: true },
      { text: "Aksi", value: "actions", width: 220 }
    ];
    const performSearch = debounce(() => {
      router.get(route("admin.products.index"), {
        search: searchTerm.value,
        status: filterStatus.value,
        sort_by: sortBy.value,
        sort_dir: sortDir.value
      }, {
        preserveState: true,
        replace: true
      });
    }, 300);
    watch([searchTerm, filterStatus], () => {
      performSearch();
    });
    const selectedProduct = ref(null);
    const isActionModalOpen = ref(false);
    const actionType = ref("");
    const form = useForm({
      status: "",
      moderation_note: ""
    });
    const openActionModal = (product, type) => {
      selectedProduct.value = product;
      actionType.value = type;
      form.status = type;
      form.moderation_note = product.moderation_note || "";
      isActionModalOpen.value = true;
    };
    const closeActionModal = () => {
      isActionModalOpen.value = false;
      selectedProduct.value = null;
      form.reset();
    };
    const submitAction = () => {
      if (actionType.value === "delete") {
        router.delete(route("admin.products.destroy", selectedProduct.value.slug), {
          onSuccess: () => closeActionModal()
        });
      } else {
        form.post(route("admin.products.update-status", selectedProduct.value.slug), {
          onSuccess: () => closeActionModal()
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EasyDataTable = resolveComponent("EasyDataTable");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Produk" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-v-5b01c962${_scopeId}><div class="flex items-center gap-3" data-v-5b01c962${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, { fallbackRoute: "admin.dashboard" }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground" data-v-5b01c962${_scopeId}> Manajemen Produk </h2></div><div class="flex flex-wrap items-center gap-3" data-v-5b01c962${_scopeId}><div class="relative" data-v-5b01c962${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              modelValue: searchTerm.value,
              "onUpdate:modelValue": ($event) => searchTerm.value = $event,
              placeholder: "Cari judul atau seller...",
              class: "pl-9 h-10 w-full sm:w-64"
            }, null, _parent2, _scopeId));
            _push2(`</div><select class="h-10 rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary" data-v-5b01c962${_scopeId}><option value="" data-v-5b01c962${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "") : ssrLooseEqual(filterStatus.value, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="pending" data-v-5b01c962${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "pending") : ssrLooseEqual(filterStatus.value, "pending")) ? " selected" : ""}${_scopeId}>Pending</option><option value="active" data-v-5b01c962${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "active") : ssrLooseEqual(filterStatus.value, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="rejected" data-v-5b01c962${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "rejected") : ssrLooseEqual(filterStatus.value, "rejected")) ? " selected" : ""}${_scopeId}>Rejected</option><option value="banned" data-v-5b01c962${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "banned") : ssrLooseEqual(filterStatus.value, "banned")) ? " selected" : ""}${_scopeId}>Banned</option></select></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(_sfc_main$8, { fallbackRoute: "admin.dashboard" }),
                  createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, " Manajemen Produk ")
                ]),
                createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    createVNode(_sfc_main$9, {
                      modelValue: searchTerm.value,
                      "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                      placeholder: "Cari judul atau seller...",
                      class: "pl-9 h-10 w-full sm:w-64"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => filterStatus.value = $event,
                    class: "h-10 rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary"
                  }, [
                    createVNode("option", { value: "" }, "Semua Status"),
                    createVNode("option", { value: "pending" }, "Pending"),
                    createVNode("option", { value: "active" }, "Active"),
                    createVNode("option", { value: "rejected" }, "Rejected"),
                    createVNode("option", { value: "banned" }, "Banned")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, filterStatus.value]
                  ])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12" data-v-5b01c962${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8" data-v-5b01c962${_scopeId}><div class="overflow-hidden bg-card border border-border shadow sm:rounded-2xl" data-v-5b01c962${_scopeId}><div class="p-6" data-v-5b01c962${_scopeId}><div class="easy-table-wrapper" data-v-5b01c962${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers,
              items: __props.products.data,
              loading: loading.value,
              "hide-footer": "",
              "border-cell": "",
              "buttons-pagination": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-id": withCtx(({ id }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-[10px] text-muted-foreground font-bold" data-v-5b01c962${_scopeId2}>#${ssrInterpolate(id)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-[10px] text-muted-foreground font-bold" }, "#" + toDisplayString(id), 1)
                  ];
                }
              }),
              "item-title": withCtx(({ title, price, category, images }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-4 py-2" data-v-5b01c962${_scopeId2}><div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted border border-border" data-v-5b01c962${_scopeId2}>`);
                  if (images.length) {
                    _push3(`<img${ssrRenderAttr("src", "/storage/" + images[0].image_path)} class="h-full w-full object-cover" data-v-5b01c962${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="min-w-0" data-v-5b01c962${_scopeId2}><p class="font-bold text-sm leading-tight line-clamp-1 text-foreground" data-v-5b01c962${_scopeId2}>${ssrInterpolate(title)}</p><p class="text-[10px] text-muted-foreground/80 mt-1 truncate" data-v-5b01c962${_scopeId2}>Rp ${ssrInterpolate(price.toLocaleString("id-ID"))} | ${ssrInterpolate(category == null ? void 0 : category.name)}</p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-4 py-2" }, [
                      createVNode("div", { class: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted border border-border" }, [
                        images.length ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: "/storage/" + images[0].image_path,
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("p", { class: "font-bold text-sm leading-tight line-clamp-1 text-foreground" }, toDisplayString(title), 1),
                        createVNode("p", { class: "text-[10px] text-muted-foreground/80 mt-1 truncate" }, "Rp " + toDisplayString(price.toLocaleString("id-ID")) + " | " + toDisplayString(category == null ? void 0 : category.name), 1)
                      ])
                    ])
                  ];
                }
              }),
              "item-user": withCtx(({ user }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2 py-2" data-v-5b01c962${_scopeId2}><div class="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0" data-v-5b01c962${_scopeId2}>${ssrInterpolate(user.name.charAt(0))}</div><div class="min-w-0" data-v-5b01c962${_scopeId2}><p class="text-xs font-medium truncate text-foreground" data-v-5b01c962${_scopeId2}>${ssrInterpolate(user.name)}</p><p class="text-[9px] text-muted-foreground/80 truncate" data-v-5b01c962${_scopeId2}>${ssrInterpolate(((_a = user.profile) == null ? void 0 : _a.city) || "No City")}</p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2 py-2" }, [
                      createVNode("div", { class: "h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0" }, toDisplayString(user.name.charAt(0)), 1),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("p", { class: "text-xs font-medium truncate text-foreground" }, toDisplayString(user.name), 1),
                        createVNode("p", { class: "text-[9px] text-muted-foreground/80 truncate" }, toDisplayString(((_b = user.profile) == null ? void 0 : _b.city) || "No City"), 1)
                      ])
                    ])
                  ];
                }
              }),
              "item-status": withCtx(({ status }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass([{
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400": status === "pending",
                    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400": status === "active",
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": status === "rejected" || status === "banned"
                  }, "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"])}" data-v-5b01c962${_scopeId2}>${ssrInterpolate(status)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: [{
                        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400": status === "pending",
                        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400": status === "active",
                        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": status === "rejected" || status === "banned"
                      }, "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"]
                    }, toDisplayString(status), 3)
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-1.5 py-2" data-v-5b01c962${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.show", item.slug),
                    class: "rounded-lg bg-muted p-2 text-muted-foreground hover:text-primary transition-all",
                    title: "Lihat Detail"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Eye), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (item.status !== "active") {
                    _push3(`<button class="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all" title="Setujui (Live)" data-v-5b01c962${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (item.status === "pending") {
                    _push3(`<button class="rounded-lg bg-amber-500/10 p-2 text-amber-600 hover:bg-amber-500 hover:text-white transition-all" title="Tolak Produk" data-v-5b01c962${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (item.status === "active") {
                    _push3(`<button class="rounded-lg bg-red-500/10 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-all" title="Ban Produk" data-v-5b01c962${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Ban), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<button class="rounded-lg bg-red-600/10 p-2 text-red-700 hover:bg-red-700 hover:text-white transition-all" title="Hapus Permanen" data-v-5b01c962${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`</button></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-1.5 py-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("products.show", item.slug),
                        class: "rounded-lg bg-muted p-2 text-muted-foreground hover:text-primary transition-all",
                        title: "Lihat Detail"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Eye), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      item.status !== "active" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => openActionModal(item, "active"),
                        class: "rounded-lg bg-emerald-500/10 p-2 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all",
                        title: "Setujui (Live)"
                      }, [
                        createVNode(unref(CheckCircle), { class: "h-4 w-4" })
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      item.status === "pending" ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: ($event) => openActionModal(item, "rejected"),
                        class: "rounded-lg bg-amber-500/10 p-2 text-amber-600 hover:bg-amber-500 hover:text-white transition-all",
                        title: "Tolak Produk"
                      }, [
                        createVNode(unref(XCircle), { class: "h-4 w-4" })
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      item.status === "active" ? (openBlock(), createBlock("button", {
                        key: 2,
                        onClick: ($event) => openActionModal(item, "banned"),
                        class: "rounded-lg bg-red-500/10 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-all",
                        title: "Ban Produk"
                      }, [
                        createVNode(unref(Ban), { class: "h-4 w-4" })
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode("button", {
                        onClick: ($event) => openActionModal(item, "delete"),
                        class: "rounded-lg bg-red-600/10 p-2 text-red-700 hover:bg-red-700 hover:text-white transition-all",
                        title: "Hapus Permanen"
                      }, [
                        createVNode(unref(Trash2), { class: "h-4 w-4" })
                      ], 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.products.links.length > 3) {
              _push2(`<div class="mt-6 flex justify-center gap-1" data-v-5b01c962${_scopeId}><!--[-->`);
              ssrRenderList(__props.products.links, (link, k) => {
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
              show: isActionModalOpen.value,
              onClose: closeActionModal,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="p-6" data-v-5b01c962${_scopeId2}><h2 class="text-lg font-bold text-foreground" data-v-5b01c962${_scopeId2}>`);
                  if (actionType.value === "delete") {
                    _push3(`<!--[-->Hapus Produk Permanen<!--]-->`);
                  } else if (actionType.value === "active") {
                    _push3(`<!--[-->Setujui Produk<!--]-->`);
                  } else if (actionType.value === "rejected") {
                    _push3(`<!--[-->Tolak Produk<!--]-->`);
                  } else if (actionType.value === "banned") {
                    _push3(`<!--[-->Ban Produk<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</h2><p class="mt-1 text-sm text-muted-foreground" data-v-5b01c962${_scopeId2}> Produk: <span class="font-semibold text-foreground" data-v-5b01c962${_scopeId2}>${ssrInterpolate((_a = selectedProduct.value) == null ? void 0 : _a.title)}</span></p>`);
                  if (actionType.value === "delete") {
                    _push3(`<div class="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm" data-v-5b01c962${_scopeId2}><p class="font-bold mb-1" data-v-5b01c962${_scopeId2}>Peringatan!</p> Tindakan ini akan menghapus produk dan semua gambarnya secara permanen dari server. Tindakan ini tidak dapat dibatalkan. </div>`);
                  } else if (actionType.value !== "active") {
                    _push3(`<div class="mt-6" data-v-5b01c962${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      for: "moderation_note",
                      value: "Catatan Moderasi"
                    }, null, _parent3, _scopeId2));
                    _push3(`<textarea id="moderation_note" class="mt-1 block w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary" rows="3" placeholder="Berikan alasan agar seller tahu..." required data-v-5b01c962${_scopeId2}>${ssrInterpolate(unref(form).moderation_note)}</textarea>`);
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      class: "mt-2",
                      message: unref(form).errors.moderation_note
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="mt-6" data-v-5b01c962${_scopeId2}><p class="text-sm text-muted-foreground" data-v-5b01c962${_scopeId2}>Apakah Anda yakin ingin menyetujui produk ini agar tayang ke publik?</p></div>`);
                  }
                  _push3(`<div class="mt-8 flex justify-end gap-3" data-v-5b01c962${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, { onClick: closeActionModal }, {
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
                  if (actionType.value !== "active") {
                    _push3(ssrRenderComponent(_sfc_main$6, {
                      onClick: submitAction,
                      disabled: unref(form).processing
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(actionType.value === "delete" ? "Hapus Sekarang" : "Konfirmasi")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(actionType.value === "delete" ? "Hapus Sekarang" : "Konfirmasi"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_sfc_main$7, {
                      onClick: submitAction,
                      disabled: unref(form).processing
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Setujui Sekarang `);
                        } else {
                          return [
                            createTextVNode(" Setujui Sekarang ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-lg font-bold text-foreground" }, [
                        actionType.value === "delete" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode("Hapus Produk Permanen")
                        ], 64)) : actionType.value === "active" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode("Setujui Produk")
                        ], 64)) : actionType.value === "rejected" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createTextVNode("Tolak Produk")
                        ], 64)) : actionType.value === "banned" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                          createTextVNode("Ban Produk")
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, [
                        createTextVNode(" Produk: "),
                        createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString((_b = selectedProduct.value) == null ? void 0 : _b.title), 1)
                      ]),
                      actionType.value === "delete" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm"
                      }, [
                        createVNode("p", { class: "font-bold mb-1" }, "Peringatan!"),
                        createTextVNode(" Tindakan ini akan menghapus produk dan semua gambarnya secara permanen dari server. Tindakan ini tidak dapat dibatalkan. ")
                      ])) : actionType.value !== "active" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode(_sfc_main$3, {
                          for: "moderation_note",
                          value: "Catatan Moderasi"
                        }),
                        withDirectives(createVNode("textarea", {
                          id: "moderation_note",
                          "onUpdate:modelValue": ($event) => unref(form).moderation_note = $event,
                          class: "mt-1 block w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary",
                          rows: "3",
                          placeholder: "Berikan alasan agar seller tahu...",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).moderation_note]
                        ]),
                        createVNode(_sfc_main$4, {
                          class: "mt-2",
                          message: unref(form).errors.moderation_note
                        }, null, 8, ["message"])
                      ])) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-6"
                      }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Apakah Anda yakin ingin menyetujui produk ini agar tayang ke publik?")
                      ])),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                        createVNode(_sfc_main$5, { onClick: closeActionModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        actionType.value !== "active" ? (openBlock(), createBlock(_sfc_main$6, {
                          key: 0,
                          onClick: submitAction,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(actionType.value === "delete" ? "Hapus Sekarang" : "Konfirmasi"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : (openBlock(), createBlock(_sfc_main$7, {
                          key: 1,
                          onClick: submitAction,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Setujui Sekarang ")
                          ]),
                          _: 1
                        }, 8, ["disabled"]))
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
                          items: __props.products.data,
                          loading: loading.value,
                          "hide-footer": "",
                          "border-cell": "",
                          "buttons-pagination": "",
                          "table-class-name": "customize-table",
                          "header-class-name": "customize-header"
                        }, {
                          "item-id": withCtx(({ id }) => [
                            createVNode("span", { class: "text-[10px] text-muted-foreground font-bold" }, "#" + toDisplayString(id), 1)
                          ]),
                          "item-title": withCtx(({ title, price, category, images }) => [
                            createVNode("div", { class: "flex items-center gap-4 py-2" }, [
                              createVNode("div", { class: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted border border-border" }, [
                                images.length ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: "/storage/" + images[0].image_path,
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "font-bold text-sm leading-tight line-clamp-1 text-foreground" }, toDisplayString(title), 1),
                                createVNode("p", { class: "text-[10px] text-muted-foreground/80 mt-1 truncate" }, "Rp " + toDisplayString(price.toLocaleString("id-ID")) + " | " + toDisplayString(category == null ? void 0 : category.name), 1)
                              ])
                            ])
                          ]),
                          "item-user": withCtx(({ user }) => {
                            var _a;
                            return [
                              createVNode("div", { class: "flex items-center gap-2 py-2" }, [
                                createVNode("div", { class: "h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0" }, toDisplayString(user.name.charAt(0)), 1),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-xs font-medium truncate text-foreground" }, toDisplayString(user.name), 1),
                                  createVNode("p", { class: "text-[9px] text-muted-foreground/80 truncate" }, toDisplayString(((_a = user.profile) == null ? void 0 : _a.city) || "No City"), 1)
                                ])
                              ])
                            ];
                          }),
                          "item-status": withCtx(({ status }) => [
                            createVNode("span", {
                              class: [{
                                "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400": status === "pending",
                                "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400": status === "active",
                                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": status === "rejected" || status === "banned"
                              }, "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"]
                            }, toDisplayString(status), 3)
                          ]),
                          "item-actions": withCtx((item) => [
                            createVNode("div", { class: "flex justify-end gap-1.5 py-2" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("products.show", item.slug),
                                class: "rounded-lg bg-muted p-2 text-muted-foreground hover:text-primary transition-all",
                                title: "Lihat Detail"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["href"]),
                              item.status !== "active" ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => openActionModal(item, "active"),
                                class: "rounded-lg bg-emerald-500/10 p-2 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all",
                                title: "Setujui (Live)"
                              }, [
                                createVNode(unref(CheckCircle), { class: "h-4 w-4" })
                              ], 8, ["onClick"])) : createCommentVNode("", true),
                              item.status === "pending" ? (openBlock(), createBlock("button", {
                                key: 1,
                                onClick: ($event) => openActionModal(item, "rejected"),
                                class: "rounded-lg bg-amber-500/10 p-2 text-amber-600 hover:bg-amber-500 hover:text-white transition-all",
                                title: "Tolak Produk"
                              }, [
                                createVNode(unref(XCircle), { class: "h-4 w-4" })
                              ], 8, ["onClick"])) : createCommentVNode("", true),
                              item.status === "active" ? (openBlock(), createBlock("button", {
                                key: 2,
                                onClick: ($event) => openActionModal(item, "banned"),
                                class: "rounded-lg bg-red-500/10 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-all",
                                title: "Ban Produk"
                              }, [
                                createVNode(unref(Ban), { class: "h-4 w-4" })
                              ], 8, ["onClick"])) : createCommentVNode("", true),
                              createVNode("button", {
                                onClick: ($event) => openActionModal(item, "delete"),
                                class: "rounded-lg bg-red-600/10 p-2 text-red-700 hover:bg-red-700 hover:text-white transition-all",
                                title: "Hapus Permanen"
                              }, [
                                createVNode(unref(Trash2), { class: "h-4 w-4" })
                              ], 8, ["onClick"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["items", "loading"])
                      ]),
                      __props.products.links.length > 3 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 flex justify-center gap-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.products.links, (link, k) => {
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
                show: isActionModalOpen.value,
                onClose: closeActionModal,
                maxWidth: "md"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-lg font-bold text-foreground" }, [
                        actionType.value === "delete" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode("Hapus Produk Permanen")
                        ], 64)) : actionType.value === "active" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode("Setujui Produk")
                        ], 64)) : actionType.value === "rejected" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createTextVNode("Tolak Produk")
                        ], 64)) : actionType.value === "banned" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                          createTextVNode("Ban Produk")
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, [
                        createTextVNode(" Produk: "),
                        createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString((_a = selectedProduct.value) == null ? void 0 : _a.title), 1)
                      ]),
                      actionType.value === "delete" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm"
                      }, [
                        createVNode("p", { class: "font-bold mb-1" }, "Peringatan!"),
                        createTextVNode(" Tindakan ini akan menghapus produk dan semua gambarnya secara permanen dari server. Tindakan ini tidak dapat dibatalkan. ")
                      ])) : actionType.value !== "active" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode(_sfc_main$3, {
                          for: "moderation_note",
                          value: "Catatan Moderasi"
                        }),
                        withDirectives(createVNode("textarea", {
                          id: "moderation_note",
                          "onUpdate:modelValue": ($event) => unref(form).moderation_note = $event,
                          class: "mt-1 block w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary",
                          rows: "3",
                          placeholder: "Berikan alasan agar seller tahu...",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).moderation_note]
                        ]),
                        createVNode(_sfc_main$4, {
                          class: "mt-2",
                          message: unref(form).errors.moderation_note
                        }, null, 8, ["message"])
                      ])) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-6"
                      }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Apakah Anda yakin ingin menyetujui produk ini agar tayang ke publik?")
                      ])),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                        createVNode(_sfc_main$5, { onClick: closeActionModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        actionType.value !== "active" ? (openBlock(), createBlock(_sfc_main$6, {
                          key: 0,
                          onClick: submitAction,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(actionType.value === "delete" ? "Hapus Sekarang" : "Konfirmasi"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : (openBlock(), createBlock(_sfc_main$7, {
                          key: 1,
                          onClick: submitAction,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Setujui Sekarang ")
                          ]),
                          _: 1
                        }, 8, ["disabled"]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Products/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5b01c962"]]);
export {
  Index as default
};
