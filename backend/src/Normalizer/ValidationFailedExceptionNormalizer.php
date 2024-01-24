<?php

declare(strict_types=1);

namespace App\Normalizer;

use InvalidArgumentException;
use Stringable;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\Exception\ValidationFailedException;

class ValidationFailedExceptionNormalizer implements NormalizerInterface
{
    private const STRING RESPONSE_CODE = 'VALIDATION_FAILED';
    private const STRING RESPONSE_RESULT = 'error';

    public function normalize(mixed $object, ?string $format = null, array $context = []): array
    {
        if (!$object instanceof ValidationFailedException) {
            throw new InvalidArgumentException(
                sprintf('The object must implement "%s".', ValidationFailedException::class),
            );
        }

        $violations = $object->getViolations();

        $errors = [];
        foreach ($violations as $violation) {
            $errors[] = [
                'code' => $violation->getCode(),
                'message' => $this->getMessageFromViolation($violation),
                'property' => $this->getPropertyPath($violation),
                'invalidValue' => $violation->getInvalidValue(),
            ];
        }

        return [
            'code' => self::RESPONSE_CODE,
            'result' => self::RESPONSE_RESULT,
            'message' => $object->getMessage(),
            'violations' => $errors,
        ];
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof ValidationFailedException;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            ValidationFailedException::class => true,
        ];
    }

    private function getMessageFromViolation(ConstraintViolationInterface $violation): string|Stringable
    {
        $parameters = $violation->getParameters();
        if (isset($parameters['hint'])) {
            return $parameters['hint'];
        }

        return $violation->getMessage();
    }

    private function getPropertyPath(ConstraintViolationInterface $violation): ?string
    {
        $propertyPath = $violation->getPropertyPath();
        if ($propertyPath === '') {
            return null;
        }

        return $propertyPath;
    }
}
