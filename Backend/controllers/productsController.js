import Products from '../model/productModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const getAllProducts = asyncHandler(async (req, res) => {
    let products = await Products.find()
    res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
    let { id } = req.params
    let product = await Products.findById(id)

    if (product) {
        return res.json(product)
    } 
    return res.status(404).json({ message: 'Product not found' })
})

// Creating new review
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Products.findById(req.params.id)

    if (!product) {
        return res.status(404).json({ message: 'Product not found' })
    }

    const alreadyReviewed = product.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' })
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        userId: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()

    return res.status(201).json({ message: 'Review added successfully' })
})

// Get top products
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Products.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
})

export {
    getAllProducts,
    getProductById,
    createProductReview,
    getTopProducts
}
