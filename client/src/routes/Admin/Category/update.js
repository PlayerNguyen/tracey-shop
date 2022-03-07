import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import { classNames } from "../../../helpers/Common";
import { v4 as uuidv4 } from "uuid";

function UpdateCategory({ open, onClose, onSave, updateCategory }) {
    const [category, setCategory] = React.useState({
        name: "",
        keys: [],
    });
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (updateCategory) {
            setCategory({
                ...updateCategory,
                keys: updateCategory.keys.map((_key, _idx) => ({ ..._key, id: _idx })),
            });
        }
    }, [updateCategory]);

    const handleChangeCategoryName = (e) => {
        setCategory({ ...category, name: e.target.value });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await onSave({
                ...category,
                keys: category.keys.map((_key) => ({ key: _key.key, isRequired: _key.isRequired })),
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

    const addKey = () => {
        setCategory({
            ...category,
            keys: [
                ...category.keys,
                {
                    id: uuidv4(),
                    key: "",
                    isRequired: false,
                },
            ],
        });
    };

    const updateKey = (id, field, value) => {
        setCategory({
            ...category,
            keys: category.keys.map((key) => {
                if (key.id === id) {
                    return {
                        ...key,
                        [field]: value,
                    };
                }
                return key;
            }),
        });
    };

    const removeKey = (id) => {
        setCategory({
            ...category,
            keys: category.keys.filter((key) => key.id !== id),
        });
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
                    <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
                        {category.keys.map((_key) => (
                            <div className="mt-4 mb-4 p-4" key={_key.id}>
                                <label>Thuộc tính</label>
                                <input
                                    className="input w-full"
                                    value={_key.key}
                                    onChange={(e) => updateKey(_key.id, "key", e.target.value)}
                                />
                                <div className="flex">
                                    <div className="flex-grow">
                                        <label>Phải có:</label>
                                        <input
                                            type="checkbox"
                                            className="ml-2"
                                            checked={_key.isRequired}
                                            onChange={(e) =>
                                                updateKey(_key.id, "isRequired", e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="text-red-600 hover:underline hover:font-semibold"
                                            onClick={() => removeKey(_key.id)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 mb-4">
                        <button className="hover:underline hover:font-semibold" onClick={addKey}>
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

export default UpdateCategory;
