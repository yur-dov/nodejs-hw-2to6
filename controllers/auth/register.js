const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models/users');
const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { password, email} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const result = await User.create({
    password: hashPassword,
    email,
    avatarURL
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
