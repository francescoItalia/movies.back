// External Libraries import
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        minlength: 3
    },
    year: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 4
    },
    runtime: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 3
    },
    genres: {
        type: [String],
        required: true
    },
    director: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    actors: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    plot: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    posterUrl: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }
})

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel; 