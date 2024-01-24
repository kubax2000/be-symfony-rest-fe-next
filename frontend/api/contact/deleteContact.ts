import {config} from "@/api/config";
import {SuccessfulResponse} from "@/api/response";
import {ContactData} from "@/api/contact/types";
import {createURL} from "@/api/utils";

export const deleteContact = async (id: number): Promise<SuccessfulResponse> => {
    const url = createURL(`${config.host}/contacts/${id}`);

    return await fetch(
            url,
            {
                headers: {
                    ...config.headers,
                    'Content-Type': 'application/json',
                },
                method: 'DELETE'
            }
        )
        .then(res => res.json())
}
