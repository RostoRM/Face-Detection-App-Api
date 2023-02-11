const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  // connect to your own database here:
  client: "pg",
  connection: {
    host: "dpg-cdrphu94rebbgsh3sco0-a",
    port: 5432,
    user: "rostorm",
    password: process.env.PASSWORD,
    database: "smartbrain_jycq",
  },
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get("/", (req, res) => {
  res.send("Success");
});

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`Everything is working on ${PORT}, keep going!`);
});
