import { v4 as uuidv4 } from "uuid";
import { ALERT_ACTION_TYPES } from "./alert.types";

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: ALERT_ACTION_TYPES.SET_ALERT,
      payload: { msg, alertType, id }
    });

    setTimeout(
      () => dispatch({ type: ALERT_ACTION_TYPES.REMOVE_ALERT, payload: id }),
      timeout
    );
  };
