import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Video } from "../models/video.model.js"
import { uploadCLoudinary } from "../utils/cloudinary.js"
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


function decodeToken(token) {
    try {
        const parts = token.split('.');
        const payload = Buffer.from(parts[1], 'base64').toString('utf-8');
        const decodedPayload = JSON.parse(payload);
        return decodedPayload;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}


const newVideo = asyncHandler(async (req, res) => {
    try {
        const { thumbnail, title, description, isPublished = true } = req.body

        if (!thumbnail || !title || !description) {
            throw new ApiError(400, "Missing field in newVideo")
        }

        const existed = await Video.findOne({
            $or: [{ thumbnail }, { title }]
        })
        if (existed) {
            throw new ApiError(409, "Video with thumbnail or title exist")
        }


        // VIDEO FILE
        const videoFilePath = req.files.videoFile[0].path;
        if (!videoFilePath) {
            throw new ApiError(400, "video File is required")
        }
        console.log(thumbnail, " --- ", description, " --- ", title, " --- ", videoFilePath)


        const videoFile = await uploadCLoudinary(videoFilePath)
        if (!videoFile) {
            throw new ApiError(400, "video file not uploaded to cloud");
        }


        // DURATION
        const duration = videoFile.duration
        console.log(duration);


        // OWNER
        const accessToken = req.cookies?.accessToken
        const decodedToken = await decodeToken(accessToken);
        const owner = decodedToken._id
        console.log(owner);


        // 
        const video = await Video.create({
            videoFile: videoFile.url,
            thumbnail,
            title,
            description,
            views: 0,
            duration,
            isPublished,
            owner
        })
        console.log(video);
        const createdVideo = await Video.findById(video._id)
        if (!createdVideo) {
            throw new ApiError(500, "Something went wrong while registering video")
        }


        return res.status(201).json(
            new ApiResponse(200, createdVideo, "Video successfully uploaded")
        );
    } catch (error) {
        throw new ApiError(500, "something went wrong while adding new video")
    }
})


const isPublished = asyncHandler(async (req, res) => {
    try {
        const { videoId, isPublished } = req.body;

        const reqVideo = Video.findById(videoId)
        if (!reqVideo) {
            throw new ApiError(400, "required video not found")
        }

        const accessToken = req.cookies?.accessToken
        const decodedToken = await decodeToken(accessToken);
        const userId = decodedToken._id

        const video = await Video.findByIdAndUpdate(
            { _id: videoId, owner: userId },
            {
                $set: {
                    isPublished
                }
            },
            { new: true }
        );
        if (!video) {
            throw new ApiError(406, "video can't be published.")
        }

        console.log(video)
        return res.status(200).json(new ApiResponse(200, video, "Published successfully..."))
    } catch (error) {
        throw new ApiError(401, "Error in publishing video")
    }
})

const viewsCount=asyncHandler(async (req, res)=>{
    
})


export { newVideo, isPublished, viewsCount}