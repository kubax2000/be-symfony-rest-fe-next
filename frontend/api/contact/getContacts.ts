import {config} from "@/api/config";
import {SuccessfulResponse} from "@/api/response";
import {ContactData} from "@/api/contact/types";
import {createURL} from "@/api/utils";

export type GetContactsParams = {
    page?: number;
    limit?: number;
}

export const getContacts = async (params: GetContactsParams): Promise<SuccessfulResponse<ContactData[]>> => {
    const url = createURL(config.host + '/contacts', params);

    return await fetch(
            url,
            {
                cache: 'no-store',
                headers: config.headers,
            }
        )
        .then(res => res.json());
}
