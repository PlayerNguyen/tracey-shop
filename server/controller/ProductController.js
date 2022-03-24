const ProductModel = require("../model/ProductModel");
const CategoryModel = require("../model/CategoryModel");
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

        const { name, description, price, sale, thumbnail, images, category, properties, manufacturer } =
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
            manufacturer
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
        const { category, skip, limit } = req.query;
        const categoryFound = await CategoryModel.findOne({
            slug: category,
        });
        if (category && !categoryFound) {
            throw new Error("Không tìm thấy danh mục hàng");
        }

        let products = ProductModel.find({});
        if (category) {
            products = ProductModel.find({
                category: categoryFound._id,
            });
        }
        if (skip) {
            products = products.skip(skip);
        }
        if (limit) {
            products = products.skip(limit);
        }
        products = products
            .populate("category")
            .populate("images")
            .populate("thumbnail")
            .populate("manufacturer");
        products = await products;
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
            .populate("thumbnail")
            .populate("manufacturer")

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
