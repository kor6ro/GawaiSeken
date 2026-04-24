import { ref, watch, shallowRef, resolveComponent, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, Fragment, toDisplayString, createCommentVNode, withDirectives, vShow, resolveDynamicComponent, isRef, renderList, withModifiers, vModelText, Transition, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList, ssrRenderVNode, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head, Link, router, usePage } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import { useIntersectionObserver } from "@vueuse/core";
import { LayoutDashboard, ShoppingBag, Tag, Settings, CreditCard, Clock, Package, Plus, CheckCircle, Image, Edit3, Trash2, Truck, Users, AlertTriangle, ChevronUp, ChevronDown, CheckCircle2, XCircle, Calendar, X } from "lucide-vue-next";
import { _ as _sfc_main$9 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$4 } from "./SecondaryButton-BWOt3jtr.js";
import { _ as _sfc_main$2 } from "./DangerButton-Dpx20QNz.js";
import { _ as _sfc_main$7 } from "./TextInput-Cpy3OAqn.js";
import { a as _sfc_main$5, _ as _sfc_main$6 } from "./InputError-DDbcJ_iI.js";
import { _ as _sfc_main$a } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$3 } from "./Pagination-brVOzIHZ.js";
import { _ as _sfc_main$8 } from "./AddressForm-UV_w8wYu.js";
import { Cropper } from "vue-advanced-cropper";
/* empty css               */
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: Object,
    productsCount: Number,
    transactionsCount: Number,
    unreadMessagesCount: Number,
    totalRevenue: Number,
    pendingOrders: Number,
    myProducts: Object,
    transactions: Object,
    negotiations: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const props = __props;
    const tab = ref(new URLSearchParams(window.location.search).get("tab") || "overview");
    const tabSettings = ref("store");
    const loading = ref(false);
    watch(tab, (newTab) => {
      const url = new URL(window.location);
      url.searchParams.set("tab", newTab);
      window.history.pushState({}, "", url);
    });
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
      var _a2;
      const colorMap = {
        amber: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
        green: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400",
        red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400",
        indigo: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400",
        slate: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400"
      };
      return colorMap[(_a2 = statusConfig[status]) == null ? void 0 : _a2.color] ?? colorMap.slate;
    };
    const allMyProducts = shallowRef([...props.myProducts.data]);
    const nextUrl = ref(props.myProducts.next_page_url);
    const loadMoreTrigger = ref(null);
    const loadMore = async () => {
      if (!nextUrl.value || loading.value || tab.value !== "overview") return;
      loading.value = true;
      try {
        const response = await axios.get(nextUrl.value, {
          headers: {
            "X-Inertia": "true",
            "X-Inertia-Version": usePage().version,
            "X-Inertia-Partial-Component": "Dashboard",
            "X-Inertia-Partial-Data": "myProducts"
          }
        });
        const newProducts = response.data.props.myProducts;
        allMyProducts.value = [...allMyProducts.value, ...newProducts.data];
        nextUrl.value = newProducts.next_page_url;
      } catch (error) {
        console.error("Error loading more dashboard products:", error);
      } finally {
        loading.value = false;
      }
    };
    useIntersectionObserver(
      loadMoreTrigger,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px 0px" }
    );
    watch(
      () => props.myProducts,
      (newVal) => {
        if (newVal.current_page === 1) {
          allMyProducts.value = [...newVal.data];
        }
        nextUrl.value = newVal.next_page_url;
      },
      { deep: false }
    );
    const confirmProductDeletion = ref(false);
    const productToDelete = ref(null);
    const deleteForm = useForm({});
    const deleteProduct = () => {
      deleteForm.delete(route("products.destroy", productToDelete.value.slug), {
        onSuccess: () => closeModal()
      });
    };
    const confirmDeletion = (product) => {
      productToDelete.value = product;
      confirmProductDeletion.value = true;
    };
    const closeModal = () => {
      confirmProductDeletion.value = false;
      productToDelete.value = null;
    };
    const toggleStatus = (product) => {
      router.patch(
        route("products.toggle-status", product.id),
        {},
        {
          preserveScroll: true
        }
      );
    };
    const storeForm = useForm({
      store_name: ((_a = props.user.profile) == null ? void 0 : _a.store_name) || props.user.name,
      store_bio: ((_b = props.user.profile) == null ? void 0 : _b.store_bio) || "",
      store_address: ((_c = props.user.profile) == null ? void 0 : _c.store_address) || "",
      store_landmark: ((_d = props.user.profile) == null ? void 0 : _d.store_landmark) || "",
      store_province: ((_e = props.user.profile) == null ? void 0 : _e.store_province) || "",
      store_city: ((_f = props.user.profile) == null ? void 0 : _f.store_city) || "",
      store_district: ((_g = props.user.profile) == null ? void 0 : _g.store_district) || "",
      store_village: ((_h = props.user.profile) == null ? void 0 : _h.store_village) || "",
      store_logo: null
    });
    const personalForm = useForm({
      name: props.user.name,
      email: props.user.email,
      phone: ((_i = props.user.profile) == null ? void 0 : _i.phone) || "",
      address: ((_j = props.user.profile) == null ? void 0 : _j.address) || "",
      landmark: ((_k = props.user.profile) == null ? void 0 : _k.landmark) || "",
      province: ((_l = props.user.profile) == null ? void 0 : _l.province) || "",
      city: ((_m = props.user.profile) == null ? void 0 : _m.city) || "",
      district: ((_n = props.user.profile) == null ? void 0 : _n.district) || "",
      village: ((_o = props.user.profile) == null ? void 0 : _o.village) || "",
      bio: ((_p = props.user.profile) == null ? void 0 : _p.bio) || "",
      date_of_birth: ((_q = props.user.profile) == null ? void 0 : _q.date_of_birth) || "",
      gender: ((_r = props.user.profile) == null ? void 0 : _r.gender) || "",
      avatar: null
    });
    const photoPreview = ref(null);
    const personalPhotoPreview = ref(null);
    const photoInput = ref(null);
    const personalPhotoInput = ref(null);
    const cropModalOpen = ref(false);
    const imageToCrop = ref(null);
    const cropper = ref(null);
    const currentCropTarget = ref("store");
    const updatePhotoPreview = (target = "store") => {
      const input = target === "store" ? photoInput.value : personalPhotoInput.value;
      const photo = input.files[0];
      if (!photo) return;
      input.value = "";
      currentCropTarget.value = target;
      const reader = new FileReader();
      reader.onload = (e) => {
        imageToCrop.value = e.target.result;
        cropModalOpen.value = true;
      };
      reader.readAsDataURL(photo);
    };
    const cancelCrop = () => {
      cropModalOpen.value = false;
      imageToCrop.value = null;
    };
    const applyCrop = () => {
      if (!cropper.value) return;
      const { canvas } = cropper.value.getResult();
      if (canvas) {
        if (currentCropTarget.value === "store") {
          photoPreview.value = canvas.toDataURL();
        } else {
          personalPhotoPreview.value = canvas.toDataURL();
        }
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], currentCropTarget.value === "store" ? "store_logo.jpg" : "avatar.jpg", {
              type: "image/jpeg"
            });
            if (currentCropTarget.value === "store") {
              storeForm.store_logo = file;
            } else {
              personalForm.avatar = file;
            }
            cropModalOpen.value = false;
            imageToCrop.value = null;
          },
          "image/jpeg",
          0.9
        );
      }
    };
    const updateStoreSettings = () => {
      storeForm.transform((data) => ({
        ...data,
        _method: "PATCH"
      })).post(route("store.update"), {
        forceFormData: true,
        preserveScroll: true
      });
    };
    const updatePersonalProfile = () => {
      personalForm.transform((data) => ({
        ...data,
        _method: "PATCH"
      })).post(route("profile.update"), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    };
    const handleSettingsSubmit = () => {
      if (tabSettings.value === "store") {
        updateStoreSettings();
      } else {
        updatePersonalProfile();
      }
    };
    const selectedDispute = ref(null);
    const showDisputeModal = ref(false);
    const openDisputeDetail = (transaction) => {
      selectedDispute.value = transaction.dispute;
      showDisputeModal.value = true;
    };
    const getStatusLabel = (status) => {
      const labels = {
        pending: "Menunggu Pembayaran",
        paid: "Dibayar — Dalam Escrow",
        processing: "Diproses Seller",
        shipped: "Dikirim",
        delivered: "Diterima Buyer",
        completed: "Selesai ✓",
        disputed: "Sengketa",
        canceled: "Dibatalkan",
        cod_requested: "COD — Tunggu Konfirmasi",
        cod_confirmed: "COD — Jadwal Dikonfirmasi"
      };
      return labels[status] ?? status;
    };
    const shipModal = ref(false);
    const selectedShipTransaction = ref(null);
    const shipForm = useForm({ tracking_number: "", courier_name: "", seller_notes: "" });
    const openShipModal = (item) => {
      selectedShipTransaction.value = item;
      shipForm.reset();
      shipModal.value = true;
    };
    const submitShipment = () => {
      shipForm.post(route("transactions.ship", selectedShipTransaction.value.id), {
        preserveScroll: true,
        onSuccess: () => {
          shipModal.value = false;
        }
      });
    };
    const codModal = ref(false);
    const selectedCodTransaction = ref(null);
    const codForm = useForm({ cod_location: "", cod_scheduled_at: "", seller_notes: "" });
    const openCodModal = (item) => {
      var _a2;
      selectedCodTransaction.value = item;
      codForm.cod_location = item.cod_location || "";
      codForm.cod_scheduled_at = ((_a2 = item.cod_scheduled_at) == null ? void 0 : _a2.substring(0, 16)) || "";
      codForm.seller_notes = "";
      codModal.value = true;
    };
    const submitCodConfirm = () => {
      codForm.post(route("transactions.cod-confirm", selectedCodTransaction.value.id), {
        preserveScroll: true,
        onSuccess: () => {
          codModal.value = false;
        }
      });
    };
    const rejectCod = (item) => {
      if (confirm("Tolak permintaan COD dari buyer ini?"))
        router.post(route("transactions.cod-reject", item.id));
    };
    const productHeaders = [
      { text: "Produk", value: "title" },
      { text: "Harga", value: "price" },
      { text: "Status", value: "status" },
      { text: "Tanggal", value: "created_at" },
      { text: "Aksi", value: "actions", width: 150 }
    ];
    const transactionHeaders = [
      { text: "Transaksi", value: "transaction" },
      { text: "Pembeli", value: "buyer" },
      { text: "Total", value: "total" },
      { text: "Status", value: "status" },
      { text: "Aksi", value: "actions", width: 180 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EasyDataTable = resolveComponent("EasyDataTable");
      const _component_Circle = resolveComponent("Circle");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground" data-v-dd70395c${_scopeId}>Seller Dashboard</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Seller Dashboard")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Seller Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12" data-v-dd70395c${_scopeId}><div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" data-v-dd70395c${_scopeId}><div class="mx-auto flex max-w-2xl space-x-1 rounded-xl bg-muted p-1 sm:mx-0" data-v-dd70395c${_scopeId}><button class="${ssrRenderClass([tab.value === "overview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"])}" data-v-dd70395c${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Ringkasan </button><button class="${ssrRenderClass([tab.value === "transactions" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"])}" data-v-dd70395c${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Pesanan </button><button class="${ssrRenderClass([tab.value === "negotiations" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"])}" data-v-dd70395c${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Tag), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Penawaran </button><button class="${ssrRenderClass([tab.value === "settings" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"])}" data-v-dd70395c${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Settings), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Pengaturan </button></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "overview" ? null : { display: "none" })}" data-v-dd70395c${_scopeId}><div class="mb-6 border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8" data-v-dd70395c${_scopeId}><header class="mb-6" data-v-dd70395c${_scopeId}><h2 class="text-lg font-medium" data-v-dd70395c${_scopeId}>Statistik Toko</h2><p class="mt-1 text-sm text-muted-foreground" data-v-dd70395c${_scopeId}> Ringkasan performa penjualan Anda saat ini. </p></header><div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4" data-v-dd70395c${_scopeId}><div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6" data-v-dd70395c${_scopeId}><div class="mb-2 flex items-center justify-between" data-v-dd70395c${_scopeId}><p class="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs" data-v-dd70395c${_scopeId}> Total Pendapatan </p>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4 text-indigo-500 sm:h-5 sm:w-5" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-2 text-lg font-black text-indigo-600 dark:text-indigo-400 sm:text-2xl truncate" data-v-dd70395c${_scopeId}> Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(__props.totalRevenue || 0))}</p></div><div class="rounded-2xl border border-border bg-muted p-4 transition-colors cursor-pointer hover:bg-accent/50 hover:border-amber-500/30 sm:p-6" data-v-dd70395c${_scopeId}><div class="mb-2 flex items-center justify-between" data-v-dd70395c${_scopeId}><p class="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs" data-v-dd70395c${_scopeId}> Pesanan Aktif </p>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-4 w-4 text-amber-500 sm:h-5 sm:w-5" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-2 text-xl font-black text-amber-600 dark:text-amber-400 sm:text-3xl" data-v-dd70395c${_scopeId}>${ssrInterpolate(__props.pendingOrders || 0)}</p></div><div class="rounded-2xl border border-border bg-muted p-4 transition-colors cursor-pointer hover:bg-accent/50 hover:border-emerald-500/30 sm:p-6" data-v-dd70395c${_scopeId}><div class="mb-2 flex items-center justify-between" data-v-dd70395c${_scopeId}><p class="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs" data-v-dd70395c${_scopeId}> Total Terjual </p>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "h-4 w-4 text-emerald-500 sm:h-5 sm:w-5" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-2 text-xl font-black text-emerald-600 dark:text-emerald-400 sm:text-3xl" data-v-dd70395c${_scopeId}>${ssrInterpolate(__props.transactionsCount || 0)}</p></div><div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6" data-v-dd70395c${_scopeId}><div class="mb-2 flex items-center justify-between" data-v-dd70395c${_scopeId}><p class="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs" data-v-dd70395c${_scopeId}> Produk Aktif </p>`);
            _push2(ssrRenderComponent(unref(Package), { class: "h-4 w-4 text-blue-500 sm:h-5 sm:w-5" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-2 text-xl font-black text-blue-600 dark:text-blue-400 sm:text-3xl" data-v-dd70395c${_scopeId}>${ssrInterpolate(__props.productsCount || 0)}</p></div></div></div><div class="border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8" data-v-dd70395c${_scopeId}><div class="mb-6 flex items-center justify-between" data-v-dd70395c${_scopeId}><div data-v-dd70395c${_scopeId}><h3 class="text-lg font-bold" data-v-dd70395c${_scopeId}>Produk Saya</h3><p class="text-sm text-muted-foreground" data-v-dd70395c${_scopeId}>Kelola barang dagangan Anda.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("products.create"),
              class: "inline-flex items-center rounded-xl border border-transparent bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-md transition duration-150 hover:bg-primary/90"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-dd70395c${_scopeId2}>Tambah Produk</span>`);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                    createVNode("span", null, "Tambah Produk")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="easy-table-wrapper hidden md:block" data-v-dd70395c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers: productHeaders,
              items: allMyProducts.value,
              "hide-footer": "",
              "border-cell": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-title": withCtx(({ title, images, category }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-4 py-2" data-v-dd70395c${_scopeId2}><div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" data-v-dd70395c${_scopeId2}>`);
                  if (images && images.length > 0) {
                    _push3(`<img${ssrRenderAttr("src", `/storage/${images[0].image_path}`)} loading="lazy" class="h-full w-full object-cover" data-v-dd70395c${_scopeId2}>`);
                  } else {
                    _push3(`<div class="flex h-full w-full items-center justify-center text-muted-foreground" data-v-dd70395c${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Image), { class: "h-6 w-6" }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                  _push3(`</div><div class="min-w-0" data-v-dd70395c${_scopeId2}><div class="line-clamp-1 text-base font-bold text-foreground" data-v-dd70395c${_scopeId2}>${ssrInterpolate(title)}</div><div class="text-xs text-muted-foreground/80" data-v-dd70395c${_scopeId2}>${ssrInterpolate(category == null ? void 0 : category.name)}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-4 py-2" }, [
                      createVNode("div", { class: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" }, [
                        images && images.length > 0 ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `/storage/${images[0].image_path}`,
                          loading: "lazy",
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex h-full w-full items-center justify-center text-muted-foreground"
                        }, [
                          createVNode(unref(Image), { class: "h-6 w-6" })
                        ]))
                      ]),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("div", { class: "line-clamp-1 text-base font-bold text-foreground" }, toDisplayString(title), 1),
                        createVNode("div", { class: "text-xs text-muted-foreground/80" }, toDisplayString(category == null ? void 0 : category.name), 1)
                      ])
                    ])
                  ];
                }
              }),
              "item-price": withCtx(({ price }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-medium text-foreground" data-v-dd70395c${_scopeId2}>Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(price))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-medium text-foreground" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(price)), 1)
                  ];
                }
              }),
              "item-status": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center gap-1 py-2" data-v-dd70395c${_scopeId2}><button${ssrIncludeBooleanAttr(item.availability === "sold") ? " disabled" : ""} class="${ssrRenderClass([[
                    item.availability === "sold" ? "opacity-60 cursor-not-allowed" : "active:scale-90 hover:scale-105",
                    item.availability === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400"
                  ], "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all"])}" data-v-dd70395c${_scopeId2}>`);
                  if (item.availability === "available") {
                    _push3(ssrRenderComponent(unref(CheckCircle), { class: "h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_Circle, { class: "h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                  }
                  _push3(` ${ssrInterpolate(item.availability === "available" ? "Tersedia" : "Terjual")}</button>`);
                  if (item.status !== "active") {
                    _push3(`<div class="${ssrRenderClass([{
                      "border-amber-200 bg-amber-50 text-amber-600": item.status === "pending",
                      "border-red-200 bg-red-50 text-red-600": item.status === "rejected",
                      "border-destructive/30 bg-destructive/10 text-destructive": item.status === "banned"
                    }, "text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border"])}" data-v-dd70395c${_scopeId2}>${ssrInterpolate(item.status === "pending" ? "Moderasi" : item.status === "rejected" ? "Ditolak" : "Dibanned")}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center gap-1 py-2" }, [
                      createVNode("button", {
                        onClick: ($event) => item.availability !== "sold" && toggleStatus(item),
                        disabled: item.availability === "sold",
                        class: ["inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all", [
                          item.availability === "sold" ? "opacity-60 cursor-not-allowed" : "active:scale-90 hover:scale-105",
                          item.availability === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400"
                        ]]
                      }, [
                        item.availability === "available" ? (openBlock(), createBlock(unref(CheckCircle), {
                          key: 0,
                          class: "h-3.5 w-3.5"
                        })) : (openBlock(), createBlock(_component_Circle, {
                          key: 1,
                          class: "h-3.5 w-3.5"
                        })),
                        createTextVNode(" " + toDisplayString(item.availability === "available" ? "Tersedia" : "Terjual"), 1)
                      ], 10, ["onClick", "disabled"]),
                      item.status !== "active" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ["text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border", {
                          "border-amber-200 bg-amber-50 text-amber-600": item.status === "pending",
                          "border-red-200 bg-red-50 text-red-600": item.status === "rejected",
                          "border-destructive/30 bg-destructive/10 text-destructive": item.status === "banned"
                        }]
                      }, toDisplayString(item.status === "pending" ? "Moderasi" : item.status === "rejected" ? "Ditolak" : "Dibanned"), 3)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              "item-created_at": withCtx(({ created_at }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-xs text-muted-foreground" data-v-dd70395c${_scopeId2}>${ssrInterpolate(new Date(created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })), 1)
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-end gap-2 py-2" data-v-dd70395c${_scopeId2}>`);
                  if (item.availability !== "sold") {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("products.edit", item.slug),
                      class: "inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition hover:bg-muted"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Edit `);
                        } else {
                          return [
                            createTextVNode(" Edit ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      onClick: ($event) => confirmDeletion(item)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Hapus`);
                        } else {
                          return [
                            createTextVNode("Hapus")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<div class="text-xs italic text-muted-foreground mr-2 border border-border px-3 py-1.5 rounded-md bg-muted" data-v-dd70395c${_scopeId2}> Terkunci (Terjual) </div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-end gap-2 py-2" }, [
                      item.availability !== "sold" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("products.edit", item.slug),
                          class: "inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition hover:bg-muted"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(_sfc_main$2, {
                          onClick: ($event) => confirmDeletion(item)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Hapus")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ], 64)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-xs italic text-muted-foreground mr-2 border border-border px-3 py-1.5 rounded-md bg-muted"
                      }, " Terkunci (Terjual) "))
                    ])
                  ];
                }
              }),
              "empty-message": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-12 text-center text-muted-foreground" data-v-dd70395c${_scopeId2}><div class="flex flex-col items-center" data-v-dd70395c${_scopeId2}><span class="mb-2" data-v-dd70395c${_scopeId2}>Belum ada produk yang dijual.</span>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.create"),
                    class: "font-bold text-primary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`+ Tambah Produk Baru`);
                      } else {
                        return [
                          createTextVNode("+ Tambah Produk Baru")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-12 text-center text-muted-foreground" }, [
                      createVNode("div", { class: "flex flex-col items-center" }, [
                        createVNode("span", { class: "mb-2" }, "Belum ada produk yang dijual."),
                        createVNode(unref(Link), {
                          href: _ctx.route("products.create"),
                          class: "font-bold text-primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("+ Tambah Produk Baru")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="divide-y divide-border md:hidden" data-v-dd70395c${_scopeId}><!--[-->`);
            ssrRenderList(allMyProducts.value, (item) => {
              var _a3;
              _push2(`<div class="flex flex-col gap-4 p-4" data-v-dd70395c${_scopeId}><div class="flex items-center gap-4" data-v-dd70395c${_scopeId}><div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted" data-v-dd70395c${_scopeId}>`);
              if (item.images && item.images.length > 0) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${item.images[0].image_path}`)} loading="lazy" class="h-full w-full object-cover" data-v-dd70395c${_scopeId}>`);
              } else {
                _push2(`<div class="flex h-full w-full items-center justify-center text-muted-foreground" data-v-dd70395c${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Image), { class: "h-8 w-8" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div class="min-w-0 flex-1" data-v-dd70395c${_scopeId}><div class="truncate text-base font-bold" data-v-dd70395c${_scopeId}>${ssrInterpolate(item.title)}</div><div class="text-xs text-muted-foreground" data-v-dd70395c${_scopeId}>${ssrInterpolate((_a3 = item.category) == null ? void 0 : _a3.name)}</div><div class="mt-1 font-bold text-primary" data-v-dd70395c${_scopeId}> Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(item.price))}</div></div></div><div class="flex items-center justify-between gap-4 border-t border-border pt-2" data-v-dd70395c${_scopeId}><div class="flex flex-col gap-1" data-v-dd70395c${_scopeId}><button${ssrIncludeBooleanAttr(item.availability === "sold") ? " disabled" : ""} class="${ssrRenderClass([[
                item.availability === "sold" ? "opacity-60 cursor-not-allowed" : "active:scale-90",
                item.availability === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400"
              ], "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all"])}" data-v-dd70395c${_scopeId}>`);
              if (item.availability === "available") {
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_Circle, { class: "h-3 w-3" }, null, _parent2, _scopeId));
              }
              _push2(` ${ssrInterpolate(item.availability === "available" ? "Tersedia" : "Terjual")}</button>`);
              if (item.status !== "active") {
                _push2(`<div class="${ssrRenderClass([{
                  "border-amber-200 bg-amber-50 text-amber-600": item.status === "pending",
                  "border-red-200 bg-red-50 text-red-600": item.status === "rejected",
                  "border-destructive/30 bg-destructive/10 text-destructive": item.status === "banned"
                }, "inline-block text-[8px] font-black uppercase tracking-tighter px-1 rounded border self-start"])}" data-v-dd70395c${_scopeId}>${ssrInterpolate(item.status === "pending" ? "Moderasi" : item.status === "rejected" ? "Ditolak" : "Dibanned")}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="text-[10px] text-muted-foreground" data-v-dd70395c${_scopeId}>${ssrInterpolate(new Date(item.created_at).toLocaleDateString("id-ID"))}</span></div><div class="flex items-center gap-2" data-v-dd70395c${_scopeId}>`);
              if (item.availability !== "sold") {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("products.edit", item.slug),
                  class: "rounded-lg p-2 text-muted-foreground transition hover:bg-accent"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Edit3), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(Edit3), { class: "h-5 w-5" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10" data-v-dd70395c${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                _push2(`</button><!--]-->`);
              } else {
                _push2(`<span class="text-[10px] italic text-muted-foreground" data-v-dd70395c${_scopeId}>Terkunci</span>`);
              }
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-8 flex justify-center pb-4" data-v-dd70395c${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="flex flex-col items-center gap-2" data-v-dd70395c${_scopeId}><div class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" data-v-dd70395c${_scopeId}></div><span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground" data-v-dd70395c${_scopeId}>Memuat produk...</span></div>`);
            } else if (!nextUrl.value && allMyProducts.value.length > 0) {
              _push2(`<div class="py-4 text-center" data-v-dd70395c${_scopeId}><span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50" data-v-dd70395c${_scopeId}>Semua produk ditampilkan</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "transactions" ? null : { display: "none" })}" data-v-dd70395c${_scopeId}><div class="border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8" data-v-dd70395c${_scopeId}><div class="mb-6" data-v-dd70395c${_scopeId}><h3 class="text-lg font-bold" data-v-dd70395c${_scopeId}>Pesanan Masuk</h3><p class="text-sm text-muted-foreground" data-v-dd70395c${_scopeId}>Kelola transaksi penjualan Anda.</p></div><div class="easy-table-wrapper" data-v-dd70395c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_EasyDataTable, {
              headers: transactionHeaders,
              items: __props.transactions.data,
              "hide-footer": "",
              "border-cell": "",
              "table-class-name": "customize-table",
              "header-class-name": "customize-header"
            }, {
              "item-transaction": withCtx(({ reference_number, product }, _push3, _parent3, _scopeId2) => {
                var _a3, _b3;
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3 py-2" data-v-dd70395c${_scopeId2}><div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" data-v-dd70395c${_scopeId2}>`);
                  if (((_a3 = product.images) == null ? void 0 : _a3.length) > 0) {
                    _push3(`<img${ssrRenderAttr("src", `/storage/${product.images[0].image_path}`)} class="h-full w-full object-cover" data-v-dd70395c${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="min-w-0" data-v-dd70395c${_scopeId2}><div class="font-bold truncate text-foreground" data-v-dd70395c${_scopeId2}>#${ssrInterpolate(reference_number)}</div><div class="text-[10px] text-muted-foreground/80 truncate max-w-[150px]" data-v-dd70395c${_scopeId2}>${ssrInterpolate(product.title)}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3 py-2" }, [
                      createVNode("div", { class: "h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" }, [
                        ((_b3 = product.images) == null ? void 0 : _b3.length) > 0 ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `/storage/${product.images[0].image_path}`,
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("div", { class: "font-bold truncate text-foreground" }, "#" + toDisplayString(reference_number), 1),
                        createVNode("div", { class: "text-[10px] text-muted-foreground/80 truncate max-w-[150px]" }, toDisplayString(product.title), 1)
                      ])
                    ])
                  ];
                }
              }),
              "item-buyer": withCtx(({ buyer }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-2" data-v-dd70395c${_scopeId2}><div class="text-sm font-medium text-foreground" data-v-dd70395c${_scopeId2}>${ssrInterpolate(buyer.name)}</div><div class="text-[10px] text-muted-foreground/80" data-v-dd70395c${_scopeId2}>${ssrInterpolate(buyer.email)}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-2" }, [
                      createVNode("div", { class: "text-sm font-medium text-foreground" }, toDisplayString(buyer.name), 1),
                      createVNode("div", { class: "text-[10px] text-muted-foreground/80" }, toDisplayString(buyer.email), 1)
                    ])
                  ];
                }
              }),
              "item-total": withCtx(({ price }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold text-foreground" data-v-dd70395c${_scopeId2}>Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(price))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold text-foreground" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(price)), 1)
                  ];
                }
              }),
              "item-status": withCtx(({ status, payment_method }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-start gap-1 py-2" data-v-dd70395c${_scopeId2}><span class="${ssrRenderClass([{
                    "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400": ["pending", "cod_requested"].includes(status),
                    "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400": status === "paid",
                    "border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400": status === "processing",
                    "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400": status === "shipped",
                    "border-teal-200 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400": ["delivered", "cod_confirmed"].includes(status),
                    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400": status === "completed",
                    "border-red-200 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400": status === "disputed",
                    "border-slate-200 bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400": status === "canceled"
                  }, "px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border"])}" data-v-dd70395c${_scopeId2}>${ssrInterpolate(getStatusLabel(status))}</span>`);
                  if (payment_method === "cod") {
                    _push3(`<span class="inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-orange-500" data-v-dd70395c${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Users), { class: "h-2.5 w-2.5" }, null, _parent3, _scopeId2));
                    _push3(` COD </span>`);
                  } else {
                    _push3(`<span class="inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-blue-500" data-v-dd70395c${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CreditCard), { class: "h-2.5 w-2.5" }, null, _parent3, _scopeId2));
                    _push3(` Rekber </span>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-start gap-1 py-2" }, [
                      createVNode("span", {
                        class: ["px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border", {
                          "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400": ["pending", "cod_requested"].includes(status),
                          "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400": status === "paid",
                          "border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400": status === "processing",
                          "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400": status === "shipped",
                          "border-teal-200 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400": ["delivered", "cod_confirmed"].includes(status),
                          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400": status === "completed",
                          "border-red-200 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400": status === "disputed",
                          "border-slate-200 bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400": status === "canceled"
                        }]
                      }, toDisplayString(getStatusLabel(status)), 3),
                      payment_method === "cod" ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-orange-500"
                      }, [
                        createVNode(unref(Users), { class: "h-2.5 w-2.5" }),
                        createTextVNode(" COD ")
                      ])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-blue-500"
                      }, [
                        createVNode(unref(CreditCard), { class: "h-2.5 w-2.5" }),
                        createTextVNode(" Rekber ")
                      ]))
                    ])
                  ];
                }
              }),
              "item-actions": withCtx((item, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-wrap items-center justify-end gap-1.5 py-2" data-v-dd70395c${_scopeId2}>`);
                  if (item.payment_method === "rekber" || !item.payment_method) {
                    _push3(`<!--[-->`);
                    if (item.status === "paid") {
                      _push3(`<button class="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-[10px] font-bold rounded-lg hover:bg-purple-700 transition-colors" data-v-dd70395c${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Truck), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                      _push3(` Input Resi </button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (item.status === "pending" || item.status === "paid") {
                      _push3(`<button class="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-600 transition-colors" style="${ssrRenderStyle(item.status === "paid" ? null : { display: "none" })}" data-v-dd70395c${_scopeId2}> Tandai Diproses </button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (item.payment_method === "cod") {
                    _push3(`<!--[-->`);
                    if (item.status === "cod_requested") {
                      _push3(`<button class="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-[10px] font-bold rounded-lg hover:bg-teal-700 transition-colors" data-v-dd70395c${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Users), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                      _push3(` Konfirmasi COD </button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (item.status === "cod_requested") {
                      _push3(`<button class="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-colors" data-v-dd70395c${_scopeId2}> Tolak COD </button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (item.status === "cod_confirmed") {
                      _push3(`<button class="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-lg hover:bg-orange-600 transition-colors" data-v-dd70395c${_scopeId2}> COD Selesai </button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (item.status === "disputed") {
                    _push3(`<button class="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:underline" data-v-dd70395c${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(AlertTriangle), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` Detail Komplain </button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-wrap items-center justify-end gap-1.5 py-2" }, [
                      item.payment_method === "rekber" || !item.payment_method ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        item.status === "paid" ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => openShipModal(item),
                          class: "inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-[10px] font-bold rounded-lg hover:bg-purple-700 transition-colors"
                        }, [
                          createVNode(unref(Truck), { class: "h-3 w-3" }),
                          createTextVNode(" Input Resi ")
                        ], 8, ["onClick"])) : createCommentVNode("", true),
                        item.status === "pending" || item.status === "paid" ? withDirectives((openBlock(), createBlock("button", {
                          key: 1,
                          onClick: ($event) => unref(router).post(_ctx.route("transactions.update-status", item.id), { status: "processing" }),
                          class: "inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-600 transition-colors"
                        }, " Tandai Diproses ", 8, ["onClick"])), [
                          [vShow, item.status === "paid"]
                        ]) : createCommentVNode("", true)
                      ], 64)) : createCommentVNode("", true),
                      item.payment_method === "cod" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                        item.status === "cod_requested" ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => openCodModal(item),
                          class: "inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-[10px] font-bold rounded-lg hover:bg-teal-700 transition-colors"
                        }, [
                          createVNode(unref(Users), { class: "h-3 w-3" }),
                          createTextVNode(" Konfirmasi COD ")
                        ], 8, ["onClick"])) : createCommentVNode("", true),
                        item.status === "cod_requested" ? (openBlock(), createBlock("button", {
                          key: 1,
                          onClick: ($event) => rejectCod(item),
                          class: "inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-colors"
                        }, " Tolak COD ", 8, ["onClick"])) : createCommentVNode("", true),
                        item.status === "cod_confirmed" ? (openBlock(), createBlock("button", {
                          key: 2,
                          onClick: ($event) => unref(router).post(_ctx.route("transactions.cod-complete", item.id)),
                          class: "inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-lg hover:bg-orange-600 transition-colors"
                        }, " COD Selesai ", 8, ["onClick"])) : createCommentVNode("", true)
                      ], 64)) : createCommentVNode("", true),
                      item.status === "disputed" ? (openBlock(), createBlock("button", {
                        key: 2,
                        onClick: ($event) => openDisputeDetail(item),
                        class: "inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
                      }, [
                        createVNode(unref(AlertTriangle), { class: "h-3 w-3" }),
                        createTextVNode(" Detail Komplain ")
                      ], 8, ["onClick"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              "empty-message": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-12 text-center text-muted-foreground" data-v-dd70395c${_scopeId2}> Belum ada transaksi masuk. </div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-12 text-center text-muted-foreground" }, " Belum ada transaksi masuk. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-6" data-v-dd70395c${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              links: __props.transactions.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "negotiations" ? null : { display: "none" })}" data-v-dd70395c${_scopeId}><div class="space-y-6" data-v-dd70395c${_scopeId}><div class="mb-8 flex items-center gap-4" data-v-dd70395c${_scopeId}><div class="rounded-2xl bg-primary/10 p-3 text-primary" data-v-dd70395c${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Tag), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-dd70395c${_scopeId}><h3 class="text-lg font-bold text-foreground" data-v-dd70395c${_scopeId}>Penawaran Harga dari Buyer</h3><p class="text-sm text-muted-foreground" data-v-dd70395c${_scopeId}>Terima, counter, atau tolak penawaran yang masuk.</p></div></div>`);
            if (((_b2 = (_a2 = __props.negotiations) == null ? void 0 : _a2.data) == null ? void 0 : _b2.length) === 0) {
              _push2(`<div class="flex flex-col items-center py-24 text-center" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Tag), { class: "mb-4 h-16 w-16 text-muted-foreground/25" }, null, _parent2, _scopeId));
              _push2(`<h4 class="text-lg font-bold text-muted-foreground" data-v-dd70395c${_scopeId}>Belum ada penawaran masuk</h4><p class="mt-1 text-sm text-muted-foreground" data-v-dd70395c${_scopeId}>Aktifkan opsi NEGO di produk Anda agar buyer bisa menawar.</p></div>`);
            } else {
              _push2(`<div class="space-y-5" data-v-dd70395c${_scopeId}><!--[-->`);
              ssrRenderList((_c2 = __props.negotiations) == null ? void 0 : _c2.data, (nego) => {
                var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3;
                _push2(`<div class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm" data-v-dd70395c${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3" data-v-dd70395c${_scopeId}><div class="flex items-center gap-3" data-v-dd70395c${_scopeId}><div class="h-8 w-8 overflow-hidden rounded-full border border-border bg-muted" data-v-dd70395c${_scopeId}>`);
                if ((_b3 = (_a3 = nego.buyer) == null ? void 0 : _a3.profile) == null ? void 0 : _b3.avatar) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${nego.buyer.profile.avatar}`)} class="h-full w-full object-cover" data-v-dd70395c${_scopeId}>`);
                } else {
                  _push2(`<div class="flex h-full w-full items-center justify-center text-xs font-bold text-primary" data-v-dd70395c${_scopeId}>${ssrInterpolate((_d3 = (_c3 = nego.buyer) == null ? void 0 : _c3.name) == null ? void 0 : _d3.charAt(0))}</div>`);
                }
                _push2(`</div><div data-v-dd70395c${_scopeId}><p class="text-sm font-bold text-foreground" data-v-dd70395c${_scopeId}>${ssrInterpolate((_e3 = nego.buyer) == null ? void 0 : _e3.name)}</p><p class="text-[10px] text-muted-foreground" data-v-dd70395c${_scopeId}>${ssrInterpolate(formatDate(nego.created_at))}</p></div></div><div class="flex items-center gap-2" data-v-dd70395c${_scopeId}><span class="${ssrRenderClass([badgeClass(nego.status), "rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider"])}" data-v-dd70395c${_scopeId}>${ssrInterpolate(((_f3 = statusConfig[nego.status]) == null ? void 0 : _f3.label) ?? nego.status)}</span>`);
                if (["pending", "countered"].includes(nego.status)) {
                  _push2(`<span class="flex items-center gap-1 text-[10px] text-muted-foreground" data-v-dd70395c${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Clock), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(expiresIn(nego.expires_at))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="p-5" data-v-dd70395c${_scopeId}><div class="flex items-center gap-3 mb-4" data-v-dd70395c${_scopeId}><div class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted" data-v-dd70395c${_scopeId}>`);
                if ((_h3 = (_g3 = nego.product) == null ? void 0 : _g3.images) == null ? void 0 : _h3.length) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${nego.product.images[0].image_path}`)} class="h-full w-full object-cover" data-v-dd70395c${_scopeId}>`);
                } else {
                  _push2(`<div class="flex h-full w-full items-center justify-center" data-v-dd70395c${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Package), { class: "h-6 w-6 text-muted-foreground/30" }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><div data-v-dd70395c${_scopeId}><p class="font-bold text-foreground truncate max-w-xs" data-v-dd70395c${_scopeId}>${ssrInterpolate((_i3 = nego.product) == null ? void 0 : _i3.title)}</p><div class="mt-1 flex items-center gap-3 text-sm" data-v-dd70395c${_scopeId}><span class="text-muted-foreground line-through" data-v-dd70395c${_scopeId}>${ssrInterpolate(formatRp((_j3 = nego.product) == null ? void 0 : _j3.price))}</span><span class="font-black text-primary" data-v-dd70395c${_scopeId}>${ssrInterpolate(formatRp(nego.proposed_price))}</span><span class="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-900/20 dark:text-red-400" data-v-dd70395c${_scopeId}> -${ssrInterpolate(Math.round((1 - nego.proposed_price / ((_k3 = nego.product) == null ? void 0 : _k3.price)) * 100))}% </span></div></div></div>`);
                if (nego.message) {
                  _push2(`<div class="mb-4 rounded-xl border border-border bg-muted/30 p-3 text-sm italic text-muted-foreground" data-v-dd70395c${_scopeId}> &quot;${ssrInterpolate(nego.message)}&quot; </div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (nego.counter_price) {
                  _push2(`<div class="mb-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 text-sm dark:border-indigo-800 dark:bg-indigo-900/10" data-v-dd70395c${_scopeId}><span class="text-xs font-bold text-indigo-600 dark:text-indigo-400" data-v-dd70395c${_scopeId}>Counter-offer Anda: </span><span class="font-black text-indigo-700 dark:text-indigo-300" data-v-dd70395c${_scopeId}>${ssrInterpolate(formatRp(nego.counter_price))}</span>`);
                  if (nego.seller_message) {
                    _push2(`<p class="mt-1 text-xs italic text-muted-foreground" data-v-dd70395c${_scopeId}>&quot;${ssrInterpolate(nego.seller_message)}&quot;</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (["pending", "countered"].includes(nego.status)) {
                  _push2(`<button class="flex w-full items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors" data-v-dd70395c${_scopeId}>`);
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(expandedItems.value[nego.id] ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-4 w-4" }, null), _parent2, _scopeId);
                  _push2(` ${ssrInterpolate(expandedItems.value[nego.id] ? "Tutup" : "Buka Aksi")}</button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (expandedItems.value[nego.id] && nego.status === "pending") {
                  _push2(`<div class="mt-4 space-y-4 border-t border-border pt-4" data-v-dd70395c${_scopeId}><button class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors" data-v-dd70395c${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(` Terima Harga ${ssrInterpolate(formatRp(nego.proposed_price))}</button><div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-800 dark:bg-indigo-900/10" data-v-dd70395c${_scopeId}><p class="mb-3 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400" data-v-dd70395c${_scopeId}>Beri Counter-Offer</p><div class="flex gap-2" data-v-dd70395c${_scopeId}><div class="relative flex-1" data-v-dd70395c${_scopeId}><span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground" data-v-dd70395c${_scopeId}>Rp</span><input${ssrRenderAttr("value", getCounterForm(nego.id).counter_price)} type="number" placeholder="Harga counter..." class="w-full rounded-xl border border-border bg-background pl-8 pr-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20" data-v-dd70395c${_scopeId}></div><button class="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors" data-v-dd70395c${_scopeId}> Kirim </button></div><input${ssrRenderAttr("value", getCounterForm(nego.id).seller_message)} type="text" placeholder="Pesan untuk buyer (opsional)..." class="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" data-v-dd70395c${_scopeId}></div><button class="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors dark:bg-red-900/10 dark:border-red-800" data-v-dd70395c${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(` Tolak Penawaran </button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]-->`);
              if ((_d2 = __props.negotiations) == null ? void 0 : _d2.links) {
                _push2(`<div class="mt-8" data-v-dd70395c${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  links: __props.negotiations.links
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "settings" ? null : { display: "none" })}" data-v-dd70395c${_scopeId}><div class="border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8" data-v-dd70395c${_scopeId}><div class="max-w-xl" data-v-dd70395c${_scopeId}><header data-v-dd70395c${_scopeId}><h2 class="text-lg font-medium" data-v-dd70395c${_scopeId}>Profil Toko</h2><p class="mt-1 text-sm text-muted-foreground" data-v-dd70395c${_scopeId}> Informasi ini akan ditampilkan di halaman publik toko Anda. </p></header><form class="mt-6 space-y-6" data-v-dd70395c${_scopeId}><div class="mb-8 p-1 bg-muted rounded-xl flex gap-1" data-v-dd70395c${_scopeId}><button type="button" class="${ssrRenderClass([tabSettings.value === "store" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all"])}" data-v-dd70395c${_scopeId}> Profil Toko </button><button type="button" class="${ssrRenderClass([tabSettings.value === "user" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all"])}" data-v-dd70395c${_scopeId}> Profil Pribadi </button></div>`);
            if (tabSettings.value === "store") {
              _push2(`<div class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300" data-v-dd70395c${_scopeId}><div class="flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-start" data-v-dd70395c${_scopeId}><div class="group relative shrink-0" data-v-dd70395c${_scopeId}><div class="relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border transition-all duration-300 group-hover:ring-primary" data-v-dd70395c${_scopeId}>`);
              if (photoPreview.value) {
                _push2(`<img${ssrRenderAttr("src", photoPreview.value)} loading="lazy" class="h-full w-full object-cover" data-v-dd70395c${_scopeId}>`);
              } else if ((_e2 = __props.user.profile) == null ? void 0 : _e2.store_logo) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${__props.user.profile.store_logo}`)} loading="lazy" class="h-full w-full object-cover" data-v-dd70395c${_scopeId}>`);
              } else {
                _push2(`<div class="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary" data-v-dd70395c${_scopeId}>${ssrInterpolate((((_f2 = __props.user.profile) == null ? void 0 : _f2.store_name) || __props.user.name).substring(0, 1))}</div>`);
              }
              _push2(`<div class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Image), { class: "mb-1 h-6 w-6 text-white" }, null, _parent2, _scopeId));
              _push2(`<span class="text-[10px] font-bold uppercase tracking-wider text-white" data-v-dd70395c${_scopeId}>Ubah Logo</span></div></div><input type="file" class="hidden" accept="image/*" data-v-dd70395c${_scopeId}><div class="absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow-sm" data-v-dd70395c${_scopeId}><button type="button" class="rounded-full bg-primary p-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Edit3), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></div></div><div class="flex-1 pt-2 text-center sm:text-left" data-v-dd70395c${_scopeId}><h3 class="text-lg font-black text-foreground" data-v-dd70395c${_scopeId}>Foto Profil Toko</h3><p class="mb-4 mt-1 text-sm leading-relaxed text-muted-foreground" data-v-dd70395c${_scopeId}> Rekomendasi rasio 1:1, maks 2MB. Format file JPG, JPEG, PNG, atau WebP. Gambar yang diunggah akan dapat dicrop secara langsung. </p>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                onClick: ($event) => photoInput.value.click(),
                class: "border-2 shadow-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Ganti Logo Toko`);
                  } else {
                    return [
                      createTextVNode("Ganti Logo Toko")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(storeForm).errors.store_logo,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="grid grid-cols-1 gap-6 md:grid-cols-2" data-v-dd70395c${_scopeId}><div class="md:col-span-2" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                for: "store_name",
                value: "Nama Toko / Penjual",
                class: "mb-1 font-bold"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$7, {
                id: "store_name",
                modelValue: unref(storeForm).store_name,
                "onUpdate:modelValue": ($event) => unref(storeForm).store_name = $event,
                type: "text",
                class: "block h-12 w-full rounded-xl text-sm font-medium",
                placeholder: "Ketik nama toko Anda...",
                required: ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(storeForm).errors.store_name,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="md:col-span-2" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                for: "store_bio",
                value: "Bio / Deskripsi Singkat Toko",
                class: "mb-1 font-bold"
              }, null, _parent2, _scopeId));
              _push2(`<textarea id="store_bio" rows="4" class="block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary" placeholder="Ceritakan kelebihan toko Anda kepada calon pembeli..." data-v-dd70395c${_scopeId}>${ssrInterpolate(unref(storeForm).store_bio)}</textarea>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(storeForm).errors.store_bio,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="md:col-span-2" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$8, {
                modelValue: unref(storeForm),
                "onUpdate:modelValue": ($event) => isRef(storeForm) ? storeForm.value = $event : null,
                prefix: "store_"
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (tabSettings.value === "user") {
              _push2(`<div class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300" data-v-dd70395c${_scopeId}><div class="flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-start" data-v-dd70395c${_scopeId}><div class="group relative shrink-0" data-v-dd70395c${_scopeId}><div class="relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border transition-all duration-300 group-hover:ring-primary" data-v-dd70395c${_scopeId}>`);
              if (personalPhotoPreview.value) {
                _push2(`<img${ssrRenderAttr("src", personalPhotoPreview.value)} class="h-full w-full object-cover" data-v-dd70395c${_scopeId}>`);
              } else if ((_g2 = __props.user.profile) == null ? void 0 : _g2.avatar) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${__props.user.profile.avatar}`)} class="h-full w-full object-cover" data-v-dd70395c${_scopeId}>`);
              } else {
                _push2(`<div class="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary" data-v-dd70395c${_scopeId}>${ssrInterpolate(__props.user.name.charAt(0))}</div>`);
              }
              _push2(`<div class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Image), { class: "mb-1 h-6 w-6 text-white" }, null, _parent2, _scopeId));
              _push2(`<span class="text-[10px] font-bold uppercase tracking-wider text-white" data-v-dd70395c${_scopeId}>Ubah Foto</span></div></div><input type="file" class="hidden" accept="image/*" data-v-dd70395c${_scopeId}></div><div class="flex-1 pt-2 text-center sm:text-left" data-v-dd70395c${_scopeId}><h3 class="text-lg font-black text-foreground" data-v-dd70395c${_scopeId}>Foto Profil Pribadi</h3><p class="mb-4 mt-1 text-sm leading-relaxed text-muted-foreground" data-v-dd70395c${_scopeId}> Foto ini akan muncul saat Anda mengobrol dengan pembeli atau memberikan ulasan. </p>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                onClick: ($event) => personalPhotoInput.value.click(),
                class: "border-2 shadow-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Ganti Foto Profil`);
                  } else {
                    return [
                      createTextVNode("Ganti Foto Profil")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(personalForm).errors.avatar,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="grid grid-cols-1 gap-6 md:grid-cols-2" data-v-dd70395c${_scopeId}><div class="md:col-span-2" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                for: "personal_name",
                value: "Nama Lengkap",
                class: "mb-1 font-bold"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$7, {
                id: "personal_name",
                modelValue: unref(personalForm).name,
                "onUpdate:modelValue": ($event) => unref(personalForm).name = $event,
                type: "text",
                class: "block h-12 w-full rounded-xl text-sm font-medium",
                required: ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(personalForm).errors.name,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="md:col-span-1" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                for: "personal_phone",
                value: "Nomor Telepon",
                class: "mb-1 font-bold"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$7, {
                id: "personal_phone",
                modelValue: unref(personalForm).phone,
                "onUpdate:modelValue": ($event) => unref(personalForm).phone = $event,
                type: "text",
                class: "block h-12 w-full rounded-xl text-sm"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(personalForm).errors.phone,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="md:col-span-1" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                for: "personal_email",
                value: "Email",
                class: "mb-1 font-bold"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$7, {
                id: "personal_email",
                modelValue: unref(personalForm).email,
                "onUpdate:modelValue": ($event) => unref(personalForm).email = $event,
                type: "email",
                class: "block h-12 w-full rounded-xl text-sm bg-muted/50",
                disabled: ""
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="md:col-span-1" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                for: "date_of_birth",
                value: "Tanggal Lahir",
                class: "mb-1 font-bold"
              }, null, _parent2, _scopeId));
              _push2(`<div class="relative" data-v-dd70395c${_scopeId}><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4 text-muted-foreground" }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                id: "date_of_birth",
                modelValue: unref(personalForm).date_of_birth,
                "onUpdate:modelValue": ($event) => unref(personalForm).date_of_birth = $event,
                type: "date",
                class: "block h-12 w-full rounded-xl pl-9 text-sm"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(personalForm).errors.date_of_birth,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="md:col-span-1" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                for: "gender",
                value: "Jenis Kelamin",
                class: "mb-1 font-bold"
              }, null, _parent2, _scopeId));
              _push2(`<select id="gender" class="block h-12 w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary" data-v-dd70395c${_scopeId}><option value="" data-v-dd70395c${ssrIncludeBooleanAttr(Array.isArray(unref(personalForm).gender) ? ssrLooseContain(unref(personalForm).gender, "") : ssrLooseEqual(unref(personalForm).gender, "")) ? " selected" : ""}${_scopeId}>Pilih Jenis Kelamin</option><option value="male" data-v-dd70395c${ssrIncludeBooleanAttr(Array.isArray(unref(personalForm).gender) ? ssrLooseContain(unref(personalForm).gender, "male") : ssrLooseEqual(unref(personalForm).gender, "male")) ? " selected" : ""}${_scopeId}>Laki-laki</option><option value="female" data-v-dd70395c${ssrIncludeBooleanAttr(Array.isArray(unref(personalForm).gender) ? ssrLooseContain(unref(personalForm).gender, "female") : ssrLooseEqual(unref(personalForm).gender, "female")) ? " selected" : ""}${_scopeId}>Perempuan</option><option value="other" data-v-dd70395c${ssrIncludeBooleanAttr(Array.isArray(unref(personalForm).gender) ? ssrLooseContain(unref(personalForm).gender, "other") : ssrLooseEqual(unref(personalForm).gender, "other")) ? " selected" : ""}${_scopeId}>Lainnya</option></select>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(personalForm).errors.gender,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="md:col-span-2" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                for: "personal_bio",
                value: "Bio Singkat",
                class: "mb-1 font-bold"
              }, null, _parent2, _scopeId));
              _push2(`<textarea id="personal_bio" rows="3" class="block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary" data-v-dd70395c${_scopeId}>${ssrInterpolate(unref(personalForm).bio)}</textarea></div><div class="md:col-span-2" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$8, {
                modelValue: unref(personalForm),
                "onUpdate:modelValue": ($event) => isRef(personalForm) ? personalForm.value = $event : null,
                prefix: ""
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="mt-8 flex items-center gap-4 border-t border-border pt-6" data-v-dd70395c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$9, {
                onClick: updatePersonalProfile,
                disabled: unref(personalForm).processing,
                class: "h-12 rounded-xl px-8 text-sm font-black shadow-lg shadow-primary/20"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(personalForm).processing) {
                      _push3(`<span class="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" data-v-dd70395c${_scopeId2}></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(` Simpan Profil Pribadi `);
                  } else {
                    return [
                      unref(personalForm).processing ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      })) : createCommentVNode("", true),
                      createTextVNode(" Simpan Profil Pribadi ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(personalForm).recentlySuccessful) {
                _push2(`<div class="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-600 dark:text-green-400" data-v-dd70395c${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                _push2(`<p class="text-sm font-bold" data-v-dd70395c${_scopeId}>Profil Pribadi Diperbarui!</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              show: cropModalOpen.value,
              onClose: cancelCrop,
              maxWidth: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-card p-6 text-card-foreground" data-v-dd70395c${_scopeId2}><header class="mb-4" data-v-dd70395c${_scopeId2}><h2 class="text-xl font-black" data-v-dd70395c${_scopeId2}>Sesuaikan Foto Profil</h2><p class="mt-1 text-sm text-muted-foreground" data-v-dd70395c${_scopeId2}> Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas. Lingkaran adalah pratinjau hasil akhirnya. </p></header><div class="relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-border bg-black shadow-inner ring-1 ring-border" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Cropper), {
                    ref_key: "cropper",
                    ref: cropper,
                    class: "h-full w-full object-contain",
                    src: imageToCrop.value,
                    "stencil-props": {
                      aspectRatio: 1,
                      movable: false,
                      resizable: false
                    },
                    "resize-image": {
                      adjustStencil: false
                    },
                    "move-image": {
                      adjustStencil: false
                    },
                    "image-restriction": "stencil"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-6 flex items-center justify-end gap-3" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    onClick: cancelCrop,
                    class: "h-11 rounded-xl px-6 font-bold hover:bg-muted"
                  }, {
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
                  _push3(ssrRenderComponent(_sfc_main$9, {
                    onClick: applyCrop,
                    class: "h-11 rounded-xl px-8 font-bold shadow-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terapkan`);
                      } else {
                        return [
                          createTextVNode("Terapkan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-card p-6 text-card-foreground" }, [
                      createVNode("header", { class: "mb-4" }, [
                        createVNode("h2", { class: "text-xl font-black" }, "Sesuaikan Foto Profil"),
                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas. Lingkaran adalah pratinjau hasil akhirnya. ")
                      ]),
                      createVNode("div", { class: "relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-border bg-black shadow-inner ring-1 ring-border" }, [
                        createVNode(unref(Cropper), {
                          ref_key: "cropper",
                          ref: cropper,
                          class: "h-full w-full object-contain",
                          src: imageToCrop.value,
                          "stencil-props": {
                            aspectRatio: 1,
                            movable: false,
                            resizable: false
                          },
                          "resize-image": {
                            adjustStencil: false
                          },
                          "move-image": {
                            adjustStencil: false
                          },
                          "image-restriction": "stencil"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "mt-6 flex items-center justify-end gap-3" }, [
                        createVNode(_sfc_main$4, {
                          onClick: cancelCrop,
                          class: "h-11 rounded-xl px-6 font-bold hover:bg-muted"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$9, {
                          onClick: applyCrop,
                          class: "h-11 rounded-xl px-8 font-bold shadow-lg"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Terapkan")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$a, {
              show: confirmProductDeletion.value,
              onClose: closeModal
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a3, _b3;
                if (_push3) {
                  _push3(`<div class="p-6" data-v-dd70395c${_scopeId2}><div class="flex flex-col items-center justify-center text-center" data-v-dd70395c${_scopeId2}><div class="mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Trash2), { class: "h-6 w-6 text-red-600 dark:text-red-200" }, null, _parent3, _scopeId2));
                  _push3(`</div><h2 class="text-lg font-medium" data-v-dd70395c${_scopeId2}>Konfirmasi Hapus</h2><p class="mt-2 text-sm text-muted-foreground" data-v-dd70395c${_scopeId2}> Apakah Anda yakin ingin menghapus produk <strong data-v-dd70395c${_scopeId2}>${ssrInterpolate((_a3 = productToDelete.value) == null ? void 0 : _a3.title)}</strong>? <br data-v-dd70395c${_scopeId2}> Tindakan ini tidak dapat dibatalkan. </p></div><div class="mt-6 flex justify-center gap-3" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, { onClick: closeModal }, {
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
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    onClick: deleteProduct,
                    class: { "opacity-25": unref(deleteForm).processing },
                    disabled: unref(deleteForm).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ya, Hapus `);
                      } else {
                        return [
                          createTextVNode(" Ya, Hapus ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex flex-col items-center justify-center text-center" }, [
                        createVNode("div", { class: "mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900" }, [
                          createVNode(unref(Trash2), { class: "h-6 w-6 text-red-600 dark:text-red-200" })
                        ]),
                        createVNode("h2", { class: "text-lg font-medium" }, "Konfirmasi Hapus"),
                        createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, [
                          createTextVNode(" Apakah Anda yakin ingin menghapus produk "),
                          createVNode("strong", null, toDisplayString((_b3 = productToDelete.value) == null ? void 0 : _b3.title), 1),
                          createTextVNode("? "),
                          createVNode("br"),
                          createTextVNode(" Tindakan ini tidak dapat dibatalkan. ")
                        ])
                      ]),
                      createVNode("div", { class: "mt-6 flex justify-center gap-3" }, [
                        createVNode(_sfc_main$4, { onClick: closeModal }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, {
                          onClick: deleteProduct,
                          class: { "opacity-25": unref(deleteForm).processing },
                          disabled: unref(deleteForm).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Ya, Hapus ")
                          ]),
                          _: 1
                        }, 8, ["class", "disabled"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$a, {
              show: showDisputeModal.value,
              onClose: ($event) => showDisputeModal.value = false,
              maxWidth: "2xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a3, _b3;
                if (_push3) {
                  _push3(`<div class="p-6" data-v-dd70395c${_scopeId2}><div class="flex items-center justify-between mb-6 border-b border-border pb-4" data-v-dd70395c${_scopeId2}><h3 class="text-xl font-bold flex items-center gap-2" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(AlertTriangle), { class: "text-red-500 h-6 w-6" }, null, _parent3, _scopeId2));
                  _push3(` Detail Komplain Pembeli </h3><button class="text-muted-foreground hover:text-foreground" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(X), { class: "h-6 w-6" }, null, _parent3, _scopeId2));
                  _push3(`</button></div>`);
                  if (selectedDispute.value) {
                    _push3(`<div class="space-y-6" data-v-dd70395c${_scopeId2}><div class="bg-muted/50 p-4 rounded-xl border border-border" data-v-dd70395c${_scopeId2}><p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1" data-v-dd70395c${_scopeId2}>Alasan</p><p class="text-base font-bold text-foreground" data-v-dd70395c${_scopeId2}>${ssrInterpolate(selectedDispute.value.reason === "not_delivered" ? "Barang Belum Sampai" : selectedDispute.value.reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : selectedDispute.value.reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya")}</p></div><div data-v-dd70395c${_scopeId2}><p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1" data-v-dd70395c${_scopeId2}>Deskripsi Masalah</p><p class="text-sm leading-relaxed text-foreground whitespace-pre-line" data-v-dd70395c${_scopeId2}>${ssrInterpolate(selectedDispute.value.description)}</p></div>`);
                    if (((_a3 = selectedDispute.value.evidence_images) == null ? void 0 : _a3.length) > 0) {
                      _push3(`<div data-v-dd70395c${_scopeId2}><p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3" data-v-dd70395c${_scopeId2}>Foto Bukti</p><div class="grid grid-cols-2 sm:grid-cols-4 gap-4" data-v-dd70395c${_scopeId2}><!--[-->`);
                      ssrRenderList(selectedDispute.value.evidence_images, (img, idx) => {
                        _push3(`<a${ssrRenderAttr("href", `/storage/${img}`)} target="_blank" class="aspect-square rounded-xl border border-border overflow-hidden hover:opacity-80 transition-opacity" data-v-dd70395c${_scopeId2}><img${ssrRenderAttr("src", `/storage/${img}`)} class="h-full w-full object-cover" data-v-dd70395c${_scopeId2}></a>`);
                      });
                      _push3(`<!--]--></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800" data-v-dd70395c${_scopeId2}><p class="text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium" data-v-dd70395c${_scopeId2}><strong data-v-dd70395c${_scopeId2}>Catatan:</strong> Status transaksi telah berubah menjadi <strong data-v-dd70395c${_scopeId2}>Disputed</strong>. Admin akan meninjau bukti yang ada dan memberikan keputusan segera. Dana Anda tertahan sementara di sistem. </p></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="mt-8 flex justify-end border-t border-border pt-4" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    onClick: ($event) => showDisputeModal.value = false
                  }, {
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-6 border-b border-border pb-4" }, [
                        createVNode("h3", { class: "text-xl font-bold flex items-center gap-2" }, [
                          createVNode(unref(AlertTriangle), { class: "text-red-500 h-6 w-6" }),
                          createTextVNode(" Detail Komplain Pembeli ")
                        ]),
                        createVNode("button", {
                          onClick: ($event) => showDisputeModal.value = false,
                          class: "text-muted-foreground hover:text-foreground"
                        }, [
                          createVNode(unref(X), { class: "h-6 w-6" })
                        ], 8, ["onClick"])
                      ]),
                      selectedDispute.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "bg-muted/50 p-4 rounded-xl border border-border" }, [
                          createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1" }, "Alasan"),
                          createVNode("p", { class: "text-base font-bold text-foreground" }, toDisplayString(selectedDispute.value.reason === "not_delivered" ? "Barang Belum Sampai" : selectedDispute.value.reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : selectedDispute.value.reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1" }, "Deskripsi Masalah"),
                          createVNode("p", { class: "text-sm leading-relaxed text-foreground whitespace-pre-line" }, toDisplayString(selectedDispute.value.description), 1)
                        ]),
                        ((_b3 = selectedDispute.value.evidence_images) == null ? void 0 : _b3.length) > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3" }, "Foto Bukti"),
                          createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-4 gap-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(selectedDispute.value.evidence_images, (img, idx) => {
                              return openBlock(), createBlock("a", {
                                key: idx,
                                href: `/storage/${img}`,
                                target: "_blank",
                                class: "aspect-square rounded-xl border border-border overflow-hidden hover:opacity-80 transition-opacity"
                              }, [
                                createVNode("img", {
                                  src: `/storage/${img}`,
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])
                              ], 8, ["href"]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800" }, [
                          createVNode("p", { class: "text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium" }, [
                            createVNode("strong", null, "Catatan:"),
                            createTextVNode(" Status transaksi telah berubah menjadi "),
                            createVNode("strong", null, "Disputed"),
                            createTextVNode(". Admin akan meninjau bukti yang ada dan memberikan keputusan segera. Dana Anda tertahan sementara di sistem. ")
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-8 flex justify-end border-t border-border pt-4" }, [
                        createVNode(_sfc_main$4, {
                          onClick: ($event) => showDisputeModal.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Tutup")
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
            _push2(ssrRenderComponent(_sfc_main$a, {
              show: shipModal.value,
              onClose: ($event) => shipModal.value = false,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6" data-v-dd70395c${_scopeId2}><div class="mb-6 flex items-center justify-between border-b border-border pb-4" data-v-dd70395c${_scopeId2}><h3 class="flex items-center gap-2 text-lg font-bold" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Truck), { class: "h-5 w-5 text-purple-600" }, null, _parent3, _scopeId2));
                  _push3(` Input Nomor Resi </h3><button class="text-muted-foreground hover:text-foreground" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                  _push3(`</button></div><form class="space-y-4" data-v-dd70395c${_scopeId2}><div data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, { value: "Nama Ekspedisi" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    modelValue: unref(shipForm).courier_name,
                    "onUpdate:modelValue": ($event) => unref(shipForm).courier_name = $event,
                    placeholder: "JNE, J&T, SiCepat, dll.",
                    class: "mt-1 block w-full",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: unref(shipForm).errors.courier_name,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, { value: "Nomor Resi" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    modelValue: unref(shipForm).tracking_number,
                    "onUpdate:modelValue": ($event) => unref(shipForm).tracking_number = $event,
                    placeholder: "Masukkan nomor resi...",
                    class: "mt-1 block w-full font-mono",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: unref(shipForm).errors.tracking_number,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, { value: "Catatan untuk Buyer (opsional)" }, null, _parent3, _scopeId2));
                  _push3(`<textarea rows="2" placeholder="Misal: Barang sudah dikemas rapi, sudah di-bubblewrap..." class="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" data-v-dd70395c${_scopeId2}>${ssrInterpolate(unref(shipForm).seller_notes)}</textarea></div><div class="flex justify-end gap-2 pt-2" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    type: "button",
                    onClick: ($event) => shipModal.value = false
                  }, {
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
                  _push3(ssrRenderComponent(_sfc_main$9, {
                    type: "submit",
                    disabled: unref(shipForm).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Truck), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Simpan &amp; Konfirmasi Pengiriman `);
                      } else {
                        return [
                          createVNode(unref(Truck), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Simpan & Konfirmasi Pengiriman ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between border-b border-border pb-4" }, [
                        createVNode("h3", { class: "flex items-center gap-2 text-lg font-bold" }, [
                          createVNode(unref(Truck), { class: "h-5 w-5 text-purple-600" }),
                          createTextVNode(" Input Nomor Resi ")
                        ]),
                        createVNode("button", {
                          onClick: ($event) => shipModal.value = false,
                          class: "text-muted-foreground hover:text-foreground"
                        }, [
                          createVNode(unref(X), { class: "h-5 w-5" })
                        ], 8, ["onClick"])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitShipment, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$6, { value: "Nama Ekspedisi" }),
                          createVNode(_sfc_main$7, {
                            modelValue: unref(shipForm).courier_name,
                            "onUpdate:modelValue": ($event) => unref(shipForm).courier_name = $event,
                            placeholder: "JNE, J&T, SiCepat, dll.",
                            class: "mt-1 block w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(shipForm).errors.courier_name,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$6, { value: "Nomor Resi" }),
                          createVNode(_sfc_main$7, {
                            modelValue: unref(shipForm).tracking_number,
                            "onUpdate:modelValue": ($event) => unref(shipForm).tracking_number = $event,
                            placeholder: "Masukkan nomor resi...",
                            class: "mt-1 block w-full font-mono",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(shipForm).errors.tracking_number,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$6, { value: "Catatan untuk Buyer (opsional)" }),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(shipForm).seller_notes = $event,
                            rows: "2",
                            placeholder: "Misal: Barang sudah dikemas rapi, sudah di-bubblewrap...",
                            class: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(shipForm).seller_notes]
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                          createVNode(_sfc_main$4, {
                            type: "button",
                            onClick: ($event) => shipModal.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_sfc_main$9, {
                            type: "submit",
                            disabled: unref(shipForm).processing
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Truck), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Simpan & Konfirmasi Pengiriman ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$a, {
              show: codModal.value,
              onClose: ($event) => codModal.value = false,
              maxWidth: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6" data-v-dd70395c${_scopeId2}><div class="mb-6 flex items-center justify-between border-b border-border pb-4" data-v-dd70395c${_scopeId2}><h3 class="flex items-center gap-2 text-lg font-bold" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Users), { class: "h-5 w-5 text-teal-600" }, null, _parent3, _scopeId2));
                  _push3(` Konfirmasi Meetup COD </h3><button class="text-muted-foreground hover:text-foreground" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                  _push3(`</button></div><form class="space-y-4" data-v-dd70395c${_scopeId2}><div data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, { value: "Lokasi Meetup" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    modelValue: unref(codForm).cod_location,
                    "onUpdate:modelValue": ($event) => unref(codForm).cod_location = $event,
                    placeholder: "Nama tempat / alamat lengkap...",
                    class: "mt-1 block w-full",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: unref(codForm).errors.cod_location,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, { value: "Waktu Meetup" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    modelValue: unref(codForm).cod_scheduled_at,
                    "onUpdate:modelValue": ($event) => unref(codForm).cod_scheduled_at = $event,
                    type: "datetime-local",
                    class: "mt-1 block w-full",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: unref(codForm).errors.cod_scheduled_at,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, { value: "Pesan untuk Buyer (opsional)" }, null, _parent3, _scopeId2));
                  _push3(`<textarea rows="2" placeholder="Misal: Saya pakai baju merah, hubungi sebelum datang..." class="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" data-v-dd70395c${_scopeId2}>${ssrInterpolate(unref(codForm).seller_notes)}</textarea></div><div class="rounded-xl border border-teal-200 bg-teal-50/50 p-3 text-sm text-teal-700 dark:border-teal-800 dark:bg-teal-900/10 dark:text-teal-300" data-v-dd70395c${_scopeId2}> ℹ️ Setelah dikonfirmasi, buyer akan menerima notifikasi detail meetup ini. </div><div class="flex justify-end gap-2 pt-2" data-v-dd70395c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    type: "button",
                    onClick: ($event) => codModal.value = false
                  }, {
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
                  _push3(ssrRenderComponent(_sfc_main$9, {
                    type: "submit",
                    disabled: unref(codForm).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Users), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Konfirmasi COD `);
                      } else {
                        return [
                          createVNode(unref(Users), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Konfirmasi COD ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between border-b border-border pb-4" }, [
                        createVNode("h3", { class: "flex items-center gap-2 text-lg font-bold" }, [
                          createVNode(unref(Users), { class: "h-5 w-5 text-teal-600" }),
                          createTextVNode(" Konfirmasi Meetup COD ")
                        ]),
                        createVNode("button", {
                          onClick: ($event) => codModal.value = false,
                          class: "text-muted-foreground hover:text-foreground"
                        }, [
                          createVNode(unref(X), { class: "h-5 w-5" })
                        ], 8, ["onClick"])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitCodConfirm, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$6, { value: "Lokasi Meetup" }),
                          createVNode(_sfc_main$7, {
                            modelValue: unref(codForm).cod_location,
                            "onUpdate:modelValue": ($event) => unref(codForm).cod_location = $event,
                            placeholder: "Nama tempat / alamat lengkap...",
                            class: "mt-1 block w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(codForm).errors.cod_location,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$6, { value: "Waktu Meetup" }),
                          createVNode(_sfc_main$7, {
                            modelValue: unref(codForm).cod_scheduled_at,
                            "onUpdate:modelValue": ($event) => unref(codForm).cod_scheduled_at = $event,
                            type: "datetime-local",
                            class: "mt-1 block w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(codForm).errors.cod_scheduled_at,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$6, { value: "Pesan untuk Buyer (opsional)" }),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(codForm).seller_notes = $event,
                            rows: "2",
                            placeholder: "Misal: Saya pakai baju merah, hubungi sebelum datang...",
                            class: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(codForm).seller_notes]
                          ])
                        ]),
                        createVNode("div", { class: "rounded-xl border border-teal-200 bg-teal-50/50 p-3 text-sm text-teal-700 dark:border-teal-800 dark:bg-teal-900/10 dark:text-teal-300" }, " ℹ️ Setelah dikonfirmasi, buyer akan menerima notifikasi detail meetup ini. "),
                        createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                          createVNode(_sfc_main$4, {
                            type: "button",
                            onClick: ($event) => codModal.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_sfc_main$9, {
                            type: "submit",
                            disabled: unref(codForm).processing
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Users), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Konfirmasi COD ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Seller Dashboard" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mx-auto flex max-w-2xl space-x-1 rounded-xl bg-muted p-1 sm:mx-0" }, [
                    createVNode("button", {
                      onClick: ($event) => tab.value = "overview",
                      class: [tab.value === "overview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"]
                    }, [
                      createVNode(unref(LayoutDashboard), { class: "h-4 w-4" }),
                      createTextVNode(" Ringkasan ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "transactions",
                      class: [tab.value === "transactions" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"]
                    }, [
                      createVNode(unref(ShoppingBag), { class: "h-4 w-4" }),
                      createTextVNode(" Pesanan ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "negotiations",
                      class: [tab.value === "negotiations" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"]
                    }, [
                      createVNode(unref(Tag), { class: "h-4 w-4" }),
                      createTextVNode(" Penawaran ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "settings",
                      class: [tab.value === "settings" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"]
                    }, [
                      createVNode(unref(Settings), { class: "h-4 w-4" }),
                      createTextVNode(" Pengaturan ")
                    ], 10, ["onClick"])
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "mb-6 border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8" }, [
                      createVNode("header", { class: "mb-6" }, [
                        createVNode("h2", { class: "text-lg font-medium" }, "Statistik Toko"),
                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Ringkasan performa penjualan Anda saat ini. ")
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4" }, [
                        createVNode("div", { class: "rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6" }, [
                          createVNode("div", { class: "mb-2 flex items-center justify-between" }, [
                            createVNode("p", { class: "text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs" }, " Total Pendapatan "),
                            createVNode(unref(CreditCard), { class: "h-4 w-4 text-indigo-500 sm:h-5 sm:w-5" })
                          ]),
                          createVNode("p", { class: "mt-2 text-lg font-black text-indigo-600 dark:text-indigo-400 sm:text-2xl truncate" }, " Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(__props.totalRevenue || 0)), 1)
                        ]),
                        createVNode("div", {
                          onClick: ($event) => tab.value = "transactions",
                          class: "rounded-2xl border border-border bg-muted p-4 transition-colors cursor-pointer hover:bg-accent/50 hover:border-amber-500/30 sm:p-6"
                        }, [
                          createVNode("div", { class: "mb-2 flex items-center justify-between" }, [
                            createVNode("p", { class: "text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs" }, " Pesanan Aktif "),
                            createVNode(unref(Clock), { class: "h-4 w-4 text-amber-500 sm:h-5 sm:w-5" })
                          ]),
                          createVNode("p", { class: "mt-2 text-xl font-black text-amber-600 dark:text-amber-400 sm:text-3xl" }, toDisplayString(__props.pendingOrders || 0), 1)
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => tab.value = "transactions",
                          class: "rounded-2xl border border-border bg-muted p-4 transition-colors cursor-pointer hover:bg-accent/50 hover:border-emerald-500/30 sm:p-6"
                        }, [
                          createVNode("div", { class: "mb-2 flex items-center justify-between" }, [
                            createVNode("p", { class: "text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs" }, " Total Terjual "),
                            createVNode(unref(ShoppingBag), { class: "h-4 w-4 text-emerald-500 sm:h-5 sm:w-5" })
                          ]),
                          createVNode("p", { class: "mt-2 text-xl font-black text-emerald-600 dark:text-emerald-400 sm:text-3xl" }, toDisplayString(__props.transactionsCount || 0), 1)
                        ], 8, ["onClick"]),
                        createVNode("div", { class: "rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6" }, [
                          createVNode("div", { class: "mb-2 flex items-center justify-between" }, [
                            createVNode("p", { class: "text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs" }, " Produk Aktif "),
                            createVNode(unref(Package), { class: "h-4 w-4 text-blue-500 sm:h-5 sm:w-5" })
                          ]),
                          createVNode("p", { class: "mt-2 text-xl font-black text-blue-600 dark:text-blue-400 sm:text-3xl" }, toDisplayString(__props.productsCount || 0), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-bold" }, "Produk Saya"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Kelola barang dagangan Anda.")
                        ]),
                        createVNode(unref(Link), {
                          href: _ctx.route("products.create"),
                          class: "inline-flex items-center rounded-xl border border-transparent bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-md transition duration-150 hover:bg-primary/90"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Tambah Produk")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("div", { class: "easy-table-wrapper hidden md:block" }, [
                        createVNode(_component_EasyDataTable, {
                          headers: productHeaders,
                          items: allMyProducts.value,
                          "hide-footer": "",
                          "border-cell": "",
                          "table-class-name": "customize-table",
                          "header-class-name": "customize-header"
                        }, {
                          "item-title": withCtx(({ title, images, category }) => [
                            createVNode("div", { class: "flex items-center gap-4 py-2" }, [
                              createVNode("div", { class: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" }, [
                                images && images.length > 0 ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: `/storage/${images[0].image_path}`,
                                  loading: "lazy",
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex h-full w-full items-center justify-center text-muted-foreground"
                                }, [
                                  createVNode(unref(Image), { class: "h-6 w-6" })
                                ]))
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("div", { class: "line-clamp-1 text-base font-bold text-foreground" }, toDisplayString(title), 1),
                                createVNode("div", { class: "text-xs text-muted-foreground/80" }, toDisplayString(category == null ? void 0 : category.name), 1)
                              ])
                            ])
                          ]),
                          "item-price": withCtx(({ price }) => [
                            createVNode("span", { class: "font-medium text-foreground" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(price)), 1)
                          ]),
                          "item-status": withCtx((item) => [
                            createVNode("div", { class: "flex flex-col items-center gap-1 py-2" }, [
                              createVNode("button", {
                                onClick: ($event) => item.availability !== "sold" && toggleStatus(item),
                                disabled: item.availability === "sold",
                                class: ["inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all", [
                                  item.availability === "sold" ? "opacity-60 cursor-not-allowed" : "active:scale-90 hover:scale-105",
                                  item.availability === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400"
                                ]]
                              }, [
                                item.availability === "available" ? (openBlock(), createBlock(unref(CheckCircle), {
                                  key: 0,
                                  class: "h-3.5 w-3.5"
                                })) : (openBlock(), createBlock(_component_Circle, {
                                  key: 1,
                                  class: "h-3.5 w-3.5"
                                })),
                                createTextVNode(" " + toDisplayString(item.availability === "available" ? "Tersedia" : "Terjual"), 1)
                              ], 10, ["onClick", "disabled"]),
                              item.status !== "active" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: ["text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border", {
                                  "border-amber-200 bg-amber-50 text-amber-600": item.status === "pending",
                                  "border-red-200 bg-red-50 text-red-600": item.status === "rejected",
                                  "border-destructive/30 bg-destructive/10 text-destructive": item.status === "banned"
                                }]
                              }, toDisplayString(item.status === "pending" ? "Moderasi" : item.status === "rejected" ? "Ditolak" : "Dibanned"), 3)) : createCommentVNode("", true)
                            ])
                          ]),
                          "item-created_at": withCtx(({ created_at }) => [
                            createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })), 1)
                          ]),
                          "item-actions": withCtx((item) => [
                            createVNode("div", { class: "flex items-center justify-end gap-2 py-2" }, [
                              item.availability !== "sold" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("products.edit", item.slug),
                                  class: "inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition hover:bg-muted"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Edit ")
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode(_sfc_main$2, {
                                  onClick: ($event) => confirmDeletion(item)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Hapus")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ], 64)) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-xs italic text-muted-foreground mr-2 border border-border px-3 py-1.5 rounded-md bg-muted"
                              }, " Terkunci (Terjual) "))
                            ])
                          ]),
                          "empty-message": withCtx(() => [
                            createVNode("div", { class: "py-12 text-center text-muted-foreground" }, [
                              createVNode("div", { class: "flex flex-col items-center" }, [
                                createVNode("span", { class: "mb-2" }, "Belum ada produk yang dijual."),
                                createVNode(unref(Link), {
                                  href: _ctx.route("products.create"),
                                  class: "font-bold text-primary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("+ Tambah Produk Baru")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ])
                            ])
                          ]),
                          _: 1
                        }, 8, ["items"])
                      ]),
                      createVNode("div", { class: "divide-y divide-border md:hidden" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(allMyProducts.value, (item) => {
                          var _a3;
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "flex flex-col gap-4 p-4"
                          }, [
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode("div", { class: "h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted" }, [
                                item.images && item.images.length > 0 ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: `/storage/${item.images[0].image_path}`,
                                  loading: "lazy",
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex h-full w-full items-center justify-center text-muted-foreground"
                                }, [
                                  createVNode(unref(Image), { class: "h-8 w-8" })
                                ]))
                              ]),
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode("div", { class: "truncate text-base font-bold" }, toDisplayString(item.title), 1),
                                createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString((_a3 = item.category) == null ? void 0 : _a3.name), 1),
                                createVNode("div", { class: "mt-1 font-bold text-primary" }, " Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(item.price)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "flex items-center justify-between gap-4 border-t border-border pt-2" }, [
                              createVNode("div", { class: "flex flex-col gap-1" }, [
                                createVNode("button", {
                                  onClick: ($event) => item.availability !== "sold" && toggleStatus(item),
                                  disabled: item.availability === "sold",
                                  class: ["inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all", [
                                    item.availability === "sold" ? "opacity-60 cursor-not-allowed" : "active:scale-90",
                                    item.availability === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400"
                                  ]]
                                }, [
                                  item.availability === "available" ? (openBlock(), createBlock(unref(CheckCircle), {
                                    key: 0,
                                    class: "h-3 w-3"
                                  })) : (openBlock(), createBlock(_component_Circle, {
                                    key: 1,
                                    class: "h-3 w-3"
                                  })),
                                  createTextVNode(" " + toDisplayString(item.availability === "available" ? "Tersedia" : "Terjual"), 1)
                                ], 10, ["onClick", "disabled"]),
                                item.status !== "active" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: ["inline-block text-[8px] font-black uppercase tracking-tighter px-1 rounded border self-start", {
                                    "border-amber-200 bg-amber-50 text-amber-600": item.status === "pending",
                                    "border-red-200 bg-red-50 text-red-600": item.status === "rejected",
                                    "border-destructive/30 bg-destructive/10 text-destructive": item.status === "banned"
                                  }]
                                }, toDisplayString(item.status === "pending" ? "Moderasi" : item.status === "rejected" ? "Ditolak" : "Dibanned"), 3)) : createCommentVNode("", true),
                                createVNode("span", { class: "text-[10px] text-muted-foreground" }, toDisplayString(new Date(item.created_at).toLocaleDateString("id-ID")), 1)
                              ]),
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                item.availability !== "sold" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("products.edit", item.slug),
                                    class: "rounded-lg p-2 text-muted-foreground transition hover:bg-accent"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Edit3), { class: "h-5 w-5" })
                                    ]),
                                    _: 1
                                  }, 8, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => confirmDeletion(item),
                                    class: "rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
                                  }, [
                                    createVNode(unref(Trash2), { class: "h-5 w-5" })
                                  ], 8, ["onClick"])
                                ], 64)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-[10px] italic text-muted-foreground"
                                }, "Terkunci"))
                              ])
                            ])
                          ]);
                        }), 128))
                      ]),
                      createVNode("div", {
                        ref_key: "loadMoreTrigger",
                        ref: loadMoreTrigger,
                        class: "mt-8 flex justify-center pb-4"
                      }, [
                        loading.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-col items-center gap-2"
                        }, [
                          createVNode("div", { class: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }),
                          createVNode("span", { class: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground" }, "Memuat produk...")
                        ])) : !nextUrl.value && allMyProducts.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-4 text-center"
                        }, [
                          createVNode("span", { class: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50" }, "Semua produk ditampilkan")
                        ])) : createCommentVNode("", true)
                      ], 512)
                    ])
                  ], 512), [
                    [vShow, tab.value === "overview"]
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8" }, [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode("h3", { class: "text-lg font-bold" }, "Pesanan Masuk"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Kelola transaksi penjualan Anda.")
                      ]),
                      createVNode("div", { class: "easy-table-wrapper" }, [
                        createVNode(_component_EasyDataTable, {
                          headers: transactionHeaders,
                          items: __props.transactions.data,
                          "hide-footer": "",
                          "border-cell": "",
                          "table-class-name": "customize-table",
                          "header-class-name": "customize-header"
                        }, {
                          "item-transaction": withCtx(({ reference_number, product }) => {
                            var _a3;
                            return [
                              createVNode("div", { class: "flex items-center gap-3 py-2" }, [
                                createVNode("div", { class: "h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" }, [
                                  ((_a3 = product.images) == null ? void 0 : _a3.length) > 0 ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${product.images[0].image_path}`,
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("div", { class: "font-bold truncate text-foreground" }, "#" + toDisplayString(reference_number), 1),
                                  createVNode("div", { class: "text-[10px] text-muted-foreground/80 truncate max-w-[150px]" }, toDisplayString(product.title), 1)
                                ])
                              ])
                            ];
                          }),
                          "item-buyer": withCtx(({ buyer }) => [
                            createVNode("div", { class: "py-2" }, [
                              createVNode("div", { class: "text-sm font-medium text-foreground" }, toDisplayString(buyer.name), 1),
                              createVNode("div", { class: "text-[10px] text-muted-foreground/80" }, toDisplayString(buyer.email), 1)
                            ])
                          ]),
                          "item-total": withCtx(({ price }) => [
                            createVNode("span", { class: "font-bold text-foreground" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(price)), 1)
                          ]),
                          "item-status": withCtx(({ status, payment_method }) => [
                            createVNode("div", { class: "flex flex-col items-start gap-1 py-2" }, [
                              createVNode("span", {
                                class: ["px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border", {
                                  "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400": ["pending", "cod_requested"].includes(status),
                                  "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400": status === "paid",
                                  "border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400": status === "processing",
                                  "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400": status === "shipped",
                                  "border-teal-200 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400": ["delivered", "cod_confirmed"].includes(status),
                                  "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400": status === "completed",
                                  "border-red-200 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400": status === "disputed",
                                  "border-slate-200 bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400": status === "canceled"
                                }]
                              }, toDisplayString(getStatusLabel(status)), 3),
                              payment_method === "cod" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-orange-500"
                              }, [
                                createVNode(unref(Users), { class: "h-2.5 w-2.5" }),
                                createTextVNode(" COD ")
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-blue-500"
                              }, [
                                createVNode(unref(CreditCard), { class: "h-2.5 w-2.5" }),
                                createTextVNode(" Rekber ")
                              ]))
                            ])
                          ]),
                          "item-actions": withCtx((item) => [
                            createVNode("div", { class: "flex flex-wrap items-center justify-end gap-1.5 py-2" }, [
                              item.payment_method === "rekber" || !item.payment_method ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                item.status === "paid" ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => openShipModal(item),
                                  class: "inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-[10px] font-bold rounded-lg hover:bg-purple-700 transition-colors"
                                }, [
                                  createVNode(unref(Truck), { class: "h-3 w-3" }),
                                  createTextVNode(" Input Resi ")
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                item.status === "pending" || item.status === "paid" ? withDirectives((openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => unref(router).post(_ctx.route("transactions.update-status", item.id), { status: "processing" }),
                                  class: "inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-600 transition-colors"
                                }, " Tandai Diproses ", 8, ["onClick"])), [
                                  [vShow, item.status === "paid"]
                                ]) : createCommentVNode("", true)
                              ], 64)) : createCommentVNode("", true),
                              item.payment_method === "cod" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                item.status === "cod_requested" ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => openCodModal(item),
                                  class: "inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-[10px] font-bold rounded-lg hover:bg-teal-700 transition-colors"
                                }, [
                                  createVNode(unref(Users), { class: "h-3 w-3" }),
                                  createTextVNode(" Konfirmasi COD ")
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                item.status === "cod_requested" ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => rejectCod(item),
                                  class: "inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-colors"
                                }, " Tolak COD ", 8, ["onClick"])) : createCommentVNode("", true),
                                item.status === "cod_confirmed" ? (openBlock(), createBlock("button", {
                                  key: 2,
                                  onClick: ($event) => unref(router).post(_ctx.route("transactions.cod-complete", item.id)),
                                  class: "inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-lg hover:bg-orange-600 transition-colors"
                                }, " COD Selesai ", 8, ["onClick"])) : createCommentVNode("", true)
                              ], 64)) : createCommentVNode("", true),
                              item.status === "disputed" ? (openBlock(), createBlock("button", {
                                key: 2,
                                onClick: ($event) => openDisputeDetail(item),
                                class: "inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
                              }, [
                                createVNode(unref(AlertTriangle), { class: "h-3 w-3" }),
                                createTextVNode(" Detail Komplain ")
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ]),
                          "empty-message": withCtx(() => [
                            createVNode("div", { class: "py-12 text-center text-muted-foreground" }, " Belum ada transaksi masuk. ")
                          ]),
                          _: 1
                        }, 8, ["items"])
                      ]),
                      createVNode("div", { class: "mt-6" }, [
                        createVNode(_sfc_main$3, {
                          links: __props.transactions.links
                        }, null, 8, ["links"])
                      ])
                    ])
                  ], 512), [
                    [vShow, tab.value === "transactions"]
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "mb-8 flex items-center gap-4" }, [
                        createVNode("div", { class: "rounded-2xl bg-primary/10 p-3 text-primary" }, [
                          createVNode(unref(Tag), { class: "h-6 w-6" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-bold text-foreground" }, "Penawaran Harga dari Buyer"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Terima, counter, atau tolak penawaran yang masuk.")
                        ])
                      ]),
                      ((_i2 = (_h2 = __props.negotiations) == null ? void 0 : _h2.data) == null ? void 0 : _i2.length) === 0 ? (openBlock(), createBlock("div", {
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
                        (openBlock(true), createBlock(Fragment, null, renderList((_j2 = __props.negotiations) == null ? void 0 : _j2.data, (nego) => {
                          var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3;
                          return openBlock(), createBlock("div", {
                            key: nego.id,
                            class: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                          }, [
                            createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3" }, [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("div", { class: "h-8 w-8 overflow-hidden rounded-full border border-border bg-muted" }, [
                                  ((_b3 = (_a3 = nego.buyer) == null ? void 0 : _a3.profile) == null ? void 0 : _b3.avatar) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${nego.buyer.profile.avatar}`,
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex h-full w-full items-center justify-center text-xs font-bold text-primary"
                                  }, toDisplayString((_d3 = (_c3 = nego.buyer) == null ? void 0 : _c3.name) == null ? void 0 : _d3.charAt(0)), 1))
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-bold text-foreground" }, toDisplayString((_e3 = nego.buyer) == null ? void 0 : _e3.name), 1),
                                  createVNode("p", { class: "text-[10px] text-muted-foreground" }, toDisplayString(formatDate(nego.created_at)), 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("span", {
                                  class: ["rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider", badgeClass(nego.status)]
                                }, toDisplayString(((_f3 = statusConfig[nego.status]) == null ? void 0 : _f3.label) ?? nego.status), 3),
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
                                  ((_h3 = (_g3 = nego.product) == null ? void 0 : _g3.images) == null ? void 0 : _h3.length) ? (openBlock(), createBlock("img", {
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
                                  createVNode("p", { class: "font-bold text-foreground truncate max-w-xs" }, toDisplayString((_i3 = nego.product) == null ? void 0 : _i3.title), 1),
                                  createVNode("div", { class: "mt-1 flex items-center gap-3 text-sm" }, [
                                    createVNode("span", { class: "text-muted-foreground line-through" }, toDisplayString(formatRp((_j3 = nego.product) == null ? void 0 : _j3.price)), 1),
                                    createVNode("span", { class: "font-black text-primary" }, toDisplayString(formatRp(nego.proposed_price)), 1),
                                    createVNode("span", { class: "rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-900/20 dark:text-red-400" }, " -" + toDisplayString(Math.round((1 - nego.proposed_price / ((_k3 = nego.product) == null ? void 0 : _k3.price)) * 100)) + "% ", 1)
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
                        ((_k2 = __props.negotiations) == null ? void 0 : _k2.links) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-8"
                        }, [
                          createVNode(_sfc_main$3, {
                            links: __props.negotiations.links
                          }, null, 8, ["links"])
                        ])) : createCommentVNode("", true)
                      ]))
                    ])
                  ], 512), [
                    [vShow, tab.value === "negotiations"]
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8" }, [
                      createVNode("div", { class: "max-w-xl" }, [
                        createVNode("header", null, [
                          createVNode("h2", { class: "text-lg font-medium" }, "Profil Toko"),
                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Informasi ini akan ditampilkan di halaman publik toko Anda. ")
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(handleSettingsSubmit, ["prevent"]),
                          class: "mt-6 space-y-6"
                        }, [
                          createVNode("div", { class: "mb-8 p-1 bg-muted rounded-xl flex gap-1" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => tabSettings.value = "store",
                              class: ["flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all", tabSettings.value === "store" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"]
                            }, " Profil Toko ", 10, ["onClick"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => tabSettings.value = "user",
                              class: ["flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all", tabSettings.value === "user" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"]
                            }, " Profil Pribadi ", 10, ["onClick"])
                          ]),
                          tabSettings.value === "store" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-start" }, [
                              createVNode("div", { class: "group relative shrink-0" }, [
                                createVNode("div", { class: "relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border transition-all duration-300 group-hover:ring-primary" }, [
                                  photoPreview.value ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: photoPreview.value,
                                    loading: "lazy",
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : ((_l2 = __props.user.profile) == null ? void 0 : _l2.store_logo) ? (openBlock(), createBlock("img", {
                                    key: 1,
                                    src: `/storage/${__props.user.profile.store_logo}`,
                                    loading: "lazy",
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary"
                                  }, toDisplayString((((_m2 = __props.user.profile) == null ? void 0 : _m2.store_name) || __props.user.name).substring(0, 1)), 1)),
                                  createVNode("div", {
                                    class: "absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100",
                                    onClick: ($event) => photoInput.value.click()
                                  }, [
                                    createVNode(unref(Image), { class: "mb-1 h-6 w-6 text-white" }),
                                    createVNode("span", { class: "text-[10px] font-bold uppercase tracking-wider text-white" }, "Ubah Logo")
                                  ], 8, ["onClick"])
                                ]),
                                createVNode("input", {
                                  type: "file",
                                  ref_key: "photoInput",
                                  ref: photoInput,
                                  class: "hidden",
                                  accept: "image/*",
                                  onChange: ($event) => updatePhotoPreview("store")
                                }, null, 40, ["onChange"]),
                                createVNode("div", { class: "absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow-sm" }, [
                                  createVNode("button", {
                                    type: "button",
                                    onClick: withModifiers(($event) => photoInput.value.click(), ["prevent"]),
                                    class: "rounded-full bg-primary p-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                                  }, [
                                    createVNode(unref(Edit3), { class: "h-4 w-4" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "flex-1 pt-2 text-center sm:text-left" }, [
                                createVNode("h3", { class: "text-lg font-black text-foreground" }, "Foto Profil Toko"),
                                createVNode("p", { class: "mb-4 mt-1 text-sm leading-relaxed text-muted-foreground" }, " Rekomendasi rasio 1:1, maks 2MB. Format file JPG, JPEG, PNG, atau WebP. Gambar yang diunggah akan dapat dicrop secara langsung. "),
                                createVNode(_sfc_main$4, {
                                  onClick: withModifiers(($event) => photoInput.value.click(), ["prevent"]),
                                  class: "border-2 shadow-sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Ganti Logo Toko")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_sfc_main$5, {
                                  message: unref(storeForm).errors.store_logo,
                                  class: "mt-2"
                                }, null, 8, ["message"])
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode(_sfc_main$6, {
                                  for: "store_name",
                                  value: "Nama Toko / Penjual",
                                  class: "mb-1 font-bold"
                                }),
                                createVNode(_sfc_main$7, {
                                  id: "store_name",
                                  modelValue: unref(storeForm).store_name,
                                  "onUpdate:modelValue": ($event) => unref(storeForm).store_name = $event,
                                  type: "text",
                                  class: "block h-12 w-full rounded-xl text-sm font-medium",
                                  placeholder: "Ketik nama toko Anda...",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$5, {
                                  message: unref(storeForm).errors.store_name,
                                  class: "mt-1"
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode(_sfc_main$6, {
                                  for: "store_bio",
                                  value: "Bio / Deskripsi Singkat Toko",
                                  class: "mb-1 font-bold"
                                }),
                                withDirectives(createVNode("textarea", {
                                  id: "store_bio",
                                  "onUpdate:modelValue": ($event) => unref(storeForm).store_bio = $event,
                                  rows: "4",
                                  class: "block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary",
                                  placeholder: "Ceritakan kelebihan toko Anda kepada calon pembeli..."
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(storeForm).store_bio]
                                ]),
                                createVNode(_sfc_main$5, {
                                  message: unref(storeForm).errors.store_bio,
                                  class: "mt-1"
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode(_sfc_main$8, {
                                  modelValue: unref(storeForm),
                                  "onUpdate:modelValue": ($event) => isRef(storeForm) ? storeForm.value = $event : null,
                                  prefix: "store_"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          tabSettings.value === "user" ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-start" }, [
                              createVNode("div", { class: "group relative shrink-0" }, [
                                createVNode("div", { class: "relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border transition-all duration-300 group-hover:ring-primary" }, [
                                  personalPhotoPreview.value ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: personalPhotoPreview.value,
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : ((_n2 = __props.user.profile) == null ? void 0 : _n2.avatar) ? (openBlock(), createBlock("img", {
                                    key: 1,
                                    src: `/storage/${__props.user.profile.avatar}`,
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary"
                                  }, toDisplayString(__props.user.name.charAt(0)), 1)),
                                  createVNode("div", {
                                    class: "absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100",
                                    onClick: ($event) => personalPhotoInput.value.click()
                                  }, [
                                    createVNode(unref(Image), { class: "mb-1 h-6 w-6 text-white" }),
                                    createVNode("span", { class: "text-[10px] font-bold uppercase tracking-wider text-white" }, "Ubah Foto")
                                  ], 8, ["onClick"])
                                ]),
                                createVNode("input", {
                                  type: "file",
                                  ref_key: "personalPhotoInput",
                                  ref: personalPhotoInput,
                                  class: "hidden",
                                  accept: "image/*",
                                  onChange: ($event) => updatePhotoPreview("personal")
                                }, null, 40, ["onChange"])
                              ]),
                              createVNode("div", { class: "flex-1 pt-2 text-center sm:text-left" }, [
                                createVNode("h3", { class: "text-lg font-black text-foreground" }, "Foto Profil Pribadi"),
                                createVNode("p", { class: "mb-4 mt-1 text-sm leading-relaxed text-muted-foreground" }, " Foto ini akan muncul saat Anda mengobrol dengan pembeli atau memberikan ulasan. "),
                                createVNode(_sfc_main$4, {
                                  onClick: withModifiers(($event) => personalPhotoInput.value.click(), ["prevent"]),
                                  class: "border-2 shadow-sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Ganti Foto Profil")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_sfc_main$5, {
                                  message: unref(personalForm).errors.avatar,
                                  class: "mt-2"
                                }, null, 8, ["message"])
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode(_sfc_main$6, {
                                  for: "personal_name",
                                  value: "Nama Lengkap",
                                  class: "mb-1 font-bold"
                                }),
                                createVNode(_sfc_main$7, {
                                  id: "personal_name",
                                  modelValue: unref(personalForm).name,
                                  "onUpdate:modelValue": ($event) => unref(personalForm).name = $event,
                                  type: "text",
                                  class: "block h-12 w-full rounded-xl text-sm font-medium",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$5, {
                                  message: unref(personalForm).errors.name,
                                  class: "mt-1"
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "md:col-span-1" }, [
                                createVNode(_sfc_main$6, {
                                  for: "personal_phone",
                                  value: "Nomor Telepon",
                                  class: "mb-1 font-bold"
                                }),
                                createVNode(_sfc_main$7, {
                                  id: "personal_phone",
                                  modelValue: unref(personalForm).phone,
                                  "onUpdate:modelValue": ($event) => unref(personalForm).phone = $event,
                                  type: "text",
                                  class: "block h-12 w-full rounded-xl text-sm"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$5, {
                                  message: unref(personalForm).errors.phone,
                                  class: "mt-1"
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "md:col-span-1" }, [
                                createVNode(_sfc_main$6, {
                                  for: "personal_email",
                                  value: "Email",
                                  class: "mb-1 font-bold"
                                }),
                                createVNode(_sfc_main$7, {
                                  id: "personal_email",
                                  modelValue: unref(personalForm).email,
                                  "onUpdate:modelValue": ($event) => unref(personalForm).email = $event,
                                  type: "email",
                                  class: "block h-12 w-full rounded-xl text-sm bg-muted/50",
                                  disabled: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "md:col-span-1" }, [
                                createVNode(_sfc_main$6, {
                                  for: "date_of_birth",
                                  value: "Tanggal Lahir",
                                  class: "mb-1 font-bold"
                                }),
                                createVNode("div", { class: "relative" }, [
                                  createVNode("div", { class: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" }, [
                                    createVNode(unref(Calendar), { class: "h-4 w-4 text-muted-foreground" })
                                  ]),
                                  createVNode(_sfc_main$7, {
                                    id: "date_of_birth",
                                    modelValue: unref(personalForm).date_of_birth,
                                    "onUpdate:modelValue": ($event) => unref(personalForm).date_of_birth = $event,
                                    type: "date",
                                    class: "block h-12 w-full rounded-xl pl-9 text-sm"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode(_sfc_main$5, {
                                  message: unref(personalForm).errors.date_of_birth,
                                  class: "mt-1"
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "md:col-span-1" }, [
                                createVNode(_sfc_main$6, {
                                  for: "gender",
                                  value: "Jenis Kelamin",
                                  class: "mb-1 font-bold"
                                }),
                                withDirectives(createVNode("select", {
                                  id: "gender",
                                  "onUpdate:modelValue": ($event) => unref(personalForm).gender = $event,
                                  class: "block h-12 w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary"
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Jenis Kelamin"),
                                  createVNode("option", { value: "male" }, "Laki-laki"),
                                  createVNode("option", { value: "female" }, "Perempuan"),
                                  createVNode("option", { value: "other" }, "Lainnya")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(personalForm).gender]
                                ]),
                                createVNode(_sfc_main$5, {
                                  message: unref(personalForm).errors.gender,
                                  class: "mt-1"
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode(_sfc_main$6, {
                                  for: "personal_bio",
                                  value: "Bio Singkat",
                                  class: "mb-1 font-bold"
                                }),
                                withDirectives(createVNode("textarea", {
                                  id: "personal_bio",
                                  "onUpdate:modelValue": ($event) => unref(personalForm).bio = $event,
                                  rows: "3",
                                  class: "block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(personalForm).bio]
                                ])
                              ]),
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode(_sfc_main$8, {
                                  modelValue: unref(personalForm),
                                  "onUpdate:modelValue": ($event) => isRef(personalForm) ? personalForm.value = $event : null,
                                  prefix: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "mt-8 flex items-center gap-4 border-t border-border pt-6" }, [
                              createVNode(_sfc_main$9, {
                                onClick: updatePersonalProfile,
                                disabled: unref(personalForm).processing,
                                class: "h-12 rounded-xl px-8 text-sm font-black shadow-lg shadow-primary/20"
                              }, {
                                default: withCtx(() => [
                                  unref(personalForm).processing ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" Simpan Profil Pribadi ")
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(Transition, {
                                "enter-from-class": "opacity-0 -translate-y-2",
                                "leave-to-class": "opacity-0 translate-y-2",
                                class: "transition duration-300 ease-out"
                              }, {
                                default: withCtx(() => [
                                  unref(personalForm).recentlySuccessful ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-600 dark:text-green-400"
                                  }, [
                                    createVNode(unref(CheckCircle), { class: "h-4 w-4" }),
                                    createVNode("p", { class: "text-sm font-bold" }, "Profil Pribadi Diperbarui!")
                                  ])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ])
                          ])) : createCommentVNode("", true)
                        ], 32)
                      ])
                    ])
                  ], 512), [
                    [vShow, tab.value === "settings"]
                  ]),
                  createVNode(_sfc_main$a, {
                    show: cropModalOpen.value,
                    onClose: cancelCrop,
                    maxWidth: "xl"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "bg-card p-6 text-card-foreground" }, [
                        createVNode("header", { class: "mb-4" }, [
                          createVNode("h2", { class: "text-xl font-black" }, "Sesuaikan Foto Profil"),
                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas. Lingkaran adalah pratinjau hasil akhirnya. ")
                        ]),
                        createVNode("div", { class: "relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-border bg-black shadow-inner ring-1 ring-border" }, [
                          createVNode(unref(Cropper), {
                            ref_key: "cropper",
                            ref: cropper,
                            class: "h-full w-full object-contain",
                            src: imageToCrop.value,
                            "stencil-props": {
                              aspectRatio: 1,
                              movable: false,
                              resizable: false
                            },
                            "resize-image": {
                              adjustStencil: false
                            },
                            "move-image": {
                              adjustStencil: false
                            },
                            "image-restriction": "stencil"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "mt-6 flex items-center justify-end gap-3" }, [
                          createVNode(_sfc_main$4, {
                            onClick: cancelCrop,
                            class: "h-11 rounded-xl px-6 font-bold hover:bg-muted"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$9, {
                            onClick: applyCrop,
                            class: "h-11 rounded-xl px-8 font-bold shadow-lg"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Terapkan")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["show"]),
                  createVNode(_sfc_main$a, {
                    show: confirmProductDeletion.value,
                    onClose: closeModal
                  }, {
                    default: withCtx(() => {
                      var _a3;
                      return [
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "flex flex-col items-center justify-center text-center" }, [
                            createVNode("div", { class: "mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900" }, [
                              createVNode(unref(Trash2), { class: "h-6 w-6 text-red-600 dark:text-red-200" })
                            ]),
                            createVNode("h2", { class: "text-lg font-medium" }, "Konfirmasi Hapus"),
                            createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, [
                              createTextVNode(" Apakah Anda yakin ingin menghapus produk "),
                              createVNode("strong", null, toDisplayString((_a3 = productToDelete.value) == null ? void 0 : _a3.title), 1),
                              createTextVNode("? "),
                              createVNode("br"),
                              createTextVNode(" Tindakan ini tidak dapat dibatalkan. ")
                            ])
                          ]),
                          createVNode("div", { class: "mt-6 flex justify-center gap-3" }, [
                            createVNode(_sfc_main$4, { onClick: closeModal }, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$2, {
                              onClick: deleteProduct,
                              class: { "opacity-25": unref(deleteForm).processing },
                              disabled: unref(deleteForm).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ya, Hapus ")
                              ]),
                              _: 1
                            }, 8, ["class", "disabled"])
                          ])
                        ])
                      ];
                    }),
                    _: 1
                  }, 8, ["show"]),
                  createVNode(_sfc_main$a, {
                    show: showDisputeModal.value,
                    onClose: ($event) => showDisputeModal.value = false,
                    maxWidth: "2xl"
                  }, {
                    default: withCtx(() => {
                      var _a3;
                      return [
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-6 border-b border-border pb-4" }, [
                            createVNode("h3", { class: "text-xl font-bold flex items-center gap-2" }, [
                              createVNode(unref(AlertTriangle), { class: "text-red-500 h-6 w-6" }),
                              createTextVNode(" Detail Komplain Pembeli ")
                            ]),
                            createVNode("button", {
                              onClick: ($event) => showDisputeModal.value = false,
                              class: "text-muted-foreground hover:text-foreground"
                            }, [
                              createVNode(unref(X), { class: "h-6 w-6" })
                            ], 8, ["onClick"])
                          ]),
                          selectedDispute.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-6"
                          }, [
                            createVNode("div", { class: "bg-muted/50 p-4 rounded-xl border border-border" }, [
                              createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1" }, "Alasan"),
                              createVNode("p", { class: "text-base font-bold text-foreground" }, toDisplayString(selectedDispute.value.reason === "not_delivered" ? "Barang Belum Sampai" : selectedDispute.value.reason === "not_as_described" ? "Barang Tidak Sesuai Deskripsi" : selectedDispute.value.reason === "damaged" ? "Barang Rusak / Cacat" : "Lainnya"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1" }, "Deskripsi Masalah"),
                              createVNode("p", { class: "text-sm leading-relaxed text-foreground whitespace-pre-line" }, toDisplayString(selectedDispute.value.description), 1)
                            ]),
                            ((_a3 = selectedDispute.value.evidence_images) == null ? void 0 : _a3.length) > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3" }, "Foto Bukti"),
                              createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-4 gap-4" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(selectedDispute.value.evidence_images, (img, idx) => {
                                  return openBlock(), createBlock("a", {
                                    key: idx,
                                    href: `/storage/${img}`,
                                    target: "_blank",
                                    class: "aspect-square rounded-xl border border-border overflow-hidden hover:opacity-80 transition-opacity"
                                  }, [
                                    createVNode("img", {
                                      src: `/storage/${img}`,
                                      class: "h-full w-full object-cover"
                                    }, null, 8, ["src"])
                                  ], 8, ["href"]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800" }, [
                              createVNode("p", { class: "text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium" }, [
                                createVNode("strong", null, "Catatan:"),
                                createTextVNode(" Status transaksi telah berubah menjadi "),
                                createVNode("strong", null, "Disputed"),
                                createTextVNode(". Admin akan meninjau bukti yang ada dan memberikan keputusan segera. Dana Anda tertahan sementara di sistem. ")
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "mt-8 flex justify-end border-t border-border pt-4" }, [
                            createVNode(_sfc_main$4, {
                              onClick: ($event) => showDisputeModal.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Tutup")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ])
                      ];
                    }),
                    _: 1
                  }, 8, ["show", "onClose"]),
                  createVNode(_sfc_main$a, {
                    show: shipModal.value,
                    onClose: ($event) => shipModal.value = false,
                    maxWidth: "md"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "mb-6 flex items-center justify-between border-b border-border pb-4" }, [
                          createVNode("h3", { class: "flex items-center gap-2 text-lg font-bold" }, [
                            createVNode(unref(Truck), { class: "h-5 w-5 text-purple-600" }),
                            createTextVNode(" Input Nomor Resi ")
                          ]),
                          createVNode("button", {
                            onClick: ($event) => shipModal.value = false,
                            class: "text-muted-foreground hover:text-foreground"
                          }, [
                            createVNode(unref(X), { class: "h-5 w-5" })
                          ], 8, ["onClick"])
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(submitShipment, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$6, { value: "Nama Ekspedisi" }),
                            createVNode(_sfc_main$7, {
                              modelValue: unref(shipForm).courier_name,
                              "onUpdate:modelValue": ($event) => unref(shipForm).courier_name = $event,
                              placeholder: "JNE, J&T, SiCepat, dll.",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$5, {
                              message: unref(shipForm).errors.courier_name,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$6, { value: "Nomor Resi" }),
                            createVNode(_sfc_main$7, {
                              modelValue: unref(shipForm).tracking_number,
                              "onUpdate:modelValue": ($event) => unref(shipForm).tracking_number = $event,
                              placeholder: "Masukkan nomor resi...",
                              class: "mt-1 block w-full font-mono",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$5, {
                              message: unref(shipForm).errors.tracking_number,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$6, { value: "Catatan untuk Buyer (opsional)" }),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(shipForm).seller_notes = $event,
                              rows: "2",
                              placeholder: "Misal: Barang sudah dikemas rapi, sudah di-bubblewrap...",
                              class: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(shipForm).seller_notes]
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                            createVNode(_sfc_main$4, {
                              type: "button",
                              onClick: ($event) => shipModal.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_sfc_main$9, {
                              type: "submit",
                              disabled: unref(shipForm).processing
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Truck), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Simpan & Konfirmasi Pengiriman ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ], 32)
                      ])
                    ]),
                    _: 1
                  }, 8, ["show", "onClose"]),
                  createVNode(_sfc_main$a, {
                    show: codModal.value,
                    onClose: ($event) => codModal.value = false,
                    maxWidth: "md"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "mb-6 flex items-center justify-between border-b border-border pb-4" }, [
                          createVNode("h3", { class: "flex items-center gap-2 text-lg font-bold" }, [
                            createVNode(unref(Users), { class: "h-5 w-5 text-teal-600" }),
                            createTextVNode(" Konfirmasi Meetup COD ")
                          ]),
                          createVNode("button", {
                            onClick: ($event) => codModal.value = false,
                            class: "text-muted-foreground hover:text-foreground"
                          }, [
                            createVNode(unref(X), { class: "h-5 w-5" })
                          ], 8, ["onClick"])
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(submitCodConfirm, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$6, { value: "Lokasi Meetup" }),
                            createVNode(_sfc_main$7, {
                              modelValue: unref(codForm).cod_location,
                              "onUpdate:modelValue": ($event) => unref(codForm).cod_location = $event,
                              placeholder: "Nama tempat / alamat lengkap...",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$5, {
                              message: unref(codForm).errors.cod_location,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$6, { value: "Waktu Meetup" }),
                            createVNode(_sfc_main$7, {
                              modelValue: unref(codForm).cod_scheduled_at,
                              "onUpdate:modelValue": ($event) => unref(codForm).cod_scheduled_at = $event,
                              type: "datetime-local",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$5, {
                              message: unref(codForm).errors.cod_scheduled_at,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$6, { value: "Pesan untuk Buyer (opsional)" }),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(codForm).seller_notes = $event,
                              rows: "2",
                              placeholder: "Misal: Saya pakai baju merah, hubungi sebelum datang...",
                              class: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(codForm).seller_notes]
                            ])
                          ]),
                          createVNode("div", { class: "rounded-xl border border-teal-200 bg-teal-50/50 p-3 text-sm text-teal-700 dark:border-teal-800 dark:bg-teal-900/10 dark:text-teal-300" }, " ℹ️ Setelah dikonfirmasi, buyer akan menerima notifikasi detail meetup ini. "),
                          createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                            createVNode(_sfc_main$4, {
                              type: "button",
                              onClick: ($event) => codModal.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_sfc_main$9, {
                              type: "submit",
                              disabled: unref(codForm).processing
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Users), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Konfirmasi COD ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ], 32)
                      ])
                    ]),
                    _: 1
                  }, 8, ["show", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd70395c"]]);
export {
  Dashboard as default
};
