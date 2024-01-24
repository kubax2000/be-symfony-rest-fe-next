"use client";

import {Card, CardHeader, CardBody} from "@nextui-org/card";
import {ContactData} from "@/api/contact/types";
import {Divider} from "@nextui-org/divider";
import {faEdit, faEye, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import User from "@/components/components/User";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {Link as NextUILink} from "@nextui-org/link";
import React from "react";

type ContactCardProps = {
    contact: ContactData;
    hideDeleteLink?: boolean;
    hideDetailLink?: boolean;
    hideEditLink?: boolean;
    onDeleteClick?: (contactId: number) => void;
    onShowNoteClick?: (note: string) => void;
    showNote?: boolean;
};

export const ContactCard = ({
    contact,
    hideDeleteLink,
    hideDetailLink,
    hideEditLink,
    onDeleteClick,
    onShowNoteClick,
    showNote
}: ContactCardProps) => {

    const handleDeleteLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        if (contact.id && onDeleteClick) {
            onDeleteClick(contact.id);
        }
    }

    const handleShowNoteLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        if (contact.note && onShowNoteClick) {
            onShowNoteClick(contact.note);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex gap-3">
                <User
                    src="/user.jpg"
                    name={`${contact.name} ${contact.surname}`}
                />
                <div className="ml-auto px-1 flex gap-2">
                    {!hideEditLink && (
                        <Link
                            href={{
                                pathname: `/edit/${contact.identifier}`,
                            }}
                        >
                            <FontAwesomeIcon icon={faEdit}/>
                        </Link>
                    )}
                    {!hideDetailLink && (
                        <Link
                            href={{
                                pathname: `/${contact.identifier}`,
                            }}
                        >
                            <FontAwesomeIcon icon={faEye}/>
                        </Link>
                    )}
                    {!hideDeleteLink && (
                        <Link
                            className="text-red-500"
                            href="#"
                            onClick={handleDeleteLinkClick}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </Link>
                    )}
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <Table aria-label={`Informace o ${contact.name} ${contact.surname}`} hideHeader removeWrapper>
                    <TableHeader>
                        <TableColumn>Key</TableColumn>
                        <TableColumn>Value</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{contact.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Telefon</TableCell>
                            <TableCell>
                                {contact.phone != null ? contact.phone : "(neuvedeno)"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Poznámka</TableCell>
                            <TableCell>
                                <Note
                                    note={contact.note}
                                    showNote={showNote}
                                    onShowNoteClick={handleShowNoteLinkClick}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
}

type NoteProps = {
    note?: string;
    showNote?: boolean;
    onShowNoteClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Note = ({note, showNote, onShowNoteClick}: NoteProps) => {
    if (!note) {
        return <>(neuvedeno)</>;
    }

    if (showNote) {
        return <>note</>;
    }

    return (
        <NextUILink
            href="#"
            onClick={onShowNoteClick}
        >
            Zobrazit poznámku
        </NextUILink>
    );
}