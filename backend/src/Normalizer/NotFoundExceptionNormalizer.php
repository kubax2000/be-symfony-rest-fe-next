<?php

declare(strict_types=1);

namespace App\Normalizer;

use App\Exception\NotFoundException;
use InvalidArgumentException;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class NotFoundExceptionNormalizer implements NormalizerInterface
{
    private const STRING RESPONSE_CODE = 'NOT_FOUND';
    private const STRING RESPONSE_RESULT = 'error';

    public function normalize(mixed $object, ?string $format = null, array $context = []): array
    {
        if (!$object instanceof NotFoundException) {
            throw new InvalidArgumentException(
                sprintf('The object must implement "%s".', NotFoundException::class),
            );
        }

        return [
            'code' => self::RESPONSE_CODE,
            'result' => self::RESPONSE_RESULT,
            'message' => $object->getMessage(),
        ];
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof NotFoundException;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            NotFoundException::class => true,
        ];
    }
}
