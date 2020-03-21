import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import style from "./login.module.css";

function Login(props) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handlePlayer1 = event => {
    setPlayer1(event.target.value);
  };

  const handlePlayer2 = event => {
    setPlayer2(event.target.value);
  };

  return (
    <div className={style.loginContainer}>
      <label>First Player name</label>
      <input
        className={style.input}
        value={player1}
        onChange={event => handlePlayer1(event)}
      />
      <label>Second Player name</label>
      <input
        className={style.input}
        value={player2}
        onChange={event => handlePlayer2(event)}
      />
      <Button
        size="lg"
        onClick={() => props.onLogin({ player1: player1, player2: player2 })}
      >
        Start
      </Button>
    </div>
  );
}

export default Login;
