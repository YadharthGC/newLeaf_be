const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://ganeshyadharth:AbleLyf@students.jbrazv2.mongodb.net/?retryWrites=true&w=majority";

exports.registerUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    await db.collection("registerDetails").insertOne(req.body);
    await client.close();
    res.json({
      message: "sfss",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    let insertData = await db.collection("login").insertOne(req.body);
    await client.close();
    res.json({
      message: "sss",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    //////
    if (req.body.actions === "Edit") {
      let ids = req.body.dataObj["_id"];
      let deleteData = await db
        .collection("candidates2")
        .deleteMany({ _id: new ObjectId(ids) });
    }
    let insertData = await db
      .collection("candidates2")
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
