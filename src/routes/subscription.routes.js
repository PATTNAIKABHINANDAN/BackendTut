import { subscribe, unSubscribe } from "../controllers/subscription.controller.js"
import { Router } from "express";
const router = Router()

router.route("/new-subscriber").post(subscribe)
router.route("/unSubscribe").post(unSubscribe)


export default router
