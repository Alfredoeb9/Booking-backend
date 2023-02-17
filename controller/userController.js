const User = require("../models/userModel");

// GET ALL HOTELS
const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

// GET ONE HOTEL
const getOneUser = async (req, res, next) => {
  try {
    const hotel = await User.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// UPDATE HOTEL
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// DELETE HOTEL
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
