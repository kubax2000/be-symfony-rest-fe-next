<?php

declare(strict_types=1);

namespace App\Utils;

use Symfony\Component\String\ByteString;
use Symfony\Component\String\Slugger\AsciiSlugger;

class Strings
{
    public static function random(int $length = 16): string
    {
        return ByteString::fromRandom($length)->toString();
    }

    public static function slugify(string $string): string
    {
        $slugger = new AsciiSlugger();

        return $slugger->slug($string)->lower()->toString();
    }
}
