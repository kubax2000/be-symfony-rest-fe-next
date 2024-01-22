<?php

declare(strict_types=1);

namespace App\Response;

use JsonSerializable;

class PaginationResponse implements JsonSerializable
{
    private int $pages;

    public function __construct(
        private int $page,
        private int $limit,
        private int $total,
    ) {
        $this->pages = (int) ceil($total / $limit);
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getLimit(): int
    {
        return $this->limit;
    }

    public function getTotal(): int
    {
        return $this->total;
    }

    public function getPages(): int
    {
        return $this->pages;
    }

    public function jsonSerialize(): array
    {
        return [
            'page' => $this->page,
            'limit' => $this->limit,
            'total' => $this->total,
            'pages' => $this->pages,
        ];
    }
}
