import ISupplier from "../interfaces/ISupplier"
import ISupplierDto from "../interfaces/ISupplierDto"
import IResponse from "../interfaces/IResponse"
import { mongo, Mongo } from "../repository/mongo"

export class SupplierService {
    private repository: Mongo
    constructor() {
        this.repository = mongo
    }
    public getSuppliers = async (): Promise<IResponse<ISupplier[] | undefined>> => {
       return await this.repository.getSuppliers()
    }

    public getSupplierById = async (id: string): Promise<IResponse<ISupplier | undefined>> => {
        return await this.repository.getSupplierById(id)
    }

    public addSupplier = async (supplierDto: ISupplierDto): Promise<IResponse<ISupplier | undefined>> => {
        return await this.repository.addSupplier(supplierDto)
    }

    public deleteSupplierById = async (id: string): Promise<IResponse<ISupplier | undefined>> => {
        return await this.repository.deleteSupplierById(id)
    }

    public updateSupplierById = async (id: string, supplierDto: ISupplierDto): Promise<IResponse<ISupplier | undefined>> => {
        return await this.repository.updateSupplierById(id, supplierDto)
    }

}

export const supplierService = new SupplierService()