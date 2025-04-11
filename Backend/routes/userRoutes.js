import express from 'express'

const userRoute = express.Router()

import { authUser, registerUser, updateUserProfile, userLogoutHandler } from '../controllers/userController.js'
import { getAllProducts } from '../controllers/productsController.js'
import { protect } from '../middlewares/authMiddleware.js'


userRoute.post('/', authUser)
userRoute.post('/register', registerUser)

userRoute.get('/getProducts', getAllProducts)

userRoute.route('/updateProfile').put(protect, updateUserProfile)

userRoute.get('/logout', protect, userLogoutHandler)


export default userRoute