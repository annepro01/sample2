import asyncHandler from "express-async-handler";
import Color from "../models/Color.js";



//@desc Create new color
//@route POST /api/v1/colors
//@access Private/Admin

export const createColorCtrl = asyncHandler(async(req,res) => {
    //get the req from the postman
    const {name} = req.body

    const colorFound =await Color.findOne({name});
    if(colorFound) {
        throw new Error("Color is already exists")
    }

    const color = Color.create({
        name: name?.toLowerCase(),
        user: req.userAuthId
    })

    res.json({
        status:"Success",
        message: "Create Color Successfully",
        color
    })
})

//@Get all colors
//@route GET /api/v1/colors
//@access Public

export const getAllColorsCtrl = asyncHandler(async(req,res)=> {
    const color = await Color.find();

    res.json({
        status: "Success",
        message: "Fetch All Colors",
        color
    })
})

//@Get single color
//@route GET /api/v1/color
//@access Public

export const getSingleColorCtrl = asyncHandler(async(req,res) => {
    //get the id from postman
    const color = await Color.findById(req.params.id)

    if(!color) {
        throw new Error("Color doesn't exist")
    }
    res.json({
        status: "Success",
        message: "Fetched Single Color",
        color
    })

})

//@Get update color
//@route GET /api/v1/color/:id
//@access Private

export const updateColorCtrl = asyncHandler(async(req,res) => {
    //get the request data from postman
    const {name} = req.body

    //get the id from postman
    const color =await Color.findByIdAndUpdate(
        req.params.id,
            {
                name: name?.toLowerCase(),
                new:true
            }
        )

    if(!color){
        throw new Error("Color doesn't exists")
    }
    res.json({
        status: "Success",
        message: "Update Color Successfully",
        color
    })
})

//@Get delete color
//@route DELETE /api/v1/brand/:id/delete
//@access Private

export const deleteColorCtrl = asyncHandler(async(req,res) => {

    //get the id from postman
    const color = await Color.findByIdAndDelete(req.params.id)

    if(!color) {
        throw new Error("Color doesn't exists")
    }
    res.json({
        status: "Success",
        message: "Deleted Color Successfully",
        color
    })
})
