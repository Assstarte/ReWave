import React, { Component } from "react";
import { ProgressBar } from "react-fetch-progressbar";

import { PURE_BACKEND_HOST } from "../constants";

import { AC_PRELOAD_FILE_INFO } from "../rdx/actions";
import { connect } from "react-redux";

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
        <form
          onSubmit={e => this.handleUploadSingle(e)}
          action="/upload"
          method="post"
          encType="multipart/form-data"
        >
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
      let rawData = await fetch(`${PURE_BACKEND_HOST}upload/`, {
        method: "PUT",
        body: formData,
        type: `cors`,
        credentials: `include`
      });
      let tagsPayload = await rawData.json();

      if (tagsPayload.hasTags) {
        // >> Init dipatch to REDUX informing the tags
        this.props.dispatch(this.props.AC_PRELOAD_FILE_INFO(tagsPayload.tags));
        console.log("Here are your tags:");
        console.dir(tagsPayload.tags);
      } else {
        // >> Init dipatch to REDUX informing there are no tags
        console.log("File has no tags!");
      }
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
  description: state.file.description,
  artist: state.file.artist,
  album: state.file.album,
  year: state.file.year,
  composer: state.file.composer,
  cover: state.file.cover,
  error: state.file.error
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
