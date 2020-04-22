// External Libraries import
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Local imports
const UserModel = require('../../models/user/userModel');


//Set a strategy that lets us authenticate users against the DB.
// By default this strategy will look for "username" and "password" in the body so we are passing a 
// configuration object to make it use "email" rather than "username"

passport.use(new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
        // Try to load the user passing the email provided by passport in the username variable
        const user = await UserModel.findOne({ email: username }).exec()

        if (!user) {
            // We pass null for no error, false for no user and a message
            return done(null, false, { message: 'Invalid username or password' });
        } else {
            // if there is a user, validate the password using the compare function created in the user model
            const passwordOk = await user.comparePassword(password);
            console.log(`passwordOK: ${passwordOk}`);

            if (!passwordOk) {
                return done(null, false, { message: 'Invalid username or password' });
            } else {
                // If password is ok, return no error and the user
                return done(null, user);
            }
        }
    } catch (err) {
        return done(err)
    }
}))

// This function is called when a login is successful
// Serialize the user and save the user information (id) in the current session
passport.serializeUser((user, done) => {
    return done(null, user._id)
})

// This function is called everytime a logged user starts a session
// Provide the user in req.user to all following middlewares and routes
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id).exec(); // Calling exec to make sure a promise is returned
        return done(null, user)
    } catch (err) {
        // In case the user could not be found - maybe it was deleted - then passport would 
        // not be able to deserialize the user and the user would not authenticate.
        return done(err)
    }
})


module.exports = {
    initialize: passport.initialize(),
    session: passport.session()
}