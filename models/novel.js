
const mongoose = require("mongoose")

var novelSchema = mongoose.Schema({
    author : {type : String, required: true},
    title : {type : String, required: true},
    summary : {type : String, required: true},
    story : {type : String, required: true},
    createAt : {type : Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now},
});

novelSchema.pre("save", function(cb){
    this.updatedAt = Date.now();
    cb();
});

var Novel = mongoose.model("Novel", novelSchema);
module.exports = Novel;
