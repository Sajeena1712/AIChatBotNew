const express = require("express");
const homeRoute = express();
const homeController = require("../controller/homeController");
const auth = require("../middleware/auth");




homeRoute.get("/", auth.checkSession, homeController.loadHome)
homeRoute.get("/chats/:id",auth.checkSession, homeController.loadChats)



module.exports = homeRoute