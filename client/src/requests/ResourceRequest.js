import AxiosHelper from "../helpers/AxiosHelper";

function uploadImages(images) {
    const formData = new FormData();

    for (let _img of images) {
        formData.append("files", _img);
    }

    return AxiosHelper({
        url: "/resources",
        method: "POST",
        data: formData,
    });
}

function getImageInfo(id) {
    return AxiosHelper({
        url: `/resources/data/${id}`,
        method: "GET",
    });
}

const ResourceRequest = {
    uploadImages,
    getImageInfo,
};
export default ResourceRequest;
