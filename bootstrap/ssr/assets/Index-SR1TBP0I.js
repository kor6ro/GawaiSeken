import { resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Pagination-brVOzIHZ.js";
import { _ as _sfc_main$3 } from "./BackButton-DqmVU1VH.js";
import { AlertCircle, Clock, ChevronRight } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    disputes: Object
  },
  setup(__props) {
    const headers = [
      { text: "Transaksi", value: "transaction" },
      { text: "Pelapor", value: "user" },
      { text: "Alasan", value: "reason" },
      { text: "Status", value: "status" },
      { text: "Tanggal", value: "created_at" },
      { text: "Aksi", value: "actions", width: 120 }
    ];
    const getStatusClass = (status) => {
      switch (status) {
        case "pending":
          return "bg-amber-100 text-amber-700 border-amber-200";
        case "investigating":
          return "bg-blue-100 text-blue-700 border-blue-200";
        case "resolved":
          return "bg-green-100 text-green-700 border-green-200";
        case "closed":
          return "bg-slate-100 text-slate-700 border-slate-200";
        default:
          return "bg-slate-100 text-slate-700";
      }
    };
    const getStatusLabel = (status) => {
      switch (status) {
        case "pending":
          return "Menunggu Review";
        case "investigating":
          return "Sedang Investigasi";
        case "resolved":
          return "Selesai (Refund)";
        case "closed":
          return "Selesai (Release)";
        default:
          return status;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EasyDataTable = resolveComponent("EasyDataTable");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Komplain" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3" data-v-812b0935${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { fallbackRoute: "admin.dashboard" }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground" data-v-812b0935${_scopeId}>Pusat Resolusi &amp; Komplain</h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(_sfc_main$3, { fallbackRoute: "admin.dashboard" }),
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Pusat Resolusi & Komplain")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12" data-v-812b0935${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8" data-v-812b0935${_scopeId}><div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden" data-v-812b0935${_scopeId}><div class="p-6" data-v-812b0935${_scopeId}><div class="flex items-center gap-3 mb-8" data-v-812b0935${_scopeId}><div class="p-3 rounded-2xl bg-red-100 text-red-600" data-v-812b0935${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-812b0935${_scopeId}><h3 class="text-lg font-bold" data-v-812b0935${_scopeId}>Daftar Komplain Transaksi</h3><p class="text-sm text-muted-foreground" data-v-812b0935${_scopeId}>Kelola dan selesaikan sengketa antara Buyer &amp; Seller.</p></div></div><div class="easy-table-wrapper" data-v-812b0935${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers,
              items: __props.disputes.data,
              "hide-footer": "",
              "border-cell": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-transaction": withCtx(({ transaction }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold text-foreground" data-v-812b0935${_scopeId2}>#${ssrInterpolate(transaction.reference_number)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold text-foreground" }, "#" + toDisplayString(transaction.reference_number), 1)
                  ];
                }
              }),
              "item-user": withCtx(({ user }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-2" data-v-812b0935${_scopeId2}><div class="font-medium text-foreground" data-v-812b0935${_scopeId2}>${ssrInterpolate(user.name)}</div><div class="text-[10px] text-muted-foreground" data-v-812b0935${_scopeId2}>${ssrInterpolate(user.email)}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-2" }, [
                      createVNode("div", { class: "font-medium text-foreground" }, toDisplayString(user.name), 1),
                      createVNode("div", { class: "text-[10px] text-muted-foreground" }, toDisplayString(user.email), 1)
                    ])
                  ];
                }
              }),
              "item-reason": withCtx(({ reason }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-xs font-medium text-foreground" data-v-812b0935${_scopeId2}>${ssrInterpolate(reason === "not_delivered" ? "Barang Belum Sampai" : reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya")}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-xs font-medium text-foreground" }, toDisplayString(reason === "not_delivered" ? "Barang Belum Sampai" : reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya"), 1)
                  ];
                }
              }),
              "item-status": withCtx(({ status }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass([getStatusClass(status), "px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border"])}" data-v-812b0935${_scopeId2}>${ssrInterpolate(getStatusLabel(status))}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: ["px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border", getStatusClass(status)]
                    }, toDisplayString(getStatusLabel(status)), 3)
                  ];
                }
              }),
              "item-created_at": withCtx(({ created_at }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-muted-foreground" data-v-812b0935${_scopeId2}>${ssrInterpolate(new Date(created_at).toLocaleDateString("id-ID"))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-muted-foreground" }, toDisplayString(new Date(created_at).toLocaleDateString("id-ID")), 1)
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end py-2" data-v-812b0935${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin.disputes.show", item.id),
                    class: "inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Detail `);
                        _push4(ssrRenderComponent(unref(ChevronRight), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Detail "),
                          createVNode(unref(ChevronRight), { class: "h-3 w-3" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end py-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.disputes.show", item.id),
                        class: "inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Detail "),
                          createVNode(unref(ChevronRight), { class: "h-3 w-3" })
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ];
                }
              }),
              "empty-message": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-20 text-center text-muted-foreground" data-v-812b0935${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Clock), { class: "h-12 w-12 mx-auto mb-4 opacity-20" }, null, _parent3, _scopeId2));
                  _push3(`<p class="font-medium" data-v-812b0935${_scopeId2}>Tidak ada komplain yang perlu diproses.</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-20 text-center text-muted-foreground" }, [
                      createVNode(unref(Clock), { class: "h-12 w-12 mx-auto mb-4 opacity-20" }),
                      createVNode("p", { class: "font-medium" }, "Tidak ada komplain yang perlu diproses.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-8" data-v-812b0935${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.disputes.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl overflow-hidden" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex items-center gap-3 mb-8" }, [
                        createVNode("div", { class: "p-3 rounded-2xl bg-red-100 text-red-600" }, [
                          createVNode(unref(AlertCircle), { class: "h-6 w-6" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-bold" }, "Daftar Komplain Transaksi"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Kelola dan selesaikan sengketa antara Buyer & Seller.")
                        ])
                      ]),
                      createVNode("div", { class: "easy-table-wrapper" }, [
                        createVNode(_component_EasyDataTable, {
                          headers,
                          items: __props.disputes.data,
                          "hide-footer": "",
                          "border-cell": "",
                          "table-class-name": "customize-table",
                          "header-class-name": "customize-header"
                        }, {
                          "item-transaction": withCtx(({ transaction }) => [
                            createVNode("span", { class: "font-bold text-foreground" }, "#" + toDisplayString(transaction.reference_number), 1)
                          ]),
                          "item-user": withCtx(({ user }) => [
                            createVNode("div", { class: "py-2" }, [
                              createVNode("div", { class: "font-medium text-foreground" }, toDisplayString(user.name), 1),
                              createVNode("div", { class: "text-[10px] text-muted-foreground" }, toDisplayString(user.email), 1)
                            ])
                          ]),
                          "item-reason": withCtx(({ reason }) => [
                            createVNode("span", { class: "text-xs font-medium text-foreground" }, toDisplayString(reason === "not_delivered" ? "Barang Belum Sampai" : reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya"), 1)
                          ]),
                          "item-status": withCtx(({ status }) => [
                            createVNode("span", {
                              class: ["px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border", getStatusClass(status)]
                            }, toDisplayString(getStatusLabel(status)), 3)
                          ]),
                          "item-created_at": withCtx(({ created_at }) => [
                            createVNode("span", { class: "text-muted-foreground" }, toDisplayString(new Date(created_at).toLocaleDateString("id-ID")), 1)
                          ]),
                          "item-actions": withCtx((item) => [
                            createVNode("div", { class: "flex justify-end py-2" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.disputes.show", item.id),
                                class: "inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Detail "),
                                  createVNode(unref(ChevronRight), { class: "h-3 w-3" })
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ])
                          ]),
                          "empty-message": withCtx(() => [
                            createVNode("div", { class: "py-20 text-center text-muted-foreground" }, [
                              createVNode(unref(Clock), { class: "h-12 w-12 mx-auto mb-4 opacity-20" }),
                              createVNode("p", { class: "font-medium" }, "Tidak ada komplain yang perlu diproses.")
                            ])
                          ]),
                          _: 1
                        }, 8, ["items"])
                      ]),
                      createVNode("div", { class: "mt-8" }, [
                        createVNode(_sfc_main$2, {
                          links: __props.disputes.links
                        }, null, 8, ["links"])
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Disputes/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-812b0935"]]);
export {
  Index as default
};
