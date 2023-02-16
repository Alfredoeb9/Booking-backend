const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Static register method
userSchema.statics.register = async function (
  username,
  email,
  password,
  isAdmin
) {
  // Find an email within the database
  const exists = await this.findOne({ email });

  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // if it exists then throw error
  if (exists) {
    throw Error("Email already in use");
  }

  // SALT: attaches a random string at the end of the password to prevent hackers for password cracking
  // generate salt
  const salt = await bcrypt.genSalt(10);

  // create a has and attach password + hash
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    isAdmin,
  });

  return user;
};

module.exports = mongoose.model("User", userSchema);
