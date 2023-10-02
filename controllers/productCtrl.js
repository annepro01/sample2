import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Category from '../models/Category.js';


//@desc Create new product
//@route POST /api/v1/products
//@access Private/Admin

export const createProductCtrl = asyncHandler(async(req,res) => {
    // console.log(req.files)
    const {name,description,category,sizes,colors,user,price,totalQty,brand} = req.body
    const convertedImgs = req.files.map(file => file.path)
    //check if product is exists
    const productExists = await Product.findOne({name})
    if(productExists) {
        throw new Error ('This is already Exists')
    }

    //find the category 
    const categoryFound = await Category.findOne({name:category,});

    if(!categoryFound) {
        throw new Error("Category doesn't exist, First please check/ create the category")
    }
    const product = await Product.create({
        name: name?.toLowerCase(),
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,totalQty,
        brand   
    });
    //push the product according to a category
    categoryFound.products.push(product._id);

    //reave
    await categoryFound.save();

    res.status(201).json({
        status: "Success",
        msg: "Product created Successfully",
        product,
        images: convertedImgs
    })

})



//encounter error res.json is not a function ( the req,res can't be interchange )
//@Get all products
//@route GET /api/v1/products
//@access Public
export const getProductsCtrl = asyncHandler(async(req,res) => {

    //get the string in postman
    // console.log(req.query)
    let productQuery = Product.find();
    
    //search by name the string is from postman
    if(req.query.name) {
        productQuery = productQuery.find({
            name:{$regex: req.query.name, $options: 'i'},
        })
    }

    //search by BRAND the string is from postman
    if(req.query.brand) {
        productQuery = productQuery.find({
            brand:{$regex: req.query.brand, $options: 'i'},
        })
    }

    //search by CATEGORY the string is from postman
    if(req.query.category) {
        productQuery = productQuery.find({
            category:{$regex: req.query.category, $options: 'i'},
        })
    }

    //search by COLOR the string is from postman
    if(req.query.color) {
        productQuery = productQuery.find({
            colors:{$regex: req.query.color, $options: 'i'},
        })
    }
    
    //search by COLOR the string is from postman
    if(req.query.size) {
        productQuery = productQuery.find({
            size:{$regex: req.query.size, $options: 'i'},
        })
    }

    if(req.query.price) {
        const priceRange = req.query.price.split('-');
        productQuery = productQuery.find({
            price: {$gte: priceRange[0],$lte: priceRange[1] }
        })
    }

    //pagination

    //page
    const page = parseInt(req.query.page) ?  parseInt(req.query.page) : 1;
    //limit
    const limit = parseInt(req.query.limit) ?  parseInt(req.query.limit) : 10;
    //startIndex
    const startIndex = (page - 1) * limit;
    //endIndex
    const endIndex = page * limit; 
    //total
    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    //pagination result
    const pagination = {};
    if(endIndex < total) {
        pagination.next = {
            page: page+1,
            limit,
        };
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page-1,
            limit
        };
    }
    //await the query
    const products = await productQuery.populate("reviews")

    res.json({
        status: "Success",
        total,
        results: products.length,
        pagination,
        message: 'Products fetched successfully',
        products,
    })
});

//@Get single products
//@route GET /api/v1/products/:id
//@access Public

export const getSingleProductCtrl = asyncHandler(async(req,res) => {
    const product =await Product.findById(req.params.id);
    if(!product){
        throw new Error("Product not found")
    }
    res.json({
        status: "Success",
        message: "Fetched Successfully",
        product,
    })
})

//@Get update product
//@route GET /api/v1/products/:id
//@access Private

export const updateProductCtrl = asyncHandler(async(req,res) => {
    //destructure
    const {name,description,category,sizes,colors,user,price,totalQty,brand} = req.body

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name,description,category,sizes,colors,user,price,totalQty,brand
    },{
        new:true
    })
    res.json({
        status: "Success",
        message: "Update Product Successfully",
        product,
    })
})

//@Get delete product
//@route DELETE /api/v1/products/:id/delete
//@access Private

export const deleteProductCtrl = asyncHandler(async(req,res) => {
    const product = await Product.findByIdAndDelete(req.params.id) 
    if(!product) {
        throw new Error('Product is not exists')
    }
    
    res.json({
        status: "Success",
        message: "Delete Product Successfully",
        product,
    })
})