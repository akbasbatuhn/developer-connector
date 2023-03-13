import axios from "axios";

import setAuthToken from "../../utils/user.utils";

import { setAlert } from "../alerts/alert.action";
import { deleteProfile } from "../profile/profile.actions";
import { PROFILE_ACTION_TYPES } from "../profile/profile.types";
import { USER_ACTION_TYPES } from "./user.types";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_ACTION_TYPES.USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_ACTION_TYPES.AUTH_ERROR
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: USER_ACTION_TYPES.REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: USER_ACTION_TYPES.REGISTER_FAILED
      });
    }
  };

// Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: USER_ACTION_TYPES.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: USER_ACTION_TYPES.LOGIN_FAILED
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: PROFILE_ACTION_TYPES.CLEAR_PROFILE
  });
  dispatch({
    type: USER_ACTION_TYPES.LOGOUT
  });
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/users");

      dispatch(logout());

      dispatch({
        type: USER_ACTION_TYPES.DELETE_ACCOUNT
      });

      dispatch(deleteProfile());

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (error) {
      dispatch({
        type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
        payload: { msg: error.response.data.msg, status: error.response.status }
      });
    }
  }
};
