import express, { Router, Request, Response } from 'express'
import multer from 'multer'
import { config } from '../index.config'
import { auth } from '../middlewares/auth'
import { productService, ProductService } from '../services/products'
import { permission } from '../middlewares/permission'
import { ERoles } from '../enums/ERoles'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 
            config.filePath)
    },
    filename(req, file, callback) {
        callback(null, 
            file.originalname)
    },
})

const upload = multer({storage})

export class ProductsController {
    private router: Router
    private service: ProductService

    constructor() {
        this.router = express.Router()
        this.router.get('/', auth, this.getProducts)
        this.router.get('/:id', auth, this.getProductById)
        this.router.post('/', [permission(ERoles.SUPER_ADMIN), upload.single('image')], this.addProduct)
        this.router.delete('/:id', permission(ERoles.SUPER_ADMIN), this.deleteProductById)
        this.service = productService
    }

    public getRouter = (): Router => {
        return this.router
    }

    private getProducts = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getProducts()
        res.send(response)
    }

    private getProductById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getProductById(req.params.id)
        res.send(response)
    }

    private addProduct = async (req: Request, res: Response): Promise<void> => {
        const product = req.body
        product.image = req.file ? req.file.filename : ''
        const response = await this.service.addProduct(product)
        res.send(response)
    }

    private deleteProductById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.deleteProductById(req.params.id)
        res.send(response)
    }
}