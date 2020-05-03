import { combineReducers } from "redux";
import recommendations from "./recommendations";
import groups from "./groups";


const rootReducers = combineReducers({ recommendations, groups });

export default rootReducers;
