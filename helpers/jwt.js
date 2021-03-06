const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const tokenGenerator = (user) => {
  const { _id, email, fullName } = user;

  return jwt.sign(
    {
      _id,
      email,
      fullName,
    },
    secretKey
  );
};

const tokenVerifier = (access_token) => {
  return jwt.verify(access_token, secretKey);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
