const { usersModel } = require('../models/usersModel');
const sha256 = require('sha256');

const usersController = {};

// Methods
usersController.register = function(require, response) {
  const post = {
    name: require.body.name,
    nickname: require.body.nickname,
    nationality: require.body.nationality,
    age: require.body.age,
    email: require.body.email,
    password: require.body.password,
    confirmPassword: require.body.confirmPassword
  }

  if(post.name === null || post.name === undefined || post.name === '') {
    response.json({ state: false, message: 'El campo nombre es obligatorio' });
    return false;
  }
  if(post.nickname === null || post.nickname === undefined || post.nickname === '') {
    response.json({ state: false, message: 'El campo nickname es obligatorio' });
    return false;
  }
  if(post.nationality === null || post.nationality === undefined || post.nationality === '') {
    response.json({ state: false, message: 'La nacionalidad es obligatoria' });
    return false;
  }
  if(post.age === null || post.age === undefined || post.age === '') {
    response.json({ state: false, message: 'El campo edad es obligatorio' });
    return false;
  }
  if(post.email === null || post.email === undefined || post.email === '') {
    response.json({ state: false, message: 'El campo email es obligatorio' });
    return false;
  }
  if(post.password === null || post.password === undefined || post.password === '') {
    response.json({ state: false, message: 'El campo password es obligatorio' });
    return false;
  }
  if(post.confirmPassword === null || post.confirmPassword === undefined || post.confirmPassword === '') {
    response.json({ state: false, message: 'El campo confirmacion de contraseña es obligatorio' });
    return false;
  }
  if(post.confirmPassword !== post.password) {
    response.json({ state: false, message: 'Las contraseñas no coinciden' });
    return false;
  }

  post.password = sha256(String(post.password));

  usersModel.register(post, (modelResponse) => {
    response.json(modelResponse);
  });
  return true;
}


usersController.login = function login(request, response) {
  const post = {
    email: request.body.email,
    password: request.body.password
  }

  if(post.email === null || post.email === undefined || post.email === '') {
    response.json({ state: false, message: 'El campo email es obligatorio' });
    return false;
  }
  if(post.password === null || post.password === undefined || post.password === '') {
    response.json({ state: false, message: 'El campo password es obligatorio' });
    return false;
  }

  usersModel.login(post, (modelResponse) => {

    if(modelResponse.state === true) {
      if(modelResponse.info[0].password === sha256(post.password)) {
        request.session.role = modelResponse.info[0].role;
        request.session.name = modelResponse.info[0].name;
        request.session._id = modelResponse.info[0]._id.valueOf();

        response.json({ 
          state: true, 
          message: 'Bienvenido', 
          session: request.session,
          tokenSession: request.session.id
        })
      } else {
        response.json({ state: false, message: 'Email o contraseña invalidos' })
      }
    } else {
      response.json({ state: false, message: 'Email o contraseña invalidos' })
    }

  });
  return true;
}

usersController.get = function get(request, response) {
  post = {
    id: request.body.id
  }

  if(post.id === null || post.id === undefined || post.id === '') {
    response.json({ state: false, message: 'El id es necesario' });
  }

  usersModel.get(post, (modelResponse) => {
    response.json(modelResponse);
  });
}


module.exports.usersController = usersController;