import { FETCH_CHAT_POSTS_BEGIN, FETCH_CHAT_POSTS_SUCCESS,
  FETCH_CHAT_POSTS_FAILURE, ADD_CHAT_POST}
  from "../actionTypes";

export function addChatPost(chat_posts) {
    return {
        type: ADD_CHAT_POST,
        chat_posts: {
          content: chat_posts.content
        }
    }
}


export function fetchChatPostsBegin() {
    return {
        type: FETCH_CHAT_POSTS_BEGIN
    }
}

export function fetchGroupChatPostsSuccess(chat_posts) {
    return {
        type: FETCH_CHAT_POSTS_SUCCESS,
        payload: {
          chat_posts: chat_posts
        }
    }
}



export function fetchChatPostsFailure(error) {
    return {
        type: FETCH_CHAT_POSTS_FAILURE,
        error: error
    }
}
