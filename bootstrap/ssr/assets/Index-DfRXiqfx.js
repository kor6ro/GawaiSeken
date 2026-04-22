import { ref, watch, unref, withCtx, createTextVNode, createVNode, createBlock, toDisplayString, openBlock, createCommentVNode, Fragment, renderList, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-BDlcmPtd.js";
import { useForm, router, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$6 } from "./SecondaryButton-BWOt3jtr.js";
import { _ as _sfc_main$7 } from "./DangerButton-Dpx20QNz.js";
import { _ as _sfc_main$8 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$4 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$3, a as _sfc_main$5 } from "./InputError-DDbcJ_iI.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lucide-vue-next";
import "lodash/debounce.js";
import "lodash/pickBy.js";
import "./onlineState-BAtS9nBF.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    products: {
      type: Object
    },
    filters: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
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
      form.post(route("admin.products.update-status", selectedProduct.value.id), {
        onSuccess: () => closeActionModal()
      });
    };
    const filterStatus = ref(props.filters.status || "");
    watch(filterStatus, (value) => {
      router.get(route("admin.products.index"), { status: value }, { preserveState: true });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Produk" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}> Manajemen Produk </h2><div class="flex items-center gap-4"${_scopeId}><select class="rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary dark:bg-gray-900"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "") : ssrLooseEqual(filterStatus.value, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "pending") : ssrLooseEqual(filterStatus.value, "pending")) ? " selected" : ""}${_scopeId}>Pending</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "active") : ssrLooseEqual(filterStatus.value, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="rejected"${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "rejected") : ssrLooseEqual(filterStatus.value, "rejected")) ? " selected" : ""}${_scopeId}>Rejected</option><option value="banned"${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "banned") : ssrLooseEqual(filterStatus.value, "banned")) ? " selected" : ""}${_scopeId}>Banned</option></select></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, " Manajemen Produk "),
                createVNode("div", { class: "flex items-center gap-4" }, [
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => filterStatus.value = $event,
                    class: "rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary dark:bg-gray-900"
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
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-card border border-border shadow sm:rounded-2xl"${_scopeId}><div class="p-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left text-sm text-foreground"${_scopeId}><thead class="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Produk</th><th class="px-6 py-4"${_scopeId}>Seller</th><th class="px-6 py-4"${_scopeId}>Harga</th><th class="px-6 py-4"${_scopeId}>Status</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-border"${_scopeId}><!--[-->`);
            ssrRenderList(__props.products.data, (product) => {
              var _a;
              _push2(`<tr class="hover:bg-muted/50 transition-colors"${_scopeId}><td class="px-6 py-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
              if (product.images.length) {
                _push2(`<img${ssrRenderAttr("src", "/storage/" + product.images[0].image_path)} class="h-10 w-10 rounded-lg object-cover bg-muted"${_scopeId}>`);
              } else {
                _push2(`<div class="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-[10px] text-muted-foreground"${_scopeId}> No Img </div>`);
              }
              _push2(`<div${_scopeId}><p class="font-medium line-clamp-1"${_scopeId}>${ssrInterpolate(product.title)}</p><p class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate((_a = product.category) == null ? void 0 : _a.name)}</p></div></div></td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(product.user.name)}</td><td class="px-6 py-4"${_scopeId}>Rp ${ssrInterpolate(product.price.toLocaleString("id-ID"))}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([{
                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400": product.status === "pending",
                "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400": product.status === "active",
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": product.status === "rejected" || product.status === "banned"
              }, "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"])}"${_scopeId}>${ssrInterpolate(product.status)}</span></td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("products.show", product.slug),
                class: "rounded-lg bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lihat `);
                  } else {
                    return [
                      createTextVNode(" Lihat ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (product.status !== "active") {
                _push2(`<button class="rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"${_scopeId}> Approve </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (product.status === "pending") {
                _push2(`<button class="rounded-lg bg-orange-600 px-3 py-1 text-xs font-medium text-white hover:bg-orange-700"${_scopeId}> Reject </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (product.status === "active") {
                _push2(`<button class="rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"${_scopeId}> Ban </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.products.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-8 text-center text-muted-foreground italic"${_scopeId}> Tidak ada produk ditemukan. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.products.links.length > 3) {
              _push2(`<div class="mt-6 flex justify-center gap-1"${_scopeId}><!--[-->`);
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
                  _push3(`<div class="p-6"${_scopeId2}><h2 class="text-lg font-bold text-foreground"${_scopeId2}>${ssrInterpolate(actionType.value === "active" ? "Setujui Produk" : actionType.value === "rejected" ? "Tolak Produk" : "Ban Produk")}</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId2}> Produk: <span class="font-semibold text-foreground"${_scopeId2}>${ssrInterpolate((_a = selectedProduct.value) == null ? void 0 : _a.title)}</span></p>`);
                  if (actionType.value !== "active") {
                    _push3(`<div class="mt-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      for: "moderation_note",
                      value: "Catatan Moderasi"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      id: "moderation_note",
                      type: "text",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).moderation_note,
                      "onUpdate:modelValue": ($event) => unref(form).moderation_note = $event,
                      placeholder: "Berikan alasan agar seller tahu...",
                      required: "",
                      autofocus: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      class: "mt-2",
                      message: unref(form).errors.moderation_note
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="mt-6"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Apakah Anda yakin ingin menyetujui produk ini agar tayang ke publik?</p></div>`);
                  }
                  _push3(`<div class="mt-8 flex justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, { onClick: closeActionModal }, {
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
                    _push3(ssrRenderComponent(_sfc_main$7, {
                      onClick: submitAction,
                      disabled: unref(form).processing
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Konfirmasi `);
                        } else {
                          return [
                            createTextVNode(" Konfirmasi ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_sfc_main$8, {
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
                      createVNode("h2", { class: "text-lg font-bold text-foreground" }, toDisplayString(actionType.value === "active" ? "Setujui Produk" : actionType.value === "rejected" ? "Tolak Produk" : "Ban Produk"), 1),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, [
                        createTextVNode(" Produk: "),
                        createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString((_b = selectedProduct.value) == null ? void 0 : _b.title), 1)
                      ]),
                      actionType.value !== "active" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode(_sfc_main$3, {
                          for: "moderation_note",
                          value: "Catatan Moderasi"
                        }),
                        createVNode(_sfc_main$4, {
                          id: "moderation_note",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).moderation_note,
                          "onUpdate:modelValue": ($event) => unref(form).moderation_note = $event,
                          placeholder: "Berikan alasan agar seller tahu...",
                          required: "",
                          autofocus: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.moderation_note
                        }, null, 8, ["message"])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Apakah Anda yakin ingin menyetujui produk ini agar tayang ke publik?")
                      ])),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                        createVNode(_sfc_main$6, { onClick: closeActionModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        actionType.value !== "active" ? (openBlock(), createBlock(_sfc_main$7, {
                          key: 0,
                          onClick: submitAction,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Konfirmasi ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : (openBlock(), createBlock(_sfc_main$8, {
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
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full text-left text-sm text-foreground" }, [
                          createVNode("thead", { class: "border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-4" }, "Produk"),
                              createVNode("th", { class: "px-6 py-4" }, "Seller"),
                              createVNode("th", { class: "px-6 py-4" }, "Harga"),
                              createVNode("th", { class: "px-6 py-4" }, "Status"),
                              createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-border" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                              var _a;
                              return openBlock(), createBlock("tr", {
                                key: product.id,
                                class: "hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    product.images.length ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: "/storage/" + product.images[0].image_path,
                                      class: "h-10 w-10 rounded-lg object-cover bg-muted"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-[10px] text-muted-foreground"
                                    }, " No Img ")),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-medium line-clamp-1" }, toDisplayString(product.title), 1),
                                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString((_a = product.category) == null ? void 0 : _a.name), 1)
                                    ])
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(product.user.name), 1),
                                createVNode("td", { class: "px-6 py-4" }, "Rp " + toDisplayString(product.price.toLocaleString("id-ID")), 1),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("span", {
                                    class: [{
                                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400": product.status === "pending",
                                      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400": product.status === "active",
                                      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": product.status === "rejected" || product.status === "banned"
                                    }, "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"]
                                  }, toDisplayString(product.status), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-right" }, [
                                  createVNode("div", { class: "flex justify-end gap-2" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("products.show", product.slug),
                                      class: "rounded-lg bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Lihat ")
                                      ]),
                                      _: 1
                                    }, 8, ["href"]),
                                    product.status !== "active" ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      onClick: ($event) => openActionModal(product, "active"),
                                      class: "rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                                    }, " Approve ", 8, ["onClick"])) : createCommentVNode("", true),
                                    product.status === "pending" ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      onClick: ($event) => openActionModal(product, "rejected"),
                                      class: "rounded-lg bg-orange-600 px-3 py-1 text-xs font-medium text-white hover:bg-orange-700"
                                    }, " Reject ", 8, ["onClick"])) : createCommentVNode("", true),
                                    product.status === "active" ? (openBlock(), createBlock("button", {
                                      key: 2,
                                      onClick: ($event) => openActionModal(product, "banned"),
                                      class: "rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                                    }, " Ban ", 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ]);
                            }), 128)),
                            __props.products.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "5",
                                class: "px-6 py-8 text-center text-muted-foreground italic"
                              }, " Tidak ada produk ditemukan. ")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
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
                      createVNode("h2", { class: "text-lg font-bold text-foreground" }, toDisplayString(actionType.value === "active" ? "Setujui Produk" : actionType.value === "rejected" ? "Tolak Produk" : "Ban Produk"), 1),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, [
                        createTextVNode(" Produk: "),
                        createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString((_a = selectedProduct.value) == null ? void 0 : _a.title), 1)
                      ]),
                      actionType.value !== "active" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode(_sfc_main$3, {
                          for: "moderation_note",
                          value: "Catatan Moderasi"
                        }),
                        createVNode(_sfc_main$4, {
                          id: "moderation_note",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).moderation_note,
                          "onUpdate:modelValue": ($event) => unref(form).moderation_note = $event,
                          placeholder: "Berikan alasan agar seller tahu...",
                          required: "",
                          autofocus: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.moderation_note
                        }, null, 8, ["message"])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Apakah Anda yakin ingin menyetujui produk ini agar tayang ke publik?")
                      ])),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                        createVNode(_sfc_main$6, { onClick: closeActionModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        actionType.value !== "active" ? (openBlock(), createBlock(_sfc_main$7, {
                          key: 0,
                          onClick: submitAction,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Konfirmasi ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : (openBlock(), createBlock(_sfc_main$8, {
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
export {
  _sfc_main as default
};
