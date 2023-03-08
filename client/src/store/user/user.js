import axios from "axios";

import { setAlert } from "../alerts/alert";
import { USER_ACTION_TYPES } from "./user.types";

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
