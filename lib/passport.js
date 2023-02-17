const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/errorHandler");

module.exports = {
  verifyToken: async (token, SECRET, next) => {
    // console.log(token);
    // console.log(SECRET);
    if (!token) {
      return next(handleError(401, "You are not authenticated!"));
    }

    try {
      const payload = jwt.verify(token, SECRET, (err, user) => {
        if (err) return next(handleError(403, "Token is not valid!"));
        console.log("user", user);
        return user;
      });
      console.log("running", payload);

      return payload;
    } catch (error) {
      return next(handleError(500, `${error}`));
    }
  },
};
