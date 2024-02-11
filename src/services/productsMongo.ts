import { EStatuses } from "../enums/EStatuses"
import IProductDto from "../interfaces/IProductDto"
import IResponse from "../interfaces/IResponse"
import { ObjectId } from 'mongodb'
import { mongoDBClient } from '../repository/mongoDBClient'
import IProduct from "../interfaces/IProduct"

export class ProductServiceMongo {
    public getProducts = async (): Promise<IResponse<IProduct[] | undefined>> => {
        try {
            const data = await mongoDBClient.getDb()?.collection('products').find().toArray()
           
            const response: IResponse<IProduct[]> = {
                status: EStatuses.OK,
                result: data as any,
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
            const data = await mongoDBClient.getDb()?.collection('products').findOne({_id: new ObjectId(id)})
            const response: IResponse<IProduct> = {
                status: EStatuses.OK,
                result: data as any,
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
            const data = await mongoDBClient.getDb()?.collection('products').insertOne({...product})
            console.log('PRODUCT DATA:::: ', data)
            const response: IResponse<IProduct> = {
                status: EStatuses.OK,
                result: data as any,
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

export const productServiceMongo = new ProductServiceMongo()