require('dotenv').config();
const sessionE = require('express-session');

const session = sessionE({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 7200000
  },
  name: 'SessionLowBeat',
  rolling: true
});

module.exports.session = session;

