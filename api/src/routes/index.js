const { Router } = require("express");

const videogames = require("./videogameR");
const genres = require("./genreR");
//-----------------------------------------------------
const router = Router();
//----------------------------Configurar los routers----------------------------------

// AQUI TENEMOS /VIDEOGAME Y /VIDEOGAME?NAME='...' Y /ID Y POST
router.use("/videogame", videogames);
//AQUI TENEMOS /GENRE
router.use("/genre", genres);

//-----------------------------------------------------------------

module.exports = router;
