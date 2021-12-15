const mongoose = require('mongoose');

const usersModel = {};

const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  nickname: String,
  nationality: String,
  age: Number,
  email: String,
  password: String,
  role: String
});

const MyModel = mongoose.model('users', userSchema);


usersModel.register = function register(post, callback) {
  const instance = new MyModel();
  instance.name = post.name;
  instance.nickname = post.nickname;
  instance.nationality = post.nationality;
  instance.age = post.age;
  instance.email = post.email;
  instance.password = post.password;
  instance.role = 'user';

  instance.save((error, response) => {
    if(error) {
      console.log(error);
      return callback({ state: false, message: 'Ocurrio un error', info: error });
    }

    console.log(response);
    return callback({ state: true, message: 'Usuario creado', info: response })
  })
}

usersModel.login = function login(post, callback) {
  MyModel.find({email: post.email}, {role: 1, name: 1, password: 1}, (error, response) => {
    if(error) {
      console.log(error);
      return callback({ state: false, message: 'Ocurrio un error', info: error });
    }
    if(response.length === 0) {
      return callback({ state: false, message: 'Ningun usuario coincide con la busqueda' });
    }

    return callback({ state: true, info: response });
  
  })
}


usersModel.get = function get(post, callback) {
  MyModel.find({_id: post.id}, {__v: 0}, (error, response) => {
    if(error) {
      return callback({ state: false, message: 'Ocurrio un error', info: error });
    }

    return callback({ state: true, message: response });
  });
}

module.exports.usersModel = usersModel;