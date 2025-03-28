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
    } else {
        res.status(404)
        throw new Error('product not found')
    }

})



// creating new review

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Products.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.userId.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)


        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json({ message: 'review added successfully' })

    }

})


// get top products

const getTopProducts = asyncHandler((async (req, res) => {
    const products = await Products.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
}))


export {
    getAllProducts,
    getProductById,
    createProductReview,
    getTopProducts
}