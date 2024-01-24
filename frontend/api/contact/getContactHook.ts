"use client";

import {SuccessfulResponse} from "@/api/response";
import {ContactData} from "@/api/contact/types";
import {useIsSSR} from "@react-aria/ssr";
import {useQuery} from "@tanstack/react-query";
import {getContacts, GetContactsParams} from "@/api/contact/getContacts";
import {getContact} from "@/api/contact/getContact";
import {useState} from "react";

type UseGetContactsProps = GetContactsParams & {
    initialData: SuccessfulResponse<ContactData>;
}

type GetContactHook = {
    data: SuccessfulResponse<ContactData>|undefined;
    isLoading: boolean;
}

export const useGetContact = ({initialData}: UseGetContactsProps): GetContactHook => {
    const isSSR = useIsSSR();

    const [identifier] = useState(initialData.data!.identifier);

    const { data, isLoading } = useQuery<SuccessfulResponse<ContactData>>({
        queryKey: ['contact', identifier],
        queryFn: () => getContact(identifier),
        initialData: isSSR ? initialData : undefined,
    });

    return {
        data: data,
        isLoading: isLoading,
    };
}