const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    message: {
        type: Array,
       
    },
    date:{
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model("chats", chatSchema)