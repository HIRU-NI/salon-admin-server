const express = require("express")
const reservationController = require("../controller/reservationController")

//authenticate user
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get("/", protect, reservationController.getAll) 
router.get("/:id", protect, reservationController.get)
router.post("/", protect, reservationController.create)
router.put("/:id", protect, reservationController.update)
router.delete("/:id", protect, reservationController.delete)
router.get("/summery/count", protect, reservationController.getCount)

module.exports = router