const express = require('express');
const { validateBody, authenticate } = require('../../middleware');
const { schemas } = require('../../models/users');
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require('../../helpers');
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
)

module.exports = router;