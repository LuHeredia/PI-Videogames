const initialState = {
  videogames: [],
  allGames: [],
  allMyGenres: [],
  gameDetail: [],
  platforms: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        allGames: action.payload,
        videogames: action.payload,
      };
    case "GET_GENRE":
      return {
        ...state,
        allMyGenres: action.payload,
      };
    case "FILTER_BY_GENRE":
      const games = state.allGames;
      let filterGenre;

      if (action.payload === "all") {
        filterGenre = games;
      } else {
        filterGenre = games.filter((el) => {
          if (el.genre.some((p) => p.name === action.payload)) {
            return el.genre.map((el) => el.genre === action.payload);
          } else {
            return el.genre.includes(action.payload);
          }
        });
      }
      return {
        ...state,
        videogames: filterGenre,
      };
    case "ORDER_RATING":
      let orderRating;

      if (action.payload === "Hrat") {
        //de mayor a menor
        orderRating = state.videogames.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1; // mayor rating
          }
          if (a.rating < b.rating) {
            return 1; // menor rating
          }
          return 0; //iguales
        });
      }
      if (action.payload === "Lrat") {
        //de menor a mayor
        orderRating = state.videogames.sort((a, b) => {
          if (b.rating > a.rating) {
            return -1;
          }
          if (b.rating < a.rating) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        videogames: orderRating,
      };
    case "GET_DETAIL":
      return {
        ...state,
        gameDetail: action.payload,
      };
    case "FILTER_BY_ABC":
      let sorted =
        action.payload === "asc"
          ? state.allGames.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.allGames.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sorted,
      };
    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "createdInDb"
          ? state.allGames.filter((e) => e.createInDb)
          : state.allGames.filter((e) => !e.createInDb);
      return {
        ...state,
        videogames: createdFilter,
      };
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "POST_VIDEOGAMES":
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;

//   case   'GET_GAME_BY_SEARCH':

//   let nombre = action.payload === '' ? state.allGames : state.allGames.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))

//   return{
//       ...state,
//       games: nombre
//   }
