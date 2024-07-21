import mongoose, { Schema } from "mongoose";

const subscritionSchema=new Schema({
    _id: {
        type: String,
        required: true
    },
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