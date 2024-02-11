import IProduct from "../interfaces/IProduct"
import IProductDto from "../interfaces/IProductDto"
import IResponse from "../interfaces/IResponse"
import { Mongo, mongo } from "../repository/mongo"


export class ProductService {
    private repository: Mongo
    constructor() {
        this.repository = mongo
    }
    public getProducts = async (): Promise<IResponse<IProduct[] | undefined>> => {
        return await this.repository.getProducts()
    }
  
    public getProductById = async (id: string): Promise<IResponse<IProduct | undefined>> => {
        return await this.repository.getProductById(id)
    }
  
    public addProduct = async (productDto: IProductDto): Promise<IResponse<IProduct | undefined>> => {
        return await this.repository.addProduct(productDto)
    }
  
    public deleteProductById = async (id: string): Promise<IResponse<IProduct | undefined>> => {
        return await this.repository.deleteProductById(id)
    }
  
    public updateProductById = async (id: string, productDto: IProductDto): Promise<IResponse<IProduct | undefined>> => {
        return await this.repository.updateProductById(id, productDto)
    }

}

export const productService = new ProductService()