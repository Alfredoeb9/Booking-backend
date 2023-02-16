const express = require("express");
const {
  getHotels,
  getOneHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controller/hotelController");
const Hotel = require("../models/hotelModel");
const { handleError } = require("../utils/errorHandler");

const router = express.Router();

// GET ALL
router.get("/", getHotels);

// GET
router.get("/:id", getOneHotel);

// CREATE NEW HOTEL
router.post("/", createHotel);

// UPDATE HOTEL
router.put("/:id", updateHotel);

// DELETE HOTEL
router.delete("/:id", deleteHotel);

module.exports = router;
