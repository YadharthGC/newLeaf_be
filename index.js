const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// io.on("connection", (socket) => {
//   console.log("userConnected", socket.id);

//   socket.on("getMessage", (data) => {
//     console.log("getting");
//     socket.broadcast.emit("receive_msg", { message: "haida" });
//   });
// });
const attendanceRouter = require("./routes/attendance");

app.use("/ablelyf", attendanceRouter);

app.listen(port, () => {
  console.log(`app ${port} successfully running`);
});
