import React, { Component } from "react";
import { Col } from "react-bootstrap";
import DashboardItem from "./DashboardItem";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.testArr = ["Tracks", "Playlists", "Upload", "Browse"];
  }

  render() {
    return (
      <div className="dashboard text-center">
        {this.testArr.map(item => (
          <DashboardItem text={item} link="/upload" />
        ))}
      </div>
    );
  }
}

export default Dashboard;
