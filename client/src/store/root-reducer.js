import { combineReducers } from "redux";
import { alertReducer } from "./alerts/alert.reducer";
import { userReducer } from "./user/user.reducer";
import { profileReducer } from "./profile/profile.reducer";
import { postReducer } from "./post/post.reducer";

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: userReducer,
  profile: profileReducer,
  post: postReducer
});
