import { newVideo, isPublished, editVideoDesc } from "../controllers/video.controller.js"
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/new-video").post(
    upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    },
]),verifyJWT,newVideo)
router.route("/publish").post(isPublished)
router.route("/edit-video").post(verifyJWT, editVideoDesc)


export default router
