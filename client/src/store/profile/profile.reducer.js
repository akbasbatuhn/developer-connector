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
    case PROFILE_ACTION_TYPES.UPDATE_PROFILE:
    case PROFILE_ACTION_TYPES.GET_PROFILE:
      return { ...state, profile: payload, isLoading: false };
    case PROFILE_ACTION_TYPES.GET_ALL_PROFILES:
      return { ...state, profiles: payload, isLoading: false };
    case PROFILE_ACTION_TYPES.PROFILE_ERROR:
      return { ...state, error: payload, isLoading: false, profile: null };
    case PROFILE_ACTION_TYPES.CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], isLoading: false };
    case PROFILE_ACTION_TYPES.GET_REPOS:
      return { ...state, repos: payload, isLoading: false };
    default:
      return state;
  }
};
