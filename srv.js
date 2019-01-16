//==================
//Crucial Imports
//==================
require("dotenv").config();
const express = require("express");
const srv = express();

const bodyParser = require("body-parser");
//const cors = require("cors");
const cookieSession = require("cookie-session");

srv.set("trust proxy", 1); // trust first proxy

srv.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

//srv.use(express.static("public"));
srv.use(bodyParser.json());
//srv.use(cors());

//==================
//MYSQL
//==================

const Sequelize = require("sequelize");
const Op = Sequelize.Op; //Operator
const operatorsAliases = {
  $gt: Op.gt
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    operatorsAliases,
    host: process.env.DB_HOST,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize.sync();

srv.listen("3030", () => {
  console.log("Backend API is on port 3030");
});
