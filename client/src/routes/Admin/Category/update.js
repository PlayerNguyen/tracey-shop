import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import { classNames } from "../../../helpers/Common";

function UpdateBookTag({ open, onClose, onSave, updateCategory }) {
    const [category, setCategory] = React.useState({
        name: "",
        keys: [],
    });
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (updateCategory) {
            setCategory({ ...updateCategory });
        }
    }, [updateCategory]);

    const handleChangeCategoryName = (e) => {
        setCategory(e.target.value);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await onSave(category);
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

    return (
        <>
            <Modal dimmer open={open} onClose={onClose}>
                <div className="w-1/3 bg-white border rounded-xl p-4">
                    <div className="text-xl font-bold">
                        {updateCategory ? "Cập nhật danh mục hàng" : "Tạo danh mục hàng mới"}
                    </div>
                    <div className="mt-4 mb-4">
                        <label>Tên danh mục</label>
                        <input
                            className="input w-full"
                            value={category.name}
                            onChange={handleChangeCategoryName}
                        />
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

export default UpdateBookTag;
