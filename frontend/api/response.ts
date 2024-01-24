
export type SuccessfulResponse<T = null> = {
    data?: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    result: "success"|"error";
}