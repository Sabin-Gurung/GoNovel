
const mongoose = require("mongoose")
const User = require("../models/user")

const novelUniqueIdSchema = mongoose.Schema({
    curId :  {type : Number},
    name : {type : String}
});

const NovelUniqueId = mongoose.model("NovelUniqueId", novelUniqueIdSchema);

var novelSchema = mongoose.Schema({
    novelid : {type : Number},
    author : {type : String, required: true},
    title : {type : String, required: true},
    summary : {type : String, required: true},
    story : {type : String, required: true},
    createdAt : {type : Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now},
});

novelSchema.pre("save", function(cb){
    User.findOne({username : this.author}, (err, user)=>{
        if (err){
            return cb(err);
        }
        else if(user == null){
            return cb(new Error(`${this.username} does not exist`));
        }

        this.updatedAt = Date.now();
        if (this.isNew){
            NovelUniqueId.findOne({name: "novel"}, (err, novelUid)=>{
                this.novelid = novelUid.curId;
                novelUid.curId = novelUid.curId+1;
                novelUid.save();
                cb();
            })
        }
        else{
            cb();
        }
    });
});

var Novel = mongoose.model("Novel", novelSchema);
module.exports = Novel;
