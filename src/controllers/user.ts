import { userService, UserService } from "../services/user"
import express, {Request, Response, Router} from 'express'
import IResponse from "../interfaces/IResponse"
import IUser from "../interfaces/IUser"
import { EStatuses } from "../enums/EStatuses"
import IUserGetDto from "../interfaces/IUserGetDto"
import { auth } from "../middlewares/auth"
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData"
import jwt from 'jsonwebtoken'
import { permission } from "../middlewares/permission"
import { ERoles } from "../enums/ERoles"



export class UserController {
    private service: UserService
    private router: Router
    constructor() {
        this.service = userService
        this.router = express.Router()
        this.router.get('/', permission(ERoles.ADMIN, ERoles.SUPER_ADMIN), this.getUsers)
        this.router.post('/', this.createUser)
        this.router.post('/login', this.login)
        this.router.get('/token', auth, this.checkToken)
        this.router.put('/', permission(ERoles.ADMIN), this.editUser)
        this.router.post('/forgot-password', this.sendEmailPassword)
        this.router.put('/reset-password', this.resetPassword)
    }
    public getRouter = (): Router => {
        return this.router
    }
    private createUser = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDto | undefined> = await this.service.createUser({
            username: req.body.username,
            password: req.body.password
        })
        res.status(200).send(response)
    }

    private editUser = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const response: IResponse<IUserGetDto | undefined> = await this.service.editUser({
            username: req.body.username,
            password: req.body.password
        }, user._id)
        res.status(200).send(response)
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDto | undefined> = await this.service.login(req.body)
        res.status(200).send(response)
    }

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUser[] | undefined> = await this.service.getUsers()
        res.status(200).send(response)
    }

    public checkToken = async (expressReq: Request, res: Response): Promise<void> => {   
        const req = expressReq as IRequestWithTokenData
        const response: IResponse<IUserGetDto | undefined> = {
            status: EStatuses.NOT_OK,
            result: req.dataFromToken as IUserGetDto,
            message: 'Token is ok'
        }
        res.status(200).send(response)
    }

    private sendEmailPassword = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<undefined> = await this.service.sendEmailPassword(req.body)
        res.status(200).send(response)
    }

    private resetPassword = async (req: Request, res: Response): Promise<void> => {
        const user = jwt.verify(req.body.token || '', process.env.SECRET_KEY || '') as {isResetPassword: boolean, _id: string}
        if (!user || !user.isResetPassword) return
        const response: IResponse<undefined> = await this.service.resetPassword(req.body.password, user._id)
        res.status(200).send(response)
    }
}

export const userController = new UserController()