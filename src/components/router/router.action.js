const CHANGE_ROUTE = "CHANGE_ROUTE";

const changeRoute = (state) => ({
  type: CHANGE_ROUTE,
  payload: state,
});

export { CHANGE_ROUTE, changeRoute };
