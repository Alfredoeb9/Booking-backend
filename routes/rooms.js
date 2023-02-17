const express = require("express");
const {
  getRooms,
  getOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controller/roomController");
const { verifyAdmin } = require("../middleware/requireAuth");

const router = express.Router();

// GET ALL
router.get("/", getRooms);

// GET
router.get("/:id", getOneRoom);

// CREATE NEW HOTEL
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE HOTEL
router.put("/:id", verifyAdmin, updateRoom);

// DELETE HOTEL
router.delete("/:id", verifyAdmin, deleteRoom);

module.exports = router;
