var jwt = require('jsonwebtoken');

// generira token
function generateToken(user) {

  if (!user) return null;

  var u = {
    _id: user._id,
    username: user.username,
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 600 * 600 * 24 // 24 ur
  });
}


// vrne osnove
function getCleanUser(user) {
  if (!user) return null;

  return {
    _id: user._id,
    username: user.username,
  };
}

module.exports = {
  generateToken,
  getCleanUser
}