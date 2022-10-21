import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import styled from "styled-components";
// import SendFile from "./SendFile"

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          {/* <SendFile /> */}
          {/* <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />} */}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoSend />
        </button>
      </form>
      
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-top:solid 1px;
  background-color: white;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 2rem;
        color: silver;
        cursor: pointer;
      }
      
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 65%;
      background-color: silver;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      border-radius:1rem;
      margin-left:1vw;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      margin:1vw;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #3c3ce0;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 0.5rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
  
`;
