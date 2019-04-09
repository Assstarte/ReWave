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

srv.use(express.static("assets"));

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

  if (!req.session.auth) {
    res.status(400);
    res.end(JSON.stringify({ error: "Not authenticated" }));
  }

  //Retreiving the actual session object
  let session_auth_data = JSON.parse(req.session.auth);
  //Extracting User from DB
  let uploader = await User.findByPk(session_auth_data.id);

  if (!uploader) throw new Error("Not Authenticated!");

  let result = await handleSingleTrackInUploadQuery(req.file, req.body, uploader);

  if (result.hasTags && result.uploaded) {
    res.status(201);
    res.end(
      JSON.stringify({
        hasTags: true,
        name: result.track.friendly_file_name,
        cover: track.cover_name,
        tags
      })
    );
  }


  if (!result.hasTags && result.uploaded) {
    res.status(201);

    res.end(
      JSON.stringify({
        hasTags: false,
        name: result.track.friendly_file_name
      })
    );
  }
});



//===============
//Multiple files
//===============
srv.post("/upload/multiple", upload.any(), async (req, res, next) => {
  if (!req.session.auth) {
    res.status(400);
    res.end(JSON.stringify({ error: "Not authenticated" }))
  } else {
    //Retreiving the actual session object
    let session_auth_data = JSON.parse(req.session.auth);
    //Extracting User from DB
    let uploader = await User.findByPk(session_auth_data.id);

    // if (!uploader) throw new Error("Not Authenticated!");
    console.dir(uploader);
    // req.files is the array of files
    // req.body will hold the text fields, if there were any

    let results = [];

    console.dir(req)

    for (let item of req.files) {
      let result = await handleSingleTrackInUploadQuery(item, req.body, uploader);
      results.push(result)
    }

    return res.json(results);

  }

}

)

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

    type Tags{
      title: String
      artist: String
      album: String
      year: Int
      composer: String
      imageType: String
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

    type Track {
      id: ID!
      public: Boolean!
      title: String!
      artist: String!
      avg_rating: Float!
      file_name: String!
      friendly_file_name: String!
      cover_name: String!
      owner_id: ID
      tagCollection: Tags
    }

    type TrackArray {
      tracks: [Track!]!
    }

    type RootQuery{
      users: [User!]!
      exec_login(loginInput: LoginInput): LoginResult!
      exec_logout: LogoutResponse!
      exec_get_track_by_id(id: ID!): Track!
      exec_get_own_multiple_tracks: TrackArray!
      exec_search(query: String!): TrackArray!
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

async function users({ }, { session }) {
  console.log(session);
  let response = await User.findAll();
  console.dir(response);
}

async function exec_logout({ }, { session }) {
  if (session.auth) {
    // delete session object
    console.log("======SESSION EXISTS. ERASING!==========");
    session.auth = null;
    console.dir(session.auth);
    return { erased: true };
  } else return { erased: false };
}

async function exec_get_track_by_id({ id }, { session }) {
  let track = await Track.findByPk(id);
  if (!track) throw new Error("No such Track");
  let tags = await track.tags;

  let requester = session.auth ? session.auth.id : null;

  if (!track.public && requester !== track.userId)
    throw new Error("You are not authorized to query this track!");

  return tags
    ? {
      id: track.id,
      public: track.public,
      title: track.title, //custom Sequelize getter
      artist: track.artist, //custom Sequelize getter
      avg_rating: track.avg_rating,
      file_name: track.file_name,
      friendly_file_name: track.friendly_file_name,
      cover_name: track.cover_name,
      owner_id: track.userId,
      tagCollection: {
        title: tags.title,
        artist: tags.artist,
        album: tags.album,
        year: tags.year,
        composer: tags.composer,
        imageType: tags.imageType
      }
    }
    : {
      id: track.id,
      public: track.public,
      title: track.title, //custom Sequelize getter
      artist: track.artist, //custom Sequelize getter
      avg_rating: track.avg_rating,
      file_name: track.file_name,
      friendly_file_name: track.friendly_file_name,
      cover_name: track.cover_name,
      owner_id: track.userId
    };
}

async function exec_get_own_multiple_tracks({ }, { session }) {
  let userId = session.auth ? JSON.parse(session.auth).id : null;
  if (!userId) throw new Error("Not Authenticated!");

  //let auth_sess = JSON.parse(session.auth);

  let arr = await Track.findAll({
    where: {
      userId
    }
  });

  //console.dir(await arr[0].getTag_collections());

  // let tagsArr = await Promise.all(arr.map(track => track.getTag_collection()));

  // //await arr.map((track, i) => (track.tags = tagsArr[i]));

  // await arr.map((track, i) => (track.tags = tagsArr[i]));

  await arr.map((track) => track.tagCollection = track.tags);

  // for (let track of arr) {
  //   console.dir(track.tags);
  // }
  return { tracks: arr };
}

async function exec_search({ query }, { session }) {
  let words = query.split(' ');
  words.map(word => word.trim());

  //Search by friendly file name

  let out = await Track.findAll({
    where: {
      friendly_file_name: {
        [Op.like]: `%${query}%`
      }
    }
  });


  //TODO: Implement ID3 Search and return both arrays

  return { tracks: (out ? out : []) };
}

//=========================

let rootGraph = {
  exec_login,
  exec_signup,
  exec_logout,
  users,
  exec_get_track_by_id,
  exec_get_own_multiple_tracks,
  exec_search
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
},
  {
    getterMethods: {
      async tags() {
        let instance = await this.getTag_collection();
        return instance ? instance.dataValues : null;
      },

      async title() {
        let name = await this.dataValues.friendly_file_name;
        return name.substr(name.indexOf("-") + 1, name.length);
      },

      async artist() {
        let name = await this.dataValues.friendly_file_name;
        return name.substr(0, name.indexOf("-"));
      }
    },

    setterMethods: {
      async tags(tagsObj) {
        await deployTrackTagsToDb(this.id, tagsObj);
      }
    }
  }
);

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
// Track.belongsToMany(TagCollection, { through: "Track_Tags" });
// TagCollection.belongsToMany(Track, { through: "Track_Tags" });

TagCollection.belongsTo(Track);
Track.hasOne(TagCollection);

User.hasMany(Track);
Track.belongsTo(User, { as: "track_owner" });

//Track.belongsToMany(Cover, {through: "Track_Covers"})
//===================================

sequelize.sync();

//===================================
//MP3 Tags w/ NodeID3 TEST SECTION
//===================================

//===================================

//===================================
//Custom functions
//===================================
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Включаючи мінімум та максимум
}

//Check if object is empty (for tags check mainly)
function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

async function handleSingleTrackInUploadQuery(file, body, uploader) {
  let tags = NodeID3.read(file.path);
  console.log(`======> PUT FILE Request Received`);
  console.dir(file);
  console.log(`======> TAGS:`);
  console.dir(tags);
  //DELETING the RAW part to avoid conflicts
  delete tags.raw;
  if (tags.encodingTechnology) delete tags.encodingTechnology;
  console.dir(`======> Tags W/O RAW`);
  console.dir(tags);
  let coverFileName = null;

  //CASE WHEN WE HAVE ACTUAL TAGS
  let result = {
    hasTags: false,
    uploaded: false
  }
  if (tags && !isEmpty(tags)) {
    result.hasTags = true;
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
      type: body.publication ? "PUBLICATION" : "UPLOAD",
      public: body.private ? false : true,
      description: body.description ? body.description : "N/A",
      avg_rating: 0,
      file_name: file.filename,
      //Note: Cut off the .mp3 part from the name
      friendly_file_name: file.originalname.substr(
        0,
        file.originalname.indexOf(".mp3")
      ),
      cover_name: coverFileName || "nocover.jpg"
    });

    await uploader.addTrack([track]);

    let deployed = await deployTrackTagsToDb(track.dataValues.id, tags);

    if (deployed) result.uploaded = true;
    return result;
  } else {
    result.hasTags = false;
    let track = await Track.create({
      type: body.publication ? "PUBLICATION" : "UPLOAD",
      public: body.private ? false : true,
      description: body.description ? body.description : "N/A",
      avg_rating: 0,
      file_name: file.filename,
      //Note: Cut off the .mp3 part from the name
      friendly_file_name: file.originalname.substr(
        0,
        file.originalname.indexOf(".mp3")
      ),
      cover_name: coverFileName || "nocover.jpg"
    });

    await uploader.addTrack([track]);

    if (track) {
      result.uploaded = true;
      result.track = track;
    }

    return result;
  }
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

  let createdEntity = await tag_collection.setTrack(track);

  return createdEntity ? true : false;
}


srv.listen("3030", () => {
  console.log("Backend API is on port 3030");
});
