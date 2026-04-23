<?php

namespace App\Enums;

enum NegotiationStatusEnum: string
{
    case PENDING   = 'pending';   // Buyer sudah kirim penawaran
    case ACCEPTED  = 'accepted';  // Seller setuju dengan harga buyer
    case REJECTED  = 'rejected';  // Seller menolak
    case COUNTERED = 'countered'; // Seller menawarkan harga balik
    case EXPIRED   = 'expired';   // Penawaran kadaluarsa (>24 jam)
}
