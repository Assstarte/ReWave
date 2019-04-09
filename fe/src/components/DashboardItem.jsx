import React, { Component } from "react";

const DashboardItem = props => (
  <li className="dashboard-item">
    <a className="f4 link dim ph3 pv2 mb2 dib white bg-black" href={props.link}>{props.text}</a>
  </li>
);

export default DashboardItem;
