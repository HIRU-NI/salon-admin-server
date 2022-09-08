const express = require("express")
const reservationController = require("../controller/reservationController")

const router = express.Router()

router.get("/", reservationController.getAll) 
router.get("/:id", reservationController.get)
router.post("/", reservationController.create)
router.put("/:id", reservationController.update)
router.delete("/:id", reservationController.delete)

module.exports = router