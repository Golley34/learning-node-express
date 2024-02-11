import express, { Router, Request, Response } from 'express'
import { supplierService, SupplierService } from '../services/suppliers'


export class SuppliersController {
    private router: Router
    private service: SupplierService

    constructor() {
        this.router = express.Router()
        this.router.get('/', this.getSuppliers)
        this.router.get('/:id', this.getSupplierById)
        this.router.post('/', this.addSupplier)
        this.router.delete('/:id', this.deleteSupplierById)
        this.router.post('/:id', this.updateSupplierById)

        this.service = supplierService
    }

    public getRouter = (): Router => {
        return this.router
    }

    private getSuppliers = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getSuppliers()
        res.send(response)
    }

    private getSupplierById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getSupplierById(req.params.id)
        res.send(response)
    }

    private deleteSupplierById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.deleteSupplierById(req.params.id)
        res.send(response)
    }

    private updateSupplierById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.updateSupplierById(req.params.id, req.body)
        res.send(response)
    }

    private addSupplier = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.addSupplier(req.body)
        res.send(response)
    }
}