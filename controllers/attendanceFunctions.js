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
      message: "adminRegistered",
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
    await client.close();
    if (getData) {
    }
    if (getData) {
      res.json({
        message: "adminLogin Success",
        name: getData.name,
        adminID: getData.adminID,
      });
    } else {
      res.json({
        message: "No login",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.handleGetCandidates = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    console.log(req.body);
    let getData = await db
      .collection("candidates")
      .find({ adminID: req.body.adminID })
      ?.toArray();
    await client.close();
    res.send({
      message: getData.reverse(),
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleAddUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    let reqBody = req.body?.dataObj;
    //////
    if (req.body.actions === "Edit") {
      reqBody["_id"] && delete reqBody["_id"];

      let findAndUpdateData = await db
        .collection("candidates")
        .findOneAndUpdate(
          { candidateID: reqBody.candidateID },
          { $set: { ...reqBody } }
        );
    } else {
      reqBody.candidateID = uniqid();
      let insertData = await db
        .collection("candidates")
        .insertOne(req.body?.dataObj);
    }
    await client.close();
    res.json({
      message: "candidateDetails submitted",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleDeleteCandidates = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    console.log(req.body);
    let deleteData = await db
      .collection("candidates")
      .deleteMany({ _id: new ObjectId(req.body["_id"]) });
    await client.close();
    res.send({
      message: "deleted candidate",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleAttendanceChange = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("AbleLyf");
    console.log(req.body);
    console.log("jalev=bi");
    let reqBody = req.body;
    reqBody["_id"] && delete reqBody["_id"];
    let findAndUpdateData = await db
      .collection("candidates")
      .findOneAndUpdate(
        { candidateID: req.body.candidateID },
        { $set: { ...req.body } }
      );
    await client.close();
    res.send({
      message: "changedStatus",
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
    let insertData = await db.collection("candidates").insertMany(sampJson);
    await client.close();
    res.json({
      message: "posted Candidate Details",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleEntries = async (req, res) => {
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

exports.handleEntriesDelete = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("students");
    const deleteData = await db
      .collection("attendance")
      .findOneAndDelete({ _id: new ObjectId(req.body["_id"]) });
    await client.close();
    res.send({
      message: "deleteSuccesfully",
    });
  } catch (err) {
    console.log(err);
  }
};

var sampJson = [
  {
    name: "Hedwiga",
    role: "Therapists",
    candidateID: 318,
    gender: "Female",
    dob: "1922-07-07",
    shift: "Evening",
    employeeID: 2024,
    created: "2023-04-17",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-27",
        status: "present",
        time: "11:06 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:20 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "4:54 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "2:52 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:11 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "5:01 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "8:19 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:28 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "3:14 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:08 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "4:36 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "6:56 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:50 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "11:26 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "12:47 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "8:40 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "7:26 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "3:27 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "1:14 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:27 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "1:59 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:18 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "4:12 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "9:11 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "8:06 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "11:59 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "11:20 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "7:06 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "6:17 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "7:16 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Tarrance",
    role: "Students",
    candidateID: 951,
    gender: "Male",
    dob: "1963-11-01",
    shift: "Morning",
    employeeID: 2103,
    created: "2023-01-22",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-19",
        status: "present",
        time: "3:23 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "2:06 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "7:49 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "11:23 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:45 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:18 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "5:00 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "6:42 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:00 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:59 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "3:32 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:48 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "6:17 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:36 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "5:57 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:51 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "12:03 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "3:12 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "4:36 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "8:56 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "10:23 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "3:30 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "12:31 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "4:48 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "11:09 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "1:52 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "11:43 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "4:10 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "7:25 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "12:20 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Dietrich",
    role: "Therapists",
    candidateID: 219,
    gender: "Male",
    dob: "1965-09-02",
    shift: "Morning",
    employeeID: 2842,
    created: "2023-03-11",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-01",
        status: "present",
        time: "2:57 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "6:05 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:46 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "8:24 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "11:00 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "3:36 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "7:23 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "2:04 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "8:17 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "12:54 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:14 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:26 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:01 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:54 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "6:35 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "7:20 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "7:40 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "2:21 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "8:51 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "5:04 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:33 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:45 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "8:58 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "10:24 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "6:47 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "2:07 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "3:04 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "3:03 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "6:29 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:08 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Angelle",
    role: "Students",
    candidateID: 294,
    gender: "Female",
    dob: "1905-11-14",
    shift: "Evening",
    employeeID: 2923,
    created: "2023-04-15",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-14",
        status: "present",
        time: "1:11 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "11:40 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "4:02 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "9:24 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "9:54 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "11:53 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "2:35 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:44 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:52 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:59 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "6:17 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "10:07 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "7:16 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "7:29 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:10 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "4:14 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "10:56 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "11:14 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:32 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "5:56 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "12:54 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "3:33 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:17 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "6:33 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:09 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "2:21 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "12:46 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "1:55 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:08 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:20 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Sherman",
    role: "Therapists",
    candidateID: 553,
    gender: "Male",
    dob: "1959-12-06",
    shift: "Morning",
    employeeID: 2626,
    created: "2023-08-19",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-03",
        status: "present",
        time: "6:24 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:50 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "10:41 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "5:28 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:35 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "1:07 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:04 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:22 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:52 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:48 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "3:19 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "4:18 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "8:47 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "9:00 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "2:50 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:46 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:31 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:05 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "7:38 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "7:14 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:09 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "3:32 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "4:11 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "9:20 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "1:56 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "1:05 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "7:42 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "12:54 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "9:57 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "3:02 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Lanie",
    role: "Students",
    candidateID: 942,
    gender: "Female",
    dob: "1968-01-27",
    shift: "Morning",
    employeeID: 2425,
    created: "2023-09-30",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-16",
        status: "present",
        time: "4:15 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "4:23 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "10:27 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:19 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "7:12 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "2:35 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:16 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "10:45 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "1:01 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "11:12 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "2:06 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "10:35 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:54 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:06 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "6:42 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "9:06 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "1:01 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:25 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "2:57 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "9:27 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "6:43 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:09 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "1:55 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "10:47 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "3:24 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:35 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:38 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "4:07 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "12:32 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "7:09 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Mal",
    role: "Students",
    candidateID: 376,
    gender: "Male",
    dob: "1904-03-23",
    shift: "Evening",
    employeeID: 2903,
    created: "2023-07-25",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-28",
        status: "present",
        time: "2:40 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "4:11 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "11:28 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:03 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:56 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "6:56 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "3:10 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "3:05 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:16 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "11:49 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "11:12 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "8:43 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "9:52 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "2:14 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "2:06 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "11:21 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:57 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "1:52 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:24 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "12:53 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "10:38 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "2:37 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "5:45 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:48 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "3:12 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "2:22 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "11:29 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "10:36 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:17 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "1:58 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Noreen",
    role: "Students",
    candidateID: 86,
    gender: "Female",
    dob: "1996-09-18",
    shift: "Morning",
    employeeID: 2405,
    created: "2023-09-25",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-22",
        status: "present",
        time: "12:33 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "8:42 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "5:14 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "3:38 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "12:26 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:40 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "5:12 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "6:29 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "12:47 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "12:32 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "1:55 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "1:56 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "6:50 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "5:09 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "11:49 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "6:37 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "8:55 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:17 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "9:08 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "5:23 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "8:58 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "5:45 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:59 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:12 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "5:27 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "5:03 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "8:16 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "7:17 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "4:39 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "11:12 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Elysha",
    role: "Students",
    candidateID: 512,
    gender: "Female",
    dob: "1973-03-05",
    shift: "Morning",
    employeeID: 2836,
    created: "2023-09-06",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-13",
        status: "present",
        time: "3:35 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "10:23 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "10:26 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "11:11 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "2:08 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "6:00 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "12:56 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "10:23 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "9:20 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "3:37 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "12:00 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "6:58 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:57 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:43 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "10:34 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "1:36 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "7:43 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:43 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "4:37 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "7:07 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:02 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "5:33 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "4:20 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "7:23 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "5:26 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "2:27 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "2:28 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "9:45 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:08 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:47 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Ivar",
    role: "Students",
    candidateID: 749,
    gender: "Male",
    dob: "1911-01-22",
    shift: "Evening",
    employeeID: 2323,
    created: "2023-02-01",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-08",
        status: "present",
        time: "11:55 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "1:17 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "3:07 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:10 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "2:24 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "8:14 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "10:48 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "6:39 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "2:57 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "1:26 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "10:27 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:10 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "2:59 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "6:18 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "3:01 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "10:35 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "4:56 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "4:42 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "9:08 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "11:15 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:17 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:56 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "8:05 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "5:28 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "10:27 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "9:50 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "12:15 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "7:58 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "2:40 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "6:56 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Prince",
    role: "Students",
    candidateID: 921,
    gender: "Male",
    dob: "1926-03-31",
    shift: "Morning",
    employeeID: 2187,
    created: "2023-01-28",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-12",
        status: "present",
        time: "3:11 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:53 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "2:26 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "3:02 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "6:23 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "11:15 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "7:45 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "7:39 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "2:55 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "2:57 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:56 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "1:41 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "5:36 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "2:00 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "6:44 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "11:02 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "11:17 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "12:06 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "11:35 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:06 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "3:17 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:39 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:00 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:30 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:45 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:29 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:16 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "7:41 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "12:31 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "5:25 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Maddy",
    role: "Students",
    candidateID: 861,
    gender: "Female",
    dob: "1946-11-14",
    shift: "Morning",
    employeeID: 2380,
    created: "2023-09-29",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-09",
        status: "present",
        time: "3:12 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "8:28 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:19 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "10:13 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:30 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "6:54 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:43 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:13 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "3:28 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "7:53 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "2:35 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:57 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "12:56 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:34 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:36 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:48 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:41 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "10:24 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "12:41 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "4:46 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "7:40 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:29 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "12:24 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "5:21 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "11:50 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "1:15 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "8:49 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:02 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "4:18 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "8:11 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Hallie",
    role: "Therapists",
    candidateID: 24,
    gender: "Female",
    dob: "1998-08-11",
    shift: "Morning",
    employeeID: 2197,
    created: "2023-05-23",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-01",
        status: "present",
        time: "11:48 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:26 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "8:04 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "10:42 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "2:14 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:52 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:21 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "6:05 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:10 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "3:45 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:05 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "3:12 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:23 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "10:44 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:37 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "6:22 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "10:44 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:38 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:49 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "9:56 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:26 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:11 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:25 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:49 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:01 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "2:31 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:47 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "10:27 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "4:53 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "11:54 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Karlan",
    role: "Students",
    candidateID: 667,
    gender: "Male",
    dob: "1967-09-20",
    shift: "Evening",
    employeeID: 2315,
    created: "2023-03-18",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-06",
        status: "present",
        time: "10:51 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:00 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:28 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "12:10 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "12:57 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "5:33 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "10:33 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "5:29 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "6:44 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "8:16 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "4:23 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "6:04 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "2:06 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "11:54 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "4:23 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:33 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "5:48 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:40 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:05 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "6:32 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "9:14 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:48 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "7:38 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:52 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "12:31 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:59 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:47 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:33 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "11:16 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "4:30 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Astra",
    role: "Students",
    candidateID: 902,
    gender: "Female",
    dob: "1911-06-22",
    shift: "Evening",
    employeeID: 2620,
    created: "2023-08-31",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-19",
        status: "present",
        time: "4:28 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "9:37 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "9:28 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "4:44 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:44 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "8:01 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "8:18 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:47 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "4:26 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "3:03 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:29 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "9:44 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "9:58 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "3:17 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:32 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:30 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "8:42 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:00 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:19 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "2:02 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:47 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "7:57 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "5:28 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "4:06 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:10 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "3:51 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "9:47 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "9:28 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:48 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:06 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Daffy",
    role: "Therapists",
    candidateID: 683,
    gender: "Female",
    dob: "1983-12-31",
    shift: "Morning",
    employeeID: 2683,
    created: "2023-06-23",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-03",
        status: "present",
        time: "9:25 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "2:29 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "8:27 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "2:02 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "4:32 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "4:32 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:51 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "5:53 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:30 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "6:11 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "11:32 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:11 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "1:36 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "4:48 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:14 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "1:23 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "2:18 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "7:56 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "11:18 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:45 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "7:12 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "5:27 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "5:54 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "12:23 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "6:11 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "5:53 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "12:47 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:13 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "6:33 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "4:24 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Hanan",
    role: "Students",
    candidateID: 627,
    gender: "Male",
    dob: "1969-02-17",
    shift: "Evening",
    employeeID: 2220,
    created: "2023-09-27",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-18",
        status: "present",
        time: "5:19 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:06 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "4:54 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:07 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:10 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "3:46 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "5:34 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "8:30 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "3:28 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "12:50 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "12:54 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "8:35 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:44 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "1:20 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "12:21 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:36 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:46 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "11:06 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:52 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "5:27 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:26 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "6:23 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "8:57 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:59 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "8:01 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:24 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "10:11 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "9:16 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "2:39 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "2:44 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Christian",
    role: "Students",
    candidateID: 121,
    gender: "Male",
    dob: "1972-04-27",
    shift: "Evening",
    employeeID: 2653,
    created: "2023-10-05",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-14",
        status: "present",
        time: "2:28 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "6:00 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:32 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "1:05 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "10:12 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "6:41 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "11:57 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "9:43 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "9:48 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "6:58 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:43 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "4:54 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "8:55 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "6:21 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "1:05 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:42 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "6:20 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "9:23 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "11:07 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "9:26 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "3:02 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:02 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:36 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:01 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:49 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:11 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "10:44 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "6:24 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "9:11 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:13 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Carlo",
    role: "Therapists",
    candidateID: 840,
    gender: "Male",
    dob: "1992-05-13",
    shift: "Morning",
    employeeID: 2308,
    created: "2023-05-30",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-20",
        status: "present",
        time: "12:33 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "4:43 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:35 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "9:11 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "8:33 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:21 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "11:58 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "12:42 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "8:43 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "10:14 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:36 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "7:23 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:46 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:03 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "5:15 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "9:36 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "9:06 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:54 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "8:53 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "7:02 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "5:51 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "3:14 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "2:35 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:04 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "8:09 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "2:02 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "4:50 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "10:38 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "5:46 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "12:32 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Inga",
    role: "Students",
    candidateID: 134,
    gender: "Female",
    dob: "1947-07-22",
    shift: "Evening",
    employeeID: 2328,
    created: "2023-05-28",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-25",
        status: "present",
        time: "11:43 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:38 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "4:56 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "9:22 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "11:43 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "11:43 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "9:51 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "10:31 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "12:16 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "3:08 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "11:55 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "5:07 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "10:16 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "7:02 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:07 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "6:30 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "12:38 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "2:00 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "2:52 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "9:05 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "3:16 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "5:21 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "9:55 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "11:47 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:41 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "3:49 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:58 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "9:39 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "1:51 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "10:47 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Pascal",
    role: "Therapists",
    candidateID: 769,
    gender: "Male",
    dob: "1921-02-07",
    shift: "Morning",
    employeeID: 2716,
    created: "2023-07-14",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-14",
        status: "present",
        time: "11:28 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:46 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "3:43 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "3:52 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:28 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:43 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "10:02 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "3:40 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "5:32 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "6:31 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "1:00 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "5:32 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "7:29 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "1:07 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:36 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "6:29 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "1:16 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "4:58 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:14 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "4:10 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:35 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:26 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:38 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "12:16 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "12:39 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:12 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "10:05 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "10:46 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "5:57 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "7:54 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Norry",
    role: "Therapists",
    candidateID: 168,
    gender: "Female",
    dob: "1945-12-23",
    shift: "Morning",
    employeeID: 2265,
    created: "2023-06-28",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-19",
        status: "present",
        time: "6:36 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "11:47 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "7:51 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "10:29 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "4:02 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "9:49 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "3:14 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "9:47 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "3:38 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "9:54 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "4:41 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "5:40 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:32 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "8:06 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:46 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "8:41 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "5:23 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:13 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "2:13 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:11 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:28 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "10:49 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "4:32 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "6:51 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:14 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "2:35 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:30 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "12:57 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "12:32 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "6:19 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Hewitt",
    role: "Students",
    candidateID: 961,
    gender: "Male",
    dob: "1953-11-25",
    shift: "Evening",
    employeeID: 2759,
    created: "2023-07-23",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-08",
        status: "present",
        time: "12:43 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:03 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "6:16 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:38 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:33 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "12:26 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:45 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:50 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "12:30 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:41 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "10:31 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "8:27 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:00 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "6:33 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "2:28 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "10:22 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:59 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "6:06 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "12:46 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:30 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "9:51 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "3:45 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "11:22 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "4:22 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "8:29 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "5:22 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "11:32 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:46 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "11:41 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "5:20 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Joleen",
    role: "Therapists",
    candidateID: 807,
    gender: "Female",
    dob: "1906-09-23",
    shift: "Evening",
    employeeID: 2873,
    created: "2023-06-25",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-28",
        status: "present",
        time: "6:56 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "1:27 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "5:50 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "11:45 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "12:03 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "2:34 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "12:56 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:51 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:38 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "12:11 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:13 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "4:44 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "12:53 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "3:20 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "8:31 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:16 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "11:15 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "2:01 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "12:17 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "6:26 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "9:04 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "12:56 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "7:31 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "6:29 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "12:43 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "3:22 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "7:20 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "3:08 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "1:57 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "9:13 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Roxanne",
    role: "Therapists",
    candidateID: 454,
    gender: "Female",
    dob: "1911-09-29",
    shift: "Morning",
    employeeID: 2362,
    created: "2023-10-19",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-13",
        status: "present",
        time: "4:19 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "4:16 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "8:08 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "1:26 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "11:58 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:51 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "6:04 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "11:55 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "12:58 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "8:52 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "11:22 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "10:45 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:24 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "2:41 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "12:24 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "9:35 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "7:12 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "3:19 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "5:33 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "12:52 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "7:29 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "10:52 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:08 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "8:56 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:43 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "4:12 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "2:05 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:47 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "10:34 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "12:39 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Milissent",
    role: "Therapists",
    candidateID: 182,
    gender: "Female",
    dob: "1992-11-13",
    shift: "Evening",
    employeeID: 2403,
    created: "2023-02-06",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-31",
        status: "present",
        time: "12:00 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "10:40 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "6:47 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:36 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "4:50 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "3:30 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "8:50 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "3:14 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "11:46 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "8:39 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "11:28 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "7:19 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "10:49 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "1:58 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:34 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "1:38 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "8:15 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:07 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "3:48 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "2:21 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "5:02 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "3:20 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:47 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "7:52 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "9:03 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "1:58 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:56 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "8:59 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "3:12 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:44 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Haslett",
    role: "Therapists",
    candidateID: 230,
    gender: "Male",
    dob: "1963-07-16",
    shift: "Evening",
    employeeID: 2666,
    created: "2023-05-09",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-21",
        status: "present",
        time: "5:51 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "2:28 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:06 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "3:49 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:35 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "7:14 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "1:53 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:48 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "6:12 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "7:21 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:04 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "8:44 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "4:07 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "11:50 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:26 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "5:36 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "5:24 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "11:11 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "6:36 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:19 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "6:15 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "1:22 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "4:33 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "4:39 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "2:14 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "2:43 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "9:17 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "5:33 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "9:14 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "12:38 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Aldo",
    role: "Students",
    candidateID: 964,
    gender: "Male",
    dob: "1959-05-31",
    shift: "Morning",
    employeeID: 2210,
    created: "2023-08-31",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-14",
        status: "present",
        time: "12:34 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "1:00 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "2:14 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "2:16 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "3:12 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "2:46 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "1:31 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "7:50 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "12:44 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "5:40 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "8:05 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "4:59 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:23 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "3:45 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:58 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "8:58 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "10:51 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:23 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "4:13 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "8:39 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:08 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "5:48 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:52 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "1:05 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:30 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "12:43 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:06 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:52 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "3:17 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "11:43 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Stoddard",
    role: "Therapists",
    candidateID: 577,
    gender: "Female",
    dob: "1986-01-30",
    shift: "Morning",
    employeeID: 2485,
    created: "2023-03-15",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-03",
        status: "present",
        time: "4:27 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:17 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "6:44 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "6:14 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "5:04 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "5:37 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "6:35 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:27 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "9:48 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "9:33 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "7:56 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "8:47 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "1:52 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "9:49 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "7:29 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:23 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:49 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "12:36 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:41 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "5:36 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "12:34 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "11:27 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:45 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "2:27 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "1:56 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:12 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "3:56 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "4:12 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "5:17 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "3:59 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Jarid",
    role: "Therapists",
    candidateID: 379,
    gender: "Male",
    dob: "1928-07-15",
    shift: "Morning",
    employeeID: 2759,
    created: "2023-03-10",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-20",
        status: "present",
        time: "7:41 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "2:38 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "11:15 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "10:16 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:35 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:44 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:26 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "6:55 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "8:38 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "8:21 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "9:59 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "2:08 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:48 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:50 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "6:54 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:34 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "2:38 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "1:49 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "11:16 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "8:40 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "3:49 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "7:50 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "11:44 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "10:16 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "1:25 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "3:48 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "3:07 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:06 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "7:17 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "6:35 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Sam",
    role: "Students",
    candidateID: 725,
    gender: "Female",
    dob: "1922-04-25",
    shift: "Evening",
    employeeID: 2504,
    created: "2023-02-23",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-05",
        status: "present",
        time: "3:00 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "12:05 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "3:58 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "1:40 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:14 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "4:35 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "9:15 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "6:29 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "9:25 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:03 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "12:05 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "6:30 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:22 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "3:41 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "1:43 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "5:36 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "6:45 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "10:07 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "5:31 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "4:35 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "2:03 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "6:28 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "6:58 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "5:45 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "7:35 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "4:57 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:48 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:01 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "2:02 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "8:45 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Arin",
    role: "Students",
    candidateID: 436,
    gender: "Male",
    dob: "1964-03-16",
    shift: "Evening",
    employeeID: 2094,
    created: "2023-09-28",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-17",
        status: "present",
        time: "1:02 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "7:31 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "7:32 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:02 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:29 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "4:53 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "8:29 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "4:12 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "10:09 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "10:54 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "8:57 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "3:09 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "8:14 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:13 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "8:14 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "10:02 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "5:52 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "10:06 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "9:22 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "8:13 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:22 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "3:50 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "3:07 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "11:14 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:04 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:23 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "12:34 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "12:23 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "1:51 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "1:04 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Donal",
    role: "Therapists",
    candidateID: 171,
    gender: "Male",
    dob: "1937-04-23",
    shift: "Morning",
    employeeID: 2237,
    created: "2023-08-08",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-18",
        status: "present",
        time: "8:30 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "4:37 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "5:56 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "5:28 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "7:17 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "5:30 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:39 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:50 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:17 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "2:25 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "12:34 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "2:32 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "8:26 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "7:41 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "5:36 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "7:48 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "11:28 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "10:18 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "8:42 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "9:48 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:23 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:02 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "6:00 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "3:43 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "6:06 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "2:23 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "9:51 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "5:39 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "5:31 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "4:38 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Sean",
    role: "Students",
    candidateID: 105,
    gender: "Male",
    dob: "1976-11-28",
    shift: "Evening",
    employeeID: 2424,
    created: "2023-01-09",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-04",
        status: "present",
        time: "1:10 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "1:49 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:35 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "8:22 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "6:30 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "10:47 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "7:51 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "10:12 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "5:55 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "5:01 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "8:55 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "1:41 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "5:27 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "6:34 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "8:57 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "4:36 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "10:27 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "12:30 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "1:06 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "11:27 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:34 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "2:28 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "12:29 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "1:41 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "11:01 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "1:37 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "3:05 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "10:33 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "5:28 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "10:52 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Skyler",
    role: "Therapists",
    candidateID: 926,
    gender: "Male",
    dob: "1909-10-10",
    shift: "Morning",
    employeeID: 2822,
    created: "2023-07-31",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-11",
        status: "present",
        time: "8:37 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "3:38 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:52 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "3:09 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "1:31 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "5:37 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "6:18 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "3:43 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "10:28 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "8:45 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "6:00 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "3:45 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "5:31 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "8:03 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "4:01 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "1:34 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:45 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "4:04 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "6:37 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "10:03 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "12:10 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "3:00 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "7:15 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "7:53 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "11:24 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "8:02 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:35 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "9:13 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:42 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:11 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Artie",
    role: "Therapists",
    candidateID: 307,
    gender: "Male",
    dob: "1903-04-27",
    shift: "Morning",
    employeeID: 2494,
    created: "2023-05-01",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-15",
        status: "present",
        time: "2:11 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "1:56 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:33 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "2:32 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:55 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "5:25 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:14 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "3:29 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:26 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "6:48 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "11:49 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:32 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "1:38 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "5:29 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "1:07 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "3:19 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "3:14 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:39 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "2:59 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "5:10 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:40 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:36 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "2:07 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:19 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "12:17 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:57 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "10:07 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "10:51 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "1:58 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "9:42 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Durante",
    role: "Students",
    candidateID: 322,
    gender: "Male",
    dob: "1975-11-23",
    shift: "Morning",
    employeeID: 2913,
    created: "2023-12-13",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-02",
        status: "present",
        time: "9:04 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "6:01 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "10:37 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:09 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "12:01 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "12:43 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:05 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "3:48 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "6:16 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:45 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "4:33 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "2:26 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:19 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "6:58 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "8:47 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "10:34 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "8:59 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "5:28 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:47 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "4:04 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "10:18 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "3:22 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "11:09 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "4:40 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:39 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "9:20 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "11:56 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "1:03 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "9:40 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "3:33 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Ephraim",
    role: "Therapists",
    candidateID: 634,
    gender: "Male",
    dob: "1972-02-14",
    shift: "Evening",
    employeeID: 2065,
    created: "2023-08-21",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-30",
        status: "present",
        time: "5:35 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "9:43 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "3:48 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "9:39 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:18 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:29 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "3:28 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:07 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "12:40 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "12:30 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "1:28 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "9:17 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:35 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "7:34 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "6:38 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "2:42 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "6:43 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "9:06 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "7:07 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:39 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "12:24 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "6:10 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:34 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "8:02 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "1:57 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "2:20 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "9:25 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "5:33 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "1:09 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "12:34 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Burl",
    role: "Students",
    candidateID: 607,
    gender: "Male",
    dob: "1946-02-27",
    shift: "Morning",
    employeeID: 2871,
    created: "2023-03-06",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-23",
        status: "present",
        time: "7:11 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "7:47 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "12:15 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "7:53 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "7:44 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "11:25 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:05 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "3:32 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:01 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "1:56 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "8:37 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "7:00 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:17 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "4:08 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "4:37 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "8:55 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:18 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "10:59 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "8:17 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "4:48 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:45 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "4:19 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "11:54 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "7:44 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "1:51 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:02 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "11:53 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:26 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "5:06 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:59 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Coleen",
    role: "Therapists",
    candidateID: 583,
    gender: "Female",
    dob: "1912-05-15",
    shift: "Evening",
    employeeID: 2120,
    created: "2023-08-07",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-11",
        status: "present",
        time: "12:14 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "11:14 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:37 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "1:05 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "1:12 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "10:41 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "5:47 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "9:31 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "6:18 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:16 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "2:43 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "6:48 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "10:01 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "2:56 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "1:36 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "6:40 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "2:33 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "6:13 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "12:01 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "7:50 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "4:42 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "12:17 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "12:08 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "12:51 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "9:00 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "6:57 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "3:04 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:28 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "2:32 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "7:27 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Eugenius",
    role: "Students",
    candidateID: 33,
    gender: "Male",
    dob: "1949-12-14",
    shift: "Evening",
    employeeID: 2153,
    created: "2023-08-23",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-24",
        status: "present",
        time: "1:51 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:08 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "7:55 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "12:47 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:02 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "11:31 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "4:49 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "2:02 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:19 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "6:06 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "12:42 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:24 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:29 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "8:26 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:05 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "4:09 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "10:33 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "9:28 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "12:53 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "9:36 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:51 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "4:55 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:35 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "12:13 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:39 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "1:09 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "2:23 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:43 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:26 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:26 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Sapphire",
    role: "Therapists",
    candidateID: 657,
    gender: "Female",
    dob: "1963-06-04",
    shift: "Evening",
    employeeID: 2887,
    created: "2023-12-10",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-31",
        status: "present",
        time: "3:24 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "6:13 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:23 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "8:05 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "10:50 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "5:11 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "12:01 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "11:17 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "9:19 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "2:22 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "2:32 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "4:19 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "1:21 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "9:05 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:37 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "2:30 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:06 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:32 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "11:14 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "4:39 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "3:03 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "6:25 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "4:50 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:41 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "3:37 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "11:12 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "8:32 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "10:06 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "8:20 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "7:39 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Ekaterina",
    role: "Therapists",
    candidateID: 42,
    gender: "Female",
    dob: "1957-05-04",
    shift: "Morning",
    employeeID: 2766,
    created: "2023-04-10",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-24",
        status: "present",
        time: "11:12 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "5:50 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "7:45 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "7:17 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "5:53 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "12:23 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "11:11 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "10:41 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "3:28 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:01 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "11:23 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "8:00 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:19 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:58 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "7:46 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "9:34 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "10:28 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "2:10 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "12:02 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "7:06 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "1:25 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "12:54 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "4:42 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "12:54 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "9:05 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "3:41 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "11:58 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "4:50 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "5:49 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "1:09 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Hyacinthia",
    role: "Therapists",
    candidateID: 423,
    gender: "Female",
    dob: "1912-08-26",
    shift: "Evening",
    employeeID: 2694,
    created: "2023-06-04",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-20",
        status: "present",
        time: "1:26 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "12:24 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "12:02 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "7:13 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "12:41 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "10:00 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "12:16 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:11 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "1:39 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "10:13 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "11:57 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "4:28 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "4:26 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "8:44 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:29 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "9:59 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "3:53 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:45 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:45 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "6:20 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "5:45 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "4:38 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "8:30 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "1:36 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:04 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "7:58 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "7:50 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:28 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:00 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "9:11 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Ashil",
    role: "Students",
    candidateID: 141,
    gender: "Female",
    dob: "1926-09-18",
    shift: "Evening",
    employeeID: 2920,
    created: "2023-05-28",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-17",
        status: "present",
        time: "5:41 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:07 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "2:22 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "11:32 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "3:59 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "7:14 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "2:41 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:46 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "1:08 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "9:29 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "5:29 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:30 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "12:25 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "6:26 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "11:06 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "5:41 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "9:17 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "11:18 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:45 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "5:31 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "5:01 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:16 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "10:22 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "10:06 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:02 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:20 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "3:40 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "5:38 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "11:01 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "2:27 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Deck",
    role: "Students",
    candidateID: 691,
    gender: "Male",
    dob: "1944-01-25",
    shift: "Morning",
    employeeID: 2617,
    created: "2023-04-14",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-06",
        status: "present",
        time: "10:46 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "11:20 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "8:11 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "1:31 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:56 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "11:51 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:20 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "4:49 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:31 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "7:54 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "5:53 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "7:27 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "6:43 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "9:20 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "6:55 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:49 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "3:48 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "7:43 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "1:24 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:22 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "2:52 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:25 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "8:32 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "2:40 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "3:51 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "5:30 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:35 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "5:05 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "4:45 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "11:47 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Nady",
    role: "Students",
    candidateID: 875,
    gender: "Female",
    dob: "1926-05-16",
    shift: "Evening",
    employeeID: 2932,
    created: "2023-03-18",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-28",
        status: "present",
        time: "4:11 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "12:01 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "6:47 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "12:05 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "9:57 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "5:46 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "8:00 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "5:24 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:28 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "8:55 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "2:53 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "9:40 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "6:16 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "8:04 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:27 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "7:43 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "5:54 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "4:18 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "6:28 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "12:55 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "8:44 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:48 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "5:11 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "12:23 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "6:48 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "7:00 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:00 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "12:25 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "1:33 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "9:37 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Tisha",
    role: "Students",
    candidateID: 270,
    gender: "Female",
    dob: "1941-05-20",
    shift: "Evening",
    employeeID: 2345,
    created: "2023-04-02",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-05",
        status: "present",
        time: "1:47 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "5:54 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "7:00 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:02 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "9:57 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "2:31 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "4:00 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "6:13 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:04 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "12:40 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "9:44 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "2:46 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "1:24 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:19 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "4:34 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:43 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "6:17 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "2:17 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:18 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "1:07 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "7:22 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "2:56 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "4:33 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "12:18 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:05 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "9:00 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "1:47 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:07 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "1:09 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "1:41 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Ulrikaumeko",
    role: "Therapists",
    candidateID: 843,
    gender: "Female",
    dob: "1928-11-02",
    shift: "Evening",
    employeeID: 2257,
    created: "2023-05-17",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-20",
        status: "present",
        time: "3:26 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "12:30 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "3:46 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "11:36 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:00 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "2:43 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:11 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "6:21 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "7:18 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "8:40 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "6:31 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "1:13 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:55 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:27 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "8:20 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "6:39 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:40 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:28 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "2:40 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "7:45 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:58 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "11:01 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:58 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:42 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "2:04 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:47 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "5:43 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "6:19 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "6:41 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "8:43 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Jerrilyn",
    role: "Students",
    candidateID: 141,
    gender: "Female",
    dob: "1938-09-16",
    shift: "Morning",
    employeeID: 2966,
    created: "2023-02-12",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-22",
        status: "present",
        time: "3:42 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "3:37 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "6:27 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:55 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "10:55 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:49 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:45 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "7:27 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "9:37 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "11:58 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "9:51 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:54 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:57 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:55 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "11:42 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "5:21 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:23 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "8:57 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:14 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "8:40 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:43 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "4:39 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "12:13 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:08 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "3:43 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "5:53 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "9:38 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "4:32 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:19 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:12 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Rahal",
    role: "Students",
    candidateID: 599,
    gender: "Female",
    dob: "1949-08-27",
    shift: "Morning",
    employeeID: 2642,
    created: "2023-05-22",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-07",
        status: "present",
        time: "11:43 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "3:05 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:47 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "2:18 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "2:03 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "10:00 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "5:35 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:11 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "2:58 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "6:37 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "3:38 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "3:38 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:38 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "6:47 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "2:25 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "8:35 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "7:35 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:32 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "5:20 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:40 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:59 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "12:17 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "5:23 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "2:43 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "7:06 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:03 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "6:32 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:36 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "11:35 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "2:55 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Marianna",
    role: "Therapists",
    candidateID: 482,
    gender: "Female",
    dob: "1957-01-26",
    shift: "Morning",
    employeeID: 2357,
    created: "2023-06-27",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-15",
        status: "present",
        time: "9:24 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "10:35 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "1:21 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "10:10 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:08 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "10:06 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "12:42 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "3:28 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "9:58 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "5:11 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:20 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "11:20 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:46 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:10 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "5:05 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "10:58 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "10:56 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:04 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:29 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:06 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "10:59 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "10:52 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "9:48 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:49 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "5:01 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "10:58 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:51 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "8:48 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "12:18 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "5:44 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Aldon",
    role: "Students",
    candidateID: 888,
    gender: "Male",
    dob: "1976-02-27",
    shift: "Morning",
    employeeID: 2123,
    created: "2023-06-28",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-17",
        status: "present",
        time: "11:07 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "12:14 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "10:23 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "5:31 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "9:19 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "8:33 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "8:14 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "12:17 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "10:09 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "3:20 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "5:31 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "7:49 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "8:35 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:19 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:24 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:41 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:28 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "1:30 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "7:20 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "8:29 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "5:50 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "8:19 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "5:32 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "2:09 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "10:19 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:24 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "2:32 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:50 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "2:17 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "1:44 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Roseline",
    role: "Therapists",
    candidateID: 534,
    gender: "Female",
    dob: "1941-08-01",
    shift: "Evening",
    employeeID: 2805,
    created: "2023-02-20",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-21",
        status: "present",
        time: "5:24 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:40 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:39 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "12:40 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:09 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "12:54 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "7:07 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:58 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "5:33 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "3:34 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "9:24 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "5:24 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "6:42 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "12:56 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "11:34 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "4:50 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "6:10 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "12:36 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "3:48 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "6:54 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "1:00 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "2:08 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:27 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:17 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "3:15 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "9:41 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "7:55 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:38 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "3:57 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "7:09 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Alphonso",
    role: "Therapists",
    candidateID: 898,
    gender: "Male",
    dob: "1903-12-10",
    shift: "Morning",
    employeeID: 2803,
    created: "2023-10-05",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-18",
        status: "present",
        time: "9:57 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "1:23 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:53 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "12:01 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "5:51 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "5:39 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "3:14 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "8:54 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "3:55 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "6:59 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "1:13 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "4:38 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:33 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "10:52 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "5:11 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:35 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "1:48 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:01 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "8:27 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "12:09 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "8:53 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "6:06 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "9:39 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "3:01 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "12:13 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:30 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:31 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:36 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:09 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "4:40 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Bryon",
    role: "Therapists",
    candidateID: 944,
    gender: "Male",
    dob: "1913-03-22",
    shift: "Evening",
    employeeID: 2071,
    created: "2023-10-27",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-05",
        status: "present",
        time: "9:38 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:52 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:32 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "10:13 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "11:01 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "6:35 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "6:28 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "9:16 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "8:33 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:55 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "2:58 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "3:29 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "2:39 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "5:29 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "8:19 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "2:14 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "3:50 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:05 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "2:49 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:34 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:34 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "12:42 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "7:13 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "7:31 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "6:25 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:52 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:50 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:28 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "11:39 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "5:01 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Gideon",
    role: "Therapists",
    candidateID: 997,
    gender: "Male",
    dob: "1989-01-11",
    shift: "Evening",
    employeeID: 2945,
    created: "2023-08-15",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-03",
        status: "present",
        time: "7:13 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "10:14 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:38 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "9:01 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "3:27 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "10:19 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "4:51 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:36 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "6:15 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "2:31 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "5:01 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "12:01 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "12:12 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:46 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "9:40 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "10:22 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "3:04 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "9:00 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "6:21 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "9:16 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "2:26 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "12:54 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "9:21 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "1:18 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "6:13 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:52 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "11:48 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "5:46 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "6:39 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "11:53 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Ragnar",
    role: "Students",
    candidateID: 765,
    gender: "Male",
    dob: "1950-01-24",
    shift: "Evening",
    employeeID: 2111,
    created: "2023-09-03",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-30",
        status: "present",
        time: "11:52 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "5:27 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:52 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:18 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "5:52 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "1:25 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "8:56 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "6:36 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:51 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "4:38 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:47 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "10:17 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "1:09 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "9:36 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "10:53 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "6:57 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "4:40 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:01 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "4:23 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "11:39 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "2:34 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "5:36 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:08 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "10:47 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:29 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "2:36 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:37 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "3:44 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "3:23 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "2:31 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Jewelle",
    role: "Therapists",
    candidateID: 313,
    gender: "Female",
    dob: "1900-02-09",
    shift: "Evening",
    employeeID: 2058,
    created: "2023-10-14",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-14",
        status: "present",
        time: "8:12 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:57 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:36 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "4:05 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "5:40 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "2:59 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "3:46 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:22 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "8:55 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "1:16 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "11:09 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "6:34 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "1:16 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "11:53 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "3:50 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "5:57 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "12:08 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "7:11 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "8:54 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:08 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "2:40 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "11:21 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "8:51 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "5:57 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "12:39 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "2:57 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "6:33 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "9:27 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "1:17 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "2:39 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Amelia",
    role: "Students",
    candidateID: 158,
    gender: "Female",
    dob: "1938-08-25",
    shift: "Morning",
    employeeID: 2230,
    created: "2023-03-05",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-11",
        status: "present",
        time: "12:36 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "9:00 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "11:49 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "2:48 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:46 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "8:51 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:08 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "12:40 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:42 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "5:54 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "5:18 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "7:12 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "8:52 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "8:42 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "9:28 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:51 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:32 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "5:27 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:27 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:36 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "8:37 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "6:16 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "6:34 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "5:13 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "7:25 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "8:12 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:12 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:54 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:23 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "5:51 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Nicolai",
    role: "Students",
    candidateID: 58,
    gender: "Male",
    dob: "1919-01-07",
    shift: "Morning",
    employeeID: 2841,
    created: "2023-07-03",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-24",
        status: "present",
        time: "1:49 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "4:28 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "8:28 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "6:08 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "10:49 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "9:46 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "12:14 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "12:32 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:40 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "9:45 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:04 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:59 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "4:18 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "12:37 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "10:58 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "7:49 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "1:39 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:13 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:04 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:05 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "12:32 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "9:21 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "1:48 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "12:04 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "8:00 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "12:30 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "5:12 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "9:44 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:53 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "11:25 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Dennie",
    role: "Therapists",
    candidateID: 116,
    gender: "Male",
    dob: "1910-08-02",
    shift: "Morning",
    employeeID: 2510,
    created: "2023-05-25",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-20",
        status: "present",
        time: "6:49 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "9:48 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "3:51 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "3:46 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "5:13 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "10:40 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "12:55 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:43 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "7:32 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:27 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "8:29 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:29 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:48 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "1:06 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:45 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "12:56 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "2:44 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "5:46 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "7:30 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "10:03 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "8:18 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "2:20 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "1:22 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "5:17 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "5:11 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "8:46 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "5:12 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "7:51 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:36 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "3:11 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Audry",
    role: "Students",
    candidateID: 716,
    gender: "Female",
    dob: "1903-07-22",
    shift: "Morning",
    employeeID: 2112,
    created: "2023-01-28",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-24",
        status: "present",
        time: "1:08 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "11:54 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "1:33 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "4:58 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "10:44 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "9:35 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "10:57 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:26 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "3:41 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:30 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "8:45 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "6:55 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "5:11 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "11:38 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "12:48 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "7:57 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:53 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "7:14 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "1:11 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "8:54 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "2:18 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "6:18 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "6:17 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "2:45 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:22 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "10:35 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "6:29 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "8:50 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "10:31 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "5:40 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Dev",
    role: "Therapists",
    candidateID: 254,
    gender: "Male",
    dob: "1960-09-25",
    shift: "Evening",
    employeeID: 2651,
    created: "2023-11-27",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-17",
        status: "present",
        time: "3:48 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "1:02 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "5:43 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:42 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:48 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:35 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "1:26 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "12:21 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "12:23 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "7:36 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:43 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "3:12 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "11:39 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "7:35 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "1:56 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "8:59 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "6:19 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "6:56 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:29 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:04 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "10:40 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:36 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "10:20 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "12:46 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "10:59 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:48 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "10:59 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "8:07 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "12:16 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "8:29 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Edy",
    role: "Therapists",
    candidateID: 312,
    gender: "Female",
    dob: "1938-01-29",
    shift: "Morning",
    employeeID: 2042,
    created: "2023-07-04",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-23",
        status: "present",
        time: "5:40 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "12:59 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:09 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "11:10 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:55 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "10:34 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "2:48 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "12:52 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "5:53 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "11:38 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "11:28 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "1:12 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:38 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "9:26 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "2:16 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "11:36 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "4:45 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "4:52 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "8:34 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:31 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "8:13 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:31 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "9:31 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "2:54 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "5:58 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:46 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "12:08 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "7:25 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "11:33 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "1:01 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Ivett",
    role: "Therapists",
    candidateID: 13,
    gender: "Female",
    dob: "1991-07-08",
    shift: "Evening",
    employeeID: 2354,
    created: "2023-05-09",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-24",
        status: "present",
        time: "12:01 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "5:16 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:08 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "11:31 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "5:39 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "1:13 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "6:34 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "7:54 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "4:10 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "7:00 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "10:47 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "1:24 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "12:40 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "6:55 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:07 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "4:31 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:29 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "6:10 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "8:09 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:44 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "12:36 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "6:49 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "3:37 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:48 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:39 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:53 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "8:41 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "4:41 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "3:03 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "10:36 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Danna",
    role: "Therapists",
    candidateID: 19,
    gender: "Female",
    dob: "1951-12-07",
    shift: "Evening",
    employeeID: 2121,
    created: "2023-03-27",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-18",
        status: "present",
        time: "4:04 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "10:13 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:45 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "2:22 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "6:50 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "5:51 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "10:27 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "6:11 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:37 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "12:41 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "4:47 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "6:03 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "3:17 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "7:30 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "7:42 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "10:34 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "7:26 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:44 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "8:44 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "10:07 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "9:36 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "9:15 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:48 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:44 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "8:51 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "5:28 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:20 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:31 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "11:46 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "5:33 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Vita",
    role: "Therapists",
    candidateID: 216,
    gender: "Female",
    dob: "1978-03-16",
    shift: "Morning",
    employeeID: 2530,
    created: "2023-06-28",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-30",
        status: "present",
        time: "4:30 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "8:53 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "3:44 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "10:57 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "7:19 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "4:02 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "9:59 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "10:40 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:53 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "2:59 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "5:19 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:08 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "8:14 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:45 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:02 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "1:14 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:03 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:03 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:48 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "7:35 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "3:48 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "6:00 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "1:05 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "12:04 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "9:13 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "3:53 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:03 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "9:48 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "11:23 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "11:49 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Brock",
    role: "Students",
    candidateID: 355,
    gender: "Male",
    dob: "1902-08-01",
    shift: "Morning",
    employeeID: 2520,
    created: "2023-02-03",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-22",
        status: "present",
        time: "5:35 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "4:52 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "2:34 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "2:00 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "7:09 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "4:38 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:01 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "4:06 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "9:44 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "6:16 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "9:12 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "8:44 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "11:04 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "3:44 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "7:27 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "5:57 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "12:19 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "10:12 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "12:22 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "12:02 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "12:00 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:11 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:54 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "8:12 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "2:54 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "3:10 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:05 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "3:34 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:51 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "9:26 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Everard",
    role: "Students",
    candidateID: 491,
    gender: "Male",
    dob: "1986-06-25",
    shift: "Morning",
    employeeID: 2675,
    created: "2023-06-12",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-19",
        status: "present",
        time: "2:19 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:34 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "5:58 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "6:21 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "5:02 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "6:49 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "1:44 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "4:38 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "5:25 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "10:48 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "1:43 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "8:38 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "2:10 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "6:21 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "11:11 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "2:26 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:05 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:45 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "12:20 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:11 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "1:38 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "11:55 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "7:29 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "11:45 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "11:51 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "3:43 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "10:17 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:39 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "3:37 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "2:24 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Car",
    role: "Therapists",
    candidateID: 978,
    gender: "Male",
    dob: "1903-06-04",
    shift: "Morning",
    employeeID: 2211,
    created: "2023-03-30",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-14",
        status: "present",
        time: "5:34 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "9:57 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "6:09 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "7:43 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:08 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:07 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:58 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "5:23 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "2:24 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "3:32 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:02 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "4:08 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "1:55 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "8:55 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:09 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "4:15 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "2:57 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "6:28 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "2:01 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "1:28 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "8:14 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "7:55 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:05 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:08 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "9:40 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:55 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:20 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:13 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:45 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:29 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Pamelina",
    role: "Students",
    candidateID: 400,
    gender: "Female",
    dob: "1954-04-30",
    shift: "Morning",
    employeeID: 2064,
    created: "2023-01-23",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-23",
        status: "present",
        time: "8:47 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "10:37 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:54 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:43 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "4:48 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "2:25 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "12:00 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "6:19 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:31 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "7:44 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "12:48 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "8:38 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "2:40 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "10:55 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "8:14 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "10:24 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "7:04 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "12:42 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "7:06 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "11:00 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "11:28 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "2:33 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "4:05 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "7:11 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "6:23 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "7:50 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:16 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "8:01 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "1:19 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "4:14 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Brita",
    role: "Therapists",
    candidateID: 758,
    gender: "Female",
    dob: "1937-10-09",
    shift: "Evening",
    employeeID: 2303,
    created: "2023-11-30",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-06",
        status: "present",
        time: "3:10 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "2:50 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "11:11 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "3:33 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "12:06 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "5:25 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "6:55 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "6:02 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "12:41 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "6:06 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "4:55 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "2:21 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "1:36 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:47 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:39 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:15 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:42 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "10:47 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:48 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "1:00 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "9:31 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "9:19 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "7:12 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "5:47 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "1:36 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "7:55 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "7:18 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "2:29 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "10:23 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "3:12 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Roddie",
    role: "Therapists",
    candidateID: 984,
    gender: "Male",
    dob: "1908-08-09",
    shift: "Evening",
    employeeID: 2590,
    created: "2023-08-20",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-25",
        status: "present",
        time: "1:53 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "6:44 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "12:22 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:42 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "12:19 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "5:15 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:13 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:06 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "12:10 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "12:27 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "11:46 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "2:48 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "10:09 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "8:45 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "6:48 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "12:04 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "2:42 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "9:55 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "11:32 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "7:52 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:58 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:07 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "4:48 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "8:31 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "1:15 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "1:43 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:08 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "6:18 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "7:11 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "4:10 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Grady",
    role: "Therapists",
    candidateID: 380,
    gender: "Male",
    dob: "1969-06-07",
    shift: "Evening",
    employeeID: 2339,
    created: "2023-06-08",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-27",
        status: "present",
        time: "6:34 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "10:05 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "11:41 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "1:34 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:40 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:23 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "6:32 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "5:52 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "1:45 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "9:18 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:11 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "3:45 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "6:39 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "8:51 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:09 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:52 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "1:47 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "6:43 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "5:47 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "3:35 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "7:30 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:56 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:36 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:14 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "7:17 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:57 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "9:04 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:41 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "4:00 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "12:56 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Phineas",
    role: "Students",
    candidateID: 180,
    gender: "Male",
    dob: "1922-03-24",
    shift: "Evening",
    employeeID: 2344,
    created: "2023-12-21",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-06",
        status: "present",
        time: "2:06 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "9:46 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:57 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "9:53 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:52 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:09 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:42 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "2:29 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "8:06 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:18 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "2:07 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:20 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:07 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "4:57 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:27 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "7:05 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:34 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "9:01 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "6:55 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "6:39 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "7:16 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "10:04 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:04 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "11:14 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "1:12 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "10:48 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:39 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:10 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "3:35 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "3:53 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Lamont",
    role: "Students",
    candidateID: 883,
    gender: "Male",
    dob: "1972-07-28",
    shift: "Evening",
    employeeID: 2893,
    created: "2023-12-23",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-24",
        status: "present",
        time: "6:37 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "11:32 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "11:09 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "7:17 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "2:37 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "5:31 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "6:49 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "8:20 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "8:34 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:56 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "9:44 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:42 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "5:18 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "8:18 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "10:17 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "2:11 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "11:07 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:25 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "3:04 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "11:48 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "8:46 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "2:04 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "6:14 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "11:24 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "5:47 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "1:57 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "4:10 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "8:05 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "1:05 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "11:37 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Christiana",
    role: "Therapists",
    candidateID: 532,
    gender: "Female",
    dob: "1997-05-28",
    shift: "Morning",
    employeeID: 2604,
    created: "2023-05-08",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-01",
        status: "present",
        time: "6:30 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "12:34 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:56 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "8:50 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:42 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:41 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:37 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "8:26 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:46 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "8:39 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "9:48 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "1:53 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "6:45 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "4:20 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "2:11 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "4:36 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "5:59 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:43 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "9:23 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:30 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "10:42 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "8:28 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "5:06 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "9:56 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "4:05 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "4:35 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "4:02 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "9:56 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "3:45 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "9:55 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Mart",
    role: "Therapists",
    candidateID: 39,
    gender: "Male",
    dob: "1904-04-13",
    shift: "Evening",
    employeeID: 2558,
    created: "2023-07-29",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-11",
        status: "present",
        time: "12:51 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "11:28 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "6:47 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "4:51 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:15 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "12:06 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "4:59 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "2:30 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:00 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:05 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "7:03 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "2:48 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "10:31 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "11:29 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "12:15 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "9:18 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "3:08 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:41 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "3:45 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:26 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:48 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:14 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "5:00 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "3:38 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:16 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "9:34 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "2:35 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "8:48 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "10:47 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:02 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Natassia",
    role: "Students",
    candidateID: 143,
    gender: "Female",
    dob: "1951-11-17",
    shift: "Morning",
    employeeID: 2678,
    created: "2023-11-29",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-24",
        status: "present",
        time: "2:46 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "12:10 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "6:56 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:12 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "10:31 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "9:18 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "1:03 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "6:31 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:22 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "5:21 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "8:24 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "3:17 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "6:14 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:45 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "6:47 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:51 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "6:50 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "1:39 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "1:48 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "4:54 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "11:39 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:14 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "12:31 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "2:40 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "6:26 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "11:04 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "8:41 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:18 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "5:45 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "9:09 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Cyb",
    role: "Therapists",
    candidateID: 94,
    gender: "Female",
    dob: "1926-05-29",
    shift: "Morning",
    employeeID: 2495,
    created: "2023-09-02",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-18",
        status: "present",
        time: "9:18 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "6:26 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "12:37 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "12:40 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "4:53 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:23 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "9:35 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "3:59 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "1:49 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "2:32 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "8:16 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:06 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "12:36 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "8:33 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:37 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "7:41 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:14 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "6:22 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "7:55 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "12:25 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "5:58 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:34 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "1:43 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "6:59 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "7:33 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:50 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "2:21 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "11:00 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "4:27 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "3:46 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Griffith",
    role: "Students",
    candidateID: 239,
    gender: "Male",
    dob: "1903-08-13",
    shift: "Morning",
    employeeID: 2146,
    created: "2023-08-26",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-04",
        status: "present",
        time: "10:47 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:20 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:25 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "11:38 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "11:53 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "11:07 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "5:39 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "3:48 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "12:04 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "6:06 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "9:10 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "2:32 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "9:17 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "9:32 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "8:55 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:42 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:25 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:33 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "1:28 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "1:42 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "1:11 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "3:18 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "12:14 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:00 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "8:19 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "4:28 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "1:02 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "10:37 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "10:35 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:07 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Cosimo",
    role: "Students",
    candidateID: 481,
    gender: "Male",
    dob: "1969-08-31",
    shift: "Morning",
    employeeID: 2399,
    created: "2023-01-07",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-14",
        status: "present",
        time: "9:54 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:28 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "8:42 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "1:02 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "4:05 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "6:56 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:19 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "2:59 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:32 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "3:33 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:59 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:57 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "2:41 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "4:12 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "3:39 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "7:43 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "3:27 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "4:27 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:11 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "10:41 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:37 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "9:11 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:39 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "6:16 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "7:36 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "7:22 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "5:06 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "8:16 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:36 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "11:30 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Jena",
    role: "Students",
    candidateID: 481,
    gender: "Female",
    dob: "1965-12-07",
    shift: "Morning",
    employeeID: 2280,
    created: "2023-11-26",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-29",
        status: "present",
        time: "4:28 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:09 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "7:10 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "6:37 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "7:06 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:42 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "6:18 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "9:26 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "4:50 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "7:55 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:34 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "8:52 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "12:43 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "4:53 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "4:25 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "6:09 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "7:54 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "6:39 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "1:35 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "2:20 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "9:59 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:34 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "4:14 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "4:13 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "2:55 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "4:46 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "11:16 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "2:09 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "2:36 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "10:21 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Glenna",
    role: "Therapists",
    candidateID: 718,
    gender: "Female",
    dob: "1959-07-02",
    shift: "Evening",
    employeeID: 2853,
    created: "2023-04-02",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-29",
        status: "present",
        time: "7:26 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "10:10 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "12:32 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "9:44 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "4:42 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "4:01 AM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "9:04 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:14 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "10:12 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:18 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "11:51 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "6:41 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "10:39 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "3:30 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "5:32 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "6:59 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "1:17 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "4:58 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "3:17 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "7:05 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "11:25 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "7:12 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:22 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "9:49 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "4:01 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "11:04 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "6:10 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "7:06 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "5:53 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "5:41 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Damon",
    role: "Therapists",
    candidateID: 912,
    gender: "Male",
    dob: "1902-08-28",
    shift: "Evening",
    employeeID: 2345,
    created: "2023-03-09",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-21",
        status: "present",
        time: "4:47 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:12 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "9:56 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:06 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "4:11 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:57 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:54 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "6:54 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "2:10 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "8:16 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "9:36 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "5:41 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:40 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "3:07 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "2:03 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "12:09 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:14 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "7:59 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:05 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:00 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:33 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "10:16 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "8:03 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "3:23 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:13 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "3:38 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:21 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "1:37 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "12:43 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "12:22 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Viviyan",
    role: "Students",
    candidateID: 142,
    gender: "Female",
    dob: "1936-02-08",
    shift: "Morning",
    employeeID: 2378,
    created: "2023-08-23",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-14",
        status: "present",
        time: "8:45 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "5:04 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "8:19 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "1:53 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "9:52 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "1:35 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "9:09 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "1:19 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:31 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:43 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "9:46 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "6:37 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "10:17 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "1:00 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "2:35 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "7:36 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "7:26 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "1:51 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "5:22 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "7:51 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "5:43 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "12:03 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "1:12 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "2:07 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:53 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:40 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "3:33 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "10:05 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "1:57 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "9:15 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Rinaldo",
    role: "Therapists",
    candidateID: 453,
    gender: "Male",
    dob: "1965-08-14",
    shift: "Morning",
    employeeID: 2261,
    created: "2023-03-03",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-13",
        status: "present",
        time: "4:09 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "10:33 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "2:16 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "5:18 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "7:49 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "1:57 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "1:40 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "2:57 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "9:11 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "6:02 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "3:04 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "5:36 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "2:15 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "8:58 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "2:50 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "10:30 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "8:29 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "12:31 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "5:26 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:19 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "3:05 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "1:05 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "11:47 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "10:38 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "4:17 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "12:57 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "3:39 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:28 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "4:57 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "4:38 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Gaylor",
    role: "Therapists",
    candidateID: 94,
    gender: "Male",
    dob: "1954-10-17",
    shift: "Morning",
    employeeID: 2185,
    created: "2023-12-11",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-12",
        status: "present",
        time: "9:07 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "7:31 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "1:37 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "1:17 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:22 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "12:26 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "6:32 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "10:38 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "11:26 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "10:30 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "9:24 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "9:20 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "10:42 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "3:39 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "12:51 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:35 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "1:24 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "8:06 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "10:01 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "1:24 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:34 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "12:06 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "7:18 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "6:44 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "6:20 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "3:37 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "5:01 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "2:37 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "1:27 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "12:58 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Arthur",
    role: "Therapists",
    candidateID: 135,
    gender: "Male",
    dob: "1914-08-08",
    shift: "Morning",
    employeeID: 2029,
    created: "2023-08-09",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-19",
        status: "present",
        time: "1:55 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "2:16 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "9:16 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "8:50 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "1:32 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:55 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "2:20 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "6:15 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "11:09 AM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "6:59 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:51 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "1:48 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "6:18 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "5:34 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "3:58 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "8:33 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:24 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "11:32 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:20 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "4:03 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "8:47 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "7:37 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "9:16 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "7:27 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "12:48 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "2:12 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "11:46 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "1:18 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "11:00 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "7:27 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Ker",
    role: "Therapists",
    candidateID: 918,
    gender: "Male",
    dob: "1959-12-02",
    shift: "Morning",
    employeeID: 2297,
    created: "2023-08-03",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-30",
        status: "present",
        time: "10:13 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "3:12 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:32 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "10:12 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "3:35 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "3:15 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "9:13 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:29 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "2:27 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "7:56 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "11:24 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "12:55 PM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "2:00 PM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "1:36 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "5:42 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "7:23 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "8:01 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "1:18 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "6:25 AM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "6:48 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "7:54 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "1:25 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "2:07 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "11:16 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:28 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "4:25 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "5:08 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "11:02 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "4:47 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "2:54 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Dex",
    role: "Therapists",
    candidateID: 965,
    gender: "Male",
    dob: "1942-02-25",
    shift: "Evening",
    employeeID: 2060,
    created: "2023-02-24",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-07",
        status: "present",
        time: "6:06 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "8:41 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "2:52 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "1:13 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "2:04 AM",
      },
      {
        date: "2023-12-16",
        status: "present",
        time: "10:09 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "6:45 AM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "9:02 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "9:58 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "2:49 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "1:05 PM",
      },
      {
        date: "2024-01-21",
        status: "present",
        time: "5:27 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "9:32 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "12:10 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "3:21 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "10:51 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "11:16 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "3:45 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "7:24 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "7:13 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "8:51 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:44 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "11:48 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "10:51 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:43 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "7:42 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "9:29 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "5:21 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "12:19 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "11:41 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Anatole",
    role: "Students",
    candidateID: 703,
    gender: "Male",
    dob: "1934-12-08",
    shift: "Morning",
    employeeID: 2582,
    created: "2023-02-22",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-26",
        status: "present",
        time: "9:06 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "12:00 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:28 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "2:57 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "6:10 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:19 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "4:40 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "2:02 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:47 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "10:46 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "7:36 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "3:57 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "12:38 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "11:13 AM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "12:55 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:18 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "10:44 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "10:14 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "5:43 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "2:33 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "1:45 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "9:08 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "7:39 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "7:26 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "10:29 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "5:39 PM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "4:05 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "11:40 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:47 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "12:16 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Friedrich",
    role: "Therapists",
    candidateID: 733,
    gender: "Male",
    dob: "1961-03-21",
    shift: "Morning",
    employeeID: 2704,
    created: "2023-08-02",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-13",
        status: "present",
        time: "5:38 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "9:09 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "8:08 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "3:07 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:42 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "8:59 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "6:12 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "6:23 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "10:04 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "10:53 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "11:31 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "2:41 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "7:18 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "7:11 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "5:48 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "10:46 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "4:16 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:28 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "4:15 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "11:58 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:12 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:21 PM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "8:52 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "2:30 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "2:49 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "9:44 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "8:49 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "4:59 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "8:24 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "1:40 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Gallard",
    role: "Students",
    candidateID: 838,
    gender: "Male",
    dob: "1938-06-28",
    shift: "Morning",
    employeeID: 2255,
    created: "2023-06-13",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-18",
        status: "present",
        time: "1:09 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "9:30 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "3:44 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "5:55 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "11:08 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "4:46 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "2:51 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "1:56 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "7:39 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "1:39 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "7:37 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "6:38 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:46 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:32 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "5:45 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "12:20 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "2:29 PM",
      },
      {
        date: "2024-01-02",
        status: "present",
        time: "1:45 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "1:38 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:07 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "9:38 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "4:55 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "9:20 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "2:33 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:46 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "12:50 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "6:21 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "1:55 AM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "7:30 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "11:37 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Lorette",
    role: "Therapists",
    candidateID: 861,
    gender: "Female",
    dob: "1928-09-23",
    shift: "Evening",
    employeeID: 2694,
    created: "2023-06-09",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-25",
        status: "present",
        time: "6:47 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:52 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "8:18 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:09 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "5:19 AM",
      },
      {
        date: "2024-01-18",
        status: "present",
        time: "7:00 AM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "3:47 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "5:02 PM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "4:16 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "11:41 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "11:05 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "6:36 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "2:23 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "9:46 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "1:27 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "11:23 AM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "1:01 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "11:10 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "9:05 PM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "4:02 AM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "2:45 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "7:42 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:50 PM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "9:44 AM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "11:36 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "8:43 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "8:18 PM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "10:32 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "7:09 AM",
      },
      {
        date: "2024-01-22",
        status: "present",
        time: "11:30 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Maxim",
    role: "Students",
    candidateID: 617,
    gender: "Male",
    dob: "1924-03-26",
    shift: "Morning",
    employeeID: 2766,
    created: "2023-07-29",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2024-01-12",
        status: "present",
        time: "3:00 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "5:51 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "5:41 PM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "10:27 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "9:39 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "2:08 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "12:34 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "9:21 PM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "5:08 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "3:24 AM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "3:27 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "3:23 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "9:37 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "6:23 PM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "9:41 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "3:47 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "7:56 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "9:11 PM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "1:32 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "9:27 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "3:05 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "3:10 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "9:59 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "5:27 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "4:17 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "10:40 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:17 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "6:01 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:06 PM",
      },
      {
        date: "2023-12-23",
        status: "present",
        time: "12:59 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Domeniga",
    role: "Students",
    candidateID: 416,
    gender: "Female",
    dob: "1940-05-15",
    shift: "Evening",
    employeeID: 2877,
    created: "2023-05-20",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-24",
        status: "present",
        time: "9:38 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "10:48 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "5:27 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "2:54 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "6:00 PM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "1:17 PM",
      },
      {
        date: "2023-12-27",
        status: "present",
        time: "9:41 AM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "4:40 PM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "3:31 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "5:21 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "9:10 PM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "8:21 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "3:11 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "5:06 AM",
      },
      {
        date: "2023-12-18",
        status: "present",
        time: "7:41 AM",
      },
      {
        date: "2023-12-14",
        status: "present",
        time: "8:40 PM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "4:24 PM",
      },
      {
        date: "2023-12-20",
        status: "present",
        time: "9:07 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "9:08 AM",
      },
      {
        date: "2024-01-17",
        status: "present",
        time: "7:27 AM",
      },
      {
        date: "2023-12-24",
        status: "present",
        time: "10:32 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "1:28 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "1:45 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:19 AM",
      },
      {
        date: "2023-12-15",
        status: "present",
        time: "3:58 AM",
      },
      {
        date: "2024-01-15",
        status: "present",
        time: "12:40 PM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "3:51 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "5:04 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "6:13 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "12:23 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Maure",
    role: "Students",
    candidateID: 679,
    gender: "Female",
    dob: "1962-07-21",
    shift: "Morning",
    employeeID: 2810,
    created: "2023-02-27",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-31",
        status: "present",
        time: "6:22 AM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "10:20 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "9:52 PM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "1:12 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "4:29 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "10:05 PM",
      },
      {
        date: "2024-01-08",
        status: "present",
        time: "1:07 AM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "3:47 AM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "7:58 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:35 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "5:06 PM",
      },
      {
        date: "2023-12-13",
        status: "present",
        time: "7:10 PM",
      },
      {
        date: "2024-01-05",
        status: "present",
        time: "8:07 PM",
      },
      {
        date: "2024-01-09",
        status: "present",
        time: "10:24 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "12:49 AM",
      },
      {
        date: "2024-01-16",
        status: "present",
        time: "3:20 AM",
      },
      {
        date: "2023-12-30",
        status: "present",
        time: "9:21 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "3:26 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "3:26 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "12:51 PM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "10:02 PM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "10:42 PM",
      },
      {
        date: "2024-01-14",
        status: "present",
        time: "12:24 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "1:24 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "10:07 PM",
      },
      {
        date: "2023-12-28",
        status: "present",
        time: "6:01 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "12:15 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "5:39 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "3:53 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "1:08 PM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
  {
    name: "Hanny",
    role: "Students",
    candidateID: 908,
    gender: "Female",
    dob: "1980-09-13",
    shift: "Evening",
    employeeID: 2540,
    created: "2023-02-13",
    video:
      "https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1",
    photoa:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photob:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    photoc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    attendance: [
      {
        date: "2023-12-16",
        status: "present",
        time: "4:44 AM",
      },
      {
        date: "2024-01-19",
        status: "present",
        time: "6:06 PM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "10:58 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "1:47 PM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "4:16 PM",
      },
      {
        date: "2024-01-10",
        status: "present",
        time: "5:02 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "10:49 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "8:06 AM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "6:34 AM",
      },
      {
        date: "2023-12-25",
        status: "present",
        time: "2:37 AM",
      },
      {
        date: "2024-01-11",
        status: "present",
        time: "2:25 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "11:34 PM",
      },
      {
        date: "2024-01-07",
        status: "present",
        time: "9:52 AM",
      },
      {
        date: "2024-01-20",
        status: "present",
        time: "12:18 AM",
      },
      {
        date: "2024-01-01",
        status: "present",
        time: "8:12 PM",
      },
      {
        date: "2023-12-21",
        status: "present",
        time: "11:58 AM",
      },
      {
        date: "2024-01-13",
        status: "present",
        time: "12:03 PM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "9:36 PM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "6:40 AM",
      },
      {
        date: "2024-01-12",
        status: "present",
        time: "4:13 AM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "7:37 AM",
      },
      {
        date: "2024-01-03",
        status: "present",
        time: "2:16 PM",
      },
      {
        date: "2023-12-29",
        status: "present",
        time: "4:12 AM",
      },
      {
        date: "2023-12-31",
        status: "present",
        time: "12:09 PM",
      },
      {
        date: "2023-12-17",
        status: "present",
        time: "12:57 AM",
      },
      {
        date: "2023-12-26",
        status: "present",
        time: "8:01 AM",
      },
      {
        date: "2023-12-19",
        status: "present",
        time: "8:58 PM",
      },
      {
        date: "2024-01-06",
        status: "present",
        time: "7:22 AM",
      },
      {
        date: "2023-12-22",
        status: "present",
        time: "11:34 AM",
      },
      {
        date: "2024-01-04",
        status: "present",
        time: "1:05 AM",
      },
    ],
    adminID: "30br68mclrqrohrz",
    admin: "hari",
  },
];
