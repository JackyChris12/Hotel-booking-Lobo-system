const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel_lobo",
});

const app = express();

//middleware
app.use(express.static(path.join(__dirname, "public"))); //path --nested routes --booking/user_id

app.use(express.urlencoded({ extended: true })); //for persing application

//routes

//login routes
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", express({ extended: true }), (req, res) => {
  const { email, password } = req.body;
  dbConnection.query("SELECT * FROM users WHERE email = ?", [email], async (error, results){
    if(err || results.length ===0 ) return res.status(404).send('Inavild credetial')
  })
});

app.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM rooms", (roomsSelectError, rooms) => {
    if (roomsSelectError) {
      res.status(500).send("Server Error: 500");
    } else {
      dbConnection.query("SELECT * FROM spots", (spotsSelecetError, spots) => {
        if (spotsSelecetError) {
          res.status(500).send("Server Error: 500");
        } else {
          console.log(spots);
          res.render("index.ejs", { rooms, spots });
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
