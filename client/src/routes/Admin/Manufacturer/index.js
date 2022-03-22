import React from "react";
import manufacturerApi from "../../../requests/ManufacturerRequest";
import UpdateManufacturer from "./update";
import { v1 as uuidv1 } from "uuid";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../../components";
import { getImageUrl } from "../../../helpers/Common";

function Manufacturers() {
    const [manufacturers, setManufacturers] = React.useState([]);
    const [updateModal, setUpdateModal] = React.useState(false);
    const [updateManufacturer, setUpdateManufacturer] = React.useState(null);
    const [randomKey, setRandomKey] = React.useState(0);
    const [confirmModal, setConfirmModal] = React.useState({
        content: "",
        onClose: () => {},
        onConfirm: () => {},
        open: false,
        loading: false,
    });

    const fetchManufacturers = async () => {
        try {
            const resp = await manufacturerApi.getAllManufacturer();
            setManufacturers(resp.data);
        } catch (e) {
            console.error(e);
        }
    };

    React.useEffect(() => {
        fetchManufacturers();
    }, []);

    const handleOpenUpdateModal = (selectedManufacturer = null) => {
        setRandomKey(uuidv1());
        setUpdateModal(true);
        if (selectedManufacturer) {
            setUpdateManufacturer(selectedManufacturer);
        }
    };

    const handleCloseUpdateModal = () => {
        setUpdateModal(false);
        if (updateManufacturer) {
            setUpdateManufacturer(null);
        }
    };

    const handleSave = async (manufacturer) => {
        // try catch is in UpdateManufacturer
        if (updateManufacturer) {
            await manufacturerApi.updateManufacturer(updateManufacturer._id, manufacturer);
            toast.success("Cập nhật danh mục hàng thành công");
        } else {
            await manufacturerApi.createManufacturer(manufacturer);
            toast.success("Tạo danh mục hàng thành công");
        }
        await fetchManufacturers();
    };

    const handleDeleteTag = (manufacturer) => {
        setConfirmModal({
            content: `Bạn có chắc chắn muốn xóa danh mục '${manufacturer.name}' không?`,
            open: true,
            loading: false,
            onClose: () => {
                setConfirmModal({ ...confirmModal, open: false });
            },
            onConfirm: async () => {
                setConfirmModal({ ...confirmModal, loading: true });
                try {
                    await manufacturerApi.deleteManufacturer(manufacturer._id);
                    toast.success("Xóa danh mục hàng thành công");
                    await fetchManufacturers();
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
                            <th>Ảnh</th>
                            <th>Tên</th>
                            <th>Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturers.map((_manufacturer, _idx) => (
                            <tr key={_manufacturer._id} className="border-t even:bg-slate-50">
                                <td className="text-center py-2">{_idx + 1}</td>
                                <td className="py-2">
                                    <img
                                        src={getImageUrl(_manufacturer.thumbnail.fileName)}
                                        alt={_manufacturer.name}
                                    />
                                </td>
                                <td className="py-2">{_manufacturer.name}</td>
                                <td className="py-2 divide-x">
                                    <button
                                        className="bg-transparent hover:underline hover:text-indigo-500 px-2 py-1"
                                        onClick={() => handleOpenUpdateModal(_manufacturer)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="bg-transparent hover:underline hover:text-indigo-500 px-2 py-1"
                                        onClick={() => handleDeleteTag(_manufacturer)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UpdateManufacturer
                key={randomKey}
                open={updateModal}
                onClose={handleCloseUpdateModal}
                onSave={handleSave}
                updateManufacturer={updateManufacturer}
            />
            <ConfirmModal {...confirmModal} />
        </>
    );
}

export default Manufacturers;
