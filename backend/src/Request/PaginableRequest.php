<?php

declare(strict_types=1);

namespace App\Request;

use Symfony\Component\Validator\Constraints as Assert;

class PaginableRequest
{
    private const INT DEFAULT_PAGE = 1;
    private const INT DEFAULT_LIMIT = 100;

    public function __construct(
        #[Assert\Positive]
        public ?int $page = null,
        #[Assert\Positive]
        public ?int $limit = null,
    ) {
    }

    public function getPage(): int
    {
        if ($this->page === null) {
            return self::DEFAULT_PAGE;
        }

        return $this->page;
    }

    public function getLimit(): int
    {
        if ($this->limit === null) {
            return self::DEFAULT_LIMIT;
        }

        return $this->limit;
    }

    public function getOffset(): int
    {
        return ($this->getPage() - 1) * $this->getLimit();
    }
}
