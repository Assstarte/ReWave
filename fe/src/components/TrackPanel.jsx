import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Track from "./Track";

class TrackPanel extends Component {
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
      {
        title: "TEST",
        artist: "TEST",
        cover_name:
          "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
      }
    ];
    return (
      <>
        <div className="track-wrapper">
          {testArr.map(track => (
            <Track data={track} />
          ))}
        </div>

        <ReactAudioPlayer
          className="player"
          src="http://localhost:3030/0fe46356536218cca8a69df0859ac69e"
          autoPlay
          controls
        />
      </>
    );
  }
}

export default TrackPanel;
