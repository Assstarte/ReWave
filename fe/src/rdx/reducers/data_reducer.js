import {
  PRELOAD_INFO_INIT,
  PRELOAD_INFO_SUCCESS,
  SHOW_TAGS_FORM,
  DISMISS_ERRORS,
  DISMISS_SUCCESS
} from "../actions/types";

const initialState = {
  tracks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
