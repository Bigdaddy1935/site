export type PaginateData<T> = {
    current_page: number,
    data: T[],
    from: number,
    last_page: number,
    per_page: number,
    prev_page_url: number | null,
    to: number,
    total: number
}