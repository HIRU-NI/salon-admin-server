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
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: "*",
      
    })
  )
server.options("*", cors())

//routes
const authRouter = require("./routes/authRouter")
const clientRouter = require("./routes/clientRouter")
const reservationRouter = require("./routes/reservationRouter")
const stylistRouter = require("./routes/stylistRouter")
const serviceRouter = require("./routes/serviceRouter")
const userRouter = require("./routes/userRouter")

server.use(authRouter)
server.use("/client", clientRouter)
server.use("/reservation", reservationRouter)
server.use("/stylist", stylistRouter)
server.use("/service", serviceRouter)
server.use("/user", userRouter)
  

//MongoDB database connection
const dbConnection = require("./db/connections")
const port = process.env.PORT || "8080"
dbConnection()

server.listen(port , () => {
    console.log(`server started on port : ${port}`)
})