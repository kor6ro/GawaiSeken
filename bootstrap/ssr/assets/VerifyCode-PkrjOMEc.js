import { withCtx, unref, createTextVNode, createVNode, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-DaJnLzoY.js";
import { _ as _sfc_main$4 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$2 } from "./InputLabel-D_lYO37a.js";
import { _ as _sfc_main$5 } from "./PrimaryButton-Chd5xZL9.js";
import { _ as _sfc_main$3 } from "./TextInput-Cpy3OAqn.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./ApplicationLogo-5BXBKbkR.js";
const _sfc_main = {
  __name: "VerifyCode",
  __ssrInlineRender: true,
  props: {
    email: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      email: props.email,
      code: ""
    });
    const submit = () => {
      form.post(route("verification.code.verify"), {
        onFinish: () => form.reset("code")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Verifikasi Email" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Terima kasih telah mendaftar! Sebelum memulai, silakan verifikasi alamat email Anda dengan memasukkan 6 digit kode yang telah kami kirimkan ke <strong${_scopeId}>${ssrInterpolate(__props.email)}</strong>. </div><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "code",
              value: "Kode Verifikasi"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "code",
              type: "text",
              class: "mt-1 block w-full text-center text-2xl tracking-widest",
              modelValue: unref(form).code,
              "onUpdate:modelValue": ($event) => unref(form).code = $event,
              required: "",
              autofocus: "",
              placeholder: "000000",
              maxlength: "6"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.code
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "text-sm text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Kembali ke Login `);
                } else {
                  return [
                    createTextVNode(" Kembali ke Login ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Verifikasi Kode `);
                } else {
                  return [
                    createTextVNode(" Verifikasi Kode ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Verifikasi Email" }),
              createVNode("div", { class: "mb-4 text-sm text-gray-600 dark:text-gray-400" }, [
                createTextVNode(" Terima kasih telah mendaftar! Sebelum memulai, silakan verifikasi alamat email Anda dengan memasukkan 6 digit kode yang telah kami kirimkan ke "),
                createVNode("strong", null, toDisplayString(__props.email), 1),
                createTextVNode(". ")
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "code",
                    value: "Kode Verifikasi"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "code",
                    type: "text",
                    class: "mt-1 block w-full text-center text-2xl tracking-widest",
                    modelValue: unref(form).code,
                    "onUpdate:modelValue": ($event) => unref(form).code = $event,
                    required: "",
                    autofocus: "",
                    placeholder: "000000",
                    maxlength: "6"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.code
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("login"),
                    class: "text-sm text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Kembali ke Login ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_sfc_main$5, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Verifikasi Kode ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyCode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
