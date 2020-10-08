const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUND);

const encryptPwd = (password) => bcrypt.hash(password, saltRounds);
const decryptPwd = (password, userPwd) => bcrypt.compare(password, userPwd);

module.exports = {
  encryptPwd,
  decryptPwd,
};
