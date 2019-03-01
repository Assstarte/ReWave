import {
  REQUEST_ALL_UPLOADED_TRACKS, SET_TRACKS, SET_PLAYER_TRACK_PLAYBACK
} from "../actions/types";

const initialState = {
  tracks: [],
  currentTrackPlayback: ""
};

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_TRACKS:
    console.dir("STATE / DATA TRACKS:")
    console.dir(action.payload);
      return {
        ...state,
        tracks: action.payload
      }
    case SET_PLAYER_TRACK_PLAYBACK:
      return{
        ...state,
        currentTrackPlayback: action.payload
      }

    default:
      return state;
  }
}
