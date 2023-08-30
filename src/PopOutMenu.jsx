import React from "react";
import "./PopOut.css";
import { Button } from "@mui/material";

export default function PopOutMenu({ clear }) {
  return (
    <div className="PopOutMenu-container">
      <Button variant="contained" onClick={clear}>
        Clear Chat
      </Button>
      <p>
        This is a Chat GPT clone created by Owen Wardlaw. It uses the OpenAI API
        to generate text based on user input.
      </p>
      <Button variant="contained" onClick={clear}>
        <a
          href="https://www.linkedin.com/in/owenwardlaw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </Button>
      <Button variant="contained" onClick={clear}>
        <a
          href="https://github.com/owardlaw"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </Button>
      <Button variant="contained" onClick={clear}>
        <a
          href="https://react-terminal-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
        </a>
      </Button>
    </div>
  );
}
