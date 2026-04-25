import { ref, watch, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./Pagination-brVOzIHZ.js";
import { _ as _sfc_main$4 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$5 } from "./SecondaryButton-BWOt3jtr.js";
import { _ as _sfc_main$6 } from "./DangerButton-Dpx20QNz.js";
import { _ as _sfc_main$2 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$8 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$7 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$9 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$a } from "./BackButton-DqmVU1VH.js";
import { LayoutDashboard, Users, Package, AlertCircle, CheckSquare, Ban, CheckCircle2, ArrowRight } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    pendingVerifications: Array,
    pendingVerificationsCount: Number,
    pendingProductsCount: Number,
    pendingDisputesCount: Number,
    totalUsersCount: Number,
    totalProductsCount: Number,
    products: Object,
    users: Object,
    disputes: Object,
    filters: Object
  },
  setup(__props) {
    const tab = ref(new URLSearchParams(window.location.search).get("tab") || "overview");
    watch(tab, (newTab) => {
      const url = new URL(window.location);
      url.searchParams.set("tab", newTab);
      window.history.pushState({}, "", url);
    });
    const headers = [
      { text: "User", value: "user" },
      { text: "Email", value: "email" },
      { text: "Tanggal Pengajuan", value: "created_at" },
      { text: "Aksi", value: "actions", width: 150 }
    ];
    const userHeaders = [
      { text: "Nama", value: "user" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Produk", value: "products_count" },
      { text: "Status", value: "status" },
      { text: "Aksi", value: "actions", width: 100 }
    ];
    const productHeaders = [
      { text: "Produk", value: "product" },
      { text: "Penjual", value: "seller" },
      { text: "Harga", value: "price" },
      { text: "Status", value: "status" },
      { text: "Aksi", value: "actions", width: 100 }
    ];
    const disputeHeaders = [
      { text: "Referensi", value: "reference" },
      { text: "Pelapor", value: "reporter" },
      { text: "Tipe", value: "type" },
      { text: "Status", value: "status" },
      { text: "Aksi", value: "actions", width: 100 }
    ];
    const selectedVerification = ref(null);
    const isRejectModalOpen = ref(false);
    const form = useForm({
      rejection_note: ""
    });
    const openReview = (verification) => {
      selectedVerification.value = verification;
    };
    const closeReview = () => {
      selectedVerification.value = null;
    };
    const approve = (verification) => {
      if (confirm("Apakah Anda yakin ingin menyetujui verifikasi ini?")) {
        useForm({}).post(route("admin.verifications.approve", verification.id), {
          onSuccess: () => closeReview()
        });
      }
    };
    const openRejectModal = () => {
      isRejectModalOpen.value = true;
    };
    const closeRejectModal = () => {
      isRejectModalOpen.value = false;
      form.reset();
    };
    const reject = () => {
      form.post(route("admin.verifications.reject", selectedVerification.value.id), {
        onSuccess: () => {
          closeRejectModal();
          closeReview();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EasyDataTable = resolveComponent("EasyDataTable");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Admin Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$a, { fallbackRoute: "home" }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground" data-v-7d059afd${_scopeId}> Admin Dashboard </h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(_sfc_main$a, { fallbackRoute: "home" }),
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, " Admin Dashboard ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-8" data-v-7d059afd${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-v-7d059afd${_scopeId}><div class="mb-8 flex flex-wrap items-center gap-2 rounded-2xl bg-muted p-1.5 shadow-inner sm:w-fit" data-v-7d059afd${_scopeId}><button class="${ssrRenderClass([tab.value === "overview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"])}" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Ringkasan </button><button class="${ssrRenderClass([tab.value === "users" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"])}" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Pengguna </button><button class="${ssrRenderClass([tab.value === "products" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"])}" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Package), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Produk </button><button class="${ssrRenderClass([tab.value === "disputes" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"])}" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Komplain </button></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "overview" ? null : { display: "none" })}" data-v-7d059afd${_scopeId}><div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" data-v-7d059afd${_scopeId}><button class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md text-left" data-v-7d059afd${_scopeId}><div class="flex items-center justify-between" data-v-7d059afd${_scopeId}><div data-v-7d059afd${_scopeId}><h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-v-7d059afd${_scopeId}>Total Pengguna</h3><p class="mt-2 text-3xl font-black text-foreground" data-v-7d059afd${_scopeId}>${ssrInterpolate(__props.totalUsersCount || 0)}</p></div><div class="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div></div></button><button class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md text-left" data-v-7d059afd${_scopeId}><div class="flex items-center justify-between" data-v-7d059afd${_scopeId}><div data-v-7d059afd${_scopeId}><h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-v-7d059afd${_scopeId}>Total Produk</h3><p class="mt-2 text-3xl font-black text-foreground" data-v-7d059afd${_scopeId}>${ssrInterpolate(__props.totalProductsCount || 0)}</p></div><div class="rounded-xl bg-blue-500/10 p-3 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Package), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div></div></button><button class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-amber-500 hover:shadow-md text-left" data-v-7d059afd${_scopeId}><div class="flex items-center justify-between" data-v-7d059afd${_scopeId}><div data-v-7d059afd${_scopeId}><h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-v-7d059afd${_scopeId}>Pending Moderasi</h3><p class="mt-2 text-3xl font-black text-amber-500" data-v-7d059afd${_scopeId}>${ssrInterpolate(__props.pendingProductsCount)}</p></div><div class="rounded-xl bg-amber-500/10 p-3 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div></div></button><button class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-red-500 hover:shadow-md text-left" data-v-7d059afd${_scopeId}><div class="flex items-center justify-between" data-v-7d059afd${_scopeId}><div data-v-7d059afd${_scopeId}><h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-v-7d059afd${_scopeId}>Komplain Aktif</h3><p class="mt-2 text-3xl font-black text-red-500" data-v-7d059afd${_scopeId}>${ssrInterpolate(__props.pendingDisputesCount || 0)}</p></div><div class="rounded-xl bg-red-500/10 p-3 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckSquare), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div></div></button></div><div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden" data-v-7d059afd${_scopeId}><div class="p-6" data-v-7d059afd${_scopeId}><h3 class="mb-4 text-lg font-bold text-foreground flex items-center gap-2" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckSquare), { class: "h-5 w-5 text-primary" }, null, _parent2, _scopeId));
            _push2(` Daftar Pengajuan Verifikasi Seller </h3><div class="easy-table-wrapper" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers,
              items: __props.pendingVerifications,
              "hide-footer": "",
              "border-cell": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-user": withCtx(({ user }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-medium text-foreground" data-v-7d059afd${_scopeId2}>${ssrInterpolate(user.name)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(user.name), 1)
                  ];
                }
              }),
              "item-email": withCtx(({ user }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-muted-foreground" data-v-7d059afd${_scopeId2}>${ssrInterpolate(user.email)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-muted-foreground" }, toDisplayString(user.email), 1)
                  ];
                }
              }),
              "item-created_at": withCtx(({ created_at }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-muted-foreground" data-v-7d059afd${_scopeId2}>${ssrInterpolate(new Date(created_at).toLocaleDateString("id-ID"))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-muted-foreground" }, toDisplayString(new Date(created_at).toLocaleDateString("id-ID")), 1)
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end py-2" data-v-7d059afd${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    onClick: ($event) => openReview(item)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Review KYC`);
                      } else {
                        return [
                          createTextVNode("Review KYC")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end py-2" }, [
                      createVNode(_sfc_main$2, {
                        onClick: ($event) => openReview(item)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Review KYC")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              "empty-message": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-12 text-center text-muted-foreground italic" data-v-7d059afd${_scopeId2}> Tidak ada pengajuan verifikasi yang sedang menunggu. </div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-12 text-center text-muted-foreground italic" }, " Tidak ada pengajuan verifikasi yang sedang menunggu. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "users" ? null : { display: "none" })}" data-v-7d059afd${_scopeId}><div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden" data-v-7d059afd${_scopeId}><div class="p-6" data-v-7d059afd${_scopeId}><div class="flex items-center justify-between mb-6" data-v-7d059afd${_scopeId}><h3 class="text-lg font-bold text-foreground flex items-center gap-2" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-5 w-5 text-primary" }, null, _parent2, _scopeId));
            _push2(` Manajemen Pengguna </h3></div><div class="easy-table-wrapper" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers: userHeaders,
              items: __props.users.data,
              "hide-footer": "",
              "border-cell": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-user": withCtx(({ name, profile }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3 py-2" data-v-7d059afd${_scopeId2}><div class="h-8 w-8 overflow-hidden rounded-full border border-border bg-muted" data-v-7d059afd${_scopeId2}>`);
                  if (profile == null ? void 0 : profile.avatar) {
                    _push3(`<img${ssrRenderAttr("src", `/storage/${profile.avatar}`)} class="h-full w-full object-cover" data-v-7d059afd${_scopeId2}>`);
                  } else {
                    _push3(`<div class="flex h-full w-full items-center justify-center text-xs font-bold text-primary" data-v-7d059afd${_scopeId2}>${ssrInterpolate(name.charAt(0))}</div>`);
                  }
                  _push3(`</div><span class="font-bold text-foreground" data-v-7d059afd${_scopeId2}>${ssrInterpolate(name)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3 py-2" }, [
                      createVNode("div", { class: "h-8 w-8 overflow-hidden rounded-full border border-border bg-muted" }, [
                        (profile == null ? void 0 : profile.avatar) ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `/storage/${profile.avatar}`,
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex h-full w-full items-center justify-center text-xs font-bold text-primary"
                        }, toDisplayString(name.charAt(0)), 1))
                      ]),
                      createVNode("span", { class: "font-bold text-foreground" }, toDisplayString(name), 1)
                    ])
                  ];
                }
              }),
              "item-role": withCtx(({ role }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass([role === "admin" ? "bg-red-50 text-red-600 border-red-200" : role === "seller" ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-slate-50 text-slate-600 border-slate-200", "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border"])}" data-v-7d059afd${_scopeId2}>${ssrInterpolate(role)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: ["px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border", role === "admin" ? "bg-red-50 text-red-600 border-red-200" : role === "seller" ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-slate-50 text-slate-600 border-slate-200"]
                    }, toDisplayString(role), 3)
                  ];
                }
              }),
              "item-status": withCtx(({ is_suspended }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (is_suspended) {
                    _push3(`<span class="text-red-500 font-bold flex items-center gap-1 text-xs" data-v-7d059afd${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Ban), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` Suspended </span>`);
                  } else {
                    _push3(`<span class="text-emerald-500 font-bold flex items-center gap-1 text-xs" data-v-7d059afd${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CheckCircle2), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` Active </span>`);
                  }
                } else {
                  return [
                    is_suspended ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-red-500 font-bold flex items-center gap-1 text-xs"
                    }, [
                      createVNode(unref(Ban), { class: "h-3 w-3" }),
                      createTextVNode(" Suspended ")
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-emerald-500 font-bold flex items-center gap-1 text-xs"
                    }, [
                      createVNode(unref(CheckCircle2), { class: "h-3 w-3" }),
                      createTextVNode(" Active ")
                    ]))
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin.users.index", { search: item.email }),
                    class: "text-primary hover:underline font-bold text-xs"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Detail `);
                      } else {
                        return [
                          createTextVNode(" Detail ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.users.index", { search: item.email }),
                      class: "text-primary hover:underline font-bold text-xs"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Detail ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-6" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              links: __props.users.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "products" ? null : { display: "none" })}" data-v-7d059afd${_scopeId}><div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden" data-v-7d059afd${_scopeId}><div class="p-6" data-v-7d059afd${_scopeId}><div class="flex items-center justify-between mb-6" data-v-7d059afd${_scopeId}><h3 class="text-lg font-bold text-foreground flex items-center gap-2" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Package), { class: "h-5 w-5 text-blue-500" }, null, _parent2, _scopeId));
            _push2(` Moderasi Produk </h3></div><div class="easy-table-wrapper" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers: productHeaders,
              items: __props.products.data,
              "hide-footer": "",
              "border-cell": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-product": withCtx(({ title, images }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3 py-2" data-v-7d059afd${_scopeId2}><div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" data-v-7d059afd${_scopeId2}>`);
                  if ((images == null ? void 0 : images.length) > 0) {
                    _push3(`<img${ssrRenderAttr("src", `/storage/${images[0].image_path}`)} class="h-full w-full object-cover" data-v-7d059afd${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><span class="font-bold text-foreground truncate max-w-[200px]" data-v-7d059afd${_scopeId2}>${ssrInterpolate(title)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3 py-2" }, [
                      createVNode("div", { class: "h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" }, [
                        (images == null ? void 0 : images.length) > 0 ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `/storage/${images[0].image_path}`,
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"])) : createCommentVNode("", true)
                      ]),
                      createVNode("span", { class: "font-bold text-foreground truncate max-w-[200px]" }, toDisplayString(title), 1)
                    ])
                  ];
                }
              }),
              "item-seller": withCtx(({ user }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-sm text-muted-foreground" data-v-7d059afd${_scopeId2}>${ssrInterpolate(user.name)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(user.name), 1)
                  ];
                }
              }),
              "item-price": withCtx(({ price }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold text-foreground" data-v-7d059afd${_scopeId2}>Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(price))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold text-foreground" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(price)), 1)
                  ];
                }
              }),
              "item-status": withCtx(({ status }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass([{
                    "bg-amber-50 text-amber-600 border-amber-200": status === "pending",
                    "bg-emerald-50 text-emerald-600 border-emerald-200": status === "active",
                    "bg-red-50 text-red-600 border-red-200": ["rejected", "banned"].includes(status)
                  }, "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border"])}" data-v-7d059afd${_scopeId2}>${ssrInterpolate(status)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: ["px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border", {
                        "bg-amber-50 text-amber-600 border-amber-200": status === "pending",
                        "bg-emerald-50 text-emerald-600 border-emerald-200": status === "active",
                        "bg-red-50 text-red-600 border-red-200": ["rejected", "banned"].includes(status)
                      }]
                    }, toDisplayString(status), 3)
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin.products.index", { search: item.title }),
                    class: "text-primary hover:underline font-bold text-xs"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Kelola `);
                      } else {
                        return [
                          createTextVNode(" Kelola ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.products.index", { search: item.title }),
                      class: "text-primary hover:underline font-bold text-xs"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Kelola ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-6" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              links: __props.products.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "disputes" ? null : { display: "none" })}" data-v-7d059afd${_scopeId}><div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden" data-v-7d059afd${_scopeId}><div class="p-6" data-v-7d059afd${_scopeId}><div class="flex items-center justify-between mb-6" data-v-7d059afd${_scopeId}><h3 class="text-lg font-bold text-foreground flex items-center gap-2" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-5 w-5 text-red-500" }, null, _parent2, _scopeId));
            _push2(` Pusat Resolusi (Disputes) </h3></div><div class="easy-table-wrapper" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers: disputeHeaders,
              items: __props.disputes.data,
              "hide-footer": "",
              "border-cell": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-reference": withCtx(({ transaction }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold text-foreground" data-v-7d059afd${_scopeId2}>#${ssrInterpolate(transaction.reference_number)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold text-foreground" }, "#" + toDisplayString(transaction.reference_number), 1)
                  ];
                }
              }),
              "item-reporter": withCtx(({ user }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-sm text-muted-foreground" data-v-7d059afd${_scopeId2}>${ssrInterpolate(user.name)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(user.name), 1)
                  ];
                }
              }),
              "item-type": withCtx(({ reason }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-xs text-foreground italic" data-v-7d059afd${_scopeId2}>&quot;${ssrInterpolate(reason)}&quot;</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-xs text-foreground italic" }, '"' + toDisplayString(reason) + '"', 1)
                  ];
                }
              }),
              "item-status": withCtx(({ status }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass([status === "pending" ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-600 border-emerald-200", "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border"])}" data-v-7d059afd${_scopeId2}>${ssrInterpolate(status)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: ["px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border", status === "pending" ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"]
                    }, toDisplayString(status), 3)
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin.disputes.show", item.id),
                    class: "text-primary hover:underline font-bold text-xs flex items-center gap-1"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Resolusi `);
                        _push4(ssrRenderComponent(unref(ArrowRight), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Resolusi "),
                          createVNode(unref(ArrowRight), { class: "h-3 w-3" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.disputes.show", item.id),
                      class: "text-primary hover:underline font-bold text-xs flex items-center gap-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Resolusi "),
                        createVNode(unref(ArrowRight), { class: "h-3 w-3" })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-6" data-v-7d059afd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              links: __props.disputes.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              show: !!selectedVerification.value,
              onClose: closeReview,
              maxWidth: "2xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
                if (_push3) {
                  _push3(`<div class="p-6" data-v-7d059afd${_scopeId2}><header class="mb-6" data-v-7d059afd${_scopeId2}><h2 class="text-xl font-bold text-foreground" data-v-7d059afd${_scopeId2}> Review Verifikasi: ${ssrInterpolate((_a = selectedVerification.value) == null ? void 0 : _a.user.name)}</h2><p class="text-sm text-muted-foreground" data-v-7d059afd${_scopeId2}>Silakan periksa dokumen berikut dengan teliti.</p></header><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-7d059afd${_scopeId2}><div class="space-y-2" data-v-7d059afd${_scopeId2}><h4 class="text-sm font-semibold text-foreground uppercase tracking-wider" data-v-7d059afd${_scopeId2}>Foto KTP</h4><div class="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" data-v-7d059afd${_scopeId2}><img${ssrRenderAttr("src", "/storage/" + ((_b = selectedVerification.value) == null ? void 0 : _b.ktp_image_path))} class="absolute inset-0 h-full w-full object-cover" data-v-7d059afd${_scopeId2}><a${ssrRenderAttr("src", "/storage/" + ((_c = selectedVerification.value) == null ? void 0 : _c.ktp_image_path))} target="_blank" class="absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors" data-v-7d059afd${_scopeId2}> Buka Fullsize </a></div></div><div class="space-y-2" data-v-7d059afd${_scopeId2}><h4 class="text-sm font-semibold text-foreground uppercase tracking-wider" data-v-7d059afd${_scopeId2}>Foto Wajah</h4><div class="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" data-v-7d059afd${_scopeId2}><img${ssrRenderAttr("src", "/storage/" + ((_d = selectedVerification.value) == null ? void 0 : _d.face_image_path))} class="absolute inset-0 h-full w-full object-cover" data-v-7d059afd${_scopeId2}><a${ssrRenderAttr("src", "/storage/" + ((_e = selectedVerification.value) == null ? void 0 : _e.face_image_path))} target="_blank" class="absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors" data-v-7d059afd${_scopeId2}> Buka Fullsize </a></div></div></div><div class="mt-8 flex justify-end gap-3 border-t border-border pt-6" data-v-7d059afd${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, { onClick: closeReview }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tutup`);
                      } else {
                        return [
                          createTextVNode("Tutup")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, { onClick: openRejectModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tolak`);
                      } else {
                        return [
                          createTextVNode("Tolak")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    onClick: ($event) => approve(selectedVerification.value)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Setujui Verifikasi`);
                      } else {
                        return [
                          createTextVNode("Setujui Verifikasi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("header", { class: "mb-6" }, [
                        createVNode("h2", { class: "text-xl font-bold text-foreground" }, " Review Verifikasi: " + toDisplayString((_f = selectedVerification.value) == null ? void 0 : _f.user.name), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Silakan periksa dokumen berikut dengan teliti.")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground uppercase tracking-wider" }, "Foto KTP"),
                          createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" }, [
                            createVNode("img", {
                              src: "/storage/" + ((_g = selectedVerification.value) == null ? void 0 : _g.ktp_image_path),
                              class: "absolute inset-0 h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("a", {
                              src: "/storage/" + ((_h = selectedVerification.value) == null ? void 0 : _h.ktp_image_path),
                              target: "_blank",
                              class: "absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                            }, " Buka Fullsize ", 8, ["src"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground uppercase tracking-wider" }, "Foto Wajah"),
                          createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" }, [
                            createVNode("img", {
                              src: "/storage/" + ((_i = selectedVerification.value) == null ? void 0 : _i.face_image_path),
                              class: "absolute inset-0 h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("a", {
                              src: "/storage/" + ((_j = selectedVerification.value) == null ? void 0 : _j.face_image_path),
                              target: "_blank",
                              class: "absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                            }, " Buka Fullsize ", 8, ["src"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3 border-t border-border pt-6" }, [
                        createVNode(_sfc_main$5, { onClick: closeReview }, {
                          default: withCtx(() => [
                            createTextVNode("Tutup")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$6, { onClick: openRejectModal }, {
                          default: withCtx(() => [
                            createTextVNode("Tolak")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, {
                          onClick: ($event) => approve(selectedVerification.value)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Setujui Verifikasi")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              show: isRejectModalOpen.value,
              onClose: closeRejectModal,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6" data-v-7d059afd${_scopeId2}><h2 class="text-lg font-bold text-foreground" data-v-7d059afd${_scopeId2}> Konfirmasi Penolakan </h2><p class="mt-1 text-sm text-muted-foreground" data-v-7d059afd${_scopeId2}> Berikan alasan mengapa pengajuan verifikasi ini ditolak agar user dapat memperbaikinya. </p><div class="mt-6" data-v-7d059afd${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    for: "rejection_note",
                    value: "Alasan Penolakan"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    id: "rejection_note",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).rejection_note,
                    "onUpdate:modelValue": ($event) => unref(form).rejection_note = $event,
                    placeholder: "Contoh: Foto KTP buram atau tidak sesuai.",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$9, {
                    class: "mt-2",
                    message: unref(form).errors.rejection_note
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-8 flex justify-end gap-3" data-v-7d059afd${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, { onClick: closeRejectModal }, {
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
                    onClick: reject,
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Tolak Sekarang `);
                      } else {
                        return [
                          createTextVNode(" Tolak Sekarang ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-lg font-bold text-foreground" }, " Konfirmasi Penolakan "),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Berikan alasan mengapa pengajuan verifikasi ini ditolak agar user dapat memperbaikinya. "),
                      createVNode("div", { class: "mt-6" }, [
                        createVNode(_sfc_main$7, {
                          for: "rejection_note",
                          value: "Alasan Penolakan"
                        }),
                        createVNode(_sfc_main$8, {
                          id: "rejection_note",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).rejection_note,
                          "onUpdate:modelValue": ($event) => unref(form).rejection_note = $event,
                          placeholder: "Contoh: Foto KTP buram atau tidak sesuai.",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$9, {
                          class: "mt-2",
                          message: unref(form).errors.rejection_note
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                        createVNode(_sfc_main$5, { onClick: closeRejectModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$6, {
                          onClick: reject,
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tolak Sekarang ")
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
              createVNode("div", { class: "py-8" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8 flex flex-wrap items-center gap-2 rounded-2xl bg-muted p-1.5 shadow-inner sm:w-fit" }, [
                    createVNode("button", {
                      onClick: ($event) => tab.value = "overview",
                      class: [tab.value === "overview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"]
                    }, [
                      createVNode(unref(LayoutDashboard), { class: "h-4 w-4" }),
                      createTextVNode(" Ringkasan ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "users",
                      class: [tab.value === "users" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"]
                    }, [
                      createVNode(unref(Users), { class: "h-4 w-4" }),
                      createTextVNode(" Pengguna ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "products",
                      class: [tab.value === "products" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"]
                    }, [
                      createVNode(unref(Package), { class: "h-4 w-4" }),
                      createTextVNode(" Produk ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "disputes",
                      class: [tab.value === "disputes" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"]
                    }, [
                      createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                      createTextVNode(" Komplain ")
                    ], 10, ["onClick"])
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, [
                      createVNode("button", {
                        onClick: ($event) => tab.value = "users",
                        class: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md text-left"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xs font-bold uppercase tracking-wider text-muted-foreground" }, "Total Pengguna"),
                            createVNode("p", { class: "mt-2 text-3xl font-black text-foreground" }, toDisplayString(__props.totalUsersCount || 0), 1)
                          ]),
                          createVNode("div", { class: "rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors" }, [
                            createVNode(unref(Users), { class: "h-6 w-6" })
                          ])
                        ])
                      ], 8, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => tab.value = "products",
                        class: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md text-left"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xs font-bold uppercase tracking-wider text-muted-foreground" }, "Total Produk"),
                            createVNode("p", { class: "mt-2 text-3xl font-black text-foreground" }, toDisplayString(__props.totalProductsCount || 0), 1)
                          ]),
                          createVNode("div", { class: "rounded-xl bg-blue-500/10 p-3 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors" }, [
                            createVNode(unref(Package), { class: "h-6 w-6" })
                          ])
                        ])
                      ], 8, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => tab.value = "products",
                        class: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-amber-500 hover:shadow-md text-left"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xs font-bold uppercase tracking-wider text-muted-foreground" }, "Pending Moderasi"),
                            createVNode("p", { class: "mt-2 text-3xl font-black text-amber-500" }, toDisplayString(__props.pendingProductsCount), 1)
                          ]),
                          createVNode("div", { class: "rounded-xl bg-amber-500/10 p-3 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors" }, [
                            createVNode(unref(AlertCircle), { class: "h-6 w-6" })
                          ])
                        ])
                      ], 8, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => tab.value = "disputes",
                        class: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-red-500 hover:shadow-md text-left"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xs font-bold uppercase tracking-wider text-muted-foreground" }, "Komplain Aktif"),
                            createVNode("p", { class: "mt-2 text-3xl font-black text-red-500" }, toDisplayString(__props.pendingDisputesCount || 0), 1)
                          ]),
                          createVNode("div", { class: "rounded-xl bg-red-500/10 p-3 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors" }, [
                            createVNode(unref(CheckSquare), { class: "h-6 w-6" })
                          ])
                        ])
                      ], 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl overflow-hidden" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "mb-4 text-lg font-bold text-foreground flex items-center gap-2" }, [
                          createVNode(unref(CheckSquare), { class: "h-5 w-5 text-primary" }),
                          createTextVNode(" Daftar Pengajuan Verifikasi Seller ")
                        ]),
                        createVNode("div", { class: "easy-table-wrapper" }, [
                          createVNode(_component_EasyDataTable, {
                            headers,
                            items: __props.pendingVerifications,
                            "hide-footer": "",
                            "border-cell": "",
                            "table-class-name": "customize-table",
                            "header-class-name": "customize-header"
                          }, {
                            "item-user": withCtx(({ user }) => [
                              createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(user.name), 1)
                            ]),
                            "item-email": withCtx(({ user }) => [
                              createVNode("span", { class: "text-muted-foreground" }, toDisplayString(user.email), 1)
                            ]),
                            "item-created_at": withCtx(({ created_at }) => [
                              createVNode("span", { class: "text-muted-foreground" }, toDisplayString(new Date(created_at).toLocaleDateString("id-ID")), 1)
                            ]),
                            "item-actions": withCtx((item) => [
                              createVNode("div", { class: "flex justify-end py-2" }, [
                                createVNode(_sfc_main$2, {
                                  onClick: ($event) => openReview(item)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Review KYC")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ]),
                            "empty-message": withCtx(() => [
                              createVNode("div", { class: "py-12 text-center text-muted-foreground italic" }, " Tidak ada pengajuan verifikasi yang sedang menunggu. ")
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ])
                      ])
                    ])
                  ], 512), [
                    [vShow, tab.value === "overview"]
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl overflow-hidden" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                          createVNode("h3", { class: "text-lg font-bold text-foreground flex items-center gap-2" }, [
                            createVNode(unref(Users), { class: "h-5 w-5 text-primary" }),
                            createTextVNode(" Manajemen Pengguna ")
                          ])
                        ]),
                        createVNode("div", { class: "easy-table-wrapper" }, [
                          createVNode(_component_EasyDataTable, {
                            headers: userHeaders,
                            items: __props.users.data,
                            "hide-footer": "",
                            "border-cell": "",
                            "table-class-name": "customize-table",
                            "header-class-name": "customize-header"
                          }, {
                            "item-user": withCtx(({ name, profile }) => [
                              createVNode("div", { class: "flex items-center gap-3 py-2" }, [
                                createVNode("div", { class: "h-8 w-8 overflow-hidden rounded-full border border-border bg-muted" }, [
                                  (profile == null ? void 0 : profile.avatar) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${profile.avatar}`,
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex h-full w-full items-center justify-center text-xs font-bold text-primary"
                                  }, toDisplayString(name.charAt(0)), 1))
                                ]),
                                createVNode("span", { class: "font-bold text-foreground" }, toDisplayString(name), 1)
                              ])
                            ]),
                            "item-role": withCtx(({ role }) => [
                              createVNode("span", {
                                class: ["px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border", role === "admin" ? "bg-red-50 text-red-600 border-red-200" : role === "seller" ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-slate-50 text-slate-600 border-slate-200"]
                              }, toDisplayString(role), 3)
                            ]),
                            "item-status": withCtx(({ is_suspended }) => [
                              is_suspended ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-red-500 font-bold flex items-center gap-1 text-xs"
                              }, [
                                createVNode(unref(Ban), { class: "h-3 w-3" }),
                                createTextVNode(" Suspended ")
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-emerald-500 font-bold flex items-center gap-1 text-xs"
                              }, [
                                createVNode(unref(CheckCircle2), { class: "h-3 w-3" }),
                                createTextVNode(" Active ")
                              ]))
                            ]),
                            "item-actions": withCtx((item) => [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.users.index", { search: item.email }),
                                class: "text-primary hover:underline font-bold text-xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Detail ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode(_sfc_main$3, {
                            links: __props.users.links
                          }, null, 8, ["links"])
                        ])
                      ])
                    ])
                  ], 512), [
                    [vShow, tab.value === "users"]
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl overflow-hidden" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                          createVNode("h3", { class: "text-lg font-bold text-foreground flex items-center gap-2" }, [
                            createVNode(unref(Package), { class: "h-5 w-5 text-blue-500" }),
                            createTextVNode(" Moderasi Produk ")
                          ])
                        ]),
                        createVNode("div", { class: "easy-table-wrapper" }, [
                          createVNode(_component_EasyDataTable, {
                            headers: productHeaders,
                            items: __props.products.data,
                            "hide-footer": "",
                            "border-cell": "",
                            "table-class-name": "customize-table",
                            "header-class-name": "customize-header"
                          }, {
                            "item-product": withCtx(({ title, images }) => [
                              createVNode("div", { class: "flex items-center gap-3 py-2" }, [
                                createVNode("div", { class: "h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" }, [
                                  (images == null ? void 0 : images.length) > 0 ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${images[0].image_path}`,
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : createCommentVNode("", true)
                                ]),
                                createVNode("span", { class: "font-bold text-foreground truncate max-w-[200px]" }, toDisplayString(title), 1)
                              ])
                            ]),
                            "item-seller": withCtx(({ user }) => [
                              createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(user.name), 1)
                            ]),
                            "item-price": withCtx(({ price }) => [
                              createVNode("span", { class: "font-bold text-foreground" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(price)), 1)
                            ]),
                            "item-status": withCtx(({ status }) => [
                              createVNode("span", {
                                class: ["px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border", {
                                  "bg-amber-50 text-amber-600 border-amber-200": status === "pending",
                                  "bg-emerald-50 text-emerald-600 border-emerald-200": status === "active",
                                  "bg-red-50 text-red-600 border-red-200": ["rejected", "banned"].includes(status)
                                }]
                              }, toDisplayString(status), 3)
                            ]),
                            "item-actions": withCtx((item) => [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.products.index", { search: item.title }),
                                class: "text-primary hover:underline font-bold text-xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Kelola ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode(_sfc_main$3, {
                            links: __props.products.links
                          }, null, 8, ["links"])
                        ])
                      ])
                    ])
                  ], 512), [
                    [vShow, tab.value === "products"]
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "bg-card border border-border shadow sm:rounded-2xl overflow-hidden" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                          createVNode("h3", { class: "text-lg font-bold text-foreground flex items-center gap-2" }, [
                            createVNode(unref(AlertCircle), { class: "h-5 w-5 text-red-500" }),
                            createTextVNode(" Pusat Resolusi (Disputes) ")
                          ])
                        ]),
                        createVNode("div", { class: "easy-table-wrapper" }, [
                          createVNode(_component_EasyDataTable, {
                            headers: disputeHeaders,
                            items: __props.disputes.data,
                            "hide-footer": "",
                            "border-cell": "",
                            "table-class-name": "customize-table",
                            "header-class-name": "customize-header"
                          }, {
                            "item-reference": withCtx(({ transaction }) => [
                              createVNode("span", { class: "font-bold text-foreground" }, "#" + toDisplayString(transaction.reference_number), 1)
                            ]),
                            "item-reporter": withCtx(({ user }) => [
                              createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(user.name), 1)
                            ]),
                            "item-type": withCtx(({ reason }) => [
                              createVNode("span", { class: "text-xs text-foreground italic" }, '"' + toDisplayString(reason) + '"', 1)
                            ]),
                            "item-status": withCtx(({ status }) => [
                              createVNode("span", {
                                class: ["px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border", status === "pending" ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"]
                              }, toDisplayString(status), 3)
                            ]),
                            "item-actions": withCtx((item) => [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.disputes.show", item.id),
                                class: "text-primary hover:underline font-bold text-xs flex items-center gap-1"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Resolusi "),
                                  createVNode(unref(ArrowRight), { class: "h-3 w-3" })
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode(_sfc_main$3, {
                            links: __props.disputes.links
                          }, null, 8, ["links"])
                        ])
                      ])
                    ])
                  ], 512), [
                    [vShow, tab.value === "disputes"]
                  ])
                ])
              ]),
              createVNode(_sfc_main$4, {
                show: !!selectedVerification.value,
                onClose: closeReview,
                maxWidth: "2xl"
              }, {
                default: withCtx(() => {
                  var _a, _b, _c, _d, _e;
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("header", { class: "mb-6" }, [
                        createVNode("h2", { class: "text-xl font-bold text-foreground" }, " Review Verifikasi: " + toDisplayString((_a = selectedVerification.value) == null ? void 0 : _a.user.name), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Silakan periksa dokumen berikut dengan teliti.")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground uppercase tracking-wider" }, "Foto KTP"),
                          createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" }, [
                            createVNode("img", {
                              src: "/storage/" + ((_b = selectedVerification.value) == null ? void 0 : _b.ktp_image_path),
                              class: "absolute inset-0 h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("a", {
                              src: "/storage/" + ((_c = selectedVerification.value) == null ? void 0 : _c.ktp_image_path),
                              target: "_blank",
                              class: "absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                            }, " Buka Fullsize ", 8, ["src"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground uppercase tracking-wider" }, "Foto Wajah"),
                          createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted" }, [
                            createVNode("img", {
                              src: "/storage/" + ((_d = selectedVerification.value) == null ? void 0 : _d.face_image_path),
                              class: "absolute inset-0 h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("a", {
                              src: "/storage/" + ((_e = selectedVerification.value) == null ? void 0 : _e.face_image_path),
                              target: "_blank",
                              class: "absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                            }, " Buka Fullsize ", 8, ["src"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3 border-t border-border pt-6" }, [
                        createVNode(_sfc_main$5, { onClick: closeReview }, {
                          default: withCtx(() => [
                            createTextVNode("Tutup")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$6, { onClick: openRejectModal }, {
                          default: withCtx(() => [
                            createTextVNode("Tolak")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, {
                          onClick: ($event) => approve(selectedVerification.value)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Setujui Verifikasi")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }),
                _: 1
              }, 8, ["show"]),
              createVNode(_sfc_main$4, {
                show: isRejectModalOpen.value,
                onClose: closeRejectModal,
                maxWidth: "md"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("h2", { class: "text-lg font-bold text-foreground" }, " Konfirmasi Penolakan "),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Berikan alasan mengapa pengajuan verifikasi ini ditolak agar user dapat memperbaikinya. "),
                    createVNode("div", { class: "mt-6" }, [
                      createVNode(_sfc_main$7, {
                        for: "rejection_note",
                        value: "Alasan Penolakan"
                      }),
                      createVNode(_sfc_main$8, {
                        id: "rejection_note",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).rejection_note,
                        "onUpdate:modelValue": ($event) => unref(form).rejection_note = $event,
                        placeholder: "Contoh: Foto KTP buram atau tidak sesuai.",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$9, {
                        class: "mt-2",
                        message: unref(form).errors.rejection_note
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mt-8 flex justify-end gap-3" }, [
                      createVNode(_sfc_main$5, { onClick: closeRejectModal }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$6, {
                        onClick: reject,
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tolak Sekarang ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ])
                ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d059afd"]]);
export {
  Dashboard as default
};
