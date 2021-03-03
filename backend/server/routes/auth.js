const express = require('express');
const { body } = require('express-validator');
const Usuario = require('../models/user');
const authController = require('../controllers/authController');

const router = express.Router();
router.post(
    '/signup', [
        body('documento').trim().isLength({min: 9}).notEmpty().custom(async(documento) => {
            const user = await Usuario.findByDoc(documento);
            if (user[0].length > 0) {
                return Promise.reject('El usuario ya existe');
            }
        }),
        body('nombre').trim().notEmpty(),
        body('usuario').trim().notEmpty()
        .custom(async(usuario) => {
            const user = await Usuario.findByUser(usuario);
            if (user[0].length > 0) {
                return Promise.reject('El usuario ya existe');
            }
        }),
        body('contrasena').trim().isLength({ min: 7 }),
        body('correo').isEmail().normalizeEmail(),
        body('fecha_nacimiento').trim().notEmpty(),
        body('id_genero').trim().notEmpty(),
        body('id_pais').trim().notEmpty()
    ], authController.signup
)
router.post('/login', authController.login);

module.exports = router;