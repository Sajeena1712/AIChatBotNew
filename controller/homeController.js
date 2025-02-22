const chatDB = require("../model/chatsModel");

const loadHome = async (req, res) => {
  try {
    
    await chatDB.deleteMany({
      user: req.session.userData._id,
      message: { $exists: true, $eq: [] },
    });

    const chats = new chatDB({
        user: req.session.userData._id
      });
  
    const response = await chats.save();

    const chatsData = await chatDB.find({ user: req.session.userData._id });
    const chatHead = chatsData.map((element) => {
      if (element.message.length > 0) {
        element.message = element.message[0];

        console.log("if ", element.chatHead);
      }

      console.log(element);

      return {
        _id: element._id,
        message: element.message[0],
        date: element.date,
      };
    });

    console.log(chatHead);

    return res.render("home", {
      user: req.session.user,
      chatId: response._id,
      chats: chatHead,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal Error Occured");
  }
};


const loadChats = async (req, res) => {

    try {

        const id = req.params.id;

        const chats = await chatDB.findOne({ _id: id });


        res.render("chatHistory", {chats: chats , user: req.session.user});
   
        
    } catch (error) {

        console.log(error);
        res.send("Internal Error Occured");
    }
    
}

module.exports = { loadHome , loadChats};
