export const Pagination = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,

} as const

export type Pagination = (typeof Pagination)[keyof typeof Pagination]

export const PaginationLimits = Object.values(Pagination)