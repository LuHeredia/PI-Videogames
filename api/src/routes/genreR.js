require("dotenv").config();
const axios = require("axios");
const { Genre } = require("../db");
const { YOUR_API_KEY } = process.env;
const { Router } = require("express");

//-------------------------------------------------
const router = Router();
//-------------------------------------------------
router.get("/", async (req, res) => {
  const genresApi = await axios.get(
    //hace la llamada a la API
    `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
  );
  const genres = await genresApi.data.results.map((elem) => elem.name); //mapea los resultados de la api (que el elem que buscas sea igual al name) y los guarda en una constante

  genres.forEach((elem) =>
    Genre.findOrCreate({
      where: { name: elem },
    })
  );
  const allGenres = await Genre.findAll();
  res.send(allGenres); 
});

module.exports = router;
