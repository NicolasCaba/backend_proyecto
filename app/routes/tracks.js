const { tracksController } = require('../controllers/tracksController');

// Routes
global.app.post('/tracks/create', (request, response) => {
  tracksController.create(request, response);
});

global.app.get('/tracks', (request, response) => {
  tracksController.read(request, response);
});

global.app.get('/tracks/:id', (request, response) => {
  tracksController.readId(request, response);
});

global.app.post('/tracks/update', (request, response) => {
  tracksController.update(request, response);
});

global.app.post('/tracks/delete', (request, response) => {
  tracksController.delete(request, response);
})
