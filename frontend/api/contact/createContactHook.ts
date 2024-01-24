"use client";

import {SuccessfulResponse} from "@/api/response";
import {UseMutateFunction, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createContact, CreateContactData} from "@/api/contact/createContact";
import {ContactData} from "@/api/contact/types";

type CreateContactsHook = {
    createContact: UseMutateFunction<SuccessfulResponse<ContactData>, unknown, CreateContactData>
}

export const useCreateContact = (): CreateContactsHook => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['contacts']});
            queryClient.invalidateQueries({queryKey: ['contact']});
        }
    });

    return {
        createContact: mutate
    };
}