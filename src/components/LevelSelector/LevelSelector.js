import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "../../redux/tictac.action";
import { changeRoute } from "../router/router.action";
import style from "./LevelSelector.module.css";

function LevelSelector(props) {
  const dispatch = useDispatch();
  const { level } = useSelector((state) => state.TictacReducer);

  useEffect(() => {
    if (level) {
      dispatch(changeRoute("game"));
    }
  }, [level]);

  return (
    <div className={style.poster}>
      <span className={style.level} onClick={() => dispatch(setLevel("low"))}>
        Easy
      </span>
      <span className={style.level} onClick={() => dispatch(setLevel("high"))}>
        Hard
      </span>
    </div>
  );
}

export default LevelSelector;
