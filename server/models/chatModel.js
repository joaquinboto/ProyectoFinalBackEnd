const mongoose = require("mongoose");

const MessageSchema = mongoose.model('Chats' , new mongoose.Schema(
    {
    message: {
      type: String, 
      required: true ,
    }
    }
))

module.exports = MessageSchema