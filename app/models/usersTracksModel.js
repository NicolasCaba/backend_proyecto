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

module.exports.usersTracksModel = usersTracksModel;