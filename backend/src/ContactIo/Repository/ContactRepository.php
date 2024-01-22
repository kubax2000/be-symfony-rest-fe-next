<?php

declare(strict_types=1);

namespace ContactIo\Repository;

use App\Exception\NotFoundException;
use ContactIo\Entity\Contact;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * Class ContactRepository
 *
 * @package ContactIo\Repository
 * @template-extends ServiceEntityRepository<Contact>
 */
class ContactRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Contact::class);
    }

    public function get(int $id): Contact
    {
        /** @var Contact|null $entity */
        $entity = $this->find($id);

        if ($entity === null) {
            throw new NotFoundException(sprintf("Contact id: %s", $id));
        }

        return $entity;
    }

    public function getCount(): int
    {
        $qb = $this->createQueryBuilder('c');
        $qb->select('COUNT(c.id)');

        return (int) $qb->getQuery()->getSingleScalarResult();
    }

    /**
     * @return array<Contact>
     */
    public function list(?int $limit = null, ?int $offset = null): array
    {
        $qb = $this->createQueryBuilder('c');

        $qb->setMaxResults($limit)
            ->setFirstResult($offset)
            ->orderBy('c.id', 'ASC');

        return $qb->getQuery()->getResult();
    }

    public function store(Contact $contact): Contact
    {
        $this->getEntityManager()->persist($contact);
        $this->getEntityManager()->flush();

        return $contact;
    }
}
