<?php

declare(strict_types=1);

namespace ContactIo\Business;

use ContactIo\Data\ContactData;
use ContactIo\Entity\Contact;
use ContactIo\Repository\ContactRepository;

readonly class ContactBusiness
{
    public function __construct(
        private ContactRepository $contactRepository,
    ) {
    }

    public function create(
        ContactData $contactData,
    ): Contact {
        $contact = new Contact(
            $contactData->getName(),
            $contactData->getSurname(),
            $contactData->getPhone(),
            $contactData->getEmail(),
            $contactData->getNote(),
        );

        return $this->contactRepository->store($contact);
    }

    public function update(
        Contact $contact,
        ContactData $contactData,
    ): Contact {
        $contact
            ->setName($contactData->getName())
            ->setSurname($contactData->getSurname())
            ->setPhone($contactData->getPhone())
            ->setEmail($contactData->getEmail())
            ->setNote($contactData->getNote());

        return $this->contactRepository->store($contact);
    }
}
