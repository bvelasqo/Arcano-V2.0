const db = require("../utils/database");

module.exports = class Usuario {
	constructor(documento, nombre, usuario, contrasena, correo, genero) {
		this.documento = documento;
		this.nombre = nombre;
		this.usuario = usuario;
		this.contrasena = contrasena;
		this.correo = correo;
		this.genero = genero;
	}

	static findByUser(usuario) {
		return db.execute("SELECT * FROM  usuarios WHERE usuario = ?", [
			usuario,
		]);
	}
	static findByDoc(documento) {
		return db.execute("SELECT * FROM  usuarios WHERE documento = ?", [
			documento,
		]);
	}
	static findById(id) {
		return db.execute("SELECT * FROM  usuarios WHERE id_usuario = ?", [id]);
	}

	static save(user) {
		return db.execute(
			" INSERT INTO usuarios(documento, nombre, usuario, contrasena, correo, id_genero) VALUES (?, ?, ?, ?, ?, ?)",
			[
				user.documento,
				user.nombre,
				user.usuario,
				user.contrasena,
				user.correo,
				user.genero,
			]
		);
	}
};
