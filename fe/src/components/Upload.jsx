import React, { Component } from "react";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.file_input_ref = React.createRef();
  }

  render() {
    return (
      <form
        onSubmit={e => this.handleUploadSingle(e)}
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
        <input ref={this.file_input_ref} type="file" name="track" />
        <input type="submit" />
      </form>
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
}

export default Upload;
