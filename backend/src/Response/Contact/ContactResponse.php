<?php

declare(strict_types=1);

namespace App\Response\Contact;

use ContactIo\Entity\Contact;
use JsonSerializable;

readonly class ContactResponse implements JsonSerializable
{
    public function __construct(
        private int $id,
        private string $identifier,
        private string $name,
        private string $surname,
        private ?string $phone,
        private string $email,
        private ?string $note,
    ) {
    }

    public static function fromEntity(Contact $contact): self
    {
        return new self(
            $contact->getId(),
            $contact->getIdentifier(),
            $contact->getName(),
            $contact->getSurname(),
            $contact->getPhone(),
            $contact->getEmail(),
            $contact->getNote(),
        );
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getIdentifier(): string
    {
        return $this->identifier;
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

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'identifier' => $this->getIdentifier(),
            'name' => $this->getName(),
            'surname' => $this->getSurname(),
            'phone' => $this->getPhone(),
            'email' => $this->getEmail(),
            'note' => $this->getNote(),
        ];
    }
}
