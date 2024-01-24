"use client";

import {SuccessfulResponse} from "@/api/response";
import {UseMutateFunction, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createContact, CreateContactData} from "@/api/contact/createContact";
import {updateContact, UpdateContactProps} from "@/api/contact/updateContact";
import {ContactData} from "@/api/contact/types";

type UpdateContactsHook = {
    updateContact: UseMutateFunction<SuccessfulResponse<ContactData>, unknown, UpdateContactProps>
}

export const useUpdateContact = (): UpdateContactsHook => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateContact,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['contacts']});
            queryClient.invalidateQueries({queryKey: ['contact']});
        }
    });

    return {
        updateContact: mutate
    };
}