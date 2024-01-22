const {
  handleLoginAdmin,
  registerUser,
  addUser,
  demUser,
  getUser,
  deleteUser,
  getAttendanceRouter,
  handleRegisterAdmin,
} = require("../controllers/attendanceFunctions");

const router = require("express").Router();

router.post("/registeradmin", handleRegisterAdmin);
router.post("/login", handleLoginAdmin);
router.post("/register", registerUser);
router.post("/add", addUser);
router.post("/dem", demUser);
router.get("/getData", getUser);
router.post("/deleteId", deleteUser);
router.get("/getAttendance", getAttendanceRouter);
module.exports = router;
