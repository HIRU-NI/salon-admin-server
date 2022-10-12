const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../helpers/error");

//validators
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "An user with the given email already exists"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  password: {
    type: String,
    minlength: [6, "Password should contain alteast 6 characters"],
  },
});

//hash the password before user is saved in db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

//static method to log the user in
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) return user;
    throw new ErrorHandler(400, "Incorrect password");
  }
  throw new ErrorHandler(400, "Incorrect email");
};

const user = mongoose.model("user", userSchema);

module.exports = user;
