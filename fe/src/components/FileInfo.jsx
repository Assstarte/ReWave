import React, { Component } from "react";

class FileInfo extends Component {
  render() {
    return (
      <React.Fragment>
        <form className="measure center" onSubmit={e => this.editTrackTags(e)}>
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
                value={this.props.title}
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
                value={this.props.artist}
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
                value={this.props.album}
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
}

export default FileInfo;
