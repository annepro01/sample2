import User from '../models/User.js';
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'
import {getTokenFrmHeader} from '../utils/getTokenFrmHeaders.js'
import {verifyToken} from '../utils/verifyToken.js'
//@desc Register user
//@route POST /api/v1/user/register
//@access Private/Admin

export const registerUserController = asyncHandler(async (req,res) => {
    //---this is just testing to postman-----
    // res.json({
    //     msg:'User Register Controller'
    // })

    //Check the user exist
    const {fullname,email,password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists) {
        //throw
        throw new Error("User Already Exists")
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt);

    //create a user 
    const user = await User.create({
        fullname, email, password: hashPassword,
    });
    res.status(201).json({
        status: 'Success',
        msg: 'User Register Successfully',
        data: user,
       
    }); 
}
)
//@desc Login user
//@route POST /api/v1/user/login
//@access Public

export const loginUserCtrl = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    //find user in DB by email only

    const userFound = await User.findOne({email})

    if (userFound && (await bcrypt.compare(password, userFound?.password))){
        res.json({
            status: 'success',
            msg: 'User Login Successfully',
            userFound,
            token: generateToken (userFound?._id)
          })
       
    } else {
        
          throw new Error('Invalid')
    }
    
});

//@desc Get user profile
//@route GET /api/v1/user/profile
//@access Private

export const getUserProfile = asyncHandler(async (req,res) => {
    //get user ID
    const user = await User.findById(req.userAuthId).populate
    //make sure the the name should same as the model
    ("orders");
    res.json({
        status:"Success",
        message: "User Profile Fetched",
        user
    })
})



//@desc Update user shipping address
//@route PUT /api/v1/user/update/shipping
//@access Private

export const updateShippingAddressCtrl = asyncHandler(async(req,res) => {

    const {firstName,lastName,address,city,postalCode,province,country,phone} = req.body

    const user = await User.findByIdAndUpdate(req.userAuthId,
    {
        shippingAddress:
        { firstName,lastName,address,city,postalCode,province,country,phone },
        hasShippingAddress:true, 
    },
    {
        new:true
    }
    );
    res.json({
        success:true,
        message: "User Shipping Address Updated Successfully",
        user,

    })
})