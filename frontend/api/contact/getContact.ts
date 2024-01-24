import {config} from "@/api/config";
import {SuccessfulResponse} from "@/api/response";
import {ContactData} from "@/api/contact/types";
import {createURL} from "@/api/utils";

export const getContact = async (identifier: string): Promise<SuccessfulResponse<ContactData>> => {
    const url = createURL(`${config.host}/contacts/${identifier}`);

    return await fetch(
            url,
            {
                cache: 'no-store',
                headers: config.headers,
            }
        )
        .then(res => res.json())
}
