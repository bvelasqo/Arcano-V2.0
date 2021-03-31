const express = require("express");
const {body} = require("express-validator");
const gameController = require("../controllers/gameController");

const router = express.Router();

router.post(
	"/gamesave",
	[
		body("nombre").trim().isLength({min: 4}).notEmpty(),
		body("descripcion").trim().isLength({min: 4}).notEmpty(),
		body("tematica").trim(),
	],
	gameController.saveGame
);
router.post(
	"/saverooms",
	[body("sala").trim().notEmpty(), body("orden").trim().notEmpty()],
	gameController.saveRooms
);

module.exports = router;
