"use client";

import {SuccessfulResponse} from "@/api/response";
import {ContactData} from "@/api/contact/types";
import {useIsSSR} from "@react-aria/ssr";
import {useQuery} from "@tanstack/react-query";
import {getContacts, GetContactsParams} from "@/api/contact/getContacts";

type UseGetContactsProps = GetContactsParams & {
    initialData: SuccessfulResponse<ContactData[]>;
}

type GetContactsHook = {
    data: SuccessfulResponse<ContactData[]>|undefined;
    isLoading: boolean;
}

export const useGetContacts = ({initialData, page, limit}: UseGetContactsProps): GetContactsHook => {
    const isSSR = useIsSSR();

    const { data, isLoading } = useQuery<SuccessfulResponse<ContactData[]>>({
        queryKey: ['contacts', page, limit],
        queryFn: () => getContacts({
            page: page,
            limit: limit,
        }),
        initialData: isSSR ? initialData : undefined,
    });

    return {
        data: data,
        isLoading: isLoading,
    };
}