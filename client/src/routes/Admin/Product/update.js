import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import { classNames } from "../../../helpers/Common";
import { v4 as uuidv4 } from "uuid";
import resourceApi from "../../../requests/ResourceRequest";
import UploadSingleImg from "./upload-single-img";

function UpdateProduct({ open, onClose, onSave, updateProduct }) {
    const [product, setProduct] = React.useState({
        name: "",
        description: "",
        price: 0,
        thumbnailImg: "",
        thumbnail: null,
        images: [],
        imageData: [],
        category: null,
        properties: [],
    });
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (updateProduct) {
            setProduct({
                ...updateProduct,
            });
        }
    }, [updateProduct]);

    const handleChangeProduct = (field, value) => {
        setProduct({ ...product, [field]: value });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await onSave({
                ...product,
            });
            onClose();
        } catch (e) {
            toast.error(
                e.response?.data?.error?.message ||
                    "Cập nhật sản phẩm thất bại, vui lòng thử lại sau."
            );
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const addProperty = () => {
        setProduct({
            ...product,
            properties: [
                ...product.properties,
                {
                    id: uuidv4(),
                    key: "",
                    value: "",
                },
            ],
        });
    };

    const updateProperty = (id, field, value) => {
        setProduct({
            ...product,
            properties: product.properties.map((property) => {
                if (property.id === id) {
                    return {
                        ...property,
                        [field]: value,
                    };
                }
                return property;
            }),
        });
    };

    const removeProperty = (id) => {
        setProduct({
            ...product,
            properties: product.properties.filter((property) => property.id !== id),
        });
    };

    const handleChangeThumbnail = async (e) => {
        try {
            if (e.target.files.length > 0) {
                const resp = await resourceApi.uploadImages(e.target.files);
                const imgInfo = resp.data.data[0];
                setProduct({
                    ...product,
                    thumbnailImg: imgInfo.fileName,
                    thumbnail: imgInfo._id,
                });
            }
        } catch (e) {
            if (e.response.data) {
                toast.error(
                    e.response?.data?.error?.message || "Upload ảnh thất bại, vui lòng thử lại sau."
                );
            }
        }
    };

    const handleChangeImages = async (e) => {
        try {
            if (e.target.files.length > 0) {
                const resp = await resourceApi.uploadImages(e.target.files);
                const images = resp.data.data;
                setProduct({
                    ...product,
                    images: [...product.images, ...images.map((_img) => _img._id)],
                    imageData: [
                        ...product.imageData,
                        ...images.map((_img) => ({ id: _img._id, content: _img.fileName })),
                    ],
                });
            }
        } catch (e) {
            if (e.response.data) {
                toast.error(
                    e.response?.data?.error?.message || "Upload ảnh thất bại, vui lòng thử lại sau."
                );
            }
        }
    };

    const handleChangeUploadedImg = async (img, e) => {
        try {
            if (e.target.files.length > 0) {
                const resp = await resourceApi.uploadImages(e.target.files);
                const imgInfo = resp.data.data[0];
                setProduct({
                    ...product,
                    images: [...product.images.filter((_imgId) => _imgId !== img.id), imgInfo._id],
                    imageData: [
                        ...product.imageData.filter((_img) => _img.id !== img.id),
                        { id: imgInfo._id, content: imgInfo.fileName },
                    ],
                });
            }
        } catch (e) {
            if (e.response.data) {
                toast.error(
                    e.response?.data?.error?.message || "Upload ảnh thất bại, vui lòng thử lại sau."
                );
            }
        }
    };

    return (
        <>
            <Modal dimmer open={open} onClose={onClose}>
                <div className="w-2/3 bg-white border rounded-xl p-4">
                    <div className="text-xl font-bold">
                        {updateProduct ? "Cập nhật sản phẩm" : "Tạo sản phẩm mới"}
                    </div>
                    <div className="flex mt-2">
                        <div className="shrink-0 w-52 h-60 p-2">
                            <label
                                htmlFor="product-thumbnail-upload"
                                className={classNames(
                                    product.thumbnail ? "border-gray-800" : "border-green-700",
                                    "h-full border rounded-lg flex items-center cursor-pointer select-none overflow-hidden"
                                )}
                            >
                                {product.thumbnail ? (
                                    <img
                                        src={`${process.env.REACT_APP_ORIGIN_BACKEND}/images/${product.thumbnailImg}`}
                                        className="w-full"
                                        alt="thumbnail"
                                    />
                                ) : (
                                    <div className="text-center w-full text-green-700">
                                        <FontAwesomeIcon icon="plus" />
                                        <div>Thumbnail</div>
                                    </div>
                                )}
                            </label>
                            <input
                                id="product-thumbnail-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                multiple
                                onChange={handleChangeThumbnail}
                            />
                        </div>
                        <div className="flex w-full overflow-auto">
                            <div className="p-2 h-60">
                                <label
                                    htmlFor="product-images-upload"
                                    className={
                                        "h-full w-52 border-green-700 border rounded-lg flex items-center cursor-pointer select-none"
                                    }
                                >
                                    <div className="text-center w-full text-green-700">
                                        <FontAwesomeIcon icon="plus" />
                                        <div>Ảnh</div>
                                    </div>
                                </label>
                                <input
                                    id="product-images-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    multiple
                                    onChange={handleChangeImages}
                                />
                            </div>
                            {product.imageData.map((_img) => (
                                <UploadSingleImg
                                    img={_img}
                                    handleChangeImage={handleChangeUploadedImg}
                                    key={_img.id}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-8">
                        <div className="mt-4 mb-4">
                            <label>Tên sản phẩm</label>
                            <input
                                className="input w-full"
                                value={product.name}
                                onChange={(e) => handleChangeProduct("name", e.target.value)}
                            />
                        </div>
                        <div className="mt-4 mb-4">
                            <label>Mô tả</label>
                            <input
                                className="input w-full"
                                value={product.name}
                                onChange={(e) => handleChangeProduct("name", e.target.value)}
                            />
                        </div>
                        <div className="mt-4 mb-4">
                            <label>Giá tiền</label>
                            <input
                                className="input w-full"
                                value={product.name}
                                onChange={(e) => handleChangeProduct("name", e.target.value)}
                            />
                        </div>
                        <div className="mt-4 mb-4">
                            <label>Danh mục</label>
                            <input
                                className="input w-full"
                                value={product.name}
                                onChange={(e) => handleChangeProduct("name", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
                        {product.properties.map((_property) => (
                            <div className="grid grid-cols-2 gap-8 p-2" key={_property.id}>
                                <div>
                                    <label>Thuộc tính</label>
                                    <input
                                        className="input w-full"
                                        value={_property.key}
                                        onChange={(e) =>
                                            updateProperty(_property.id, "key", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex">
                                    <div className="flex-grow">
                                        <label>Giá trị</label>
                                        <input
                                            className="input w-full"
                                            checked={_property.value}
                                            onChange={(e) =>
                                                updateProperty(
                                                    _property.id,
                                                    "value",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <br />
                                        <button
                                            className="ml-2 text-red-600 hover:underline hover:font-semibold"
                                            onClick={() => removeProperty(_property.id)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 mb-4">
                        <button
                            className="hover:underline hover:font-semibold"
                            onClick={addProperty}
                        >
                            Thêm thuộc tính mới
                        </button>
                    </div>
                    <div className="text-right">
                        <button
                            onClick={handleSave}
                            className={classNames(
                                !loading && "hover:bg-indigo-400 hover:text-white",
                                "ring-2 ring-indigo-400 text-indigo-400 font-semibold py-2 px-4 rounded-full mr-2"
                            )}
                            disabled={loading}
                        >
                            {loading ? <FontAwesomeIcon icon="spinner" spin fixedWidth /> : "Lưu"}
                        </button>
                        <button
                            onClick={onClose}
                            className="ring-2 ring-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white font-semibold py-2 px-4 rounded-full ml-2"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default UpdateProduct;
