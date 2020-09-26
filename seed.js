const config = require("config");
const bcrypt = require("bcrypt");
const connect = require("./startup/connect");
const { Role } = require("./models/role");
const { User } = require("./models/user");
async function seed() {
  await connect(config.get("db"));
  await Role.deleteMany({});
  await User.deleteMany({});
  let roleObj = {
    roleName: "Admin",
    roleValue: 1,
    permissionValue: 1,
  };
  let role = await Role.create(roleObj);
  const userObj = {
    name: "Admin",
    email: "myqbank@gmail.com",
    password: "1234567",
  };
  userObj.role = {
    _id: role._id,
    roleName: role.roleName,
    roleValue: role.roleValue,
  };
  const salt = await bcrypt.genSalt(10);
  userObj.password = await bcrypt.hash(userObj.password, salt);
  let user = await User.create(userObj);
//   new Fawn.Task().
  console.log(role);
  console.log(user);
}
seed();
