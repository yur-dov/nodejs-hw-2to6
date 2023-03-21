const express = require('express');
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middleware');
const { schemas } = require('../../models/users');

const router = express.Router();

router.post(
    "/register",
    validateBody(schemas.userRegisterSchema),
    ctrlWrapper(ctrl.register)
);

router.post(
    "/login",
    validateBody(schemas.userLoginSchema),
    ctrlWrapper(ctrl.login)
);

router.get(
    "/current",
    authenticate,
    ctrlWrapper(ctrl.getCurrent),
);

router.get(
    "/logout",
    authenticate,
    ctrlWrapper(ctrl.logout),
);

router.patch(
    "/",
    authenticate,
    validateBody(schemas.updateSubscriptionSchema),
    ctrlWrapper(ctrl.upDateSubscription),
);
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.upDateAvatar)
);

module.exports = router;