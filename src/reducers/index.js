import { combineReducers } from "redux";
import { fetchLaunches } from "./reducer-launches";

const allReducers = combineReducers({
  // routes,
  launches: fetchLaunches,
});

export default allReducers;