"use client";

import {Pagination as NextUIPagination} from "@nextui-org/pagination";
import {useEffect, useState} from "react";

type PaginationProps = {
    onPageChange: (value: number) => void;
    page: number;
    pages?: number;
};

export const Pagination = ({
    onPageChange,
    page,
    pages,
}: PaginationProps) => {
    const [savedPages, setSavedPages] = useState(1);

    useEffect(() => {
        if (pages) {
            setSavedPages(pages);
        }
    }, [pages]);

    return (
        <div className="py-2 px-2 flex justify-center">
            <NextUIPagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={savedPages}
                onChange={onPageChange}
            />
        </div>
    );
}