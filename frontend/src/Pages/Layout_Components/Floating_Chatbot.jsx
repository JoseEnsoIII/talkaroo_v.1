import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoClose, IoCloudUpload, IoCreate } from "react-icons/io5";

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 1000;

  @media (max-width: 768px) {
    width: 90%;
    right: 5%;
    bottom: 10px;
  }

  @media (max-width: 480px) {
    width: 100%;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
`;

const ChatHeader = styled.div`
  background: #4a90e2;
  color: white;
  padding: 12px;
  font-weight: bold;
  text-align: center;
  position: relative;
  font-size: 1.1rem;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ChatBody = styled.div`
  padding: 10px;
  height: 300px;
  overflow-y: auto;

  @media (max-width: 768px) {
    height: 40vh;
  }

  p {
    margin: 8px 0;
    word-wrap: break-word;
    font-size: 0.95rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 480px) {
    gap: 3px;
  }
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.9rem;
  }
`;

const SendButton = styled.button`
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.95rem;

  &:hover {
    background: #4a90e2;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
`;

const IconRow = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;

  @media (max-width: 480px) {
    gap: 3px;
  }
`;

const IconButton = styled.button`
  flex: 1;
  background: ${({ color }) => color || "#ccc"};
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  &:hover {
    background: ${({ hoverColor }) => hoverColor || "#bbb"};
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 1rem;
  }
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: transparent;
  border: 1px solid black;
  padding: 0;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1000;
  display: ${({ open }) => (open ? "none" : "block")};

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    bottom: 10px;
    right: 10px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input };
    setMessages([...messages, userMessage]);

    setInput("");

    try {
      const response = await axios.post("http://localhost:5001/api/chat", {
        message: input,
      });

      const botMessage = { type: "bot", content: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
    }
  };

  const handleUpload = () => {
    console.log("Upload button clicked");
  };

  const handleWrite = () => {
    console.log("Write button clicked");
  };

  return (
    <>
      <ChatButton open={open} onClick={() => setOpen(true)}>
        <img src="/images/talkaroo.png" alt="Chat Icon" />
      </ChatButton>

      <ChatContainer open={open}>
        <ChatHeader>
          Talkaroo Chatbot
          <CloseButton onClick={() => setOpen(false)}>
            <IoClose />
          </CloseButton>
        </ChatHeader>
        <ChatBody>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{ textAlign: msg.type === "user" ? "right" : "left" }}
            >
              <p>
                <strong>{msg.type === "user" ? "You" : "Bot"}:</strong>{" "}
                {msg.content}
              </p>
            </div>
          ))}
        </ChatBody>
        <ChatInputContainer>
          {/* Input and Send Button on the Same Line */}
          <InputRow>
            <ChatInput
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <SendButton onClick={sendMessage}>Send</SendButton>
          </InputRow>

          {/* Upload & Write Buttons in Same Row with Icons */}
          <IconRow>
            <IconButton color="#2ecc71" hoverColor="#27ae60" onClick={handleUpload}>
              <IoCloudUpload />
            </IconButton>
            <IconButton color="#e67e22" hoverColor="#d35400" onClick={handleWrite}>
              <IoCreate />
            </IconButton>
          </IconRow>
        </ChatInputContainer>
      </ChatContainer>
    </>
  );
};

export default FloatingChatbot;
