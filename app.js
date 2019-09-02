
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const app = express();

// middle wares
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
nunjucks.configure('views', {
    autoescape:true,
    express:app
})


app.get("/", (req, res)=>{
    res.render("home.html");
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("app starting on http://localhost:3000");
});