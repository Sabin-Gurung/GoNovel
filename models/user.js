
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var SALT_FACTOR = 10;

// model schema
var userSchema = mongoose.Schema({
    username : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    createdAt : {type : Date, default: Date.now}
})

// middle wares
userSchema.pre("save", function(cb){
    var user = this;
    if (!user.isModified("password")) {
        return cb();
    }
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err){
            return cb(err);
        }
        bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            if (err) {
                return cb(err);
            }
            user.password = hashedPassword;
            cb();
        });
    });
});


// methods
userSchema.methods.checkPassword = function(guess, cb){
    bcrypt.compare(guess, this.password, (err, isMatch)=>{
        cb(err, isMatch);
    });
}



var User = mongoose.model("User", userSchema);

module.exports = User;