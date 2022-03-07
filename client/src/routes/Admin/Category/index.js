import React from "react";
import categoryApi from "../../../requests/CategoryRequest";
import UpdateCategory from "./update";
import { v1 as uuidv1 } from "uuid";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/Modal/confirm";

function Categories() {
    const [categories, setCategories] = React.useState([]);
    const [updateModal, setUpdateModal] = React.useState(false);
    const [updateCategory, setUpdateCategory] = React.useState(null);
    const [randomKey, setRandomKey] = React.useState(0);
    const [confirmModal, setConfirmModal] = React.useState({
        content: "",
        onClose: () => {},
        onConfirm: () => {},
        open: false,
        loading: false,
    });

    const fetchCategories = async () => {
        try {
            const resp = await categoryApi.getAllCategory();
            setCategories(resp.data);
        } catch (e) {
            console.error(e);
        }
    };

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenUpdateModal = (selectedCategory = null) => {
        setRandomKey(uuidv1());
        setUpdateModal(true);
        if (selectedCategory) {
            setUpdateCategory(selectedCategory);
        }
    };

    const handleCloseUpdateModal = () => {
        setUpdateModal(false);
        if (updateCategory) {
            setUpdateCategory(null);
        }
    };

    const handleSave = async (category) => {
        // try catch is in UpdateCategory
        if (updateCategory) {
            await categoryApi.updateCategory(updateCategory._id, category);
            toast.success("Cập nhật danh mục hàng thành công");
        } else {
            await categoryApi.createCategory(category);
            toast.success("Tạo danh mục hàng thành công");
        }
        await fetchCategories();
    };

    const handleDeleteTag = (category) => {
        setConfirmModal({
            content: `Bạn có chắc chắn muốn xóa danh mục '${category.name}' không?`,
            open: true,
            loading: false,
            onClose: () => {
                setConfirmModal({ ...confirmModal, open: false });
            },
            onConfirm: async () => {
                setConfirmModal({ ...confirmModal, loading: true });
                try {
                    await categoryApi.deleteCategory(category._id);
                    toast.success("Xóa danh mục hàng thành công");
                    await fetchCategories();
                } catch (e) {
                    console.error(e);
                    toast.error("Xóa danh mục hàng thất bại, vui lòng thử lại sau.");
                } finally {
                    setConfirmModal({
                        ...confirmModal,
                        loading: false,
                        open: false,
                    });
                }
            },
        });
    };

    return (
        <>
            <div className="text-2xl font-bold">Danh mục hàng</div>
            <button
                className="bg-transparent hover:underline hover:text-indigo-500 font-semibold px-2 py-1 mt-4"
                onClick={() => handleOpenUpdateModal()}
            >
                Tạo mới
            </button>
            <div className="border rounded mt-2 overflow-hidden">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-900 text-white">
                            <th className="text-center w-16">#</th>
                            <th>Tên</th>
                            <th>Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((_category, _idx) => (
                            <tr key={_category._id} className="border-t even:bg-slate-50">
                                <td className="text-center py-2">{_idx + 1}</td>
                                <td className="py-2">{_category.name}</td>
                                <td className="py-2 divide-x">
                                    <button
                                        className="bg-transparent hover:underline hover:text-indigo-500 px-2 py-1"
                                        onClick={() => handleOpenUpdateModal(_category)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="bg-transparent hover:underline hover:text-indigo-500 px-2 py-1"
                                        onClick={() => handleDeleteTag(_category)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UpdateCategory
                key={randomKey}
                open={updateModal}
                onClose={handleCloseUpdateModal}
                onSave={handleSave}
                updateCategory={updateCategory}
            />
            <ConfirmModal {...confirmModal} />
        </>
    );
}

export default Categories;
