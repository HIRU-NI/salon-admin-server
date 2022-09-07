const express = require("express")
const clientController = require("../controller/clientController")

const router = express.Router()

//client routers
router.get("/client", (req, res) => {
    clientController.getAll(req, res)
})

router.get("/client/:id", (req, res) => {
    clientController.get(req, res)
})

router.post("/client", (req, res) => {
    clientController.create(req, res)
})

router.put("/client/:id", (req, res) => {
    clientController.update(req, res)
})

router.delete("/client/:id", (req, res) => {
    clientController.delete(req, res)
})

module.exports = router