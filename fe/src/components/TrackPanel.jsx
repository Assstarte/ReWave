import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Track from "./Track";

class TrackPanel extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  render() {
    let testArr = [
      {
        title: "TEST",
        artist: "TEST",
        cover_name:
          "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
      },
      {
        title: "TEST",
        artist: "TEST",
        cover_name:
          "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
      },
      {
        title: "TEST",
        artist: "TEST",
        cover_name:
          "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
      },
      {},
      {},
      {},
      {}
    ];
    return (
      <>
        <div className="dash-panel">
          {testArr.map(track => (
            <Track data={track} />
          ))}
        </div>
      </>
    );
  }
}

export default TrackPanel;
