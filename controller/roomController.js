const Room = require("../models/roomModel");
const Hotel = require("../models/hotelModel");
const { handleError } = require("../utils/errorHandler");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      return next(handleError(500, `${err}`));
    }
    res.status(201).json(savedRoom);
  } catch (err) {
    return next(handleError(500, `${err}`));
  }
};

// GET ALL HOTELS
const getRooms = async (req, res, next) => {
  try {
    const allHotels = await Room.find();
    res.status(200).json(allHotels);
  } catch (error) {
    next(error);
  }
};

// GET ONE HOTEL

const getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// UPDATE HOTEL
const updateRoom = async (req, res, next) => {
  try {
    const updatedHotel = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

// DELETE HOTEL
const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Room has been deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  getRooms,
  getOneRoom,
  updateRoom,
  deleteRoom,
};
