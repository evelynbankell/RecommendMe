import { combineReducers } from "redux";
import recommendations from "./recommendations";
import groups from "./groups";
import user from "./users";


const rootReducers = combineReducers({ recommendations, groups, user });

export default rootReducers;
