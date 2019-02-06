const initialState = {
  title: null,
  description: null,
  artist: null,
  album: null,
  year: null,
  composer: null,
  cover: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
