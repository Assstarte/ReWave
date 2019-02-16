import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  DISMISS_ERRORS,
  DISMISS_SUCCESS,
  WHOAMI,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS
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
  let server_response;
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
      server_response = action.payload;
      //SUCCESS
      if (server_response.success.done === true) {
        return {
          ...state,
          loggedIn: true,
          request_pending: false,
          request_error: false,
          request_done: true,
          user_id: server_response.userdata.id,
          user_name: server_response.userdata.login
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

    case LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        request_pending: false,
        request_error: true,
        request_done: true
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        request_pending: true,
        request_error: false,
        request_done: false
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        request_pending: false,
        request_error: false,
        request_done: false,
        user_id: null,
        user_name: null
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        request_pending: false,
        request_error: true,
        request_done: true
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        loggedIn: false,
        request_pending: true,
        request_error: false,
        request_done: false,
        user_id: null,
        user_name: null
      };

    case SIGNUP_SUCCESS:
      server_response = action.payload;

      //SUCCESS
      if (server_response.exec_signup.done === true) {
        return {
          ...state,
          loggedIn: false,
          request_pending: false,
          request_error: false,
          request_done: true,
          user_id: null,
          user_name: null
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

    case SIGNUP_FAILURE:
      return {
        ...state,
        request_pending: false,
        request_error: true,
        request_done: true
      };

    case DISMISS_ERRORS:
      return {
        ...state,
        request_error: false,
        request_done: false
      };

    case DISMISS_SUCCESS:
      return {
        ...state,
        request_error: false,
        request_done: false
      };

    case WHOAMI:
      console.dir(action.payload);
      try {
        server_response = JSON.parse(action.payload);
      } catch (e) {
        return {
          ...state
        };
      }

      if (server_response.session === "DENIED")
        return {
          ...state,
          loggedIn: false,
          user_id: null,
          user_name: null
        };
      else
        return {
          loggedIn: true,
          user_id: server_response.id,
          user_name: server_response.login
        };

    default:
      return state;
  }
}
