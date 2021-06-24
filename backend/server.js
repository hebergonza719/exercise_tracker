const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bycrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const { use } = require('passport');

const app = express();

// middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser("secretcode"));

// Routes
app.post("/login", (req, res) => {
  console.log(req.body);
});

app.listen(4000, () => {
  console.log('Server is lisitening in port 4000');
});

