const { usersTracksModel } = require('../models/usersTracksModel');
const multer = require('multer');
const fs = require('fs');

const usersTracksController = {}

// File names for database info
let fileNameCover;
let fileNameTrack;

// Config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `public/users/${req.body.artistId}`;
    if(!fs.existsSync(path)) {
      fs.mkdir(path, (error) => {console.log(error)});
    }

    cb(null, path);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;

    const fileType = file.mimetype.split('/');
    if(fileType[0] === 'image') {
      fileNameCover = fileName;
    }
    if(fileType[0] === 'audio') {
      fileNameTrack = fileName;
    }

    cb(null, fileName);
  }
})
// Config multer
const fileFilter = function(req, file, cb) {
  const fileType = file.mimetype.split('/');

  if(fileType[0] !== 'image' && file.mimetype !== 'audio/mpeg') {
    return cb(null, false, new Error('goes wrong on the mimetype'));
  }

  cb(null, true);
}
// multer middleware
const upload = multer({ storage, fileFilter });
usersTracksController.upload = upload.fields([
  {
    name: 'coverImg',
    maxCount: 1
  },
  {
    name: 'track',
    maxCount: 1
  }
]);


// Methods
usersTracksController.create = function create(request, response) {
  post = {
    artistId: request.body.artistId,
    artistNickname: request.body.artistNickname,
    name: request.body.name,
    album: request.body.album,
    genre: request.body.genre,
    coverImg: `http://localhost:3000/users/${request.body.artistId}/${fileNameCover}`,
    trackUrl: `http://localhost:3000/users/${request.body.artistId}/${fileNameTrack}`
  }

  if(post.artistId === null || post.artistId === undefined || post.artistId === '') {
    response.json({ state: false, message: 'Algo ha salido mal! :(', info: 'artistId null' });
    return false;
  }
  if(post.name === null || post.name === undefined || post.name === '') {
    response.json({ state: false, message: 'El campo nombre es obligatorio' });
    return false;
  }
  if(post.album === null || post.album === undefined || post.album === '') {
    response.json({ state: false, message: 'El campo album es obligatorio' });
    return false;
  }
  if(post.genre === null || post.genre === undefined || post.genre === '') {
    response.json({ state: false, message: 'El campo genero es obligatorio' });
    return false;
  }
  if(post.coverImg === null || post.coverImg === undefined || post.coverImg === '') {
    response.json({ state: false, message: 'El campo de la imagen es obligatorio' });
    return false;
  }
  if(post.trackUrl === null || post.trackUrl === undefined || post.trackUrl === '') {
    response.json({ state: false, message: 'El campo del archivo de la cancion es obligatorio' });
    return false;
  }

  usersTracksModel.create(post, (modelResponse) => {
    response.json(modelResponse);
  });
  return true;
}


usersTracksController.getAll = function getAll(request, response) {
  usersTracksModel.getAll(null, (modelResponse) => {
    response.json(modelResponse);
  });
}

usersTracksController.getUserTracks = function getUserTracks(request, response) {
  const post = {
    artistId: request.body.artistId
  }

  if(post.artistId === null || post.artistId === undefined || post.artistId === '') {
    response.json({ state: false, message: 'Id de artista necesario para realizar la consulta' });
    return false;
  }

  usersTracksModel.getUserTracks(post, (modelResponse) => {
    response.json(modelResponse);
  });
}

module.exports.usersTracksController = usersTracksController;
