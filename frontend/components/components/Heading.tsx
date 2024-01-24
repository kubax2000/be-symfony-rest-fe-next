"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/breadcrumbs";
import {Fragment} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type HeadingProps = {
    breadcrumbItems?: HeadingBreadcrumbItem[];
    icon: IconProp;
    noCurrent?: boolean;
    noHome?: boolean;
    title: string;
}

type HeadingBreadcrumbItem = {
    href: string;
    icon: IconProp;
    title: string;
};

export default function Heading({breadcrumbItems, icon, noCurrent, noHome, title}: HeadingProps) {
    return (
        <Fragment>
            <div className="flex items-baseline">
                <div className="flex items-center rounded-small justify-center w-10 h-10 bg-primary/20 text-primary dark:bg-primary dark:text-black/70">
                    <FontAwesomeIcon icon={icon}/>
                </div>
                <h1 className="ml-2 text-xl">{title}</h1>
            </div>
            <Breadcrumbs className="ml-3 mt-2 mb-6">
                {!noHome && (
                    <BreadcrumbItem
                        href="/"
                        key={-1}
                        startContent={
                            <FontAwesomeIcon icon={faHome}/>
                        }
                    >
                        Home
                    </BreadcrumbItem>
                )}
                {breadcrumbItems?.map(({href, icon, title}, index) => (
                    <BreadcrumbItem
                        href={href}
                        key={index}
                        startContent={
                            <FontAwesomeIcon icon={icon}/>
                        }
                    >
                        {title}
                    </BreadcrumbItem>
                ))}
                {!noCurrent && (
                    <BreadcrumbItem
                        key={breadcrumbItems?.length ?? 0}
                        startContent={
                            <FontAwesomeIcon icon={icon}/>
                        }
                    >
                        {title}
                    </BreadcrumbItem>
                )}
            </Breadcrumbs>
        </Fragment>
    );
}