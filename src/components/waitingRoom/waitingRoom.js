import React, { useRef, useEffect } from "react";
import { Clipboard } from "react-bytesize-icons";
import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  JOIN_ROOM_FAIL,
  START_GAME,
  setPlayer2,
} from "../../redux/tictac.action";
import { changeRoute } from "../router/router.action";
import firebase from "../../firebase";
import style from "./waitingRoom.module.css";

function WaitingRoom(props) {
  const { gameId, onlineOption } = useSelector((state) => state.TictacReducer);
  const textAreaRef = useRef(null);
  const { player1, player2, error } = useSelector(
    (state) => state.TictacReducer
  );
  const dispatch = useDispatch();
  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    //setCopySuccess("Copied!");
  };

  useEffect(() => {
    try {
      return firebase
        .firestore()
        .collection("gameStore")
        .onSnapshot((snapshot) => {
          for (let i = 0; i < snapshot.docs.length; i++) {
            if (snapshot.docs[i].id === gameId) {
              const newData = snapshot.docs[i].data();
              if (onlineOption === "create") {
                dispatch(setPlayer2(newData.player2));
              } else if (onlineOption === "join" && newData.startGame) {
                dispatch(changeRoute("game"));
              }
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const startGame = () => {
    if (player1 && player2) {
      dispatch({ type: START_GAME, payload: gameId });
      dispatch(changeRoute("game"));
    } else {
      console.log("Wait to join another player");
    }
  };

  return (
    <div className={style.waitingRoomCotainer}>
      {error && (
        <Modal.Dialog>
          <Modal.Body>
            <p>{`Sorry ${error}`}</p>
            <Button
              onClick={() => dispatch({ type: JOIN_ROOM_FAIL, payload: false })}
            >
              close
            </Button>
          </Modal.Body>
        </Modal.Dialog>
      )}
      {!error && (
        <>
          {" "}
          <div className={style.roomCodeCotainer}>
            <span>
              Room Code:
              <input
                ref={textAreaRef}
                value={gameId}
                readOnly
                className={style.textarea}
              />
            </span>
            <span onClick={copyToClipboard}>
              <Clipboard height="25px" width="25px" />
            </span>
            <p>Share this room code with friend and ask them to join</p>
          </div>
          <div className={style.waitingPlayerContainer}>
            <span>{player1}</span>
            <span className={style.vsContainer}>VS</span>
            <span>{player2}</span>
          </div>
          {onlineOption === "create" && (
            <button
              className={style.startGameBtn}
              onClick={startGame}
              // onClick={() =>
              //   dispatch({
              //     type: JOIN_ROOM_FAIL,
              //     payload: "We are working on this feature will availiable soon",
              //   })
              // }
            >
              Start Game
            </button>
          )}
          {onlineOption === "join" && <div>{player1} will start the game</div>}
        </>
      )}
    </div>
  );
}

export default WaitingRoom;
