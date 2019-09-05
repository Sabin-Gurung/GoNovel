
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    createdAt : {type : Date, default: Date.now}
})

userSchema.pre("save", function(cb){
    var user = this;
    console.log("inside pre save " + user);
    if (!user.isModified("password")) {
        console.log("password not modified");
        return cb();
    }
    console.log('password modified');
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err){
            console.log("error gen salt");
            return cb(err);
        }
        console.log('hash created');
        bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            if (err) {
                console.log("error hjassing");
                return cb(err);
            }
            console.log('password hashed');
            user.password = hashedPassword;
            cb();
        });
    });
});

var User = mongoose.model("User", userSchema);

module.exports = User;