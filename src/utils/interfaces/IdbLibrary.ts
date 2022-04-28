export default interface IdbLibrary {
    get(): unknown
    getOne(query: string): unknown
    getById(id: string): unknown
    create(data: unknown): unknown
    update(id: string, data: unknown): unknown;
    delete(id: string): unknown
}