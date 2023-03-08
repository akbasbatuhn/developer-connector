import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload
      };

    case USER_ACTION_TYPES.LOGIN_SUCCESS:
    case USER_ACTION_TYPES.REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true, isLoading: false };

    case USER_ACTION_TYPES.LOGIN_FAILED:
    case USER_ACTION_TYPES.AUTH_ERROR:
    case USER_ACTION_TYPES.REGISTER_FAILED:
    case USER_ACTION_TYPES.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
};
