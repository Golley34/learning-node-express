import mongoose, { Schema } from 'mongoose'
import ISupplier from '../../interfaces/ISupplier'


const SupplierSchema: Schema = new Schema<ISupplier>({
    supplier: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contacts: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, {
    versionKey: false
})

export const Supplier = mongoose.model<ISupplier>('Supplier', SupplierSchema) 