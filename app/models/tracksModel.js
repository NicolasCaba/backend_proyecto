const mongoose = require('mongoose');

const tracksModel = {};

// Schema
const { Schema } = mongoose;
const tracksSchema = new Schema({
  name: String,
  album: String,
  genre: String,
  coverImg: String,
  artist: {
    name: String,
    nickname: String,
    nationality: String
  },
  duration: {
    start: Number,
    end: Number
  },
  url: String
});

// Colecction
const MyModel = mongoose.model('tracks', tracksSchema);

// Methods
tracksModel.create = function create(post, callback) {
  const instance = new MyModel();
  instance.name = post.name;
  instance.album = post.album;
  instance.genre = post.genre;
  instance.coverImg = post.coverImg;
  instance.artist.name = post.artist.name;
  instance.artist.nickname = post.artist.nickname;
  instance.artist.nationality = post.artist.nationality;
  instance.duration.start = post.duration.start;
  instance.duration.end = post.duration.end;
  instance.url = post.url;

  instance.save((error, response) => {
    if(error) {
      console.log(error);
      return callback({ state: false, message: error });
    }

    console.log(response);
    return callback({ state: true, message: response });
  });
}


tracksModel.read = function read(callback) {
  MyModel.find({}, {__v: 0, _id: 0}, (error, response) => {
    if(error) {
      return callback({ state: false, message: error });
    }

    return callback({ state: true, message: response });
  });
}

tracksModel.readId = function readId(get, callback) {
  MyModel.find({_id: get.id}, {__v: 0, _id: 0}, (error, response) => {
    if(error) {
      return callback({ state: false, message: 'Ninguna cancion ha sido encontrada con el id' });
    }

    if(response.length === 0) {
      return callback({ state: false, message: 'Ninguna cancion ha sido encontrada con el id' });
    }

    return callback({ state: true, message: response });
  });
}

tracksModel.update = function update(post, callback) {
  MyModel.findOneAndUpdate(
    { _id: post.id },
    {
      name: post.name,
      album: post.album,
      genre: post.genre,
      coverImg: post.coverImg,
      artist: {
        name: post.artist.name,
        nickname: post.artist.nickname,
        nationality: post.artist.nationality
      },
      duration: {
        start: 0,
        end: post.duration.end
      },
      url: post.url
    },
    {
      rawResult: true
    },
    (error, res) => {
      if(error) {
        return callback({ state: false, message: 'Id no encontrado' })
      }
      if(res.lastErrorObject.updatedExisting === false) {
        return callback({ state: false, message: 'Id no encontrado' });
      }
      return callback({ state: true, message: 'Cancion modificada' });
    }
  );
}

tracksModel.delete = function deleteTrack(post, callback) {
  MyModel.findOneAndDelete(
    { _id: post.id },
    { rawResult: true },
    (error, res) => {
      if(error) {
        return callback({ state: false, message: "Id no encontrado" });
      }
      if(res.lastErrorObject.n === 0) {
        return callback({ state: false, message: 'Id de cancion no encontrado' });
      }
      return callback({ state: true, message: 'Cancion eliminada correctamente',  });
    }
  );
}

module.exports.tracksModel = tracksModel;