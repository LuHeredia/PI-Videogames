import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGenre, postVideogames } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./vgCreate.css";
export default function VgCreated() {
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.allMyGenres);
  const history = useHistory();
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genre: [],
    platforms: [],
  });
  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }); setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e){
    if(input.genre.includes(e.target.value)){
        alert("You can't choose the same gender")
    } else if(input.genre.length < 3){
          setInput({
        ...input,
        genre: [...input.genre, e.target.value]
    })
    e.target.value = "Select the Genre"
    }else{
        alert("You cannot choose more than 3 genres")
    } 
}

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }
  function handleDelete(e) {
    setInput({
      ...input,
      genre: input.genre.filter((genre) => genre !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let crear = {
      name: input.name,
      description: input.description,
      rating: input.rating,
      released: input.released,
      image: input.image,
      platforms: input.platforms,
      genre: input.genre,
    };

    dispatch(postVideogames(crear));

    alert("VideoGame Created");
    history.push("/home");
  }
  let plataforms = [
    "PC",
    "PlayStation 5",
    "PlayStation 4",
    "Xbox Series S/X",
    "Xbox One",
    "Nintendo Switch",
    "iOS",
    "MacOs",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "Game Boy",
    "SEGA",
  ];
   function validate(input) {
    let error = {};

    if (!input.name ) {
      error.name = "Name is required";
    } else if (input.name.length > 50) {
      error.name = "Name is too long";
    }

    if (!input.description) {
      error.description = "Description is required ";
    } else if (input.description.length > 1500) {
      error.description = "Description is too long. (Max = 1500 characters)";
    }

    if (!input.rating) {
      error.rating = "Rating is required";
    } else if (input.rating > 5 || input.rating < 0) {
      error.rating = "Rating must range between 0 to 5";
    }

    if (!input.released) {
      error.released = "Date of release is required";
    } else if (input.released.length < 10) {
      error.released = "Date of release is to long";
    }
    if (!input.image) {
      error.image = "Image URL is required";
    }

    if (!input.genre[0]) {
      error.genre = "Minimun one Genre is required ";
    }

    if (!input.platforms[0]) {
      error.platforms = "Minimun one Platform is required";
    }

    return error;
  }

  return (
    <div className="form">
      <Link to="/home">
        <button>Return home</button>
      </Link>
      <h1>Create your video game!!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <span >{error.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Released:</label>
          <input
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
          {error.released && <span >{error.released}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Rating:</label>
          <input
            type="float"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {error.rating && <span >{error.rating}</span>}
        </div>



        <div className="form-group">
          <label className="form-label-2">Genres: </label>
          <select onChange={(e) => handleSelect(e)}>
            {genre?.map((elem) => {
            return (
              <option key={elem.id} value={elem.name}>
                {elem.name}
              </option>
            )
})}
          </select>
        </div>


        <div className="form-group">
          {input.genre.map((elem) => {
            return (
              <div key={elem}>
                <p>{elem}</p>
                <button onClick={() => handleDelete(elem)}>x</button>
              </div>
            );
          })}
        </div>
        <label className="form-label-3">Platforms: </label>
        <div className="check">
          {plataforms.map((el) => (
            <div>
              <input
                type="checkbox"
                value={el}
                name={el}
                onChange={(e) => handleCheck(e)}
              />
              {el}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label className="form-label">Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {error.description && <span >{error.description}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
