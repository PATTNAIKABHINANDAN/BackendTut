import { addComment, createComment } from "../controllers/comments.controller.js"
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/add-comments").post(verifyJWT, createComment, addComment)


export default router
