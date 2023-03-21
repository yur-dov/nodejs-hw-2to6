const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middleware');
const { schemas } = require('../../models/contacts');
const { isValidId } = require('../../middleware');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAllContacts));
router.get('/:id',authenticate, isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
    '/',
    authenticate,
    validateBody(schemas.contactAddSchema),
    ctrlWrapper(ctrl.addNewContacts)
);

router.delete('/:id', authenticate, isValidId, ctrlWrapper(ctrl.deleteContact));

router.put(
    '/:id',
    authenticate,
    isValidId,
    validateBody(schemas.contactAddSchema),
    ctrlWrapper(ctrl.contactUpdate)
);

router.patch(                
    '/:id/favorite',
    authenticate,
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;
