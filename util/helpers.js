// Local libraries imports
const crypto = require('crypto');

class Util {
    static validateEmail = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    static validatePassword = password => {
        const re = /^([a-zA-Z0-9@*#]{8,15})$/;
        return re.test(String(password).toLowerCase());
    };


    // A function to hash a string
    static hash = str => {
        const hashedStr = crypto
            .createHmac('sha256', 'this is a secret')
            .update(str)
            .digest('hex');

        return hashedStr;
    };

    static redirectIfLoggedIn = (req, res, next) => {
        if (req.user) res.redirect('/');
        return next();
    }
}

module.exports = Util;