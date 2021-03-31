const db = require("../utils/database");
module.exports = class Game {
	static save(game) {
		return db.execute(
			" INSERT INTO partidas(id_anfitrion, nombre_partida	, descripcion, tematica, estado) VALUES (?,?,?,?,?)",
			[
				game.anfitrion,
				game.nombre,
				game.descripcion,
				game.tematica,
				0
			]
		);
	}
	static saveRooms(room){
		return db.execute("INSERT INTO salas(id_partida, orden, nombre_sala) VALUES(?,?,?)",
		[
			room.id_partida,
			room.orden,
			room.sala
		])
	}
};
