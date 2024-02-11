import mongoose, { Mongoose } from 'mongoose'
import dotenv from 'dotenv'
import IDataBase from '../interfaces/IDataBase'
import { EStatuses } from "../enums/EStatuses"
import IProduct from "../interfaces/IProduct"
import IProductDto from "../interfaces/IProductDto"
import IResponse from "../interfaces/IResponse"
import { Product } from "../models/mongo/Product"
import { Supplier } from '../models/mongo/Supplier'
import ISupplierDto from '../interfaces/ISupplierDto'
import ISupplier from '../interfaces/ISupplier'
import { User } from '../models/mongo/User'
import IUserCreateDto from '../interfaces/IUserCreateDto'
import IUser from '../interfaces/IUser'
import IUserGetDto from '../interfaces/IUserGetDto'
import { generateJWT } from '../helpers/generateJWT'
import { emailService } from '../email/emailService'
import bcrypt from 'bcrypt'
dotenv.config()

export class Mongo implements IDataBase {
   private client: Mongoose | null = null

   public close = async(): Promise<void> => {
        if (!this.client) return
        await this.client.disconnect()
   }

   public init = async (): Promise<void> => {
    this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL || 'mongodb://localhost/myStore')
    console.log('Mongo mongoose is connected')
   }


   public getProducts = async (): Promise<IResponse<IProduct[] | undefined>> => {
      try {
          const data = await Product.find().populate('suppliers', 'supplier')
         
          const response: IResponse<IProduct[]> = {
              status: EStatuses.OK,
              result: data as any,
              message: 'Products found'
          }
          return response
      } catch (err: unknown) {
          const error = err as Error
          const response: IResponse<undefined> = {
              status: EStatuses.NOT_OK,
              result: undefined,
              message: error.message
          }
          return response
      }
  }

  public getProductById = async (id: string): Promise<IResponse<IProduct | undefined>> => {
      try {
          const data = await Product.findById(id)
          const response: IResponse<IProduct> = {
              status: EStatuses.OK,
              result: data as any,
              message: ''
          }
          return response
      } catch (err: unknown) {
          const error = err as Error
          const response: IResponse<undefined> = {
              status: EStatuses.NOT_OK,
              result: undefined,
              message: error.message
          }
          return response
      }
  }

  public addProduct = async (productDto: IProductDto): Promise<IResponse<IProduct | undefined>> => {
      try {
          const product = new Product(productDto)
          const data = await product.save()
          const response: IResponse<IProduct> = {
              status: EStatuses.OK,
              result: data,
              message: ''
          }
          return response
      } catch (err: unknown) {
          const error = err as Error
          const response: IResponse<undefined> = {
              status: EStatuses.NOT_OK,
              result: undefined,
              message: error.message
          }
          return response
      }
  }

  public deleteProductById = async (id: string): Promise<IResponse<IProduct | undefined | null>> => {
      try {
          const data = await Product.findOneAndDelete({_id: id})
          const response: IResponse<IProduct | null> = {
              status: EStatuses.OK,
              result: data,
              message: 'Product is deleted'
          }
          return response
      } catch (err: unknown) {
          const error = err as Error
          const response: IResponse<undefined> = {
              status: EStatuses.NOT_OK,
              result: undefined,
              message: error.message
          }
          return response
      }
  }

  public updateProductById = async (id: string, productDto: IProductDto): Promise<IResponse<IProduct | undefined>> => {
      try {
          const data = await Product.findOneAndUpdate({_id: id}, productDto)
          const response: IResponse<IProduct> = {
              status: EStatuses.OK,
              result: data as any,
              message: ''
          }
          return response
      } catch (err: unknown) {
          const error = err as Error
          const response: IResponse<undefined> = {
              status: EStatuses.NOT_OK,
              result: undefined,
              message: error.message
          }
          return response
      }
  }

  public getSuppliers = async (): Promise<IResponse<ISupplier[] | undefined>> => {
   try {
       const data = await Supplier.find().populate('products', 'product')
      
       const response: IResponse<ISupplier[]> = {
           status: EStatuses.OK,
           result: data as any,
           message: 'Suppliers found'
       }
       return response
   } catch (err: unknown) {
       const error = err as Error
       const response: IResponse<undefined> = {
           status: EStatuses.NOT_OK,
           result: undefined,
           message: error.message
       }
       return response
   }
   }

   public getSupplierById = async (id: string): Promise<IResponse<ISupplier | undefined>> => {
      try {
         const data = await Supplier.findById(id)
         const response: IResponse<ISupplier> = {
            status: EStatuses.OK,
            result: data as any,
            message: ''
         }
         return response
      } catch (err: unknown) {
         const error = err as Error
         const response: IResponse<undefined> = {
            status: EStatuses.NOT_OK,
            result: undefined,
            message: error.message
         }
         return response
      }
   }

   public addSupplier = async (supplierDto: ISupplierDto): Promise<IResponse<ISupplier | undefined>> => {
      try {
         const supplier = new Supplier(supplierDto)
         const data = await supplier.save()
         const response: IResponse<ISupplier> = {
            status: EStatuses.OK,
            result: data as any,
            message: ''
         }
         return response
      } catch (err: unknown) {
         const error = err as Error
         const response: IResponse<undefined> = {
            status: EStatuses.NOT_OK,
            result: undefined,
            message: error.message
         }
         return response
      }
   }

   public deleteSupplierById = async (id: string): Promise<IResponse<ISupplier | undefined>> => {
      try {
         const data = await Supplier.findOneAndDelete({_id: id})
         const response: IResponse<ISupplier> = {
            status: EStatuses.OK,
            result: data as any,
            message: ''
         }
         return response
      } catch (err: unknown) {
         const error = err as Error
         const response: IResponse<undefined> = {
            status: EStatuses.NOT_OK,
            result: undefined,
            message: error.message
         }
         return response
      }
   }

   public updateSupplierById = async (id: string, supplierDto: ISupplierDto): Promise<IResponse<ISupplier | undefined>> => {
      try {
         const data = await Supplier.findOneAndUpdate({_id: id}, supplierDto)
         const response: IResponse<ISupplier> = {
            status: EStatuses.OK,
            result: data as any,
            message: ''
         }
         return response
      } catch (err: unknown) {
         const error = err as Error
         const response: IResponse<undefined> = {
            status: EStatuses.NOT_OK,
            result: undefined,
            message: error.message
         }
         return response
      }
   }

   public createUser = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
    try {
      const exists = await User.exists({username: userDto.username})
      if (exists) {
         return {
            status: EStatuses.NOT_OK,
            result: undefined,
            message: '[ERROR] User already registered'
         }
      }
       const user = new User(userDto)
       await user.save()
       const data = {
         _id: user._id,
         username: user.username, 
         token: generateJWT({_id: user._id, username: user.username, role: user.role || ''}, '2h'),
         role: user.role || ''
       }
       return {
          status: EStatuses.OK,
          result: data,
          message: 'User was created'
       }
    } catch(err: unknown) {
       return {
          status: EStatuses.NOT_OK,
          result: undefined,
          message: '[ERROR] Cannot create user'
       }
    }
 }

 public login = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
    try {
       const user = await User.findOne({username: userDto.username})
       if (!user) {
          throw new Error('Not found')
       }
       const isMatch: boolean = await user.checkPassword(userDto.password)

       if (!isMatch) {
          throw new Error('Wrong password')
       }
       const data = {
         _id: user._id,
         username: user.username, 
         token: generateJWT({_id: user._id, username: user.username, role: user.role || ''}, '2h'),
         role: user.role || ''
       }
       await user.save()
       return {
          status: EStatuses.OK,
          result: data,
          message: 'Access granted'
       }
    } catch(err: unknown) {
       return {
        status: EStatuses.NOT_OK,
          result: undefined,
          message: '[ERROR] Access denied'
       }
    }
 }

 public getUsers = async (): Promise<IResponse<IUser[] | undefined>> => {
    try {
       const data = await User.find()
       return {
        status: EStatuses.OK,
          result: data,
          message: 'Users found'
       }
    } catch(err: unknown) {
       return {
        status: EStatuses.NOT_OK,
          result: undefined,
          message: '[ERROR] Cannot find users'
       }
    }
 }

 public editUser = async (userDto: IUserCreateDto, id: string): Promise<IResponse<IUserGetDto | undefined>> => {
   try {
      const update: {username: string, password?: string} = {
         username: userDto.username
      }
      if (userDto.password) {
         const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT || '') || 10)
         const hash = await bcrypt.hash(userDto.password, salt)
         update.password = hash
      }
     const user: IUserGetDto | null = await User.findOneAndUpdate({_id: id}, update, {
      new: true
    })
      return {
         status: EStatuses.OK,
         result: user || undefined,
         message: 'User was updated'
      }
   } catch(err: unknown) {
      return {
         status: EStatuses.NOT_OK,
         result: undefined,
         message: '[ERROR] Cannot update user'
      }
   }
}

public sendEmailPassword = async (email: string): Promise<IResponse<undefined>> => {
   try {
      const user = await User.findOne({username: email})
      if (user) {
         const token = generateJWT({_id: user._id, isResetPassword: true}, '2m')
         emailService.sendEmail(
            `${process.env.EMAIL}`,
            'Change password',
            `<h1>Hello ${user.username}</h1>
            <p>Please click the link:</p>
            <div>
               <a href='http://localhost:3000/reset-password?token=${token}'>CLICK ME TO RESET YOUR PASSWORD</a>
            </div>
            `
         )
      }
      return {
         status: EStatuses.OK,
         result: undefined,
         message: `Email was sent to ${email}`
      }
   } catch(err: unknown) {
      return {
         status: EStatuses.NOT_OK,
         result: undefined,
         message: `Email was sent to ${email}`
      }
   }
}

public resetPassword = async (password: string, _id: string): Promise<IResponse<undefined>> => {
   try {
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT || '') || 10)
      const hash = await bcrypt.hash(password, salt)

     await User.findOneAndUpdate({_id: _id}, {password: hash})
      return {
         status: EStatuses.OK,
         result: undefined,
         message: 'Password successfully was changed'
      }
   } catch(err: unknown) {
      return {
         status: EStatuses.NOT_OK,
         result: undefined,
         message: '[ERROR] Cannot change password'
      }
   }
}

}

export const mongo = new Mongo()