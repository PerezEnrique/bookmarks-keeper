interface IDbLib {
    get(): unknown
    getById(id: unknown): unknown
    getOne(query: unknown): unknown
    create(data: unknown): unknown
    update(id: unknown, data: unknown): unknown
    delete(id: unknown): unknown
}