import {Input, Textarea} from "@nextui-org/input";
import React from "react";

export type ContactFormInputs = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    note: string;
};

type ContactFormProps = {
    errors?: {
        [key in keyof ContactFormInputs]?: string
    };
    touched: {
        [key in keyof ContactFormInputs]?: boolean
    };
    values: ContactFormInputs;
    handleBlur: (e: React.FocusEvent) => void;
    handleChange: (e: React.ChangeEvent) => void;
    handleSubmit: () => void;
}

export const ContactForm = ({
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit
}: ContactFormProps) => {
    const handleFormSubmit = (event: React.FormEvent<any>) => {
        event.preventDefault();

        handleSubmit();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-4">
                <Input
                    id="name"
                    type="name"
                    label="Jméno"
                    placeholder="Jan"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    isInvalid={touched?.name !== undefined && errors?.name !== undefined}
                    errorMessage={touched?.name !== undefined && errors?.name}
                />
                <Input
                    id="surname"
                    type="surname"
                    label="Příjmení"
                    placeholder="Novák"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.surname}
                    isInvalid={touched?.surname !== undefined && errors?.surname !== undefined}
                    errorMessage={touched?.surname !== undefined && errors?.surname}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-4">
                <Input
                    id="email"
                    type="email"
                    label="E-mail"
                    placeholder="jan.novak@mail.cz"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    isInvalid={touched?.email !== undefined && errors?.email !== undefined}
                    errorMessage={touched?.email !== undefined && errors?.email}
                />
                <Input
                    id="phone"
                    type="phone"
                    label="Telefon"
                    placeholder="608100100"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                />
            </div>
            <div className="mb-4">
                <Textarea
                    id="note"
                    label="Poznámka"
                    placeholder="Poznámka..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.note}
                />
            </div>
        </form>
    );
}