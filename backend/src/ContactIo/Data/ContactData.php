<?php

declare(strict_types=1);

namespace ContactIo\Data;


readonly class ContactData
{
    public function __construct(
        private string $name,
        private string $surname,
        private ?string $phone,
        private string $email,
        private ?string $note,
    ) {
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getSurname(): string
    {
        return $this->surname;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getNote(): ?string
    {
        return $this->note;
    }
}
