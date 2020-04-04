import React, { memo, useState, useEffect } from "react";
import { boxes, intialStatus } from "../../loader";
import gameChecker from "../../gameChecker";
import computerPlayer from "../../ComputerPlayer";
import { Reload } from "react-bytesize-icons";
import Box from "../box";
import style from "./boxContainer.module.css";

function BoxContainer({ players, mode, level, ...props }) {
  const [status, setStatus] = useState(intialStatus);
  const [gameCount, setGameCount] = useState({ result: [], steps: -1 });

  let player1 = players.player1 || "Player1";
  let player2 = players.player2 || "Player2";

  useEffect(() => {
    if (
      mode === "1" &&
      gameCount.result.length === 0 &&
      gameCount.steps % 2 === 1 &&
      gameCount.steps < 9
    ) {
      let nextMove = computerPlayer(status, gameCount.steps, level);
      setTimeout(() => setClick(nextMove), 1000);
    }
  }, [gameCount]);
  useEffect(() => {
    let response = gameChecker(status);
    if (response) {
      setGameCount(prevGameCount => ({ ...prevGameCount, result: response }));
    } else {
      setGameCount(prevGameCount => ({
        ...prevGameCount,
        steps: prevGameCount.steps + 1
      }));
    }
  }, [status]);
  useEffect(() => {}, []);

  const setClick = id => {
    let newMove = [...status.opponentsMove];
    if (mode === "1" && gameCount.steps % 2 === 0) {
      newMove = [...status.opponentsMove];
      newMove.push(id);
    }
    setStatus(prevStatus => ({
      ...prevStatus,
      [id]: prevStatus.term,
      term: prevStatus.term === "O" ? "X" : "O",
      opponentsMove: [...newMove]
    }));
  };

  const restartGame = () => {
    //Switch the term of player
    let switchPlayer = player1;
    player1 = player2;
    player2 = switchPlayer;
    setStatus({ ...intialStatus, computersMove: [], opponentsMove: [] });
    setGameCount({ result: [], steps: -1 });
  };

  return (
    <div className={style.gameContainer}>
      {gameCount.result.length > 0 ? (
        <div className={style.gameDetails}>
          <span className={style.userInfo}>
            {`${status.term === "O" ? player2 : player1} win`}
          </span>
          <div className={style.reload} onClick={restartGame}>
            <Reload />
          </div>
        </div>
      ) : (
        <div className={style.gameDetails}>
          <span className={style.userInfo}>
            {gameCount.steps >= 9
              ? "Game Draw"
              : `${status.term === "O" ? player1 : player2}'s turn...`}
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
            term={status[item]}
            gameLock={
              gameCount.result.length > 0 ||
              (mode === "1" && gameCount.steps % 2 === 1)
            }
            active={gameCount.result.includes(item)}
          />
        ))}
      </div>
      <footer className={style.footer}>Version 2.0.2</footer>
    </div>
  );
}

export default memo(BoxContainer);
