import React, { useEffect, useRef, useState } from "react";
import { createChat, findChat, userChats } from "../api/ChatRequests";
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';
const ChatList = ({ users, selectedUser, logedUser, cId, recMessage }) => {
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  // State to store received messages
  const navigate = useNavigate();
  const handleUserSelect = async (user) => {
    try {
      selectedUser(user);

      const chatExists = await findChat(logedUser._id, user._id);
      let chatId = null;

      if (chatExists.data) {
        chatId = chatExists.data._id;
      } else {
        const newChat = {
          senderId: logedUser._id,
          receiverId: user._id,
        };

        const createdChat = await createChat(newChat);
        chatId = createdChat.data._id;
      }

      cId(chatId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (logedUser && logedUser._id && users) {
      socket.current = io("ws://localhost:3000");
      socket.current.emit("new-user-add", logedUser._id);
      socket.current.on("get-users", (newuser) => {
        setOnlineUsers(newuser);
      });

      // Listen for "receive-message" event
      socket.current.on("receive-message", (data) => {
        recMessage(data); // Update the received message in state
        // console.log("message from socket", data); // Log the received message here
      });
    }
  }, [logedUser, users]);

  return (

    <div class="flex flex-col mt-8 text-gray-700">
      <div class="flex flex-row items-center justify-between text-xs">
        <span class="font-bold text-lg">Users</span>
        <span
          class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
        >4</span
        >
      </div>
      <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {users.map((user) => (
          <button onClick={() => handleUserSelect(user)}
            class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
          >
            <div
              class="flex items-center font-bold justify-center h-8 w-8 bg-gray-200 rounded-full"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div class="ml-2 text-m ">{user.name}</div>
            <div
              class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
            >
              2
            </div>
          </button>

        ))}
      </div>
      {logedUser && (
        <div className="absolute bottom-0 w-full">
          <button onClick={() => navigate("/about")} class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div class="flex font-bold items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
              {logedUser.name?.charAt(0).toUpperCase()}
            </div>
            <div class="ml-2 text-m">{logedUser.name}</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatList;
