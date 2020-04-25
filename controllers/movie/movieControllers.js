// Local libraries imports
const movieServices = require('../../models/movie/movieServices');

// Instantiate the movie controllers object
const movieControllers = {
    addMovie: async (req, res) => {
        // Check required data is provided
        const title = typeof req.body.title === 'string' && req.body.title.length > 3 ? req.body.title : false;
        const year = typeof req.body.year === 'string' && req.body.year.length === 4 ? req.body.year : false;
        const runtime = typeof req.body.runtime === 'string' && req.body.runtime.length > 1 && req.body.runtime.length < 4 ? req.body.runtime : false;
        const genres = Array.isArray(req.body.genres) && req.body.genres.length > 0 ? req.body.genres : false;
        const director = typeof req.body.director === 'string' && req.body.director.length > 5 ? req.body.director : false;
        const actors = typeof req.body.actors === 'string' && req.body.actors.length > 5 ? req.body.actors : false;
        const plot = typeof req.body.plot === 'string' && req.body.plot.length > 10 ? req.body.plot : false;
        const posterUrl = typeof req.body.posterUrl === 'string' && req.body.posterUrl.length > 5 ? req.body.posterUrl : false;

        if (title && year && runtime && genres && director && actors && plot && posterUrl) {
            // If input are provided and valid, call the addMovie service
            try {
                const addedMovie = await movieServices
                    .addMovie({ title, year, runtime, genres, director, actors, plot, posterUrl });

                if (addedMovie) res.status(200).send(addedMovie)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        } else {
            res.status(400).send('Invalid or missing fields.')
        }

    },

    getMovie: async (req, res) => {
        // Check required data is provided
        const title = typeof req.params.title === 'string' && req.params.title.length > 0 ? req.params.title : false;

        if (title) {
            // If input are provided and valid, call the getMovie service
            try {
                const movieFound = await movieServices
                    .getMovie(title);

                if (movieFound) res.status(200).send(movieFound)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        } else {
            res.status(400).send('Invalid or missing fields.')
        }
    },

    updateMovie: async (req, res) => {
        // Check required data is provided
        const title = typeof req.body.title === 'string' && req.body.title.length > 3 ? req.body.title : false;
        const year = typeof req.body.year === 'string' && req.body.year.length === 4 ? req.body.year : undefined;
        const runtime = typeof req.body.runtime === 'string' && req.body.runtime.length > 1 && req.body.runtime.length < 4 ? req.body.runtime : undefined;
        const genres = Array.isArray(req.body.genres) && req.body.genres.length > 0 ? req.body.genres : undefined;
        const director = typeof req.body.director === 'string' && req.body.director.length > 5 ? req.body.director : undefined;
        const actors = typeof req.body.actors === 'string' && req.body.actors.length > 5 ? req.body.actors : undefined;
        const plot = typeof req.body.plot === 'string' && req.body.plot.length > 10 ? req.body.plot : undefined;
        const posterUrl = typeof req.body.posterUrl === 'string' && req.body.posterUrl.length > 5 ? req.body.posterUrl : undefined;

        if (title && year || runtime || genres || director || director || actors || plot || posterUrl) {
            // If input are provided and valid, call the updateMovie service
            try {
                const movieUpdated = await movieServices
                    .updateMovie({ title, year, runtime, genres, director, actors, plot, posterUrl });

                if (movieUpdated) res.status(200).send(movieUpdated)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        } else {
            res.status(400).send('Invalid or missing fields.')
        }
    },

    deleteMovie: async (req, res) => {
        // Check required data is provided
        const title = typeof req.params.title === 'string' && req.params.title.length > 0 ? req.params.title : false;

        if (title) {
            // If input are provided and valid, call the deleteMovie service
            try {
                const movieDeleted = await movieServices
                    .deleteMovie(title);

                if (movieDeleted) res.status(200).send('Movie Deleted!')
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        } else {
            res.status(400).send('Invalid or missing fields.')
        }
    },

    getAllMovies: async (req, res) => {
        try {
            const moviesFound = await movieServices
                .getAllMovies();

            if (moviesFound)
                res.set('Access-Control-Allow-Origin', '*');
            res.status(200).send(moviesFound)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    },

    getMoviesByGenre: async (req, res) => {
        // Check required data is provided
        const genre = typeof req.params.genre === 'string' && req.params.genre.length > 0 ? req.params.genre : false;

        if (genre) {
            // If input are provided and valid, call the getMoviesByGenre service
            try {
                const moviesFound = await movieServices
                    .getMoviesByGenre(genre);

                if (moviesFound) res.status(200).send(moviesFound)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        } else {
            res.status(400).send('Invalid or missing fields.')
        }
    },

    getMoviesBySearch: async (req, res) => {
        // Check required data is provided
        const title = typeof req.params.title === 'string' && req.params.title.length > 0 ? req.params.title : false;

        if (title) {
            // If input are provided and valid, call the getMoviesByGenre service
            try {
                const moviesFound = await movieServices
                    .getMoviesBySearch(title);

                if (moviesFound) res.status(200).send(moviesFound)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        } else {
            res.status(400).send('Invalid or missing fields.')
        }
    }
}

module.exports = movieControllers;