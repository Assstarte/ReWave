//==================
//Crucial Imports
//==================
require("dotenv").config();
const NodeID3 = require("node-id3");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "assets/" });
const srv = express();
const cors = require("cors");
srv.use(cors());

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

srv.set("trust proxy", 1); // trust first proxy

srv.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

srv.use(bodyParser.json());

//===============
//Express REST
//===============

srv.put("/upload", upload.single("track"), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(`======> PUT FILE Request Received`);
  console.dir(req.file);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.status(201);
  res.end(JSON.stringify(req.file));
});

//===============
//GraphQL
//===============
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

var schema = buildSchema(`
    type Query {
        exec_login(login: String!, password: String!): User
    }

    type User{
      user_id: Int!,
      user_login: String!,
      user_password: String!,
      user_email: String!,
      user_first_name: String!,
      user_last_name: String!,
      user_login_successfull: Boolean!
    }
`);

//========Resolvers========
async function exec_login({ login, password }) {
  let checkQuery = await User.findOne({
    where: {
      login,
      password
    }
  });

  if (checkQuery) {
    checkQuery = JSON.parse(JSON.stringify(checkQuery));
    delete checkQuery.password;
    let resultUser = JSON.stringify(checkQuery);
    return { user_login_successfull: true };
  } else return { user_login_successfull: false };
}
//=========================

let rootGraph = {
  exec_login
};

srv.use(
  "/api",
  express_graphql({
    schema,
    rootValue: rootGraph,
    graphiql: true
  })
);

//=========================

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
      idle: 10000,
      logging: true
    }
  }
);

//==============ENTITIES=============
const User = sequelize.define("users", {
  login: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  account_type: Sequelize.STRING
});

const Track = sequelize.define("tracks", {
  title: Sequelize.STRING,
  type: Sequelize.ENUM("UPLOAD", "PUBLICATION"),
  public: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  description: Sequelize.TEXT,
  composer: Sequelize.STRING,
  avg_rating: Sequelize.FLOAT
});
//===================================

sequelize.sync();

//===================================
//MP3 Tags w/ NodeID3
//===================================

let file =
  "./assets/test/test.mp3" || new Buffer("Some Buffer of a (mp3) file");

let tags = NodeID3.read(file);

srv.get("/test", (req, res) => {
  res.status(200);
  res.end(JSON.stringify(tags));
});

//===================================

srv.listen("3030", () => {
  console.log("Backend API is on port 3030");
});
