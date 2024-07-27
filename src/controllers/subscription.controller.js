import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Subsciption } from "../models/subscription.model.js"

const subscribe = asyncHandler(async (req, res) => {
    try {
        const { channel } = req.body;
        if (!channel) {
            throw new ApiError(400, `channel is required`);
        }

        const subscriber = req.user?._id

        const subscriber_channel = `${subscriber}_${channel}`;
        const existSubscription = await Subsciption.findById(subscriber_channel);
        if (existSubscription) { throw new ApiError(400, "Already subscription Exist") }
        const subscription = await Subsciption.create({
            _id: subscriber_channel,
            subscriber: subscriber,
            channel: channel
        });

        console.log(subscriber, " --- ", channel);
        const createdSubscription = await Subsciption.findById(subscription._id);

        console.log("subsciption --- ", createdSubscription);
        if (!createdSubscription) throw new ApiError(500, "Something went wrong while subscribing")



        return res.status(200).json(
            new ApiResponse(200, subscription, "Subscription successfully registered")
        );
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Internal server error")
    }
})

const unSubscribe = asyncHandler(async (req, res) => {
    const { videoId } = req.body;

    const user = req.user?._id
    const deletedSubscription = await Subsciption.deleteOne({
        subscriber: user,
        channel: videoId
    });

    return res.status(200).json(new ApiResponse(200, deletedSubscription, "Subscription successfully deleted"))
})

export { subscribe, unSubscribe }