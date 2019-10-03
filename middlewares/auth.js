
var checkSignIn = (req, res, next)=>{
    if (req.session.username)
        next();
    else
        res.send("You are not logged in");
}

module.exports.checkSignIn = checkSignIn;