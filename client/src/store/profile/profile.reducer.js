import { PROFILE_ACTION_TYPES } from "./profile.types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {}
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_ACTION_TYPES.GET_PROFILE:
      return { ...state, profile: payload, isLoading: false };
    case PROFILE_ACTION_TYPES.PROFILE_ERROR:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
