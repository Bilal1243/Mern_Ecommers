import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},
    {
        timestamps: true
    })

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
},
    {
        timestamps: true
    }

)



const Products = mongoose.model('products', productSchema)

export default Products