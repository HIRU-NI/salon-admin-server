const express = require("express")
const stylistController = require("../controller/stylistController")

//authenticate user
const { protect } = require('../middleware/authMiddleware')


const router = express.Router()

router.get("/", protect, stylistController.getAll) 

module.exports = router