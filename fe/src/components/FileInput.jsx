import React, { Component } from "react";
import { ProgressBar } from "react-fetch-progressbar";

import { PURE_BACKEND_HOST } from "../constants";

import { AC_PRELOAD_FILE_INFO } from "../rdx/actions";
import { SHOW_TAGS_FORM } from "../rdx/actions/types";
import { connect } from "react-redux";

import { Image } from "react-bootstrap";

import FileInfo from "./FileInfo";
import Header from "./Header";
import AlertSuccessForwardTo from "./bootstrap/AlertSuccessForwardTo";
import AlertErrorDismissable from "./bootstrap/AlertErrorDismissable";

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.file_input_ref = React.createRef();
    this.handleUploadSingle.bind(this);
    this.onFileInputChange.bind(this);
  }

  state = { fileSelected: false };

  render() {
    return (
      <React.Fragment>
        <div className="tc">
          <AlertErrorDismissable
            type="danger"
            heading="Lamentably!"
            message="Error occurred"
            display={this.props.error ? true : false}
          />

          <AlertSuccessForwardTo
            type="success"
            heading="Success!"
            message={`Uploaded Successfully!`}
            btnText="OK >"
            path="/upload"
            display={this.props.done && !this.props.error ? true : false}
            history={this.props.history}
          />
        </div>
        <form
          onSubmit={e => this.handleUploadSingle(e)}
          action="/upload"
          method="post"
          encType="multipart/form-data"
          style={{ marginTop: `30px` }}
        >
          <Image
            src={
              this.props.cover
                ? `${PURE_BACKEND_HOST}/covers/${this.props.cover}`
                : `${PURE_BACKEND_HOST}/covers/nocover.jpg`
            }
            roundedCircle
            style={{ height: `100px`, width: `100px` }}
          />
          <h3>
            {this.file_input_ref.current
              ? this.file_input_ref.current.files[0].name
              : "Please select file"}
          </h3>
          <label htmlFor="track" className="file-input-label pulse">
            ReWave my track >
          </label>

          <input
            ref={this.file_input_ref}
            type="file"
            name="track"
            id="track"
            className="file-input"
            onChange={e => this.onFileInputChange(e)}
          />

          <input
            type="submit"
            className="submit-form fill"
            value="Execute"
            style={{
              display: this.state.fileSelected ? "inline-block" : "none"
            }}
            onClick={e => this.setState({ fileSelected: false })}
          />
        </form>
        <ProgressBar
          className="fetch-progress-bar"
          style={{ backgroundColor: "black", height: "20px", top: `50%` }}
        />

        <FileInfo
          shown={this.props.showTagsForm}
          title={this.props.title ? this.props.title : ""}
          artist={this.props.artist ? this.props.artist : ""}
          album={this.props.album ? this.props.album : ""}
        />
      </React.Fragment>
    );
  }

  async handleUploadSingle(e) {
    e.preventDefault();
    //TODO: preloader
    let file = this.file_input_ref.current.files[0];
    console.dir(file);

    if (file.type.includes("audio/")) {
      let formData = new FormData();

      formData.append("track", file, file.name);
      formData.append("friendly_name", file.name);
      console.dir(formData);
      let rawData;

      try {
        rawData = await fetch(`/upload`, {
          method: "PUT",
          body: formData,
          type: `cors`,
          credentials: `include`
        });
      } catch (e) {
        //Add proper handling
        throw new Error(e.message);
      }

      let tagsPayload = await rawData.json();

      console.error("COVER");
      console.dir(tagsPayload.cover);

      if (tagsPayload.hasTags) {
        // >> Init dipatch to REDUX informing the tags
        tagsPayload.cover
          ? this.props.dispatch(
              this.props.AC_PRELOAD_FILE_INFO(
                tagsPayload.tags,
                tagsPayload.cover
              )
            )
          : this.props.dispatch(
              this.props.AC_PRELOAD_FILE_INFO(tagsPayload.tags)
            );
      } else {
        // >> Init dipatch to REDUX informing there are no tags
        console.log("File has no tags!");
        this.props.dispatch(
          this.props.AC_PRELOAD_FILE_INFO(null, null, tagsPayload.name)
        );
      }

      //ASK Edit tags or no?
      let selection = window.confirm("Edit Track MP3 Info?");
      if (selection) this.props.dispatch({ type: SHOW_TAGS_FORM });
    } else {
      //TODO: Generate UI Friendly Error explaining that the file is not an audio
      console.error("Oops! Looks like this is not an audio file! ;(");
    }
  }

  onFileInputChange(e) {
    this.setState({ fileSelected: true });
    console.log(this.state);
    let file = this.file_input_ref.current.files[0];
    console.dir(file);
    //Dispatch an action to pass props info to the FileInfo component, obtain NodeID3 tags,
    //Dispatch an acction to render FileForm & its props predefned tags loaded from NodeID3
  }
}

const mapStateToProps = state => ({
  title: state.file.title,
  artist: state.file.artist,
  album: state.file.album,
  year: state.file.year,
  composer: state.file.composer,
  cover: state.file.cover,
  showTagsForm: state.file.show_tags_form,
  error: state.file.request_error,
  done: state.file.request_done,
  pending: state.file.request_pending
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    AC_PRELOAD_FILE_INFO
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileInput);
