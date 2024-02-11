import { EStatuses } from "../enums/EStatuses"
import IProduct from "../interfaces/IProduct"
import IProductDto from "../interfaces/IProductDto"
import IResponse from "../interfaces/IResponse"
import { Product } from "../models/postgres/Product"

export class ProductServicePg {
    public getProducts = async (): Promise<IResponse<IProduct[] | undefined>> => {
        try {
            const data = await Product.findAll()
            const response: IResponse<IProduct[]> = {
                status: EStatuses.OK,
                result: data,
                message: 'Products found'
            }
            return response
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            }
            return response
        }
    }

    public getProductById = async (id: string): Promise<IResponse<IProduct | undefined | null>> => {
        try {
            const data: IProduct | null = await Product.findByPk(id)
            const response: IResponse<IProduct | null> = {
                status: EStatuses.OK,
                result: data,
                message: ''
            }
            return response
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            }
            return response
        }
    }

    public addProduct = async (product: IProductDto): Promise<IResponse<IProduct | undefined | null>> => {
        try {
            const data: IProduct | undefined = await Product.create({...product})
            const response: IResponse<IProduct> = {
                status: EStatuses.OK,
                result: data,
                message: ''
            }
            return response
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            }
            return response
        }
    }

}

export const productServicePg = new ProductServicePg()