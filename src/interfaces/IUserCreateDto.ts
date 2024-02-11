import IUSer from "./IUser";

export default interface IUserCreateDto {
    username: IUSer['username']
    password: IUSer['password']
}