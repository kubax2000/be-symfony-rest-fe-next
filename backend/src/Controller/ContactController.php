<?php

declare(strict_types=1);

namespace App\Controller;

use App\Request\Contact\CreateContactRequest;
use App\Request\Contact\ListContactsRequest;
use App\Request\Contact\UpdateContactRequest;
use App\Response\Contact\ContactResponse;
use App\Response\PaginationResponse;
use App\Response\ResponseTrait;
use App\Utils\Arrays;
use ContactIo\Business\ContactBusiness;
use ContactIo\Business\ContactDataBusiness;
use ContactIo\Repository\ContactRepository;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\View\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

class ContactController extends AbstractController
{
    use ResponseTrait;

    public function __construct(
        private readonly ContactBusiness $contactBusiness,
        private readonly ContactDataBusiness $contactDataBusiness,
        private readonly ContactRepository $contactRepository,
    ) {
    }

    #[Post('/contacts')]
    public function createAction(#[MapRequestPayload] CreateContactRequest $request): View
    {
        $contactData = $this->contactDataBusiness->createContactDataFromCreateRequest($request);

        $contact = $this->contactBusiness->create($contactData);

        $response = ContactResponse::fromEntity($contact);

        return $this->createSuccessResponse($response, null, Response::HTTP_CREATED);
    }

    #[Get('/contacts')]
    public function listAction(
        #[MapQueryString] ListContactsRequest $request = new ListContactsRequest(),
    ): View {
        $contacts = $this->contactRepository->list($request->getPage(), $request->getOffset());

        $response = Arrays::map(
            $contacts,
            static fn ($contact) => ContactResponse::fromEntity($contact)
        );

        $count = $this->contactRepository->getCount();
        $pagination = new PaginationResponse(
            $request->getPage(),
            $request->getLimit(),
            $count,
        );

        return $this->createSuccessResponse($response, $pagination);
    }

    #[Get('/contacts/{id}', requirements: ['id' => '\d+'])]
    public function detailAction(int $id): View
    {
        $contact = $this->contactRepository->get($id);

        $response = ContactResponse::fromEntity($contact);

        return $this->createSuccessResponse($response);
    }

    #[Put('/contacts/{id}', requirements: ['id' => '\d+'])]
    public function updateAction(#[MapRequestPayload] UpdateContactRequest $request, int $id): View
    {
        $contact = $this->contactRepository->get($id);

        $contactData = $this->contactDataBusiness->createContactDataFromUpdateRequest($contact, $request);

        $contact = $this->contactBusiness->update($contact, $contactData);

        $response = ContactResponse::fromEntity($contact);

        return $this->createSuccessResponse($response);
    }
}
