import { takeEvery, put, select } from "redux-saga/effects";
import firebase from "../firebase";
import { intialStatus } from "../loader";
import store from "../index";

import {
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  START_GAME,
  setOnlineOption,
} from "./tictac.action";

export function* createRoom(action) {
  try {
    const state = yield select();
    const { player1 } = state.TictacReducer;
    firebase
      .firestore()
      .collection("gameStore")
      .add({
        player1: player1,
        player2: "",
        status: intialStatus,
        gameCount: {
          result: [],
          steps: -1,
        },
      })
      .then((doc) => {
        store.dispatch({ type: CREATE_ROOM_SUCCESS, payload: doc.id });
      });
    yield put(setOnlineOption("create"));
  } catch (error) {
    yield put({ type: CREATE_ROOM_FAIL, payload: error });
  }
}
export function* doJoinRoom(action) {
  try {
    const state = yield select();
    const { player2 } = state.TictacReducer;
    console.log(action.payload);
    const database = firebase
      .firestore()
      .collection("gameStore")
      .doc(action.payload);
    database.get().then((doc) => {
      const data = doc.data();
      if (data) {
        if (data.player2 === "") {
          database.update({ player2 });
          store.dispatch({
            type: JOIN_ROOM_SUCCESS,
            payload: { player1: data.player1, gameId: action.payload },
          });
        } else {
          store.dispatch({ type: JOIN_ROOM_FAIL, payload: "Room Full" });
        }
      } else {
        store.dispatch({ type: JOIN_ROOM_FAIL, payload: "Invalid code" });
      }
    });
    yield put(setOnlineOption("join"));
  } catch (error) {
    yield put({
      type: JOIN_ROOM_FAIL,
      payload: " Server Error",
    });
  }
}

export function* doStartGame(action) {
  try {
    const database = firebase
      .firestore()
      .collection("gameStore")
      .doc(action.payload);
    database.get().then((doc) => {
      const data = doc.data();
      if (data) {
        try {
          database.update({ startGame: true });
        } catch (error) {
          console.log(error);
        }
      }
    });
    yield;
  } catch (error) {
    console.log(error);
  }
}

export default function* TictacSaga() {
  yield takeEvery(CREATE_ROOM, createRoom);
  yield takeEvery(JOIN_ROOM, doJoinRoom);
  yield takeEvery(START_GAME, doStartGame);
}
