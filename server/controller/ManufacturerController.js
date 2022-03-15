const ManufacturerModel = require("../model/ManufacturerModel");

const ManufacturerController = {
  /**
   *  Retrieves all manufacturer
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getAllManufacturers: async (req, res, next) => {
    try {
      res.json({
        data: await ManufacturerModel.find({}),
      });
    } catch (err) {
      throw err;
    }
  },

  /**
   * Create new manufacturer
   */
  createManufacturer: async (req, res, next) => {
    try {
      const { name, thumbnail } = req.body;
      const manufacturer = new ManufacturerModel({ name, thumbnail });
      await manufacturer.save();
      res.json({
        data: manufacturer,
      });
    } catch (err) {
      throw err;
    }
  },

  /**
   * Delete manufacturer
   */
  deleteManufacturer: async (req, res, next) => {
    try {
      await ManufacturerModel.findByIdAndDelete(req.params.id);
      res.json({
        data: {
          message: "Manufacturer deleted",
        },
      });
    } catch (err) {
      throw err;
    }
  },
};
module.exports = ManufacturerController;
