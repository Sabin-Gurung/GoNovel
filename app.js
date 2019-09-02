
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const app = express();

// connecting to mongoose
// Sabin_dev > DURKqTNsbzvVdkAU
const uri = "mongodb+srv://Sabin_dev:DURKqTNsbzvVdkAU@learningmongo-wj4ik.mongodb.net/gonovel?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
mongoose.connection.once('open', () => {console.log("Mongo db connection success")});

// middle wares
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
nunjucks.configure('views', {
    autoescape:true,
    express:app
})


// routes
app.use(require("./routes/home"));
app.use(require("./routes/auth"));

// end routes
app.use((req, res) => {
    res.status(404).send("Route not found");
});

// error routes
app.use((err, req, res, next) => {
    res.status(500);
    res.send("Internal server error");
});


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("app starting on http://localhost:3000");
});