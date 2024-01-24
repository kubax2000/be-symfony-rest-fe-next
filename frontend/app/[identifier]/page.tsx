import {ContactDetail} from "@/app/[identifier]/ContactDetail";
import {getContact} from "@/api/contact/getContact";
import {notFound} from "next/navigation";

type ContactDetailPageProps = {
    params: {
        identifier: string;
    }
};

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
    const contact = await getContact(params.identifier);

    if (contact.result === "error") {
        return notFound();
    }

    return <ContactDetail contact={contact}/>;
}