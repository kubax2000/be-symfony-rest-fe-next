import {getInitialValues} from "@/components/common/UrlStoreSSR";

export type PaginationData = {
    page: number;
    limit: number;
};

const defaultPaginationData: PaginationData = {
    page: 1,
    limit: 5,
};

export const usePaginationSSR = (searchParams?: URLSearchParams): PaginationData => {
    if (!searchParams) {
        return {...defaultPaginationData};
    }

    return getInitialValues(defaultPaginationData, searchParams);
}