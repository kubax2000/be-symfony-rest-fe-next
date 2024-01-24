import {config} from "@/api/config";
import {SuccessfulResponse} from "@/api/response";
import {ContactData} from "@/api/contact/types";
import {createURL} from "@/api/utils";

export type CreateContactData = {
    name: string;
    surname: string;
    email: string;
    phone?: string;
    note?: string;
}

export const createContact = async (data: CreateContactData): Promise<SuccessfulResponse<ContactData>> => {
    const url = createURL(config.host + '/contacts');

    return await fetch(
            url,
            {
                body: JSON.stringify(data),
                headers: {
                    ...config.headers,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            }
        )
        .then(res => res.json())
}
