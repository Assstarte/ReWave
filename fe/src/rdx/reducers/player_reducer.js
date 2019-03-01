import {
    SET_PLAYER_TRACK_PLAYBACK, SET_PLAYER_TRACK_COVER, STOP_PLAYER, PLAY_PLAYER
  } from "../actions/types";
  
  const initialState = {
    currentTrackPlayback: "",
    currentTrackCover: "",
    isPlaying: false,
    currentTrackId: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

    case SET_PLAYER_TRACK_PLAYBACK:
      return{
        ...state,
        currentTrackPlayback: action.payload.playback,
        currentTrackCover: action.payload.cover,
        currentTrackId: action.payload.id,
        isPlaying: true
      }

    case STOP_PLAYER:
      return{
          ...state,
          isPlaying: false
      }

    case PLAY_PLAYER:
      return{
          ...state,
          isPlaying: true
      }
  
      default:
        return state;
    }
  }
  