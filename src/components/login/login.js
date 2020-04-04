import React, { useState } from "react";
import style from "./login.module.css";

function Login({ mode, ...props }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState(mode === "1" ? "Computer" : "");

  const handlePlayer1 = event => {
    setPlayer1(event.target.value);
  };

  const handlePlayer2 = event => {
    if (mode !== "1") {
      setPlayer2(event.target.value);
    }
  };

  return (
    <div className={style.loginContainer}>
      <label>First Player</label>
      <input
        className={style.input}
        value={player1}
        onChange={event => handlePlayer1(event)}
      />
      <label>Second Player</label>
      {mode === "1" ? (
        <div className={style.input}>{player2}</div>
      ) : (
        <input
          className={style.input}
          value={player2}
          onChange={event => handlePlayer2(event)}
        />
      )}
      <button
        onClick={() =>
          props.onLogin({ player1: player1, player2: player2, mode: { mode } })
        }
        className={style.startButton}
      >
        START
      </button>
    </div>
  );
}

export default Login;
