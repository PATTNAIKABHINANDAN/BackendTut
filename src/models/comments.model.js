import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    content: [{
        message: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        }
    }],
}, { timestamps: true });

export const Comments = mongoose.model("Comments", commentSchema);