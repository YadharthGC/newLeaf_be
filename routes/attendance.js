const {
  loginUser,
  registerUser,
  addUser,
  demUser,
  getUser,
  deleteUser,
  getAttendanceRouter,
} = require("../controllers/attendanceFunctions");

const router = require("express").Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/add", addUser);
router.post("/dem", demUser);
router.get("/getData", getUser);
router.post("/deleteId", deleteUser);
router.get("/getAttendance", getAttendanceRouter);
module.exports = router;
