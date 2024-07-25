import { newVideo, isPublished } from "../controllers/video.controller.js"
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()


router.route("/new-video").post(
    upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    },
]),newVideo)
router.route("/publish").post(isPublished)


export default router
