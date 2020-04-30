import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import style from "./onlineOptions.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATE_ROOM,
  JOIN_ROOM_FAIL,
  joinRoom,
} from "../../redux/tictac.action";
import commonStyle from "../../commonStyle.module.css";
import { changeRoute } from "../router/router.action";

function OnlineOptions(props) {
  const [createGame, setCreateGame] = useState(true);
  const [localId, setLocalId] = useState("");
  const { gameId, error } = useSelector((state) => state.TictacReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameId) {
      dispatch(changeRoute("waitingroom"));
    }
  }, [gameId]);

  const toggleMode = () => {
    setCreateGame((prevState) => !prevState);
  };
  const validateGameId = () => {
    if (localId.length < 5) {
      dispatch({ type: JOIN_ROOM_FAIL, payload: "Not a valid Code" });
    } else dispatch(joinRoom(localId));
  };
  return (
    <>
      <div className={style.modeOptionContainer}>
        <div
          onClick={createGame ? () => {} : toggleMode}
          className={createGame ? style.modeOptionActive : style.modeOption}
        >
          Create
        </div>
        <div
          onClick={createGame ? toggleMode : () => {}}
          className={createGame ? style.modeOption : style.modeOptionActive}
        >
          Join
        </div>
      </div>
      <div className={style.infoContainer}>
        {createGame ? (
          <>
            {error && (
              <Modal.Dialog>
                <Modal.Body>
                  <p>{`Sorry$ {error}`}</p>
                  <Button
                    onClick={() =>
                      dispatch({ type: JOIN_ROOM_FAIL, payload: false })
                    }
                  >
                    close
                  </Button>
                </Modal.Body>
              </Modal.Dialog>
            )}
            {!error && (
              <button
                variant="info"
                className={[commonStyle.btn]}
                onClick={() => dispatch({ type: CREATE_ROOM })}
              >
                Create Room
              </button>
            )}
          </>
        ) : (
          <>
            {error && (
              <Modal.Dialog>
                <Modal.Body>
                  <p>{`Oops... ${error}`}</p>
                  <Button
                    onClick={() =>
                      dispatch({ type: JOIN_ROOM_FAIL, payload: false })
                    }
                  >
                    close
                  </Button>
                </Modal.Body>
              </Modal.Dialog>
            )}
            {!error && (
              <>
                <input
                  value={gameId}
                  onChange={(event) => setLocalId(event.target.value)}
                  className={commonStyle.input}
                  placeholder=" Enter Private Code..."
                />
                <div>{error}</div>
                <button className={commonStyle.btn} onClick={validateGameId}>
                  Join Room
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default OnlineOptions;
