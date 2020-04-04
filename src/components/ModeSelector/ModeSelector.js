import React, { useState } from "react";
import { Desktop, User } from "react-bytesize-icons";
import style from "./ModeSelector.module.css";

function Poster({ mode, icon, onClick }) {
  return (
    <div className={style.poster} onClick={onClick}>
      {icon}
      <div className={style.modeName}>{mode}</div>
    </div>
  );
}
function LevelSelector({ modeChanger }) {
  return (
    <div className={style.poster}>
      <span className={style.level} onClick={() => modeChanger("1", "low")}>
        Easy
      </span>
      <span className={style.level} onClick={() => modeChanger("1", "high")}>
        Hard
      </span>
    </div>
  );
}
function ModeSelector({ modeChanger }) {
  const [level, setLevel] = useState(false);
  return (
    <div className={style.modeContainer}>
      {level ? (
        <LevelSelector modeChanger={modeChanger} />
      ) : (
        <>
          <Poster
            mode="Play with Computer"
            icon={<Desktop height="200px" width="200px" color="blue" />}
            onClick={() => setLevel(true)}
          />
          <Poster
            mode="Happy Together"
            icon={
              <div className={style.multiUserIcon}>
                <User height="150px" width="100px" color="blue" />
                <User height="150px" width="100px" color="blue" />
              </div>
            }
            onClick={() => modeChanger("2", "low")}
          />
        </>
      )}
    </div>
  );
}

export default React.memo(ModeSelector);
