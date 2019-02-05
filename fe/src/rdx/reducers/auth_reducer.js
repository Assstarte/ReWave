import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "../actions/types";

const initialState = {
  loggedIn: false,
  request_pending: false,
  request_error: false,
  request_done: false,
  user_id: null,
  user_name: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: false,
        request_pending: true,
        request_error: false,
        request_done: false,
        user_id: null,
        user_name: null
      };

    case LOGIN_REQUEST_SUCCESS:
      let server_response = action.payload;
      //SUCCESS
      if (server_response.loggedIn === true) {
        return {
          ...state,
          loggedIn: true,
          request_pending: false,
          request_error: false,
          request_done: true,
          user_id: server_response.id,
          user_name: server_response.login
        };
      }
      //ERROR
      else {
        return {
          ...state,
          loggedIn: false,
          request_pending: false,
          request_error: true,
          request_done: true,
          user_id: null,
          user_name: null
        };
      }

    default:
      return state;
  }
}
