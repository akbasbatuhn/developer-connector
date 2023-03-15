import { POST_ACTION_TYPES } from "./post.types";

const INITIAL_STATE = {
  posts: [],
  post: null,
  isLoading: true,
  error: {}
};

export const postReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_ACTION_TYPES.GET_POSTS:
      return { ...state, posts: payload, isLoading: false };
    case POST_ACTION_TYPES.POST_ERROR:
      return { ...state, isLoading: false, error: payload };
    case POST_ACTION_TYPES.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        isLoading: false
      };
    default:
      return state;
  }
};
