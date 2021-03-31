const express = require('express');
const optionsController = require('../controllers/optionsController');

const router = express.Router();

router.get('/generos', optionsController.getGeneros);
module.exports = router;