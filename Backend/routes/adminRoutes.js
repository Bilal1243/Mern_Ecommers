import express from 'express'
import { protect, admin } from '../middlewares/authMiddleware.js'
import { productParser } from '../config/uploads.js'
import { addProduct, getAllProducts, getProductById, updateProduct } from '../controllers/adminController.js'

const adminRoute = express.Router()


adminRoute.post('/addProduct', protect, admin, productParser.single('productImg'), addProduct)

adminRoute.get('/getProducts', protect, admin, getAllProducts)

adminRoute.get('/getProductById', protect, admin, getProductById)

adminRoute.patch('/updateProduct/:id', protect, admin, productParser.single('productImg'), updateProduct)



export default adminRoute