const SET_MODE = "SET_MODE";
const SET_PLAYER2 = "SET_PLAYER2";
const SET_PLAYER1 = "SET_PLAYER1";
const SET_LEVEL = "SET_LEVEL";
const RESET_GAME = "RESET_GAME";
const CREATE_ROOM = "CREATE_ROOM";
const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
const CREATE_ROOM_FAIL = "CREATE_ROOM_FAIL";
const JOIN_ROOM = "JOIN_ROOM";
const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
const JOIN_ROOM_FAIL = "JOIN_ROOM_FAIL";

const setMode = (state) => ({
  type: SET_MODE,
  payload: state,
});
const setPlayer2 = (state) => ({
  type: SET_PLAYER2,
  payload: state,
});

const setLevel = (state) => ({
  type: SET_LEVEL,
  payload: state,
});
const createRoom = (state) => ({
  type: CREATE_ROOM,
  payload: state,
});
const joinRoom = (state) => ({
  type: JOIN_ROOM,
  payload: state,
});
const setPlayer1 = (state) => ({ type: SET_PLAYER1, payload: state });

export {
  setMode,
  setLevel,
  setPlayer1,
  setPlayer2,
  createRoom,
  joinRoom,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  SET_LEVEL,
  SET_MODE,
  SET_PLAYER1,
  SET_PLAYER2,
  RESET_GAME,
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
};
