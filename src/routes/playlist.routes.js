import { deletePlaylist, playlistAdd } from "../controllers/playlist.controller.js"
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/add-playlist").post(verifyJWT, playlistAdd)
router.route("/delete-playlist").post(verifyJWT, deletePlaylist)


export default router
