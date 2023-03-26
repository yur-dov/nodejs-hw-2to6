const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const gravatar = require('gravatar');
const { User } = require('../../models/users');
const { RequestError } = require('../../helpers');
const createVerifyEmail = require('../../helpers/createVerifyEmail');
const sendEmail = require('../../helpers/sendEmail');

const register = async (req, res) => {
  const { password, email} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    password: hashPassword,
    email,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      verificationToken: result.verificationToken,
    },
  });
};

module.exports = register;
