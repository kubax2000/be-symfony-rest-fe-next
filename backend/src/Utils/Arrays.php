<?php

declare(strict_types=1);

namespace App\Utils;

class Arrays
{
    public static function map(array $array, callable $callback): array
    {
        return array_map($callback, $array);
    }
}
