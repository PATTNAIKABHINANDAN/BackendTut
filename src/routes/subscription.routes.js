import { subscribe } from "../controllers/subscription.controller.js"
import { Router } from "express";
const router = Router()

router.route("/new-subscriber").post(subscribe)


export default router
