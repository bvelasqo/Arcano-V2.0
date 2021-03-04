const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user');

exports.signup = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return
    }
    
    const documento = req.body.documento;
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    const correo = req.body.correo;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const genero = 1;
    const pais = 'CO';
    // generar codigo personal
     rand_code = (chars, lon) => {
        let code = "";
        let rand;
        for (let x=0; x < lon; x++){
            rand = Math.floor(Math.random()*chars.length);
            code += chars.substr(rand, 1);
        }
        return code;
    }
    const caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const longitud = 8;
    let codigoPersonal = 'TJZV6DII';
    // let codigoPersonal = rand_code(caracteres, longitud);
    let user = await Usuario.findByCode(codigoPersonal);
    while(user[0].length === 1){
        codigoPersonal = rand_code(caracteres, longitud);
        user = await Usuario.findByCode(codigoPersonal);
    } 

    try {

        const hashedPassword = await bcrypt.hash(contrasena, 12);

        const userDetails = {
            documento: documento,
            nombre: nombre,
            usuario: usuario,
            contrasena: hashedPassword,
            correo: correo,
            fecha_nacimiento: fecha_nacimiento,
            genero: genero,
            codigoPersonal: codigoPersonal,
            pais: pais
            };
        
        const result = await Usuario.save(userDetails);
        const user = await Usuario.findByUser(usuario);
        const storedUser = user[0][0];

        const token = jwt.sign({
                usuario: storedUser.usuario,
                userId: storedUser.id_usuario,
            },
            'secretfortoken', { expiresIn: '23h' }
        );

        if (result) {
            res.status(201).json({ token: token, userId: storedUser.id_usuario });

        } else {
            res.status(401).json({ message: 'Not registered!' });

        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async(req, res, next) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    try {
        const user = await Usuario.findByUser(usuario);
        if (user[0].length !== 1) {
            const error = new Error('Este usuario no existe');
            error.message = 'Este usuario no existe';
            error.statusCode = 401;
            throw error;
        }
        

        const storedUser = user[0][0];
        const isEqual = await bcrypt.compare(contrasena, storedUser.contrasena);
        if (!isEqual) {
            const error = new Error('contraseña incorrecta');
            error.message = 'contraseña incorrecta'
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
                usuario: storedUser.usuario,
                userId: storedUser.id_usuario,
            },
            'secretfortoken', { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: storedUser.id_usuario });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}