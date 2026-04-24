import { ref, unref, withCtx, createVNode, withDirectives, vModelSelect, createTextVNode, Transition, createBlock, openBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-Ur8CIvPB.js";
import _sfc_main$4 from "./DeleteUserForm-CiRQjIi_.js";
import _sfc_main$3 from "./UpdatePasswordForm-DhXA2h2s.js";
import _sfc_main$2 from "./UpdateProfileInformationForm-DDxmmD5M.js";
import { Head } from "@inertiajs/vue3";
import { User, Lock, Trash2 } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
import "./DangerButton-Dpx20QNz.js";
import "./InputError-DDbcJ_iI.js";
import "./SecondaryButton-BWOt3jtr.js";
import "./TextInput-Cpy3OAqn.js";
import "./PrimaryButton-Chd5xZL9.js";
import "./AddressForm-UV_w8wYu.js";
import "axios";
const _sfc_main = {
  __name: "Edit",
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
    const activeTab = ref("profile");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pengaturan Profil" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-foreground"${_scopeId}>Pengaturan Akun</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-foreground" }, "Pengaturan Akun")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-6 sm:py-12"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col md:flex-row gap-6 md:gap-8"${_scopeId}><aside class="w-full md:w-64"${_scopeId}><div class="md:hidden"${_scopeId}><div class="relative"${_scopeId}><select class="w-full rounded-2xl border-border bg-card py-3 pl-4 pr-10 text-sm font-bold text-foreground focus:border-primary focus:ring-primary shadow-sm"${_scopeId}><option value="profile"${ssrIncludeBooleanAttr(Array.isArray(activeTab.value) ? ssrLooseContain(activeTab.value, "profile") : ssrLooseEqual(activeTab.value, "profile")) ? " selected" : ""}${_scopeId}>Informasi Profil</option><option value="password"${ssrIncludeBooleanAttr(Array.isArray(activeTab.value) ? ssrLooseContain(activeTab.value, "password") : ssrLooseEqual(activeTab.value, "password")) ? " selected" : ""}${_scopeId}>Keamanan &amp; Sandi</option><option value="danger"${ssrIncludeBooleanAttr(Array.isArray(activeTab.value) ? ssrLooseContain(activeTab.value, "danger") : ssrLooseEqual(activeTab.value, "danger")) ? " selected" : ""}${_scopeId}>Hapus Akun</option></select></div></div><div class="hidden md:block space-y-2"${_scopeId}><button class="${ssrRenderClass([activeTab.value === "profile" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted hover:text-foreground", "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(User), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Informasi Profil </button><button class="${ssrRenderClass([activeTab.value === "password" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted hover:text-foreground", "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Lock), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Keamanan &amp; Sandi </button><button class="${ssrRenderClass([activeTab.value === "danger" ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-red-500 hover:bg-red-50", "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Trash2), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Hapus Akun </button></div></aside><main class="flex-1"${_scopeId}><div class="overflow-hidden bg-card border border-border shadow-sm rounded-3xl sm:rounded-[2.5rem]"${_scopeId}><div class="p-5 sm:p-10"${_scopeId}><div${_scopeId}>`);
            if (activeTab.value === "profile") {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                "must-verify-email": __props.mustVerifyEmail,
                status: __props.status,
                profile: __props.profile
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "password") {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "danger") {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></main></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-6 sm:py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex flex-col md:flex-row gap-6 md:gap-8" }, [
                    createVNode("aside", { class: "w-full md:w-64" }, [
                      createVNode("div", { class: "md:hidden" }, [
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => activeTab.value = $event,
                            class: "w-full rounded-2xl border-border bg-card py-3 pl-4 pr-10 text-sm font-bold text-foreground focus:border-primary focus:ring-primary shadow-sm"
                          }, [
                            createVNode("option", { value: "profile" }, "Informasi Profil"),
                            createVNode("option", { value: "password" }, "Keamanan & Sandi"),
                            createVNode("option", { value: "danger" }, "Hapus Akun")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, activeTab.value]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "hidden md:block space-y-2" }, [
                        createVNode("button", {
                          onClick: ($event) => activeTab.value = "profile",
                          class: [activeTab.value === "profile" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted hover:text-foreground", "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"]
                        }, [
                          createVNode(unref(User), { class: "h-5 w-5" }),
                          createTextVNode(" Informasi Profil ")
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => activeTab.value = "password",
                          class: [activeTab.value === "password" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted hover:text-foreground", "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"]
                        }, [
                          createVNode(unref(Lock), { class: "h-5 w-5" }),
                          createTextVNode(" Keamanan & Sandi ")
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => activeTab.value = "danger",
                          class: [activeTab.value === "danger" ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-red-500 hover:bg-red-50", "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"]
                        }, [
                          createVNode(unref(Trash2), { class: "h-5 w-5" }),
                          createTextVNode(" Hapus Akun ")
                        ], 10, ["onClick"])
                      ])
                    ]),
                    createVNode("main", { class: "flex-1" }, [
                      createVNode("div", { class: "overflow-hidden bg-card border border-border shadow-sm rounded-3xl sm:rounded-[2.5rem]" }, [
                        createVNode("div", { class: "p-5 sm:p-10" }, [
                          createVNode(Transition, {
                            "enter-active-class": "transition duration-300 ease-out",
                            "enter-from-class": "opacity-0 translate-y-4",
                            "enter-to-class": "opacity-100 translate-y-0",
                            mode: "out-in"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("div", { key: activeTab.value }, [
                                activeTab.value === "profile" ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode(_sfc_main$2, {
                                    "must-verify-email": __props.mustVerifyEmail,
                                    status: __props.status,
                                    profile: __props.profile
                                  }, null, 8, ["must-verify-email", "status", "profile"])
                                ])) : createCommentVNode("", true),
                                activeTab.value === "password" ? (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode(_sfc_main$3)
                                ])) : createCommentVNode("", true),
                                activeTab.value === "danger" ? (openBlock(), createBlock("div", { key: 2 }, [
                                  createVNode(_sfc_main$4)
                                ])) : createCommentVNode("", true)
                              ]))
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
