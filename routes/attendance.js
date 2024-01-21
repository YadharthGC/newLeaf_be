const {
  loginUser,
  registerUser,
  addUser,
  demUser,
  getUser,
  deleteUser,
} = require("../controllers/attendanceFunctions");

const router = require("express").Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/add", addUser);
router.post("/dem", demUser);
router.get("/getData", getUser);
router.post("/deleteId", deleteUser);
module.exports = router;
