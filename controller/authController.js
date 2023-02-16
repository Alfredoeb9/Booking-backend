const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_MINUTES,
  });
};

const register = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password, isAdmin } = req.body;
  try {
    const newUser = await User.register(username, email, password, isAdmin);

    // create a token per user
    const token = createToken(newUser._id);

    // return the users info down below
    res.status(200).json({ email, token });
    // await newUser.save();
    // res.status(201).send("User has been created");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
