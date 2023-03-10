const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, isAdmin) => {
  return jwt.sign({ _id, isAdmin: isAdmin }, process.env.JWT_SECRET);
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

const login = async (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  try {
    console.log("running");
    const user = await User.login(email, req.body.password);

    const { password, isAdmin, ...otherDetails } = user._doc;

    // create a token per user
    const token = createToken(user._id, isAdmin);

    // return the users info down below
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ email, token, ...otherDetails });
    // await newUser.save();
    // res.status(201).send("User has been created");
  } catch (error) {
    console.log("next ran");
    next(error);
  }
};

module.exports = {
  register,
  login,
};
