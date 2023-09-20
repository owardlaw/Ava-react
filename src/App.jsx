import "./App.css";
import React, { useRef, useState } from "react";
import { FaConnectdevelop } from "react-icons/fa6";
import { GoCommandPalette } from "react-icons/go";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { setContent, addMessage, setMessages } from "./chatSlice";
import axios from "axios";
import Button from "@mui/material/Button";
import Hamburger from "hamburger-react";
import PopOutMenu from "./PopOutMenu";

import "./EditableDiv";

function App() {
  const dispatch = useDispatch();

  const content = useSelector((state) => state.chat.content);
  const messages = useSelector((state) => state.chat.messages);
  const [isOpen, setOpen] = useState(false);
  const [persona, setPersona] = useState("");

  const divRef = useRef(null);
  const personaRef = useRef(null);

  const messageListRef = useRef(null);

  const handleFocus = () => {
    if (!content.trim()) {
      dispatch(setContent(""));
    }
  };

  const handleBlur = () => {
    if (!content.trim()) {
      dispatch(setContent(""));
    }
  };

  const handleInput = () => {
    dispatch(setContent(divRef.current.textContent)); // Use dispatch here
  };

  const clear = () => {
    dispatch(setContent(""));
    divRef.current.textContent = "";
    dispatch(setMessages([]));
  };

  const handlePost = async () => {
    // Store user's message in the messages array
    scrollToBottom();

    dispatch(addMessage({ type: "user", text: content }));

    divRef.current.textContent = "";

    try {
      const response = await axios.post(
        "https://api.automata.blue/persona",
        {
          message: content,
          persona: persona,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // Store the response in the messages array
      dispatch(addMessage({ type: "bot", text: data.message }));

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
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 1000;
    }
  };

  const updatePersona = () => {
    console.log(personaRef.current.textContent);
    setPersona(personaRef.current.textContent);
  };

  return (
    <div className="App">
      <Modal />
      <div className="hamburger">
        <div id="hamburg">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        {isOpen && <PopOutMenu clear={clear} className="popout" />}
      </div>

      <div className="container">
        <div className="chat-container">
          <div className="title">
            <div className="title__container">
              <FaConnectdevelop size={45} />
              <h1>GPT Clone</h1>
            </div>
            <div
              id="persona-input"
              ref={personaRef}
              className={"input-div"}
              contentEditable={true}
              onInput={updatePersona}
              data-placeholder="Write a persona here: Your name is Jake from state farm and..."
            ></div>
          </div>



          <div className="message-list" ref={messageListRef}>
            {messages.map((message, index) => (
              <p
                key={index}
                id="chat"
                className={`${message.type}`}
              > {message.text}</p>
            ))}
          </div>

          <div className="message-container">
            <div
              id="message-input"
              ref={divRef}
              className={`input-div ${!content.trim() && "empty"}`}
              contentEditable={true}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              data-placeholder="Write a message here..."
            ></div>

            <Button onClick={handlePost}>
              <GoCommandPalette size={20} className="AiFillThunderbolt" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
