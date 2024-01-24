import {getContact} from "@/api/contact/getContact";
import {EditContact} from "@/app/edit/[identifier]/EditContact";

type ContactDetailPageProps = {
    params: {
        identifier: string;
    }
};

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
    const contact = await getContact(params.identifier);

    return <EditContact contact={contact}/>;
}