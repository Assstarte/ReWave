import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header
        style={{
          backgroundImage: `url("https://media.giphy.com/media/9JxkPTP3alOykb8PmQ/giphy.gif")`
        }}
        className="tc-l bg-center cover bg-black  h-10"
      >
        <nav class="flex justify-between bb b--white-10">
          <a
            class="link white-70 hover-white no-underline flex items-center pa3"
            href=""
          >
            <img
              style={{ width: `35px`, height: `35px` }}
              src="https://cdn2.iconfinder.com/data/icons/sound-waves/100/sound_5-512.png"
              alt=""
            />
          </a>
          <div class="flex-grow pa3 flex items-center">
            <a class="f6 link dib white dim mr3 mr4-ns" href="#0">
              About
            </a>
            <a class="f6 link dib white dim mr3 mr4-ns" href="#0">
              Sign In
            </a>
            <a
              class="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
              href="#0"
            >
              Sign Up
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
