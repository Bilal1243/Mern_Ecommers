import express from "express";

import { admin, protect } from '../middlewares/authMiddleware.js'
import { createOrder, getMyOrders, getOrderById, getOrders, orderDeliver, updateOrderPayment } from '../controllers/orderController.js'

const orderRoute = express.Router()


orderRoute.route('/').post(protect, createOrder).get(protect, admin, getOrders)

orderRoute.route('/mine').get(protect, getMyOrders)

orderRoute.route('/:id').get(protect, getOrderById).put(protect, admin, orderDeliver)

orderRoute.route('/:id/pay').put(protect, updateOrderPayment)


export default orderRoute