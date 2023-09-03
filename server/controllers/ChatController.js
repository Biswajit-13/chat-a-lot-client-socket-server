const ChatModel = require("../models/chat.model");

 const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
    console.log("Chat created:", result);
  } catch (error) {
    res.status(500).json(error);
    console.error("Error creating chat:", error);

  }
};

 const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
    console.log("User's chats:", chat);
  } catch (error) {
    res.status(500).json(error);
     console.error("Error fetching user's chats:", error);
  }
};

 const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
    console.log("Found chat:", chat);

  } catch (error) {
    res.status(500).json(error)
    console.error("Error finding chat:", error);

  }
};

module.exports = {createChat,findChat,userChats}