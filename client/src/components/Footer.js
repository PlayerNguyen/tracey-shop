import React from "react";

function Footer() {
    return (
        <>
            <div className="footer bg-blue-800 text-white py-16 text-center">
                <div className="mb-4">
                    <span className="uppercase text-xl font-semibold">
                        Đăng ký nhận email thông báo khuyến mại hoặc để được tư vấn miễn phí
                    </span>
                </div>
                <div className="mt-4 flex justify-center">
                    <input
                        className="input w-96 rounded-none"
                        placeholder="Nhập email hoặc số điện thoại của bạn"
                    />
                    <div className="px-8 font-semibold bg-red-600 flex items-center cursor-pointer">
                        <span>Gửi</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
