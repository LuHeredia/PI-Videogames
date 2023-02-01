import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import "../detail/detail.css";
import Loading from "../loading/loading";

export default function Detail(props) {
  const dispatch = useDispatch();

  let regex = /(<([^>]+)>)/gi;

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myGame = useSelector((state) => state.gameDetail);

  console.log(myGame);

  return (
    <div>
      <div className="detail">
        <h1>{myGame.name}</h1>
        <div>
          <img
            src={myGame.image}
            alt="image"
            width="600px"
            height="350px"
          ></img>
        </div>
        <div className="conteiner">
          <h2>Genre:</h2>
          <h3>
            {!myGame.createInDb
              ? myGame.genre + " "
              : myGame.genres.map((el) => el.name + " ")}
          </h3>
          <h2>Platforms:</h2>
          <h3>{myGame.platform ? myGame.platforms : myGame.platforms + " "}</h3>
          <h2>Released:</h2>
          <h3>{myGame.released}</h3>
          <h2>Rating:</h2>
          <h3>⭐ {myGame.rating}</h3>
        </div>
        <div className="description">
          <h1>Description:</h1>
          <h3>
            {myGame.description?.replace(regex, "").replace("&#39;s", "")}
          </h3>
        </div>
      </div>

      <Link to="/home">
        <button className="button">Return</button>
      </Link>
    </div>
  );
}
// //<h4>Genre:
// {typeof genre[0] === "string"
// ? genre?.map((el) => el + " ")
// : genre.map((el) => el.name + " ")}
// </h4>
