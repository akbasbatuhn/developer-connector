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
      type: POST_ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};
