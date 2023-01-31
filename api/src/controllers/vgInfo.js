
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;

//URL
const getApiInfo = async () => {
  const gamesApi = [];

  for (let i = 1; i <= 5; i++) {
    let api = await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`
    );
    api.data.results.map((elem) => {
      gamesApi.push({
        id: elem.id,
        name: elem.name,
        genre: elem.genres.map((elem) => elem.name),
        released: elem.released,
        rating: elem.rating,
        platforms: elem.platforms.map((elem) => elem.platform.name),
        image: elem.background_image,
        
      });
    });
  }
  return gamesApi;
};
//DB
const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
//TODO (URL Y DB)
const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

//ID
const getById = async(id)=>{
  if(!isNaN(id)){
      const number = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
      const detail = number.data
      const vgApiDetail = {
          id: detail.id,
          name: detail.name,
          genre: detail.genre?.map((ele)=> ele.name),
          released: detail.released,
          rating: detail.rating,
          platforms: detail.platforms?.map((ele)=>ele.platform.name),  
          description: detail.description,
          image: detail.background_image,
      }
      return vgApiDetail
  }
  if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
      const detailDb = await Videogame.findByPk(id, {
          include:[ {
              model: Genre,
              attributes:["name"],
              throught:{
                  attributes:[],
              }
          }]
      })
      return detailDb
  }
}

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllInfo,
  getById
};
