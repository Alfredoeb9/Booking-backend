const express = require("express");
const {
  getHotels,
  getOneHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controller/hotelController");
const { verifyAdmin } = require("../middleware/requireAuth");

const router = express.Router();

// GET ALL
router.get("/", getHotels);

// GET
router.get("/:id", getOneHotel);

// CREATE NEW HOTEL
router.post("/", verifyAdmin, createHotel);

// UPDATE HOTEL
router.put("/:id", verifyAdmin, updateHotel);

// DELETE HOTEL
router.delete("/:id", verifyAdmin, deleteHotel);

module.exports = router;
