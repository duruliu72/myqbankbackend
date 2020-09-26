const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Role, validate } = require("../models/role");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let role = await Role.findOne({ roleName: req.body.roleName }).exec();
  if (role) return res.status(400).send("Role already Exist");
  const roleObj = new Role(
    _.pick(req.body, ["roleName", "roleValue", "permissionValue"])
  );
  role = await Role.create(roleObj);
  res.send(role);
});
module.exports = router;
