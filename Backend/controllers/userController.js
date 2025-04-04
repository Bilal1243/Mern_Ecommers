import Users from '../model/userModel.js'
import bcrypt from 'bcrypt'
import asyncHandler from '../middlewares/asyncHandler.js'
import jwt from 'jsonwebtoken'


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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

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


const userLogoutHandler = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
})



export { registerUser, authUser, userLogoutHandler }