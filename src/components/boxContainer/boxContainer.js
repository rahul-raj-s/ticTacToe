import React, { memo, useState, useEffect } from "react";
import { boxes, intialStatus } from "../../loader";
import gameChecker from "../../gameChecker";
import { Reload } from "react-bytesize-icons";
import Box from "../box";
import style from "./boxContainer.module.css";

function BoxContainer({ players, ...props }) {
  const [status, setStatus] = useState(intialStatus);
  const [result, setResult] = useState([]);
  let player1 = players.player1 || "Player1";
  let player2 = players.player2 || "Player2";
  useEffect(() => {
    let response = gameChecker(status);
    if (response) {
      setResult(response);
    }
  }, [status]);

  const setClick = id => {
    setStatus(prevStatus => ({
      ...prevStatus,
      [id]: prevStatus.term,
      term: prevStatus.term === "O" ? "X" : "O",
      steps: prevStatus.steps + 1
    }));
  };

  const restartGame = () => {
    //Switch the term of player
    let switchPlayer = player1;
    player1 = player2;
    player2 = switchPlayer;
    setStatus(intialStatus);
    setResult([]);
  };

  return (
    <>
      {result.length > 0 ? (
        <div className={style.gameDetails}>
          <span className={style.userInfo}>
            {status.term === "O" ? player2 : player1}
            {" you Won"}
          </span>
          <div className={style.reload} onClick={restartGame}>
            <Reload />
          </div>
        </div>
      ) : (
        <div className={style.gameDetails}>
          <span className={style.userInfo}>
            {status.steps >= 9
              ? "Game Draw"
              : `${status.term === "O" ? player1 : player2} your turn...`}
          </span>

          <div className={style.reload} onClick={restartGame}>
            <Reload />
          </div>
        </div>
      )}
      <div className={style.boxContainer}>
        {boxes.map(item => (
          <Box
            id={item}
            key={item}
            handleClick={id => setClick(id)}
            gameLock={result.length > 0}
            term={status[item]}
            active={result.includes(item)}
          />
        ))}
      </div>
    </>
  );
}

export default memo(BoxContainer);
