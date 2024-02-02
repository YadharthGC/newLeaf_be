const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://ganeshyadharth:AbleLyf@students.jbrazv2.mongodb.net/?retryWrites=true&w=majority";
let changeStream;

async function startChangeStream() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("AbleLyf");
  const collection = db.collection("candidates");

  changeStream = collection.watch();

  changeStream.on("change", (change) => {
    console.log("change", change);
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
