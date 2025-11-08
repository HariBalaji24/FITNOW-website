import express from "express"
import authcontroller from "../controller/authcontroller.js"
const router = express.Router()

router.route("/allclients").get(authcontroller.getclients)
router.route("/userdetails").get(authcontroller.getdetails)

router.route("/signin").post(authcontroller.signin)
router.route("/login").post(authcontroller.login)
router.route("/adddetails").post(authcontroller.adddetails)

export default router