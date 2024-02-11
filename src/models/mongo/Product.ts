import mongoose, { Schema } from 'mongoose'
import IProduct from '../../interfaces/IProduct'


const ProductSchema: Schema = new Schema<IProduct>({
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category_id: String,
    brand_id: String,
    image: String,
    suppliers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Supplier'
            }
        ]
}, {
    versionKey: false,
    timestamps: true
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema) 