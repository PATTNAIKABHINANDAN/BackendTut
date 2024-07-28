import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String
    },
    video: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                unique: true
            },
            video: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video',
                required: true,
                unique: true
            },
            addedOn: {
                type: Date,
                default: Date.now
            }
        }
    ],
}, {
    timestamps: true
})

export const Playlist = mongoose.model("Playlist", playlistSchema)
