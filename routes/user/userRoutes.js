// Import external libriaries
const express = require('express');

// Local libraries imports
const userController = require('../../controllers/user/usersController');
const { checkAuthorization } = require('../../util/middlewares');

// Instantiate the router object
const router = express.Router();

router.post('/register', (req, res) => userController.register(req, res));
router.delete('/delete/:id', checkAuthorization, (req, res) => userController.delete(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.post('/logout', (req, res) => userController.logout(req, res));

module.exports = router;