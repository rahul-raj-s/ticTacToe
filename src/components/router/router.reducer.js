import { CHANGE_ROUTE } from "./router.action";

const initialState = {
  route: "home",
};

const RouterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        route: action.payload,
      };

    default:
      return state;
  }
};

export default RouterReducer;
