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

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({
    type: PROFILE_ACTION_TYPES.CLEAR_PROFILE
  });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: PROFILE_ACTION_TYPES.GET_ALL_PROFILES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Get profile by ID
export const getAllProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: PROFILE_ACTION_TYPES.GET_ALL_PROFILES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: PROFILE_ACTION_TYPES.GET_REPOS,
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
  (formData, edit = false) =>
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

// Add experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/experience", formData);

    dispatch({
      type: PROFILE_ACTION_TYPES.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience added", "success"));
    return res.data;
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

// Add education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/education", formData);

    dispatch({
      type: PROFILE_ACTION_TYPES.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education added", "success"));
    return res.data;
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

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: PROFILE_ACTION_TYPES.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: PROFILE_ACTION_TYPES.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Delete profile
export const deleteProfile = () => async (dispatch) => {
  try {
    await axios.delete(`/api/profile/`);

    dispatch({
      type: PROFILE_ACTION_TYPES.DELETE_PROFILE
    });

    dispatch(setAlert("Your profile has been permanently deleted"));
  } catch (error) {
    dispatch({
      type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};
