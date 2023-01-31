import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameVideogames(name));
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="🔍        Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </div>
  );
}
