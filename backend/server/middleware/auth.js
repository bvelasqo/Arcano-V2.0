const jwt = require('jsonwebtoken');

module.exports = (req, res,next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('No autenticado');
        error.statusCode=401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
    decodedToken = jwt.verify(token, 'secretfortoken');
    } catch (e) {
    e.statusCode = 500;
    throw e;
    }
    if(!decodedToken){
        const error = new Error('Not Auth');
        error.statusCode=401;
        throw error;
    }
    req.isLoggedIn = true;
    req.userId = decodedToken.userId;
    req.usuario = decodedToken.usuario;
    next();
};