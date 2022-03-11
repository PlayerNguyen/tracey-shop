const mongoose = require("mongoose");
const URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

const categorySectionSchema = mongoose.Schema(
    {
        slug: {
            type: String,
            slug: "name",
        },
        key: {
            type: String,
            required: true,
        },
        isRequired: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { _id: false }
);

const categorySchema = mongoose.Schema({
    name: {
        type: String,
    },
    keys: [
        {
            type: categorySectionSchema,
        },
    ],
});

module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);
