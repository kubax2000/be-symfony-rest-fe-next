<?php

declare(strict_types=1);

namespace App\Subscriber;

use App\Exception\NotFoundException;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\Exception\ValidationFailedException;

final readonly class ExceptionSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private LoggerInterface $logger,
        private NormalizerInterface $normalizer,
    ) {
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $throwable = $event->getThrowable();

        if ($throwable instanceof NotFoundException) {
            $data = $this->normalizer->normalize($throwable, 'json');
            $event->setResponse(new JsonResponse($data, Response::HTTP_NOT_FOUND));

            return;
        }

        if ($throwable instanceof HttpExceptionInterface) {
            $previous = $throwable->getPrevious();
            if ($previous instanceof ValidationFailedException) {
                $data = $this->normalizer->normalize($previous, 'json');
                $event->setResponse(new JsonResponse($data, $throwable->getStatusCode()));
            }

            return;
        }

        $this->logger->critical($throwable->getMessage(), ['exception' => $throwable]);
    }

    public static function getSubscribedEvents(): array
    {
        return [KernelEvents::EXCEPTION => 'onKernelException'];
    }
}
