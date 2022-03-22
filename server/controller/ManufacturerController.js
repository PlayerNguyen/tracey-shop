const ManufacturerModel = require("../model/ManufacturerModel");
const SlugifyHelper = require("../utils/SlugifyHelper");
const ManufacturerController = {
    /**
     *  Retrieves all manufacturer
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getAllManufacturers: async (req, res, next) => {
        try {
            const manufacturers = await ManufacturerModel.find({}).populate("thumbnail");
            res.json(manufacturers);
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
            res.json(manufacturer);
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
    /**
     * Update manufacturer
     */
    updateManufacturer: async (req, res, next) => {
        try {
            const { name, thumbnail } = req.body;
            const manufacturer = await ManufacturerModel.findByIdAndUpdate(
                req.params.id,
                { name, thumbnail, slug: SlugifyHelper(name) },
                { new: true }
            );
            res.json(manufacturer);
        } catch (err) {
            throw err;
        }
    },
};
module.exports = ManufacturerController;
