import React from "react";

const ChatBubble = ({ sender, text }) => {
  return (
    <div className={`flex ${sender === "You" ? "justify-end" : ""}`}>
      <div
        className={`${
          sender === "You" ? "bg-red-500 text-white" : "bg-blue-gray-100"
        } rounded-lg p-3 max-w-md`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
