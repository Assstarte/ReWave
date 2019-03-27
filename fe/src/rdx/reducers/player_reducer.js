import {
  SET_PLAYER_TRACK_PLAYBACK, SET_PLAYER_TRACK_COVER, STOP_PLAYER, PLAY_PLAYER, INIT_QUEUE
} from "../actions/types";

const initialState = {
  currentTrackPlayback: "",
  currentTrackCover: "",
  isPlaying: false,
  currentTrackId: null,
  isPaused: false,
  queue: []
};

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_PLAYER_TRACK_PLAYBACK:
      return {
        ...state,
        currentTrackPlayback: action.payload.playback,
        currentTrackCover: action.payload.cover,
        currentTrackId: action.payload.id,
        isPlaying: true,
        isPaused: false
      }

    case STOP_PLAYER:
      return {
        ...state,
        isPlaying: false,
        isPaused: true
      }

    case PLAY_PLAYER:
      return {
        ...state,
        isPlaying: true,
        isPaused: false
      }

    case INIT_QUEUE:
      let items = action.payload.tracksArray;
      let currId = action.payload.currentId;
      let queue = [];
      for (let i = currId; i < items.length; i++) {
        queue.push(items[i]);
      }
      console.dir(queue);
      return {
        ...state,
        queue
      }

    default:
      return state;
  }
}
