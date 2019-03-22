import {
  REQUEST_ALL_UPLOADED_TRACKS, SET_TRACKS, SET_PLAYER_TRACK_PLAYBACK
} from "../actions/types";

const initialState = {
  tracks: [],
  currentTrackPlayback: "",
  currentTrackCover: ""
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
        currentTrackPlayback: action.payload.playback,
        currentTrackCover: action.payload.cover
      }

    default:
      return state;
  }
}
