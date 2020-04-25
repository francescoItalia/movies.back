// Local libraries imports
const userServices = require('../../models/user/userServices');
const Util = require('../../util/helpers');

// Instantiate the user controllers object
const userController = {

    register: async (req, res) => {
        // Check required data is provided
        const email = Util.validateEmail(req.body.email) ? req.body.email : false;
        const username = typeof req.body.username === 'string' && req.body.username.length > 3 ? req.body.username : false;
        const password = Util.validatePassword(req.body.password) ? req.body.password : false;

        if (email, username, password) {
            try {
                // If input are provided and valid, call the register service
                const registeredUser = await userServices.register({ email, username, password });

                if (registeredUser) res.status(200).send(registeredUser)
            } catch (e) {
                res.status(e.status).send({ err: e.message })
            }
        } else {
            res.status(400).send({ err: 'Invalid or missing fields. Please provide email, username and password' })
        }
    },

    delete: async (req, res) => {
        // Check required data is provided
        const id = typeof req.params.id === 'string' && req.params.id.length > 3 ? req.params.id : false;

        if (id) {
            try {
                // If input are provided and valid, call the delete service
                const userDeleted = await userServices.delete(id);
                if (userDeleted) res.status(200).send('User Deleted!')
            } catch (err) {
                res.status(500).send({ err: 'Something went wrong while deleting the user!' })
            }
        } else {
            res.status(400).send({ err: 'Invalid or missing fields. Please provide user id' })
        }
    },

    login: async (req, res) => {
        try {
            // Call the login service, if no rejections, user is logged in
            const loggedIn = await userServices.login(req, res);
            res.status(200).send('User Logged in!')
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    },

    logout: async (req, res) => {
        try {
            // Call the logout service, if no rejections, user is logged out
            await userServices.logout(req);
            res.status(200).send('User Logged out!')
        } catch (e) {
            res.status(500).send('Something went wrong while logginf the user out')
        }
    }
}

module.exports = userController;