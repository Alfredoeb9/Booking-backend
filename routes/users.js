const express = require("express");
const {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const { verifyToken } = require("../lib/passport");
const { requireAuth, verifyUser } = require("../middleware/requireAuth");
const { handleError } = require("../utils/errorHandler");

const router = express.Router();

router.get("/checkauth", requireAuth, (req, res, next) => {
  res.send("Hello user you are authenticated");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
});

// GET ALL
router.get("/", getUsers);

// GET
router.get("/:id", getOneUser);

// UPDATE USER
router.put("/:id", updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

module.exports = router;
