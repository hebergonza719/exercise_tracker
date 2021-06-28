const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('./user');

const app = express();

mongoose.connect(
  "mongodb+srv://hebergonza:test123@cluster0.i7fe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose is connected");
  }
);

// middleware
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
// PASSPORT Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Routes
app.post("/login", (req, res, next) => {
  // local automatically used the local strategy set up in the file
  // the strategy gets the info in req.body
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists");
    else {
      // this logs in the user
      req.logIn(user, err => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      })
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({username: req.body.username}, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists");
    if (!doc) {
      // HASH PASSWORD
      // it needs to be awaited since it takes a couple of seconds to hash
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });
      // saves to mongo db
      await newUser.save();
      res.send("User created");
    }
  })
});

app.get("/login", (req, res) => {
  console.log(req.body);
});

app.listen(4000, () => {
  console.log('Server is lisitening in port 4000');
});

