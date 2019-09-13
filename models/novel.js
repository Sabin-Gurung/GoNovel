
const mongoose = require("mongoose")
const User = require("../models/user")

var novelSchema = mongoose.Schema({
    novelid : {type : String, required: true},
    author : {type : String, required: true},
    title : {type : String, required: true},
    summary : {type : String, required: true},
    story : {type : String, required: true},
    createAt : {type : Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now},
});

novelSchema.pre("save", function(cb){
    User.findOne({username : this.username}, (err, user)=>{
        if (err){
            return cb(err);
        }
        else if(user){
            return cb(new Error(`${this.username} does not exist`));
        }
        this.updatedAt = Date.now();
        cb();
    });
});

var Novel = mongoose.model("Novel", novelSchema);
module.exports = Novel;
