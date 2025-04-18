import express from 'express'

const userRoute = express.Router()

import { authUser, deleteUser, getUserById, getUsers, registerUser, updateUser, updateUserProfile, userLogoutHandler } from '../controllers/userController.js'
import { getAllProducts } from '../controllers/productsController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'


userRoute.post('/', authUser)
userRoute.post('/register', registerUser)

userRoute.get('/getProducts', getAllProducts)

userRoute.route('/updateProfile').put(protect, updateUserProfile)

userRoute.get('/getAllUsers', protect, admin, getUsers)

userRoute.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

userRoute.get('/logout', protect, userLogoutHandler)


export default userRoute