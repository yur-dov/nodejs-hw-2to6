const { User } = require('../../models/users');
const { RequestError } = require('../../helpers/RequestError');

const veryfy = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw RequestError(404, 'User not found');
    }
    await User.findByIdAndUpdate(user._id, {
        veryfy: true,
        verificationToken: '',
    })
    res.json({ message: 'Verification successful' });
}

module.exports = veryfy;