const express = require("express");
const ManufacturerController = require("../../controller/ManufacturerController");
const router = express.Router();

router.post(`/`, ManufacturerController.createManufacturer);
router.get(`/`, ManufacturerController.getAllManufacturers);
router.delete(`/:id`, ManufacturerController.deleteManufacturer);

module.exports = router;
