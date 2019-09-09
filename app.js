
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const cookieparser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("express-flash");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// connecting to mongoose
const uri = process.env.MONGO_ATLAS_URI
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.once('open', () => { console.log("Mongo db connection success") });

// middle wares
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
nunjucks.configure('views', {
    autoescape: true,
    express: app
})
app.use(cookieparser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// routes
app.use(require("./routes/home"));
app.use(require("./routes/auth"));
app.use(require("./routes/profile"));

// api routes
app.use("/api/v1", require("./api/v1/api"));

// end routes
app.use((req, res) => {
    res.status(404).send("Route not found");
});

// error routes
app.use((err, req, res, next) => {
    res.status(500);
    res.send("Internal server error");
});


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("app starting on http://localhost:3000");
});