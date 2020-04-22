const middlewares = {};

middlewares.checkAuthentication = (req, res, next) => {
    // if user is authenticated, passport has added req.user to the req object
    if (req.user) return next();
    return res.status(401).send({ err: 'Not Authenticated!' });
}

middlewares.checkAuthorization = (req, res, next) => {
    const currentUserId = req.user._id.toString();
    const id = typeof req.params.id === 'string' && req.params.id.length > 3 ? req.params.id : false;

    if (currentUserId === id) {
        return next();
    } else {
        return res.status(403).send({ err: 'Not Authorized!' });
    }
}

module.exports = middlewares;