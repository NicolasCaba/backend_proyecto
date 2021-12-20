const { exploreController } = require('../controllers/exploreController');

//Routes
global.app.post('/explore/categorie', (request, response) => {
  exploreController.getTracksCategorie(request, response);
});
