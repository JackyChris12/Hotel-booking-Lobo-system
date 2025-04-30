const express = require("express");
const path = require("path");
const mysql = require("mysql");

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
