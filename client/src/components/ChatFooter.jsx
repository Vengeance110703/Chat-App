import React, { useState } from "react"

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("")

  const handleSendMessage = event => {
    event.preventDefault()
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      })
    }
    setMessage("")

    socket.emit("typing", "")
  }

  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`)

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  )
}

export default ChatFooter
