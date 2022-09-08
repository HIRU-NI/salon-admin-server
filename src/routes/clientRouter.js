const express = require("express")
const clientController = require("../controller/clientController")

const router = express.Router()

router.get("/", (req, res) => {
    clientController.getAll(req, res)
}) 

router.get("/:id", (req, res) => {
    clientController.get(req, res)
})

router.post("/", (req, res) => {
    clientController.create(req, res)
})

router.put("/:id", (req, res) => {
    clientController.update(req, res)
})

router.delete("/:id", (req, res) => {
    clientController.delete(req, res)
})

module.exports = router