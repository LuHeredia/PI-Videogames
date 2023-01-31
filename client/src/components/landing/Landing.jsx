import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <img src="https://66.media.tumblr.com/43ff1ae84968ffd84606207e9995a78e/tumblr_py4mvbGe6h1tgo74ho1_1280.gif" />
      <br />
      <h1>WELCOME TO MY INDIVIDUAL PROJECT.</h1>
      <Link to="/home">
        <button>Let's play!</button>
      </Link>
    </div>
  );
}
