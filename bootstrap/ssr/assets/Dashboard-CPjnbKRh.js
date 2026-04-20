import { ref, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, Fragment, renderList, vShow, withModifiers, vModelText, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B-phu6gS.js";
import { LayoutDashboard, Settings, Package, ShoppingBag, MessageCircle, Plus, Image, Edit3, Trash2, MapPin } from "lucide-vue-next";
import { _ as _sfc_main$8 } from "./PrimaryButton-b74eHQMS.js";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./DangerButton-Cmx7G8Fd.js";
import { b as _sfc_main$5, _ as _sfc_main$6, a as _sfc_main$7 } from "./TextInput-ivY_q2i2.js";
import { _ as _sfc_main$9 } from "./Modal-Cw8mmzBN.js";
import { _ as _sfc_main$3 } from "./Pagination-p2pafXsX.js";
import { Cropper } from "vue-advanced-cropper";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "lodash/pickBy.js";
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
        canvas.toBlob((blob) => {
          const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
          storeForm.avatar = file;
          cropModalOpen.value = false;
          imageToCrop.value = null;
        }, "image/jpeg", 0.9);
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
            _push2(`<h2 class="font-semibold text-xl text-foreground leading-tight"${_scopeId}> Seller Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-foreground leading-tight" }, " Seller Dashboard ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Seller Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="flex space-x-1 bg-muted p-1 rounded-xl max-w-md mx-auto sm:mx-0"${_scopeId}><button class="${ssrRenderClass([tab.value === "overview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Ringkasan </button><button class="${ssrRenderClass([tab.value === "settings" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Settings), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Pengaturan </button></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "overview" ? null : { display: "none" })}"${_scopeId}><div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg mb-6"${_scopeId}><header class="mb-6"${_scopeId}><h2 class="text-lg font-medium"${_scopeId}>Statistik Toko</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Ringkasan performa penjualan Anda saat ini.</p></header><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"${_scopeId}><div class="bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><p class="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider"${_scopeId}>Produk Aktif</p>`);
            _push2(ssrRenderComponent(unref(Package), { class: "w-5 h-5 text-primary" }, null, _parent2, _scopeId));
            _push2(`</div><p class="text-2xl sm:text-3xl font-black text-primary mt-2"${_scopeId}>${ssrInterpolate(__props.productsCount)}</p></div><div class="bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><p class="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider"${_scopeId}>Total Terjual</p>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "w-5 h-5 text-green-500" }, null, _parent2, _scopeId));
            _push2(`</div><p class="text-2xl sm:text-3xl font-black text-green-600 dark:text-green-400 mt-2"${_scopeId}>${ssrInterpolate(__props.transactionsCount)}</p></div><div class="bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><p class="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider"${_scopeId}>Pesan Baru</p>`);
            _push2(ssrRenderComponent(unref(MessageCircle), { class: "w-5 h-5 text-orange-500" }, null, _parent2, _scopeId));
            _push2(`</div><p class="text-2xl sm:text-3xl font-black text-orange-500 mt-2"${_scopeId}>${ssrInterpolate(__props.unreadMessagesCount)}</p></div></div></div><div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Produk Saya</h3><p class="text-sm text-muted-foreground"${_scopeId}>Kelola barang dagangan Anda.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("products.create"),
              class: "inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-xl font-bold text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 transition duration-150 shadow-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Tambah Produk</span>`);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createVNode("span", null, "Tambah Produk")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="overflow-hidden shadow-sm sm:rounded-lg border border-border"${_scopeId}><div class="hidden md:block overflow-x-auto"${_scopeId}><table class="w-full text-sm text-left"${_scopeId}><thead class="text-xs text-muted-foreground uppercase bg-muted border-b border-border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-4 font-semibold"${_scopeId}>Produk</th><th scope="col" class="px-6 py-4 font-semibold"${_scopeId}>Harga</th><th scope="col" class="px-6 py-4 font-semibold text-center"${_scopeId}>Status</th><th scope="col" class="px-6 py-4 font-semibold text-center"${_scopeId}>Tanggal</th><th scope="col" class="px-6 py-4 font-semibold text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-border"${_scopeId}><!--[-->`);
            ssrRenderList(__props.myProducts.data, (item) => {
              var _a3;
              _push2(`<tr class="bg-card hover:bg-muted transition-colors"${_scopeId}><td class="px-6 py-4 align-middle"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 rounded-md bg-muted border border-border overflow-hidden flex-shrink-0"${_scopeId}>`);
              if (item.images && item.images.length > 0) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${item.images[0].image_path}`)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="flex items-center justify-center w-full h-full text-muted-foreground"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Image), { class: "w-6 h-6" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div${_scopeId}><div class="text-base font-bold line-clamp-1"${_scopeId}>${ssrInterpolate(item.title)}</div><div class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate((_a3 = item.category) == null ? void 0 : _a3.name)}</div></div></div></td><td class="px-6 py-4 align-middle font-medium whitespace-nowrap"${_scopeId}> Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(item.price))}</td><td class="px-6 py-4 align-middle text-center"${_scopeId}><span class="${ssrRenderClass([item.status === "available" ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border"])}"${_scopeId}>${ssrInterpolate(item.status)}</span></td><td class="px-6 py-4 align-middle text-center text-xs whitespace-nowrap text-muted-foreground"${_scopeId}>${ssrInterpolate(new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }))}</td><td class="px-6 py-4 align-middle text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("products.edit", item.slug),
                class: "inline-flex items-center px-4 py-2 bg-background border border-border rounded-md font-semibold text-xs text-foreground uppercase tracking-widest shadow-sm hover:bg-muted transition"
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
            if (__props.myProducts.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-12 text-center text-muted-foreground"${_scopeId}><div class="flex flex-col items-center"${_scopeId}><span class="mb-2"${_scopeId}>Belum ada produk yang dijual.</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("products.create"),
                class: "text-primary font-bold"
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
            _push2(`</tbody></table></div><div class="md:hidden divide-y divide-border"${_scopeId}><!--[-->`);
            ssrRenderList(__props.myProducts.data, (item) => {
              var _a3;
              _push2(`<div class="p-4 flex flex-col gap-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-16 h-16 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0"${_scopeId}>`);
              if (item.images && item.images.length > 0) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${item.images[0].image_path}`)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="flex items-center justify-center w-full h-full text-muted-foreground"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Image), { class: "w-8 h-8" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="text-base font-bold truncate"${_scopeId}>${ssrInterpolate(item.title)}</div><div class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate((_a3 = item.category) == null ? void 0 : _a3.name)}</div><div class="mt-1 text-primary font-bold"${_scopeId}>Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(item.price))}</div></div></div><div class="flex items-center justify-between gap-4 pt-2 border-t border-border"${_scopeId}><div class="flex flex-col gap-1"${_scopeId}><span class="${ssrRenderClass([item.status === "available" ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700", "inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-bold border"])}"${_scopeId}>${ssrInterpolate(item.status)}</span><span class="text-[10px] text-muted-foreground"${_scopeId}>${ssrInterpolate(new Date(item.created_at).toLocaleDateString("id-ID"))}</span></div><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("products.edit", item.slug),
                class: "p-2 text-muted-foreground hover:bg-accent rounded-lg transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit3), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Edit3), { class: "w-5 h-5" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(`</button></div></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
            if (__props.myProducts.data.length > 0) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                links: __props.myProducts.links
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="transition-all duration-300" style="${ssrRenderStyle(tab.value === "settings" ? null : { display: "none" })}"${_scopeId}><div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg"${_scopeId}><div class="max-w-xl"${_scopeId}><header${_scopeId}><h2 class="text-lg font-medium"${_scopeId}>Profil Toko</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Informasi ini akan ditampilkan di halaman publik toko Anda.</p></header><form class="mt-6 space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-border"${_scopeId}><div class="relative group shrink-0"${_scopeId}><div class="relative h-28 w-28 rounded-full overflow-hidden border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border group-hover:ring-primary transition-all duration-300"${_scopeId}>`);
            if (photoPreview.value) {
              _push2(`<img${ssrRenderAttr("src", photoPreview.value)} class="h-full w-full object-cover"${_scopeId}>`);
            } else if ((_a2 = __props.user.profile) == null ? void 0 : _a2.avatar) {
              _push2(`<img${ssrRenderAttr("src", `/storage/${__props.user.profile.avatar}`)} class="h-full w-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<div class="h-full w-full bg-primary/10 flex items-center justify-center text-4xl font-black text-primary"${_scopeId}>${ssrInterpolate((((_b2 = __props.user.profile) == null ? void 0 : _b2.store_name) || __props.user.name).substring(0, 1))}</div>`);
            }
            _push2(`<div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer backdrop-blur-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Image), { class: "w-6 h-6 text-white mb-1" }, null, _parent2, _scopeId));
            _push2(`<span class="text-white text-[10px] font-bold uppercase tracking-wider"${_scopeId}>Ubah</span></div></div><input type="file" class="hidden" accept="image/*"${_scopeId}><div class="absolute -bottom-1 -right-1 bg-background rounded-full p-1 shadow-sm"${_scopeId}><button type="button" class="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 shadow-sm transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Edit3), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</button></div></div><div class="flex-1 text-center sm:text-left pt-2"${_scopeId}><h3 class="text-lg font-black text-foreground"${_scopeId}>Foto Profil Toko</h3><p class="text-sm text-muted-foreground mt-1 mb-4 leading-relaxed"${_scopeId}>Rekomendasi rasio 1:1, maks 2MB. Format file JPG, JPEG, PNG, atau WebP. Gambar yang diunggah akan dapat dicrop secara langsung.</p>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              onClick: ($event) => photoInput.value.click(),
              class: "shadow-sm border-2"
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
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(storeForm).errors.avatar,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "store_name",
              value: "Nama Toko / Penjual",
              class: "font-bold mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "store_name",
              modelValue: unref(storeForm).store_name,
              "onUpdate:modelValue": ($event) => unref(storeForm).store_name = $event,
              type: "text",
              class: "block w-full text-sm font-medium h-12 rounded-xl",
              placeholder: "Ketik nama toko Anda...",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(storeForm).errors.store_name,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "bio",
              value: "Bio / Deskripsi Singkat Toko",
              class: "font-bold mb-1"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="bio" rows="4" class="block w-full border-border bg-background text-foreground focus:border-primary focus:ring-primary rounded-xl shadow-sm placeholder:text-muted-foreground/60 resize-none" placeholder="Ceritakan kelebihan toko Anda kepada calon pembeli..."${_scopeId}>${ssrInterpolate(unref(storeForm).bio)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(storeForm).errors.bio,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "city",
              value: "Kota / Kabupaten",
              class: "font-bold mb-1"
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MapPin), { class: "h-4 w-4 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "city",
              modelValue: unref(storeForm).city,
              "onUpdate:modelValue": ($event) => unref(storeForm).city = $event,
              type: "text",
              class: "block w-full pl-9 text-sm h-12 rounded-xl",
              placeholder: "Misal: Jakarta Selatan"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(storeForm).errors.city,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "address",
              value: "Alamat Lengkap (Opsional)",
              class: "font-bold mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "address",
              modelValue: unref(storeForm).address,
              "onUpdate:modelValue": ($event) => unref(storeForm).address = $event,
              type: "text",
              class: "block w-full text-sm h-12 rounded-xl",
              placeholder: "Jalan, No Rumah, RT/RW..."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(storeForm).errors.address,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex items-center gap-4 pt-6 border-t border-border mt-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              disabled: unref(storeForm).processing,
              class: "h-12 px-8 rounded-xl font-black shadow-lg shadow-primary/20 text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(storeForm).processing) {
                    _push3(`<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"${_scopeId2}></span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Simpan Perubahan `);
                } else {
                  return [
                    unref(storeForm).processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Simpan Perubahan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(storeForm).recentlySuccessful) {
              _push2(`<div class="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg border border-green-500/20"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg><p class="text-sm font-bold"${_scopeId}>Profil Berhasil Diperbarui!</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              show: cropModalOpen.value,
              onClose: cancelCrop,
              maxWidth: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6 bg-card text-card-foreground"${_scopeId2}><header class="mb-4"${_scopeId2}><h2 class="text-xl font-black"${_scopeId2}>Sesuaikan Foto Profil</h2><p class="text-sm text-muted-foreground mt-1"${_scopeId2}>Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas. Lingkaran adalah pratinjau hasil akhirnya.</p></header><div class="relative w-full aspect-square bg-black rounded-2xl overflow-hidden border-2 border-border mb-6 ring-1 ring-border shadow-inner flex items-center justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Cropper), {
                    ref_key: "cropper",
                    ref: cropper,
                    class: "w-full h-full object-contain",
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
                  _push3(`</div><div class="flex items-center justify-end gap-3 mt-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    onClick: cancelCrop,
                    class: "h-11 px-6 rounded-xl hover:bg-muted font-bold"
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
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    onClick: applyCrop,
                    class: "h-11 px-8 rounded-xl shadow-lg font-bold"
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
                    createVNode("div", { class: "p-6 bg-card text-card-foreground" }, [
                      createVNode("header", { class: "mb-4" }, [
                        createVNode("h2", { class: "text-xl font-black" }, "Sesuaikan Foto Profil"),
                        createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, "Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas. Lingkaran adalah pratinjau hasil akhirnya.")
                      ]),
                      createVNode("div", { class: "relative w-full aspect-square bg-black rounded-2xl overflow-hidden border-2 border-border mb-6 ring-1 ring-border shadow-inner flex items-center justify-center" }, [
                        createVNode(unref(Cropper), {
                          ref_key: "cropper",
                          ref: cropper,
                          class: "w-full h-full object-contain",
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
                      createVNode("div", { class: "flex items-center justify-end gap-3 mt-6" }, [
                        createVNode(_sfc_main$4, {
                          onClick: cancelCrop,
                          class: "h-11 px-6 rounded-xl hover:bg-muted font-bold"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$8, {
                          onClick: applyCrop,
                          class: "h-11 px-8 rounded-xl shadow-lg font-bold"
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
            _push2(ssrRenderComponent(_sfc_main$9, {
              show: confirmProductDeletion.value,
              onClose: closeModal
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a3, _b3;
                if (_push3) {
                  _push3(`<div class="p-6"${_scopeId2}><div class="flex flex-col items-center text-center justify-center"${_scopeId2}><div class="mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Trash2), { class: "h-6 w-6 text-red-600 dark:text-red-200" }, null, _parent3, _scopeId2));
                  _push3(`</div><h2 class="text-lg font-medium"${_scopeId2}>Konfirmasi Hapus</h2><p class="mt-2 text-sm text-muted-foreground"${_scopeId2}>Apakah Anda yakin ingin menghapus produk <strong${_scopeId2}>${ssrInterpolate((_a3 = productToDelete.value) == null ? void 0 : _a3.title)}</strong>? <br${_scopeId2}> Tindakan ini tidak dapat dibatalkan.</p></div><div class="mt-6 flex justify-center gap-3"${_scopeId2}>`);
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
                      createVNode("div", { class: "flex flex-col items-center text-center justify-center" }, [
                        createVNode("div", { class: "mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900" }, [
                          createVNode(unref(Trash2), { class: "h-6 w-6 text-red-600 dark:text-red-200" })
                        ]),
                        createVNode("h2", { class: "text-lg font-medium" }, "Konfirmasi Hapus"),
                        createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, [
                          createTextVNode("Apakah Anda yakin ingin menghapus produk "),
                          createVNode("strong", null, toDisplayString((_b3 = productToDelete.value) == null ? void 0 : _b3.title), 1),
                          createTextVNode("? "),
                          createVNode("br"),
                          createTextVNode(" Tindakan ini tidak dapat dibatalkan.")
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
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Seller Dashboard" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "flex space-x-1 bg-muted p-1 rounded-xl max-w-md mx-auto sm:mx-0" }, [
                    createVNode("button", {
                      onClick: ($event) => tab.value = "overview",
                      class: [tab.value === "overview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2"]
                    }, [
                      createVNode(unref(LayoutDashboard), { class: "w-4 h-4" }),
                      createTextVNode(" Ringkasan ")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => tab.value = "settings",
                      class: [tab.value === "settings" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground", "flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2"]
                    }, [
                      createVNode(unref(Settings), { class: "w-4 h-4" }),
                      createTextVNode(" Pengaturan ")
                    ], 10, ["onClick"])
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg mb-6" }, [
                      createVNode("header", { class: "mb-6" }, [
                        createVNode("h2", { class: "text-lg font-medium" }, "Statistik Toko"),
                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Ringkasan performa penjualan Anda saat ini.")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" }, [
                        createVNode("div", { class: "bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                            createVNode("p", { class: "text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider" }, "Produk Aktif"),
                            createVNode(unref(Package), { class: "w-5 h-5 text-primary" })
                          ]),
                          createVNode("p", { class: "text-2xl sm:text-3xl font-black text-primary mt-2" }, toDisplayString(__props.productsCount), 1)
                        ]),
                        createVNode("div", { class: "bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                            createVNode("p", { class: "text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider" }, "Total Terjual"),
                            createVNode(unref(ShoppingBag), { class: "w-5 h-5 text-green-500" })
                          ]),
                          createVNode("p", { class: "text-2xl sm:text-3xl font-black text-green-600 dark:text-green-400 mt-2" }, toDisplayString(__props.transactionsCount), 1)
                        ]),
                        createVNode("div", { class: "bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                            createVNode("p", { class: "text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider" }, "Pesan Baru"),
                            createVNode(unref(MessageCircle), { class: "w-5 h-5 text-orange-500" })
                          ]),
                          createVNode("p", { class: "text-2xl sm:text-3xl font-black text-orange-500 mt-2" }, toDisplayString(__props.unreadMessagesCount), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-bold" }, "Produk Saya"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Kelola barang dagangan Anda.")
                        ]),
                        createVNode(unref(Link), {
                          href: _ctx.route("products.create"),
                          class: "inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-xl font-bold text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 transition duration-150 shadow-md"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                            createVNode("span", null, "Tambah Produk")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("div", { class: "overflow-hidden shadow-sm sm:rounded-lg border border-border" }, [
                        createVNode("div", { class: "hidden md:block overflow-x-auto" }, [
                          createVNode("table", { class: "w-full text-sm text-left" }, [
                            createVNode("thead", { class: "text-xs text-muted-foreground uppercase bg-muted border-b border-border" }, [
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
                                  class: "px-6 py-4 font-semibold text-center"
                                }, "Status"),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-4 font-semibold text-center"
                                }, "Tanggal"),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-4 font-semibold text-right"
                                }, "Aksi")
                              ])
                            ]),
                            createVNode("tbody", { class: "divide-y divide-border" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.myProducts.data, (item) => {
                                var _a3;
                                return openBlock(), createBlock("tr", {
                                  key: item.id,
                                  class: "bg-card hover:bg-muted transition-colors"
                                }, [
                                  createVNode("td", { class: "px-6 py-4 align-middle" }, [
                                    createVNode("div", { class: "flex items-center gap-4" }, [
                                      createVNode("div", { class: "w-12 h-12 rounded-md bg-muted border border-border overflow-hidden flex-shrink-0" }, [
                                        item.images && item.images.length > 0 ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: `/storage/${item.images[0].image_path}`,
                                          class: "w-full h-full object-cover"
                                        }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "flex items-center justify-center w-full h-full text-muted-foreground"
                                        }, [
                                          createVNode(unref(Image), { class: "w-6 h-6" })
                                        ]))
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", { class: "text-base font-bold line-clamp-1" }, toDisplayString(item.title), 1),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString((_a3 = item.category) == null ? void 0 : _a3.name), 1)
                                      ])
                                    ])
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 align-middle font-medium whitespace-nowrap" }, " Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(item.price)), 1),
                                  createVNode("td", { class: "px-6 py-4 align-middle text-center" }, [
                                    createVNode("span", {
                                      class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border", item.status === "available" ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"]
                                    }, toDisplayString(item.status), 3)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 align-middle text-center text-xs whitespace-nowrap text-muted-foreground" }, toDisplayString(new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })), 1),
                                  createVNode("td", { class: "px-6 py-4 align-middle text-right" }, [
                                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                      createVNode(unref(Link), {
                                        href: _ctx.route("products.edit", item.slug),
                                        class: "inline-flex items-center px-4 py-2 bg-background border border-border rounded-md font-semibold text-xs text-foreground uppercase tracking-widest shadow-sm hover:bg-muted transition"
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
                              __props.myProducts.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                                createVNode("td", {
                                  colspan: "5",
                                  class: "px-6 py-12 text-center text-muted-foreground"
                                }, [
                                  createVNode("div", { class: "flex flex-col items-center" }, [
                                    createVNode("span", { class: "mb-2" }, "Belum ada produk yang dijual."),
                                    createVNode(unref(Link), {
                                      href: _ctx.route("products.create"),
                                      class: "text-primary font-bold"
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
                        createVNode("div", { class: "md:hidden divide-y divide-border" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.myProducts.data, (item) => {
                            var _a3;
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: "p-4 flex flex-col gap-4"
                            }, [
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0" }, [
                                  item.images && item.images.length > 0 ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${item.images[0].image_path}`,
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex items-center justify-center w-full h-full text-muted-foreground"
                                  }, [
                                    createVNode(unref(Image), { class: "w-8 h-8" })
                                  ]))
                                ]),
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "text-base font-bold truncate" }, toDisplayString(item.title), 1),
                                  createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString((_a3 = item.category) == null ? void 0 : _a3.name), 1),
                                  createVNode("div", { class: "mt-1 text-primary font-bold" }, "Rp " + toDisplayString(new Intl.NumberFormat("id-ID").format(item.price)), 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center justify-between gap-4 pt-2 border-t border-border" }, [
                                createVNode("div", { class: "flex flex-col gap-1" }, [
                                  createVNode("span", {
                                    class: ["inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-bold border", item.status === "available" ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"]
                                  }, toDisplayString(item.status), 3),
                                  createVNode("span", { class: "text-[10px] text-muted-foreground" }, toDisplayString(new Date(item.created_at).toLocaleDateString("id-ID")), 1)
                                ]),
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("products.edit", item.slug),
                                    class: "p-2 text-muted-foreground hover:bg-accent rounded-lg transition"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Edit3), { class: "w-5 h-5" })
                                    ]),
                                    _: 1
                                  }, 8, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => confirmDeletion(item),
                                    class: "p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                  }, [
                                    createVNode(unref(Trash2), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ]),
                      __props.myProducts.data.length > 0 ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        links: __props.myProducts.links
                      }, null, 8, ["links"])) : createCommentVNode("", true)
                    ])
                  ], 512), [
                    [vShow, tab.value === "overview"]
                  ]),
                  withDirectives(createVNode("div", { class: "transition-all duration-300" }, [
                    createVNode("div", { class: "p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "max-w-xl" }, [
                        createVNode("header", null, [
                          createVNode("h2", { class: "text-lg font-medium" }, "Profil Toko"),
                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Informasi ini akan ditampilkan di halaman publik toko Anda.")
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(updateStoreSettings, ["prevent"]),
                          class: "mt-6 space-y-6"
                        }, [
                          createVNode("div", { class: "flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-border" }, [
                            createVNode("div", { class: "relative group shrink-0" }, [
                              createVNode("div", { class: "relative h-28 w-28 rounded-full overflow-hidden border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border group-hover:ring-primary transition-all duration-300" }, [
                                photoPreview.value ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: photoPreview.value,
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])) : ((_c2 = __props.user.profile) == null ? void 0 : _c2.avatar) ? (openBlock(), createBlock("img", {
                                  key: 1,
                                  src: `/storage/${__props.user.profile.avatar}`,
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "h-full w-full bg-primary/10 flex items-center justify-center text-4xl font-black text-primary"
                                }, toDisplayString((((_d2 = __props.user.profile) == null ? void 0 : _d2.store_name) || __props.user.name).substring(0, 1)), 1)),
                                createVNode("div", {
                                  class: "absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer backdrop-blur-sm",
                                  onClick: ($event) => photoInput.value.click()
                                }, [
                                  createVNode(unref(Image), { class: "w-6 h-6 text-white mb-1" }),
                                  createVNode("span", { class: "text-white text-[10px] font-bold uppercase tracking-wider" }, "Ubah")
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
                              createVNode("div", { class: "absolute -bottom-1 -right-1 bg-background rounded-full p-1 shadow-sm" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: withModifiers(($event) => photoInput.value.click(), ["prevent"]),
                                  class: "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 shadow-sm transition-colors"
                                }, [
                                  createVNode(unref(Edit3), { class: "w-4 h-4" })
                                ], 8, ["onClick"])
                              ])
                            ]),
                            createVNode("div", { class: "flex-1 text-center sm:text-left pt-2" }, [
                              createVNode("h3", { class: "text-lg font-black text-foreground" }, "Foto Profil Toko"),
                              createVNode("p", { class: "text-sm text-muted-foreground mt-1 mb-4 leading-relaxed" }, "Rekomendasi rasio 1:1, maks 2MB. Format file JPG, JPEG, PNG, atau WebP. Gambar yang diunggah akan dapat dicrop secara langsung."),
                              createVNode(_sfc_main$4, {
                                onClick: withModifiers(($event) => photoInput.value.click(), ["prevent"]),
                                class: "shadow-sm border-2"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Unggah Gambar")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_sfc_main$5, {
                                message: unref(storeForm).errors.avatar,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$6, {
                                for: "store_name",
                                value: "Nama Toko / Penjual",
                                class: "font-bold mb-1"
                              }),
                              createVNode(_sfc_main$7, {
                                id: "store_name",
                                modelValue: unref(storeForm).store_name,
                                "onUpdate:modelValue": ($event) => unref(storeForm).store_name = $event,
                                type: "text",
                                class: "block w-full text-sm font-medium h-12 rounded-xl",
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
                                for: "bio",
                                value: "Bio / Deskripsi Singkat Toko",
                                class: "font-bold mb-1"
                              }),
                              withDirectives(createVNode("textarea", {
                                id: "bio",
                                "onUpdate:modelValue": ($event) => unref(storeForm).bio = $event,
                                rows: "4",
                                class: "block w-full border-border bg-background text-foreground focus:border-primary focus:ring-primary rounded-xl shadow-sm placeholder:text-muted-foreground/60 resize-none",
                                placeholder: "Ceritakan kelebihan toko Anda kepada calon pembeli..."
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(storeForm).bio]
                              ]),
                              createVNode(_sfc_main$5, {
                                message: unref(storeForm).errors.bio,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-1" }, [
                              createVNode(_sfc_main$6, {
                                for: "city",
                                value: "Kota / Kabupaten",
                                class: "font-bold mb-1"
                              }),
                              createVNode("div", { class: "relative" }, [
                                createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                                  createVNode(unref(MapPin), { class: "h-4 w-4 text-muted-foreground" })
                                ]),
                                createVNode(_sfc_main$7, {
                                  id: "city",
                                  modelValue: unref(storeForm).city,
                                  "onUpdate:modelValue": ($event) => unref(storeForm).city = $event,
                                  type: "text",
                                  class: "block w-full pl-9 text-sm h-12 rounded-xl",
                                  placeholder: "Misal: Jakarta Selatan"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode(_sfc_main$5, {
                                message: unref(storeForm).errors.city,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-1" }, [
                              createVNode(_sfc_main$6, {
                                for: "address",
                                value: "Alamat Lengkap (Opsional)",
                                class: "font-bold mb-1"
                              }),
                              createVNode(_sfc_main$7, {
                                id: "address",
                                modelValue: unref(storeForm).address,
                                "onUpdate:modelValue": ($event) => unref(storeForm).address = $event,
                                type: "text",
                                class: "block w-full text-sm h-12 rounded-xl",
                                placeholder: "Jalan, No Rumah, RT/RW..."
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$5, {
                                message: unref(storeForm).errors.address,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-4 pt-6 border-t border-border mt-8" }, [
                            createVNode(_sfc_main$8, {
                              disabled: unref(storeForm).processing,
                              class: "h-12 px-8 rounded-xl font-black shadow-lg shadow-primary/20 text-sm"
                            }, {
                              default: withCtx(() => [
                                unref(storeForm).processing ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"
                                })) : createCommentVNode("", true),
                                createTextVNode(" Simpan Perubahan ")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(Transition, {
                              "enter-from-class": "opacity-0 -translate-y-2",
                              "leave-to-class": "opacity-0 translate-y-2",
                              class: "transition ease-out duration-300"
                            }, {
                              default: withCtx(() => [
                                unref(storeForm).recentlySuccessful ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg border border-green-500/20"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4",
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
                  createVNode(_sfc_main$9, {
                    show: cropModalOpen.value,
                    onClose: cancelCrop,
                    maxWidth: "xl"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "p-6 bg-card text-card-foreground" }, [
                        createVNode("header", { class: "mb-4" }, [
                          createVNode("h2", { class: "text-xl font-black" }, "Sesuaikan Foto Profil"),
                          createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, "Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas. Lingkaran adalah pratinjau hasil akhirnya.")
                        ]),
                        createVNode("div", { class: "relative w-full aspect-square bg-black rounded-2xl overflow-hidden border-2 border-border mb-6 ring-1 ring-border shadow-inner flex items-center justify-center" }, [
                          createVNode(unref(Cropper), {
                            ref_key: "cropper",
                            ref: cropper,
                            class: "w-full h-full object-contain",
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
                        createVNode("div", { class: "flex items-center justify-end gap-3 mt-6" }, [
                          createVNode(_sfc_main$4, {
                            onClick: cancelCrop,
                            class: "h-11 px-6 rounded-xl hover:bg-muted font-bold"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$8, {
                            onClick: applyCrop,
                            class: "h-11 px-8 rounded-xl shadow-lg font-bold"
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
                  createVNode(_sfc_main$9, {
                    show: confirmProductDeletion.value,
                    onClose: closeModal
                  }, {
                    default: withCtx(() => {
                      var _a3;
                      return [
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "flex flex-col items-center text-center justify-center" }, [
                            createVNode("div", { class: "mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900" }, [
                              createVNode(unref(Trash2), { class: "h-6 w-6 text-red-600 dark:text-red-200" })
                            ]),
                            createVNode("h2", { class: "text-lg font-medium" }, "Konfirmasi Hapus"),
                            createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, [
                              createTextVNode("Apakah Anda yakin ingin menghapus produk "),
                              createVNode("strong", null, toDisplayString((_a3 = productToDelete.value) == null ? void 0 : _a3.title), 1),
                              createTextVNode("? "),
                              createVNode("br"),
                              createTextVNode(" Tindakan ini tidak dapat dibatalkan.")
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
