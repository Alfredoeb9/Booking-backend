const express = require("express");
const Hotel = require("../models/Hotel");

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE NEW HOTEL
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE HOTEL
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE HOTEL
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Hotel has been deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
