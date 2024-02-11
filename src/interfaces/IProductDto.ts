export default interface IProductDto {
    product: string
    price: number
    description: string
    category_id: string
    brand_id: string
    image?: File | undefined | string
}