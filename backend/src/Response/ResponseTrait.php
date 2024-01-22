<?php

declare(strict_types=1);

namespace App\Response;

use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Response;

trait ResponseTrait
{
    public function createSuccessResponse(
        mixed $data,
        ?PaginationResponse $pagination = null,
        int $status = Response::HTTP_OK,
    ): View {
        $response = [
            'data' => $data,
            'pagination' => $pagination,
            'result' => 'success',
        ];

        return View::create($response, $status);
    }
}
