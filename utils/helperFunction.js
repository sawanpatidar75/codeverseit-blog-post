const jwt = require('jsonwebtoken');
exports.generateToken = async (payload) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '1d',
    });
    return token;
  };
  