// External Libraries import
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const { checkAuthentication } = require('./util/middlewares');

const auth = require('./controllers/user/auth');


// Local imports
const env = require('dotenv').config().parsed;
const { Connection } = require('./config/mongo');
const userRoutes = require('./routes/user/userRoutes');
const movieRoutes = require('./routes/movie/movieRoutes');


// Instantiate Express
const app = express();


// Instantiate external middlewares
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret: env.secret,
    resave: true,
    saveUninitialized: true,
    expires: new Date(Date.now() + 3600000),// 3600000 = 1 hour
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Auth middelwares
app.use(auth.initialize);
app.use(auth.session);

// Routing
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.get('/', checkAuthentication, (req, res) => res.status(200).send('OK'))

// First connect to DB then start the server
Connection.connectToMongo()
    .then(() => {
        // Listen on port env.port
        app.listen(env.PORT, () => {
            console.log(`Listening on Port: ${env.PORT}`);
        })
    })
    .catch(e => {
        console.error(e);
    });