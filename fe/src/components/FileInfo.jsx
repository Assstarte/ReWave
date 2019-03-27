import React, { Component } from "react";

class FileInfo extends Component {

  constructor(props){
    super(props);
    this._titleRef = React.createRef();
    this._albumRef = React.createRef();
    this._artistRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <form
          className="measure center"
          onSubmit={e => this.editTrackTags(e)}
          style={{ display: this.props.shown ? "block" : "none" }}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Track Information</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="title">
                Title
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="title"
                id="title"
                ref={this._titleRef}
                placeholder={this.props.title}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="artist">
                Artist
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="artist"
                id="artist"
                ref={this._artistRef}
                placeholder={this.props.artist}
              />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="album">
                Album
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="album"
                id="album"
                ref={this._albumRef}
                placeholder={this.props.album}
              />
            </div>
          </fieldset>

          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Submit Info"
            />

            <div
              className="spinner"
              style={{
                display: this.props.pending ? "inline-block" : "none",
                float: "right"
              }}
            >
              <span>LOADING...</span>
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="lh-copy mt3">
            <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">
              Leave as is
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }

  editTrackTags(e){
    e.preventDefault();
    console.log("LOL, This is working!");
  }
}

export default FileInfo;
