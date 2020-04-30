import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer1, setPlayer2 } from "../../redux/tictac.action";
import commonStyle from "../../commonStyle.module.css";
import style from "./login.module.css";
import { changeRoute } from "../router/router.action";

function Login(props) {
  const { player1, player2, mode } = useSelector(
    (state) => state.TictacReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "PC") {
      dispatch(setPlayer2("Computer"));
    }
  }, []);

  const handlePlayer1 = (event) => {
    dispatch(setPlayer1(event.target.value));
  };
  const handlePlayer2 = (event) => {
    dispatch(setPlayer2(event.target.value));
  };

  const setGame = () => {
    if (!player1) {
      dispatch(setPlayer1("Player1"));
    }
    if (!player2) {
      dispatch(setPlayer2("Player2"));
    }
    if (mode === "PC") {
      dispatch(changeRoute("level"));
    } else if (mode === "NM") {
      dispatch(changeRoute("game"));
    } else if (mode === "OP") {
      dispatch(changeRoute("onlineoptions"));
    }
  };
  return (
    <div className={style.loginContainer}>
      <label className={commonStyle.label}>
        {mode === "OP" || mode === "PC" ? "Enter your name" : "First Player"}
      </label>
      <input
        className={commonStyle.input}
        value={player1}
        onChange={(event) => handlePlayer1(event)}
      />

      {mode === "NM" && (
        <>
          <label className={commonStyle.label}>Second Player</label>
          <input
            className={commonStyle.input}
            value={player2}
            onChange={(event) => handlePlayer2(event)}
            readOnly={mode === "1"}
          />
        </>
      )}
      <button onClick={setGame} variant="info" className={commonStyle.btn}>
        {mode === "OP" || mode === "PC" ? "Next" : "Start"}
      </button>
    </div>
  );
}

export default Login;
