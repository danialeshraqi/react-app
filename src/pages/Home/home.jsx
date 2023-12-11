import { Link } from "react-router-dom";
import img_React from "../../Image/React.webp";
import img_js from "../../Image/js.png";
import img_sass from "../../Image/sass.jpg";
import img_vscode from "../../Image/vs-code.jpg";
import "./home.scss";
import { useState } from "react";
export const Home = () => {
  const [activeslide, setActiveslide] = useState(1);

  return (
    <div className="headcontainer">
      <div className="img__slider">
        <img
          className="img__slider__page"
          src={
            activeslide === 1
              ? img_React
              : activeslide === 2
              ? img_sass
              : activeslide === 3
              ? img_js
              : img_vscode
          }
        />
        <button
          className="img__slider__page__button__prev"
          onClick={() => {
            if (activeslide === 1) setActiveslide(4);
            else setActiveslide(activeslide - 1);
          }}
        >
          {"<"}
        </button>
        <button
          className="img__slider__page__button__next"
          onClick={() => {
            if (activeslide === 4) setActiveslide(1);
            else setActiveslide(activeslide + 1);
          }}
        >
          {">"}
        </button>
      </div>
      <h2 className="headcontainer__wellcom">
        wellcome{localStorage.getItem("user")}
      </h2>
    </div>
  );
};
