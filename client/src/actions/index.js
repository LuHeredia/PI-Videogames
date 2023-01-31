import axios from "axios";

//conexion entre el back y el front
export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogame");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}
//FILTRAR GENEREOS
export function filterGamesByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}
//TODOS LOS GENEROS
export function getGenre() {
  return async function (dispatch) {
    const genre = await axios.get("http://localhost:3001/genre");
    return dispatch({
      type: "GET_GENRE",
      payload: genre.data,
    });
  };
}
//RATING
export function rating(payload) {
  return {
    type: "ORDER_RATING",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/videogame/' + id);
    return dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}
//FILTRO A-Z
export function filterByAbc(payload) {
  return {
    type: "FILTER_BY_ABC",
    payload,
  };
}
//FILTRO DE CREADOS Y EXISTENTES
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
//SEARCH NAME
export function getNameVideogames(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogame?name=" + payload
      );
      return dispatch({
        type: "GET_NAME_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      alert("This game was not found");
    }
  };
}
export function postVideogames(payload) {
  return async function (dispatch) {
    const post = await axios.post("http://localhost:3001/videogame", payload);
    return post;
  };
}

