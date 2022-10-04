const userModel = require("../models/user");

module.exports.getAll = async (req, res) => {
  try {
    let resp = await userModel.find();

    resp = resp.filter(resp => resp.password)
    
    res.status(200).json(resp);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
};

//update user details
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const { email, firstName, lastName } = req.body;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      res.status(400).json({
        error: "User not found",
      });
      return;
    }

    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Server error: could not update user data",
    });
  }
};

//reset user password
module.exports.reset = async (req, res) => {
  const { id } = req.params;

  const { password } = req.body;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      res.status(400).json({
        error: "User not found",
      });
      return;
    }

    user.password = password;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Server error: could not reset user password",
    });
  }
};

