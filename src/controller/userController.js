const userModel = require("../models/user");

module.exports.getAll = async (req, res) => {
  try {
    const resp = await userModel.find();
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
};

module.exports.updateUser = async (req, res) => {
  const id = req.params;

  

  const { email, firstName, lastName } = req.body;
  try {
    const resp = userModel.findById(id);

    const user = new userModel(resp)


    if (!user) {
      res.status(400).json({
        error: "User not found",
      });
      return;
    }

    user.email = email
    user.firstName = firstName
    user.lastName = lastName

    await user.save()

    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(400).json({
        error: "Server error: could not update user data"
    })
  }
};
