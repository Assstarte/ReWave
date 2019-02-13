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
srv.use(
  cors({
    origin: process.env.FRONT_HOST || "http://localhost:3000",
    credentials: true
  })
);

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
  console.log("SESS");
  console.dir(req.session);

  //Retreiving the actual session object
  let session_auth_data = JSON.parse(req.session.auth);
  //Extracting User from DB
  let uploader = await User.findByPk(session_auth_data.id);

  if (!uploader) throw new Error("Not Authenticated!");
  // req.file is the file
  // req.body will hold the text fields, if there were any
  let tags = NodeID3.read(req.file.path);
  console.log(`======> PUT FILE Request Received`);
  console.dir(req.file);
  console.log(`======> TAGS:`);
  console.dir(tags);

  let coverFileName = null;

  //CASE WHEN WE HAVE ACTUAL TAGS
  if (tags) {
    // GET cover image Uint8 arr from tags

    //We are trying to obtain & save cover image from mp3 meta if such exists
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
      friendly_file_name: req.body.friendly_name,
      cover_name: coverFileName || "nocover.jpg"
    });

    await uploader.addTrack([track]);

    await deployTrackTagsToDb(track.dataValues.id, tags);

    res.status(201);
    res.end(JSON.stringify({ hasTags: true, tags }));
  }

  //IF THERE ARE NO TAGS AT ALL --->
  else {
    console.log("SESS");
    console.dir(req.session);
    let track = await Track.create({
      type: req.body.publication ? "PUBLICATION" : "UPLOAD",
      public: req.body.private ? false : true,
      description: req.body.description ? req.body.description : "N/A",
      avg_rating: 0,
      file_name: req.file.filename,
      friendly_file_name: req.body.friendly_name,
      cover_name: coverFileName || "nocover.jpg"
    });

    await uploader.addTrack([track]);

    res.status(201);
    res.end(JSON.stringify({ hasTags: false }));
  }
});

//WHOAMI
srv.get("/whoami", async (req, res) => {
  res.status(200);
  res.end(
    req.session.auth
      ? JSON.stringify(req.session.auth)
      : JSON.stringify({ session: "DENIED" })
  );
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

    type LogoutResponse{
      erased: Boolean!
    }

    type User{
      id: ID!
      login: String!
      email: String!
      full_name: String!
      account_type: String!
      createdAt: String!
    }

    type LoginResult{
      success: Success!
      userdata: User!
    }

    input UserInput {
      login: String!
      password: String!
      email: String!
      full_name: String!
    }

    input LoginInput {
      login: String!
      password: String!
    }

    type RootQuery{
      users: [User!]!
      exec_login(loginInput: LoginInput): LoginResult!
      exec_logout: LogoutResponse!
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
async function exec_login(args, { session }) {
  let params = args.loginInput;
  let checkQuery = await User.findOne({
    where: {
      login: params.login,
      password: params.password
    }
  });

  if (!checkQuery) {
    console.error("Error will be thrown and resolver terminated!");
    throw new Error("Invalid Credentials");
  }

  checkQuery = JSON.parse(JSON.stringify(checkQuery));
  delete checkQuery.password;
  let resultUser = JSON.stringify(checkQuery);
  console.dir(session);
  console.dir(`RESULT USER ====> ${resultUser}`);
  session.auth = resultUser;
  console.dir(session);

  return {
    success: { done: true },
    userdata: {
      id: checkQuery.id,
      login: checkQuery.login,
      email: checkQuery.email,
      full_name: checkQuery.full_name,
      account_type: checkQuery.account_type,
      createdAt: checkQuery.createdAt
    }
  };
}

async function exec_signup(args) {
  let params = args.userInput;
  let userExists = await User.findOne({
    where: {
      login: params.login
    }
  });
  if (!userExists) {
    let createdUser = await User.create({
      login: params.login,
      password: params.password,
      email: params.email,
      full_name: params.full_name,
      account_type: "USER"
    });
    console.dir(createdUser);
    return { done: true };
  } else return { done: false };
}

async function users({}, { session }) {
  console.log(session);
  let response = await User.findAll();
  console.dir(response);
}

async function exec_logout({}, { session }) {
  if (session.auth) {
    // delete session object
    console.log("======SESSION EXISTS. ERASING!==========");
    session.auth = null;
    console.dir(session.auth);
    return { erased: true };
  } else return { erased: false };
}

//=========================

let rootGraph = {
  exec_login,
  exec_signup,
  exec_logout,
  users
};

srv.use(
  "/api",
  express_graphql(req => ({
    schema,
    rootValue: rootGraph,
    graphiql: true,
    formatError(err) {
      // <-- log the error
      return {
        message: err.message,
        code: 400, // <--
        locations: err.locations,
        path: err.path
      };
    },
    context: { session: req.session }
  }))
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
  friendly_file_name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Untitled"
  },
  cover_name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "nocover.jpg"
  }
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
