import { fork } from "redux-saga/effects";
import TictacSaga from "./tictac.saga";

export default function* rootSaga() {
  yield fork(TictacSaga);
}
