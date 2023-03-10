import axios from "axios";

import { PROFILE_ACTION_TYPES } from "./profile.types";
import { setAlert } from "../alerts/alert.action";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: PROFILE_ACTION_TYPES.GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/profile", formData);

      dispatch({
        type: PROFILE_ACTION_TYPES.GET_PROFILE,
        payload: res.data
      });

      const alertMessage = edit ? "Profile Updated" : "Profile Created";
      dispatch(setAlert(alertMessage, "success"));
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
        payload: { msg: error.response.data.msg, status: error.response.status }
      });
    }
  };
