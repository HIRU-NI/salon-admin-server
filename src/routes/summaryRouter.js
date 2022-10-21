const express = require("express")
const summaryController = require("../controller/summaryController")

//authenticate user
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get("/status", protect, summaryController.getStatusSummary)
router.get("/allocations", protect, summaryController.getCurrentWeekAllocations)

module.exports = router
