const express = require('express');
const optionsController = require('../../controllers/optionsController');

const router = express.Router();

router.get('/generos', optionsController.getGeneros);
router.get('/paises', optionsController.getPaises);
module.exports = router;
