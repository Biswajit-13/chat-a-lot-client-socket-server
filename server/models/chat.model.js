const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
    members:{
        type:Array
    }
},
{
    timestamps:true,
}

)

const ChatModel = mongoose.model("chat", ChatSchema)

module.exports = ChatModel