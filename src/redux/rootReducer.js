import { combineReducers } from "redux";
import TictacReducer from "./tictac.reducer";
import RouterReducer from "../components/router";

const RootReducer = combineReducers({
  TictacReducer,
  RouterReducer,
});

export default RootReducer;
