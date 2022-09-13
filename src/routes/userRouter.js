const express = require("express")
const userController = require("../controller/userController")

//authenticate user
const { protect } = require('../middleware/authMiddleware')


const router = express.Router()

router.get("/", protect, userController.getAll) 

module.exports = router