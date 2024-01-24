import {ContactData} from "@/api/contact/types";
import {ContactCard} from "@/components/cards/ContactCard";
import {useState} from "react";
import {LongTextModal} from "@/components/modals/LongTextModal";
import {useDeleteContact} from "@/api/contact/deleteContactHook";

type ContactGridProps = {
    contacts?: ContactData[];
    onContactDelete?: (contactId: number) => void;
};

export const ContactGrid = ({contacts, onContactDelete}: ContactGridProps) => {
    const [note, setNote] = useState<string|undefined>(undefined);

    const handleNoteModalClose = () => {
        setNote(undefined);
    }

    if (!contacts || contacts.length === 0) {
        return <div className="grid justify-center">Žádné kontakty nenalezeny</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <LongTextModal
                content={note}
                title="Poznámka"
                onClose={handleNoteModalClose}/>
            {contacts.map((contact) => (
                <div key={contact.id} className="flex justify-center">
                    <ContactCard
                        contact={contact}
                        onDeleteClick={onContactDelete}
                        onShowNoteClick={setNote}/>
                </div>
            ))}
        </div>
    );
}