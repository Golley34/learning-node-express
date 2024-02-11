import {Document} from 'mongoose'

export default interface IUser extends Document {
    _id: string
    username: string
    password: string
    active: boolean
    role?: string
    checkPassword: (pass: string) => boolean
}