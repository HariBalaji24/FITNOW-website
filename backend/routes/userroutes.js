import express from "express"
import authcontroller from "../controller/authcontroller.js"
import workoutcontoller from "../controller/workoutcontoller.js"

const router = express.Router()

router.route("/allclients").get(authcontroller.getclients)
router.route("/google").get(authcontroller.googlelogin)
router.route("/getid").get(authcontroller.getid)

router.route("/signin").post(authcontroller.signin)
router.route("/login").post(authcontroller.login)
router.route("/adddetails").post(authcontroller.adddetails)

router.route("/workout-plan").post(workoutcontoller.workoutrecommend)
router.route("/userdetails/:user_id").get(workoutcontoller.userdetails)
router.route("/getworkouts/:user_id").get(workoutcontoller.getallworkouts)

export default router