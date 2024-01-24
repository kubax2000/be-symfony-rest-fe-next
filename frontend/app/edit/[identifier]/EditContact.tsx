"use client";

import {ContactData} from "@/api/contact/types";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import Heading from "@/components/components/Heading";
import React, {useEffect} from "react";
import {SuccessfulResponse} from "@/api/response";
import {ContactForm} from "@/components/forms/ContactForm";
import {useCreateContact} from "@/api/contact/createContactHook";
import {useRouter} from "next/navigation";
import {ContactFormData, useContactForm} from "@/components/forms/ContactFormHook";
import {Button} from "@nextui-org/button";
import {useUpdateContact} from "@/api/contact/updateContactHook";
import {useGetContact} from "@/api/contact/getContactHook";

type EditContactProps = {
    contact: SuccessfulResponse<ContactData>;
};

export const EditContact = ({contact}: EditContactProps) => {
    const {data} = useGetContact({initialData: contact});

    const {updateContact} = useUpdateContact();
    const router = useRouter();

    const {
        errors: formErrors,
        touched: formTouched,
        values: formValues,
        handleBlur: handleFormBlur,
        handleChange: handleFormChange,
        handleSubmit: handleFormSubmit,
        setValues: setFormValues,
    } = useContactForm({
        initialValues: {
            name: data!.data!.name,
            surname: data!.data!.surname,
            email: data!.data!.email,
            phone: data!.data!.phone || '',
            note: data!.data!.note! || '',
        },
        onSubmit: (values: ContactFormData) => {
            updateContact({
                id: data!.data!.id,
                data: values
            });
            router.push('/');
        }
    });

    useEffect(() => {
        setFormValues({
            name: data!.data!.name,
            surname: data!.data!.surname,
            email: data!.data!.email,
            phone: data!.data!.phone || '',
            note: data!.data!.note! || '',
        });
    }, [data, setFormValues]);

    const handleSubmitButtonClick = () => {
        handleFormSubmit();
    }

    return (
        <section className="py-4">
            <Heading
                icon={faUserEdit}
                title={`Editace kontaktu ${data!.data?.name}`}
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
                Uložit
            </Button>
        </section>
    )
};
