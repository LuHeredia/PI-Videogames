import React from "react";
import "./paginado.css";

export default function Paginado({ vgPerPage, allVideogames, paginado }) {
  const pageNumbers = [];

  //math.ceil redondea para arriba todos los games sobre los games que quiero por pag
  for (let i = 1; i <= Math.ceil(allVideogames / vgPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
