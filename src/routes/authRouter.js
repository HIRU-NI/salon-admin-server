const express = require("express")
const router = express.Router()

const authController = require("../controller/authController")

router.post("/add-user", authController.addUser)
router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/validateToken", authController.validateToken)
router.get("/logout", authController.logout);


module.exports = router