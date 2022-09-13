const express = require("express")
const serviceController = require("../controller/serviceController")

//authenticate user
const { protect } = require('../middleware/authMiddleware')


const router = express.Router()

router.get("/", protect, serviceController.getAll) 

module.exports = router