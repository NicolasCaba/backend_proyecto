const { usersTracksController } = require('../controllers/usersTracksController');

// Routes
global.app.post('/user/track', (request, response) => {
  usersTracksController.get(request, response);
});

global.app.post('/user/track/create', usersTracksController.upload, (request, response) => {
  usersTracksController.create(request, response);
});

global.app.get('/users/tracks', (request, response) => {
  usersTracksController.getAll(request, response);
});

global.app.post('/user/tracks', (request, response) => {
  usersTracksController.getUserTracks(request, response);
});

global.app.post('/user/track/update', usersTracksController.upload, (request, response) => {
  usersTracksController.updateUserTracks(request, response);
});

global.app.post('/user/track/delete', (request, response) => {
  usersTracksController.deleteUserTracks(request, response);
});
