import { unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { ShieldCheck } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Privacy",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Privacy Policy" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-16"${_scopeId}><div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-12"${_scopeId}><div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-500 mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShieldCheck), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-4xl font-black tracking-tight text-foreground sm:text-5xl"${_scopeId}>Kebijakan Privasi</h1><p class="mt-4 text-lg text-muted-foreground"${_scopeId}>Diperbarui pada: 26 April 2026</p></div><div class="prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm max-w-none"${_scopeId}><p${_scopeId}> Di GawaiSeken, privasi pengunjung kami adalah salah satu prioritas utama. Dokumen Kebijakan Privasi ini menguraikan jenis informasi pribadi yang diterima dan dikumpulkan oleh GawaiSeken serta bagaimana informasi tersebut digunakan. </p><h3${_scopeId}>1. Informasi yang Kami Kumpulkan</h3><p${_scopeId}>Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami saat Anda membuat akun, memperbarui profil Anda, menggunakan layanan interaktif (seperti fitur chat atau nego harga), atau berkomunikasi dengan layanan pelanggan kami. Informasi ini dapat mencakup:</p><ul${_scopeId}><li${_scopeId}>Nama lengkap dan username</li><li${_scopeId}>Alamat email dan nomor telepon</li><li${_scopeId}>Alamat domisili dan pengiriman</li><li${_scopeId}>Data identitas untuk keperluan verifikasi penjual (KYC)</li><li${_scopeId}>Informasi perangkat dan log koneksi untuk tujuan keamanan</li></ul><h3${_scopeId}>2. Bagaimana Kami Menggunakan Informasi Anda</h3><p${_scopeId}>Informasi yang kami kumpulkan digunakan untuk berbagai tujuan, antara lain:</p><ul${_scopeId}><li${_scopeId}>Menyediakan, memelihara, dan meningkatkan layanan kami.</li><li${_scopeId}>Memproses transaksi dan mengirimkan pemberitahuan terkait, termasuk konfirmasi COD.</li><li${_scopeId}>Memverifikasi identitas pengguna untuk mencegah penipuan dan aktivitas ilegal lainnya.</li><li${_scopeId}>Merespons komentar, pertanyaan, dan permintaan layanan pelanggan.</li><li${_scopeId}>Berkomunikasi dengan Anda tentang produk, layanan, penawaran, promosi, dan acara yang ditawarkan oleh GawaiSeken.</li></ul><h3${_scopeId}>3. Berbagi Informasi Pribadi</h3><p${_scopeId}>Kami tidak akan menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi Anda dalam situasi berikut:</p><ul${_scopeId}><li${_scopeId}>Dengan penjual atau pembeli (seperti nama, nomor telepon, dan lokasi) untuk memfasilitasi transaksi Cash On Delivery (COD).</li><li${_scopeId}>Untuk mematuhi hukum, regulasi, atau permintaan hukum yang sah.</li><li${_scopeId}>Untuk melindungi hak, properti, atau keselamatan GawaiSeken, pengguna kami, atau pihak lainnya.</li></ul><h3${_scopeId}>4. Keamanan Data</h3><p${_scopeId}>Kami mengambil langkah-langkah yang wajar untuk membantu melindungi informasi Anda dari kehilangan, pencurian, penyalahgunaan, dan akses tanpa izin, pengungkapan, perubahan, dan penghancuran. Namun, perlu diingat bahwa tidak ada transmisi data melalui internet atau penyimpanan elektronik yang 100% aman.</p><h3${_scopeId}>5. Perubahan pada Kebijakan Privasi Ini</h3><p${_scopeId}>GawaiSeken dapat mengubah Kebijakan Privasi ini dari waktu ke waktu. Jika kami melakukan perubahan material, kami akan memberi tahu Anda dengan merevisi tanggal di bagian atas kebijakan ini dan, dalam beberapa kasus, kami dapat memberi Anda pemberitahuan tambahan (seperti menambahkan pernyataan di situs web kami atau mengirimkan pemberitahuan kepada Anda).</p><h3${_scopeId}>Hubungi Kami</h3><p${_scopeId}>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:privacy@gawaiseken.id"${_scopeId}>privacy@gawaiseken.id</a>.</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-16" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-12" }, [
                    createVNode("div", { class: "inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-500 mb-6" }, [
                      createVNode(unref(ShieldCheck), { class: "h-8 w-8" })
                    ]),
                    createVNode("h1", { class: "text-4xl font-black tracking-tight text-foreground sm:text-5xl" }, "Kebijakan Privasi"),
                    createVNode("p", { class: "mt-4 text-lg text-muted-foreground" }, "Diperbarui pada: 26 April 2026")
                  ]),
                  createVNode("div", { class: "prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm max-w-none" }, [
                    createVNode("p", null, " Di GawaiSeken, privasi pengunjung kami adalah salah satu prioritas utama. Dokumen Kebijakan Privasi ini menguraikan jenis informasi pribadi yang diterima dan dikumpulkan oleh GawaiSeken serta bagaimana informasi tersebut digunakan. "),
                    createVNode("h3", null, "1. Informasi yang Kami Kumpulkan"),
                    createVNode("p", null, "Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami saat Anda membuat akun, memperbarui profil Anda, menggunakan layanan interaktif (seperti fitur chat atau nego harga), atau berkomunikasi dengan layanan pelanggan kami. Informasi ini dapat mencakup:"),
                    createVNode("ul", null, [
                      createVNode("li", null, "Nama lengkap dan username"),
                      createVNode("li", null, "Alamat email dan nomor telepon"),
                      createVNode("li", null, "Alamat domisili dan pengiriman"),
                      createVNode("li", null, "Data identitas untuk keperluan verifikasi penjual (KYC)"),
                      createVNode("li", null, "Informasi perangkat dan log koneksi untuk tujuan keamanan")
                    ]),
                    createVNode("h3", null, "2. Bagaimana Kami Menggunakan Informasi Anda"),
                    createVNode("p", null, "Informasi yang kami kumpulkan digunakan untuk berbagai tujuan, antara lain:"),
                    createVNode("ul", null, [
                      createVNode("li", null, "Menyediakan, memelihara, dan meningkatkan layanan kami."),
                      createVNode("li", null, "Memproses transaksi dan mengirimkan pemberitahuan terkait, termasuk konfirmasi COD."),
                      createVNode("li", null, "Memverifikasi identitas pengguna untuk mencegah penipuan dan aktivitas ilegal lainnya."),
                      createVNode("li", null, "Merespons komentar, pertanyaan, dan permintaan layanan pelanggan."),
                      createVNode("li", null, "Berkomunikasi dengan Anda tentang produk, layanan, penawaran, promosi, dan acara yang ditawarkan oleh GawaiSeken.")
                    ]),
                    createVNode("h3", null, "3. Berbagi Informasi Pribadi"),
                    createVNode("p", null, "Kami tidak akan menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi Anda dalam situasi berikut:"),
                    createVNode("ul", null, [
                      createVNode("li", null, "Dengan penjual atau pembeli (seperti nama, nomor telepon, dan lokasi) untuk memfasilitasi transaksi Cash On Delivery (COD)."),
                      createVNode("li", null, "Untuk mematuhi hukum, regulasi, atau permintaan hukum yang sah."),
                      createVNode("li", null, "Untuk melindungi hak, properti, atau keselamatan GawaiSeken, pengguna kami, atau pihak lainnya.")
                    ]),
                    createVNode("h3", null, "4. Keamanan Data"),
                    createVNode("p", null, "Kami mengambil langkah-langkah yang wajar untuk membantu melindungi informasi Anda dari kehilangan, pencurian, penyalahgunaan, dan akses tanpa izin, pengungkapan, perubahan, dan penghancuran. Namun, perlu diingat bahwa tidak ada transmisi data melalui internet atau penyimpanan elektronik yang 100% aman."),
                    createVNode("h3", null, "5. Perubahan pada Kebijakan Privasi Ini"),
                    createVNode("p", null, "GawaiSeken dapat mengubah Kebijakan Privasi ini dari waktu ke waktu. Jika kami melakukan perubahan material, kami akan memberi tahu Anda dengan merevisi tanggal di bagian atas kebijakan ini dan, dalam beberapa kasus, kami dapat memberi Anda pemberitahuan tambahan (seperti menambahkan pernyataan di situs web kami atau mengirimkan pemberitahuan kepada Anda)."),
                    createVNode("h3", null, "Hubungi Kami"),
                    createVNode("p", null, [
                      createTextVNode("Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di "),
                      createVNode("a", { href: "mailto:privacy@gawaiseken.id" }, "privacy@gawaiseken.id"),
                      createTextVNode(".")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Static/Privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
