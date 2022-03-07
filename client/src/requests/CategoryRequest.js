import AxiosHelper from "../helpers/AxiosHelper";

async function getAllCategory() {
    return AxiosHelper({
        url: "/category",
        method: "GET",
    });
}

async function createCategory(category) {
    return AxiosHelper({
        url: "/category",
        method: "POST",
        data: category,
    });
}

async function updateCategory(id, category) {
    return AxiosHelper({
        url: `/category/${id}`,
        method: "PUT",
        data: category,
    });
}

async function deleteCategory(id) {
    return AxiosHelper({
        url: `/category/${id}`,
        method: "DELETE",
    });
}

const CategoryRequest = {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
export default CategoryRequest;
