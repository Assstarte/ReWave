import React, { Component } from "react";
import { Col } from "react-bootstrap";

const DashboardItem = props => (
  <li className="dashboard-item">
    <a href={props.link}>{props.text}</a>
  </li>
);

export default DashboardItem;
