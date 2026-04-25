import { computed, mergeProps, useSSRContext, ref, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./GuestLayout-DaJnLzoY.js";
import { _ as _sfc_main$5 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$3 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$4 } from "./TextInput-Cpy3OAqn.js";
import { _ as _sfc_main$7 } from "./BackButton-DqmVU1VH.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
const _sfc_main$1 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "rounded border-gray-300 text-primary shadow-sm focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    const showPassword = ref(false);
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Masuk ke Akun" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-10 text-center"${_scopeId}><div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LogIn), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white"${_scopeId}>Selamat Datang!</h1><p class="text-sm font-medium text-slate-500 mt-1"${_scopeId}>Masuk untuk melanjutkan belanja di GawaiSeken.</p></div>`);
            if (__props.status) {
              _push2(`<div class="mb-6 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-6"${_scopeId}><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "email",
              value: "Alamat Email",
              class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
            }, null, _parent2, _scopeId));
            _push2(`<div class="group relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "email",
              type: "email",
              class: "block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username",
              placeholder: "nama@email.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Mail), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2"${_scopeId}><div class="flex items-center justify-between px-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "password",
              value: "Kata Sandi",
              class: "text-[10px] font-black uppercase tracking-widest text-slate-400"
            }, null, _parent2, _scopeId));
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "text-[10px] font-black uppercase tracking-wider text-primary hover:underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lupa Sandi? `);
                  } else {
                    return [
                      createTextVNode(" Lupa Sandi? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="group relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "password",
              type: showPassword.value ? "text" : "password",
              class: "block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password",
              placeholder: "••••••••"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Lock), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" }, null, _parent2, _scopeId));
            _push2(`<button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" tabindex="-1"${_scopeId}>`);
            if (!showPassword.value) {
              _push2(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(EyeOff), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            }
            _push2(`</button></div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event,
              id: "remember"
            }, null, _parent2, _scopeId));
            _push2(`<label for="remember" class="ms-2 text-xs font-bold text-slate-500 cursor-pointer select-none"${_scopeId}>Ingat saya di perangkat ini</label></div><div class="pt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              class: "w-full py-4 text-sm font-black shadow-xl shadow-primary/20",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Masuk Sekarang `);
                  _push3(ssrRenderComponent(unref(ArrowRight), { class: "ml-2 h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Masuk Sekarang "),
                    createVNode(unref(ArrowRight), { class: "ml-2 h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center pt-4"${_scopeId}><p class="text-sm font-medium text-slate-500"${_scopeId}> Belum punya akun? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "font-black text-primary hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Daftar Gratis `);
                } else {
                  return [
                    createTextVNode(" Daftar Gratis ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div></form><div class="absolute left-4 top-4 sm:left-8 sm:top-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Masuk ke Akun" }),
              createVNode("div", { class: "mb-10 text-center" }, [
                createVNode("div", { class: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4" }, [
                  createVNode(unref(LogIn), { class: "h-6 w-6" })
                ]),
                createVNode("h1", { class: "text-2xl font-black tracking-tight text-slate-900 dark:text-white" }, "Selamat Datang!"),
                createVNode("p", { class: "text-sm font-medium text-slate-500 mt-1" }, "Masuk untuk melanjutkan belanja di GawaiSeken.")
              ]),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-6 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-6"
              }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "email",
                    value: "Alamat Email",
                    class: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                  }),
                  createVNode("div", { class: "group relative" }, [
                    createVNode(_sfc_main$4, {
                      id: "email",
                      type: "email",
                      class: "block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      required: "",
                      autofocus: "",
                      autocomplete: "username",
                      placeholder: "nama@email.com"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(Mail), { class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" })
                  ]),
                  createVNode(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("div", { class: "flex items-center justify-between px-1" }, [
                    createVNode(_sfc_main$3, {
                      for: "password",
                      value: "Kata Sandi",
                      class: "text-[10px] font-black uppercase tracking-widest text-slate-400"
                    }),
                    __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("password.request"),
                      class: "text-[10px] font-black uppercase tracking-wider text-primary hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lupa Sandi? ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "group relative" }, [
                    createVNode(_sfc_main$4, {
                      id: "password",
                      type: showPassword.value ? "text" : "password",
                      class: "block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      autocomplete: "current-password",
                      placeholder: "••••••••"
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
                  createVNode(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "flex items-center" }, [
                  createVNode(_sfc_main$1, {
                    name: "remember",
                    checked: unref(form).remember,
                    "onUpdate:checked": ($event) => unref(form).remember = $event,
                    id: "remember"
                  }, null, 8, ["checked", "onUpdate:checked"]),
                  createVNode("label", {
                    for: "remember",
                    class: "ms-2 text-xs font-bold text-slate-500 cursor-pointer select-none"
                  }, "Ingat saya di perangkat ini")
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_sfc_main$6, {
                    class: "w-full py-4 text-sm font-black shadow-xl shadow-primary/20",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Masuk Sekarang "),
                      createVNode(unref(ArrowRight), { class: "ml-2 h-4 w-4" })
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                createVNode("div", { class: "text-center pt-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-slate-500" }, [
                    createTextVNode(" Belum punya akun? "),
                    createVNode(unref(Link), {
                      href: _ctx.route("register"),
                      class: "font-black text-primary hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Daftar Gratis ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 32),
              createVNode("div", { class: "absolute left-4 top-4 sm:left-8 sm:top-8" }, [
                createVNode(_sfc_main$7)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
