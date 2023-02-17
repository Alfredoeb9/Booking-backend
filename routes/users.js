const express = require("express");
const {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const { verifyToken } = require("../lib/passport");
const {
  requireAuth,
  verifyUser,
  verifyAdmin,
} = require("../middleware/requireAuth");
const { handleError } = require("../utils/errorHandler");

const router = express.Router();

// router.get("/checkauth", requireAuth, (req, res, next) => {
//   res.send("Hello user you are authenticated");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyUser, (req, res, next) => {
//   res.send("hello admin, you are logged in and you can delete all accounts");
// });

// GET ALL
router.get("/", verifyAdmin, getUsers);

// GET
router.get("/:id", verifyUser, getOneUser);

// UPDATE USER
router.put("/:id", verifyUser, updateUser);

// DELETE USER
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
