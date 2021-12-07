require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

global.app = express();
const PORT = process.env.PORT || 3000;

// Config for post
global.app.use( bodyParser.json() );
global.app.use( bodyParser.urlencoded( { extended: true } ) );

// Config for conecction to api of another port
global.app.all('*',function(req, res, next){

  var whitelist = req.headers.origin;

  res.header('Access-Control-Allow-Origin', whitelist);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
  res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Credentials", "true");
  //res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');

  next();

});

// DB connection
const { db } = require('./config/db');
db.connect();

// Routes
require('./app/routes/tracks');

// Listen
global.app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT);
});