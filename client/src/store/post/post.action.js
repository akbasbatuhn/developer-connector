import axios from "axios";

import { POST_ACTION_TYPES } from "./post.types";
import { setAlert } from "../alerts/alert.action";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: POST_ACTION_TYPES.GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ACTION_TYPES.POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Add like
export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: POST_ACTION_TYPES.UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ACTION_TYPES.POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: POST_ACTION_TYPES.UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ACTION_TYPES.POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: POST_ACTION_TYPES.DELETE_POST,
      payload: postId
    });

    dispatch(setAlert("Post removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/posts/", formData);

    dispatch({
      type: POST_ACTION_TYPES.ADD_POST,
      payload: res.data
    });

    dispatch(setAlert("Post created", "success"));
  } catch (error) {
    dispatch({
      type: POST_ACTION_TYPES.POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};
