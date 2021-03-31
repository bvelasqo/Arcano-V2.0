const Options = require('../models/options');

exports.getGeneros = async(req, res, next) => {
    try {
        const [allGeneros] = await Options.getGeneros();
        console.log(allGeneros);
        res.status(200).json(allGeneros);
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = 500;
        }
        next(e);
    }
}