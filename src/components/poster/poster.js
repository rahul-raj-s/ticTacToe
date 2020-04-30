import React from "react";
import style from "./poster.module.css";

function Poster({ mode, icon, onClick }) {
  return (
    <div className={style.poster} onClick={onClick}>
      <span className={style.iconContainer}>{icon}</span>
      <div className={style.modeName}>{mode}</div>
    </div>
  );
}

export default Poster;
