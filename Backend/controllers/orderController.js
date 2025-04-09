import Orders from '../model/orderModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import mongoose from 'mongoose'




const createOrder = asyncHandler(async (req, res) => {

    const { cartItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, totalPrice, paymentResult } = req.body

    if (cartItems && cartItems.length == 0) {
        res.status(400)
        throw new Error('cart is empty')
    } else {

        const order = new Orders({
            orderItems: cartItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            paymentResult,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createOrder = await order.save()
        
        res.status(200).json(createOrder)

    }

})


const getMyOrders = asyncHandler(async (req, res) => {



})


const getOrders = asyncHandler(async (req, res) => {

    const order = await Orders.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails'
            }
        }
    ])

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('order not found')
    }

})


const getOrderById = asyncHandler(async (req, res) => {


    const order = await Orders.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails'
            }
        }
    ])

    if (order) {
        res.json(order[0])
    } else {
        res.status(404)
        throw new Error('order not found')
    }

})


const orderDeliver = asyncHandler(async (req, res) => {

    const order = await Orders.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = new Date()
        await order.save()

        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('order not found')
    }


})


const updateOrderPayment = asyncHandler(async (req, res) => {

    const order = await Orders.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = new Date()
        const updateOrder = await order.save()
        res.json(updateOrder)
    }
    else {
        res.status(404)
        throw new Error('payment not found')
    }

})




export {
    createOrder,
    getMyOrders,
    getOrders,
    getOrderById,
    orderDeliver,
    updateOrderPayment
}