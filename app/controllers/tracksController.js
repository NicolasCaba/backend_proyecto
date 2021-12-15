// Model
const { tracksModel } = require('../models/tracksModel');

const tracksController = {};

// Methods
tracksController.create = function create(request, response) {
  const post = {
    name: request.body.name,
    album: request.body.album,
    genre: request.body.genre,
    coverImg: request.body.coverImg,
    artist: {
      name: request.body.artist.name,
      nickname: request.body.artist.nickname,
      nationality: request.body.artist.nationality
    },
    duration: {
      start: 0,
      end: request.body.duration.end
    },
    url: request.body.url
  }

  if( post.name === null || post.name === undefined || post.name === '' ) {
    response.json({ state: false, message: 'El nombre es obligatorio' });
    return false;
  }
  if( post.album === null || post.album === undefined || post.album === '' ) {
    response.json({ state: false, message: 'El album es obligatorio' });
    return false;
  }
  if( post.genre === null || post.genre === undefined || post.genre === '' ) {
    response.json({ state: false, message: 'El genero de la cancion es obligatorio' });
    return false;
  }
  if( post.coverImg === null || post.coverImg === undefined || post.coverImg === '' ) {
    response.json({ state: false, message: 'La imagen principal es obligatoria' });
    return false;
  }
  if( post.artist.name === null || post.artist.name === undefined || post.artist.name === '' ) {
    response.json({ state: false, message: 'El nombre del artista es obligatirio' });
    return false;
  }
  if( post.artist.nickname === null || post.artist.nickname === undefined || post.artist.nickname === '' ) {
    response.json({ state: false, message: 'El nickname del artista es obligatirio' });
    return false;
  }
  if( post.artist.nationality === null || post.artist.nationality === undefined || post.artist.nationality === '' ) {
    response.json({ state: false, message: 'La nacionalidad del artista es obligatoria' });
    return false;
  }
  if( post.duration.end === null || post.duration.end === undefined || post.duration.end === '' || !Number.isInteger(post.duration.end)) {
    response.json({ state: false, message: 'El segundo de finalizacion de la cancion es obligatorio y debe ser un número entero' });
    return false;
  }
  if( post.url === null || post.url === undefined || post.url === '' ) {
    response.json({ state: false, message: 'La url de la cancion es obligatoria' });
    return false;
  }
  

  tracksModel.create(post, (modelResponse) => {
    response.json(modelResponse);
  });
  return true;
}

tracksController.read = function read(request, response) {
  tracksModel.read((modelResponse) => {
    response.json(modelResponse);
  })
}

tracksController.readId = function readId(request, response) {
  const get = {
    id: request.params.id
  }

  if( get.id === null || get.id === undefined || get.id === '' ) {
    response.json({ state: false, message: 'El id es necesario para realizar la busqueda' });
    return false;
  }

  tracksModel.readId(get, (modelResponse) => {
    response.json(modelResponse);
  });
  return true;
}

tracksController.update = function update(request, response) {
  const post = {
    id: request.body.id,
    name: request.body.name,
    album: request.body.album,
    genre: request.body.genre,
    coverImg: request.body.coverImg,
    artist: {
      name: request.body.artist.name,
      nickname: request.body.artist.nickname,
      nationality: request.body.artist.nationality
    },
    duration: {
      start: 0,
      end: request.body.duration.end
    },
    url: request.body.url
  }

  if( post.id === null || post.id === undefined || post.id === '' ) {
    response.json({ state: false, message: 'El id es necesario para realizar la busqueda' });
    return false;
  }

  if( post.name === null || post.name === undefined || post.name === '' ) {
    response.json({ state: false, message: 'El nombre es obligatorio' });
    return false;
  }
  if( post.album === null || post.album === undefined || post.album === '' ) {
    response.json({ state: false, message: 'El album es obligatorio' });
    return false;
  }
  if( post.genre === null || post.genre === undefined || post.genre === '' ) {
    response.json({ state: false, message: 'El genero de la cancion es obligatorio' });
    return false;
  }
  if( post.coverImg === null || post.coverImg === undefined || post.coverImg === '' ) {
    response.json({ state: false, message: 'La imagen principal es obligatoria' });
    return false;
  }
  if( post.artist.name === null || post.artist.name === undefined || post.artist.name === '' ) {
    response.json({ state: false, message: 'El nombre del artista es obligatirio' });
    return false;
  }
  if( post.artist.nickname === null || post.artist.nickname === undefined || post.artist.nickname === '' ) {
    response.json({ state: false, message: 'El nickname del artista es obligatirio' });
    return false;
  }
  if( post.artist.nationality === null || post.artist.nationality === undefined || post.artist.nationality === '' ) {
    response.json({ state: false, message: 'La nacionalidad del artista es obligatoria' });
    return false;
  }
  if( post.duration.end === null || post.duration.end === undefined || post.duration.end === '' || !Number.isInteger(post.duration.end)) {
    response.json({ state: false, message: 'El segundo de finalizacion de la cancion es obligatorio y debe ser un número entero' });
    return false;
  }
  if( post.url === null || post.url === undefined || post.url === '' ) {
    response.json({ state: false, message: 'La url de la cancion es obligatoria' });
    return false;
  }

  tracksModel.update(post, (modelResponse) => {
    response.json(modelResponse);
  })
}


tracksController.delete = function deleteTrack(request, response) {
  post = {
    id: request.body.id
  }

  if( post.id === null || post.id === undefined || post.id === '' ) {
    response.json({ state: false, message: 'El id es necesario para realizar la busqueda' });
    return false;
  }

  tracksModel.delete(post, (modelResponse) => {
    response.json(modelResponse);
  })
}

module.exports.tracksController = tracksController;