import { unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-BDlcmPtd.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Pagination-brVOzIHZ.js";
import { AlertCircle, ChevronRight, Clock } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./onlineState-BAtS9nBF.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    disputes: Object
  },
  setup(__props) {
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
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Komplain" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Pusat Resolusi &amp; Komplain</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Pusat Resolusi & Komplain")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center gap-3 mb-8"${_scopeId}><div class="p-3 rounded-2xl bg-red-100 text-red-600"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Daftar Komplain Transaksi</h3><p class="text-sm text-muted-foreground"${_scopeId}>Kelola dan selesaikan sengketa antara Buyer &amp; Seller.</p></div></div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Transaksi</th><th class="px-6 py-4"${_scopeId}>Pelapor</th><th class="px-6 py-4"${_scopeId}>Alasan</th><th class="px-6 py-4"${_scopeId}>Status</th><th class="px-6 py-4"${_scopeId}>Tanggal</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-border"${_scopeId}><!--[-->`);
            ssrRenderList(__props.disputes.data, (dispute) => {
              _push2(`<tr class="hover:bg-muted/30 transition-colors"${_scopeId}><td class="px-6 py-4 font-bold"${_scopeId}>#${ssrInterpolate(dispute.transaction.reference_number)}</td><td class="px-6 py-4"${_scopeId}><div class="font-medium text-foreground"${_scopeId}>${ssrInterpolate(dispute.user.name)}</div><div class="text-[10px] text-muted-foreground"${_scopeId}>${ssrInterpolate(dispute.user.email)}</div></td><td class="px-6 py-4"${_scopeId}><span class="text-xs font-medium"${_scopeId}>${ssrInterpolate(dispute.reason === "not_delivered" ? "Barang Belum Sampai" : dispute.reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : dispute.reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya")}</span></td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([getStatusClass(dispute.status), "px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border"])}"${_scopeId}>${ssrInterpolate(getStatusLabel(dispute.status))}</span></td><td class="px-6 py-4 text-muted-foreground"${_scopeId}>${ssrInterpolate(new Date(dispute.created_at).toLocaleDateString("id-ID"))}</td><td class="px-6 py-4 text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.disputes.show", dispute.id),
                class: "inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Detail `);
                    _push3(ssrRenderComponent(unref(ChevronRight), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" Detail "),
                      createVNode(unref(ChevronRight), { class: "h-3 w-3" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.disputes.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-6 py-20 text-center text-muted-foreground"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Clock), { class: "h-12 w-12 mx-auto mb-4 opacity-20" }, null, _parent2, _scopeId));
              _push2(`<p class="font-medium"${_scopeId}>Tidak ada komplain yang perlu diproses.</p></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div><div class="mt-8"${_scopeId}>`);
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
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full text-left text-sm" }, [
                          createVNode("thead", { class: "border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-4" }, "Transaksi"),
                              createVNode("th", { class: "px-6 py-4" }, "Pelapor"),
                              createVNode("th", { class: "px-6 py-4" }, "Alasan"),
                              createVNode("th", { class: "px-6 py-4" }, "Status"),
                              createVNode("th", { class: "px-6 py-4" }, "Tanggal"),
                              createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-border" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.disputes.data, (dispute) => {
                              return openBlock(), createBlock("tr", {
                                key: dispute.id,
                                class: "hover:bg-muted/30 transition-colors"
                              }, [
                                createVNode("td", { class: "px-6 py-4 font-bold" }, "#" + toDisplayString(dispute.transaction.reference_number), 1),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("div", { class: "font-medium text-foreground" }, toDisplayString(dispute.user.name), 1),
                                  createVNode("div", { class: "text-[10px] text-muted-foreground" }, toDisplayString(dispute.user.email), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("span", { class: "text-xs font-medium" }, toDisplayString(dispute.reason === "not_delivered" ? "Barang Belum Sampai" : dispute.reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : dispute.reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya"), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("span", {
                                    class: ["px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border", getStatusClass(dispute.status)]
                                  }, toDisplayString(getStatusLabel(dispute.status)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-muted-foreground" }, toDisplayString(new Date(dispute.created_at).toLocaleDateString("id-ID")), 1),
                                createVNode("td", { class: "px-6 py-4 text-right" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin.disputes.show", dispute.id),
                                    class: "inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Detail "),
                                      createVNode(unref(ChevronRight), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ])
                              ]);
                            }), 128)),
                            __props.disputes.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "6",
                                class: "px-6 py-20 text-center text-muted-foreground"
                              }, [
                                createVNode(unref(Clock), { class: "h-12 w-12 mx-auto mb-4 opacity-20" }),
                                createVNode("p", { class: "font-medium" }, "Tidak ada komplain yang perlu diproses.")
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ])
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
export {
  _sfc_main as default
};
