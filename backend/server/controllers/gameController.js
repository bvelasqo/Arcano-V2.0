const {validationResult, body} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Game = require("../models/game");

exports.saveGame = async (req, res, next) => {
	console.log("está en saveGame");
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("errores");
		console.log(errors);
		return;
	}
	const anfitrion = req.body.anfitrion;
	const nombre = req.body.nombre;
	const descripcion = req.body.descripcion;
	const tematica = req.body.tematica;
	try {
		const gameDetails = {
			anfitrion: anfitrion,
			nombre: nombre,
			descripcion: descripcion,
			tematica: tematica,
		};
		console.log(gameDetails);
		const result = await Game.save(gameDetails);
		console.log("pasó save");
		const id_partida = result[0].insertId;
		console.log(id_partida);
		const gameToken = jwt.sign(
			{
				id_partida: id_partida,
			},
			"secretfortoken",
			{expiresIn: "23h"}
		);
		console.log("entró el jwt");
		if (result) {
			res.status(201).json({
				gameToken: gameToken,
				id_partida: id_partida,
			});
		} else {
			res.status(401).json({msg: "Not save game!"});
		}
	} catch (err) {
		if (!err.statusCode) {
			console.log(err);
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.saveRooms = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("errores");
		console.log(errors);
		return;
	}
	const sala = req.body.sala;
	const orden = req.body.orden;
	const id_partida = req.body.id_partida;

	try {
		const roomDetails = {
			sala: sala,
			orden: orden,
			id_partida: id_partida,
		};
		console.log(roomDetails);
		const result = await Game.saveRooms(roomDetails);
		console.log(result);
		if (result) {
			res.status(201).json({msg: "room saved"});
		} else {
			res.status(401).json({msg: "Not save room!"});
		}
	} catch (err) {
		if (!err.statusCode) {
			console.log(err);
			err.statusCode = 500;
		}
		next(err);
	}
};
