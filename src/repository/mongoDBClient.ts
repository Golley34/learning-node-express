
import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'
import IDataBase from '../interfaces/IDataBase'
dotenv.config()

export class MongoDBClient implements IDataBase {
   private client: MongoClient | null = null
   private db: Db | null = null

   public getDb = (): Db | null => {
        return this.db
   }

   public close = async(): Promise<void> => {
        if (!this.client) return
        await this.client.close()
   }

   public init = async (): Promise<void> => {
     this.client = await MongoClient.connect(process.env.MONGO_CLIENT_URL || '')
     this.db = this.client.db('myStore')
        console.log('MongoDBClient is connected')
   }
}

export const mongoDBClient = new MongoDBClient()