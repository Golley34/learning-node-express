import ISupplier from "./ISupplier"

export default interface IProduct {
    id: string
    product: string
    price: number
    category_id: string
    brand_id: string
    description: string
    suppliers?: ISupplier[]
    image?: File | undefined | string
}