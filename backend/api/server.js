const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router');

const server = express();

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

server.use(helmet());
server.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
server.use(express.json());

server.use('/api/auth', authRouter);

server.get('/', (req, res, next) => {
  res.status(200).json({ api: "running "});
});

module.exports = server;