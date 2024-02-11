import mongoose from 'mongoose'
import { User } from './models/mongo/User'
import { Product } from './models/mongo/Product'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO_CLIENT_URL || '')

const db = mongoose.connection

db.once('open', async () => {
    try {
        await db.dropCollection('users')
        await db.dropCollection('products')
    } catch(err) {
        console.log(err)
    }

    await User.create({
        username: 'hihihaha@gmail.com',
        password: '123'
    }, {
        username: 'test@gmail.com',
        password: '123'
    })

    await Product.create({
        product: 'Apple',
        description: 'This is an apple',
        price: 100,
        image: '1.jpg'
    }, {
        product: 'Orange',
        description: 'This is an orange',
        price: 200,
        image: '2.jpg'
    }, {
        product: 'Dragon fruit',
        description: 'This is a dragon fruit',
        price: 300,
        image: ''
    },)

    db.close()
})