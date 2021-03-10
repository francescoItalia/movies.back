// External libriaries imports
const express = require('express');
const { checkAuthentication } = require('../../util/middlewares');

// Local libraries imports
const movieControllers = require('../../controllers/movie/movieController');

// Instantiate router objet
const router = express.Router();

router.post('/add', checkAuthentication, (req, res) => movieControllers.addMovie(req, res));
router.get('/get/:title', (req, res) => movieControllers.getMovie(req, res));
router.put('/update', checkAuthentication, (req, res) => movieControllers.updateMovie(req, res));
router.delete('/delete/:title', checkAuthentication, (req, res) => movieControllers.deleteMovie(req, res));
router.get('/all', (req, res) => movieControllers.getAllMovies(req, res));
router.get('/by-genre/:genre', (req, res) => movieControllers.getMoviesByGenre(req, res));
router.get('/by-title/:title', (req, res) => movieControllers.getMoviesBySearch(req, res));

module.exports = router;