const express = require("express")
const clientController = require("../controller/clientController")

//authenticate user
const { protect } = require('../middleware/authMiddleware')


const router = express.Router()

router.get("/", protect, clientController.getAll) 
router.get("/:id", protect, clientController.get)
router.post("/", protect,  clientController.create)
router.put("/:id", protect, clientController.update)
router.delete("/:id", protect, clientController.delete)

module.exports = router