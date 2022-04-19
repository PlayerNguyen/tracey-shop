import AxiosHelper from "../helpers/AxiosHelper";

async function getAllProduct() {
    return AxiosHelper({
        url: "/products",
        method: "GET",
    });
}

async function getProductByCategory(categorySlug = "") {
    return AxiosHelper({
        url: "/products",
        method: "GET",
        params: {
            category: categorySlug,
        },
    });
}

async function getProductById(id) {
    return AxiosHelper({
        url: `/products/${id}`,
        method: "GET",
    });
}

async function createProduct(product) {
    return AxiosHelper({
        url: "/products",
        method: "POST",
        data: product,
    });
}

async function updateProduct(id, product) {
    return AxiosHelper({
        url: `/products/${id}`,
        method: "PUT",
        data: product,
    });
}

async function deleteProduct(id) {
    return AxiosHelper({
        url: `/products/${id}`,
        method: "DELETE",
    });
}

async function getProductReview(id) {
    return AxiosHelper({
        url: `/reviews/${id}`,
        method: "GET",
    });
}

async function createProductReview(product) {
    return AxiosHelper({
        url: `/reviews`,
        method: "POST",
        data: product,
    });
}

async function createProductComment(productId, comment) {
    return AxiosHelper({
        url: `/products/${productId}/comments`,
        method: "POST",
        data: comment,
    });
}

const ProductRequest = {
    getAllProduct,
    getProductByCategory,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductReview,
    createProductReview,
    createProductComment,
};
export default ProductRequest;
