import React, { useState, useEffect, useRef } from "react";

import { addMessage, getMessages } from "../api/MessageRequests";
import io from "socket.io-client"; // Import Socket.io client library

const ChatWindow = ({ receiver, sender, chatId, recMessage }) => {

   const [senderMessage, setSenderMessage] = useState([]);
   const [message, setMessage] = useState({
      chatId: chatId,
      senderId: sender._id,
      text: "",
   })
   const socket = io("ws://localhost:3000"); // Replace with your Socket.io server URL
   const chatContainerRef = useRef(null);
   useEffect(() => {
      if (receiver && sender) {
         setMessage({
            chatId: chatId,
            senderId: sender._id,
            text: "",
         });
      }

   }, [receiver, sender, chatId])

   const handleInputs = (e) => {

      const value = e.target.value;
      setMessage({ ...message, text: value });
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (message.text.trim() !== "" && message.chatId && message.senderId) {
         try {
            await addMessage(message); // Make the POST request
            console.log("Message sent:", message);
            socket.emit("send-message", {
               receiverId: receiver._id, // Replace with the receiver's user ID
               message: message.text,
            });
            const newMessage = {
               chatId: chatId,
               senderId: sender._id,
               text: message.text,
            };
            setSenderMessage([...senderMessage, newMessage]);

            // Clear the input field after sending the message
            setMessage({ ...message, text: "" });

         } catch (error) {
            console.error("Error sending message:", error);
         }
      } else {
         console.log("chat Id or sender Id is missing.");
      }
   };

   useEffect(() => {
      if (recMessage != null && recMessage.receiverId === sender._id) {
         console.log("Received Message:", recMessage);

         // Create a new message object with the correct structure
         const newMessage = {
            chatId: chatId,
            senderId: recMessage.senderId,
            text: recMessage.message,
         };

         // Update senderMessage by appending the new message
         setSenderMessage([...senderMessage, newMessage]);
      }
   }, [recMessage]);

   useEffect(() => {
      // Scroll to the bottom of the chat container whenever senderMessage or recMessage changes
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
   }, [senderMessage, recMessage]);

   useEffect(() => {
      const fetchMessages = async () => {
         try {
            const data = await getMessages(chatId);
            setSenderMessage(data.data);
         } catch (error) {
            console.log("error fetching messages", error);
         }
      }
      fetchMessages();
   }, [receiver, sender, chatId, setSenderMessage])


   return (

      <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen w-full">
         <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div class="relative flex items-center space-x-4">
                  {receiver.name && (

                     <div
                        class="flex text-3xl font-bold text-gray-600 items-center justify-center h-12 w-12 bg-gray-200 rounded-full"
                     >
                        {receiver.name?.charAt(0).toUpperCase()}
                     </div>
                  )}

               <div class="flex flex-col leading-tight">
                  <div class="text-3xl">
                     <span class="text-gray-700 mr-3">{receiver.name ? receiver.name : "select a chat"}</span>
                  </div>
                  
               </div>
            </div>

         </div>
         <div
         ref={chatContainerRef}
         id="messages"
         class="flex flex-col space-y-4 p-3
          overflow-y-auto scrollbar-thumb-blue 
          scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
       >
         {senderMessage.map((message, index) => (
           <div
             key={index}
             className={`${
               message.senderId === sender._id
                 ? 'flex justify-end self-end'
                 : 'flex justify-start self-start'
             } mb-2`}
           >
             <div
               className={`${
                 message.senderId === sender._id
                   ? 'bg-gray-800 text-white rounded-lg'
                   : 'bg-gray-100 text-gray-700 rounded-lg'
               } p-3 max-w-md break-words shadow-md`}
             >
               {message.text}
             </div>
           </div>
         ))}
       </div>
       
       
       
         <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
  <div class="relative flex">
    <span class="absolute inset-y-0 flex items-center left-2">
      <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-gray-600">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
        </svg>
      </button>
    </span>
    <input
      value={message.text}
      onChange={handleInputs}
      id="texts"
      type="text"
      placeholder="Write your message!"
      class="w-full focus:outline-none text-gray-600 placeholder-gray-400 bg-gray-200 rounded-md py-2 px-10"
    />
    <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
      <button onClick={handleSubmit} type="button" class="inline-flex items-center justify-center px-4 py-2 transition duration-300 ease-in-out text-white bg-gray-800 hover:bg-gray-600 focus:outline-none rounded-lg shadow-md">
        <span class="font-semibold mr-2">Send</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-1 transform rotate-90 text-white">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>

      </div>




   );
}
export default ChatWindow;
