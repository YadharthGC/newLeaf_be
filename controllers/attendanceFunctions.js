const uniqid = require("uniqid");
const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://ganeshyadharth:AbleLyf@students.jbrazv2.mongodb.net/?retryWrites=true&w=majority";

exports.handleRegisterAdmin = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    let reqObj = {
      adminID: uniqid(),
      name: req.body.mail,
      password: req.body.password,
    };
    console.log(reqObj);
    await db.collection("admin").insertOne(reqObj);
    await client.close();
    res.json({
      message: "succesfully registered admin",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleLoginAdmin = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    console.log(req.body);
    let getData = await db.collection("admin").findOne({
      name: req.body.mail,
      password: req.body.password,
    });
    console.log(getData);
    await client.close();
    if (getData) {
    }
    res.json({
      name: getData.name,
      adminID: getData.adminID,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    console.log(req.body);
    // await db.collection("admin").insertOne(req.body);
    await client.close();
    res.json({
      message: "sfss",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    let reqBody = req.body?.dataObj;
    //////
    if (req.body.actions === "Edit") {
      let ids = req.body.dataObj["_id"];
      let deleteData = await db
        .collection("candidates")
        .deleteMany({ _id: new ObjectId(ids) });
    }
    reqBody.candidateID = uniqid();
    let insertData = await db
      .collection("candidates")
      .insertOne(req.body?.dataObj);
    await client.close();
    res.json({
      message: "posted Candidate Details",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.demUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    //////
    let insertData = await db
      .collection("candidates")
      .insertMany(req.body?.sampAll);
    await client.close();
    res.json({
      message: "posted Candidate Details",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    let getData = await db.collection("candidates2").find({}).toArray();
    await client.close();
    res.send({
      message: getData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    let deleteData = await db
      .collection("candidates2")
      .deleteOne({ _id: new ObjectId(req.body["_id"]) });
    await client.close();
    res.send({
      message: "",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAttendanceRouter = async (req, res) => {
  try {
    let url =
      "mongodb+srv://saravana:samerareddy@cluster1.wgfyfeq.mongodb.net/?retryWrites=true&w=majority";
    const client = await MongoClient.connect(url);
    const db = client.db("students");
    let getData = await db.collection("attendance").find({}).toArray();
    await client.close();
    res.send({
      message: getData,
    });
  } catch (err) {
    console.log(err);
  }
};
