import { ref, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$1 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$2 } from "./TextInput-Cpy3OAqn.js";
import { useForm, Link } from "@inertiajs/vue3";
import { Lock, KeyRound, ShieldCheck, CheckCircle2 } from "lucide-vue-next";
const _sfc_main = {
  __name: "UpdatePasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const currentPasswordInput = ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header class="mb-8"><div class="flex items-center gap-3"><div class="rounded-2xl bg-primary/10 p-2 text-primary shadow-sm ring-1 ring-primary/20">`);
      _push(ssrRenderComponent(unref(Lock), { class: "h-6 w-6" }, null, _parent));
      _push(`</div><div><h2 class="text-xl font-bold text-foreground">Keamanan &amp; Sandi</h2><p class="text-sm text-muted-foreground">Pastikan akun Anda tetap aman dengan sandi yang kuat.</p></div></div></header><form class="space-y-8"><div class="max-w-xl space-y-6"><div class="space-y-2"><div class="flex items-center justify-between">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "current_password",
        value: "Password Saat Ini",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("password.request"),
        class: "text-[10px] font-black uppercase tracking-wider text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lupa Password? `);
          } else {
            return [
              createTextVNode(" Lupa Password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "current_password",
        ref_key: "currentPasswordInput",
        ref: currentPasswordInput,
        modelValue: unref(form).current_password,
        "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
        type: "password",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        autocomplete: "current-password"
      }, null, _parent));
      _push(ssrRenderComponent(unref(Lock), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.current_password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "password",
        value: "Password Baru",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "password",
        ref_key: "passwordInput",
        ref: passwordInput,
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        type: "password",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(unref(KeyRound), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "password_confirmation",
        value: "Konfirmasi Password Baru",
        class: "text-xs uppercase tracking-widest font-bold text-muted-foreground"
      }, null, _parent));
      _push(`<div class="relative group">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "password_confirmation",
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        type: "password",
        class: "block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(unref(ShieldCheck), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.password_confirmation,
        class: "mt-2"
      }, null, _parent));
      _push(`</div></div><div class="flex items-center gap-4 pt-6 border-t border-border">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        disabled: unref(form).processing,
        class: "px-10 py-3.5 shadow-lg shadow-primary/25"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Perbarui Sandi `);
          } else {
            return [
              createTextVNode(" Perbarui Sandi ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent));
        _push(` Sandi berhasil diubah! </p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
