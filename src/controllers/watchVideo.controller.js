import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { Video } from "../models/video.model.js"
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());



const addWatchHistory = asyncHandler(async (req, res) => {
    try {
        const { videoId } = req.body

        const owner = req.user?._id
        
        const watchHistory = await User?.findByIdAndUpdate(
            owner,
            {
                $push: {
                    watchHistory: { video: videoId }
                }
            },
            { new: true }
        );
        
        const video = await Video?.findByIdAndUpdate(
            videoId,
            {
                $inc: { views: 1 }
            },
            { new: true }
        );
        console.log(owner,"----",videoId)
        
        return res.status(200).json(new ApiResponse(200, { watchHistory, video }, "Published successfully..."));
    } catch (error) {
        throw new ApiError(500, `something went wrong while adding watch History : `)
    }
})


export {addWatchHistory};