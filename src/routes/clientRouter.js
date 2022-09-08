const express = require("express")
const clientController = require("../controller/clientController")

const router = express.Router()

router.get("/", clientController.getAll) 
router.get("/:id", clientController.get)
router.post("/",  clientController.create)
router.put("/:id", clientController.update)
router.delete("/:id", clientController.delete)

module.exports = router