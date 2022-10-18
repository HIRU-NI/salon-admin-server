const clientModel = require("../models/client");

//handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  //duplicate email error
  if (err.code === 11000) {
    errors.email = "An client with the given email already exists";
    return errors;
  }

  //validation error
  if (err.message.includes("client validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.get = async (req, res) => {
  const { id } = req.params;

  const resp = await clientModel.findById(id);

  res.send({
    success: true,
    data: resp,
  });
};

//list all clients
module.exports.getAll = async (req, res) => {
  try {
    const resp = await clientModel.find();
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
};

//list clients by page
module.exports.getPage = async (req, res) => {
  try {
    const { page, sortby } = req.params;

    let resp;

    if (sortby === "firstName")
     { console.log("here")
        resp = await clientModel
        .find()
        .sort({firstName : 1})
        .skip(parseInt(page) * 10)
        .limit(10);}
    else
      resp = await clientModel
        .find()
        .skip(parseInt(page) * 10)
        .limit(10);


    const count = (await clientModel.find()).length;

    res.status(200).json({
      clients: resp,
      count: count,
    });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { email, firstName, lastName, phone } = req.body;

    const resp = await clientModel.create({
      email,
      firstName,
      lastName,
      phone,
    });

    res.status(200).json(resp);
  } catch (error) {
    let errorMsg = "Server error: could not add client";

    if (error.code === 11000)
      errorMsg = "Server error: Client with given email alredy exists";
    res.status(500).json({
      error: errorMsg,
    });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const { email, firstName, lastName, phone } = req.body;

    let resp;

    try {
      resp = await clientModel.findById(id);
      if (resp) {
        resp.email = email;
        resp.firstName = firstName;
        resp.lastName = lastName;
        resp.phone = phone;
      }
    } catch (error) {
      res.status(400).json({
        error: "Client does not exist",
      });
      return;
    }
    await resp.save();

    res.status(200).json(resp);
  } catch (error) {
    let errorMsg = "Server error: could not update client";

    if (error.code === 11000)
      errorMsg = "Server error: Client with given email alredy exists";
    res.status(500).json({
      error: errorMsg,
    });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const resp = await clientModel.findByIdAndDelete(id);

    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({
      error: "Server error: could not delete client data",
    });
  }
};
