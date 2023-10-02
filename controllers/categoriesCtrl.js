import asyncHandler from 'express-async-handler';
import Category from "../models/Category.js";

//@desc Create new category
//@route POST /api/v1/categories
//@access Private/Admin

export const createCategoryCtrl = asyncHandler(async(req,res) => {
    const {name} = req.body;
    
    //checking the category if it's exist
    const categoryFound = await Category.findOne({name})
    if(categoryFound) {
        throw new Error("Category is already Exists");
    }

    //create Category
    const category = await Category.create({
        name: name?.toLowerCase() ,
        user: req.userAuthId,
       
      });


    res.json({
        Status: "Success",
        message: "Category created successfully",
        category
    });
})

//@Get all category
//@route GET /api/v1/categories
//@access Public

export const getCategoryCtrl = asyncHandler(async(req,res) => {
    const categories = await Category.find();

    res.json({
        status:"Success",
        message: "Fetched All Category",
        categories
    })
})

//@Get single category
//@route GET /api/v1/category
//@access Public

export const getSingleCategoryCtrl = asyncHandler(async(req,res) => {

    const category = await Category.findById(req.params.id);

    if(!category) {
        throw new Error("Category doesn't exist")
    }

    res.json({
        status:"Success",
        message: "Fetched Single Category",
        category
    })
})

//@Get update category
//@route GET /api/v1/category/:id
//@access Private

export const updateCategoryCtrl = asyncHandler(async(req,res) => {
    const {name} = req.body

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {name},
        {new:true}
    );
    res.json({
        status: "Success",
        message: "Update the category successfully",
        category
    })

})

//@Get delete category
//@route DELETE /api/v1/category/:id/delete
//@access Private

export const deleteProductCtrl = asyncHandler(async(req,res) => {
    const category =await Category.findByIdAndDelete(req.params.id)

    if(!category) {
        throw new Error("Category doesn't exist")
    }

    res.json({
        status: "Success",
        message: "Delete Category Successfully",
        category
    })
})