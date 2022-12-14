const express = require("express")
const userController = require("../controller/userController")

//authenticate user
const { protect } = require('../middleware/authMiddleware')


const router = express.Router()

router.get("/", protect, userController.getAll) 
router.put("/:id", protect, userController.updateUser) 
router.post("/:id", protect, userController.reset) 

module.exports = router