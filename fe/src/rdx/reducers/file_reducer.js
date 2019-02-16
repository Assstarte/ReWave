import {
  PRELOAD_INFO_INIT,
  PRELOAD_INFO_SUCCESS,
  SHOW_TAGS_FORM,
  DISMISS_ERRORS,
  DISMISS_SUCCESS
} from "../actions/types";

const initialState = {
  request_pending: true,
  request_error: false,
  request_done: false,
  title: null,
  artist: null,
  album: null,
  year: null,
  composer: null,
  cover: null,
  show_tags_form: false
};

export default function(state = initialState, action) {
  let tags = action.payload;
  switch (action.type) {
    case PRELOAD_INFO_INIT:
      return {
        ...state,
        request_pending: true,
        request_done: false,
        request_error: false
      };
    case PRELOAD_INFO_SUCCESS:
      console.dir(tags);
      return {
        ...state,
        title: tags.title || null,
        artist: tags.artist || null,
        album: tags.album || null,
        year: tags.year || null,
        composer: tags.composer || null,
        cover: action.cover ? action.cover : false,
        request_error: false,
        request_pending: false,
        request_done: true,
        show_tags_form: false
      };

    case SHOW_TAGS_FORM:
      return {
        ...state,
        show_tags_form: true
      };

    case DISMISS_ERRORS:
      return {
        ...state,
        request_done: false,
        request_pending: false,
        request_error: false
      };

    case DISMISS_SUCCESS:
      return {
        ...state,
        request_done: false,
        request_pending: false,
        request_error: false
      };

    default:
      return state;
  }
}
