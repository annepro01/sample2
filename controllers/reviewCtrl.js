import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

//@desc Create new Review
//@route POST /api/v1/Reviews
//@access Private/Admin

export const createReviewCtrl = asyncHandler(async(req,res) => {
    //get the data in the postman
    const {product,message,rating} = req.body

   //find the productID
    // console.log(req.params)
    const {productID} = req.params

    //the product details
    const productFound = await Product.findById(productID).populate("reviews");
    console.log(productFound)

    if(!productFound) {
        throw new Error("Product doesn't exist")
    }

     const hasReviewed = productFound?.reviews?.find((review)=> {
        return review?.user?.toString() === req?.userAuthId?.toString()
     })

     if(hasReviewed) {
        throw new Error("You have already review this product")
     }

    //create review
    const review =await Review.create(
        {
            message,
            rating,
            product: productFound?._id,
            user: req.userAuthId,
        }
    )

    //after creating review it should be PUSH IN THE PRODUCT
    productFound.reviews.push(review?.id);    
    
    //the re save
    await productFound.save();

    res.status(201).json({
        success: true,
        message: "Review Successfully Created"
    })
})