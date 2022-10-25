import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'; 
import styled from 'styled-components';
import process from 'process'
import Logout from './Logout';
import { IoSearch, IoChatbubbleEllipses } from 'react-icons/io5';

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <div className="chat__icon">
              <IoChatbubbleEllipses />
            </div>
            <Logout />
          </div>
          <div className="contact__container">
            <div className="search__bar">
              <IoSearch />
              <input type="search" name="" placeholder="Search contact" className="input__search__chat" />
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${index === currentSelected ? 'selected' : ''}`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;

  overflow: hidden;
  background-color: silver;
  .contact__container {
    margin-left: 3vw;
    margin-right: 3vw;
    border-radius: 1rem;
    .search__bar {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      background-color: white;
      margin-bottom: 3vh;
      height: 7.5vh;
      border-radius: 1rem;
      padding-left: 1vw;
      padding-right: 0.5vw;
      .input__search__chat {
        border: none;
        color: silver;
      }
    }
    .contacts {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      gap: 0.8rem;
      background-color: white;
      border-radius: 1rem;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .contact {
        background-color: #ffffff34;
        min-height: 5rem;
        cursor: pointer;
        width: 90%;

        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        border-bottom: solid 1px;
        .avatar {
          img {
            height: 3rem;
          }
        }
        .username {
          h3 {
            color: black;
            font-size: 100%;
          }
        }
      }
      .selected {
        background-color: #9a86f3;
      }
    }
  }
  .current-user {
    background-color: blue;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 1vh 3.5vw;
    border-radius: 1rem;
    .avatar {
      img {
        height: 7.5rem;
        max-inline-size: 100%;
      }
    }
    .username {
      display: none;
      h2 {
        color: white;
      }
    }
    .chat__icon {
      background-color: blue;
      border-right: solid 5px yellow;
      align-self: end;
      margin-right: -3.5vw;
      margin-top: -40vh;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      padding: 1vh 0.5vw;
      svg {
        color: white;
        font-size: 250%;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

Contacts.propTypes = {
  contacts: PropTypes.array,
  changeChat:PropTypes.func

}
