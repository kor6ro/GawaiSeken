import { ref, shallowRef, watch, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, Fragment, renderList, vShow, withModifiers, vModelText, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head, Link, usePage, router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./AppLayout-x9cx5faw.js";
import { useIntersectionObserver } from "@vueuse/core";
import { LayoutDashboard, Settings, Package, ShoppingBag, MessageCircle, Plus, Image, CheckCircle, Circle, Edit3, Trash2, MapPin } from "lucide-vue-next";
import { _ as _sfc_main$7 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./DangerButton-COhGmvyd.js";
import { b as _sfc_main$4, _ as _sfc_main$5, a as _sfc_main$6 } from "./TextInput-C__yGyCx.js";
import { _ as _sfc_main$8 } from "./Modal-C0YBTj_6.js";
import { Cropper } from "vue-advanced-cropper";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "lodash/pickBy.js";
import "./onlineState-BAtS9nBF.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: Object,
    productsCount: Number,
    transactionsCount: Number,
    unreadMessagesCount: Number,
    myProducts: Object
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const tab = ref("overview");
    const loading = ref(false);
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
      bio: ((_b = props.user.profile) == null ? void 0 : _b.bio) || "",
      address: ((_c = props.user.profile) == null ? void 0 : _c.address) || "",
      city: ((_d = props.user.profile) == null ? void 0 : _d.city) || "",
      avatar: null
    });
    const photoPreview = ref(null);
    const photoInput = ref(null);
    const cropModalOpen = ref(false);
    const imageToCrop = ref(null);
    const cropper = ref(null);
    const updatePhotoPreview = () => {
      const photo = photoInput.value.files[0];
      if (!photo) return;
      photoInput.value.value = "";
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
        photoPreview.value = canvas.toDataURL();
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
            storeForm.avatar = file;
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Seller Dashboard</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Seller Dashboard")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Seller Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"${_scopeId}><div class="mx-auto flex max-w-md space-x-1 rounded-xl bg-muted p-1 sm:mx-0"${_scopeId}><button class="${ssrRenderClass([
              tab.value === "overview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Ringkasan </button><button class="${ssrRenderClass([
              tab.value === "settings" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Settings), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Pengaturan </button></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "overview" ? null : { display: "none" })}"${_scopeId}><div class="mb-6 border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8"${_scopeId}><header class="mb-6"${_scopeId}><h2 class="text-lg font-medium"${_scopeId}>Statistik Toko</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId}> Ringkasan performa penjualan Anda saat ini. </p></header><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"${_scopeId}><div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6"${_scopeId}><div class="mb-2 flex items-center justify-between"${_scopeId}><p class="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm"${_scopeId}> Produk Aktif </p>`);
            _push2(ssrRenderComponent(unref(Package), { class: "h-5 w-5 text-primary" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-2 text-2xl font-black text-primary sm:text-3xl"${_scopeId}>${ssrInterpolate(__props.productsCount)}</p></div><div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6"${_scopeId}><div class="mb-2 flex items-center justify-between"${_scopeId}><p class="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm"${_scopeId}> Total Terjual </p>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "h-5 w-5 text-green-500" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-2 text-2xl font-black text-green-600 dark:text-green-400 sm:text-3xl"${_scopeId}>${ssrInterpolate(__props.transactionsCount)}</p></div><div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6"${_scopeId}><div class="mb-2 flex items-center justify-between"${_scopeId}><p class="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm"${_scopeId}> Pesan Baru </p>`);
            _push2(ssrRenderComponent(unref(MessageCircle), { class: "h-5 w-5 text-orange-500" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-2 text-2xl font-black text-orange-500 sm:text-3xl"${_scopeId}>${ssrInterpolate(__props.unreadMessagesCount)}</p></div></div></div><div class="border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Produk Saya</h3><p class="text-sm text-muted-foreground"${_scopeId}>Kelola barang dagangan Anda.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("products.create"),
              class: "inline-flex items-center rounded-xl border border-transparent bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-md transition duration-150 hover:bg-primary/90"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Tambah Produk</span>`);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                    createVNode("span", null, "Tambah Produk")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="overflow-hidden border border-border shadow-sm sm:rounded-lg"${_scopeId}><div class="hidden overflow-x-auto md:block"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="border-b border-border bg-muted text-xs uppercase text-muted-foreground"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-4 font-semibold"${_scopeId}>Produk</th><th scope="col" class="px-6 py-4 font-semibold"${_scopeId}>Harga</th><th scope="col" class="px-6 py-4 text-center font-semibold"${_scopeId}>Status</th><th scope="col" class="px-6 py-4 text-center font-semibold"${_scopeId}>Tanggal</th><th scope="col" class="px-6 py-4 text-right font-semibold"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-border"${_scopeId}><!--[-->`);
            ssrRenderList(allMyProducts.value, (item) => {
              var _a3;
              _push2(`<tr class="bg-card transition-colors hover:bg-muted"${_scopeId}><td class="px-6 py-4 align-middle"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted"${_scopeId}>`);
              if (item.images && item.images.length > 0) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${item.images[0].image_path}`)} loading="lazy" class="h-full w-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="flex h-full w-full items-center justify-center text-muted-foreground"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Image), { class: "h-6 w-6" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div${_scopeId}><div class="line-clamp-1 text-base font-bold"${_scopeId}>${ssrInterpolate(item.title)}</div><div class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate((_a3 = item.category) == null ? void 0 : _a3.name)}</div></div></div></td><td class="whitespace-nowrap px-6 py-4 align-middle font-medium"${_scopeId}> Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(item.price))}</td><td class="px-6 py-4 text-center align-middle"${_scopeId}><button class="${ssrRenderClass([
                item.status === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400",
                "group relative inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold transition-all hover:scale-105 active:scale-95"
              ])}"${_scopeId}>`);
              if (item.status === "available") {
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(Circle), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              }
              _push2(` ${ssrInterpolate(item.status === "available" ? "Tersedia" : "Terjual")}</button></td><td class="whitespace-nowrap px-6 py-4 text-center align-middle text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(new Date(item.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }))}</td><td class="px-6 py-4 text-right align-middle"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("products.edit", item.slug),
                class: "inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition hover:bg-muted"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Edit `);
                  } else {
                    return [
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$2, {
                onClick: ($event) => confirmDeletion(item)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Hapus`);
                  } else {
                    return [
                      createTextVNode("Hapus")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (allMyProducts.value.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-12 text-center text-muted-foreground"${_scopeId}><div class="flex flex-col items-center"${_scopeId}><span class="mb-2"${_scopeId}>Belum ada produk yang dijual.</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("products.create"),
                class: "font-bold text-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`+ Tambah Produk Baru`);
                  } else {
                    return [
                      createTextVNode("+ Tambah Produk Baru")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div><div class="divide-y divide-border md:hidden"${_scopeId}><!--[-->`);
            ssrRenderList(allMyProducts.value, (item) => {
              var _a3;
              _push2(`<div class="flex flex-col gap-4 p-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted"${_scopeId}>`);
              if (item.images && item.images.length > 0) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${item.images[0].image_path}`)} loading="lazy" class="h-full w-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="flex h-full w-full items-center justify-center text-muted-foreground"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Image), { class: "h-8 w-8" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div class="min-w-0 flex-1"${_scopeId}><div class="truncate text-base font-bold"${_scopeId}>${ssrInterpolate(item.title)}</div><div class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate((_a3 = item.category) == null ? void 0 : _a3.name)}</div><div class="mt-1 font-bold text-primary"${_scopeId}> Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(item.price))}</div></div></div><div class="flex items-center justify-between gap-4 border-t border-border pt-2"${_scopeId}><div class="flex flex-col gap-1"${_scopeId}><button class="${ssrRenderClass([
                item.status === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400",
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all active:scale-90"
              ])}"${_scopeId}>`);
              if (item.status === "available") {
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(Circle), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              }
              _push2(` ${ssrInterpolate(item.status === "available" ? "Tersedia" : "Terjual")}</button><span class="text-[10px] text-muted-foreground"${_scopeId}>${ssrInterpolate(new Date(item.created_at).toLocaleDateString("id-ID"))}</span></div><div class="flex items-center gap-2"${_scopeId}>`);
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
              _push2(`<button class="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(`</button></div></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="mt-8 flex justify-center pb-4"${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="flex flex-col items-center gap-2"${_scopeId}><div class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"${_scopeId}></div><span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"${_scopeId}>Memuat produk...</span></div>`);
            } else if (!nextUrl.value && allMyProducts.value.length > 0) {
              _push2(`<div class="py-4 text-center"${_scopeId}><span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50"${_scopeId}>Semua produk ditampilkan</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "settings" ? null : { display: "none" })}"${_scopeId}><div class="border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8"${_scopeId}><div class="max-w-xl"${_scopeId}><header${_scopeId}><h2 class="text-lg font-medium"${_scopeId}>Profil Toko</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId}> Informasi ini akan ditampilkan di halaman publik toko Anda. </p></header><form class="mt-6 space-y-6"${_scopeId}><div class="flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-start"${_scopeId}><div class="group relative shrink-0"${_scopeId}><div class="relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border transition-all duration-300 group-hover:ring-primary"${_scopeId}>`);
            if (photoPreview.value) {
              _push2(`<img${ssrRenderAttr("src", photoPreview.value)} loading="lazy" class="h-full w-full object-cover"${_scopeId}>`);
            } else if ((_a2 = __props.user.profile) == null ? void 0 : _a2.avatar) {
              _push2(`<img${ssrRenderAttr("src", `/storage/${__props.user.profile.avatar}`)} loading="lazy" class="h-full w-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<div class="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary"${_scopeId}>${ssrInterpolate((((_b2 = __props.user.profile) == null ? void 0 : _b2.store_name) || __props.user.name).substring(0, 1))}</div>`);
            }
            _push2(`<div class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Image), { class: "mb-1 h-6 w-6 text-white" }, null, _parent2, _scopeId));
            _push2(`<span class="text-[10px] font-bold uppercase tracking-wider text-white"${_scopeId}>Ubah</span></div></div><input type="file" class="hidden" accept="image/*"${_scopeId}><div class="absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow-sm"${_scopeId}><button type="button" class="rounded-full bg-primary p-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Edit3), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(`</button></div></div><div class="flex-1 pt-2 text-center sm:text-left"${_scopeId}><h3 class="text-lg font-black text-foreground"${_scopeId}>Foto Profil Toko</h3><p class="mb-4 mt-1 text-sm leading-relaxed text-muted-foreground"${_scopeId}> Rekomendasi rasio 1:1, maks 2MB. Format file JPG, JPEG, PNG, atau WebP. Gambar yang diunggah akan dapat dicrop secara langsung. </p>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              onClick: ($event) => photoInput.value.click(),
              class: "border-2 shadow-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Unggah Gambar`);
                } else {
                  return [
                    createTextVNode("Unggah Gambar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(storeForm).errors.avatar,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 gap-6 md:grid-cols-2"${_scopeId}><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              for: "store_name",
              value: "Nama Toko / Penjual",
              class: "mb-1 font-bold"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              id: "store_name",
              modelValue: unref(storeForm).store_name,
              "onUpdate:modelValue": ($event) => unref(storeForm).store_name = $event,
              type: "text",
              class: "block h-12 w-full rounded-xl text-sm font-medium",
              placeholder: "Ketik nama toko Anda...",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(storeForm).errors.store_name,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              for: "bio",
              value: "Bio / Deskripsi Singkat Toko",
              class: "mb-1 font-bold"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="bio" rows="4" class="block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary" placeholder="Ceritakan kelebihan toko Anda kepada calon pembeli..."${_scopeId}>${ssrInterpolate(unref(storeForm).bio)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(storeForm).errors.bio,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              for: "city",
              value: "Kota / Kabupaten",
              class: "mb-1 font-bold"
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative"${_scopeId}><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MapPin), { class: "h-4 w-4 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              id: "city",
              modelValue: unref(storeForm).city,
              "onUpdate:modelValue": ($event) => unref(storeForm).city = $event,
              type: "text",
              class: "block h-12 w-full rounded-xl pl-9 text-sm",
              placeholder: "Misal: Jakarta Selatan"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(storeForm).errors.city,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              for: "address",
              value: "Alamat Lengkap (Opsional)",
              class: "mb-1 font-bold"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              id: "address",
              modelValue: unref(storeForm).address,
              "onUpdate:modelValue": ($event) => unref(storeForm).address = $event,
              type: "text",
              class: "block h-12 w-full rounded-xl text-sm",
              placeholder: "Jalan, No Rumah, RT/RW..."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(storeForm).errors.address,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-8 flex items-center gap-4 border-t border-border pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              disabled: unref(storeForm).processing,
              class: "h-12 rounded-xl px-8 text-sm font-black shadow-lg shadow-primary/20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(storeForm).processing) {
                    _push3(`<span class="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"${_scopeId2}></span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Simpan Perubahan `);
                } else {
                  return [
                    unref(storeForm).processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Simpan Perubahan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(storeForm).recentlySuccessful) {
              _push2(`<div class="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-600 dark:text-green-400"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg><p class="text-sm font-bold"${_scopeId}>Profil Berhasil Diperbarui!</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              show: cropModalOpen.value,
              onClose: cancelCrop,
              maxWidth: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-card p-6 text-card-foreground"${_scopeId2}><header class="mb-4"${_scopeId2}><h2 class="text-xl font-black"${_scopeId2}>Sesuaikan Foto Profil</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId2}> Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas. Lingkaran adalah pratinjau hasil akhirnya. </p></header><div class="relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-border bg-black shadow-inner ring-1 ring-border"${_scopeId2}>`);
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
                  _push3(`</div><div class="mt-6 flex items-center justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
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
                  _push3(ssrRenderComponent(_sfc_main$7, {
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
                        createVNode(_sfc_main$3, {
                          onClick: cancelCrop,
                          class: "h-11 rounded-xl px-6 font-bold hover:bg-muted"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$7, {
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
            _push2(ssrRenderComponent(_sfc_main$8, {
              show: confirmProductDeletion.value,
              onClose: closeModal
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a3, _b3;
                if (_push3) {
                  _push3(`<div class="p-6"${_scopeId2}><div class="flex flex-col items-center justify-center text-center"${_scopeId2}><div class="mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Trash2), { class: "h-6 w-6 text-red-600 dark:text-red-200" }, null, _parent3, _scopeId2));
                  _push3(`</div><h2 class="text-lg font-medium"${_scopeId2}>Konfirmasi Hapus</h2><p class="mt-2 text-sm text-muted-foreground"${_scopeId2}> Apakah Anda yakin ingin menghapus produk <strong${_scopeId2}>${ssrInterpolate((_a3 = productToDelete.value) == null ? void 0 : _a3.title)}</strong>? <br${_scopeId2}> Tindakan ini tidak dapat dibatalkan. </p></div><div class="mt-6 flex justify-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { onClick: closeModal }, {
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
                        createVNode(_sfc_main$3, { onClick: closeModal }, {
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
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Seller Dashboard" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mx-auto flex max-w-md space-x-1 rounded-xl bg-muted p-1 sm:mx-0" }, [
                    createVNode("button", {
                      onClick: ($event) => tab.value = "overview",
                      class: [
                        tab.value === "overview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                        "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                      ]
                    }, [
                      createVNode(unref(LayoutDashboard), { class: "h-4 w-4" }),
                      createTextVNode(" Ringkasan ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "settings",
                      class: [
                        tab.value === "settings" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                        "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                      ]
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
                      createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" }, [
                        createVNode("div", { class: "rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6" }, [
                          createVNode("div", { class: "mb-2 flex items-center justify-between" }, [
                            createVNode("p", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm" }, " Produk Aktif "),
                            createVNode(unref(Package), { class: "h-5 w-5 text-primary" })
                          ]),
                          createVNode("p", { class: "mt-2 text-2xl font-black text-primary sm:text-3xl" }, toDisplayString(__props.productsCount), 1)
                        ]),
                        createVNode("div", { class: "rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6" }, [
                          createVNode("div", { class: "mb-2 flex items-center justify-between" }, [
                            createVNode("p", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm" }, " Total Terjual "),
                            createVNode(unref(ShoppingBag), { class: "h-5 w-5 text-green-500" })
                          ]),
                          createVNode("p", { class: "mt-2 text-2xl font-black text-green-600 dark:text-green-400 sm:text-3xl" }, toDisplayString(__props.transactionsCount), 1)
                        ]),
                        createVNode("div", { class: "rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6" }, [
                          createVNode("div", { class: "mb-2 flex items-center justify-between" }, [
                            createVNode("p", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm" }, " Pesan Baru "),
                            createVNode(unref(MessageCircle), { class: "h-5 w-5 text-orange-500" })
                          ]),
                          createVNode("p", { class: "mt-2 text-2xl font-black text-orange-500 sm:text-3xl" }, toDisplayString(__props.unreadMessagesCount), 1)
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
                      createVNode("div", { class: "overflow-hidden border border-border shadow-sm sm:rounded-lg" }, [
                        createVNode("div", { class: "hidden overflow-x-auto md:block" }, [
                          createVNode("table", { class: "w-full text-left text-sm" }, [
                            createVNode("thead", { class: "border-b border-border bg-muted text-xs uppercase text-muted-foreground" }, [
                              createVNode("tr", null, [
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-4 font-semibold"
                                }, "Produk"),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-4 font-semibold"
                                }, "Harga"),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-4 text-center font-semibold"
                                }, "Status"),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-4 text-center font-semibold"
                                }, "Tanggal"),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-4 text-right font-semibold"
                                }, "Aksi")
                              ])
                            ]),
                            createVNode("tbody", { class: "divide-y divide-border" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(allMyProducts.value, (item) => {
                                var _a3;
                                return openBlock(), createBlock("tr", {
                                  key: item.id,
                                  class: "bg-card transition-colors hover:bg-muted"
                                }, [
                                  createVNode("td", { class: "px-6 py-4 align-middle" }, [
                                    createVNode("div", { class: "flex items-center gap-4" }, [
                                      createVNode("div", { class: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted" }, [
                                        item.images && item.images.length > 0 ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: `/storage/${item.images[0].image_path}`,
                                          loading: "lazy",
                                          class: "h-full w-full object-cover"
                                        }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "flex h-full w-full items-center justify-center text-muted-foreground"
                                        }, [
                                          createVNode(unref(Image), { class: "h-6 w-6" })
                                        ]))
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", { class: "line-clamp-1 text-base font-bold" }, toDisplayString(item.title), 1),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString((_a3 = item.category) == null ? void 0 : _a3.name), 1)
                                      ])
                                    ])
                                  ]),
                                  createVNode("td", { class: "whitespace-nowrap px-6 py-4 align-middle font-medium" }, " Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(item.price)), 1),
                                  createVNode("td", { class: "px-6 py-4 text-center align-middle" }, [
                                    createVNode("button", {
                                      onClick: ($event) => toggleStatus(item),
                                      class: [
                                        "group relative inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold transition-all hover:scale-105 active:scale-95",
                                        item.status === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400"
                                      ]
                                    }, [
                                      item.status === "available" ? (openBlock(), createBlock(unref(CheckCircle), {
                                        key: 0,
                                        class: "h-3.5 w-3.5"
                                      })) : (openBlock(), createBlock(unref(Circle), {
                                        key: 1,
                                        class: "h-3.5 w-3.5"
                                      })),
                                      createTextVNode(" " + toDisplayString(item.status === "available" ? "Tersedia" : "Terjual"), 1)
                                    ], 10, ["onClick"])
                                  ]),
                                  createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-center align-middle text-xs text-muted-foreground" }, toDisplayString(new Date(item.created_at).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                  })), 1),
                                  createVNode("td", { class: "px-6 py-4 text-right align-middle" }, [
                                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
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
                                    ])
                                  ])
                                ]);
                              }), 128)),
                              allMyProducts.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                                createVNode("td", {
                                  colspan: "5",
                                  class: "px-6 py-12 text-center text-muted-foreground"
                                }, [
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
                              ])) : createCommentVNode("", true)
                            ])
                          ])
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
                                    onClick: ($event) => toggleStatus(item),
                                    class: [
                                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all active:scale-90",
                                      item.status === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400"
                                    ]
                                  }, [
                                    item.status === "available" ? (openBlock(), createBlock(unref(CheckCircle), {
                                      key: 0,
                                      class: "h-3 w-3"
                                    })) : (openBlock(), createBlock(unref(Circle), {
                                      key: 1,
                                      class: "h-3 w-3"
                                    })),
                                    createTextVNode(" " + toDisplayString(item.status === "available" ? "Tersedia" : "Terjual"), 1)
                                  ], 10, ["onClick"]),
                                  createVNode("span", { class: "text-[10px] text-muted-foreground" }, toDisplayString(new Date(item.created_at).toLocaleDateString("id-ID")), 1)
                                ]),
                                createVNode("div", { class: "flex items-center gap-2" }, [
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
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
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
                      createVNode("div", { class: "max-w-xl" }, [
                        createVNode("header", null, [
                          createVNode("h2", { class: "text-lg font-medium" }, "Profil Toko"),
                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Informasi ini akan ditampilkan di halaman publik toko Anda. ")
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(updateStoreSettings, ["prevent"]),
                          class: "mt-6 space-y-6"
                        }, [
                          createVNode("div", { class: "flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-start" }, [
                            createVNode("div", { class: "group relative shrink-0" }, [
                              createVNode("div", { class: "relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border transition-all duration-300 group-hover:ring-primary" }, [
                                photoPreview.value ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: photoPreview.value,
                                  loading: "lazy",
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])) : ((_c2 = __props.user.profile) == null ? void 0 : _c2.avatar) ? (openBlock(), createBlock("img", {
                                  key: 1,
                                  src: `/storage/${__props.user.profile.avatar}`,
                                  loading: "lazy",
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary"
                                }, toDisplayString((((_d2 = __props.user.profile) == null ? void 0 : _d2.store_name) || __props.user.name).substring(0, 1)), 1)),
                                createVNode("div", {
                                  class: "absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100",
                                  onClick: ($event) => photoInput.value.click()
                                }, [
                                  createVNode(unref(Image), { class: "mb-1 h-6 w-6 text-white" }),
                                  createVNode("span", { class: "text-[10px] font-bold uppercase tracking-wider text-white" }, "Ubah")
                                ], 8, ["onClick"])
                              ]),
                              createVNode("input", {
                                type: "file",
                                ref_key: "photoInput",
                                ref: photoInput,
                                class: "hidden",
                                accept: "image/*",
                                onChange: updatePhotoPreview
                              }, null, 544),
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
                              createVNode(_sfc_main$3, {
                                onClick: withModifiers(($event) => photoInput.value.click(), ["prevent"]),
                                class: "border-2 shadow-sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Unggah Gambar")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_sfc_main$4, {
                                message: unref(storeForm).errors.avatar,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$5, {
                                for: "store_name",
                                value: "Nama Toko / Penjual",
                                class: "mb-1 font-bold"
                              }),
                              createVNode(_sfc_main$6, {
                                id: "store_name",
                                modelValue: unref(storeForm).store_name,
                                "onUpdate:modelValue": ($event) => unref(storeForm).store_name = $event,
                                type: "text",
                                class: "block h-12 w-full rounded-xl text-sm font-medium",
                                placeholder: "Ketik nama toko Anda...",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(storeForm).errors.store_name,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$5, {
                                for: "bio",
                                value: "Bio / Deskripsi Singkat Toko",
                                class: "mb-1 font-bold"
                              }),
                              withDirectives(createVNode("textarea", {
                                id: "bio",
                                "onUpdate:modelValue": ($event) => unref(storeForm).bio = $event,
                                rows: "4",
                                class: "block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary",
                                placeholder: "Ceritakan kelebihan toko Anda kepada calon pembeli..."
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(storeForm).bio]
                              ]),
                              createVNode(_sfc_main$4, {
                                message: unref(storeForm).errors.bio,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-1" }, [
                              createVNode(_sfc_main$5, {
                                for: "city",
                                value: "Kota / Kabupaten",
                                class: "mb-1 font-bold"
                              }),
                              createVNode("div", { class: "relative" }, [
                                createVNode("div", { class: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" }, [
                                  createVNode(unref(MapPin), { class: "h-4 w-4 text-muted-foreground" })
                                ]),
                                createVNode(_sfc_main$6, {
                                  id: "city",
                                  modelValue: unref(storeForm).city,
                                  "onUpdate:modelValue": ($event) => unref(storeForm).city = $event,
                                  type: "text",
                                  class: "block h-12 w-full rounded-xl pl-9 text-sm",
                                  placeholder: "Misal: Jakarta Selatan"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode(_sfc_main$4, {
                                message: unref(storeForm).errors.city,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-1" }, [
                              createVNode(_sfc_main$5, {
                                for: "address",
                                value: "Alamat Lengkap (Opsional)",
                                class: "mb-1 font-bold"
                              }),
                              createVNode(_sfc_main$6, {
                                id: "address",
                                modelValue: unref(storeForm).address,
                                "onUpdate:modelValue": ($event) => unref(storeForm).address = $event,
                                type: "text",
                                class: "block h-12 w-full rounded-xl text-sm",
                                placeholder: "Jalan, No Rumah, RT/RW..."
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(storeForm).errors.address,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "mt-8 flex items-center gap-4 border-t border-border pt-6" }, [
                            createVNode(_sfc_main$7, {
                              disabled: unref(storeForm).processing,
                              class: "h-12 rounded-xl px-8 text-sm font-black shadow-lg shadow-primary/20"
                            }, {
                              default: withCtx(() => [
                                unref(storeForm).processing ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                })) : createCommentVNode("", true),
                                createTextVNode(" Simpan Perubahan ")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(Transition, {
                              "enter-from-class": "opacity-0 -translate-y-2",
                              "leave-to-class": "opacity-0 translate-y-2",
                              class: "transition duration-300 ease-out"
                            }, {
                              default: withCtx(() => [
                                unref(storeForm).recentlySuccessful ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-600 dark:text-green-400"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-4 w-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M5 13l4 4L19 7"
                                    })
                                  ])),
                                  createVNode("p", { class: "text-sm font-bold" }, "Profil Berhasil Diperbarui!")
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ])
                        ], 32)
                      ])
                    ])
                  ], 512), [
                    [vShow, tab.value === "settings"]
                  ]),
                  createVNode(_sfc_main$8, {
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
                          createVNode(_sfc_main$3, {
                            onClick: cancelCrop,
                            class: "h-11 rounded-xl px-6 font-bold hover:bg-muted"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$7, {
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
                  createVNode(_sfc_main$8, {
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
                            createVNode(_sfc_main$3, { onClick: closeModal }, {
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
                  }, 8, ["show"])
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
export {
  _sfc_main as default
};
