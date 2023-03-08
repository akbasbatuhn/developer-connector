import { combineReducers } from "redux";
import { alertReducer } from "./alerts/alert.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  alertReducer,
  userReducer
});
