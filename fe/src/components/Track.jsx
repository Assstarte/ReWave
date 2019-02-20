import React, { Component } from "react";

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
        <div className="track-inner-wrapper">
          <a class="card-link" href="#">
            <article class="blog-card">
              <img class="post-image" src={this.props.data.cover_name} />
              <div class="article-details">
                <h4 class="post-category">{this.props.data.artist}</h4>
                <h3 class="post-title">{this.props.data.title}</h3>
                <p class="post-description">{this.props.data.year}</p>
                <p class="post-author">N/A</p>
              </div>
            </article>
          </a>
        </div>
      </>
    );
  }
}

export default Track;
