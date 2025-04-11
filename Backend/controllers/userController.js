import Users from '../model/userModel.js'
import bcrypt from 'bcrypt'
import asyncHandler from '../middlewares/asyncHandler.js'
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, mobileNumber, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const bcryptedPassword = await bcrypt.hash(password, salt)

    const userExists = await Users.findOne({ email: email })

    if (userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    const user = await Users.create({
        name,
        email,
        mobileNumber,
        password: bcryptedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await Users.findOne({ email })

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(400)
        throw new Error('user not found')
    }

})


const updateUserProfile = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    const user = await Users.findById(req.user._id)


    const salt = await bcrypt.genSalt(10)
    const bcryptedPassword = await bcrypt.hash(password, salt)

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        if (password) {
            user.password = bcryptedPassword
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    }
    else {
        res.status(404)
        throw new Error('user not found')
    }

})


const userLogoutHandler = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
})



export { registerUser, authUser, updateUserProfile, userLogoutHandler }