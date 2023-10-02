import asyncHandler from 'express-async-handler';
import Brand from '../models/Brand.js';


//@desc Create new brand
//@route POST /api/v1/brands
//@access Private/Admin

export const createBrandCtrl = asyncHandler(async(req,res) => {
    const {name} = req.body

    //checking the brands if it's exists

    const brandFound = await Brand.findOne({name});

    if(brandFound) {
        throw new Error("Brand already exist")
    }

    //create Brand

    const brand = await Brand.create(
        {
            name: name?.toLowerCase(),
            user: req.userAuthId,
        }
    )
    res.json({
        status:"Success",
        message:"Create Brand Successfully",
        brand
    })

})

//@Get all brands
//@route GET /api/v1/brands
//@access Public

export const getAllBrandCtrl = asyncHandler(async(req,res) => {
    const brands = await Brand.find();
    
    res.json({
        status: "Success",
        message: "Fetch All Brands",
        brands
    })
})




export const getSingleBrandCtrl = asyncHandler(async(req,res) => {

    //checking the brand if it's exist
    const brand = await Brand.findById(req.params.id);

    if(!brand){
        throw new Error("Brand doesn't exist")
    }

    res.json({
        status: "Success",
        message: "Fetch Single Brand",
        brand
    })

})

//@Get update brand
//@route GET /api/v1/brand/:id
//@access Private

export const updateBrandCtrl = asyncHandler(async(req,res) => {
    //get the name/data in the postman
    const {name} = req.body;

    //get the id in the postman
    const brand = await Brand.findByIdAndUpdate(
        req.params.id,
         {
            name,
            new:true   
         },
    )
    if(!brand) {
        throw new Error("Brand doesn't exists")
    }

    res.json({
        status: "Success",
        message: "Updated the brand successfully",
        brand
    })
})


//@Get delete brand
//@route DELETE /api/v1/brand/:id/delete
//@access Private


export const deleteBrandCtrl = asyncHandler(async(req,res) => {
    //get the id from postman
    const brand = await Brand.findByIdAndDelete(req.params.id)

    if(!brand) {
        throw new Error("Brand doesn't Exists")
    }

    res.json({
        status: "Success",
        message: "Delete the brand Successfully",
        brand
    })
})