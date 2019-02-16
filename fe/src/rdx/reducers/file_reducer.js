import { PRELOAD_INFO_INIT, PRELOAD_INFO_SUCCESS } from "../actions/types";

const initialState = {
  request_pending: true,
  request_error: false,
  request_done: false,
  title: null,
  artist: null,
  album: null,
  year: null,
  composer: null,
  cover: null
};

export default function(state = initialState, action) {
  let tags = action.payload;
  switch (action.type) {
    case PRELOAD_INFO_SUCCESS:
      return {
        ...state,
        title: tags.title || null,
        artist: tags.artist || null,
        album: tags.album || null,
        year: tags.year || null,
        composer: tags.composer || null,
        cover: action.cover ? action.cover : false,
        error: false
      };

    default:
      return state;
  }
}
