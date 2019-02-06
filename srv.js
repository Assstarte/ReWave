//==================
//Crucial Imports
//==================
require("dotenv").config();
const NodeID3 = require("node-id3");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "assets/" });
const fs = require("fs");
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

//==============
//CONST
//==============

const COVERS_REL_PATH = "./assets/covers/";
const TRACKS_REL_PATH = "./assets/";

//===============
//Express REST
//===============

srv.put("/upload", upload.single("track"), async (req, res, next) => {
  // req.file is the file
  // req.body will hold the text fields, if there were any
  let tags = NodeID3.read(req.file.path);
  console.log(`======> PUT FILE Request Received`);
  console.dir(req.file);
  console.log(`======> TAGS:`);
  console.dir(tags);
  if (tags) {
    // GET cover image Uint8 arr from tags
    let coverFileName = null;
    try {
      let ui8a = tags.image.imageBuffer;
      coverFileName = `${getRandomIntInclusive(1, 1000000)}__${tags.artist}_${
        tags.title
      }.${tags.image.mime}`;
      fs.writeFile(COVERS_REL_PATH + coverFileName, new Buffer(ui8a), err => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    } catch (e) {
      console.error(e.message);
    }

    let track = await Track.create({
      type: req.body.publication ? "PUBLICATION" : "UPLOAD",
      public: req.body.private ? false : true,
      description: req.body.description ? req.body.description : "N/A",
      avg_rating: 0,
      file_name: req.file.filename,
      cover_name: coverFileName || null
      //user_Id: 0,
      //trackOwnerId: 0
    });

    await deployTrackTagsToDb(track.dataValues.id, tags);

    res.status(201);
    res.end(JSON.stringify(tags));
  } else {
    res.status(400);
    res.end(JSON.stringify({ created: false, error: "NO MP3 TAGS IN FILE" }));
  }
});

//===============
//GraphQL
//===============
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`

    type Success{
      done: Boolean!
    }

    type User{
      id: ID!
      login: String!
      email: String!
      full_name: String!
      account_type: String!
      createdAt: String!
    }

    input UserInput {
      login: String!
      password: String!
      email: String!
      full_name: String!
    }

    type RootQuery{
      users: [User!]!
    }

    type RootMutation{
      exec_signup(userInput: UserInput): Success!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
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

async function exec_signup(args) {
  let params = args.userInput;
  let userExists = await User.findOne({
    where: {
      login: params.login
    }
  });
  console.dir(user_exists);
  if (!userExists) {
    let createdUser = await User.create({
      login: params.login,
      password: params.password,
      email: params.email,
      full_name: params.full_name,
      account_type: "USER"
    });
    console.dir(createdUser);
    return JSON.stringify({ done: true });
  } else return JSON.stringify({ done: false });
}

async function users() {
  let response = await User.findAll();
  console.dir(response);
}

//=========================

let rootGraph = {
  exec_login,
  exec_signup,
  users
};

srv.use(
  "/api",
  express_graphql({
    schema,
    rootValue: rootGraph,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) return err;
      const data = err.originalError.data;
      const message = err.message || "Oops! An error occurred ;(";
      const code = err.originalError.code || 500;
    }
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
  full_name: Sequelize.STRING,
  account_type: Sequelize.ENUM("USER", "ARTIST", "ADMIN")
});

const Track = sequelize.define("tracks", {
  type: Sequelize.ENUM("UPLOAD", "PUBLICATION"),
  public: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  description: Sequelize.TEXT,
  avg_rating: { type: Sequelize.FLOAT, defaultValue: 0.0 },
  file_name: { type: Sequelize.STRING, allowNull: false },
  cover_name: { type: Sequelize.STRING, defaultValue: "nocover.jpg" }
});

const TagCollection = sequelize.define("tag_collections", {
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
  year: Sequelize.INTEGER,
  composer: Sequelize.STRING,
  imageType: Sequelize.STRING
});

//===============================

//==========RELATIONSHIPS========
Track.belongsToMany(TagCollection, { through: "Track_Tags" });
TagCollection.belongsToMany(Track, { through: "Track_Tags" });

User.hasMany(Track);
Track.belongsTo(User, { as: "track_owner" });

//Track.belongsToMany(Cover, {through: "Track_Covers"})
//===================================

sequelize.sync();

//===================================
//MP3 Tags w/ NodeID3 TEST SECTION
//===================================

let file =
  "./assets/test/test.mp3" || new Buffer("Some Buffer of a (mp3) file");

let tags = NodeID3.read(file);

srv.get("/test", (req, res) => {
  res.status(200);
  res.end(JSON.stringify(tags));
});

//===================================

//===================================
//Custom functions
//===================================
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Включаючи мінімум та максимум
}

async function deployTrackTagsToDb(track_id, tags) {
  let track = await Track.findOne({
    where: {
      id: track_id
    }
  });

  let tag_collection = await TagCollection.create({
    title: tags.title || null,
    artist: tags.artist || null,
    album: tags.album || null,
    year: tags.year || null,
    composer: tags.composer || null,
    imageType: tags.image ? tags.image.mime : null
  });

  let createdEntity = await track.addTag_collection([tag_collection]);
}

srv.listen("3030", () => {
  console.log("Backend API is on port 3030");
});
