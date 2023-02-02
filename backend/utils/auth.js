const User = require("../models/userModel");
const submit = async (req, res) => {
  let { email} = req.body;
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res.status(400).json({
          data: {},
          message: "An account with this email already exists",
          status: 1,
        });
      const user = new User({
        fullName: req.body.fullName,
        email: email,
        department: req.body.department,
      });
      user.save((err, user) => {
        if (err) {
          res.status(500).send({
            data: {},
            message: `An error occurred: ${err}`,
            status: 1,
          });
        } else {
          res.status(201).send({
            data: user,
            message: "User submitted successfully",
            status: 0,
          });
        }
      });
    };


module.exports = {
  submit,
}
