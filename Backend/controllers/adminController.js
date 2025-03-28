import Users from '../model/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import Products from '../model/productModel.js'


const getAllUsers = asyncHandler(async (req, res) => {

    const users = await Users.find({ isAdmin: false })

    res.json(users)
})


const addProduct = asyncHandler(async (req, res) => {

    const { productName, brand, og_price, stock, description , category } = req.body
    let productImg = req.file ? req.file.path : null

    const product = await Products.create({
        productName,
        brand,
        price: og_price,
        stock,
        description,
        productImage: productImg,
        category
    })

    if (product) {
        res.status(201).json(product)
    }


})


const getAllProducts = asyncHandler(async (req, res) => {
    let products = await Products.find()
    res.json(products)
})


const getProductById = asyncHandler(async (req, res) => {


    let product = await Products.findById(req.query.id)

    res.json(product)

})


const updateProduct = asyncHandler(async (req, res) => {

    const { productName, brand, og_price, stock, description , category } = req.body

    let product = await Products.findOne({ _id: req.params.id })

    if (product) {
        product.productName = productName || product.productName
        product.brand = brand || product.brand
        product.price = og_price || product.price
        product.stock = stock || product.stock
        product.description = description || product.description
        product.productImage = req.file ? req.file.path : product.productImage
        product.category = category || product.category

        const updateProduct = await product.save()

        res.json(updateProduct)

    }
    else {
        res.status(404)
        throw new Error('product not found')
    }

})


export {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct
}