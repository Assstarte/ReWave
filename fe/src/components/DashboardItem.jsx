import React, { Component } from "react";

const DashboardItem = ({text, link}) => (
  <li id={text}>
      <label htmlFor = {text} >{text}</label>
    </li>
);

export default DashboardItem;
