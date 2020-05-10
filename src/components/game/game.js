/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boxes, intialStatus } from "../../loader";
import firebase from "../../firebase";
import gameChecker from "../../gameChecker";
import computerPlayer from "../../ComputerPlayer";
import { getLine } from "../lineGenerator/lineGenerator";
import Box from "../box";
import style from "./game.module.css";
import commonStyle from "../../commonStyle.module.css";
import { RESET_GAME } from "../../redux/tictac.action";
import { changeRoute } from "../../components/router/router.action";

function Game(props) {
  const [status, setStatus] = useState(intialStatus);
  const [gameCount, setGameCount] = useState({ result: [], steps: -1 });
  const [line, setLine] = useState(false);
  const dispatch = useDispatch();
  const { player1, player2, mode, level, gameId, onlineOption } = useSelector(
    (state) => state.TictacReducer
  );
  const database = gameId
    ? firebase.firestore().collection("gameStore").doc(gameId)
    : null;
  // To calculate result
  useEffect(() => {
    if (gameCount.result.length > 0) {
      setLine(getLine(gameCount.result));
    }
  }, [gameCount.result]);

  // Computer move
  useEffect(() => {
    if (
      mode === "PC" &&
      gameCount.result.length === 0 &&
      gameCount.steps % 2 === 1 &&
      gameCount.steps < 9
    ) {
      let nextMove = computerPlayer(status, gameCount.steps, level);
      setTimeout(() => setClick(nextMove), 500);
    }
  }, [gameCount]);

  useEffect(() => {
    let response = gameChecker(status);
    if (response) {
      if (mode === "OP" && gameCount.result.length === 0) {
        database.update({
          gameCount: { ...gameCount, result: response },
        });
      } else {
        setGameCount((prevGameCount) => ({
          ...prevGameCount,
          result: response,
        }));
      }
    } else {
      if (mode !== "OP") {
        setGameCount((prevGameCount) => ({
          ...prevGameCount,
          steps: prevGameCount.steps + 1,
        }));
      }
    }
  }, [status]);

  // To sync app with database
  useEffect(() => {
    if (mode === "OP") {
      try {
        return firebase
          .firestore()
          .collection("gameStore")
          .doc(gameId)
          .onSnapshot((snapshot) => {
            const newData = snapshot.data();
            setStatus(newData.status);
            setGameCount(newData.gameCount);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const setClick = (id) => {
    let newMove = [...status.opponentsMove];
    if (mode === "PC" && gameCount.steps % 2 === 0) {
      newMove = [...status.opponentsMove];
      newMove.push(id);
    }
    if (mode === "OP") {
      database.get().then((doc) => {
        const data = doc.data();
        if (data) {
          try {
            database.update({
              status: {
                ...status,
                [id]: status.term,
                term: status.term === "O" ? "X" : "O",
              },
              gameCount: { ...gameCount, steps: gameCount.steps + 1 },
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    } else {
      setStatus((prevStatus) => ({
        ...prevStatus,
        [id]: prevStatus.term,
        term: prevStatus.term === "O" ? "X" : "O",
        opponentsMove: [...newMove],
      }));
    }
  };

  const restartGame = () => {
    setStatus({ ...intialStatus, computersMove: [], opponentsMove: [] });
    setGameCount({ result: [], steps: -1 });
  };
  console.log(gameCount.steps);
  return (
    <div className={style.gameContainer}>
      {!(gameCount.result.length > 0 || gameCount.steps >= 9) && (
        <div className={style.moveTracker}>
          <div
            className={
              status.term === "O" ? style.playerNameActive : style.playerName
            }
          >
            {player1}
          </div>
          <div
            className={
              status.term === "O" ? style.playerName : style.playerNameActive
            }
          >
            {player2}
          </div>
        </div>
      )}
      {(gameCount.result.length > 0 ||
        gameCount.steps >= 9 ||
        (mode === "OP" && gameCount.steps >= 8)) && (
        <div
          className={
            gameCount.result.length > 0 || gameCount.steps >= 9
              ? style.gameDetailsActive
              : style.gameDetails
          }
        >
          {gameCount.result.length > 0
            ? `${status.term === "O" ? player2 : player1} win`
            : (gameCount.steps >= 9 ||
                (mode === "OP" && gameCount.steps >= 8)) &&
              "Draw"}
        </div>
      )}
      <div className={style.svgContainer}>
        {gameCount.result.length > 0 && line && (
          <svg viewBox="0 0 6 6" className={style.line}>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              style={{ stroke: "green", strokeWidth: "0.05" }}
            />
          </svg>
        )}

        <div className={style.boxContainer}>
          {boxes.map((item) => (
            <Box
              id={item}
              key={item}
              handleClick={(id) => setClick(id)}
              term={status[item]}
              gameLock={
                gameCount.result.length > 0 ||
                (mode === "PC" && gameCount.steps % 2 === 1) ||
                (mode === "OP" &&
                  onlineOption === "join" &&
                  (gameCount.steps % 2 === 1 || gameCount.steps === -1)) ||
                (mode === "OP" &&
                  onlineOption === "create" &&
                  gameCount.steps % 2 === 0)
              }
              active={gameCount.result.includes(item)}
            />
          ))}
        </div>
      </div>
      <div className={style.btnContainer}>
        <button
          variant="info"
          className={commonStyle.btn}
          onClick={() => restartGame()}
        >
          New Game
        </button>
        <button
          variant="info"
          className={commonStyle.btn}
          onClick={() => {
            dispatch({ type: RESET_GAME });
            dispatch(changeRoute("home"));
          }}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}

export default memo(Game);
