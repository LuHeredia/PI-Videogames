import React from "react";
import "../cards/cards.css";

export default function Card({ image, name, genre, rating }) {
  return (
    <div className="cards">
      <li>
        <img src={image} alt="image not found" />
        <h1>{name}</h1>
        <h1>⭐{rating}</h1>
        <h5>{genre + " "} </h5>
      </li>
    </div>
  );
}
