import { ref, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-DaJnLzoY.js";
import { _ as _sfc_main$4 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$2 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$5 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$3 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$6 } from "./BackButton-DqmVU1VH.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { UserPlus, User, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const showPassword = ref(false);
    const showPasswordConfirmation = ref(false);
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Daftar Akun Baru" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-10 text-center"${_scopeId}><div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(UserPlus), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white"${_scopeId}>Buat Akun</h1><p class="text-sm font-medium text-slate-500 mt-1"${_scopeId}>Mulai pengalaman belanja dan jualan terbaik Anda.</p></div><form class="space-y-5"${_scopeId}><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "name",
              value: "Nama Lengkap",
              class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
            }, null, _parent2, _scopeId));
            _push2(`<div class="group relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "name",
              type: "text",
              class: "block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              autofocus: "",
              autocomplete: "name",
              placeholder: "Contoh: Budi Santoso"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(User), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "email",
              value: "Alamat Email",
              class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
            }, null, _parent2, _scopeId));
            _push2(`<div class="group relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              type: "email",
              class: "block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autocomplete: "username",
              placeholder: "nama@email.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Mail), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password",
              value: "Kata Sandi",
              class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
            }, null, _parent2, _scopeId));
            _push2(`<div class="group relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password",
              type: showPassword.value ? "text" : "password",
              class: "block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "new-password",
              placeholder: "Minimal 8 karakter"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Lock), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" }, null, _parent2, _scopeId));
            _push2(`<button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" tabindex="-1"${_scopeId}>`);
            if (!showPassword.value) {
              _push2(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(EyeOff), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            }
            _push2(`</button></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password_confirmation",
              value: "Konfirmasi Sandi",
              class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
            }, null, _parent2, _scopeId));
            _push2(`<div class="group relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password_confirmation",
              type: showPasswordConfirmation.value ? "text" : "password",
              class: "block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password",
              placeholder: "Ulangi kata sandi"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ShieldCheck), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" }, null, _parent2, _scopeId));
            _push2(`<button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" tabindex="-1"${_scopeId}>`);
            if (!showPasswordConfirmation.value) {
              _push2(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(EyeOff), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            }
            _push2(`</button></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-1",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "w-full py-4 text-sm font-black shadow-xl shadow-primary/20",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Daftar Sekarang `);
                  _push3(ssrRenderComponent(unref(ArrowRight), { class: "ml-2 h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Daftar Sekarang "),
                    createVNode(unref(ArrowRight), { class: "ml-2 h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center pt-2"${_scopeId}><p class="text-sm font-medium text-slate-500"${_scopeId}> Sudah punya akun? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "font-black text-primary hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Masuk Saja `);
                } else {
                  return [
                    createTextVNode(" Masuk Saja ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div></form><div class="absolute left-4 top-4 sm:left-8 sm:top-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Daftar Akun Baru" }),
              createVNode("div", { class: "mb-10 text-center" }, [
                createVNode("div", { class: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4" }, [
                  createVNode(unref(UserPlus), { class: "h-6 w-6" })
                ]),
                createVNode("h1", { class: "text-2xl font-black tracking-tight text-slate-900 dark:text-white" }, "Buat Akun"),
                createVNode("p", { class: "text-sm font-medium text-slate-500 mt-1" }, "Mulai pengalaman belanja dan jualan terbaik Anda.")
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-5"
              }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$2, {
                    for: "name",
                    value: "Nama Lengkap",
                    class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                  }),
                  createVNode("div", { class: "group relative" }, [
                    createVNode(_sfc_main$3, {
                      id: "name",
                      type: "text",
                      class: "block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      required: "",
                      autofocus: "",
                      autocomplete: "name",
                      placeholder: "Contoh: Budi Santoso"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(User), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" })
                  ]),
                  createVNode(_sfc_main$4, {
                    class: "mt-1",
                    message: unref(form).errors.name
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$2, {
                    for: "email",
                    value: "Alamat Email",
                    class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                  }),
                  createVNode("div", { class: "group relative" }, [
                    createVNode(_sfc_main$3, {
                      id: "email",
                      type: "email",
                      class: "block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      required: "",
                      autocomplete: "username",
                      placeholder: "nama@email.com"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(Mail), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" })
                  ]),
                  createVNode(_sfc_main$4, {
                    class: "mt-1",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$2, {
                    for: "password",
                    value: "Kata Sandi",
                    class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                  }),
                  createVNode("div", { class: "group relative" }, [
                    createVNode(_sfc_main$3, {
                      id: "password",
                      type: showPassword.value ? "text" : "password",
                      class: "block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      autocomplete: "new-password",
                      placeholder: "Minimal 8 karakter"
                    }, null, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(Lock), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" }),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => showPassword.value = !showPassword.value,
                      class: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
                      tabindex: "-1"
                    }, [
                      !showPassword.value ? (openBlock(), createBlock(unref(Eye), {
                        key: 0,
                        class: "h-4 w-4"
                      })) : (openBlock(), createBlock(unref(EyeOff), {
                        key: 1,
                        class: "h-4 w-4"
                      }))
                    ], 8, ["onClick"])
                  ]),
                  createVNode(_sfc_main$4, {
                    class: "mt-1",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$2, {
                    for: "password_confirmation",
                    value: "Konfirmasi Sandi",
                    class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                  }),
                  createVNode("div", { class: "group relative" }, [
                    createVNode(_sfc_main$3, {
                      id: "password_confirmation",
                      type: showPasswordConfirmation.value ? "text" : "password",
                      class: "block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
                      modelValue: unref(form).password_confirmation,
                      "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                      required: "",
                      autocomplete: "new-password",
                      placeholder: "Ulangi kata sandi"
                    }, null, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(ShieldCheck), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" }),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => showPasswordConfirmation.value = !showPasswordConfirmation.value,
                      class: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
                      tabindex: "-1"
                    }, [
                      !showPasswordConfirmation.value ? (openBlock(), createBlock(unref(Eye), {
                        key: 0,
                        class: "h-4 w-4"
                      })) : (openBlock(), createBlock(unref(EyeOff), {
                        key: 1,
                        class: "h-4 w-4"
                      }))
                    ], 8, ["onClick"])
                  ]),
                  createVNode(_sfc_main$4, {
                    class: "mt-1",
                    message: unref(form).errors.password_confirmation
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "pt-4" }, [
                  createVNode(_sfc_main$5, {
                    class: "w-full py-4 text-sm font-black shadow-xl shadow-primary/20",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Daftar Sekarang "),
                      createVNode(unref(ArrowRight), { class: "ml-2 h-4 w-4" })
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                createVNode("div", { class: "text-center pt-2" }, [
                  createVNode("p", { class: "text-sm font-medium text-slate-500" }, [
                    createTextVNode(" Sudah punya akun? "),
                    createVNode(unref(Link), {
                      href: _ctx.route("login"),
                      class: "font-black text-primary hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Masuk Saja ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 32),
              createVNode("div", { class: "absolute left-4 top-4 sm:left-8 sm:top-8" }, [
                createVNode(_sfc_main$6)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
