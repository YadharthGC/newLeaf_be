const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://ganeshyadharth:AbleLyf@students.jbrazv2.mongodb.net/?retryWrites=true&w=majority";

exports.registerUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    console.log(req.body);
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
    console.log(req.body);
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
    console.log(req.body);
    //////
    if (req.body.actions === "Edit") {
      console.log("delete", req.body.dataObj["_id"]);
      let deleteData = await db
        .collection("candidates")
        .deleteOne({ _id: new ObjectId(req.body.dataObj["_id"]) });
    }
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
    console.log(req.body.sampAll, "3563");
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
    let getData = await db.collection("candidates").find({}).toArray();

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
    console.log(req.body);
    let deleteData = await db
      .collection("candidates")
      .deleteOne({ _id: new ObjectId(req.body["_id"]) });
    await client.close();
    res.send({
      message: "",
    });
  } catch (err) {
    console.log(err);
  }
};
