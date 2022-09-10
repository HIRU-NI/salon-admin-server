const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

require("dotenv").config()

//create server
const server = express()
server.use(bodyParser.json())

server.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ["GET", "POST"],
      allowedHeaders: "*",
      
    })
  )
server.options("*", cors())

//routes
const authRouter = require("./routes/authRouter")
const clientRouter = require("./routes/clientRouter")
const reservationRouter = require("./routes/reservationRouter")

server.use(authRouter)
server.use("/client", clientRouter)
server.use("/reservation", reservationRouter)
  

//MongoDB database connection
const dbConnection = require("./db/connections")
const port = process.env.PORT || "8080"
dbConnection()

server.listen(port , () => {
    console.log(`server started on port : ${port}`)
})