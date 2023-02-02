const User = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findById(id);

    res.status(200).send({
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      message: "Found user Details",
      status: 0,
    });
  } catch (err) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      data: users,
      message: "All Users",
      status: 0,
    });
  } catch (err) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};


module.exports = {
  getUsers,
  getUser,
};
