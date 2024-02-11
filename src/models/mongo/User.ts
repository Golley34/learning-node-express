import mongoose, { Schema } from 'mongoose'
import IUser from '../../interfaces/IUser'
import bcrypt from 'bcrypt'
import { ERoles } from '../../enums/ERoles'

const UserSchema: Schema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER',
        enum: Object.values(ERoles)
    }
})

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT || '') || 10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash 
    next()
})

UserSchema.set('toJSON', {
    transform(doc, ret, options) {
        delete ret.password
        return ret
    },
})

UserSchema.methods.checkPassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};



export const User = mongoose.model<IUser>('User', UserSchema)