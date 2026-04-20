<?php

namespace App\Enums;

enum ProductConditionEnum: string
{
    case NEW = 'new';
    case SECOND_LIKE_NEW = 'second_like_new';
    case SECOND_GOOD = 'second_good';
    case MINUS = 'minus';
}
