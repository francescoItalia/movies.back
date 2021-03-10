// External Libraries import
const passport = require('passport');

// Local libraries imports
const UserModel = require('./userModel');

// Instantiate the user services object
const userServices = {
    register: (userData) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check if the user already exist
                const userExists = await UserModel.exists({ email: userData.email });

                // If it doesn't exists, go ahead and create it
                if (!userExists) {
                    const newUser = new UserModel(userData);
                    let savedUser = await newUser.save();

                    const { _id, username, email } = savedUser;
                    resolve({ _id, username, email })

                } else {
                    resolve(false)
                }
            } catch (err) {
                console.log(err);
                reject(e);
            }
        })
    },

    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(id);
                const result = await UserModel.findByIdAndDelete(id);
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    },

    login: (req, res) => {
        return new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user, info) => {
                // If there is an error or If user not fund retrun false

                if (err) {
                    return reject({
                        status: 500,
                        message: info.message || 'Something went wrong while authenticating the user'
                    });
                }

                // Try to log in the user
                req.logIn(user, (err) => {
                    if (!err) {
                        resolve(true)
                    } else {
                        reject({
                            status: 400,
                            message: info.message
                        });
                    }
                });
            })(req, res);
        })
    },

    logout: (req) => {
        return new Promise((resolve, reject) => {
            try {
                // Passport automatically adds a function logout to the request object. 
                // Calling it and it will log the user out clearing the login session
                req.logout();
                resolve(true)
            } catch (e) {
                reject(false)
            }
        })
    }
}

module.exports = userServices;