const {
  handleRegisterAdmin,
  handleLoginAdmin,
  handleGetCandidates,
  handleAddUser,
  handleDeleteCandidates,
  demUser,
  handleEntries,
  handleAttendanceChange,
  handleEntriesDelete,
  handleAddCam,
  handleGetCrowd,
  handleGetHeat,
} = require("../controllers/attendanceFunctions");
const changeStream = require("../changeStream");
const router = require("express").Router();

// changeStream.startChangeStream();
router.post("/registeradmin", handleRegisterAdmin);
router.post("/login", handleLoginAdmin);
router.post("/add", handleAddUser);
// router.get("/dem", demUser);
router.post("/getData", handleGetCandidates);
router.post("/deleteId", handleDeleteCandidates);
router.post("/attendancechange", handleAttendanceChange);
router.post("/entries", handleEntries);
router.get("/deleteentries", handleEntriesDelete);
router.post("/addCam", handleAddCam);
router.get("/crowdentries", handleGetCrowd);
router.get("/heatentries", handleGetHeat);
module.exports = router;
