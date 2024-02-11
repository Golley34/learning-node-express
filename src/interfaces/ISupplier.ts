import IProduct from "./IProduct"

export default interface ISupplier {
    id: string
    supplier: string
    address: string
    contacts: string
    products: IProduct[]
}