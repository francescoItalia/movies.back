// Local libraries imports
const MovieModel = require('./movieModel');


// Instantiate the Movie services object
const movieServices = {
    addMovie: (movieData) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check if the movie exists
                const movieExists = await MovieModel.exists({ title: movieData.title });
                console.log(movieExists);

                if (movieExists) {
                    reject({
                        status: 400,
                        message: 'A movie with this title already exists'
                    })
                }

                const newMovie = new MovieModel(movieData)

                // Save the movie
                const savedMovie = await newMovie.save(movieData);

                if (savedMovie) {
                    resolve(movieData)
                } else {
                    reject({
                        status: 500,
                        message: 'Something went wrong while saving the movie!'
                    })
                }

            } catch (e) {
                console.log(e);
                reject({
                    status: 500,
                    message: 'Something went wrong while saving the movie!'
                })
            }
        })
    },

    getMovie: (title) => {
        return new Promise(async (resolve, reject) => {
            try {
                // try to get the movie by its title
                const movieFound = await MovieModel.findOne({ title });

                if (movieFound) {
                    resolve(movieFound)
                } else {
                    reject({
                        status: 404,
                        message: 'Movie not found'
                    })
                }
            } catch (e) {
                console.log(e);
                reject({
                    status: 500,
                    message: 'Something went wrong while getting the movie!'
                })
            }
        })
    },

    updateMovie: (movieData) => {
        return new Promise(async (resolve, reject) => {
            try {
                // try to get the movie by its title
                const movieFound = await MovieModel.findOneAndUpdate({ title }, movieData, { new: true, omitUndefined: true });

                if (movieFound) {
                    resolve(movieFound)
                } else {
                    reject({
                        status: 404,
                        message: 'Movie not found'
                    })
                }
            } catch (e) {
                console.log(e);
                reject({
                    status: 500,
                    message: 'Something went wrong while updating the movie!'
                })
            }
        })
    },

    deleteMovie: (title) => {
        return new Promise(async (resolve, reject) => {
            try {
                // try to get the movie by its title
                const movieFound = await MovieModel.findOneAndDelete({ title });

                if (movieFound) {
                    resolve(movieFound)
                } else {
                    reject({
                        status: 404,
                        message: 'Movie not found'
                    })
                }
            } catch (e) {
                console.log(e);
                reject({
                    status: 500,
                    message: 'Something went wrong while deleting the movie!'
                })
            }
        })
    },

    getAllMovies: () => {
        return new Promise(async (resolve, reject) => {
            try {
                // try to get the movie by its title
                const moviesFound = await MovieModel.find();

                // expected array of values. If length > 0 then there are results
                if (moviesFound.length) {
                    resolve(moviesFound)
                } else {
                    reject({
                        status: 404,
                        message: 'No movies found'
                    })
                }
            } catch (e) {
                console.log(e);
                reject({
                    status: 500,
                    message: 'Something went wrong while getting the movie!'
                })
            }
        })
    },

    getMoviesByGenre: (genre) => {
        return new Promise(async (resolve, reject) => {
            try {
                const regEx = new RegExp(genre, 'i');
                // try to find movies where array genres contains the provided genre
                const moviesFound = await MovieModel.where('genres', regEx);

                // expected array of values. If length > 0 then there are results
                if (moviesFound.length) {
                    resolve(moviesFound)
                } else {
                    reject({
                        status: 404,
                        message: 'No movies found'
                    })
                }
            } catch (e) {
                console.log(e);
                reject({
                    status: 500,
                    message: 'Something went wrong while getting the movie!'
                })
            }
        })
    },

    getMoviesBySearch: (title) => {
        return new Promise(async (resolve, reject) => {
            try {
                const regEx = new RegExp(title, 'i');
                // try to find movies where title contains the provided title string
                const moviesFound = await MovieModel.where('title', regEx);

                // expected array of values. If length > 0 then there are results
                if (moviesFound.length) {
                    resolve(moviesFound)
                } else {
                    reject({
                        status: 404,
                        message: 'No movies found'
                    })
                }
            } catch (e) {
                console.log(e);
                reject({
                    status: 500,
                    message: 'Something went wrong while getting the movie!'
                })
            }
        })
    }
}

module.exports = movieServices;