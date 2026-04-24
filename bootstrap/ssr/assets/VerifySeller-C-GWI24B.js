import { ref, computed, onBeforeUnmount, unref, withCtx, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, withModifiers, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./InputError-DDbcJ_iI.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$5 } from "./Modal-C0YBTj_6.js";
import { XCircle, CheckCircle2, Clock, Store, ArrowRight, ShieldCheck, CreditCard, Camera, RotateCcw, Upload, AlertCircle, X } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "VerifySeller",
  __ssrInlineRender: true,
  props: {
    verification: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      ktp_image: null,
      face_image: null
    });
    const ktpPreview = ref(null);
    const facePreview = ref(null);
    const isCameraOpen = ref(false);
    const cameraType = ref(null);
    const video = ref(null);
    const canvas = ref(null);
    const stream = ref(null);
    const cameraError = ref(null);
    const handleKtpChange = (e) => {
      const file = e.target.files[0];
      if (file) setKtpFile(file);
    };
    const handleFaceChange = (e) => {
      const file = e.target.files[0];
      if (file) setFaceFile(file);
    };
    const setKtpFile = (file) => {
      form.ktp_image = file;
      ktpPreview.value = URL.createObjectURL(file);
    };
    const setFaceFile = (file) => {
      form.face_image = file;
      facePreview.value = URL.createObjectURL(file);
    };
    const openCamera = async (type) => {
      cameraType.value = type;
      isCameraOpen.value = true;
      cameraError.value = null;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        cameraError.value = "Browser Anda tidak mendukung akses kamera.";
        return;
      }
      if (!window.isSecureContext) {
        cameraError.value = "Akses kamera memerlukan koneksi aman (HTTPS). Silakan gunakan HTTPS atau akses melalui localhost.";
        return;
      }
      try {
        const constraints = {
          video: {
            facingMode: type === "face" ? "user" : "environment",
            // Gunakan resolusi yang lebih fleksibel
            width: { min: 640, ideal: 1280 },
            height: { min: 480, ideal: 720 }
          }
        };
        stream.value = await navigator.mediaDevices.getUserMedia(constraints);
        if (video.value) {
          video.value.srcObject = stream.value;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        if (err.name === "NotAllowedError") {
          cameraError.value = "Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda.";
        } else {
          cameraError.value = "Gagal mengakses kamera. Pastikan kamera tidak sedang digunakan aplikasi lain.";
        }
      }
    };
    const closeCamera = () => {
      if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop());
      }
      stream.value = null;
      isCameraOpen.value = false;
    };
    const capturePhoto = () => {
      if (!video.value || !canvas.value) return;
      const context = canvas.value.getContext("2d");
      canvas.value.width = video.value.videoWidth;
      canvas.value.height = video.value.videoHeight;
      context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
      canvas.value.toBlob((blob) => {
        const fileName = `${cameraType.value}_${Date.now()}.jpg`;
        const file = new File([blob], fileName, { type: "image/jpeg" });
        if (cameraType.value === "ktp") {
          setKtpFile(file);
        } else {
          setFaceFile(file);
        }
        closeCamera();
      }, "image/jpeg", 0.9);
    };
    const submit = () => {
      form.post(route("seller.verification.store"), {
        forceFormData: true,
        onSuccess: () => {
          form.reset();
          ktpPreview.value = null;
          facePreview.value = null;
        }
      });
    };
    const statusConfig = computed(() => {
      var _a;
      if (!props.verification) return null;
      const configs = {
        pending: {
          icon: Clock,
          label: "Sedang Diproses",
          desc: "Dokumen Anda sedang dalam peninjauan oleh tim admin. Proses biasanya memakan waktu 1×24 jam.",
          color: "text-amber-600",
          bg: "bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800/30",
          badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        },
        approved: {
          icon: CheckCircle2,
          label: "Terverifikasi",
          desc: "Selamat! Akun Anda telah terverifikasi sebagai penjual. Anda kini bisa menjual produk di GawaiSeken.",
          color: "text-emerald-600",
          bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/30",
          badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-amber-400"
        },
        rejected: {
          icon: XCircle,
          label: "Ditolak",
          desc: ((_a = props.verification) == null ? void 0 : _a.rejection_note) || "Dokumen Anda tidak memenuhi syarat. Silakan unggah ulang.",
          color: "text-red-600",
          bg: "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30",
          badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        }
      };
      return configs[props.verification.status] ?? null;
    });
    const canSubmit = computed(() => {
      if (!props.verification) return true;
      return props.verification.status === "rejected";
    });
    onBeforeUnmount(() => {
      closeCamera();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Jadi Penjual" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Daftar Jadi Penjual</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Daftar Jadi Penjual")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="py-6 sm:py-12"${_scopeId}><div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="rounded-3xl border border-border bg-card p-6 shadow-sm"${_scopeId}><h3 class="mb-5 text-sm font-black uppercase tracking-widest text-muted-foreground"${_scopeId}> Cara Menjadi Penjual </h3><div class="grid grid-cols-1 gap-4 sm:grid-cols-3"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30"${_scopeId}> 1 </div><div${_scopeId}><p class="font-bold text-foreground text-sm"${_scopeId}>Unggah KTP</p><p class="text-xs text-muted-foreground mt-0.5"${_scopeId}>Foto KTP yang jelas dan tidak buram.</p></div></div><div class="flex items-start gap-3"${_scopeId}><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30"${_scopeId}> 2 </div><div${_scopeId}><p class="font-bold text-foreground text-sm"${_scopeId}>Selfie dengan KTP</p><p class="text-xs text-muted-foreground mt-0.5"${_scopeId}>Foto wajah Anda sambil memegang KTP.</p></div></div><div class="flex items-start gap-3"${_scopeId}><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30"${_scopeId}> 3 </div><div${_scopeId}><p class="font-bold text-foreground text-sm"${_scopeId}>Tunggu Verifikasi Admin</p><p class="text-xs text-muted-foreground mt-0.5"${_scopeId}>Proses 1×24 jam, lalu akun penjual aktif.</p></div></div></div></div>`);
            if (__props.verification && statusConfig.value) {
              _push2(`<div class="${ssrRenderClass([statusConfig.value.bg, "rounded-3xl border p-6 shadow-sm"])}"${_scopeId}><div class="flex items-start gap-4"${_scopeId}><div class="${ssrRenderClass([statusConfig.value.badge, "rounded-xl p-2.5"])}"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(statusConfig.value.icon), {
                class: ["h-6 w-6", statusConfig.value.color]
              }, null), _parent2, _scopeId);
              _push2(`</div><div class="flex-1"${_scopeId}><div class="flex items-center gap-2 flex-wrap"${_scopeId}><p class="font-black text-foreground"${_scopeId}>Status Verifikasi:</p><span class="${ssrRenderClass([statusConfig.value.badge, "rounded-full px-3 py-0.5 text-xs font-black uppercase tracking-wider"])}"${_scopeId}>${ssrInterpolate(statusConfig.value.label)}</span></div><p class="mt-1.5 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(statusConfig.value.desc)}</p>`);
              if (__props.verification.status === "approved") {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("dashboard"),
                  class: "mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Store), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(` Buka Dashboard Penjual `);
                      _push3(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(Store), { class: "h-4 w-4" }),
                        createTextVNode(" Buka Dashboard Penjual "),
                        createVNode(unref(ArrowRight), { class: "h-4 w-4" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (canSubmit.value) {
              _push2(`<div class="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"${_scopeId}><div class="p-6 sm:p-8"${_scopeId}><header class="mb-8"${_scopeId}><div class="flex items-center gap-3 mb-1"${_scopeId}><div class="rounded-xl bg-primary/10 p-2 text-primary ring-1 ring-primary/20"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShieldCheck), { class: "h-6 w-6" }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h3 class="text-lg font-black text-foreground"${_scopeId}>${ssrInterpolate(((_a = __props.verification) == null ? void 0 : _a.status) === "rejected" ? "Unggah Ulang Dokumen" : "Unggah Dokumen Verifikasi")}</h3><p class="text-sm text-muted-foreground"${_scopeId}>Pilih ambil foto langsung atau unggah file. Maks 2 MB.</p></div></div></header><form class="space-y-8"${_scopeId}><div class="space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "ktp_image",
                class: "text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Foto KTP `);
                  } else {
                    return [
                      createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                      createTextVNode(" Foto KTP ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button type="button" class="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Camera), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              _push2(` Ambil Foto Langsung </button></div><label for="ktp_image" class="${ssrRenderClass([{ "border-primary bg-primary/5": ktpPreview.value }, "group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/5"])}"${_scopeId}>`);
              if (ktpPreview.value) {
                _push2(`<div class="w-full"${_scopeId}><img${ssrRenderAttr("src", ktpPreview.value)} class="mx-auto max-h-48 rounded-xl object-contain shadow-md" alt="Preview KTP"${_scopeId}><p class="mt-3 text-xs text-primary font-bold flex items-center justify-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(RotateCcw), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(` Ganti foto / Unggah file </p></div>`);
              } else {
                _push2(`<div class="flex flex-col items-center gap-2"${_scopeId}><div class="rounded-full bg-muted p-4 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Upload), { class: "h-7 w-7" }, null, _parent2, _scopeId));
                _push2(`</div><p class="text-sm font-bold text-foreground"${_scopeId}>Klik untuk unggah file KTP</p><p class="text-xs text-muted-foreground"${_scopeId}>Atau gunakan tombol ambil foto di atas</p></div>`);
              }
              _push2(`<input type="file" id="ktp_image" class="hidden" accept="image/jpg,image/jpeg,image/png"${_scopeId}></label>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                class: "mt-1",
                message: unref(form).errors.ktp_image
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "face_image",
                class: "text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Camera), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Foto Selfie Memegang KTP `);
                  } else {
                    return [
                      createVNode(unref(Camera), { class: "h-4 w-4" }),
                      createTextVNode(" Foto Selfie Memegang KTP ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button type="button" class="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Camera), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              _push2(` Ambil Foto Langsung </button></div><label for="face_image" class="${ssrRenderClass([{ "border-primary bg-primary/5": facePreview.value }, "group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/5"])}"${_scopeId}>`);
              if (facePreview.value) {
                _push2(`<div class="w-full"${_scopeId}><img${ssrRenderAttr("src", facePreview.value)} class="mx-auto max-h-48 rounded-xl object-contain shadow-md" alt="Preview Selfie"${_scopeId}><p class="mt-3 text-xs text-primary font-bold flex items-center justify-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(RotateCcw), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(` Ganti foto / Unggah file </p></div>`);
              } else {
                _push2(`<div class="flex flex-col items-center gap-2"${_scopeId}><div class="rounded-full bg-muted p-4 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Camera), { class: "h-7 w-7" }, null, _parent2, _scopeId));
                _push2(`</div><p class="text-sm font-bold text-foreground"${_scopeId}>Klik untuk unggah file selfie</p><p class="text-xs text-muted-foreground"${_scopeId}>Atau gunakan tombol ambil foto di atas</p></div>`);
              }
              _push2(`<input type="file" id="face_image" class="hidden" accept="image/jpg,image/jpeg,image/png"${_scopeId}></label>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                class: "mt-1",
                message: unref(form).errors.face_image
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-900/10"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-5 w-5 shrink-0 text-amber-600 mt-0.5" }, null, _parent2, _scopeId));
              _push2(`<p class="text-xs text-amber-800 dark:text-amber-400"${_scopeId}> Data verifikasi Anda bersifat <strong${_scopeId}>rahasia</strong> dan hanya digunakan untuk keperluan verifikasi identitas. </p></div><div class="flex items-center gap-4 border-t border-border pt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                disabled: unref(form).processing,
                class: "flex items-center gap-2 px-8 py-3.5 shadow-lg shadow-primary/25"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Upload), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(form).processing ? "Mengunggah..." : "Kirim Dokumen Verifikasi")}`);
                  } else {
                    return [
                      createVNode(unref(Upload), { class: "h-4 w-4" }),
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Mengunggah..." : "Kirim Dokumen Verifikasi"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(form).recentlySuccessful) {
                _push2(`<p class="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                _push2(` Dokumen berhasil dikirim! </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_b = __props.verification) == null ? void 0 : _b.status) === "pending") {
              _push2(`<div class="rounded-3xl border border-border bg-card p-6 text-center shadow-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Clock), { class: "mx-auto h-10 w-10 text-muted-foreground mb-3" }, null, _parent2, _scopeId));
              _push2(`<p class="font-bold text-foreground"${_scopeId}>Dokumen Anda sedang diproses</p><p class="text-sm text-muted-foreground mt-1"${_scopeId}>Anda tidak perlu mengunggah ulang. Tim kami akan meninjau dalam 1×24 jam.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              show: isCameraOpen.value,
              onClose: closeCamera,
              maxWidth: "2xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative overflow-hidden bg-black p-0 sm:rounded-3xl"${_scopeId2}><div class="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent"${_scopeId2}><h3 class="text-sm font-bold text-white uppercase tracking-widest"${_scopeId2}>${ssrInterpolate(cameraType.value === "ktp" ? "Foto KTP" : "Foto Selfie")}</h3><button class="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                  _push3(`</button></div><div class="relative aspect-video w-full bg-gray-900 flex items-center justify-center"${_scopeId2}><video autoplay playsinline class="${ssrRenderClass([{ "scale-x-[-1]": cameraType.value === "face" }, "h-full w-full object-cover"])}"${_scopeId2}></video>`);
                  if (!cameraError.value) {
                    _push3(`<div class="absolute inset-0 pointer-events-none flex items-center justify-center p-8"${_scopeId2}><div class="${ssrRenderClass([cameraType.value === "ktp" ? "w-4/5 aspect-[1.6/1] rounded-xl" : "w-2/3 aspect-square rounded-full", "border-2 border-dashed border-white/50"])}"${_scopeId2}></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (cameraError.value) {
                    _push3(`<div class="p-6 text-center text-white"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(AlertCircle), { class: "mx-auto h-10 w-10 text-red-500 mb-3" }, null, _parent3, _scopeId2));
                    _push3(`<p class="font-bold"${_scopeId2}>${ssrInterpolate(cameraError.value)}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><canvas class="hidden"${_scopeId2}></canvas><div class="p-8 flex items-center justify-center bg-black"${_scopeId2}>`);
                  if (!cameraError.value) {
                    _push3(`<button class="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center p-1 transition hover:scale-105 active:scale-95"${_scopeId2}><div class="h-full w-full rounded-full bg-white"${_scopeId2}></div></button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative overflow-hidden bg-black p-0 sm:rounded-3xl" }, [
                      createVNode("div", { class: "flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent" }, [
                        createVNode("h3", { class: "text-sm font-bold text-white uppercase tracking-widest" }, toDisplayString(cameraType.value === "ktp" ? "Foto KTP" : "Foto Selfie"), 1),
                        createVNode("button", {
                          onClick: closeCamera,
                          class: "rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                        }, [
                          createVNode(unref(X), { class: "h-5 w-5" })
                        ])
                      ]),
                      createVNode("div", { class: "relative aspect-video w-full bg-gray-900 flex items-center justify-center" }, [
                        createVNode("video", {
                          ref_key: "video",
                          ref: video,
                          autoplay: "",
                          playsinline: "",
                          class: ["h-full w-full object-cover", { "scale-x-[-1]": cameraType.value === "face" }]
                        }, null, 2),
                        !cameraError.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute inset-0 pointer-events-none flex items-center justify-center p-8"
                        }, [
                          createVNode("div", {
                            class: ["border-2 border-dashed border-white/50", cameraType.value === "ktp" ? "w-4/5 aspect-[1.6/1] rounded-xl" : "w-2/3 aspect-square rounded-full"]
                          }, null, 2)
                        ])) : createCommentVNode("", true),
                        cameraError.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "p-6 text-center text-white"
                        }, [
                          createVNode(unref(AlertCircle), { class: "mx-auto h-10 w-10 text-red-500 mb-3" }),
                          createVNode("p", { class: "font-bold" }, toDisplayString(cameraError.value), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("canvas", {
                        ref_key: "canvas",
                        ref: canvas,
                        class: "hidden"
                      }, null, 512),
                      createVNode("div", { class: "p-8 flex items-center justify-center bg-black" }, [
                        !cameraError.value ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: capturePhoto,
                          class: "h-16 w-16 rounded-full border-4 border-white flex items-center justify-center p-1 transition hover:scale-105 active:scale-95"
                        }, [
                          createVNode("div", { class: "h-full w-full rounded-full bg-white" })
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-6 sm:py-12" }, [
                createVNode("div", { class: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "rounded-3xl border border-border bg-card p-6 shadow-sm" }, [
                    createVNode("h3", { class: "mb-5 text-sm font-black uppercase tracking-widest text-muted-foreground" }, " Cara Menjadi Penjual "),
                    createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-3" }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("div", { class: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30" }, " 1 "),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-bold text-foreground text-sm" }, "Unggah KTP"),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-0.5" }, "Foto KTP yang jelas dan tidak buram.")
                        ])
                      ]),
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("div", { class: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30" }, " 2 "),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-bold text-foreground text-sm" }, "Selfie dengan KTP"),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-0.5" }, "Foto wajah Anda sambil memegang KTP.")
                        ])
                      ]),
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("div", { class: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30" }, " 3 "),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-bold text-foreground text-sm" }, "Tunggu Verifikasi Admin"),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-0.5" }, "Proses 1×24 jam, lalu akun penjual aktif.")
                        ])
                      ])
                    ])
                  ]),
                  __props.verification && statusConfig.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ["rounded-3xl border p-6 shadow-sm", statusConfig.value.bg]
                  }, [
                    createVNode("div", { class: "flex items-start gap-4" }, [
                      createVNode("div", {
                        class: ["rounded-xl p-2.5", statusConfig.value.badge]
                      }, [
                        (openBlock(), createBlock(resolveDynamicComponent(statusConfig.value.icon), {
                          class: ["h-6 w-6", statusConfig.value.color]
                        }, null, 8, ["class"]))
                      ], 2),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                          createVNode("p", { class: "font-black text-foreground" }, "Status Verifikasi:"),
                          createVNode("span", {
                            class: ["rounded-full px-3 py-0.5 text-xs font-black uppercase tracking-wider", statusConfig.value.badge]
                          }, toDisplayString(statusConfig.value.label), 3)
                        ]),
                        createVNode("p", { class: "mt-1.5 text-sm text-muted-foreground" }, toDisplayString(statusConfig.value.desc), 1),
                        __props.verification.status === "approved" ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("dashboard"),
                          class: "mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Store), { class: "h-4 w-4" }),
                            createTextVNode(" Buka Dashboard Penjual "),
                            createVNode(unref(ArrowRight), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ])
                    ])
                  ], 2)) : createCommentVNode("", true),
                  canSubmit.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
                  }, [
                    createVNode("div", { class: "p-6 sm:p-8" }, [
                      createVNode("header", { class: "mb-8" }, [
                        createVNode("div", { class: "flex items-center gap-3 mb-1" }, [
                          createVNode("div", { class: "rounded-xl bg-primary/10 p-2 text-primary ring-1 ring-primary/20" }, [
                            createVNode(unref(ShieldCheck), { class: "h-6 w-6" })
                          ]),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-lg font-black text-foreground" }, toDisplayString(((_c = __props.verification) == null ? void 0 : _c.status) === "rejected" ? "Unggah Ulang Dokumen" : "Unggah Dokumen Verifikasi"), 1),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Pilih ambil foto langsung atau unggah file. Maks 2 MB.")
                          ])
                        ])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-8"
                      }, [
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode(_sfc_main$2, {
                              for: "ktp_image",
                              class: "text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                createTextVNode(" Foto KTP ")
                              ]),
                              _: 1
                            }),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => openCamera("ktp"),
                              class: "text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
                            }, [
                              createVNode(unref(Camera), { class: "h-3.5 w-3.5" }),
                              createTextVNode(" Ambil Foto Langsung ")
                            ], 8, ["onClick"])
                          ]),
                          createVNode("label", {
                            for: "ktp_image",
                            class: ["group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/5", { "border-primary bg-primary/5": ktpPreview.value }]
                          }, [
                            ktpPreview.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "w-full"
                            }, [
                              createVNode("img", {
                                src: ktpPreview.value,
                                class: "mx-auto max-h-48 rounded-xl object-contain shadow-md",
                                alt: "Preview KTP"
                              }, null, 8, ["src"]),
                              createVNode("p", { class: "mt-3 text-xs text-primary font-bold flex items-center justify-center gap-2" }, [
                                createVNode(unref(RotateCcw), { class: "h-3 w-3" }),
                                createTextVNode(" Ganti foto / Unggah file ")
                              ])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex flex-col items-center gap-2"
                            }, [
                              createVNode("div", { class: "rounded-full bg-muted p-4 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition" }, [
                                createVNode(unref(Upload), { class: "h-7 w-7" })
                              ]),
                              createVNode("p", { class: "text-sm font-bold text-foreground" }, "Klik untuk unggah file KTP"),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "Atau gunakan tombol ambil foto di atas")
                            ])),
                            createVNode("input", {
                              type: "file",
                              id: "ktp_image",
                              class: "hidden",
                              onChange: handleKtpChange,
                              accept: "image/jpg,image/jpeg,image/png"
                            }, null, 32)
                          ], 2),
                          createVNode(_sfc_main$3, {
                            class: "mt-1",
                            message: unref(form).errors.ktp_image
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode(_sfc_main$2, {
                              for: "face_image",
                              class: "text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Camera), { class: "h-4 w-4" }),
                                createTextVNode(" Foto Selfie Memegang KTP ")
                              ]),
                              _: 1
                            }),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => openCamera("face"),
                              class: "text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
                            }, [
                              createVNode(unref(Camera), { class: "h-3.5 w-3.5" }),
                              createTextVNode(" Ambil Foto Langsung ")
                            ], 8, ["onClick"])
                          ]),
                          createVNode("label", {
                            for: "face_image",
                            class: ["group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/5", { "border-primary bg-primary/5": facePreview.value }]
                          }, [
                            facePreview.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "w-full"
                            }, [
                              createVNode("img", {
                                src: facePreview.value,
                                class: "mx-auto max-h-48 rounded-xl object-contain shadow-md",
                                alt: "Preview Selfie"
                              }, null, 8, ["src"]),
                              createVNode("p", { class: "mt-3 text-xs text-primary font-bold flex items-center justify-center gap-2" }, [
                                createVNode(unref(RotateCcw), { class: "h-3 w-3" }),
                                createTextVNode(" Ganti foto / Unggah file ")
                              ])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex flex-col items-center gap-2"
                            }, [
                              createVNode("div", { class: "rounded-full bg-muted p-4 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition" }, [
                                createVNode(unref(Camera), { class: "h-7 w-7" })
                              ]),
                              createVNode("p", { class: "text-sm font-bold text-foreground" }, "Klik untuk unggah file selfie"),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "Atau gunakan tombol ambil foto di atas")
                            ])),
                            createVNode("input", {
                              type: "file",
                              id: "face_image",
                              class: "hidden",
                              onChange: handleFaceChange,
                              accept: "image/jpg,image/jpeg,image/png"
                            }, null, 32)
                          ], 2),
                          createVNode(_sfc_main$3, {
                            class: "mt-1",
                            message: unref(form).errors.face_image
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-900/10" }, [
                          createVNode(unref(AlertCircle), { class: "h-5 w-5 shrink-0 text-amber-600 mt-0.5" }),
                          createVNode("p", { class: "text-xs text-amber-800 dark:text-amber-400" }, [
                            createTextVNode(" Data verifikasi Anda bersifat "),
                            createVNode("strong", null, "rahasia"),
                            createTextVNode(" dan hanya digunakan untuk keperluan verifikasi identitas. ")
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center gap-4 border-t border-border pt-6" }, [
                          createVNode(_sfc_main$4, {
                            disabled: unref(form).processing,
                            class: "flex items-center gap-2 px-8 py-3.5 shadow-lg shadow-primary/25"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Upload), { class: "h-4 w-4" }),
                              createTextVNode(" " + toDisplayString(unref(form).processing ? "Mengunggah..." : "Kirim Dokumen Verifikasi"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition duration-500 ease-out",
                            "enter-from-class": "opacity-0 translate-x-2",
                            "enter-to-class": "opacity-100 translate-x-0"
                          }, {
                            default: withCtx(() => [
                              unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400"
                              }, [
                                createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                                createTextVNode(" Dokumen berhasil dikirim! ")
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ])
                      ], 32)
                    ])
                  ])) : createCommentVNode("", true),
                  ((_d = __props.verification) == null ? void 0 : _d.status) === "pending" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "rounded-3xl border border-border bg-card p-6 text-center shadow-sm"
                  }, [
                    createVNode(unref(Clock), { class: "mx-auto h-10 w-10 text-muted-foreground mb-3" }),
                    createVNode("p", { class: "font-bold text-foreground" }, "Dokumen Anda sedang diproses"),
                    createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, "Anda tidak perlu mengunggah ulang. Tim kami akan meninjau dalam 1×24 jam.")
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$5, {
                show: isCameraOpen.value,
                onClose: closeCamera,
                maxWidth: "2xl"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative overflow-hidden bg-black p-0 sm:rounded-3xl" }, [
                    createVNode("div", { class: "flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent" }, [
                      createVNode("h3", { class: "text-sm font-bold text-white uppercase tracking-widest" }, toDisplayString(cameraType.value === "ktp" ? "Foto KTP" : "Foto Selfie"), 1),
                      createVNode("button", {
                        onClick: closeCamera,
                        class: "rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                      }, [
                        createVNode(unref(X), { class: "h-5 w-5" })
                      ])
                    ]),
                    createVNode("div", { class: "relative aspect-video w-full bg-gray-900 flex items-center justify-center" }, [
                      createVNode("video", {
                        ref_key: "video",
                        ref: video,
                        autoplay: "",
                        playsinline: "",
                        class: ["h-full w-full object-cover", { "scale-x-[-1]": cameraType.value === "face" }]
                      }, null, 2),
                      !cameraError.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute inset-0 pointer-events-none flex items-center justify-center p-8"
                      }, [
                        createVNode("div", {
                          class: ["border-2 border-dashed border-white/50", cameraType.value === "ktp" ? "w-4/5 aspect-[1.6/1] rounded-xl" : "w-2/3 aspect-square rounded-full"]
                        }, null, 2)
                      ])) : createCommentVNode("", true),
                      cameraError.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "p-6 text-center text-white"
                      }, [
                        createVNode(unref(AlertCircle), { class: "mx-auto h-10 w-10 text-red-500 mb-3" }),
                        createVNode("p", { class: "font-bold" }, toDisplayString(cameraError.value), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("canvas", {
                      ref_key: "canvas",
                      ref: canvas,
                      class: "hidden"
                    }, null, 512),
                    createVNode("div", { class: "p-8 flex items-center justify-center bg-black" }, [
                      !cameraError.value ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: capturePhoto,
                        class: "h-16 w-16 rounded-full border-4 border-white flex items-center justify-center p-1 transition hover:scale-105 active:scale-95"
                      }, [
                        createVNode("div", { class: "h-full w-full rounded-full bg-white" })
                      ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/VerifySeller.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
