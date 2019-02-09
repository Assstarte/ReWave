import React, { Component } from "react";
import { ProgressBar } from "react-fetch-progressbar";

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

  handleUploadSingle(e) {
    e.preventDefault();
    //TODO: preloader
    let file = this.file_input_ref.current.files[0];
    console.dir(file);

    let formData = new FormData();

    formData.append("track", file, file.name);
    console.dir(formData);
    fetch("http://localhost:3030/upload/", {
      method: "PUT",
      body: formData,
      type: `cors`
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", JSON.stringify(response)));
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

export default FileInput;