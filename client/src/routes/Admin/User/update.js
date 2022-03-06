import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import { classNames } from "../../../helpers/Common";

function UpdateUser({ open, onClose, onSave }) {
    const [user, setUser] = React.useState({
        phone: "",
        name: "",
        email: "",
        password: "",
        address: "",
        admin: false,
        point: 0,
    });
    const [loading, setLoading] = React.useState(false);

    const handleChangeUserInfo = (field) => (value) => {
        setUser({ ...user, [field]: value });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await onSave(user);
            onClose();
        } catch (e) {
            toast.error(
                e.response?.data?.error?.message || "Đăng ký thất bại, vui lòng thử lại sau."
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
                    <div className="text-xl font-bold">{"Tạo tài khoản mới"}</div>
                    <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                        <div>
                            <label>Số điện thoại</label>
                            <input
                                className="input w-full"
                                value={user.phone}
                                onChange={(e) => handleChangeUserInfo("phone")(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                className="input w-full"
                                value={user.email}
                                onChange={(e) => handleChangeUserInfo("email")(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                className="input w-full"
                                value={user.password}
                                onChange={(e) => handleChangeUserInfo("password")(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Họ tên</label>
                            <input
                                className="input w-full"
                                value={user.name}
                                onChange={(e) => handleChangeUserInfo("name")(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <label>Địa chỉ</label>
                            <textarea
                                rows={3}
                                className="input w-full"
                                value={user.address}
                                onChange={(e) => handleChangeUserInfo("address")(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <label>Quản trị viên</label>
                            <input
                                type="checkbox"
                                className="input ml-3"
                                checked={user.admin}
                                onChange={(e) => handleChangeUserInfo("admin")(e.target.checked)}
                            />
                        </div>
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

export default UpdateUser;
