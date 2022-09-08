const express = require("express")
const reservationController = require("../controller/reservationController")

const router = express.Router()

router.get("/", (req, res) => {
    reservationController.getAll(req, res)
}) 

router.get("/:id", (req, res) => {
    reservationController.get(req, res)
})

router.post("/", (req, res) => {
    reservationController.create(req, res)
})

router.put("/:id", (req, res) => {
    reservationController.update(req, res)
})

router.delete("/:id", (req, res) => {
    reservationController.delete(req, res)
})

module.exports = router