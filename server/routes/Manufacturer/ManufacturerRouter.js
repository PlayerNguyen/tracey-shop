const express = require('express');
const ManufacturerController = require('../../controller/ManufacturerController');
const AuthMiddleware = require('../../utils/AuthMiddleware');
const router = express.Router();

router.post(
  `/`,
  AuthMiddleware.forciblyRequireAuth,
  ManufacturerController.createManufacturer,
);
router.get(`/`, ManufacturerController.getAllManufacturers);
router.delete(
  `/:id`,
  AuthMiddleware.forciblyRequireAuth,
  ManufacturerController.deleteManufacturer,
);
router.put(
  `/:id`,
  AuthMiddleware.forciblyRequireAuth,
  ManufacturerController.updateManufacturer,
);

module.exports = router;
