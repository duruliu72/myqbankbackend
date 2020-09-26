const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const { Role } = require("../models/role");

router.post("/", async (req, res) => {
  let role;
  if (!req.body.roleid) {
    role = await Role.findOne({ roleValue: 1, roleName: "Admin" });
    req.body.roleid = role._id.toHexString();
  } else {
    role = await Role.findOne({ _id: req.body.roleid });
  }
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already Registerd");
  const userObj = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  userObj.password = await bcrypt.hash(req.body.password, salt);
  userObj.role = {
    _id: role._id,
    roleName: role.roleName,
    roleValue: role.roleValue,
  };
  user = await User.create(userObj);
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});
module.exports = router;
