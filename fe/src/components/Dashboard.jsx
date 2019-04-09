import React, { Component } from "react";
import DashboardItem from "./DashboardItem";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.menuItems = ["Tracks", "Playlists", "Upload", "Browse"];
  }

  render() {
    return (

      <div id="menu" className="open tc">

        <ul id="menu-items" className="">
          {this.menuItems.map(item => (
            <DashboardItem text={item} link="/upload" />
          ))}
        </ul>


      </div>


    );
  }
}

export default Dashboard;
