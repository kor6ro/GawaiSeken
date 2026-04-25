<?php

namespace App\Enums;

enum TransactionStatusEnum: string
{
    case COMPLETED        = 'completed';        // Dana dilepas ke seller ✅
    case CANCELED         = 'canceled';         // Transaksi dibatalkan ❌
    case DISPUTED         = 'disputed';         // Sengketa aktif ⚠️
    case COD_REQUESTED    = 'cod_requested';    // Buyer ajukan COD, tunggu konfirmasi seller
    case COD_CONFIRMED    = 'cod_confirmed';    // Seller setuju, jadwal meetup ditetapkan
    case COD_MEETUP_DONE  = 'cod_meetup_done';  // Seller tandai meetup selesai, tunggu konfirmasi buyer
}
