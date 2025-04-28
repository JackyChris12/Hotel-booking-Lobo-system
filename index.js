const express = require("express");
const path = require("path");

const app = express();

//middleware
app.use(express.static(path.join(__dirname, "public"))); //path --nested routes --booking/user_id
app.use(express.json()); //for persing application /json
app.use(express.urlencoded({ extended: true }));

//routes

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
