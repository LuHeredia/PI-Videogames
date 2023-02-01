import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenre,
  filterGamesByGenre,
  rating,
  filterByAbc,
  filterCreated,
  update
} from "../../actions";
import Card from "../cards/Cards";
import { Link } from "react-router-dom";
import Paginado from "../paginado/Paginado";
import SearchBar from "../search/Search";
import "./home.css";
import Loading from "../loading/loading";

export default function Home() {
  const dispatch = useDispatch();
  // con useSelector traeme todo lo que esta en el estado de videogames
  const allVideogames = useSelector((state) => state.videogames);
  //----estados locales----
  //currentPage(pagina actual), setCurrentPage(seteamos pag actual)
  //guardamos el estado local en una pagina actual y lo seteamos, comienza en 1 por que es la primera pag
  /////////const [currentPage, setCurrentPage] = useState(1);
  const currentPage = useSelector((state)=>state.currentPage)
  //aqui decimos cuantos vg van a ir por pagina y seteamos (15 vg por pag)
  const [vgPerPage, setVgPerPage] = useState(15);
  //creamos una contante y vamos a guardar pagina actual por personaje por pagina
  const indexOfLastVg = currentPage * vgPerPage; //15 videogames per page
  const indexOfFirstVg = indexOfLastVg - vgPerPage;
  //aqui van a estar los videojuegos que esten en la pagina actual
  //traemos todos los vg, agarra y toma solamente el indice del 1er vg y del ultimo vg
  const currentVg = allVideogames.slice(indexOfFirstVg, indexOfLastVg);
  //
  const [order, setOrder] = useState("");
  //trae todos los generos
  const allGenre = useSelector((state) => state.allMyGenres);

  const paginado = (currentPage) => {
    dispatch(update(currentPage));
  };
  //videogames
  useEffect(() => {
    //este dispatch es lo mismo que hacer el mapDispatch
    dispatch(getVideogames());
  }, [dispatch]);

  //videogames
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }
  //genero
  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);
  //filtrado de generos
  function handleFilteredGenre(e) {
    dispatch(filterGamesByGenre(e.target.value));
    //setCurrentPage(1);
  }
  //rating
  function handleRating(e) {
    dispatch(rating(e.target.value));
   // setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }
  //a-z ..z-a
  function handleFilterByAbc(e) {
    e.preventDefault();
    e.target.value === "all"
      ? dispatch(filterByAbc) && setOrder(`ABC ${e.target.value}`)
      : dispatch(filterByAbc(e.target.value));
    setOrder(`ABC ${e.target.value}`);
//    setCurrentPage(1);
  }
  //creados en db o existentes
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
//    setCurrentPage(1);
  }

  
  return (
    <div className="home">
      <div id="menu">
        <div className="logo">
          <img
            src="https://i.pinimg.com/736x/be/98/7d/be987d86163bdead9357e2e43ff315fe.jpg"
            alt=""
          />
        </div>
        <div className="conteiner">
          <li>
            <SearchBar />
            <hr />
            <select onChange={(e) => handleFilterByAbc(e)}>
              <option value="all">All</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <select onChange={(e) => handleFilteredGenre(e)}>
              <option value="all">All Genres</option>
              {allGenre?.map((elem) => (
                <option key={elem} value={elem.name}>
                  {elem.name}
                </option>
              ))}
            </select>
            <select onChange={(e) => handleRating(e)}>
              <option>Rating</option>
              <option value="Hrat">More Rating</option>
              <option value="Lrat">Low Rating</option>
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="all">All Games</option>
              <option value="createdInDb">Created</option>
              <option value="origin">Existing</option>
            </select>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Reload videogames
            </button>
          </li>
        </div>
      </div>

      <div id="create">
        <Link to="/create">
          <button>Create videogame</button>
        </Link>
      </div>
      <div>
        {
        currentVg.length === 0 ?
        <p><Loading/></p>
        : currentVg.map((elem) => {
          return (
            <fragment className="cards">
              <Link to={"/videogame/" + elem.id}>
                <Card
                  image={elem.image}
                  name={elem.name}
                  rating={elem.rating}
                  genre={elem.genre}
                />
              </Link>
            </fragment>
          );
        } )
        }
        <Paginado
          vgPerPage={vgPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
      </div>
     
    </div>
  );
}
//allVideogames? se pregunta si existe y despues lo mapea
