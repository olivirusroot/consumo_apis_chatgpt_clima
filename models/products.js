import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imagen: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Pantalones", "Sacos", "Camisetas"],
        default: "Pantalones"
    },
    discount: {
        type: Boolean,
        default: false,
    },
    price_discount: {
        type: Number
    }
})

export const productModel = mongoose.model('products', productSchema)