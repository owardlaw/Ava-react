import "./App.css";
import React, { useState, useRef } from "react";
import { FaConnectdevelop } from "react-icons/fa6";
import { GoCommandPalette } from "react-icons/go";
import Modal from "./Modal";
import { store } from "./store";

import "./EditableDiv";

function App() {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  const divRef = useRef(null);
  const messageListRef = useRef(null);

  const handleFocus = () => {
    if (!content.trim()) {
      setContent("");
    }
  };

  const handleBlur = () => {
    if (!content.trim()) {
      setContent("");
    }
  };

  const handleInput = () => {
    setContent(divRef.current.textContent);
  };

  const clear = () => {
    console.log(content);
    setContent("");
    divRef.current.textContent = "";
  };

  const handlePost = async () => {
    // Store user's message in the messages array
    scrollToBottom();

    setMessages([...messages, { type: "user", text: content }]);

    try {
      const response = await fetch("https://api.automata.blue/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      clear();

      const data = await response.json();

      // Store the response in the messages array
      setMessages([
        ...messages,
        { type: "user", text: content },
        { type: "bot", text: data.message },
      ]);

      scrollToBottom();

    } catch (error) {
      console.error("Error:", error);
    }
  };



  const handleKeyDown = async (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      await handlePost();
    }
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 1000;
    }
  };

  return (
    <div className="App">
      <Modal />
      <div className="container">
        <div className="chat-container">
          <div className="title">
            <FaConnectdevelop size={45} />
            <h1>GPT Clone</h1>
          </div>

          <div className="message-list" ref={messageListRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="message-container">
            <div
              ref={divRef}
              className={`input-div ${!content.trim() && "empty"}`}
              contentEditable={true}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              data-placeholder="Write a message here..."
            ></div>

            <button onClick={handlePost}>
              <GoCommandPalette size={20} className="AiFillThunderbolt" />
            </button>
      
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
