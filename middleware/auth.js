const session = require('express-session');




const checkSession = (req, res, next) => {
    try {
        
        if (req.session.user) {
            next();

        }else
        {
            res.redirect('/profile/login');
        }

    } catch (error) {
        
        console.log(error);

        res.send("internal error in the session middleware");
    }
}


const checkLogin = (req, res, next) => {
    

    try {
        
        if (req.session.user) {

            res.redirect('/home');
        } else {
            next();

        }
    } catch (error) {
        
        console.log(error);

        res.send("internal error in the session middleware");
    }
}


module.exports = {checkSession, checkLogin};


