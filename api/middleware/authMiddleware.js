const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const rootMiddleware = (req, res, next) => {
  if (req.user.role !== 'root') {
    return res.status(403).send({ error: 'Access denied.' });
  }
  next();
};

module.exports = { authMiddleware, rootMiddleware };