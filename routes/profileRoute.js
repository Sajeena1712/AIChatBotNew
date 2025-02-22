const express = require("express");
const profileRoute = express();
const profileController = require("../controller/profileController");
const auth = require("../middleware/auth")




profileRoute.get("/login", auth.checkLogin, profileController.LoadLogin)
profileRoute.get("/signup", auth.checkLogin, profileController.LoadSignup)
profileRoute.post("/signup", profileController.signup)
profileRoute.post('/verify', profileController.verify)
profileRoute.get('/logout',auth.checkSession, profileController.logout)



module.exports = profileRoute