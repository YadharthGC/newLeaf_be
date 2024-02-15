const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://ganeshyadharth:AbleLyf@students.jbrazv2.mongodb.net/?retryWrites=true&w=majority";
let changeStream;

async function startChangeStream() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("AbleLyf");

  changeStreamCandidates = db.collection("candidates").watch();
  changeStreamAttendance = db.collection("attendance").watch();

  changeStreamCandidates.on("change", (change) => {
    console.log("candidates database changed");
  });
  changeStreamAttendance.on("change", (change) => {
    console.log("attendance database changed");
  });
}

function stopChangeStream() {
  if (changeStream) {
    changeStream.close();
  }
}

module.exports = {
  startChangeStream,
  stopChangeStream,
};
