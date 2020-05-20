import { combineReducers } from "redux";
import recommendationsReducer from "./recommendations";
import groupsReducer from "./groups";
import userReducer from "./users";
import chatPostsReducer from "./chatPosts";

const rootReducer = combineReducers({
  recommendations: recommendationsReducer,
  groups: groupsReducer,
  user: userReducer,
  chat_posts: chatPostsReducer
});

export default rootReducer;
