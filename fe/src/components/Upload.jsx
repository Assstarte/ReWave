import React, { Component } from "react";
import UploadAvatar from "./UploadAvatar";
//import { ProgressBar } from "react-fetch-progressbar";
import FileInput from "./FileInput";
import FileInfo from "./FileInfo";

class Upload extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="tc">
          {/* <FileForm/> */}
          <FileInput />
        </div>
      </React.Fragment>
    );
  }
}

export default Upload;
