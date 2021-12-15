require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');

global.app = express();
const PORT = process.env.PORT || 3000;

// Config for post
global.app.use( bodyParser.json() );
global.app.use( bodyParser.urlencoded( { extended: true } ) );

// Cors config
global.app.use( cors({ origin: true, credentials: true  }) );

// DB connection
const { db } = require('./config/db');
db.connect();

// Session
const { session } = require('./config/session')
global.app.use(cookieParser());
global.app.use(session);

// Routes
require('./app/routes/tracks');
require('./app/routes/users');
require('./app/routes/usersTracks');

// Static assets
global.app.use( express.static(`${__dirname}/public`) );

// Listen
global.app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT);
});