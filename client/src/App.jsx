import React, { useState } from "react"
import { io } from "socket.io-client"
import Home from "./components/Home"
import ChatPage from "./components/ChatPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const socket = io("http://localhost:4000")

const App = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<ChatPage socket={socket}></ChatPage>} />
      </Routes>
    </div>
  </BrowserRouter>
)

export default App
