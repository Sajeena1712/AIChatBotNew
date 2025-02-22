const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const hbs = require("hbs");
const nocache = require("nocache");
const chatRoute = require("./routes/chatRoute");
const homeRoute = require("./routes/homeRoute");
const profileRoute = require("./routes/profileRoute");
require("dotenv").config();
const logger = require("morgan");
const PORT =  process.env.PORT || 3074;

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/insight-ai",);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
    
}))

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
hbs.registerHelper('firstElement', function(array) {
    if (array && array.length > 0) {
      return array[0];
    }
    return '';
  });
hbs.registerHelper('alternateHeader', function(index) {
    return index % 2 === 0 ? 'You' : 'AI'; // Return 'You' for even index, 'AI' for odd index
});


app.use("/", homeRoute)
app.use("/prompt", chatRoute)
app.use("/home", homeRoute)
app.use("/profile", profileRoute)





app.listen(PORT, () => {
    console.log(`server is running on port 
    http://localhost:${PORT}`);
})