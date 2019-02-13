import { PRELOAD_INFO_INIT, PRELOAD_INFO_SUCCESS } from "../actions/types";

const initialState = {
  title: null,
  artist: null,
  album: null,
  year: null,
  composer: null,
  cover: null,
  error: false
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
        cover: tags.image ? true : false,
        error: false
      };

    default:
      return state;
  }
}
