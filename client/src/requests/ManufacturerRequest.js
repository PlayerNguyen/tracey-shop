import AxiosHelper from "../helpers/AxiosHelper";

async function getAllManufacturer() {
    return AxiosHelper({
        url: "/manufacturer",
        method: "GET",
    });
}

async function createManufacturer(manufacturer) {
    return AxiosHelper({
        url: "/manufacturer",
        method: "POST",
        data: manufacturer,
    });
}

async function updateManufacturer(id, manufacturer) {
    return AxiosHelper({
        url: `/manufacturer/${id}`,
        method: "PUT",
        data: manufacturer,
    });
}

async function deleteManufacturer(id) {
    return AxiosHelper({
        url: `/manufacturer/${id}`,
        method: "DELETE",
    });
}

const ManufacturerRequest = {
    getAllManufacturer,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
};
export default ManufacturerRequest;
