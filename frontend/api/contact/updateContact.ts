import {config} from "@/api/config";
import {SuccessfulResponse} from "@/api/response";
import {ContactData} from "@/api/contact/types";
import {createURL} from "@/api/utils";

export type UpdateContactData = {
    name: string;
    surname: string;
    email: string;
    phone?: string;
    note?: string;
}

export type UpdateContactProps = {
    id: number;
    data: UpdateContactData;
};

export const updateContact = async ({id, data}: UpdateContactProps): Promise<SuccessfulResponse<ContactData>> => {
    const url = createURL(`${config.host}/contacts/${id}`);

    return await fetch(
            url,
            {
                body: JSON.stringify(data),
                headers: {
                    ...config.headers,
                    'Content-Type': 'application/json',
                },
                method: 'PUT'
            }
        )
        .then(res => res.json())
}
