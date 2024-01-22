<?php

declare(strict_types=1);

namespace App\Request\Contact;

use Symfony\Component\Validator\Constraints as Assert;

class CreateContactRequest
{
    public function __construct(
        #[Assert\NotBlank]
        private string $name,
        #[Assert\NotBlank]
        private string $surname,
        private ?string $phone,
        #[Assert\NotBlank]
        #[Assert\Email]
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
