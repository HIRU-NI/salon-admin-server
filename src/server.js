const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()
const dbConnection = require("./db/connections")

const clientRouter = require("./routes/clientRouter")
const reservationRouter = require("./routes/reservationRouter")

const server = express()

server.use(bodyParser.json())
server.use("/client", clientRouter)


const port = process.env.PORT || "8080"

dbConnection()

server.listen(port , () => {
    console.log(`server started on port : ${port}`)
})