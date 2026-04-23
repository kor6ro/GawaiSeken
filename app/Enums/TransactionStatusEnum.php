<?php

namespace App\Enums;

enum TransactionStatusEnum: string
{
    case PENDING        = 'pending';       // Menunggu pembayaran (Rekber)
    case PAID           = 'paid';          // Pembayaran diterima, dalam escrow
    case PROCESSING     = 'processing';    // Seller menyiapkan barang
    case SHIPPED        = 'shipped';       // Seller input resi, barang dikirim
    case DELIVERED      = 'delivered';     // Buyer konfirmasi terima barang
    case COMPLETED      = 'completed';     // Dana dilepas ke seller ✅
    case CANCELED       = 'canceled';      // Transaksi dibatalkan ❌
    case DISPUTED       = 'disputed';      // Sengketa aktif ⚠️
    case COD_REQUESTED  = 'cod_requested'; // Buyer ajukan COD, tunggu konfirmasi seller
    case COD_CONFIRMED  = 'cod_confirmed'; // Seller setuju, jadwal meetup ditetapkan
}
