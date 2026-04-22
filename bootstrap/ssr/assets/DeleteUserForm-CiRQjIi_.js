import { ref, unref, withCtx, createTextVNode, createVNode, withKeys, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DangerButton-Dpx20QNz.js";
import { _ as _sfc_main$3, a as _sfc_main$5 } from "./InputError-DDbcJ_iI.js";
import { _ as _sfc_main$2 } from "./Modal-C0YBTj_6.js";
import { _ as _sfc_main$6 } from "./SecondaryButton-BWOt3jtr.js";
import { _ as _sfc_main$4 } from "./TextInput-Cpy3OAqn.js";
import { useForm } from "@inertiajs/vue3";
import { Trash2, AlertTriangle, ShieldX } from "lucide-vue-next";
const _sfc_main = {
  __name: "DeleteUserForm",
  __ssrInlineRender: true,
  setup(__props) {
    const confirmingUserDeletion = ref(false);
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true;
    };
    const deleteUser = () => {
      form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      confirmingUserDeletion.value = false;
      form.reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header class="mb-8"><div class="flex items-center gap-3"><div class="rounded-2xl bg-red-50 p-2 text-red-500 shadow-sm ring-1 ring-red-100">`);
      _push(ssrRenderComponent(unref(Trash2), { class: "h-6 w-6" }, null, _parent));
      _push(`</div><div><h2 class="text-xl font-bold text-foreground">Hapus Akun</h2><p class="text-sm text-muted-foreground">Tindakan ini bersifat permanen dan tidak dapat dibatalkan.</p></div></div></header><div class="rounded-2xl bg-red-50 p-6 border border-red-100 dark:bg-red-900/10 dark:border-red-900/30"><div class="flex items-start gap-4"><div class="rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-900/50">`);
      _push(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6" }, null, _parent));
      _push(`</div><div class="flex-1"><p class="text-sm font-black text-red-900 dark:text-red-400 uppercase tracking-tight">Peringatan Penting</p><p class="text-sm text-red-800 dark:text-red-500/80 mt-1"> Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda simpan. </p>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        onClick: confirmUserDeletion,
        class: "mt-6 px-8 shadow-lg shadow-red-500/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Saya Mengerti, Hapus Akun Ini `);
          } else {
            return [
              createTextVNode(" Saya Mengerti, Hapus Akun Ini ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        show: confirmingUserDeletion.value,
        onClose: closeModal,
        maxWidth: "md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-8"${_scopeId}><div class="flex justify-center mb-6"${_scopeId}><div class="rounded-full bg-red-100 p-4 text-red-600"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShieldX), { class: "h-10 w-10" }, null, _parent2, _scopeId));
            _push2(`</div></div><h2 class="text-center text-xl font-black text-foreground"${_scopeId}> Konfirmasi Penghapusan </h2><p class="mt-2 text-center text-sm text-muted-foreground"${_scopeId}> Silakan masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun ini secara permanen. </p><div class="mt-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "password",
              value: "Password",
              class: "sr-only"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "password",
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full bg-muted/50 border-transparent focus:bg-background rounded-2xl",
              placeholder: "Masukkan password Anda",
              onKeyup: deleteUser
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.password,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-10 flex flex-col gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              class: ["w-full justify-center py-3.5 shadow-xl shadow-red-500/20", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: deleteUser
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hapus Akun Sekarang `);
                } else {
                  return [
                    createTextVNode(" Hapus Akun Sekarang ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              onClick: closeModal,
              class: "w-full justify-center py-3.5"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-8" }, [
                createVNode("div", { class: "flex justify-center mb-6" }, [
                  createVNode("div", { class: "rounded-full bg-red-100 p-4 text-red-600" }, [
                    createVNode(unref(ShieldX), { class: "h-10 w-10" })
                  ])
                ]),
                createVNode("h2", { class: "text-center text-xl font-black text-foreground" }, " Konfirmasi Penghapusan "),
                createVNode("p", { class: "mt-2 text-center text-sm text-muted-foreground" }, " Silakan masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun ini secara permanen. "),
                createVNode("div", { class: "mt-8" }, [
                  createVNode(_sfc_main$3, {
                    for: "password",
                    value: "Password",
                    class: "sr-only"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full bg-muted/50 border-transparent focus:bg-background rounded-2xl",
                    placeholder: "Masukkan password Anda",
                    onKeyup: withKeys(deleteUser, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: unref(form).errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-10 flex flex-col gap-3" }, [
                  createVNode(_sfc_main$1, {
                    class: ["w-full justify-center py-3.5 shadow-xl shadow-red-500/20", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Hapus Akun Sekarang ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"]),
                  createVNode(_sfc_main$6, {
                    onClick: closeModal,
                    class: "w-full justify-center py-3.5"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
