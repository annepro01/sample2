import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

//@desc Create new coupon
//@route POST /api/v1/coupon
//@access Private/Admin

export const createCouponCtrl = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  console.log(req.body);
  //check if admin
  //check if coupon already exists
  const couponsExists = await Coupon.findOne({
    code,
  });
  if (couponsExists) {
    throw new Error("Coupon already exists");
  }
  //check if discount is a number
  if (isNaN(discount)) {
    throw new Error("Discount value must be a number");
  }
  //create coupon
  const coupon = await Coupon.create({
    code: code?.toUpperCase(),
    startDate,
    endDate,
    discount,
    user: req.userAuthId,
  });
  //send the response
  res.status(201).json({
    status: "success",
    message: "Coupon created successfully",
    coupon,
  });
});

// @desc    Get all coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin

export const getAllCouponsCtrl = asyncHandler(async(req,res) =>{
    const coupon = await Coupon.find()

    res.json({
        status:"Success",
        message: "Fetched All Coupons",
        coupon
    })
})

// @desc    Get single coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin

export const getSingleCouponCtrl = asyncHandler(async(req,res) => {
    const coupon = await Coupon.findById(req.params.id)
    res.json({
        status: "Success",
        message: "Coupon Fetched",
        coupon
    })
})

// @desc    UPDATE coupon
// @route   PUT /api/v1/coupons
// @access  Private/Admin

export const UpdateCouponCtrl = asyncHandler(async(req,res) => {
    const { code, startDate, endDate, discount } = req.body;
    const coupon = await Coupon.findByIdAndUpdate(req.params.id,
        {
            code: code?.toUpperCase(),
            startDate,
            endDate,
            discount
        }, 
        {
            new:true
        }
        )

        if(!coupon){
            throw new Error("coupons doesn't exists")
        }
       
         res.json({
        status: "Success",
        message: "Coupon Updated",
        coupon
    })
})

// @desc    UPDATE coupon
// @route   PUT /api/v1/coupons
// @access  Private/Admin

export const deleteCouponCtrl = asyncHandler(async(req,res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if(!coupon){
        throw new Error("Coupon doens't exists")
    }
    res.json({
        status: "Success",
        message: "Coupon Delete",
        coupon
    })

})