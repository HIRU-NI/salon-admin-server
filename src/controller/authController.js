const User = require("../models/user");
const Token = require("../models/token");

const jwt = require("jsonwebtoken");
const emails = require('../services/emails')

//handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "No user account found with the given email";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Incorrect password";
  }

  //duplicate email error
  if (err.code === 11000) {
    errors.email = "An user with the given email already exists";
    return errors;
  }

  //validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//max age of the auth token
const maxAge = 1 * 24 * 60 * 60;

//create auth token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.addUser = async (req, res) => {
  const { email, firstName, lastName } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        error: "User with given email already exists",
      });
      return;
    }

    const resp = await User.create({
      email,
      firstName,
      lastName,
    });

    let token = await Token.findOne({ userId: resp._id });
    if (token) await token.deleteOne();

    const registrationToken = createToken(resp._id);

    await new Token({
      userId: resp._id,
      token: registrationToken,
      createdAt: Date.now(),
    }).save();

    const link = `http://localhost:3000/signup?token=${registrationToken}&id=${resp._id}`;
    emails.sendRegistrationLink(resp.email, resp.firstName, link);

    res.status(201).json(resp);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Server error: Could not create the user",
    });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resp = await User.login(email, password);

    const token = createToken(resp._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: false,
      sameSite: "None",
    });
    res.status(200).json({
      user: {
        id: resp._id,
        email: resp.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: "Invalid credentials",
    });
  }
};

module.exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send();
  } catch (error) {
    res.status(400).json(error);
  }
};
