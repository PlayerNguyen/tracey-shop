import AxiosHelper from "../helpers/AxiosHelper";

async function getAllProduct() {
    return AxiosHelper({
        url: "/products",
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

const ProductRequest = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
export default ProductRequest;
