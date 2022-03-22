const mongoose = require("mongoose");
const SlugifyHelper = require("../utils/SlugifyHelper");

const ManufacturerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        default: function () {
            return SlugifyHelper(this.name);
        },
    },
    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageResource",
        default: null,
    },
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
