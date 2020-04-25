// Import external libriaries
const express = require('express');

// Local libraries imports
const userControllers = require('../../controllers/user/usersController');
const { checkAuthorization } = require('../../util/middlewares');

// Instantiate the router object
const router = express.Router();

router.post('/register', (req, res) => userControllers.register(req, res));
router.delete('/delete/:id', checkAuthorization, (req, res) => userControllers.delete(req, res));
router.post('/login', (req, res) => userControllers.login(req, res));
router.post('/logout', (req, res) => userControllers.logout(req, res));

module.exports = router;