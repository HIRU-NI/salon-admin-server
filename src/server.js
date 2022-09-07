const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()
const dbConnection = require("./db/connections")

const router = require("./route")
const server = express()

server.use(bodyParser.json())
server.use("/api", router)


const port = process.env.PORT || "8080"

dbConnection()

server.listen(port , () => {
    console.log(`server started on port : ${port}`)
})