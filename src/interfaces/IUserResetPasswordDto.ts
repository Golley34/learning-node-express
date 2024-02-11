import IUser from "./IUser";

export default interface IUserResetPasswordDto {
    password: IUser['password']
    token: string
}