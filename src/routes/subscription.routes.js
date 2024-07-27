import { subscribe, unSubscribe } from "../controllers/subscription.controller.js"
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/new-subscriber").post(verifyJWT,subscribe)
router.route("/unSubscribe").post(verifyJWT,unSubscribe)


export default router
