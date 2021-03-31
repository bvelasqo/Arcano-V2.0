const db = require("../utils/database");

module.exports = class Options {
	static getGeneros() {
		return db.execute("SELECT * FROM GENEROS");
	}
};
