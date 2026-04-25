import { unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-q3jce_33.js";
import { FileText } from "lucide-vue-next";
import "./ApplicationLogo-5BXBKbkR.js";
import "lodash/debounce.js";
import "./Modal-C0YBTj_6.js";
import "lodash/pickBy.js";
import "./themeState-CpsLRyLx.js";
const _sfc_main = {
  __name: "Terms",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Terms of Service" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-16"${_scopeId}><div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-12"${_scopeId}><div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-4xl font-black tracking-tight text-foreground sm:text-5xl"${_scopeId}>Syarat &amp; Ketentuan</h1><p class="mt-4 text-lg text-muted-foreground"${_scopeId}>Aturan main bertransaksi dengan aman di platform kami.</p></div><div class="prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm max-w-none"${_scopeId}><p${_scopeId}> Selamat datang di GawaiSeken! Syarat &amp; Ketentuan (&quot;Ketentuan&quot;) ini mengatur penggunaan Anda atas situs web dan aplikasi GawaiSeken. Dengan mengakses atau menggunakan platform kami, Anda setuju untuk terikat oleh Ketentuan ini. </p><h3${_scopeId}>1. Penerimaan Ketentuan</h3><p${_scopeId}>Dengan membuat akun atau menggunakan bagian mana pun dari layanan kami, Anda mengonfirmasi bahwa Anda telah membaca, memahami, dan menyetujui seluruh isi Ketentuan ini. Jika Anda tidak setuju, harap jangan menggunakan layanan kami.</p><h3${_scopeId}>2. Model Transaksi (COD Murni)</h3><p${_scopeId}>GawaiSeken beroperasi sepenuhnya sebagai platform yang memfasilitasi transaksi <strong${_scopeId}>Cash On Delivery (COD) / Ketemuan Langsung</strong>. Kami tidak menahan dana, dan transaksi pembayaran dilakukan langsung secara peer-to-peer antara pembeli dan penjual pada saat pertemuan.</p><ul${_scopeId}><li${_scopeId}>GawaiSeken <strong${_scopeId}>tidak memungut biaya admin</strong> atas transaksi yang dilakukan.</li><li${_scopeId}>Risiko transaksi yang dilakukan di luar pengawasan sistem kami adalah tanggung jawab masing-masing pihak (pembeli dan penjual).</li><li${_scopeId}>Pengguna disarankan untuk memilih lokasi pertemuan yang aman, ramai, dan pada siang hari.</li></ul><h3${_scopeId}>3. Ketentuan Penjual</h3><p${_scopeId}>Penjual yang mendaftar dan menawarkan barang di GawaiSeken harus mematuhi aturan berikut:</p><ul${_scopeId}><li${_scopeId}>Harus menyelesaikan proses Verifikasi Identitas (KYC) yang disediakan oleh platform.</li><li${_scopeId}>Dilarang menjual barang ilegal, curian, palsu (replika/HDC), atau barang yang melanggar hak kekayaan intelektual pihak ketiga.</li><li${_scopeId}>Harus mendeskripsikan kondisi barang sebenar-benarnya, termasuk minus, lecet, atau kerusakan internal.</li><li${_scopeId}>Wajib menepati jadwal dan lokasi pertemuan COD yang telah disepakati bersama pembeli.</li></ul><h3${_scopeId}>4. Ketentuan Pembeli</h3><p${_scopeId}>Pembeli yang bertransaksi melalui GawaiSeken diwajibkan untuk:</p><ul${_scopeId}><li${_scopeId}>Beritikad baik saat melakukan penawaran harga (Nego) maupun saat membuat jadwal pertemuan COD.</li><li${_scopeId}>Memeriksa fisik, kelengkapan, dan fungsionalitas barang secara menyeluruh saat pertemuan COD sebelum melakukan pembayaran ke penjual.</li><li${_scopeId}>Platform tidak memfasilitasi &quot;Return&quot; atau Pengembalian Barang setelah transaksi COD selesai dan barang telah dibawa pulang. Segala bentuk garansi personal tunduk pada kesepakatan antara penjual dan pembeli.</li></ul><h3${_scopeId}>5. Penghentian Akses</h3><p${_scopeId}>GawaiSeken berhak untuk membekukan atau menghapus akun secara permanen apabila pengguna terbukti melakukan penipuan, spam, menjual barang terlarang, atau melanggar Syarat &amp; Ketentuan ini.</p><h3${_scopeId}>6. Penyangkalan (Disclaimer)</h3><p${_scopeId}>Layanan GawaiSeken disediakan &quot;sebagaimana adanya&quot;. Kami tidak menjamin keakuratan, keandalan, atau kualitas barang yang diiklankan oleh pengguna. Segala sengketa yang timbul pasca-transaksi COD merupakan ranah tanggung jawab pengguna, meski kami menyediakan fitur &quot;Komplain&quot; untuk menengahi atau membekukan akun yang bermasalah.</p><h3${_scopeId}>Hubungi Kami</h3><p${_scopeId}>Jika Anda memiliki pertanyaan lebih lanjut mengenai Syarat &amp; Ketentuan ini, hubungi kami di <a href="mailto:legal@gawaiseken.id"${_scopeId}>legal@gawaiseken.id</a>.</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-16" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-12" }, [
                    createVNode("div", { class: "inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-6" }, [
                      createVNode(unref(FileText), { class: "h-8 w-8" })
                    ]),
                    createVNode("h1", { class: "text-4xl font-black tracking-tight text-foreground sm:text-5xl" }, "Syarat & Ketentuan"),
                    createVNode("p", { class: "mt-4 text-lg text-muted-foreground" }, "Aturan main bertransaksi dengan aman di platform kami.")
                  ]),
                  createVNode("div", { class: "prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm max-w-none" }, [
                    createVNode("p", null, ' Selamat datang di GawaiSeken! Syarat & Ketentuan ("Ketentuan") ini mengatur penggunaan Anda atas situs web dan aplikasi GawaiSeken. Dengan mengakses atau menggunakan platform kami, Anda setuju untuk terikat oleh Ketentuan ini. '),
                    createVNode("h3", null, "1. Penerimaan Ketentuan"),
                    createVNode("p", null, "Dengan membuat akun atau menggunakan bagian mana pun dari layanan kami, Anda mengonfirmasi bahwa Anda telah membaca, memahami, dan menyetujui seluruh isi Ketentuan ini. Jika Anda tidak setuju, harap jangan menggunakan layanan kami."),
                    createVNode("h3", null, "2. Model Transaksi (COD Murni)"),
                    createVNode("p", null, [
                      createTextVNode("GawaiSeken beroperasi sepenuhnya sebagai platform yang memfasilitasi transaksi "),
                      createVNode("strong", null, "Cash On Delivery (COD) / Ketemuan Langsung"),
                      createTextVNode(". Kami tidak menahan dana, dan transaksi pembayaran dilakukan langsung secara peer-to-peer antara pembeli dan penjual pada saat pertemuan.")
                    ]),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createTextVNode("GawaiSeken "),
                        createVNode("strong", null, "tidak memungut biaya admin"),
                        createTextVNode(" atas transaksi yang dilakukan.")
                      ]),
                      createVNode("li", null, "Risiko transaksi yang dilakukan di luar pengawasan sistem kami adalah tanggung jawab masing-masing pihak (pembeli dan penjual)."),
                      createVNode("li", null, "Pengguna disarankan untuk memilih lokasi pertemuan yang aman, ramai, dan pada siang hari.")
                    ]),
                    createVNode("h3", null, "3. Ketentuan Penjual"),
                    createVNode("p", null, "Penjual yang mendaftar dan menawarkan barang di GawaiSeken harus mematuhi aturan berikut:"),
                    createVNode("ul", null, [
                      createVNode("li", null, "Harus menyelesaikan proses Verifikasi Identitas (KYC) yang disediakan oleh platform."),
                      createVNode("li", null, "Dilarang menjual barang ilegal, curian, palsu (replika/HDC), atau barang yang melanggar hak kekayaan intelektual pihak ketiga."),
                      createVNode("li", null, "Harus mendeskripsikan kondisi barang sebenar-benarnya, termasuk minus, lecet, atau kerusakan internal."),
                      createVNode("li", null, "Wajib menepati jadwal dan lokasi pertemuan COD yang telah disepakati bersama pembeli.")
                    ]),
                    createVNode("h3", null, "4. Ketentuan Pembeli"),
                    createVNode("p", null, "Pembeli yang bertransaksi melalui GawaiSeken diwajibkan untuk:"),
                    createVNode("ul", null, [
                      createVNode("li", null, "Beritikad baik saat melakukan penawaran harga (Nego) maupun saat membuat jadwal pertemuan COD."),
                      createVNode("li", null, "Memeriksa fisik, kelengkapan, dan fungsionalitas barang secara menyeluruh saat pertemuan COD sebelum melakukan pembayaran ke penjual."),
                      createVNode("li", null, 'Platform tidak memfasilitasi "Return" atau Pengembalian Barang setelah transaksi COD selesai dan barang telah dibawa pulang. Segala bentuk garansi personal tunduk pada kesepakatan antara penjual dan pembeli.')
                    ]),
                    createVNode("h3", null, "5. Penghentian Akses"),
                    createVNode("p", null, "GawaiSeken berhak untuk membekukan atau menghapus akun secara permanen apabila pengguna terbukti melakukan penipuan, spam, menjual barang terlarang, atau melanggar Syarat & Ketentuan ini."),
                    createVNode("h3", null, "6. Penyangkalan (Disclaimer)"),
                    createVNode("p", null, 'Layanan GawaiSeken disediakan "sebagaimana adanya". Kami tidak menjamin keakuratan, keandalan, atau kualitas barang yang diiklankan oleh pengguna. Segala sengketa yang timbul pasca-transaksi COD merupakan ranah tanggung jawab pengguna, meski kami menyediakan fitur "Komplain" untuk menengahi atau membekukan akun yang bermasalah.'),
                    createVNode("h3", null, "Hubungi Kami"),
                    createVNode("p", null, [
                      createTextVNode("Jika Anda memiliki pertanyaan lebih lanjut mengenai Syarat & Ketentuan ini, hubungi kami di "),
                      createVNode("a", { href: "mailto:legal@gawaiseken.id" }, "legal@gawaiseken.id"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Static/Terms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
