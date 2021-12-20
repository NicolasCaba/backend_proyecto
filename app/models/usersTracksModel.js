const mongoose = require('mongoose');

const usersTracksModel = {}

const { Schema } = mongoose;
const usersTracksSchema = new Schema({
  artistId: String,
  artistNickname: String,
  name: String,
  album: String,
  genre: String,
  coverImg: String,
  trackUrl: String
});

const MyModel = mongoose.model('usersTracks', usersTracksSchema);

// Methods
usersTracksModel.get = function get(post, callback) {
  MyModel.find({_id: post.id}, {__v: 0, _id: 1}, (error, response) => {
    if(error) {
      return callback({ state: false, message: 'Ocurrio un error', info: error });
    }

    return callback({ state: true, message: response });
  });
}


usersTracksModel.create = function create(post, callback) {
  const instance = new MyModel();
  instance.artistId = post.artistId;
  instance.artistNickname = post.artistNickname;
  instance.name = post.name;
  instance.album = post.album;
  instance.genre = post.genre;
  instance.coverImg = post.coverImg;
  instance.trackUrl = post.trackUrl;

  instance.save((error, response) => {
    if(error) {
      console.log(error);
      return callback({ state: false, message: 'Ocurrio un error', info: error });
    }

    console.log(response);
    return callback({ state: true, message: 'Track creada', info: response })
  })
}

usersTracksModel.getAll = function getAll(post, callback) {
  MyModel.find({}, {__v: 0, _id: 1}, (error, response) => {
    if(error) {
      return callback({ state: false, message: 'Ocurrio un error', info: error });
    }

    return callback({ state: true, message: response });
  });
}

usersTracksModel.getUserTracks = function getUserTracks(post, callback) {
  MyModel.find({artistId: post.artistId}, {__v: 0, _id: 1}, (error, response) => {
    if(error) {
      return callback({ state: false, message: 'Ocurrio un error', info: error });
    }

    return callback({ state: true, message: response });
  });
}

usersTracksModel.updateUserTracks = function updateUserTracks(post, callback) {
  MyModel.findOneAndUpdate(
    { _id: post.trackId },
    {
      artistId: post.artistId,
      artistNickname: post.artistNickname,
      name: post.name,
      album: post.album,
      genre: post.genre,
      coverImg: post.coverImg,
      trackUrl: post.trackUrl
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


usersTracksModel.deleteUserTracks = function deleteUserTracks(post, callback) {
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

module.exports.usersTracksModel = usersTracksModel;