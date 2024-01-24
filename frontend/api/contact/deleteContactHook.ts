"use client";

import {SuccessfulResponse} from "@/api/response";
import {UseMutateFunction, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createContact, CreateContactData} from "@/api/contact/createContact";
import {updateContact, UpdateContactProps} from "@/api/contact/updateContact";
import {deleteContact} from "@/api/contact/deleteContact";

type DeleteContactsHook = {
    deleteContact: UseMutateFunction<SuccessfulResponse, unknown, number>
}

export const useDeleteContact = (): DeleteContactsHook => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['contacts']});
            queryClient.invalidateQueries({queryKey: ['contact']});
        }
    });

    return {
        deleteContact: mutate
    };
}