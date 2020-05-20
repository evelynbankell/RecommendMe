import {
  FETCH_CHAT_POSTS_BEGIN,
  FETCH_CHAT_POSTS_SUCCESS,
  FETCH_CHAT_POSTS_FAILURE,
  ADD_CHAT_POST
} from "../actionTypes";


const initialState = {
  pending: false,
  chat_posts: [],
  error: null
}


export default function ChatPostsReducer(state = initialState, action) {
  switch (action.type) {


    case FETCH_CHAT_POSTS_BEGIN:
      return {
        ...state,
        pending: true
      }

    case FETCH_CHAT_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        chat_posts: action.payload.chat_posts
      }

    case FETCH_CHAT_POSTS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }

      case ADD_CHAT_POST:
        console.log("add chat");
        return {
          ...state,
          pending: false,
          chat_posts: {
            content: action.chat_posts.content,
            createdBy: action.chat_posts.createdBy
          }
        }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

export const getChatPosts = state => state.chat_posts.chat_posts;
export const getChatPostsPending = state => state.pending;
export const getChatPostsError = state => state.error;
