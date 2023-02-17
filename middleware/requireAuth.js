const jwt = require("jsonwebtoken");
const { verifyToken } = require("../lib/passport");
const User = require("../models/userModel");
const { handleError } = require("../utils/errorHandler");

const requireAuth = async (req, res, next) => {
  // verify authentication
  // grab the auth from the headers
  const { cookie } = req.headers;

  if (!cookie) {
    return next(handleError(401, "Authorization token required"));
  }

  // split the auth value and split on the space
  let token = cookie.split("access_token=")[1];

  // check if token has been tampered with or not
  try {
    const { _id } = verifyToken(token, process.env.JWT_SECRET, next);
    // console.log(_id);
    // find the user with the id that matches
    req.user = await User.findOne({ _id }).select("_id");
    // console.log("req.user", req.user);
    next();
  } catch (error) {
    console.log(error);
    next(handleError(401, "Request is not authorized"));
  }
};

const verifyUser = async (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return next(handleError(401, "Authorization token required"));
  }

  // split the auth value and split on the space
  let token = cookie.split("access_token=")[1];

  console.log(token);

  next();

  try {
    const user = await verifyToken(token, process.env.JWT_SECRET, next);

    console.log(user);
  } catch (error) {
    return next(handleError(401, "Request is not authorized"));
  }
};

// const requireAuth = async (req, res, next) => {
//   // verify authentication
//   // grab the auth from the headers
//   const { cookie } = req.headers;

//   if (!cookie) {
//     return next(handleError(401, "Authorization token required"));
//   }

//   // split the auth value and split on the space
//   let token = cookie.split("access_token=")[1];

//   // check if token has been tampered with or not
//   try {
//     const { _id } = verifyToken(token, process.env.JWT_SECRET, next);
//     // console.log(_id);
//     // find the user with the id that matches
//     req.user = await User.findOne({ _id }).select("_id");
//     // console.log("req.user", req.user);
//     next();
//   } catch (error) {
//     console.log(error);
//     next(handleError(401, "Request is not authorized"));
//   }
// };

module.exports = { requireAuth, verifyUser };
