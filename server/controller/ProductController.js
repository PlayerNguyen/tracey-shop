const ProductModel = require("../model/ProductModel");
const Language = require("../utils/Language");
const MiddlewareError = require("../utils/MiddlewareError");

/**
 * Creates new product.
 */
async function createProduct(req, res, next) {
    try {
        const { name, description, price, sale, thumbnail, images, category, properties } =
            req.body;

        const product = await ProductModel.create({
            name,
            description,
            price,
            sale,
            thumbnail,
            images,
            category,
            properties,
        });
        res.json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * Updates product.
 */
async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;

        // Product not found
        if (!(await ProductModel.findOne({ _id: id }))) {
            throw new MiddlewareError(404, Language.Response.ProductNotFound);
        }

        const { name, description, price, sale, thumbnail, images, category, properties } =
            req.body;

        const product = await ProductModel.findByIdAndUpdate(id, {
            name,
            description,
            price,
            sale,
            thumbnail,
            images,
            category,
            properties,
        });

        res.json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * Deletes product
 */
async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;

        // Product not found
        if (!(await ProductModel.findOne({ _id: id }))) {
            throw new MiddlewareError(404, Language.Response.ProductNotFound);
        }

        const product = await ProductModel.findByIdAndDelete(id);
        res.json(product);
    } catch (err) {
        next(err);
    }
}
/**
 * Retrieves all products in database.
 */
async function getAllProducts(req, res, next) {
    try {
        const products = await ProductModel.aggregate([
            {
                $lookup: {
                    from: "imageresources",
                    localField: "thumbnail",
                    foreignField: "_id",
                    as: "thumbnail",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $addFields: {
                    thumbnail: { $arrayElemAt: ["$thumbnail", 0] },
                    category: { $arrayElemAt: ["$category", 0] },
                },
            },
        ]);
        res.json(products);
    } catch (err) {
        next(err);
    }
}
/**
 * Retrieves a product by its id.
 */
async function getProductById(req, res, next) {
    try {
        const { id } = req.params;
        const product = await ProductModel.findOne({ _id: id })
            .populate("category")
            .populate("images")
            .populate("thumbnail");

        // Product not found
        if (!product) {
            throw new MiddlewareError(404, Language.Response.ProductNotFound);
        }

        res.json(product);
    } catch (err) {
        next(err);
    }
}

const ProductController = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
};
module.exports = ProductController;
