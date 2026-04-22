import { unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./InputError-DDbcJ_iI.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$2 } from "./TextInput-Cpy3OAqn.js";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { User, Mail, CheckCircle2, Calendar, MapPin, ShieldCheck } from "lucide-vue-next";
const _sfc_main = {
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {
      type: Boolean
    },
    status: {
      type: String
    },
    profile: {
      type: Object
    }
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const user = usePage().props.auth.user;
    const form = useForm({
      name: user.name,
      email: user.email,
      address: ((_a = props.profile) == null ? void 0 : _a.address) || "",
      date_of_birth: ((_b = props.profile) == null ? void 0 : _b.date_of_birth) || "",
      gender: ((_c = props.profile) == null ? void 0 : _c.gender) || ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header class="mb-8"><div class="flex items-center gap-3"><div class="rounded-2xl bg-primary/10 p-2 text-primary shadow-sm ring-1 ring-primary/20">`);
      _push(ssrRenderComponent(unref(User), { class: "h-6 w-6" }, null, _parent));
      _push(`</div><div><h2 class="text-xl font-bold text-foreground">Informasi Profil</h2><p class="text-sm text-muted-foreground">Perbarui identitas dan alamat kontak Anda.</p></div></div></header><form class="space-y-8"><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "name",
        value: "Nama Lengkap",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "name",
        type: "text",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        required: "",
        autofocus: "",
        autocomplete: "name"
      }, null, _parent));
      _push(ssrRenderComponent(unref(User), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "email",
        value: "Alamat Email",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "email",
        type: "email",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(unref(Mail), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      if (unref(user).email_verified_at) {
        _push(`<div class="absolute right-4 top-1/2 -translate-y-1/2" title="Terverifikasi">`);
        _push(ssrRenderComponent(unref(CheckCircle2), { class: "h-5 w-5 text-emerald-500 fill-emerald-500/10" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "date_of_birth",
        value: "Tanggal Lahir",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "date_of_birth",
        type: "date",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        modelValue: unref(form).date_of_birth,
        "onUpdate:modelValue": ($event) => unref(form).date_of_birth = $event
      }, null, _parent));
      _push(ssrRenderComponent(unref(Calendar), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.date_of_birth
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "gender",
        value: "Jenis Kelamin",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group"><select id="gender" class="block w-full rounded-2xl border-transparent bg-muted/30 py-3 pl-4 pr-10 text-sm focus:border-primary focus:bg-background focus:ring-primary transition-all dark:bg-gray-900"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "") : ssrLooseEqual(unref(form).gender, "")) ? " selected" : ""}>Pilih Jenis Kelamin</option><option value="male"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "male") : ssrLooseEqual(unref(form).gender, "male")) ? " selected" : ""}>Laki-laki</option><option value="female"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "female") : ssrLooseEqual(unref(form).gender, "female")) ? " selected" : ""}>Perempuan</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "other") : ssrLooseEqual(unref(form).gender, "other")) ? " selected" : ""}>Lainnya</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.gender
      }, null, _parent));
      _push(`</div></div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "address",
        value: "Alamat Lengkap",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "address",
        type: "text",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        modelValue: unref(form).address,
        "onUpdate:modelValue": ($event) => unref(form).address = $event,
        autocomplete: "address"
      }, null, _parent));
      _push(ssrRenderComponent(unref(MapPin), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.address
      }, null, _parent));
      _push(`</div>`);
      if (__props.mustVerifyEmail && unref(user).email_verified_at === null) {
        _push(`<div class="rounded-[1.5rem] bg-amber-50 p-6 border border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/30"><div class="flex items-start gap-4"><div class="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/50">`);
        _push(ssrRenderComponent(unref(ShieldCheck), { class: "h-6 w-6" }, null, _parent));
        _push(`</div><div><p class="text-sm font-black text-amber-900 dark:text-amber-400 uppercase tracking-tight">Email Belum Terverifikasi</p><p class="text-sm text-amber-800 dark:text-amber-500/80 mt-1"> Silakan verifikasi email Anda untuk mendapatkan akses penuh ke fitur GawaiSeken. </p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("verification.send"),
          method: "post",
          as: "button",
          class: "mt-4 inline-flex items-center text-xs font-black uppercase tracking-widest text-amber-900 underline hover:no-underline dark:text-amber-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kirim Ulang Kode Verifikasi `);
            } else {
              return [
                createTextVNode(" Kirim Ulang Kode Verifikasi ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="mt-4 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" style="${ssrRenderStyle(__props.status === "verification-link-sent" ? null : { display: "none" })}"> Kode verifikasi baru telah dikirim ke email Anda. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-4 pt-6 border-t border-border">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        disabled: unref(form).processing,
        class: "px-10 py-3.5 shadow-lg shadow-primary/25"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Simpan Perubahan `);
          } else {
            return [
              createTextVNode(" Simpan Perubahan ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent));
        _push(` Tersimpan! </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
