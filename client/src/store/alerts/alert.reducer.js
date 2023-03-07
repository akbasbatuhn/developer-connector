import { ALERT_ACTION_TYPES } from "./alert.types";

const initialState = [];

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALERT_ACTION_TYPES.SET_ALERT:
      return [...state, payload];
    case ALERT_ACTION_TYPES.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};
