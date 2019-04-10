import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
    REQUEST_ALL_UPLOADED_TRACKS,
    SET_TRACKS,
    DATA_REQUEST_FAILURE,
    INIT_SEARCH
} from "../actions/types";
import { gql } from "../../constants";

export function* do_request_all_uploaded_tracks_saga() {
    const GQL = `
    query{
        exec_get_own_multiple_tracks{
          tracks{
            id
          public
          title
          artist
          avg_rating
          file_name
          friendly_file_name
          cover_name
          owner_id
          tagCollection{
            title
            artist
            album
            year
            composer
            imageType
          }
          }
          
        }
      }
  `;

  try{
    const data = yield call([gql, gql.request], GQL);
    yield put({
        type: SET_TRACKS,
        payload: data.exec_get_own_multiple_tracks.tracks
    })
  } catch(e){
    yield put({
        type: DATA_REQUEST_FAILURE,
        payload: e.message
    })
  }

}


export function* do_submit_search_saga( action ) {
  const GQL = `
  query search{exec_search (query: "${action.payload.query}"){
    tracks{
      
      id
      title
      artist
      
      public
      avg_rating
      file_name
      friendly_file_name
      cover_name
      owner_id
      tagCollection{
        title
        artist
        album
        year
        composer
        imageType
      }
      
    }
  }}
`;

try{
  const data = yield call([gql, gql.request], GQL);
  yield put({
      type: SET_TRACKS,
      payload: data.exec_search.tracks
  })
} catch(e){
  yield put({
      type: DATA_REQUEST_FAILURE,
      payload: e.message
  })
}

}

export default function* watch_data_saga() {
  yield takeLatest(REQUEST_ALL_UPLOADED_TRACKS, do_request_all_uploaded_tracks_saga);
  yield takeLatest(INIT_SEARCH, do_submit_search_saga);
}
