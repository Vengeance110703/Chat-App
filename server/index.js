import express from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"

const app = express()
const PORT = 4000
const server = http.createServer(app)

let users = []

app.use(cors())

const io = new Server(server, {
  cors: {
    origin: /^http:\/\/localhost:\d+$/,
  },
})

io.on("connection", socket => {
  console.log(`${socket.id} user just connected`)

  socket.on("disconnect", () => {
    console.log("user disconnected")
    users = users.filter(user => user.socketID !== socket.id)
    io.emit("newUserResponse", users)
    console.log(users)
    socket.disconnect()
  })

  socket.on("message", data => {
    io.emit("messageResponse", data)
  })

  socket.on("newUser", data => {
    users.push(data)
    io.emit("newUserResponse", users)
    console.log(users)
  })

  socket.on("typing", data => socket.broadcast.emit("typingResponse", data))
})

app.get("/api", (req, res) => {
  res.json({
    message: "Hello World",
  })
})

server.listen(PORT, () => console.log(`Server listening on ${PORT}`))
