import { type } from "express/lib/response";
import mongoose, { Schema } from "mongoose";

const subscritionSchema=new Schema({
    subscriber:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps:true
})


export const Subsciption=mongoose.model("Subsciption",subscritionSchema)