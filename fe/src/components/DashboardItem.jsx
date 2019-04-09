import React, { Component } from "react";
import { Link } from "react-router-dom";

const DashboardItem = ({ text, link }) => (
  <Link to={link}>
    <li id={text}>
      <label htmlFor={text} >
        {text}
      </label>
    </li>
  </Link>

);

export default DashboardItem;
