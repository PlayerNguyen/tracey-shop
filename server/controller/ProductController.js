const ProductModel = require("../model/ProductModel");
const CategoryModel = require("../model/CategoryModel");
const Language = require("../utils/Language");
const MiddlewareError = require("../utils/MiddlewareError");

/**
 * Creates new product.
 */
async function createProduct(req, res, next) {
  try {
    const {
      name,
      description,
      price,
      sale,
      thumbnail,
      images,
      category,
      manufacturer,
      properties,
      stock,
      warrantyDuration,
    } = req.body;

    const product = await ProductModel.create({
      name,
      description,
      price,
      sale,
      thumbnail,
      images,
      category,
      manufacturer,
      properties,
      stock,
      warrantyDuration,
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

    const {
      name,
      description,
      price,
      sale,
      thumbnail,
      images,
      category,
      properties,
      manufacturer,
      stock,
      warrantyDuration,
    } = req.body;

    const product = await ProductModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      sale,
      thumbnail,
      images,
      category,
      properties,
      manufacturer,
      stock,
      warrantyDuration,
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
    const { category, skip, limit, query } = req.query;
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
    } else if (query) {
      products = ProductModel.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
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
      .populate("manufacturer")
      .populate("comments.user", { password: false });
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
      .populate("comments.user", { password: false });

    // Product not found
    if (!product) {
      throw new MiddlewareError(404, Language.Response.ProductNotFound);
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function createComment(req, res, next) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.userData;
    // console.log(req.userData);

    if (!user) {
      throw new MiddlewareError(401, Language.Response.Unauthorized);
    }

    const product = await ProductModel.findOne({ _id: id });
    if (!product) {
      throw new MiddlewareError(404, Language.Response.ProductNotFound);
    }

    // const comment = await CommentModel.create({
    //   content,
    //   product: id,
    // });
    const comment = { content, user: user._id };
    product.comments.push(comment);
    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function updateComment(req, res, next) {
  try {
    const { productId, commentId } = req.params;
    const { content } = req.body;

    const currentProduct = ProductModel.findOne({ _id: productId });
    // Retrieves current product
    if (!currentProduct) {
      throw new MiddlewareError(404, Language.Response.ProductNotFound);
    }

    const user = req.userData;
    // Validates user
    if (user._id != currentProduct._id && !user.admin) {
      throw new MiddlewareError(401, Language.Response.Unauthorized);
    }

    // Updates product
    const updatedProduct = ProductModel.findOneAndUpdate(
      { "product.comments._id": commentId },
      { content }
    );

    // Responses to user
    res.json(updatedProduct);
  } catch (err) {
    return next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    const { productId, commentId } = req.params;
    const currentProduct = await ProductModel.findOne({ _id: productId });
    // validates product
    if (!currentProduct) {
      throw new MiddlewareError(404, Language.Response.ProductNotFound);
    }

    const user = req.userData;
    // validates user
    if (user._id != currentProduct._id && !user.admin) {
      throw new MiddlewareError(401, Language.Response.Unauthorized);
    }

    // deletes comment
    const deletedComment = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $pull: { comments: { _id: commentId } } }
    );

    // responds to user
    res.json({ deletedComment });
  } catch (err) {
    return next(err);
  }
}

const ProductController = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  createComment,
  updateComment,
  deleteComment,
};
module.exports = ProductController;
