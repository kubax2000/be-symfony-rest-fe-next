<?php

declare(strict_types=1);

namespace ContactIo\Business;

use App\Request\Contact\CreateContactRequest;
use App\Request\Contact\UpdateContactRequest;
use ContactIo\Data\ContactData;
use ContactIo\Entity\Contact;

readonly class ContactDataBusiness
{
    public function createContactDataFromCreateRequest(
        CreateContactRequest $request,
    ): ContactData {
        return new ContactData(
            $request->getName(),
            $request->getSurname(),
            $request->getPhone(),
            $request->getEmail(),
            $request->getNote(),
        );
    }

    public function createContactDataFromUpdateRequest(
        Contact $contact,
        UpdateContactRequest $request,
    ): ContactData {
        return new ContactData(
            $request->getName(),
            $request->getSurname(),
            $request->getPhone(),
            $contact->getEmail(),
            $request->getNote(),
        );
    }
}
