const { usersController }  = require('../controllers/usersController');

// Routes
global.app.post('/user/register', (request, response) => {
  usersController.register(request, response);
});

global.app.post('/user/login', (request, response) => {
  usersController.login(request, response);
});

global.app.post('/user', (request, response) => {
  usersController.get(request, response);
});