"use client";

import {SuccessfulResponse} from "@/api/response";
import {ContactData} from "@/api/contact/types";
import {ContactGrid} from "@/components/grids/ContactGrid";
import {useGetContacts} from "@/api/contact/getContactsHook";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import Heading from "@/components/components/Heading";
import React from "react";
import {usePagination} from "@/components/common/PaginationHook";
import {Pagination} from "@/components/components/Pagination";
import {useDeleteContact} from "@/api/contact/deleteContactHook";

type ContactsProps = {
    contacts: SuccessfulResponse<ContactData[]>;
};

export default function Contacts({ contacts }: ContactsProps) {
    const { limit, page, onPageChange } = usePagination();

    const { data } = useGetContacts({
        initialData: contacts,
        limit: limit,
        page: page,
    });
    const {deleteContact} = useDeleteContact();

    const handleContactDelete = (contactId: number) => {
        deleteContact(contactId);
    }

    const handlePageChange = (value: number) => {
        onPageChange(value);
    }

    return (
        <section className="py-4">
            <Heading
                noCurrent
                icon={faHome}
                title="Přehled kontaktů"
            />
            <ContactGrid
                contacts={data?.data}
                onContactDelete={handleContactDelete}
            />
            <Pagination
                onPageChange={handlePageChange}
                page={page}
                pages={data?.pagination?.pages}
            />
        </section>
    );
}
