import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import { Modal } from "../../../components";
import { classNames, getImageUrl } from "../../../helpers/Common";
import resourceApi from "../../../requests/ResourceRequest";

function UpdateManufacturer({ open, onClose, onSave, updateManufacturer }) {
    const [manufacturer, setManufacturer] = React.useState({
        name: "",
        keys: [],
    });
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (updateManufacturer) {
            setManufacturer({
                ...updateManufacturer,
                keys: updateManufacturer.keys.map((_key, _idx) => ({ ..._key, id: _idx })),
            });
        }
    }, [updateManufacturer]);

    const handleChangeManufacturerName = (e) => {
        setManufacturer({ ...manufacturer, name: e.target.value });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await onSave({
                ...manufacturer,
                keys: manufacturer.keys.map((_key) => ({
                    key: _key.key,
                    isRequired: _key.isRequired,
                })),
            });
            onClose();
        } catch (e) {
            toast.error(
                e.response?.data?.error?.message ||
                    "Cập nhật danh mục hàng thất bại, vui lòng thử lại sau."
            );
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeThumbnail = async (e) => {
        try {
            if (e.target.files.length > 0) {
                const resp = await resourceApi.uploadImages(e.target.files);
                const imgInfo = resp.data.data[0];
                setManufacturer({
                    ...manufacturer,
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

    return (
        <>
            <Modal dimmer open={open} onClose={onClose}>
                <div className="w-1/3 bg-white border rounded-xl p-4">
                    <div className="text-xl font-bold">
                        {updateManufacturer ? "Cập nhật danh mục hàng" : "Tạo danh mục hàng mới"}
                    </div>
                    <div className="mt-4 mb-4">
                        <label>Tên hãng sản xuất</label>
                        <input
                            className="input w-full"
                            value={manufacturer.name}
                            onChange={handleChangeManufacturerName}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="manufacturer-thumbnail-upload"
                            className={classNames(
                                manufacturer.thumbnail ? "border-gray-800" : "border-green-700",
                                "border rounded-lg flex items-center cursor-pointer select-none overflow-hidden justify-center"
                            )}
                        >
                            {manufacturer.thumbnail ? (
                                <img
                                    src={getImageUrl(manufacturer.thumbnailImg)}
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
                            id="manufacturer-thumbnail-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            multiple
                            onChange={handleChangeThumbnail}
                        />
                    </div>
                    <div className="text-right mt-4">
                        <button
                            onClick={handleSave}
                            className={classNames(
                                !loading && "hover:bg-indigo-400 hover:text-white",
                                "border-2 border-indigo-400 text-indigo-400 font-semibold py-2 px-4 rounded-full mr-2"
                            )}
                            disabled={loading}
                        >
                            {loading ? <FontAwesomeIcon icon="spinner" spin fixedWidth /> : "Lưu"}
                        </button>
                        <button
                            onClick={onClose}
                            className="border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white font-semibold py-2 px-4 rounded-full ml-2"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default UpdateManufacturer;
