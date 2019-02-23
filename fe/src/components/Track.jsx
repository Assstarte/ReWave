import React, { Component } from "react";
import { Card } from "react-bootstrap";

/*
============@PROPS=============

IN data:
@title | Self-descriptive
@artist | Self-descriptive
@composer | Self-descriptive
@fileName | The actual file on the server
@tags | ID3 Tags Object
@cover | The actual cover file on the server
@public | Self-descriptive

===============================
*/

class Track extends Component {
  render() {
    return (
      <>
        <Card
          bg="dark"
          text="white"
          style={{ width: "25%" }}
          className="track-card"
        >
          <Card.Header>RIPLOVE</Card.Header>

          <Card.Body>
            <img
              src="http://localhost:3030/covers/581164__NOW%20EASY%20FT.%20AIKKO_RIPLOVE.png"
              alt="cover"
              style={{ width: `75px`, height: `75px`, display: `inline` }}
            />
            <button className="btn btn-outline-danger fr">
              <i className="fas fa-play" style={{ fontSize: `18px` }} />
            </button>
            <Card.Title
              style={{ height: `20px`, fontSize: `14px`, marginTop: `8px` }}
            >
              Aikko - RIPLOVE (ft. asdsadsadadadaadd)
            </Card.Title>
            <Card.Text>Uploader: Max</Card.Text>
            <Card.Text>Rating: 5.0</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Track;
