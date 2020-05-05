import {
  SET_MODE,
  SET_PLAYER1,
  SET_PLAYER2,
  SET_LEVEL,
  RESET_GAME,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  SET_ONLINE_OPTION,
  START_GAME,
} from "./tictac.action";

const initialState = {};
const TictacReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case SET_PLAYER1:
      return {
        ...state,
        player1: action.payload,
      };
    case SET_PLAYER2:
      return {
        ...state,
        player2: action.payload,
      };
    case SET_LEVEL:
      return {
        ...state,
        level: action.payload,
      };
    case CREATE_ROOM:
      return {
        ...state,
      };
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        gameId: action.payload,
      };
    case CREATE_ROOM_FAIL:
      return {
        ...state,
        gameId: action.payload,
      };
    case JOIN_ROOM:
      return {
        ...state,
        player2: state.player1,
      };
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        player1: action.payload.player1,
        gameId: action.payload.gameId,
      };
    case JOIN_ROOM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SET_ONLINE_OPTION:
      return {
        ...state,
        onlineOption: action.payload,
      };
    case RESET_GAME:
      return { ...state };
    case START_GAME:
      return { ...state };
    default:
      return state;
  }
};

export default TictacReducer;
