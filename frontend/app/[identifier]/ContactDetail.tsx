"use client";

import {ContactData} from "@/api/contact/types";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Heading from "@/components/components/Heading";
import React from "react";
import {ContactCard} from "@/components/cards/ContactCard";
import {SuccessfulResponse} from "@/api/response";
import {useGetContact} from "@/api/contact/getContactHook";
import {useDeleteContact} from "@/api/contact/deleteContactHook";
import {useRouter} from "next/navigation";

type ContactDetailProps = {
    contact: SuccessfulResponse<ContactData>;
};

export const ContactDetail = ({contact}: ContactDetailProps) => {
    const {data} = useGetContact({initialData: contact});
    const {deleteContact} = useDeleteContact();
    const router = useRouter();

    const handleDeleteClick = (contactId: number) => {
        deleteContact(contactId, {
            onSuccess: () => {
                router.push('/');
            }
        });
    }

    return (
        <section className="py-4">
            <Heading
                icon={faUserPlus}
                title={`Detail kontaktu ${contact.data?.name}`}
            />
            {data?.data && (
                <ContactCard
                    contact={data.data}
                    hideDetailLink
                    onDeleteClick={handleDeleteClick}
                />
            )}
        </section>
    )
};
