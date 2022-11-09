import React, { useState,useEffect } from 'react';
import { IoSend, IoCamera } from 'react-icons/io5';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import axios from 'axios';

// import SendFile from "./SendFile"

//choose la methode utilisée dans login pour récuperer les imgs et texts or emoji dans le clone

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');
  const [imageSelected, setImageSelected] = useState('');
  // const [url, setUrl] = useState('');
  const [img, setImg] = useState('');

  useEffect(()=>{
    if(imageSelected){
        setImg(URL.createObjectURL(imageSelected))
    }
},[imageSelected])

  // const uploadImage = () => {
  //   const formData = new FormData();
  //   formData.append('file', imageSelected);
  //   formData.append('upload_preset', 'chatapp');
  //   // formData.append("cloud_name","disyacex9")

  //   axios
  //     .post('https://api.cloudinary.com/v1_1/disyacex9/image/upload', {
  //       data: formData,
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .then((formData) => {
  //       // setUrl(formData.url);
  //       setImg(formData.url);
  //     })
  //     .catch((error) => console.log(error));
  // };
  const sendChat = (event) => {
    event.preventDefault();
    // uploadImage();
    // setImg(url);
    if (msg.length > 0 || img.length > 0) {
      handleSendMsg(msg, img);
      setMsg('');
      setImg('');
    }
  };

  return (
    <Container>
      <div className="emoji">
       
        <input type="file" onChange={(event) => setImageSelected(event.target.files[0])} className="file" accept='image/*'/>
        <label htmlFor="file"> <IoCamera /></label>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input type="text" placeholder="type your message here" onChange={(e) => setMsg(e.target.value)} value={msg} className="message__input"/>
        <button type="submit">
          <IoSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-top: solid 1px;
  background-color: white;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .emoji{
      .file{
        opacity:0;
        width:5vw;
      }
      label{
       
        svg{
          font-size:250%;
          margin-top:-2.5vh;
          position:relative;
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
    flex-grow:2;
    .message__input {
      width: 90%;
      height: 65%;
      background-color: silver;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      border-radius: 1rem;
      margin-left: 1vw;
      flex-grow:3;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      margin: 1vw;
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

ChatInput.propTypes = {
  handleSendMsg: PropTypes.func,
};
