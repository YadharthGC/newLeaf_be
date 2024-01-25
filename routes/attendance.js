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
} = require("../controllers/attendanceFunctions");

const router = require("express").Router();

router.post("/registeradmin", handleRegisterAdmin);
router.post("/login", handleLoginAdmin);
router.post("/add", handleAddUser);
// router.get("/dem", demUser);
router.post("/getData", handleGetCandidates);
router.post("/deleteId", handleDeleteCandidates);
router.post("/attendancechange", handleAttendanceChange);
router.get("/entries", handleEntries);
router.get("/deleteentries", handleEntriesDelete);
module.exports = router;
