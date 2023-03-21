const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleSaveError = require('../middleware/handleSaveError')

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 4,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
     avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

const userRegisterSchema = Joi.object({
  password: Joi.string().min(4).max(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const userLoginSchema = Joi.object({
  password: Joi.string().min(4).max(8).required(),
  email: Joi.string().email().required(),
});
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const schemas = {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};