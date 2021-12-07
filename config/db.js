const mongoose = require('mongoose');

const db = {};

db.connect = function connect() {
  const DB_URL = process.env.DB_URL;
  mongoose.connect( DB_URL, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error, response) => {
      if(error) {
        console.log( error );
      } else {
        console.log( `Conexion con la base de datos correcta` );
      }
    }
    )
}

module.exports.db = db;