const getCurrent = require('./getCurrent');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const resendVerify = require('./resendVerify');
const upDateSubscription = require('./upDateSubscription');
const upDateAvatar = require('./upDateAvatar');
const verify = require('./verify');

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    upDateSubscription,
    upDateAvatar,
    resendVerify,
    verify,
};
