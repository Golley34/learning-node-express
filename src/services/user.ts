import IResponse from "../interfaces/IResponse";
import IUser from "../interfaces/IUser";
import IUserCreateDto from "../interfaces/IUserCreateDto";
import IUserGetDto from "../interfaces/IUserGetDto";
import { mongo, Mongo } from "../repository/mongo";


export class UserService {
    private repository: Mongo
    constructor() {
        this.repository = mongo
    }

    public createUser = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
        return await this.repository.createUser(userDto)
    }

    public editUser = async (userDto: IUserCreateDto, id: string): Promise<IResponse<IUserGetDto | undefined>> => {
        return await this.repository.editUser(userDto, id)
    }

    public login = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
        return await this.repository.login(userDto)
    }

    public getUsers = async (): Promise<IResponse<IUser[] | undefined>> => {
        return await this.repository.getUsers()
    }

    public sendEmailPassword = async (req: {email: string}): Promise<IResponse<undefined>> => {
        return await this.repository.sendEmailPassword(req.email)
    }

    public resetPassword = async (password: string, _id: string): Promise<IResponse<undefined>> => {
        return await this.repository.resetPassword(password, _id)
    }
}

export const userService = new UserService()