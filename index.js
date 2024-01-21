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

const attendanceRouter = require("./routes/attendance");

app.use("/ablelyf", attendanceRouter);

app.listen(port, () => {
  console.log(`app ${port} successfully running`);
});
