const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/user");

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("errores");
		console.log(errors);
		return;
	}

	const documento = req.body.documento;
	const nombre = req.body.nombre;
	const usuario = req.body.usuario;
	const contrasena = req.body.contrasena;
	const correo = req.body.correo;
	const genero = req.body.genero;
	try {
		const hashedPassword = await bcrypt.hash(contrasena, 12);

		const userDetails = {
			documento: documento,
			nombre: nombre,
			usuario: usuario,
			contrasena: hashedPassword,
			correo: correo,
			genero: genero,
		};
        console.log("antes de save");
		const result = await Usuario.save(userDetails);
		console.log(result[0].insertId);
        console.log("pasó save");
		const user = await Usuario.findByUser(usuario);
		const storedUser = user[0][0];

		const token = jwt.sign(
			{
				usuario: storedUser.usuario,
				userId: storedUser.id_usuario,
			},
			"secretfortoken",
			{expiresIn: "23h"}
		);

		if (result) {
			res.status(201).json({token: token, userId: storedUser.id_usuario});
		} else {
			res.status(401).json({msg: "Not registered!"});
		}
	} catch (err) {
		if (!err.statusCode) {
            console.log(err);
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.login = async (req, res, next) => {
	const usuario = req.body.usuario;
	const contrasena = req.body.contrasena;
	try {
		const user = await Usuario.findByUser(usuario);
		if (user[0].length !== 1) {
			const error = new Error("Este usuario no existe");
			error.message = "Este usuario no existe";
			error.statusCode = 401;
			throw error;
		}

		const storedUser = user[0][0];
		const isEqual = await bcrypt.compare(contrasena, storedUser.contrasena);
		if (!isEqual) {
			const error = new Error("contraseña incorrecta");
			error.message = "contraseña incorrecta";
			error.statusCode = 401;
			throw error;
		}

		const token = jwt.sign(
			{
				usuario: storedUser.usuario,
				userId: storedUser.id_usuario,
			},
			"secretfortoken",
			{expiresIn: "23h"}
		);
		res.status(200).json({token: token, userId: storedUser.id_usuario});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getUser = async (req, res, next) => {
	try {
		const [user] = await Usuario.findByUser(req.body.usuario);
		console.log(user);
		res.status(200).json(user);
	} catch (e) {
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		next(e);
	}
};

exports.getUserById = async (req, res, next) => {
	try {
		const [user] = await Usuario.findById(req.body.id);
		console.log(user);
		res.status(200).json(user);
	} catch (e) {
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		next(e);
	}
};
