import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    orderItems: [
        {
            productName: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            productImage: { type: String, required: true },
            product: { type: mongoose.Types.ObjectId, required: true }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String }
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: true
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true
    },
    deliveredAt: {
        type: Date
    }
}
    ,
    {
        timestamps: true
    })


const Orders = mongoose.model('orders',orderSchema)

export default Orders