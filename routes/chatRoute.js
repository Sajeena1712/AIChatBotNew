const mongoose = require("mongoose");
const express = require("express");
const chatRoute = express();
const chatBot = require("../utils/chatBot");
const chatDB = require("../model/chatsModel");
const userDB = require("../model/userModel");

chatRoute.post("/", async (req, res) => {
  try {
    const { message, id } = req.body;

    console.log(req.session.userData);

    const userId = req.session.userData._id;

    console.log("id ", id);

    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    const chatObjectId = new mongoose.Types.ObjectId(id);

    console.log(userIdObjectId);

    const userData = await userDB.findById(userIdObjectId);

    if (userData.chatLimit >= 5) {
      return res.json({ error: "Chat Limit Exceeded" });
    }

    await chatDB.updateOne(
      { _id: chatObjectId },
      { $push: { message: message } }
    );

    await chatBot(message, async (response) => {
      await chatDB.updateOne(
        { _id: chatObjectId },
        { $push: { message: response } }
      );

      await userDB.updateOne(
        { _id: userIdObjectId },
        { $inc: { chatLimit: 1 } }
      );

      return res.json({ response });
    });
  } catch (error) {
    console.log(error);
    res.send("Internal Error Occured");
  }
});

module.exports = chatRoute;
