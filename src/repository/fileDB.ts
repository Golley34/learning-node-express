import IProduct from "../interfaces/IProduct";
import fs from 'node:fs/promises'
import { uuid } from 'uuidv4';
import IProductDto from "../interfaces/IProductDto";
import IDataBase from "../interfaces/IDataBase";

class FileDB implements IDataBase {
    data: IProduct[]
    filename: string
    constructor() {
        this.data = []
        this.filename = './db/db.json'
    }
    public init = async () => {
        try {
          const fileContents = await fs.readFile(this.filename, {encoding: 'utf-8'});
          this.data = JSON.parse(fileContents);
        } catch (err) {
          const error = err as Error
          console.log(error.message)
          this.data = [];
          const dir = await fs.readdir('./db')
          if (!dir) {
            await fs.mkdir('./db')
          }
          await fs.writeFile(this.filename, JSON.stringify(this.data), {encoding: 'utf-8'})
        }
      }

      public close = (): void => {
        return undefined
      }

      public getItems = () => {
        return this.data;
      }

      public getItemById = (id: string) => {
        return this.data.find(p => p.id === id);
      }
     
      public addItem = (item: IProductDto): IProduct => {
        const id: string = uuid()
        const product: IProduct = {...item, id}
        this.data.push(product);
        this.save();
        return product
      }


    
      save = async () => {
        try {
            await fs.writeFile(this.filename, JSON.stringify(this.data));
        } catch(err: unknown) {
            const error = err as Error
            console.log(error.message)
        }
      }
}

export const db = new FileDB()