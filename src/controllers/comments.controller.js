import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Comments } from "../models/comments.model.js"
import { Video } from "../models/video.model.js"


const createComment = asyncHandler(async (req, res, next) => {
    try {
        const { videoId } = req.body

        const video = await Video.findById(videoId)
        if (!video) {
            throw new ApiError(401, "Video not found")
        }
        const owner = video.owner

        const videoComment = await Comments.findOne({ video: videoId })
        if (videoComment) {
            console.log(owner);
            res.locals.comment = videoComment;
            next()
        }

        const comment = await Comments.create({
            owner,
            video: videoId,
        })

        res.locals.comment = comment;
        next();
    } catch (error) {
        return new ApiError(500, "something went wrong while adding comment");
    }
})

const addComment = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const comment = res.locals.comment;
    if (!message) {
        return res.status(201).json(new ApiResponse(201, { comment }, "Comment added successfully"));
    }
    console.log(req.user)
    const author = req.user?.username
    comment.content.push({ message: message, author })
    await comment.save();

    return res.status(201).json(new ApiResponse(201, { comment }, "Comment added successfully"));
})


export { createComment, addComment }