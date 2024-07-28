import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Playlist } from "../models/playlist.model.js"


const playlistAdd = asyncHandler(async (req, res) => {
    try {
        const { videoId, playlistName, description } = req.body

    const owner = req.user?._id
    const ownerName = req.user?.username


    let playlistExist = await Playlist.findOne({
        owner: '669cbe9db19b5ce916a0ef3e',
        name: 'abhina_playlist'
    });

    console.log(playlistExist);

    if (playlistExist) {
        const targetName = playlistName !== undefined ? playlistName : playlistExist.name;
        playlistExist.name = targetName

        const targetDesc = description !== undefined ? description : playlistExist.description;
        playlistExist.description = targetDesc

        if (videoId) {
            playlistExist.video.push({
                _id: videoId,
                video: videoId
            })
        }

        await playlistExist.save({ validateBeforeSave: false })
    }
    else {
        const playlist = {}
        playlist.owner = owner
        playlist.video = []
        if (videoId) {
            playlist.video.push(
                {
                    _id: videoId,
                    video: videoId
                }
            )
        }
        if (!playlistName) {
            let name = `${ownerName}_playlist`
            playlist.name = name;
        }
        else {
            playlist.name = name;
        }

        if (description) {
            playlist.description = description;
        }
        playlistExist = await Playlist.create(
            playlist
        )
    }

    return res.status(200).json(new ApiResponse(200, playlistExist, "Published successfully..."));
    } catch (error) {
        throw new ApiError(500, "something wen wrong while adding playlist")
    }
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.body

    const owner = req.user?._id
    const playlist = await Playlist.findByIdAndDelete(
        playlistId, { owner: owner }
    )

    return res.status(200).json(new ApiResponse(200, playlist, "Deleted successfully..."));
})

export { playlistAdd, deletePlaylist }