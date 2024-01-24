"use client";

import {ContactForm} from "@/components/forms/ContactForm";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Heading from "@/components/components/Heading";
import React from 'react';
import {ContactFormData, useContactForm} from "@/components/forms/ContactFormHook";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useCreateContact} from "@/api/contact/createContactHook";
import {useRouter} from "next/navigation";

export const AddContact = () => {
    const {createContact} = useCreateContact();
    const router = useRouter();

    const {
        handleBlur: handleFormBlur,
        handleChange: handleFormChange,
        handleSubmit: handleFormSubmit,
        errors: formErrors,
        touched: formTouched,
        values: formValues,
    } = useContactForm({
        onSubmit: (values: ContactFormData) => {
            createContact(
                values,
                {
                    onSuccess: () => {
                        router.push("/");
                    }
                },
            );
        }
    });

    const handleSubmitButtonClick = () => {
        handleFormSubmit();
    }

    return (
        <section>
            <Heading
                icon={faUserPlus}
                title="Přidat kontakt"
            />
            <ContactForm
                errors={formErrors}
                touched={formTouched}
                values={formValues}
                handleBlur={handleFormBlur}
                handleChange={handleFormChange}
                handleSubmit={handleFormSubmit}
            />
            <Button color="primary" onClick={handleSubmitButtonClick}>
                Přidat
            </Button>
        </section>
    );
}