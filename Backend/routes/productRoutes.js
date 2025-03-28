import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createProductReview, getProductById, getTopProducts } from "../controllers/productsController.js";

const productRoute = express.Router()


productRoute.get('/product/:id', protect, getProductById)

productRoute.post('/:id/reviews', protect, createProductReview)
productRoute.get('/top', protect, getTopProducts)


export default productRoute