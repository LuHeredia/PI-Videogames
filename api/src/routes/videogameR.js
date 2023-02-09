require("dotenv").config();
const { Videogame, Genre } = require("../db");
const { getAllInfo, getById } = require("../controllers/vgInfo");
const { Router } = require("express");
//-------------------------------------------------
const router = Router();
// AQUI TENEMOS /VIDEOGAMES Y /VIDEOGAMES?NAME='...'
router.get("/", async (req, res) => {
  const name = req.query.name; //guarda en 'name' los name requeridos por query
  const totalGames = await getAllInfo(); //guarda toda la info en 'totalGames
  if (name) {
    const gamesName = totalGames.filter(
      (
        ele //filtra en totalGames el elem pasado por param
      ) => ele.name.toLowerCase().includes(name.toLowerCase()) //lo pone en minusculas y se fija en el filtrado elementos que contengan el mismo nombre
    );
    gamesName.length //si hay algo en gamesName
      ? res.status(200).send(gamesName) //lo consologea en 200
      : res
          .status(400) //y si no ya tu sabe
          .send("There is no games that matches with your search.");
  } else {
    res.status(200).send(totalGames); //y si noooo, manda todos
  } 
});
// AQUI TENEMOS /VIDEOGAMES/ID
router.get("/:id", async (req, res) => {
  const id = req.params.id; //guarda en id los id requeridos por parametros
  if (id) {
    const gameId = await getById(id); 
    res.status(200).send(gameId);
  } else {
    res.status(400).send("The game ID was not found");
  }
});
//POST DE VIDEOGAMES
router.post("/", async (req, res) => {
  const { name, genre, released, rating, platforms, description, image } =
    req.body; //trae esto del body
  const videogameCreated = await Videogame.create({
    //crea un nuevo juego siguiendo estos parametros
    name, //aqui no ponemos genre
    released,
    rating,
    platforms,
    description,
    image,
  });
  //busca dentro de todos los generos que esten en Genre , el genero que coincidan
  const genreDb = await Genre.findAll({
    where: { name: genre },
  });

  await videogameCreated.addGenre(genreDb); //a la const videogameCreated le agregamos el genero que buscamos arribita
  res.send("Videogame created successfully!");
  
});

module.exports = router;
