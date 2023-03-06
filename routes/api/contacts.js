const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middleware');
const { schemas } = require('../../models/contacts');
const { isValidId } = require('../../middleware');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllContacts));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/',validateBody(schemas.contactAddSchema),ctrlWrapper(ctrl.addNewContacts));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.deleteContact));

router.put('/:id',isValidId,validateBody(schemas.contactAddSchema), ctrlWrapper(ctrl.contactUpdate));

router.patch('/:id/favorite',isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatus));

module.exports = router;
