export type WithId<T> = T & { _id: string };


export type PaginatedResult<T> = {
    data: T[];
    total: number;
    limit: number;
    page: number;
    totalPages: number;
}

export type MongoDocument<T> = WithId<T> & {
    createdAt: Date;
    updatedAt: Date;
}