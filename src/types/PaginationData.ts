
export type Pagination = {
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: number | null;
        next: number | null;
    },
    onChange?: (page: number, pageSize: number) => void
};