import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ColorSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        image:{
            type: String,
            //static file
            default: "https://picsum.photos/200/300",
            required: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        
    },
    {timestamps:true}
);

const Color = mongoose.model("Color",ColorSchema);

export default Color