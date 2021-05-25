const db = require("../utils/database");
module.exports = class Game {
	//save info match
	save(game) {
		return db.execute(
			" INSERT INTO partidas(id_anfitrion, nombre_partida	, descripcion, tematica, estado) VALUES (?,?,?,?,?)",
			[game.anfitrion, game.nombre, game.descripcion, game.tematica, 0]
		);
	}
	saveRooms(room) {
		return db.execute(
			"INSERT INTO salas(id_partida, orden, nombre_sala) VALUES(?,?,?)",
			[room.id_partida, room.orden, room.sala]
		);
	}

	saveChallengesOptions(reto) {
		return db.execute(
			"insert into retos(pregunta,respuesta_1,respuesta_2,respuesta_3,respuesta_4 ,respuesta_correcta,id_sala,valor,id_tipo_reto) values(?,?,?,?,?,?,?,?,1)",
			[
				reto.pregunta,
				reto.respuesta_1,
				reto.respuesta_2,
				reto.respuesta_3,
				reto.respuesta_4,
				reto.respuesta_correcta,
				reto.id_sala,
				reto.valor,
			]
		);
	}
	saveChallengesCustom(reto) {
		return db.execute(
			"insert into retos(pregunta,respuesta_1,respuesta_2,respuesta_3,respuesta_4 ,respuesta_correcta,id_sala,valor,id_tipo_reto) values(?,?,?,?,?,?,?,?,2)",
			[
				reto.pregunta,
				reto.respuesta_1,
				reto.respuesta_2,
				reto.respuesta_3,
				reto.respuesta_4,
				reto.respuesta_correcta,
				reto.id_sala,
				reto.valor,
			]
		);
	}
	getChallenge(id_reto) {
		return db.execute("select * from retos where id_reto = ?", [id_reto]);
	}
	deleteChallenge(id_reto) {
		return db.execute("delete from retos where id_reto = ?", [id_reto]);
	}
	updateChallenge(reto) {
		return db.execute(
			"UPDATE retos SET pregunta=?,respuesta_1=?,respuesta_2=?,respuesta_3=?,respuesta_4=?,respuesta_correcta=?,id_sala=?,valor=? WHERE id_reto = ?",
			[
				reto.pregunta,
				reto.respuesta_1,
				reto.respuesta_2,
				reto.respuesta_3,
				reto.respuesta_4,
				reto.respuesta_correcta,
				reto.id_sala,
				reto.valor,
				reto.id_reto,
			]
		);
	}
	startGame(id_partida) {
		return db.execute("update partidas set estado=1 where id_partida=?", [
			id_partida,
		]);
	}
	endGame(id_partida) {
		return db.execute("update partidas set estado=0 where id_partida=?", [
			id_partida,
		]);
	}
	gamesPlayed(id_jugador) {
		return db.execute(
			"select * from jugadores_partidas where id_jugador = ?",
			[id_jugador]
		);
	}
	gamesCreated(id_anfitrion) {
		return db.execute("select * from partidas where id_anfitrion = ?", [
			id_anfitrion,
		]);
	}

	//summary game

	getPlayers(id_partida) {
		return db.execute(
			"select * from jugadores_partidas where id_partida = ?",
			[id_partida]
		);
	}

	getRooms(id_partida) {
		return db.execute("select * from salas where id_partida = ?", [
			id_partida,
		]);
	}

	getGame(id_partida) {
		return db.execute("select * from partidas where id_partida = ?", [
			id_partida,
		]);
	}

	getChallenges(id_partida) {
		return db.execute("select * from retos where id_partida = ?", [
			id_partida,
		]);
	}

	//for answer challenge

	getPlayer(documento) {
		return db.execute("select * from usuarios where documento = ?", [
			documento,
		]);
	}

	answerChallenge(answer) {
		return db.execute(
			"insert into respuestas_jugadores(id_jugador,respuesta,id_reto,evidencia, fecha_jugada) values(?,?,?,?,?)",
			[
				answer.id_jugador,
				answer.respuesta,
				answer.id_reto,
				answer.evidencia,
				answer.fecha_jugada,
			]
		);
	}

	answerGame(answerChallenge) {
		return db.execute(
			"insert into respuestas_jugador_partida(id_jugador_partida, id_respuesta_jugador) values(?,?) ",
			[
				answerChallenge.id_jugador_partida,
				answerChallenge.id_respuesta_jugador,
			]
		);
	}

	savePlayer(id_partida, id_jugador) {
		return db.execute(
			"insert into jugadores_partidas(id_partida, id_jugador) values(?,?)",
			[id_partida, id_jugador]
		);
	}

	
	
};
