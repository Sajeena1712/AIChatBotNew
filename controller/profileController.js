const userDB = require("../model/userModel");
const mongoose  = require("mongoose");
const LoadLogin = (req, res) => {

    try {


        return res.render("login");
        
    } catch (error) {
        
        console.log(error);
        res.send("Internal Error Occured");
    }
    


}


const LoadSignup = (req, res) => {
    
    try {
        

        res.render("signup");



    } catch (error) {
        console.log(error);
        
        res.send("Internal Error Occured");
    }
}

const signup = async (req, res) => {
    
    try {
        

        console.log(req.body);

        const {fullName, email, password} = req.body;

        const userExists = await userDB.findOne({email});

        if (userExists) return res.json({success:false});

        const user = new userDB({
            name: fullName,
            email,
            password
        })

        await user.save();

        res.json({success:true});

    } catch (error) {
        
        console.log(error);
    }
}

const verify = async (req, res) => {
    
    try {

        console.log(req.body);

        const {email, password} = req.body;
        const user = await userDB.findOne({email});
        console.log("user",user);

        const {_id} = user;
     
        if (!user) return res.json({success:false});

        if(user.password === password) 
        {
            req.session.user = user.name;
            req.session.userData = user
           

            console.log(req.session);
            res.json({success:true});
        }else
        {
            res.json({success:false});
        }
        
        
    } catch (error) {
        console.log(error);
        res.send("Internal Error Occured");
    }
}

const logout = (req, res) => {
    try {
        
        req.session.destroy();

        res.redirect("/profile/login");

    } catch (error) {
        
        console.log(error);
        res.send("Internal Error Occured");
    }
}

module.exports ={LoadLogin, LoadSignup , signup, verify,logout}