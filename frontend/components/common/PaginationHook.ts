"use client";

import {useUrlStore} from "@/components/common/UrlStoreHook";
import {PaginationData, usePaginationSSR} from "@/components/common/PaginationSSRHook";
import {useSearchParams} from "next/navigation";

type UsePagination = {
    page: number;
    limit: number;
    onLimitChange: (value: number) => void;
    onPageChange: (value: number) => void;
};

export const usePagination = (): UsePagination => {
    const defaultPagination = usePaginationSSR();

    const [values, setValues] = useUrlStore<PaginationData>(defaultPagination);

    const onLimitChange = (value: number) => {
        setValues({page: 1, limit: value});
    }

    const onPageChange = (value: number) => {
        setValues({page: value});
    }

    return {
        page: values.page,
        limit: values.limit,
        onLimitChange: onLimitChange,
        onPageChange: onPageChange,
    };
}