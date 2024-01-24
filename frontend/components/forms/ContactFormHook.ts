"use client";

import {useFormik} from "formik";
import React from "react";

export type ContactFormData = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    note: string;
};

const defaultInitialValues: ContactFormData = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    note: '',
};

type UseContactFormProps = {
    initialValues?: ContactFormData;
    onSubmit: (values: ContactFormData) => void;
}

type UseContactForm = {
    errors: {
        [key in keyof ContactFormData]?: string;
    };
    touched: {
        [key in keyof ContactFormData]?: boolean;
    };
    values: ContactFormData;
    handleBlur: (e: React.FocusEvent<any>) => void;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
    setValues: (values: ContactFormData) => void;
}

export const useContactForm = ({initialValues, onSubmit}: UseContactFormProps): UseContactForm => {
    const {
        errors,
        touched,
        values,
        handleBlur,
        handleChange,
        submitForm,
        setValues,
    } = useFormik<ContactFormData>({
        initialValues: {...defaultInitialValues, ...initialValues},
        validate: values => {
            const errors: {[key in keyof ContactFormData]?: string} = {};
            if (!values.name) {
                errors.name = 'Required';
            }

            if (!values.surname) {
                errors.surname = 'Required';
            }

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        onSubmit: onSubmit,
    });

    return {
        errors,
        touched,
        values,
        handleBlur,
        handleChange,
        handleSubmit: submitForm,
        setValues,
    };
}